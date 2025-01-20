import Navbar from "@/app/components/Navbar";
import { Divider } from "@mui/material";
import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex items-center flex-col min-h-screen">
            {/* Header */}
            <Navbar />

            {/* Main Content */}
            {children}
        </div>
    );
}