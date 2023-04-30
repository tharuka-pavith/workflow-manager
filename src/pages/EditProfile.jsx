import React from "react";
import { useState, useEffect } from "react";

import { Container, Paper, Typography, Button, Grid, TextField, Stack } from "@mui/material";

import ProfilePicture from "../components/ProfilePicture";

import { getAuth, updateProfile, updateEmail } from "firebase/auth";
import { doc, getDoc, getFirestore } from "firebase/firestore";

import uploadUserProfilePic from "../utils/fileUpload";


function EditProfile() {
    const auth = getAuth();
    const user = auth.currentUser;
    const uid = user.uid;

    const db = getFirestore();

    const [pictureFile, setPictureFile] = useState(null);
    const [fName, setfName] = useState("");
    const [lName, setlName] = useState("");
    const [mobile, setMobile] = useState("");
    const [email, setEmail] = useState("");

    useEffect( ()=>{
        const fetchData = async () => {
            const docRef = doc(db, "users", uid);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists) {
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
        fetchData();
    }, []);


    const handlePictureChange = (file) => {
        setPictureFile(file);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        // update displayName
        if (fName !== null || fName !== "") {
            updateProfile(user, {
                displayName: fName
            }).then(() => {
                // Profile updated!
                console.log("Profile updated");
            }).catch((error) => {
                // An error occurred
                console.log(error.message);
            });
        }

        //update email
        if (email !== null || email !== "") {
            updateEmail(user, email).then(() => {
                // Email updated!
                console.log("Email updated");
            }).catch((error) => {
                // An error occurred
                console.log(error.message);
            });
        }

        //upload profile pic
        if (pictureFile)
            uploadUserProfilePic(user.uid, pictureFile);
    };


    return (
        <Container maxWidth="lg" disableGutters>
            <Paper elevation={0} sx={{ mt: '120px', width: '100%', mx: 'auto' }}>
                <Typography variant='h5' textAlign='left' fontWeight="medium" sx={{ my: '10px' }}>Edit Profile</Typography>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={5}>
                        <Grid item xs={5}>
                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                                    <Typography variant='h6' textAlign='left' fontWeight="medium" sx={{ my: '10px' }}>Edit Personal Details</Typography>
                                </Grid>

                                <Grid item xs={6}>
                                    <TextField fullWidth defaultValue={fName}  value={fName} variant="outlined" label="First Name" type="text"
                                        onChange={(event) => setfName(event.target.value)} />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField fullWidth defaultValue={lName} value={lName} variant="outlined" label="Last Name" type="text"
                                        onChange={(event) => setlName(event.target.value)} />
                                </Grid>

                                <Grid item xs={12}>
                                    <TextField fullWidth defaultValue={email} value={email} variant="outlined" label="Email Address" type="email"
                                        onChange={(event) => setEmail(event.target.value)} />
                                </Grid>

                                <Grid item xs={12}>
                                    <TextField defaultValue={mobile} value={mobile} variant="outlined" label="Phone" type="email"
                                        onChange={(event) => setMobile(event.target.value)} />
                                </Grid>

                                <Grid item xs={12}>
                                    <Button type="submit" variant="contained">
                                        Save
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={4}>
                        
                            <Typography variant='h6' textAlign='left' fontWeight="medium" sx={{ my: '10px' }}>Upload Profile Picture</Typography>
                            
                            {/* <Typography variant='subtitle1' textAlign='left' sx={{ marginBottom: '20px' }}>User ID: {uid}</Typography> */}
                            <ProfilePicture src="https://firebasestorage.googleapis.com/v0/b/workflow-manager-30001.appspot.com/o/users%2FrVtpKQCyKzWCxEOpON556pjDs7Y2%2FProfilePic?alt=media&token=cf0a7093-9b66-4231-a661-fd569ee2ae6a" onChange={handlePictureChange} />
                        </Grid>
                    </Grid>
                </form>



            </Paper>
        </Container >
    );
}

export default EditProfile;