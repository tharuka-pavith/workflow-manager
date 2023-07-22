import React from "react";

// MUI components
<<<<<<< HEAD
import { Box, CssBaseline } from '@mui/material';
=======
import { Grid } from '@mui/material';
>>>>>>> 43422b8868ed13d2e0609c51d7610fb6feaf1a9e

// React router outlet
import { Outlet } from "react-router-dom"

// Custom components from ../components
import ApplicationBar from '../components/ApplicationBar';
import AppDrawer from '../components/AppDrawer';


/** Dashboard component */
function Dashboard() {
    return (
<<<<<<< HEAD
        <Box>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <ApplicationBar />
                <AppDrawer />
                <Box component="main" sx={{ flexGrow: 1, px: 2,height:"100%" }}>
                    <Outlet/>
                </Box>
            </Box>
        </Box>
=======
        <Grid container spacing={0}>
            <Grid item xs={12}>
            <ApplicationBar />
            </Grid>

            <Grid item xs={12}>
            <AppDrawer />
            <Outlet />
            </Grid>

        </Grid>
>>>>>>> 43422b8868ed13d2e0609c51d7610fb6feaf1a9e
    );
}

export default Dashboard;