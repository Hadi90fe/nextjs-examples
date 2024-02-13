import { MongoClient } from "mongodb";

export default async function eventCommentsHandler(req, res) {
    const eventId = req.query.eventId;

    const mongoPath = process.env.MONGO;
    const client = await MongoClient.connect(mongoPath);
    const db = client.db();

    if (req.method === "POST") {
        // add server-side validation
        const { email, name, text } = req.body;
        console.log(req.body);
        if (
            !email ||
            !email.includes('@') ||
            !name ||
            name.trim() === "" ||
            !text ||
            text.trim() === ""
        ) {
            res.status(422).json({ message: "Invalid input." });
            return;
        }

        const newComment = {
            email,
            name,
            text,
            eventId: eventId,
        };

        const result = await db.collection("comments").insertOne(newComment);
        newComment.id = result.insertedId;

        res.status(201).json({ message: "Added comment.", comment: newComment });
    }

    if (req.method === "GET") {
        const comments = await db.collection("comments").find({ eventId: eventId }).toArray();;

        // const dummyList = [
        //     { id: 'c1', name: 'Max', text: 'A first comment !' },
        //     { id: 'c2', name: 'Manuel', text: 'A second comment !' },
        // ];

        res.status(200).json({ comments: comments });
    }
    client.close();
}
