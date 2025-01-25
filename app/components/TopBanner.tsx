import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';
import LogoutButton from './LogoutButton';
import Link from 'next/link';

const TopBanner = () => {
    return (
        <AppBar position="static">
            <Toolbar className="flex justify-between">
                <Typography variant="h6" component="div" color='secondary.light'>
                    <Link href={'/convos'}>CAPTInTheConvo</Link>
                </Typography>
                <LogoutButton />
            </Toolbar>
        </AppBar>
    );
};

export default TopBanner;