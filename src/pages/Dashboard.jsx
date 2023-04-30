import React from "react";
import Grid from '@mui/material/Grid';
import { Outlet } from "react-router-dom"

import ApplicationBar from '../components/ApplicationBar';
import AppDrawer from '../components/AppDrawer';

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