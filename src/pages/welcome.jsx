import React from 'react';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box'
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

import { Link, useNavigate } from 'react-router-dom';

const styles = {
    paperStyles: {
        borderRadius: '10px',
        width: '70%',
        height: 'auto',
        padding: "5%",
        marginRight:'50%',
        backgroundColor: "rgba(255, 255, 255, 0.95)" //set opacity of paper without affecting child components
    },
    gridStyle: {
        margin: '1rem',
        padding: '0.5rem'
    },
    buttonStyle: {
        width: '100%',
        mx: 'auto'
    },
}

function Welcome() {
    const navigate = useNavigate();
    return (
        <Container maxWidth='lg' disableGutters >
            <Box>
                <Paper elevation={10} sx={styles.paperStyles}>
                    <Typography variant='h2' fontWeight={'medium'} fontFamily={'sans-serif'} gutterBottom>WorkFlow</Typography>
                    <Typography variant='h4' fontFamily={'sans-serif'} gutterBottom>Streamline Your Projects and Tasks with Ease!</Typography>
                    <Typography variant='body1' fontSize='1.2rem' fontFamily={'sans-serif'} paragraph gutterBottom>
                        WorkFlow is a Workflow Management System that empowers the university staff to work smarter and faster. 
                        With WorkFlow, you can create and manage your own workflows for any project or task.  
                        WorkFlow is the smart and simple way to organize your university workflows.
                    </Typography>

                    <Button size='large' variant='contained' color='success' sx={{marginRight:'2%'}} 
                    onClick={()=>navigate('/home/signup')}>signup</Button>
                    <Typography variant='h6' component='span' fontFamily={'sans-serif'} paragraph>
                        or
                    </Typography>
                    <Button size='large' variant='contained' color='primary' sx={{marginLeft:'2%'}}
                     onClick={()=>navigate('/home/login')}>Login</Button>
                </Paper>
            </Box >
        </Container>

    );
}

export default Welcome;