import { withAuth } from "next-auth/middleware";

export default withAuth({
    pages: {
        signIn: "/login", // Redirect unauthenticated users to the login page
    },
});

export const config = {
    matcher: [
        "/((?!login|register).*)", // Protect all paths except /login and /register
    ],
};