import express from 'express';
import morgan from 'morgan';
import { loadEnvFile } from 'node:process';
import { getAllContacts } from './mongo.js';

loadEnvFile();
const host = process.env.HOST;
const port = process.env.PORT;

const app = express();
app.use(morgan('combined'));

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

app.get('/user/', getUsers);

async function getUsers(req, res) {
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

app.use(function(req, res){
  res.status(404).send('Page introuvable !');
});

app.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`)
});