'use client';

import React, { useEffect, useState } from "react";
import { useActionState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
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
import { Login, PersonAdd } from "@mui/icons-material";

export default function LoginForm() {
    const router = useRouter();
    const callbackUrl = useSearchParams().get('callbackUrl');
    async function handleLoginFormSubmit(
        prevState: string,
        formData: FormData
    ) {
        const signInResponse = await signIn("credentials", {
            redirect: false,
            username: formData.get("username"),
            password: formData.get("password"),
        });

        if (signInResponse?.ok) {
            toast.success("Logged In!");
            return 'Success';
        }

        if (signInResponse?.error) {
            toast.error("Login Failed");
            console.log(signInResponse.error);
            return signInResponse.error;
        } else {
            return "Sign In Failed";
        }
    }

    const [formData, setFormData] = useState({ username: "", password: "" })
    const [state, formAction, isPending] = useActionState(handleLoginFormSubmit, "");

    useEffect(() => {
        if (state === 'Success') {
            if (callbackUrl) {
                router.push(callbackUrl);
            } else {
                router.push('/courses');
            }
        }
    }, [state]);

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

                    {state && (
                        <Typography
                            color={state === 'Success' ? 'success' : "error"}
                            variant="body2"
                            className="text-center mt-2"
                        >
                            {state}
                        </Typography>
                    )}

                    <Box className="flex items-center justify-center mt-2">
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            disabled={isPending}
                            className="mt-2 w-2/5"
                        >
                            {isPending ? "Verifying..." : "Login"}
                            <Login className="ml-2" />
                        </Button>

                    </Box>
                </form>

                <Box className="flex items-center justify-center mt-2">
                    <Typography color="textSecondary">or</Typography>
                </Box>

                {/* Register Button */}
                <Box className="flex items-center justify-center mt-2">
                    <Button
                        component={Link}
                        href="/register"
                        variant="contained"
                        color="secondary"
                        className="w-1/3"
                    >
                        Register
                        <PersonAdd className="ml-2" />
                    </Button>
                </Box>
            </CardContent>
        </Card >
    );
};