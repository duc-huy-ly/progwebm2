const DATABASE_NAME = 'M2WEB';
const COLLECTION_NAME = 'contacts';
const MONGO_URL = 'mongodb://localhost:27017';

import { MongoClient } from 'mongodb';
import { ObjectId } from 'mongodb';

async function printAllContacts(collection) {
    const results = await collection.find().toArray();
    for (const result of results) {
        console.log(`Contact : ${result.name} is ${result.age}`);
    }
}

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

async function main() {
    let client;
    try {
        console.log('Trying to connect...')
        const client = new MongoClient(MONGO_URL);        
        const db = client.db(DATABASE_NAME);
        console.log("Successfully connected to MongoDB.");
        const contacts = db.collection(COLLECTION_NAME);
        await client.connect();
        await printAllContacts(contacts);
    } catch (e) {
        console.error(e)
    } finally {
        if (client) {
            client.close();
        }
    }
}

main();
