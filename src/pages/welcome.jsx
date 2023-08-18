import React from 'react';

// MUI components
import {Container, Paper, Typography, Box, Button} from '@mui/material';

// React Router
import { useNavigate } from 'react-router-dom';


// Custom Styles
const styles = {
    paperStyles: {
        borderRadius: '10px',
        width: '70%',
        height: 'auto',
        padding: "5%",
        mx:'auto',
        backgroundColor: "rgba(255, 255, 255, 0.97)" //set opacity of paper without affecting child components
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

/**Welcome component */
function Welcome() {
    const navigate = useNavigate();
    return (
        <Container maxWidth='xlg' disableGutters >
            <Box>
                <Paper elevation={10} sx={styles.paperStyles}>
                    <Typography variant='h3' fontWeight={'xlarge'} fontFamily={'sans-serif'} gutterBottom>WorkFlow Management System</Typography>
                    <Typography variant='h4' fontFamily={'sans-serif'} gutterBottom>Transform the way you work and unlock new levels of efficiency and collaboration.</Typography>
                    <Typography variant='body1' fontSize='1.2rem' fontFamily={'sans-serif'} paragraph gutterBottom>
                    Our University Workflow Management System is designed to revolutionize the way tasks and processes are managed at our university.
                    By automating and optimizing workflows, we empower administrators, faculty members, staff, and students to work smarter, not harder.
                    </Typography>

                    <Button size='large' variant='contained' color='success' sx={{marginRight:'2%'}} 
                    onClick={()=>navigate('/home/signup')}>SIGN UP</Button>
                    <Typography variant='h6' component='span' fontFamily={'sans-serif'} paragraph>
                        or
                    </Typography>
                    <Button size='large' variant='contained' color='primary' sx={{marginLeft:'2%'}}
                     onClick={()=>navigate('/home/login')}>LOG IN</Button>
                </Paper>
            </Box >
        </Container>

    );
}

export default Welcome;