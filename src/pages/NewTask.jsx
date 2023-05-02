import React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Upload from '@mui/icons-material/Upload';

//For date picker
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import MenuItem from '@mui/material/MenuItem';

import WorkflowSelect from '../components/WorkFlowSelect';

const currencies = [
    {
        value: '1',
        label: 'Cash Voucher',
    },
    {
        value: '2',
        label: 'Approval Letter',
    },
    {
        value: '3',
        label: 'Confirmation Letter',
    },
    {
        value: '4',
        label: 'Voucher',
    },
];

function NewTask() {
    return (
        <Container maxWidth='lg' sx={{ mt: '120px', width: '100%' }} disableGutters>
            {/* <Paper variant='outlined' sx={{mt: '150px', width: '50%', mx:'auto'}}> */}
            <Typography variant='h5' textAlign={'left'} fontWeight="medium" sx={{ my: '10px' }}>New Task</Typography>

            <Grid container sx={{ mx: 'auto', my: '10px' }} spacing={4}>

                <Grid item xs={5}> {/*Right side of the form*/}
                    <Grid container spacing={4}>
                        <Grid item xs={12}>
                            <TextField variant='outlined' label='Task Name' sx={{ width: '70%' }} />
                        </Grid>
                        <Grid item xs={12}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker label='Due Date' />
                            </LocalizationProvider>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField multiline rows={2} maxRows={2} variant='outlined' label='Description' sx={{ width: '70%' }} />
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant='subtitle1'>Attachments : </Typography>
                            <Button variant='outlined' startIcon={<Upload />}>Upload <input hidden accept="image/*" multiple type="file" /></Button>
                        </Grid>

                    </Grid>
                </Grid>

                <Grid item xs={5}> {/*Left Side of the form */}
                    <Grid container spacing={4}>
                        <Grid item xs={12}>
                        <TextField
                        sx={{width:'60%'}}
                        id="outlined-select-currency"
                        select
                        label="Select"
                        defaultValue="2"
                        helperText="Select your task type"
                    >
                        {currencies.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                        </Grid>

                        <Grid item xs={12}>
                        <WorkflowSelect fullWidth />
                        </Grid>
                    </Grid>
                    
                    
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

