import React, { useState } from 'react';

import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box'
import Button from '@mui/material/Button';

import { useNavigate } from 'react-router-dom';

import { getFirestore, doc, setDoc } from "firebase/firestore";
import {  getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import firebaseApp from '../firebase/firebaseConfig';

const styles = {
    paperStyles: {
        // margin: "32px",
        marginTop: "5rem",
        width: "100%",
        borderRadius: '10px',
        // height: "600px",
        padding: "5%",
        backgroundColor: "rgb(255,255,255,0.97)"
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

    // Initialize Cloud Firestore and get a reference to the service
    const db = getFirestore(firebaseApp);

    const auth = getAuth(firebaseApp);
    const navigate = useNavigate();

    //Form data
    const [fName, setfName] = useState("");
    const [lName, setlName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConf, setPasswordConf] = useState("");

    async function addUser(uid) {
        //Try adding user to firestore database
        // try {
        //     const docRef = await addDoc(db, "users", {
        //         user_id: uid,
        //         first: fName,
        //         last: lName,
        //         mobile: phone,
        //         email: email
        //     });
        //     console.log("Document written with ID: ", docRef.id);
        // } catch (e) {
        //     console.error("Error adding document: ", e);
        // }
        

        try {
            await setDoc(doc(db, "users", uid), {
                user_id: uid,
                fName: fName,
                lName: lName,
                mobile: phone,
                email: email,
                profile_pic_url: "",
                my_tasks: [],
                assigned_tasks:[],
                my_completed_tasks:[],
                assigned_completed_tasks: []
              });
            console.log("Document written");
        } catch (e) {
            console.error("Error adding document: ", e);
        }
          
    }

    function handleSignup() {
        if(password ==='' || passwordConf==='' || fName ==='' || lName ==='' || phone ==='' || email ===''){
            alert('Please fill the required fields');
            return;
        }
        if (passwordConf !== password) {
            alert("Password doesn't match");
            return;
        }
        //console.log(`${email} \n${password}`);
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;

                //try to add user to firestore database
                addUser(user.uid);

                //Navigate to the dashboard of the user
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
                            <TextField sx={styles.textFieldStyle} label="First Name" variant="outlined" required
                                onChange={(event) => { setfName(event.target.value) }} />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField sx={styles.textFieldStyle} label="Last Name" variant="outlined" required
                                onChange={(event) => { setlName(event.target.value) }} />
                        </Grid>
                        {/* <Grid item xs={8}>
                            <TextField label="Username" variant="outlined" />
                        </Grid> */}
                        <Grid item xs={7}>
                            <TextField sx={styles.textFieldStyle} label="Email" variant="outlined" required
                                onChange={(event) => { setEmail(event.target.value) }} />
                        </Grid>
                        <Grid item xs={7}>
                            <TextField sx={styles.textFieldStyle} label="Mobile" variant="outlined" placeholder='+94771234567' required
                                onChange={(event) => { setPhone(event.target.value) }} />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField sx={styles.textFieldStyle} type={'password'} label="Password" variant="outlined" required
                                onChange={(event) => { setPassword(event.target.value) }} />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField sx={styles.textFieldStyle} type={'password'} label="Confirm Password" variant="outlined" required
                                onChange={(event) => { setPasswordConf(event.target.value) }} />
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