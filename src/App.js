import React from "react";

import AppRouter from "./router/AppRouter"; //from router/AppRouter.jsx
import FirebaseApp from './firebase/firebaseConfig';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

/* Dark theme funcionality*/
// const darkTheme = createTheme({
//   palette: {
//     mode: 'dark',
//   },
// });

const theme = createTheme({
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    fontSize: 14,
    subtitle1: {
      fontSize: 18,
    },
    button: {
      textTransform: "none",
      fontSize: 18,
    },
  },
});

/**App Component */
function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppRouter />
    </ThemeProvider>
  );
}

export default App;
