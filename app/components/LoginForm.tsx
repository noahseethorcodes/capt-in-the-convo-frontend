'use client';

import React, { useState } from "react";
import { useActionState } from "react";
import { signIn } from "next-auth/react";
import { redirect } from "next/navigation";
import {
    Button,
    TextField,
    Typography,
    Card,
    CardContent,
    Box,
} from "@mui/material";
import toast from "react-hot-toast";
import Link from "next/link";
import { PersonAdd } from "@mui/icons-material";

async function handleLoginFormSubmit(
    prevState: string,
    formData: FormData
) {
    const signInResponse = await signIn("credentials", {
        redirect: false,
        username: formData.get("username"),
        password: formData.get("password"),
        callbackUrl: "/"
    });
    if (signInResponse?.ok) {
        toast.success("Logged In!")
        redirect("/convos");
    }
    if (signInResponse?.error) {
        console.log(signInResponse.error);
        return signInResponse.error;
    }
    return "Sign In Failed";
}

export default function LoginForm() {
    const [formData, setFormData] = useState({ username: "", password: "" })
    const [state, formAction, isPending] = useActionState(handleLoginFormSubmit, "");
    return (
        <Card className="shadow-lg w-full max-w-md" sx={{ borderRadius: "12px", }}>
            <CardContent>
                <Typography variant="h5" className="text-center mb-4 py-4">
                    Login
                </Typography>
                <form action={formAction} className="space-y-4">
                    <TextField
                        id="username"
                        name="username"
                        label="Username"
                        variant="outlined"
                        value={formData.username}
                        onChange={(e) => setFormData(prevState => ({
                            ...prevState,
                            username: e.target.value,
                        }))}
                        fullWidth
                    />
                    <TextField
                        id="password"
                        name="password"
                        label="Password"
                        type="password"
                        variant="outlined"
                        value={formData.password}
                        onChange={(e) => setFormData(prevState => ({
                            ...prevState,
                            password: e.target.value,
                        }))}
                        fullWidth
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="secondary"
                        disabled={isPending}
                        fullWidth
                        className="mt-2"
                    >
                        {isPending ? "Verifying..." : "Login"}
                    </Button>
                    {state && (
                        <Typography
                            color="error"
                            variant="body2"
                            className="text-center mt-2"
                        >
                            {state}
                        </Typography>
                    )}
                </form>
                <Box className="flex items-center justify-center mt-4">
                    <Typography color="textSecondary">or</Typography>
                </Box>

                {/* Sign Up Button */}
                <Box className="flex items-center justify-center mt-2">
                    <Button
                        component={Link}
                        href="/register"
                        variant="outlined"
                        sx={{
                            width: "33%",
                            display: "flex",
                            justifyContent: "space-around",
                            alignItems: "center",
                            px: 2,
                            py: 1,
                            color: "black",
                            borderRadius: "4px",
                            "&:hover": {
                                backgroundColor: "green",
                                color: "white",
                            },
                        }}
                    >
                        Register
                        <PersonAdd />
                    </Button>
                </Box>
            </CardContent>
        </Card>
    );
};