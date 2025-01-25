import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";
import { JWT } from "next-auth/jwt";
import { Session, User } from "next-auth";

export const authConfig: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                try {
                    if (!credentials || !credentials.username || !credentials.password)
                        throw new Error("Please enter both username and password.");

                    // Send login request to the backend
                    const loginResponse = await axios.post(`${process.env.BACKEND_URL}/auth/login`, {
                        username: credentials.username,
                        password: credentials.password,
                    });

                    // If login succeeds, return the user object
                    if (loginResponse.data && loginResponse.data.accessToken) {
                        return {
                            accessToken: loginResponse.data.accessToken,
                            refreshToken: loginResponse.data.refreshToken,
                            id: loginResponse.data.userID, // Add userID from the backend
                        };
                    }
                    return null;
                } catch (error) {
                    console.error("Authorize function encountered an error:");
                    if (axios.isAxiosError(error) && error.response) {
                        console.error(error.response.data.error);
                        throw new Error(error.response.data.error);
                    } else {
                        console.error(error);
                        throw error;
                    }
                }
            },
        }),
    ],
    pages: {
        signIn: "/login", // Use your custom login page
        error: "/login",  // Redirect to login on error
    },
    callbacks: {
        async jwt({ token, user }: { token: JWT; user?: User }) {
            console.log("JWT Callback Triggered");
            if (user) {
                console.log("User Object in JWT Callback:", user);
                token.accessToken = user.accessToken; // Store JWT in token
                token.refreshToken = user.refreshToken;
                token.userID = user.id;
            }
            return token;
        },
        async session({ session, token }: { session: Session; token: JWT }) {
            console.log("Session Callback Triggered");
            session.accessToken = token.accessToken; // Pass tokens to session
            session.refreshToken = token.refreshToken;
            session.userID = token.userID;
            return session;
        },
    },
};