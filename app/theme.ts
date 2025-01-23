'use client';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    typography: {
        fontFamily: 'var(--font-roboto)',
    },
    palette: {
        primary: {
            light: "#a34d4d",
            main: "#800000",
            dark: "#4d0000",
            contrastText: "#ffffff"
        },
        secondary: {
            light: "#ffcc5c",
            main: "#e6a817",
            dark: "#b37800",
            contrastText: "#000000"
        },
    },
},
);

export default theme;