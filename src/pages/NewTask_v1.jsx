import React, { useEffect, useState } from 'react';

// React router hooks
import { useNavigate } from 'react-router-dom';

// MUI components
import { Paper, Container, Typography, Grid, TextField, Button, MenuItem } from '@mui/material';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';


// MUI icons
import { Upload } from '@mui/icons-material';

//For date picker
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

//Custom components and utils
import WorkflowSelect from '../components/WorkFlowSelect';
import insertTask from '../utils/insertTask';


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

const steps = ['Enter task Details', 'Set the workflow', 'Confirm and submit']; //Steps for the stepper

/**NewTask component */
function NewTask_v1() {

    const navigate = useNavigate();

    const [taskName, setTaskName] = useState('');
    const [dueDate, setDueDate] = useState(null);
    const [description, setDescription] = useState('');
    const [taskType, setTaskType] = useState('');
    const [assignees, setAssignees] = useState(''); //select assignees by searching
    const [workflow, setWorkflow] = useState(''); //the final workflow derived from assignees


    const handleAssigneeChange = (values) => {
        setAssignees(values);
    }

    const handleWorkflowChange = (values) => {
        setWorkflow(values);
    };

    function handleSubmit() {
        //event.preventDefault();
        //taskTypes[taskType-1] is not used for now
        //setWorkflow(right);
        if (workflow.length === 0 || taskName === '' || dueDate === null || description === '') {
            alert("You have not filled some reqiured fields. Please check again!");
            setActiveStep(0);
        } else {
            console.log(taskName, description, dueDate);
            console.log(workflow);
            insertTask(taskName, dueDate, description, workflow); //insert task to firestore DB
            //navigate("/dashboard/mytasks"); //After insert, navigate
        }

    }

    function handleDateChange(date) {
        setDueDate(date.$d);
        //console.log(dueDate);
    }


    /**Variables and functions for the stepper */
    const [activeStep, setActiveStep] = React.useState(0);
    const [skipped, setSkipped] = React.useState(new Set());

    const isStepOptional = (step) => {
        return false;
    };

    const isStepSkipped = (step) => {
        return skipped.has(step);
    };

    const handleNext = () => {
        let newSkipped = skipped;
        if (isStepSkipped(activeStep)) {
            newSkipped = new Set(newSkipped.values());
            newSkipped.delete(activeStep);
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);

        //my code for submission
        if (activeStep === steps.length - 1) {
            //handleWorkflowChange(right);
            //setWorkflow(right);
            //console.log('at submit',workflow);
            handleSubmit();
        }
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleSkip = () => {
        if (!isStepOptional(activeStep)) {
            // You probably want to guard against something like this,
            // it should never occur unless someone's actively trying to break something.
            throw new Error("You can't skip a step that isn't optional.");
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped((prevSkipped) => {
            const newSkipped = new Set(prevSkipped.values());
            newSkipped.add(activeStep);
            return newSkipped;
        });
    };

    const handleReset = () => {
        setRight([]);
        setLeft([]);
        setWorkflow([]);
        setTaskName('');
        setDueDate(null);
        setDescription('');
        setAssignees('');
        setActiveStep(0);
    };


    /**Variables and functions for TransferList */
    function not(a, b) {
        return a.filter((value) => b.indexOf(value) === -1);
    }

    function intersection(a, b) {
        return a.filter((value) => b.indexOf(value) !== -1);
    }

    const [checked, setChecked] = React.useState([]);
    const [left, setLeft] = React.useState([]);
    const [right, setRight] = React.useState([]);

    const leftChecked = intersection(checked, left);
    const rightChecked = intersection(checked, right);

    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };

    const handleAllRight = () => {
        setRight(right.concat(left));
        setLeft([]);
    };

    const handleCheckedRight = () => {
        setRight(right.concat(leftChecked));
        setLeft(not(left, leftChecked));
        setChecked(not(checked, leftChecked));
    };

    const handleCheckedLeft = () => {
        setLeft(left.concat(rightChecked));
        setRight(not(right, rightChecked));
        setChecked(not(checked, rightChecked));
    };

    const handleAllLeft = () => {
        setLeft(left.concat(right));
        setRight([]);
    };


    /**Step one */
    function stepOne(params) {
        return (
            <Grid container sx={{ mx: 'auto', my: '20px' }} spacing={4}>
                <Grid item xs={6}>
                    <TextField variant='outlined' label='Task Name' value={taskName}
                        onChange={(e) => { setTaskName(e.target.value) }} sx={{ width: '70%' }} />
                </Grid>
                <Grid item xs={6}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        {/**value prop gives an error */}
                        {/* <DatePicker value={dueDate} label='Due Date' onChange={handleDateChange} /> */}
                        <DatePicker label='Due Date' onChange={handleDateChange} />

                    </LocalizationProvider>
                </Grid>
                <Grid item xs={12}>
                    <TextField multiline rows={2} maxRows={2} variant='outlined' label='Description'
                        sx={{ width: '70%' }} helperText="Add some description" value={description}
                        onChange={(e) => { setDescription(e.target.value) }} />
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
                {/*Left Side of the form */}
                {/* <Grid item xs={5}> 
                        <Grid container spacing={4}>
                            <Grid item xs={12}>
                                <WorkflowSelect fullWidth 
                                selectedValues = {workflow}
                                onChange={handleWorkflowChange} />
                            </Grid>
                        </Grid>
                    </Grid> */}
                {/* <Grid item alignContent={'center'} alignItems={'center'} xs={12} sx={{ width: '75%', mx: 'auto' }} >
                        <Button size={'large'} variant="outlined" color='error' sx={{ marginRight: '20px' }}
                        >Cancel</Button>
                        <Button size={'large'} variant="contained" color='primary' type='submit'
                        >Submit</Button>
                    </Grid> */}
            </Grid>
        );
    }

    /**Step two */
    function stepTwo(params) {
        const customList = (items) => (
            <Paper sx={{ width: 200, height: 230, overflow: 'auto' }}>
                <List dense component="div" role="list">
                    {items.map((value) => {
                        const labelId = `transfer-list-item-${value}-label`;
                        return (
                            <ListItem
                                key={value.user_id}
                                role="listitem"
                                button
                                onClick={handleToggle(value)}
                            >
                                <ListItemIcon>
                                    <Checkbox
                                        checked={checked.indexOf(value) !== -1}
                                        tabIndex={-1}
                                        disableRipple
                                        inputProps={{
                                            'aria-labelledby': labelId,
                                        }}
                                    />
                                </ListItemIcon>
                                <ListItemText id={labelId} primary={`${value.fullName}`} />
                            </ListItem>
                        );
                    })}
                </List>
            </Paper>
        );

        return (
            <Box sx={{ py: '2%' }}>
                <WorkflowSelect fullWidth
                    selectedValues={assignees}
                    onChange={handleAssigneeChange} />

                <Button variant='contained' onClick={() => {
                    if (assignees !== '') {
                        //console.log('assignees are', assignees);
                        //const names = assignees.map((e)=>{return e.fullName})
                        setRight([]);
                        setLeft(assignees);
                    }
                }} sx={{ mx: '2%', my: '2%' }}>Add</Button>

                <Button variant='contained' color='error' onClick={
                    () => {
                        setLeft([]);
                        setRight([]);
                    }} sx={{ mx: '2%', my: '2%' }}>Clear</Button>

                <Typography variant='subtitle2'>Add your workflow to the right side. The Flow will be from the top to bottom.</Typography>
                <Grid container spacing={2} justifyContent="center" alignItems="center" sx={{ marginTop: '1%' }}>
                    <Grid item>{customList(left)}</Grid>
                    <Grid item>
                        <Grid container direction="column" alignItems="center">
                            <Button
                                sx={{ my: 0.5 }}
                                variant="outlined"
                                size="small"
                                onClick={handleAllRight}
                                disabled={left.length === 0}
                                aria-label="move all right"
                            >
                                ≫
                            </Button>
                            <Button
                                sx={{ my: 0.5 }}
                                variant="outlined"
                                size="small"
                                onClick={handleCheckedRight}
                                disabled={leftChecked.length === 0}
                                aria-label="move selected right"
                            >
                                &gt;
                            </Button>
                            <Button
                                sx={{ my: 0.5 }}
                                variant="outlined"
                                size="small"
                                onClick={handleCheckedLeft}
                                disabled={rightChecked.length === 0}
                                aria-label="move selected left"
                            >
                                &lt;
                            </Button>
                            <Button
                                sx={{ my: 0.5 }}
                                variant="outlined"
                                size="small"
                                onClick={handleAllLeft}
                                disabled={right.length === 0}
                                aria-label="move all left"
                            >
                                ≪
                            </Button>
                        </Grid>
                    </Grid>
                    <Grid item>{customList(right)}</Grid>
                </Grid>
            </Box>

        )
    }

    /**Step three */
    function stepThree(params) {

        //const flow = right.map((element) => { return element.fullName });
        //console.log(flow);
        return (
            <Box sx={{ mx: 'auto', my: '20px' }}>
                <Typography variant='h6' textAlign={'center'}>Summary of the Task</Typography>

                <Grid container spacing={4} sx={{ my: '1%' }} >
                    <Grid item xs={6}>
                        <TextField fullWidth label="Task Name" value={taskName} InputProps={{ readOnly: true, }} />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField fullWidth label="Due Date" value={dueDate} InputProps={{ readOnly: true, }} />
                    </Grid>
                    <Grid item xs={8}>
                        <TextField fullWidth label="Description" value={description} InputProps={{ readOnly: true, }} />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField label="Attachments" value="Todo" InputProps={{ readOnly: true, }} />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant='subtitle1'>Your workflow: </Typography>
                        {right.length === 0 ? "Please go back and select a workflow" :
                            <Stepper alternativeLabel>
                                {right.map((label) => (
                                    <Step key={label.fullName}>
                                        <StepLabel>{label.fullName}</StepLabel>
                                    </Step>
                                ))}
                            </Stepper>}
                    </Grid>
                </Grid>
                {/* <Button onClick={()=>handleSubmit()}>Submit</Button> */}
            </Box>
        );
    }


    useEffect(() => {
        setWorkflow(right);
    }, [right])
    return (
        <Container maxWidth='lg' >
            <Paper elevation={12} sx={{ padding: '2%' }}>
                {/* <Paper variant='outlined' sx={{mt: '150px', width: '50%', mx:'auto'}}> */}
                <Typography variant='h5' textAlign={'left'} fontWeight="medium" sx={{ my: '10px' }}>New Task</Typography>

                <Box sx={{ width: '80%', mx: 'auto', py: '2%' }}>
                    <Stepper activeStep={activeStep}>
                        {steps.map((label, index) => {
                            const stepProps = {};
                            const labelProps = {};
                            if (isStepOptional(index)) {
                                labelProps.optional = (
                                    <Typography variant="caption">Optional</Typography>
                                );
                            }
                            if (isStepSkipped(index)) {
                                stepProps.completed = false;
                            }
                            return (
                                <Step key={label} {...stepProps}>
                                    <StepLabel {...labelProps}>{label}</StepLabel>
                                </Step>
                            );
                        })}
                    </Stepper>
                    {activeStep === steps.length ? (
                        <React.Fragment>
                            <Typography sx={{ mt: 2, mb: 1 }}>
                                All steps completed - You can bo back to add another task.
                            </Typography>
                            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                                <Box sx={{ flex: '1 1 auto' }} />
                                <Button onClick={handleReset}>Go Back</Button>
                            </Box>
                        </React.Fragment>
                    ) : (
                        <React.Fragment>
                            {/* <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography> */}
                            {activeStep === 0 ? stepOne() : (activeStep === 1 ? stepTwo() : stepThree())}
                            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                                <Button
                                    variant='contained'
                                    color="inherit"
                                    disabled={activeStep === 0}
                                    onClick={handleBack}
                                    sx={{ mr: 1 }}
                                >
                                    Back
                                </Button>
                                <Box sx={{ flex: '1 1 auto' }} />
                                {isStepOptional(activeStep) && (
                                    <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                                        Skip
                                    </Button>
                                )}

                                <Button variant='contained' onClick={handleNext}>
                                    {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
                                </Button>
                            </Box>
                        </React.Fragment>
                    )}
                </Box>

            </Paper>
        </Container>

    );
}

export default NewTask_v1;

