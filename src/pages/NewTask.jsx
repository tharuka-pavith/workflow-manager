import React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Upload from '@mui/icons-material/Upload';


import WorkflowSelect from '../components/WorkFlowSelect';




function NewTask() {
    return (
        <Container maxWidth='lg' sx={{ mt: '120px', width: '100%' }} disableGutters>
            {/* <Paper variant='outlined' sx={{mt: '150px', width: '50%', mx:'auto'}}> */}
            <Typography variant='h4' textAlign={'left'} fontWeight="medium" sx={{ my: '10px' }}>New Task</Typography>

            <Grid container sx={{ mx: 'auto', my: '10px'}} spacing={7}>
               
                <Grid item xs={6}> {/*Right side of the form*/}
                    <Grid container spacing={5}>
                        <Grid item xs={12}>
                            <TextField fullWidth variant='outlined' label='Task Name' />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField multiline fullWidth rows={2} maxRows={2} variant='outlined' label='Description' />
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant='subtitle1'>Attachments : </Typography>
                            <Button variant='outlined' startIcon={<Upload />}>Upload <input hidden accept="image/*" multiple type="file" /></Button>
                        </Grid>
                        
                    </Grid>
                </Grid>

                <Grid item xs={6}> {/*Left Side of the form */}
                    <WorkflowSelect fullWidth/>
                </Grid>

                <Grid item alignContent={'center'} alignItems={'center'} xs={12} sx={{ width: '75%', mx: 'auto' }} >
                            <Button size={'large'} variant="outlined" color='error' sx={{ marginRight: '20px' }}>Cancel</Button>
                            <Button size={'large'} variant="contained" color='primary'>Submit</Button>
                </Grid>

            </Grid>
        </Container>
    );
}

export default NewTask;

