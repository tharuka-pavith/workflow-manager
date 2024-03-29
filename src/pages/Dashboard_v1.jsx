import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import { ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import Fab from '@mui/material/Fab';
import ModeNightIcon from '@mui/icons-material/ModeNight';
import LightModeIcon from '@mui/icons-material/LightMode';

import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import CreateIcon from '@mui/icons-material/Create';
import TaskIcon from '@mui/icons-material/Task';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import HistoryIcon from '@mui/icons-material/History';
import WarningIcon from '@mui/icons-material/Warning';

// React hooks
import { useState, useEffect, useRef } from 'react';

//Custom Alerts
import CustomAlert from '../components/Alerts';
import NotificationSound from '../assests/audio/notification-sound.mp3';

// Firebase function
import { getAuth } from "firebase/auth";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { getDatabase, ref, onChildAdded, onChildChanged, onChildRemoved, onValue } from "firebase/database";

// MUI components
import { Avatar, } from '@mui/material';

// Custom componets
import UserMenu from '../components/userMenu';

import { useNavigate, Outlet } from 'react-router-dom';

/* Dark theme funcionality*/
const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://github.com/tharuka-pavith/workflow-manager">
                WorkFlow
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        '& .MuiDrawer-paper': {
            position: 'relative',
            whiteSpace: 'nowrap',
            width: drawerWidth,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
            boxSizing: 'border-box',
            ...(!open && {
                overflowX: 'hidden',
                transition: theme.transitions.create('width', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen,
                }),
                width: theme.spacing(7),
                [theme.breakpoints.up('sm')]: {
                    width: theme.spacing(9),
                },
            }),
        },
    }),
);

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

// App drawer items
const drawerData = [
    { text: "New Task", path: "/dashboard/newtask", icon: <CreateIcon /> },
    { text: "My Tasks", path: "/dashboard/mytasks", icon: <TaskIcon /> },
    { text: "Assigned Tasks", path: "/dashboard/todotasks", icon: <AssignmentTurnedInIcon /> },
    { text: "Tasks History", path: "/dashboard/history", icon: <HistoryIcon /> },
    { text: "Rejected Tasks", path: "/dashboard/rejected", icon: <WarningIcon /> },
    // { text: "Admin", path: "/dashboard/admin", icon: <AdminPanelSettingsIcon sx={{ marginX: '30%' }} /> },

];

