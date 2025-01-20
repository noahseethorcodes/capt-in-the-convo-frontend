import { getServerSession } from "next-auth/next";
import { authConfig } from "./auth";
import { signOut } from "next-auth/react";

export async function getRefreshToken(): Promise<string | null> {
    const session = await getServerSession(authConfig); // Get the current session
    if (session && session.refreshToken) {
        return session.refreshToken as string; // Return the refresh token
    }
    return null; // Return null if no session or refresh token
};

export async function getUserID(): Promise<string> {
    const session = await getServerSession(authConfig); // Get the current session
    if (session && session.userID) {
        return session.userID as string; // Return the refresh token
    } else {
        signOut();
        return ('UserID not found in session')
    }
};

export async function updateSessionTokens(newAccessToken: string, newRefreshTokens: string): Promise<void> {
    const session = await getServerSession(authConfig);

    if (session) {
        session.accessToken = newAccessToken; // Update the access token in session data
        session.refreshToken = newRefreshTokens; // Update the refresh token in session data
        console.log("Tokens updated in session");
    } else {
        console.error("Failed to update session: No active session found.");
    }
};