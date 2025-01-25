import { Box, Typography } from "@mui/material";

export default function SplashText() {
    return (
        <Box className="text-center p-6">
            {/* Main Title */}
            <Typography
                variant="h3"
                component="h1"
                className="font-bold tracking-wide"
                sx={{
                    color: "primary.main",
                    mb: 1,
                }}
            >
                CAPTInTheConvo
            </Typography>

            {/* Subtext */}
            <Typography
                variant="subtitle1"
                className="text-gray-600 italic"
                sx={{
                    color: "text.secondary",
                }}
            >
                A Forum for Captains, by Captains
            </Typography>
        </Box>
    )
}
