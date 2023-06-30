import React from "react";

// MUI components
import {Grid} from '@mui/material';

// React router outlet
import { Outlet } from "react-router-dom"

// Custom components from ../components
import ApplicationBar from '../components/ApplicationBar';
import AppDrawer from '../components/AppDrawer';


/** Dashboard component */
function Dashboard() {
    return (
        <Grid container spacing={0}>
            <Grid item xs={12}>
                <ApplicationBar />
            </Grid>

            <Grid item xs={12}>
                <AppDrawer />
                <Outlet />
            </Grid>

        </Grid>
    );
}

export default Dashboard;