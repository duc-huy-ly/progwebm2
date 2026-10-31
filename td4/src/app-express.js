import express from 'express';
import morgan from 'morgan';
import { loadEnvFile } from 'node:process';
import { ObjectId } from 'mongodb';
import { getAllContacts, mongoCreateContact, mongoUpdateContact, mongoDeleteContact } from './mongo.js';

loadEnvFile();
const host = process.env.HOST;
const port = process.env.PORT;

const app = express();
app.use(morgan('combined'));
app.use(express.json());

app.set('view engine', 'ejs');

app.get('/', function(req, res) {
    res.send('Hello !');
});

app.get('/home', function(req, res) {
  res.send('Maison :-)');
});

app.get('/user/:uid', function(req, res) {
  res.render('user', {uid: req.params.uid});
});

app.get('/contact/', getContacts);
app.get('/contact/:uid', getContact);

async function getContacts(req, res) {
  try {
    const contacts = await getAllContacts();
    res.json(contacts.map((contact) => ({
      id: contact._id.toString(),
      name: contact.name,
      age: contact.age,
    })));
  } catch (error) {
    console.error('Unable to retrieve contacts:', error);
    res.status(500).json({ error: 'Unable to retrieve contacts' });
  }
}

async function getContact(req, res) {
    try {
        const contacts = await getAllContacts();
        const contact = contacts.find(c => c._id.toString() === req.params.uid);
        if (contact) {
            res.json({
                id: contact._id.toString(),
                name: contact.name,
                age: contact.age,
            });
        } else {
            res.status(404).json({ error: 'Contact not found' });
        }
    } catch (error) {
        console.error('Unable to retrieve contact:', error);
        res.status(500).json({ error: 'Unable to retrieve contact' });
    }
}

app.post('/contact', createContact);

async function createContact(req, res) {
    try {
        const { name, age } = req.body;
        if (typeof name !== 'string' || typeof age !== 'number') {
            return res.status(400).json({
                error: 'name must be a string and age must be a number',
            });
        }

        const newContact = await mongoCreateContact(name, age);
        res.status(201).json({
            id: newContact._id.toString(),
            name: newContact.name,
            age: newContact.age,
        });
    }
    catch (error) {
        console.error('Unable to create contact:', error);
        res.status(500).json({ error: 'Unable to create contact' });
    }
}

app.put('/contact/:uid', updateContact);

async function updateContact(req, res) {
    try {
        const { uid } = req.params;
        const { name, age } = req.body;
        if (!ObjectId.isValid(uid) || typeof name !== 'string' || typeof age !== 'number') {
            return res.status(400).json({
                error: 'uid must be a valid ID, name must be a string, and age must be a number',
            });
        }

        const updatedContact = await mongoUpdateContact(uid, name, age);
        if (updatedContact) {
            res.json({
                id: updatedContact._id.toString(),
                name: updatedContact.name,
                age: updatedContact.age,
            });
        } else {
            res.status(404).json({ error: 'Contact not found' });
        }
    } catch (error) {
        console.error('Unable to update contact:', error);
        res.status(500).json({ error: 'Unable to update contact' });
    }
}

app.delete('/contact/:uid', deleteContact);

async function deleteContact(req, res) {
    try {
        const { uid } = req.params;
        if (!ObjectId.isValid(uid)) {
            return res.status(400).json({
                error: 'uid must be a valid ID',
            });
        }

        const result = await mongoDeleteContact(uid);
        if (result.deletedCount === 1) {
            res.json({ message: 'Contact deleted successfully' });
        } else {
            res.status(404).json({ error: 'Contact not found' });
        }
    } catch (error) {
        console.error('Unable to delete contact:', error);
        res.status(500).json({ error: 'Unable to delete contact' });
    }
}

app.use(function(req, res){
  res.status(404).send('Page introuvable !');
});

app.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`)
});