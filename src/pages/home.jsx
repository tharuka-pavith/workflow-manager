import React from 'react';
import { Outlet } from "react-router-dom";

import ApplicationBar from '../components/ApplicationBar';
import { Container, Box, Paper } from '@mui/material';

import backgroundImage from '../assests/imgs/background.jpg';

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
        </Container>
    );
}

export default Home;