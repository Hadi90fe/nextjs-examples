import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectToDatabase, getDocumentByEmail } from "../../../lib/db";
import { verifyPassword } from "../../../lib/auth";

export const authOptions = {
    session: {
        jwt: true
    },
    providers: [
        CredentialsProvider({
            async authorize(credentials) {
                // await new Promise(
                //     // simulate a promise delay
                //     (resolve) => setTimeout(resolve, 3000)
                // );

                const client = await connectToDatabase();
                // check if user exists
                const user = await getDocumentByEmail(client, credentials.email);
                if (!user) {
                    client.close();
                    throw new Error("No user found");
                }
                // check if password is valid
                const isValidPassword = await verifyPassword(
                    credentials.password,
                    user.password
                );
                if (!isValidPassword) {
                    client.close();
                    throw new Error("Could not log you in");
                }
                client.close();
                return { email: user.email };
            },
        }),
    ],
}
export default NextAuth(authOptions);
