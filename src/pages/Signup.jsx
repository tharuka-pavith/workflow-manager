import React, { useState } from 'react';

import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box'
import Button from '@mui/material/Button';

import { useNavigate } from 'react-router-dom';

import FirebaseApp from '../firebase/firebaseConfig';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const styles = {
    paperStyles: {
        // margin: "32px",
        marginTop: "5rem",
        width: "100%",
        borderRadius: '10px',
        // height: "600px",
        padding: "5%",
        backgroundColor: "rgb(255,255,255,0.95)"
    },
    gridStyle: {
        margin: '10px',
        padding: '5px'
    },
    textFieldStyle: {
        width: "100%",
        mx: 'auto'
    },

    buttonStyle: {
        width: '100%',
        mx: 'auto'
    }
}

function Signup() {

    const auth = getAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function handleSignup() {
        //console.log(`${email} \n${password}`);
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                // ...
                
                navigate("/dashboard/newtask");
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // ..
                console.log(error.message);
            });
    }

    return (
        <Container maxWidth="sm">
            <Paper elevation={4} sx={styles.paperStyles}>
                <Typography variant='h4' textAlign={'center'} fontWeight="medium" sx={{ my: '10px' }}>Signup</Typography>

                <Box sx={styles.gridStyle}>
                    <Grid container={true} spacing={4} >
                        <Grid item xs={6}>
                            <TextField sx={styles.textFieldStyle} label="First Name" variant="outlined" />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField sx={styles.textFieldStyle} label="Last Name" variant="outlined" />
                        </Grid>
                        <Grid item xs={8}>
                            <TextField label="Username" variant="outlined" />
                        </Grid>
                        <Grid item xs={7}>
                            <TextField sx={styles.textFieldStyle} label="Email" variant="outlined"
                                onChange={(event) => { setEmail(event.target.value) }} />
                        </Grid>
                        <Grid item xs={7}>
                            <TextField sx={styles.textFieldStyle} label="Mobile" variant="outlined" />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField sx={styles.textFieldStyle} type={'password'} label="Password" variant="outlined"
                                onChange={(event) => { setPassword(event.target.value) }} />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField sx={styles.textFieldStyle} type={'password'} label="Confirm Password" variant="outlined" />
                        </Grid>
                        <Grid item xs={6}>
                            <Button size={'large'} sx={styles.buttonStyle} variant="outlined" color='error'
                                onClick={() => navigate("/home/welcome")}>Cancel</Button>
                        </Grid>
                        <Grid item xs={6}>
                            <Button size={'large'} sx={styles.buttonStyle} variant="contained" color='success'
                                onClick={handleSignup}>Signup</Button>
                        </Grid>
                    </Grid>


                </Box>

            </Paper>

        </Container>

    );
}

export default Signup;