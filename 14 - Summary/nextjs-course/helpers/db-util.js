import { MongoClient } from "mongodb";

// MONGODB DATABASE SECTION
export async function connectDatabase() {
    const mongoPath = process.env.MONGO;
    const client = await MongoClient.connect(mongoPath);
    return client;
}

export async function insertDocument(client, collection, document) {
    const db = client.db();
    const insertedDocument = await db.collection(collection).insertOne(document);
    return insertedDocument;
}

export async function getDocumentById(client, collection, id) {
    const db = client.db();
    // const documentToFind = { _id: new ObjectId(id.toString()) }
    // const fetchedDocument = await db.collection(collection).findOne(documentToFind);

    const documents = await db.collection(collection).find().toArray();
    const filteredDocs = documents.filter((doc) => doc._id.toString() == id);
    const document = {
        ...filteredDocs[0],
        _id: filteredDocs[0]._id.toString(),
    }
    return document;
}

export async function getAllDocuments(client, collection, find, sort) {
    const db = client.db();
    const documents = await db
        .collection(collection)
        .find(find)
        .sort(sort)
        .toArray();
    const data = await documents.map((item) => {
        const id = item._id.toString();
        return {
            ...item,
            _id: id,
        };
    });
    return data;
}
export async function getAllDocumentsIds(client, collection, find) {
    const db = client.db();
    const documents = await db
        .collection(collection)
        .find(find, { _id: 1 })
        .toArray();
    const data = await documents.map((item) => {
        return {
            _id: item._id.toString(),
        };
    });
    return data;
}