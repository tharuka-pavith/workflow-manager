import React, { useState } from 'react';

//React router
import { useNavigate } from 'react-router-dom';

// MUI components
import {Container, Paper, Typography, TextField, Grid, Box, Button} from '@mui/material';

// Firebase functions
import { getFirestore, doc, setDoc } from "firebase/firestore";
import {  getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import firebaseApp from '../firebase/firebaseConfig';

// Custom alerts
import CustomAlert from '../components/Alerts';

// Custom styles
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

/**Signup component */
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

    /**Handle alerts */
    const [alertOpen, setAlertOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertSeverity, setAlertSeverity] = useState('success');

    const handleAlertClick = () => {
        setAlertOpen(true);
      };
      const handleAlertClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setAlertOpen(false);
      };
    /** */

    async function addUser(uid) {
        try {
            await setDoc(doc(db, "users", uid), {
                user_id: uid,
                fName: fName,
                lName: lName,
                full_name: fName+" "+ lName,
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
            //alert('Please fill the required fields');
            setAlertMessage('Please fill the required fields');
            setAlertSeverity('error');
            setAlertOpen(true);
            return;
        }
        if (passwordConf !== password) {
            //alert("Password doesn't match");
            setAlertMessage("Password doesn't match");
            setAlertSeverity('error');
            setAlertOpen(true);
            return;
        }
        //console.log(`${email} \n${password}`);
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;

                //try to add user to firestore database
                addUser(user.uid);

                //try upddating display name
                updateProfile(auth.currentUser, {
                    displayName: fName + " " + lName
                  }).then(() => {
                    // Profile updated!
                    console.log("Display name updated");
                  }).catch((error) => {
                    // An error occurred
                    console.log("Error in updating display name");
                  });

                //Navigate to the dashboard of the user
                navigate("/dashboard/newtask");
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // ..
                //console.log(error.message);
                if(error.code === 'auth/email-already-in-use'){
                    setAlertMessage("Email already in use!");
                }else if(error.code === "auth/weak-password"){
                    setAlertMessage("Weak password!");
                }else{
                    setAlertMessage(error.code);
                }
                setAlertSeverity('error');
                setAlertOpen(true);
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
        <CustomAlert open={alertOpen} handleClose={handleAlertClose} message={alertMessage} severity={alertSeverity}/>
        </Container>

    );
}

export default Signup;