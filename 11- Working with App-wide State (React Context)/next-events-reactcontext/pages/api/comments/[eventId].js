import { insertDocument, getAllDocuments } from "../../../helpers/db-util";
import { conectDatabase } from "../../../helpers/db-util";



export default async function eventCommentsHandler(req, res) {
    const eventId = req.query.eventId;

    let client;
    try {
        client = await conectDatabase();
    } catch (error) {
        res.status(500).json({ message: "Connecting to the database failed!" });
        return;
    }

    if (req.method === "POST") {
        const { email, name, text } = req.body;
        if (
            // add server-side validation
            !email ||
            !email.includes("@") ||
            !name ||
            name.trim() === "" ||
            !text ||
            text.trim() === ""
        ) {
            res.status(422).json({ message: "Invalid input." });
            client.close();
            return;
        }

        const newComment = {
            email,
            name,
            text,
            eventId: eventId,
        };


        try {
            const insertedDocument = await insertDocument(
                client,
                "comments",
                newComment
            );
            newComment.id = insertedDocument.insertedId;
            res.status(200).json({ message: "Successfully registered comment!.", comment: newComment });
        } catch (error) {
            res.status(500).json({ message: "Inserting data failed!" });
        }
    }

    if (req.method === "GET") {
        try {
            const documents = await getAllDocuments(
                client,
                "comments",
                { eventId: eventId },
                { _id: -1 }
            ); // _id: -1 to sort in descending order,this means show added latest first in the list
            res.status(200).json({ comments: documents });
        } catch (error) {
            res.status(500).json({ message: "Getting comments failed!" });
        }
    }
    client.close();
}
