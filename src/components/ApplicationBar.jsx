import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { Stack } from '@mui/system';

//import MenuIcon from '@mui/icons-material/Menu';

function ApplicationBar() {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" sx={{padding:"1rem", backgroundColor: "#364F6B"}} elevation={1}>
                <Toolbar>

                    <Stack spacing={.1} sx={{ flexGrow: 1}}> 
                        <Typography variant="h5" component="div">
                            Workflow Management System
                        </Typography>
                        <Typography variant="subtitle1" component="div">
                            Faculty of Engineering - University of Ruhuna
                        </Typography>
                    </Stack>

                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default ApplicationBar;
