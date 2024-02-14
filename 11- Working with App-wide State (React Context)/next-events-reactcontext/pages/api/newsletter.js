import {
    conectDatabase,
    insertDocument,
    getDocument,
} from "../../helpers/db-util";

export default async function newsletterHandler(req, res) {
    let client;
    try {
        client = await conectDatabase();
    } catch (error) {
        res.status(500).json({ message: "Connecting to the database failed!" });
        return;
    }

    if (req.method === "POST") {
        const userEmail = req.body.email;
        if (
            !userEmail ||
            userEmail.trim() === "" ||
            !userEmail.includes("@") ||
            !userEmail.includes(".") ||
            userEmail.includes("..")
        ) {
            res.status(422).json({ message: "Invalid email address !" });
            return;
        }

        let client;
        let insertedDocument;

        try {
            client = await conectDatabase();
        } catch (error) {
            res.status(500).json({ message: "Connecting to the database failed!" });
            return;
        }

        try {
            const findDocument = await getDocument(client, "newsletter", {
                email: userEmail,
            });

            if (findDocument) { // check if email exists already
                throw new Error('This email already exists!');
            }

            insertedDocument = await insertDocument(client, "newsletter", {
                email: userEmail,
            });
        } catch (error) {
            res.status(500).json({ message: error.message || "Inserting data failed!" });
            return;
        }

        // console.log(userEmail);
        res.status(201).json({ message: "Success !" });
    }
    res.status(404).json({ message: "No get for this route!" });
}
