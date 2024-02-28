import { hashPassword } from "../../../lib/auth";
import { connectToDatabase, createDocument, getDocumentByEmail } from "../../../lib/db";

async function signUpHandler(req, res) {
    if (req.method !== 'POST') {
        return;
    }
    const data = req.body;
    const { email, password } = data;

    // 1- Input Data validation
    if (
        !email ||
        !email.includes("@") ||
        !password ||
        password.trim().length < 7
    ) {
        res.status(500).json({
            message:
                "Invalid input - password should also be at least 7 characters long",
        });
        return;
    }
    // 2- Connect to database
    const client = await connectToDatabase();

    // 3- Check if email already exists in database
    const existingUser = await getDocumentByEmail(client, email);
    if (existingUser) {
        res.status(422).json({ message: 'User already exists!' });
        client.close();
        return;
    }
    // 4- Hash password using bcrypt
    const hashedPassword = await hashPassword(password);


    // 5- Insert auth to database collection
    const result = await createDocument(client, email, hashedPassword);

    // 6- response
    res.status(201).json({ message: 'Created user!' });
}

export default signUpHandler;
