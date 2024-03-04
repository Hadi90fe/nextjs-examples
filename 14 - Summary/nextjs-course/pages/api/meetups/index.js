import {
    connectDatabase,
    insertDocument,
    getAllDocuments
} from "@/helpers/db-util";
// import {
//     getFeaturedMeetups,
//     getAllMeetups,
// } from "../../../helpers/firebase-util";

export default async function handler(req, res) {
    let client;
    try {
        client = await connectDatabase();
    } catch (error) {
        res.status(500).json({ message: "Connecting to the database failed!" });
        return;
    }
    if (req.method === "POST") {
        const { title, image, address, description } = req.body;
        if (
            !image ||
            !image.includes("https://") ||
            !title ||
            title.trim() === "" ||
            !address ||
            address.trim() === "" ||
            !description ||
            description.trim() === ""
        ) {
            res.status(422).json({ message: "Invalid input." });
            client.close();
            return;
        }

        const newMeetup = {
            title,
            image,
            address,
            description,
            isFeatured: true,
        };

        try {
            const insertedDocument = await insertDocument(
                client,
                "meetups",
                newMeetup
            );
            newMeetup.id = insertedDocument.insertedId;
            res.status(200).json({
                message: "Successfully inserted meetup!.",
                meetup: newMeetup,
            });
        } catch (error) {
            res.status(500).json({ message: error.message || "Inserting data failed!" });
        }
    }

    if (req.method === "GET") {
        try {
            // const documents = await getFeaturedMeetups();
            const documents = await getAllDocuments(
                client,
                "meetups",
                { isFeatured: true },
                { _id: -1 }
            );
            res.status(200).json({ fetchedData: documents });
        } catch (error) {
            res.status(500).json({ message: error.message || "Getting meetups failed!" });
        }
    }

    client.close();
}
