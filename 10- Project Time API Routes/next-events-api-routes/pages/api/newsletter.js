import { MongoClient } from "mongodb";

export default async function newsletterHandler(req, res) {
    if (req.method === "POST") {
        const userEmail = req.body.email;
        if (
            !userEmail ||
            userEmail.trim() === "" ||
            !userEmail.includes("@") ||
            !userEmail.includes(".") ||
            userEmail.includes("..")
        ) {
            res.status(422).json({ message: 'Invalid email address !' });
            return;
        }

        const mongoPath = process.env.MONGO;
        const client = await MongoClient.connect(mongoPath);
        const db = client.db();
        await db.collection("newsletter").insertOne({email: userEmail});
        client.close();

        console.log(userEmail);
        res.status(201).json({ message: 'Success !' });
    }
    res.status(404).json({ message: 'No get for this route!' });
}