import { MongoClient } from 'mongodb';

async function contactHandler(req, res) {
    if (req.method === "POST") {
        const { email, name, message } = req.body;

        if (
            !email ||
            !email.includes("@") ||
            !name ||
            name.trim() === "" ||
            !message ||
            message.trim() === ""
        ) {
            res.status(422).json({ message: "Invalid input." });
            return;
        }

        // Store it in a database
        const newMessage = {
            email,
            name,
            message
        }

        //connecting to database
        let client;
        const connectionString = `mongodb+srv://${process.env.mongodb_username}:${process.env.mongodb_password}@${process.env.mongodb_clustername}.5a5kygo.mongodb.net/${process.env.mongodb_database}?retryWrites=true&w=majority`;

        try {
            const MONGOPATH = process.env.MONGO;
            client = await MongoClient.connect(connectionString);

        } catch (error) {
            res.status(500).json({ message: 'Could not connect to database.' })
        }
        const db = client.db();

        // adding data to a collection
        try {
            const result = await db.collection('messages').insertOne(newMessage);
            newMessage.id = result.insertedId;
        } catch (error) {
            client.close();
            res.status(500).json({ message: 'Storing message failed!' })
            return;
        }
        client.close();

        res.status(201).json({ message: 'Message sent successfully !', data: newMessage });
    }
}

export default contactHandler;
