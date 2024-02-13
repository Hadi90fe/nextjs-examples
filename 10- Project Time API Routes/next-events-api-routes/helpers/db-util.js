import { MongoClient } from "mongodb";

// MANGODB DATABASE SECTION
export async function conectDatabase() {
    const mongoPath = process.env.MONGO;
    const client = await MongoClient.connect(mongoPath);
    return client;
}

export async function insertDocument(client, collection, document) {
    const db = client.db();
    const insertedDocument = await db.collection(collection).insertOne(document);
    return insertedDocument;
}

export async function getAllDocuments(client, collection, find, sort) {
    const db = client.db();
    const documents = await db
        .collection(collection)
        .find(find)
        .sort(sort)
        .toArray();
    return documents;
}