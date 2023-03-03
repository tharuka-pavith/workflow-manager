import React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Upload  from '@mui/icons-material/Upload';

function NotFound(){
    return(
    <Container maxWidth='lg'>
        <Paper variant='outlined' sx={{mt: '150px', width: '50%', mx:'auto'}}>
        <Typography variant='h3' textAlign={'center'} fontWeight="medium" sx={{ my: '10px' }}>Oops!!!</Typography>
        <Typography variant='h4' textAlign={'center'} fontWeight="medium" sx={{ my: '10px' }}>404 Not Found!</Typography>
        </Paper>
    </Container>
        );
}

export default NotFound;

