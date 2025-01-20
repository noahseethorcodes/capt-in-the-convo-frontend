'use client'
import { Logout } from "@mui/icons-material";
import { signOut } from "next-auth/react";

export default function LogoutButton() {
    return (
        <button
            className="flex items-center space-x-2 p-2 text-sm font-medium text-gray-700 hover:text-blue-600"
            onClick={() => signOut()}
            aria-label="Sign Out"
        >
            <Logout className="w-5 h-5 flex-shrink-0 text-white" />
            <span className="hidden md:block text-white">Log Out</span>
        </button>
    );
}

