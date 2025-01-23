import SplashText from "@/app/components/SplashText";
import { Box } from "@mui/material";
import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <Box className="w-full max-w-[960px] flex flex-col lg:flex-row rounded-[10px] px-6">
                {/* SplashText */}
                <Box className="w-full lg:w-1/2 flex items-center justify-center lg:pr-6">
                    <SplashText />
                </Box>

                {/* Main Content */}
                <Box className="w-full lg:w-1/2 flex items-center justify-center lg:pl-6">
                    {children}
                </Box>
            </Box>
        </div>
    );
}