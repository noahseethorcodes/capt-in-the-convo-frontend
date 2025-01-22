'use client';

import React, { useState } from "react";
import { Card, CardContent, Typography, TextField, Button, Box } from "@mui/material";
import { useActionState } from "react";
import { register } from "../auth/register";
import { Login } from "@mui/icons-material";
import Link from "next/link";


export default function RegistrationForm() {
    const [formData, setFormData] = useState({ username: "", password: "" });
    const [message, formAction, isPending] = useActionState(register, "");

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
                        value={formData.username}
                        onChange={(e) =>
                            setFormData((prevState) => ({
                                ...prevState,
                                username: e.target.value,
                            }))
                        }
                        fullWidth
                    />

                    {/* Password Field */}
                    <TextField
                        id="password"
                        name="password"
                        label="Password"
                        type="password"
                        variant="outlined"
                        value={formData.password}
                        onChange={(e) =>
                            setFormData((prevState) => ({
                                ...prevState,
                                password: e.target.value,
                            }))
                        }
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

                    {/* Error/Success Message */}
                    {message && (
                        <Typography
                            color={message.includes("successful") ? "success" : "error"}
                            variant="body2"
                            className="text-center mt-2"
                        >
                            {message}
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