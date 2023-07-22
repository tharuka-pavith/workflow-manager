import React from 'react';

// MUI components
import { Container, Box } from '@mui/material';

// React router
import { Outlet } from "react-router-dom";

// Custom components
import ApplicationBar from '../components/ApplicationBar';
<<<<<<< HEAD
import StickyFooter from '../components/StickyFooter';
=======
>>>>>>> 43422b8868ed13d2e0609c51d7610fb6feaf1a9e

// Assets
import backgroundImage from '../assests/imgs/background.jpg';

// Custom styles for <Home>
const styles = {
    paperContainer: {
      backgroundImage: `url("${backgroundImage}")`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      height: "100vh",
      width: "auto",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }
  };

/**Home component */
function Home() {
    return (
        <Container maxWidth="xl" disableGutters>
                <Box>
                    <ApplicationBar />
                </Box>
                <Box style={styles.paperContainer}>
                    <Box>
                        <Outlet />
                    </Box>
                </Box>
                <StickyFooter/>
        </Container>
    );
}

export default Home;