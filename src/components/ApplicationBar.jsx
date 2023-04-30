import { React, useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/system/Stack';
import { Avatar } from '@mui/material';

import UserMenu from './userMenu'; //UserMenu component
import { useNavigate } from 'react-router-dom';

import { getAuth } from "firebase/auth";
import { doc, getDoc, getFirestore } from "firebase/firestore";

function ApplicationBar() {

    const auth = getAuth();
    const navigate = useNavigate();

    const db = getFirestore();
    const [userName, setUserName] = useState('');
    useEffect(() => {
        const uid = (auth.currentUser !== null) ? auth.currentUser.uid : null;
        if (uid !== null) {
            const fetchData = async () => {
                const docRef = doc(db, "users", uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists) {
                    setUserName(docSnap.data().fName + ' ' + docSnap.data().lName);
                    console.log("Document data:", docSnap.data());
                    console.log("Fname:", docSnap.data().fName);

                } else {
                    // docSnap.data() will be undefined in this case
                    console.log("No such document!");
                }
            };
            fetchData();
        }
    }, [auth.currentUser]);

    // const [isLoggedIN, setIsLoggedIN] = useState(true);
    const [menuAnchorEl, setMenuAnchorEl] = useState(null); //Anchor element for usermenu
    const isMenuOpen = Boolean(menuAnchorEl);
    const handleProfileClick = (event) => {
        if (auth.currentUser === null) {
            navigate("/home/login");
        } else {
            setMenuAnchorEl(event.currentTarget);
        }
    }
    const handleProfileClose = () => {
        setMenuAnchorEl(null);
    };
    const handleLogout = async () => {
        //await setIsLoggedIN(false);
        await setMenuAnchorEl(null);
        //navigate("/home/welcome");
    }


    return (
        <Box sx={{ flexGrow: 1, display: 'flex', width: "100%", zIndex: 'modal', position: 'fixed', top: 0, marginX: 0 }}>

            {/* <Box sx={{ flexGrow: 1, display: 'flex', width: "100%", zIndex: 'tooltip', position: 'fixed', top: 0, marginX: 0}}> */}
            <AppBar position="static" sx={{ padding: ".5rem", backgroundColor: "#364F6B" }} elevation={1}>
                <Toolbar>

                    <Stack spacing={0.1} sx={{ flexGrow: 1 }}>
                        <Typography variant="h5" component="div" fontFamily={'sans-serif'}>
                            WorkFlow
                        </Typography>
                        {/* <Typography variant="subtitle1" component="div">
                            Faculty of Engineering - University of Ruhuna
                        </Typography> */}
                    </Stack>

                    <Button color="inherit" onClick={handleProfileClick}>
                        {auth.currentUser !== null ? <Avatar>
                            <img alt='person'
                                src={`https://avatars.dicebear.com/api/initials/${userName}.svg`} />
                        </Avatar> : "Login"}
                    </Button>
                </Toolbar>
            </AppBar>
            <UserMenu userName={userName} menuAnchorEl={menuAnchorEl} handleProfileClose={handleProfileClose} isMenuOpen={isMenuOpen} handleLogout={handleLogout} />
        </Box>

    );
}

export default ApplicationBar;
