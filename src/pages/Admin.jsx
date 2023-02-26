import React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';


function Admin(){
    return (
        <Container maxWidth="lg">
            <Paper elevation={0} sx={{ mt: '120px', width: '100%', mx: 'auto' }}>
                <Typography variant='h5' textAlign='left' fontWeight="medium" sx={{ my: '10px' }}>Create or Edit Workflows</Typography>

                <Grid container spacing={3}>
                    <Grid item xs={4}>
                    <Typography variant='h5' textAlign='left' >this is admin section</Typography>
                    </Grid>

                    {/* <Grid item xs={4}>
                        <TaskCard heading="Voucher" details="This is a cash voucher" />
                    </Grid>

                    <Grid item xs={4}>
                        <TaskCard heading="Voucher" details="This is a cash voucher" />
                    </Grid>

                    <Grid item xs={4}>
                        <TaskCard heading="Voucher" details="This is a cash voucher" />
                    </Grid> */}
                </Grid>
            </Paper>
        </Container>
    );
}

export default Admin;