import React from "react";

// React hooks
import { useState, useEffect } from "react";

// MUI components
import { Container, Paper, Typography, Button, Grid, TextField, Stack, MenuItem } from "@mui/material";

// Firebase functions
import { getAuth, updateProfile, updateEmail, sendPasswordResetEmail, sendEmailVerification } from "firebase/auth";
import { doc, getDoc, updateDoc, getFirestore } from "firebase/firestore";

// Custom components and utility files
//import uploadUserProfilePic from "../utils/fileUpload";
//import ProfilePicture from "../components/ProfilePicture";
import DeleteAccDialog from "../components/DeleteAccDialog";

// User designations array is required when updating user designations
const userDesignations = [
    {
        value: '1',
        label: 'Lecturer',
    },
    {
        value: '2',
        label: 'Department Head (DEIE)',
    },
    {
        value: '3',
        label: 'Department Head (CEE)',
    },
    {
        value: '4',
        label: 'Department Head (DMME)',
    },
    {
        value: '5',
        label: 'Dean (Faculty of Engineering)',
    },
    {
        value: '6',
        label: 'Assistant Registrar (Engineering)',
    },
    {
        value: '7',
        label: 'Vice Chancellor',
    },
    {
        value: '8',
        label: 'Registrar',
    },
];


/**Edit profile component */
function EditProfile() {
    //variables
    const auth = getAuth();
    const user = auth.currentUser;
    const uid = user.uid;
    const db = getFirestore();

    //state hooks
    const [pictureFile, setPictureFile] = useState(null);
    const [fName, setfName] = useState("");
    const [lName, setlName] = useState("");
    const [mobile, setMobile] = useState("");
    const [email, setEmail] = useState("");
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

    function handlePasswordResetEmail() {
        const auth = getAuth();
        sendPasswordResetEmail(auth, auth.currentUser.email)
            .then(() => {
                // Password reset email sent!
                // ..
                alert(`Password reset email sent to ${email}`);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // ..
            });
    }

    function handleVerificationEmail() {
        const auth = getAuth();
        sendEmailVerification(auth.currentUser)
            .then(() => {
                // Email verification sent!
                // ...
                alert(`Email verification sent to ${auth.currentUser.email}`);
            });
    }

    //run when component loads
    useEffect(() => {
        const fetchData = async () => {
            const docRef = doc(db, "users", uid); //get a reference to relevant user document
            const docSnap = await getDoc(docRef); //get a snapshot of the user document

            if (docSnap.exists) { //if the snapshot exists: update user data
                // console.log(docSnap.data());
                setfName(docSnap.data().fName);
                setlName(docSnap.data().lName);
                setMobile(docSnap.data().mobile);
                setEmail(docSnap.data().email);
            } else {
                // docSnap.data() will be undefined in this case
                console.log("No such document!");
            }
        };
        fetchData(); //run the anonymous function
    }, []); // [] sets dependancies

    /**
     * Handles profile picture change
     **/
    const handlePictureChange = (file) => {
        setPictureFile(file);
    };

    /**
     * Handles submission of user data
     */
    const handleSubmit = (event) => {
        event.preventDefault();

        // update authentication displayName
        if (fName !== null || fName !== "") {
            updateProfile(user, {
                displayName: fName
            }).then(() => {
                // After profile is updated,
                console.log("Profile updated");
            }).catch((error) => {
                // If an error occurred
                console.log(error.message);
            });
        }

        //update authentication email & email in the firestore DB
        if (email !== null || email !== "") {
            if (email !== auth.currentUser.email) {
                updateEmail(user, email).then(() => {
                    // Email updated!
                    console.log("Authentication email updated");
                }).catch((error) => {
                    // An error occurred
                    console.log(error.message);
                });
            }
        }

        const userRef = doc(db, 'users', uid); //get a reference for the user from DB

        async function update() { //Update the user information
            await updateDoc(userRef, { fName: fName, lName: lName, email: email, mobile: mobile });
        }
        update();

        //upload profile pic
        // if (pictureFile)
        //    uploadUserProfilePic(user.uid, pictureFile);
    };


    return (
        <Container maxWidth="sm" disableGutters>
            {/* <Paper elevation={0} sx={{ mt: '120px', width: '100%', mx: 'auto' }}> */}
            <Paper elevation={12} sx={{ p: '5%' }} >
                <Typography variant='h5' textAlign='center' fontWeight="medium" sx={{ my: '10px' }}>Edit Profile</Typography>

                <form onSubmit={handleSubmit}>
                    <Grid container spacing={3}>
                        {/* <Grid item xs={12}>
                            <Typography variant='h6' textAlign='center' fontWeight="medium" sx={{ my: '10px' }}>Edit Personal Details</Typography>
                        </Grid> */}

                        <Grid item xs={6}>
                            <TextField fullWidth defaultValue={fName} value={fName} variant="outlined" label="First Name" type="text"
                                onChange={(event) => setfName(event.target.value)} />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField fullWidth defaultValue={lName} value={lName} variant="outlined" label="Last Name" type="text"
                                onChange={(event) => setlName(event.target.value)} />
                        </Grid>

                        <Grid item xs={8}>
                            <TextField fullWidth defaultValue={email} value={email} variant="outlined" label="Email Address" type="email"
                                onChange={(event) => setEmail(event.target.value)} />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField defaultValue={mobile} value={mobile} variant="outlined" label="Phone" type="phone"
                                onChange={(event) => setMobile(event.target.value)} />
                        </Grid>

                        <Grid item xs={12} sx={{marginBottom: '0.1%'}}>
                            <Button onClick={(e) => handlePasswordResetEmail()} variant="text" >
                                Reset Password
                            </Button>
                        </Grid>

                        <Grid item xs={12} sx={{marginTop: '0.1%'}}>
                            <Button onClick={(e) => handleVerificationEmail()} variant="text" >
                                Send email verification link
                            </Button>
                        </Grid>

                        <Grid item xs={12}>
                            <Button type="submit" variant="contained" >
                                Save
                            </Button>
                        </Grid>
                        <Grid item xs={12}>
                            <Button variant="contained" color="error"
                                onClick={() => {
                                    if (!deleteDialogOpen) setDeleteDialogOpen(true);
                                }}>
                                Delete Account
                                <DeleteAccDialog
                                    open={deleteDialogOpen}
                                    onClose={() => { setDeleteDialogOpen(false) }} />
                            </Button>
                        </Grid>
                    </Grid>
                    {/* <Grid item xs={4}>

                            <Typography variant='h6' textAlign='left' fontWeight="medium" sx={{ my: '10px' }}>Update Designation</Typography>

                            <TextField
                                sx={{ width: '60%' }}
                                id="outlined-select-currency"
                                select
                                label="Title"
                                defaultValue="1"
                                helperText="Select your designation"
                            >
                                {userDesignations.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                            <Button type="submit" variant="contained" >
                                Update
                            </Button> */}

                    {/* <Typography variant='subtitle1' textAlign='left' sx={{ marginBottom: '20px' }}>User ID: {uid}</Typography> */}
                    {/* <ProfilePicture src="https://firebasestorage.googleapis.com/v0/b/workflow-manager-30001.appspot.com/o/users%2FrVtpKQCyKzWCxEOpON556pjDs7Y2%2FProfilePic?alt=media&token=cf0a7093-9b66-4231-a661-fd569ee2ae6a" 
                            onChange={handlePictureChange} /> */}

                    {/* </Grid> */}

                </form>
            </Paper>
        </Container >
    );
}

export default EditProfile;