export default function Dashboard_v1() {
    
    //constants
    const auth = getAuth();
    const db = getFirestore();
    const navigate = useNavigate();
    const realtimeDB = getDatabase();
    const audioPlayer = useRef(null);

    // states
    const [userName, setUserName] = useState('');
    const [notificationCount, setNotificationCount] = useState(0);
    const [notifications, setNotifications] = useState([]);

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
    //play notification audio
    function playAudio() {
        audioPlayer.current.play();
      }
    /** */

    const notificationRef = ref(realtimeDB, 'notifications/' + auth.currentUser.uid);

    // Initialize the notification count when the component mounts
    useEffect(() => {
        let initialDataLoaded = false;
        const newNotifications = [];
        const unsubscribe = onChildAdded(notificationRef, (data) => {
            //addCommentElement(postElement, data.key, data.val().text, data.val().author);
            //console.log("data: " , data.val()); // This will log only new data.
            if (initialDataLoaded) {
                //console.log("notification ", data.val()); // This will log only new data.
                newNotifications.push(data.val());
                setNotificationCount((prevCount) => prevCount + 1); // Update count based on previous count
                setNotifications(newNotifications);
                //console.log("Notifications data ", notifications);
                setAlertMessage(`${data.val().type}: ${data.val().task_name}`);
                setAlertSeverity(data.val().severity);
                setAlertOpen(true);
                playAudio();
            } else {
                initialDataLoaded = true;
            }
        });

        // Clean up the subscription when the component unmounts
        return () => {
            unsubscribe();
        };
    }, []); // The empty dependency array ensures this effect runs once on mount


    // useEffect hook
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
    }, [auth.currentUser, db]);

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

    const [open, setOpen] = React.useState(true);
    const toggleDrawer = () => {
        setOpen(!open);
    };

    const [isDark, setIsDark] = useState(false);

    /**Handle Notification menu */
    const [anchorEl, setAnchorEl] = React.useState(null);
    const notificationOpen = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <ThemeProvider theme={isDark ? darkTheme : defaultTheme}>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <AppBar position="absolute" open={open}>
                    <Toolbar
                        sx={{
                            pr: '24px', // keep right padding when drawer closed
                        }}
                    >
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            onClick={toggleDrawer}
                            sx={{
                                marginRight: '36px',
                                ...(open && { display: 'none' }),
                            }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography
                            component="h1"
                            variant="h6"
                            color="inherit"
                            noWrap
                            sx={{ flexGrow: 1 }}
                        >
                            WorkFlow Management System
                        </Typography>

                        <IconButton color="inherit" id="basic-button"
                            aria-controls={notificationOpen ? 'basic-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={notificationOpen ? 'true' : undefined}
                            onClick={handleClick}>
                            <Badge badgeContent={notificationCount} color="secondary">
                                <NotificationsIcon />
                            </Badge>
                        </IconButton>

                        <IconButton color="inherit" onClick={handleProfileClick}>
                            {auth.currentUser !== null ? <Avatar>
                                <img alt='person'
                                    src={auth.currentUser.photoURL ? auth.currentUser.photoURL : `https://avatars.dicebear.com/api/initials/${userName}.svg`} />
                            </Avatar> : "Login"}
                        </IconButton>
                    </Toolbar>
                    <UserMenu userName={userName} menuAnchorEl={menuAnchorEl} handleProfileClose={handleProfileClose} isMenuOpen={isMenuOpen} handleLogout={handleLogout} />
                </AppBar>

                <Drawer variant="permanent" open={open}>
                    <Toolbar
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'flex-end',
                            px: [1],
                        }}
                    >
                        <IconButton onClick={toggleDrawer}>
                            <ChevronLeftIcon />
                        </IconButton>
                    </Toolbar>
                    <Divider />
                    <List component="nav">
                        {drawerData.map((item) => {
                            return (
                                <ListItem disablePadding key={item.text} >
                                    <ListItemButton sx={{ height: "4rem" }} onClick={() => navigate(item.path)}>
                                        <ListItemIcon>
                                            {item.icon}
                                        </ListItemIcon>
                                        <ListItemText primary={item.text} />
                                    </ListItemButton>
                                </ListItem>
                            );
                        })}
                    </List>

                    <Fab sx={{ position: 'fixed', bottom: 20, left: 8 }} onClick={() => setIsDark(!isDark)} >
                        {isDark ? <ModeNightIcon /> : <LightModeIcon />}
                    </Fab>

                </Drawer>
                <Box
                    component="main"
                    sx={{
                        backgroundColor: (theme) =>
                            theme.palette.mode === 'light'
                                ? theme.palette.grey[100]
                                : theme.palette.grey[900],
                        flexGrow: 1,
                        height: '100vh',
                        overflow: 'auto',
                    }}
                >
                    <Toolbar />
                    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                        <Outlet />
                        {/* <Grid container spacing={3}> */}
                        {/* Chart */}
                        {/* <Grid item xs={12} md={8} lg={9}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                  }}
                >
                  <Chart />
                </Paper>
              </Grid> */}
                        {/* Recent Deposits */}
                        {/* <Grid item xs={12} md={4} lg={3}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                  }}
                >
                  <Deposits />
                </Paper>
              </Grid> */}
                        {/* Recent Orders */}
                        {/* <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  <Orders />
                </Paper>
              </Grid> */}
                        {/* </Grid> */}
                        <Copyright sx={{ pt: 4 }} />
                    </Container>
                </Box>
            </Box>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={notificationOpen}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
                PaperProps={{
                    style: {
                      maxHeight: 48 * 4.5,
                      width: '20ch',
                    },
                  }}
            >
                {notifications.map((e) => {
                    return (<><MenuItem onClick={() => { handleClose(); navigate(e.path) }}>
                        <ListItemText>
                            <Typography variant="subtitle2" style={{ display: 'block' }}>
                                {e.task_name}
                            </Typography>
                            <Typography variant="caption" style={{ display: 'block' }} >
                                {e.description}
                            </Typography>
                        </ListItemText>
                    </MenuItem><Divider /></>)
                })}
            </Menu>
            <CustomAlert open={alertOpen} handleClose={handleAlertClose} message={alertMessage} severity={alertSeverity}/>
            <audio ref={audioPlayer} src={NotificationSound} />
        </ThemeProvider>
    );
}