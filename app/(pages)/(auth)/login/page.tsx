import React, { Suspense } from "react";
import LoginForm from "@/app/components/LoginForm";
import { Box } from "@mui/material";

export default function LoginPage() {
    return (
        <Box className="flex items-center justify-center">
            <Suspense>
                <LoginForm />
            </Suspense>
        </Box>

    )
}