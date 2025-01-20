import { withAuth } from "next-auth/middleware";

export default withAuth({
    pages: {
        signIn: "/login", // Redirect unauthenticated users to the login page
    },
});

export const config = {
    matcher: [
        /*
         * Match all protected routes:
         * - Protect all pages except `/login`
         */
        "/((?!login).*)", // Protect all paths except /login
    ],
};