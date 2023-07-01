import React from "react";

// MUI components
import { Box, CssBaseline } from '@mui/material';

// React router outlet
import { Outlet } from "react-router-dom"

// Custom components from ../components
import ApplicationBar from '../components/ApplicationBar';
import AppDrawer from '../components/AppDrawer';


/** Dashboard component */
function Dashboard() {
    return (
        <Box>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <ApplicationBar />
                <AppDrawer />
                <Box component="main" sx={{ flexGrow: 1, px: 2 }}>
                    <Outlet />
                </Box>
            </Box>
        </Box>
    );
}

export default Dashboard;