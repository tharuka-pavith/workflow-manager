import React from "react";
import { useState } from "react";

import { Container, Paper, Typography, Button, Grid, TextField, Stack } from "@mui/material";

import ProfilePicture from "../components/ProfilePicture";

import { getAuth, updateProfile, updateEmail } from "firebase/auth";
import uploadUserProfilePic from "../utils/fileUpload";


function EditProfile() {
    const auth = getAuth();
    const user = auth.currentUser;
    const UID = user.uid;

    const [pictureFile, setPictureFile] = useState(null);
    const [displayName, setDisplayName] = useState(user.displayName);
    const [email, setEmail] = useState(user.email);

    const handlePictureChange = (file) => {
        setPictureFile(file);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        // update displayName
        if(displayName !== null || displayName !== ""){
            updateProfile(user, {
                displayName: displayName
            }).then(() => {
                // Profile updated!
                console.log("Profile updated");
              }).catch((error) => {
                // An error occurred
                console.log(error.message);
              });
        }

        //update email
        if(email !== null || email !== ""){
            updateEmail(user, email).then(() => {
                // Email updated!
                console.log("Email updated");
              }).catch((error) => {
                // An error occurred
                console.log(error.message);
              });
        }

        //upload profile pic
        uploadUserProfilePic(user.uid, pictureFile);
    };


    return (
        <Container maxWidth="lg" disableGutters>
            <Paper elevation={0} sx={{ mt: '120px', width: '100%', mx: 'auto' }}>
                <Typography variant='h5' textAlign='left' fontWeight="medium" sx={{ my: '10px' }}>Edit Profile</Typography>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>

                        <Grid item xs={4}>
                            <Typography variant='subtitle1' textAlign='left' sx={{ marginBottom: '20px' }}>User ID: {UID}</Typography>
                            {/* <ProfilePicture src="https://firebasestorage.googleapis.com/v0/b/workflow-manager-30001.appspot.com/o/users%2FrVtpKQCyKzWCxEOpON556pjDs7Y2%2FProfilePic?alt=media&token=cf0a7093-9b66-4231-a661-fd569ee2ae6a" onChange={handlePictureChange} /> */}
                        </Grid>

                        <Grid item xs={4}>

                            <Stack spacing={2}>
                                <TextField defaultValue={displayName} vlaue={displayName} variant="outlined" label="Name" type="text"
                                    onChange={(event) => setDisplayName(event.target.value)} />

                                <TextField defaultValue={email} vlaue={email} variant="outlined" label="New Email Address" type="email"
                                    onChange={(event) => setEmail(event.target.value)} />

                                {/* <Button type="submit" variant="contained" disabled={!pictureFile} >
                                    Save
                                </Button> */}

                                <Button type="submit" variant="contained">
                                    Save
                                </Button>
                            </Stack>

                        </Grid>
                    </Grid>
                </form>



            </Paper>
        </Container >
    );
}

export default EditProfile;