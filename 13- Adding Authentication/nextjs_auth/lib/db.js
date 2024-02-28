import { MongoClient } from "mongodb";

export async function connectToDatabase() {
    const mongoPath = process.env.MONGO;
    const client = await MongoClient.connect(mongoPath);
    return client;
}

export async function createDocument(client, email, hashedPassword) {
    // 1- Connect to database
    const db = client.db();
    // 2- Insert document to database
    const result = await db
        .collection("users")
        .insertOne({ email: email, password: hashedPassword });
    return result;
}

export async function updateDocument(client, email, hashedPassword) {
    // 1- Connect to database
    const db = client.db();
    // 2- Update a document in the database
    const result = await db
        .collection("users")
        .updateOne({ email: email}, {$set: {password: hashedPassword}});
    return result;
}

export async function getDocumentByEmail(client, email) {
    // 1- Connect to database
    const db = client.db();
    // 2- Find document in database
    const result = await db.collection("users").findOne({ email: email });

    return result;
}
