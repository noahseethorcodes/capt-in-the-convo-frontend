'use client';

import React from "react";
import { Card, CardContent, Typography, TextField, Button, Box } from "@mui/material";
import { useActionState } from "react";
import { register } from "../auth/register";
import { Login } from "@mui/icons-material";
import Link from "next/link";
import { AuthFormState } from "../lib/form-validation";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";


export default function RegistrationForm() {
    const initalState = {
        message: "",
        data: {
            username: "",
            password: "",
        }
    }
    const router = useRouter();
    async function handleSubmit(prevState: AuthFormState, formData: FormData) {
        const state = await register(prevState, formData);
        if (state.message === 'Success') {
            toast.success('Registered! Please log in')
            router.push(`/convos`);
            return state;
        } else {
            toast.error(`Registration Unsuccessful`)
            return state;
        }
    }
    const [state, formAction, isPending] = useActionState(handleSubmit, initalState);

    return (
        <Card className="shadow-lg w-full max-w-md" sx={{ borderRadius: "12px" }}>
            <CardContent>
                <Typography variant="h5" className="text-center mb-4 py-4">
                    Register
                </Typography>
                <form action={formAction} className="space-y-4">
                    {/* Username Field */}
                    <TextField
                        id="username"
                        name="username"
                        label="Username"
                        variant="outlined"
                        defaultValue={state.data.username}
                        fullWidth
                    />

                    {/* Password Field */}
                    <TextField
                        id="password"
                        name="password"
                        label="Password"
                        type="password"
                        variant="outlined"
                        defaultValue={state.data.password}
                        fullWidth
                    />

                    {/* Submit Button */}
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        disabled={isPending}
                        className="mt-2"
                    >
                        {isPending ? "Registering..." : "Register"}
                    </Button>

                    {/* Error Message */}
                    {state.message && (
                        <Typography
                            color={state.message === "Success" ? "success" : "error"}
                            variant="body2"
                            className="text-center mt-2"
                        >
                            {state.message}
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
                        href="/login"
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
                        Login
                        <Login />
                    </Button>
                </Box>
            </CardContent>
        </Card>
    );
}