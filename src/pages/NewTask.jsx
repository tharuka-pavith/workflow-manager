import React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Upload  from '@mui/icons-material/Upload';

const taskTypes =[
    {key: 1, value: 'Cash voucher'},
    {key: 2, value: 'Approval letter'}
]

function mapTypes(task) {
    return(
        <MenuItem key={task.key} value={task.value}>
            {task.value}
        </MenuItem>
    );
}


function NewTask(){
    return(
    <Container maxWidth='lg' sx={{mt: '120px', width: '100%'}} disableGutters>
        {/* <Paper variant='outlined' sx={{mt: '150px', width: '50%', mx:'auto'}}> */}
        <Typography variant='h5' textAlign={'left'} fontWeight="medium" sx={{ my: '10px' }}>New Task</Typography>
        
        <Grid container sx={{mx:'auto', my: '20px'}} spacing={2}>
            <Grid item xs={6}>
            {/* <Typography variant='subtitle1' sx={{display:'inline', my:'auto', height:'75%'}} >Your Task Name: </Typography> */}
                <TextField variant='outlined' label='Task Name'/>
            </Grid>

            {/* <Grid item xs={6}>
                <TextField select variant='outlined' label='Task Type' helperText='Please select task type'>
                {taskTypes.map(mapTypes)}
                </TextField>
            </Grid> */}

            <Grid item xs={12}>
                <TextField multiline rows={2} maxRows={2} variant='outlined' label='Description' />
            </Grid>

            <Grid item xs={12}>
            <Typography variant='subtitle1'>Attachments : </Typography>
            <Button variant='outlined' startIcon={<Upload/>}>Upload <input hidden accept="image/*" multiple type="file" /></Button>
            </Grid>
            
            <Grid item xs={6} sx={{width: '75%', mx: 'auto'}} >
            <Button size={'large'} variant="outlined" color='error' sx={{marginRight:'20px'}}>Cancel</Button>
            <Button size={'large'} variant="contained" color='primary'>Submit</Button>
            </Grid>

            <Grid item xs={6} sx={{width: '75%', mx: 'auto'}}>
            
            </Grid>

        </Grid>
        {/* </Paper> */}
    </Container>
        );
}

export default NewTask;

