import React from 'react';
import { Link, Outlet } from "react-router-dom"

import Typography  from '@mui/material/Typography';
import Button from '@mui/material/Button';

function Home(){
    return(
        <div>
        <Typography variant='h5' textAlign='left' fontWeight="medium" sx={{ my: '10px' }}>Welcome to Wrokflow Management System</Typography>
        <Button size={'large'} variant="contained" color='primary'>login</Button>
        <Button size={'large'} variant="contained" color='primary'>signup</Button>

        <Outlet />
        </div>
    );
}

export default Home;