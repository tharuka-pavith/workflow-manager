import React from 'react';

// MUI components
import { Container, Box } from '@mui/material';

// React router
import { Outlet } from "react-router-dom";

// Custom components
import ApplicationBar from '../components/ApplicationBar';
import StickyFooter from '../components/StickyFooter';


// Assets
import backgroundImage from '../assests/imgs/background.jpg';

// Custom styles for <Home>
const styles = {
    paperContainer: {
      
      
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
                    
                        <Outlet />
                    
                </Box>
                <StickyFooter/>
        </Container>
    );
}

export default Home;