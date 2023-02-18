import React from 'react';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box'
import Button from '@mui/material/Button';

const paperStyles = {
    margin: '50px',
    borderRadius: '10px',
    width: '75%',
    padding: "5px"
}

const gridStyle = {
    margin: '10px',
    padding: '5px'
}


const buttonStyle = {
    width: '100%',
    mx: 'auto'
}

function Login() {
    return (
        <Container maxWidth='sm'>
            <Paper elevation={4} sx={paperStyles}>
                <Typography variant='h4' textAlign={'center'} fontWeight="medium" sx={{ my: '10px' }}>Login</Typography>
                <Box sx={gridStyle}>
                    <Stack spacing={3} alignItems="center">
                        <Box><TextField label="Username" variant="outlined" /></Box>

                        <Box><TextField label="Password" type="password" variant="outlined" /></Box>
                    </Stack>

                    <Stack sx={{mt: '20px'}} direction='row' spacing={2} alignItems="center" justifyContent="center">
                        <Box><Button size={'large'} sx={buttonStyle} variant="contained" color='success'>Signup</Button></Box>
                        <Box> <Button size={'large'} sx={buttonStyle} variant="outlined" color='error'>Cancel</Button></Box>
                    </Stack>








                </Box>

            </Paper>

        </Container>

    );
}

export default Login;