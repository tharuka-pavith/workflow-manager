import React, { useState } from 'react';

// MUI components
import {Container, Paper, Typography, TextField, Stack, Box, Button, Grid} from '@mui/material';

// React Router
import { Link, useNavigate } from 'react-router-dom';

//Firebase functions
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

// Custom components
import CustomAlert from '../components/Alerts';

// Custom styles for <Login>
const styles = {
    paperStyles: {
        borderRadius: '10px',
        width: '100%',
        height: 'auto',
        padding: "5%",
        // margin: '20% 0 0 25%',
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

/**Login component */
function Login() {
    const auth = getAuth();

    //States
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [alert, setAlert] = useState({message:"", severity:"", open:false});

    //Handle alert closing
    const handleAlertClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setAlert({message:'', severity:"", open:false});
    };

    /**Handle th sign in function */
    function handleSignIn() {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log("Login Successful!!");
                navigate("/dashboard/mytasks");
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorMessage);

                setAlert({message:errorCode, severity:"error", open:true});
            });
    }

    return (
        <Container maxWidth='lg' disableGutters>
            <Box>
                <Paper elevation={10} sx={styles.paperStyles}>
                    <Typography variant='h4' textAlign={'center'} fontWeight="medium" sx={{ my: '10px' }}>Login</Typography>
                    <Box sx={styles.gridStyle}>

                        <Stack spacing={3} alignItems="center">
                            <Box><TextField size='small' label="Email" variant="outlined" type="email"
                                onChange={(event) => { setEmail(event.target.value) }} /></Box>

                            <Box><TextField size='small' label="Password" type="password" variant="outlined"
                                onChange={(event) => { setPassword(event.target.value) }} /></Box>

                            <Link to="/home/signup"><Typography variant='subtitle1'>Forgot password?</Typography></Link>
                        </Stack>

                        <Stack sx={{ mt: '1rem' }} direction='row' spacing={2} alignItems="center" justifyContent="center">
                            <Grid container spacing={2}>
                            <Grid item sm={6}>
                                    <Button sx={{ width: '100%' }} size='medium' variant="outlined" color='error'
                                        onClick={() => navigate("/home/welcome")}>Cancel</Button>
                                </Grid>
                                <Grid item sm={6}>
                                    <Button sx={{ width: '100%' }} size='medium' variant="contained" color='success'
                                        onClick={() => { handleSignIn() }}>Signin</Button>
                                </Grid>
                            </Grid>
                        </Stack>

                    </Box>
                </Paper>
            </Box >
        <CustomAlert alert={alert} handleClose={handleAlertClose}/>
        </Container>

    );
}

export default Login;