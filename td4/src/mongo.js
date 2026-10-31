const DATABASE_NAME = 'M2WEB';
const COLLECTION_NAME = 'contacts';
const MONGO_URL = 'mongodb://localhost:27017';

import { MongoClient } from 'mongodb';
import { ObjectId } from 'mongodb';

export async function getAllContacts() {
    const client = new MongoClient(MONGO_URL);
    await client.connect();
    try {
        const contacts = client.db(DATABASE_NAME).collection(COLLECTION_NAME);
        return await contacts.find().toArray();
    } finally {
        await client.close();
    }
}

export async function mongoCreateContact(name, age) {
    const client = new MongoClient(MONGO_URL);
    await client.connect();
    try {
        const contacts = client.db(DATABASE_NAME).collection(COLLECTION_NAME);
        const contact = { name, age };
        const result = await contacts.insertOne(contact);
        return { ...contact, _id: result.insertedId };
    } finally {
        await client.close();
    }
}

export async function mongoDeleteContact(id) {
    const client = new MongoClient(MONGO_URL);
    await client.connect();
    try {
        const contacts = client.db(DATABASE_NAME).collection(COLLECTION_NAME);
        return await contacts.deleteOne({ _id: new ObjectId(id) });
    } finally {
        await client.close();
    }
}

// Given a contact ID, update the contact with the new name and age.
export async function mongoUpdateContact(id, name, age) {
    const client = new MongoClient(MONGO_URL);
    await client.connect();
    try {
        const contacts = client.db(DATABASE_NAME).collection(COLLECTION_NAME);
        return await contacts.findOneAndUpdate(
            { _id: new ObjectId(id) },
            { $set: { name, age } },
            { returnDocument: 'after' }
        );
    } finally {
        await client.close();
    }
}
