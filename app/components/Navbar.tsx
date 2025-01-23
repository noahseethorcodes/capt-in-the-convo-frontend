"use client";

import React from "react";
import { AppBar, Toolbar, Typography, Box, Button, Divider } from "@mui/material";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const links = [
    { href: "/convos", label: "All Convos" },
    { href: "/create-convo", label: "Start a convo" },
];

export default function Navbar() {
    const pathname = usePathname(); // Get the current route

    return (
        <Box position="static" color="default">
            <Toolbar>
                <Box>
                    {links.map((link) => (
                        <Button
                            key={link.href}
                            component={Link}
                            href={link.href}
                            sx={{ color: pathname === link.href ? 'primary.light' : "black" }}
                        >
                            {link.label}
                        </Button>
                    ))}
                </Box>
            </Toolbar>
            <Divider />
        </Box>
    );
}