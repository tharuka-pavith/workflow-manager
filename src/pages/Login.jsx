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
        width: '100%',
        height: 'auto',
        padding: "5%",
        // margin: '20% 0 0 25%',
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

function Login() {

    const navigate = useNavigate();

    return (
        <Container maxWidth='lg' disableGutters>
        <Box>
            <Paper elevation={10} sx={styles.paperStyles}>
                <Typography variant='h4' textAlign={'center'} fontWeight="medium" sx={{ my: '10px' }}>Login</Typography>
                <Box sx={styles.gridStyle}>

                    <Stack spacing={3} alignItems="center">
                        <Box><TextField size='small' label="Username" variant="outlined" /></Box>
                        <Box><TextField size='small' label="Password" type="password" variant="outlined" /></Box>
                        <Link to="/home/signup"><Typography variant='subtitle1'>Forgot password?</Typography></Link>    
                    </Stack>

                    <Stack sx={{ mt: '1rem' }} direction='row' spacing={2} alignItems="center" justifyContent="center">
                        <Grid container spacing={2}>
                            <Grid item sm={6}>
                                <Button sx={{ width: '100%' }} size='medium' variant="contained" color='success'>Signin</Button>
                            </Grid>
                            <Grid item sm={6}>
                                <Button sx={{ width: '100%' }} size='medium' variant="outlined" color='error'
                                onClick={()=>navigate(-1)}>Cancel</Button>
                            </Grid>
                        </Grid>
                    </Stack>

                </Box>
            </Paper>
        </Box >
        </Container>

    );
}

export default Login;