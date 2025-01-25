import React from "react";
import RegisterForm from "@/app/components/RegistrationForm";
import { Box } from "@mui/material";

export default function LoginPage() {
    return (
        <Box className="flex items-center justify-center">
            <RegisterForm />
        </Box>
    )
}