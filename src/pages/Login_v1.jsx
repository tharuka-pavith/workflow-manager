import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
//import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// React Router
import { Link, useNavigate } from 'react-router-dom';
//import Link_router from 'react-router-dom';

import backgroundImage from '../assests/imgs/Imagenew2.jpg';

//Firebase functions
import { getAuth, signInWithEmailAndPassword, setPersistence, browserSessionPersistence, sendPasswordResetEmail } from "firebase/auth";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth"; //for google signin
import { getFirestore, doc, setDoc } from "firebase/firestore";
import firebaseApp from '../firebase/firebaseConfig';

import { useState } from 'react';

// Custom components
import CustomAlert from '../components/Alerts';
import { logDOM } from '@testing-library/react';

//mui icons
import GoogleIcon from '@mui/icons-material/Google';

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

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function SignInSide() {

  const auth = getAuth();
  // Initialize Cloud Firestore and get a reference to the service
  const db = getFirestore(firebaseApp);

  //States
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState({ message: "", severity: "", open: false });

  //Form data
  // const [fName, setfName] = useState("");
  // const [lName, setlName] = useState("");
  // const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

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

  async function addUser(user) {
    try {
      await setDoc(doc(db, "users", user.uid), {
        user_id: user.uid,
        fName: user.displayName.split(" ")[0],
        lName: user.displayName.split(" ")[1],
        full_name: user.displayName,
        mobile: user.phoneNumber,
        email: user.email,
        profile_pic_url: user.photoURL,
        my_tasks: [],
        assigned_tasks: [],
        my_completed_tasks: [],
        assigned_completed_tasks: []
      });
      console.log("Document written");
    } catch (e) {
      console.error("Error adding document: ", e);
    }

  }

  /**Handle th sign in function */
  function handleSignIn() {
    setPersistence(auth, browserSessionPersistence)
      .then(() => {
        // Existing and future Auth states are now persisted in the current
        // session only. Closing the window would clear any existing state even
        // if a user forgets to sign out.
        // ...
        // New sign-in will be persisted with session persistence.
        //return signInWithEmailAndPassword(auth, email, password);
        return signInWithEmailAndPassword(auth, email, password)
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
            setAlertMessage(errorMessage);
            setAlertSeverity('error');
            setAlertOpen(true);
            //setAlert({ message: errorCode, severity: "error", open: true });
          });
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        setAlertMessage(errorCode);
        setAlertSeverity('error');
        setAlertOpen(true);
      });

  }

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   const data = new FormData(event.currentTarget);
  //   console.log({
  //     email: data.get('email'),
  //     password: data.get('password'),
  //   });
  // };

  function handleGoogleSignIn() {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    console.log('starting popup');
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // IdP data available using getAdditionalUserInfo(result)
        console.log("Login Successful!!");
        console.log(user);
        if (user.metadata.creationTime === user.metadata.lastSignInTime) { //new user
          console.log("new user");
          addUser(user);
        }
        navigate("/dashboard/mytasks");
      }).catch((error) => {
        // Handle Errors here.
        //const errorCode = error.code;
        //const errorMessage = error.message;
        // The email of the user's account used.
        //const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
        console.error(error);
      });
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url("${backgroundImage}")`,
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>

            <Box sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={(event) => setEmail(event.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(event) => setPassword(event.target.value)}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button

                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={(e) => handleSignIn()}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link to={"/home/signup"} variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>

              <Button endIcon={<GoogleIcon />} fullWidth size='large' variant="outlined" sx={{ mt: '5%' }}
                onClick={(e) => handleGoogleSignIn()}>
                Continue with Google
              </Button>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
      <CustomAlert open={alertOpen} handleClose={handleAlertClose} message={alertMessage} severity={alertSeverity}/>
    </ThemeProvider>
  );
}