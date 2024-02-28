import { getServerSession } from "next-auth";
import { getSession } from "next-auth/react";
import { authOptions } from "../auth/[...nextauth]";
import { connectToDatabase, getDocumentByEmail, updateDocument } from "../../../lib/db";
import { hashPassword, verifyPassword } from "../../../lib/auth";

async function userCredentialHandler(req, res) {
    // 1- check if the req method is PATCH
    if (req.method !== 'PATCH') {
        return;
    }

    // 2- check if the session exists in th req
    // const session = await getSession({req: req});
    // const session = await getServerSession(authOptions);
    const session = req.body.session;
    console.log(session)

    if (!session) {
        // 401 => not athentificated
        res.status(401).json({ message: 'Not authenticated!' });
        return;
    }

    // 3- change password logic
    const userEmail = session.user.email;
    const oldPassword = req.body.oldPassword;
    const newPassword = req.body.newPassword;

    const client = await connectToDatabase();

    const user = await getDocumentByEmail(client, userEmail);
    if (!user) {
        res.status(404).json({ message: 'User not found!' });
        client.close();
        return;
    }
    const currentPassword = user.password;

    const passwordsAreEqual = await verifyPassword(oldPassword, currentPassword);
    if (!passwordsAreEqual) {
        // 403 => athentificated but not authorized
        // or 422 => user input is not correct
        res.status(403).json({ message: 'Invalid password.' });
        client.close();
        return;
    }

    const newHashedPassword = await hashPassword(newPassword);
    const updatedUser = await updateDocument(client, userEmail, newHashedPassword);

    client.close();
    res.status(200).json({ message: 'Password updated!' });

}

export default userCredentialHandler;