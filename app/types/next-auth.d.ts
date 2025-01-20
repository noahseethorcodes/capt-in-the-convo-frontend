import NextAuth from "next-auth";

declare module "next-auth" {
    interface User {
        accessToken: string; // Add JWT token to the user object
        refreshToken: string; // Add accessToken to the JWT token
    }

    interface Session {
        accessToken?: string; // Add accessToken to the session
        refreshToken?: string; // Add accessToken to the JWT token
        userID?: string;
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        accessToken?: string; // Add accessToken to the JWT token
        refreshToken?: string; // Add accessToken to the JWT token
        userID?: string;
    }
}