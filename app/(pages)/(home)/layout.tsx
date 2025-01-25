import Navbar from "@/app/components/Navbar";
import { Box } from "@mui/material";
import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex items-center flex-col min-h-screen">
            <Box className="w-full max-w-[620px] rounded-[10px] px-6">
                {/* Header */}
                <Navbar />

                {/* Main Content */}
                {children}
            </Box>
        </div>
    );
}