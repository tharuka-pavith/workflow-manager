import React from 'react';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box'
import Button from '@mui/material/Button';

const paperStyles = {
    margin: "32px",
    borderRadius: '10px',
    // height: "600px",
    padding: "5px"
}

const gridStyle = {
    margin: '10px',
    padding: '5px'
}

const textFieldStyle = {
    width: "100%",
    mx: 'auto'
}

const buttonStyle ={
    width: '100%',
    mx: 'auto'
}

function Signup() {
    return (
        <Container maxWidth="sm">
            <Paper elevation={4} sx={paperStyles}>
                <Typography variant='h4' textAlign={'center'} fontWeight="medium" sx={{my: '10px'}}>Signup</Typography>

                <Box sx={gridStyle}>
                    <Grid container={true} spacing={4} >
                        <Grid item xs={6}>
                            <TextField sx={textFieldStyle} id="outlined-basic" label="First Name" variant="outlined" />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField sx={textFieldStyle} id="outlined-basic" label="Last Name" variant="outlined" />
                        </Grid>
                        <Grid item xs={8}>
                            <TextField  id="outlined-basic" label="Username" variant="outlined" />
                        </Grid>
                        <Grid item xs={7}>
                            <TextField sx={textFieldStyle} id="outlined-basic" label="Email" variant="outlined" />
                        </Grid>
                        <Grid item xs={7}>
                            <TextField sx={textFieldStyle} id="outlined-basic" label="Mobile" variant="outlined" />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField sx={textFieldStyle} id="outlined-basic" type={'password'} label="Password" variant="outlined" />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField sx={textFieldStyle} id="outlined-basic" type={'password'} label="Confirm Password" variant="outlined" />
                        </Grid>
                        <Grid item xs={6}>
                            <Button size={'large'} sx={buttonStyle} variant="outlined" color='error'>Cancel</Button>
                        </Grid>
                        <Grid item xs={6}>
                            <Button size={'large'} sx={buttonStyle} variant="contained" color='success'>Signup</Button>
                        </Grid>
                    </Grid>


                </Box>

            </Paper>

        </Container>

    );
}

export default Signup;