import React, { useState } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Upload from '@mui/icons-material/Upload';
import { Paper } from '@mui/material';

//For date picker
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import MenuItem from '@mui/material/MenuItem';

import WorkflowSelect from '../components/WorkFlowSelect';
import insertTask from '../utils/insertTask';

import { useNavigate } from 'react-router-dom';

const taskTypes = [
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

    const navigate = useNavigate();

    const [taskName,setTaskName] = useState('');
    const [dueDate, setDueDate] = useState(null);
    const [description, setDescription] = useState('');
    const [taskType, setTaskType] = useState('');
    const [workflow, setWorkflow] = useState('');

    const handleWorkflowChange = (values) => {
        setWorkflow(values);
    };

    function handleSubmit(event){
        event.preventDefault();
        //taskTypes[taskType-1] is not used for now
        console.log(taskName,description,dueDate);
        console.log(workflow);
        insertTask(taskName, dueDate, description, workflow); //insert task to firestore DB
        navigate("/dashboard/mytasks"); //After insert, navigate
    }

    function handleDateChange(date){
        setDueDate(date.$d);
        console.log(dueDate);
    }

    return (
        <Container maxWidth='lg' sx={{ mt: '120px', width: '100%' }}>
            <Paper elevation={7} sx={{ padding: '2%' }}>
                {/* <Paper variant='outlined' sx={{mt: '150px', width: '50%', mx:'auto'}}> */}
                <Typography variant='h5' textAlign={'left'} fontWeight="medium" sx={{ my: '10px' }}>New Task</Typography>

                <form onSubmit={handleSubmit}>
                <Grid container sx={{ mx: 'auto', my: '10px' }} spacing={4}>

                    <Grid item xs={5}> {/*Right side of the form*/}
                        <Grid container spacing={4}>
                            <Grid item xs={12}>
                                <TextField variant='outlined' label='Task Name' value={taskName} 
                                onChange={(e)=>{setTaskName(e.target.value)}} sx={{ width: '70%' }} />
                            </Grid>
                            <Grid item xs={12}>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker value={dueDate} label='Due Date' onChange={handleDateChange} />
                                </LocalizationProvider>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField multiline rows={2} maxRows={2} variant='outlined' label='Description' 
                                sx={{ width: '70%' }} helperText="Add some description" value={description}
                                onChange={(e)=>{setDescription(e.target.value)}}/>
                            </Grid>
                            <Grid item xs={12}>
                                <input
                                    accept="image/*"
                                    id="profile-picture-upload"
                                    type="file"
                                    
                                    style={{ display: 'none' }}
                                />
                                <Typography variant='subtitle1'>Attachments : </Typography>
                                <label htmlFor="profile-picture-upload">
                                <Button variant='outlined' startIcon={<Upload />}>Upload <input hidden accept="image/*" multiple type="file" /></Button>
                                </label>
                            </Grid>

                        </Grid>
                    </Grid>

                    <Grid item xs={5}> {/*Left Side of the form */}
                        <Grid container spacing={4}>
                            <Grid item xs={12}>
                                <TextField
                                    sx={{ width: '60%' }}
                                    id="outlined-select-currency"
                                    select
                                    label="Task Type"
                                    defaultValue="2"
                                    helperText="Select your task type"
                                    value={taskType}
                                    onChange={(e)=>{setTaskType(e.target.value)}}
                                >
                                    {taskTypes.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>

                            <Grid item xs={12}>
                                <WorkflowSelect fullWidth 
                                selectedValues = {workflow}
                                onChange={handleWorkflowChange} />
                            </Grid>
                        </Grid>


                    </Grid>

                    <Grid item alignContent={'center'} alignItems={'center'} xs={12} sx={{ width: '75%', mx: 'auto' }} >
                        <Button size={'large'} variant="outlined" color='error' sx={{ marginRight: '20px' }}
                        >Cancel</Button>
                        <Button size={'large'} variant="contained" color='primary' type='submit'
                        >Submit</Button>
                    </Grid>

                </Grid>
                </form>
            </Paper>
        </Container>

    );
}

export default NewTask;

