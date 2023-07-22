import React from 'react';

// React hooks
import { useEffect, useState } from 'react';

// React Router
import { useLocation } from 'react-router-dom';

// MUI components
<<<<<<< HEAD
import { Divider, Button, MenuItem, Typography, Container, Box, Stepper, Step, StepLabel, Grid, Paper } from '@mui/material';
=======
import { Divider, Button, MenuItem, Typography, Container, Box, Stepper, Step, StepLabel } from '@mui/material';
>>>>>>> 43422b8868ed13d2e0609c51d7610fb6feaf1a9e
// import Card from '@mui/material/Card';
// import CardActions from '@mui/material/CardActions';
// import CardContent from '@mui/material/CardContent';

// Firebase functions
import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Custom components
import TaskDialog from '../components/TaskDialog';

//const steps = ['Initiated by You', 'Dr. Nimal', 'Mr. Perera', 'Ms. Kaamala', 'Dept. Head DEIE', 'Assistant Registrar', 'ViceChancellor'];

const taskTypes = [
  { key: 1, value: 'Cash voucher' },
  { key: 2, value: 'Approval letter' }
]

function mapTypes(task) {
  return (
    <MenuItem key={task.key} value={task.value}>
      {task.value}
    </MenuItem>
  );
}

/**Task component */
function Task(props) {
  const db = getFirestore();

  const auth = getAuth();
  const userID = auth.currentUser.uid; //to check whether step is for current user

  const location = useLocation(); //retrive the state passed by navigation() from parent
  const docID = location.state; //store dock id passed via navigation method
  //console.log("State", location.state) ;

  const [docData, setDocData] = useState({});
  const [workflow, setWorkflow] = useState([]);
  const [steps, setSteps] = useState([]);
  const [workflowIndex, setWorkflowIndex] = useState(0); //store the workflow array index
<<<<<<< HEAD
  const [rejectedAt, setRejectedAt] = useState(-1); //store the step index if the task is rejected in that step

  const [activeStep, setActiveStep] = useState(0); //keep track of currently active step (using 'completed' field in the doc data)
=======

  const [activeStep, setActiveStep] = useState(0); //keep track of currently active step
>>>>>>> 43422b8868ed13d2e0609c51d7610fb6feaf1a9e
  const [isCurrentUser, setIsCurrentUser] = useState(false); //clicked on the current user's step

  /**Handle the Dialog */
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedStep, setSelectedStep] = useState({});
  const handleClickOpen = () => {
    setDialogOpen(true);
  };
  const handleClose = () => {
    setDialogOpen(false);
  };

  const handleViewStep = (step) => { //Handle clicking of a step (step = workflow[index])
    setSelectedStep(step);
<<<<<<< HEAD
    if (userID == step.user_id) {
      setIsCurrentUser(true);
    } else {
      setIsCurrentUser(false);
    }
    handleClickOpen();
    console.log("step: ", step);
=======
    if(userID == step.user_id){
      setIsCurrentUser(true);
    }else{
      setIsCurrentUser(false);
    }
    handleClickOpen();
    console.log("step: ",step);
>>>>>>> 43422b8868ed13d2e0609c51d7610fb6feaf1a9e
    console.log(userID);
    console.log('isCurrentUser ', isCurrentUser);
  };
  /******************* */

  useEffect(() => {
    const fetchData = async () => {
      const docRef = doc(db, "current_tasks", docID);
      const docSnap = await getDoc(docRef);
      console.log("doc data",docSnap.data());
      setDocData(docSnap.data());
      setWorkflow(docSnap.data().workflow);
    };
    fetchData();
  }, [docID]);

  useEffect(() => {
    console.log(docData);
    setWorkflow(docData.workflow);
    console.log(workflow);

    var i = 0; //to store current step index
    var foundActiveStep = false; //store whether active step found or not
    workflow.forEach((e) => {
      steps.push(e.fullName);
      if ((!foundActiveStep) && (!e.completed)){ //search for the active step
        setActiveStep(i);
        foundActiveStep = true;
      }
      if ((e.completed) && (!e.approved)){ //check for rejected step
        setRejectedAt(i);
      }
      i++;
    });

    console.log(steps);

  }, [docData]);

  const isStepFailed = (step) => {
    if (rejectedAt !== -1){
      return step === rejectedAt;
    }
  };

  return (
<<<<<<< HEAD
    <Container maxWidth='lg' disableGutters>
      {/* <Paper variant='outlined' sx={{ mt: '150px', width: 'auto', mx: 'auto' }}> */}
      <Paper elevation={12} sx={{ padding: "2%", width: 'auto', mx: 'auto' }}>

        <Typography variant='h5' textAlign={'left'} fontWeight="medium" sx={{ my: '10px' }}>Task: {docData.task_name}</Typography>

        <TaskDialog open={dialogOpen} handleClose={handleClose}
          step={selectedStep} isCurrentUser={isCurrentUser} docID={docID} index={workflowIndex} activeStep={activeStep} rejectedAt={rejectedAt}/>

        <Box sx={{ width: '100%', mt: '70px' }}>
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label, index) => {
              const labelProps = {};
              if (isStepFailed(index)) {
                labelProps.optional = (
                  <Typography variant="caption" color="error">
                   Task rejected!
                  </Typography>
                );

                labelProps.error = true;
              }

              return (
                <Step key={label} >
                  <StepLabel {...labelProps}>
                    {label} <br />
                    <Button onClick={
                      () => {
                        handleViewStep(workflow[index]);
                        setWorkflowIndex(index);
                      }
                    }>View</Button>
                  </StepLabel>
                </Step>
              );
            })}
          </Stepper>

          <Divider sx={{ my: '60px' }} />

          {/* <Typography variant='subtitle1' >Task name: {docData.task_name}</Typography>
=======
    <Container maxWidth='lg' sx={{ mt: '120px', width: '100%' }} disableGutters>
      {/* <Paper variant='outlined' sx={{mt: '150px', width: '50%', mx:'auto'}}> */}
      <Typography variant='h5' textAlign={'left'} fontWeight="medium" sx={{ my: '10px' }}>Task: {docData.task_name}</Typography>
      
      <TaskDialog open={dialogOpen} handleClose={handleClose} 
      step={selectedStep} isCurrentUser={isCurrentUser} docID={docID} index={workflowIndex}/>

      <Box sx={{ width: '100%', mt: '70px' }}>
        <Stepper activeStep={1} alternativeLabel>
          {steps.map((label, index) => {
            const labelProps = {};
            // if (isStepFailed(index)) {
            //   labelProps.optional = (
            //     <Typography variant="caption" color="error">
            //       Alert message
            //     </Typography>
            //   );

            //   labelProps.error = true;
            // }

            return (
              <Step key={label}>
                <StepLabel {...labelProps}>
                  {label} <br/>
                  <Button onClick={
                    () => {
                      handleViewStep(workflow[index]);
                      setWorkflowIndex(index);
                    }
                    }>View</Button>
                </StepLabel>
              </Step>
            );
          })}
        </Stepper>

        <Divider sx={{ my: '60px' }} />

        {/* <Typography variant='subtitle1' >Task name: {docData.task_name}</Typography>
>>>>>>> 43422b8868ed13d2e0609c51d7610fb6feaf1a9e
        <Typography variant='subtitle1' >Description: {docData.description}</Typography>
        <Typography variant='subtitle1' >Initialized Date:{docData.initialized_date}</Typography>
        <Typography variant='subtitle1' >Due Date:{docData.due_date}</Typography> */}

          <Typography variant='h6' textAlign={'left'} fontWeight="medium" >Attachments: Links</Typography>
          <Typography variant='h6' textAlign={'left'} fontWeight="medium" sx={{ my: '10px' }}>Details:</Typography>
          <Grid container>
            <Grid item xs={4}>
              <table>
                <tbody>
                  <tr>
                    <td><Typography variant='subtitle1' >Task: </Typography></td>
                    <td><Typography variant='subtitle1' >{docData.task_name}</Typography></td>
                  </tr>
                  <tr>
                    <td><Typography variant='subtitle1' >Owner: </Typography></td>
                    <td><Typography variant='subtitle1' >{docData.owner_name}</Typography></td>
                  </tr>
                </tbody>
              </table>

            </Grid>

            <Grid item xs={4}>
              <table>
                <tbody>
                  <tr>
                    <td><Typography variant='subtitle1' >Initialized Date: </Typography></td>
                    <td><Typography variant='subtitle1' >{docData.initialized_date}</Typography></td>
                  </tr>
                  <tr>
                    <td><Typography variant='subtitle1' >Due Date: </Typography></td>
                    <td><Typography variant='subtitle1' >{docData.due_date}</Typography></td>
                  </tr>
                  <tr>
                    <td><Typography variant='subtitle1' >Attachments: </Typography></td>
                    <td><Typography variant='subtitle1' ><a>Link</a></Typography></td>
                  </tr>
                </tbody>
              </table>
            </Grid>

            <Grid item xs={4}>
              <table>
                <tbody>
                  <tr>
                    <td><Typography variant='subtitle1' >Description:{docData.description} </Typography></td>
                    {/* <td><Typography variant='subtitle1' >{docData.description}</Typography></td> */}
                  </tr>
                </tbody>
              </table>
            </Grid>
          </Grid>


          {/* <Typography variant='subtitle1' >Attachments: {docData.attachements}</Typography> */}

          {/* <Card sx={{ width: '40%', mx: 'auto' }} elevation={10}>
          <CardContent>
            <Typography variant='h5' >
              Dr.Nimal
            </Typography>
            <Typography variant='subtitle1'  >
              Date: May 01 2023
            </Typography>
            <Typography variant='subtitle1'  >
              Status: Rejected
            </Typography>
            <Typography variant="body2">
              Comments: Confirmation letter required
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Details</Button>
            <Button size="small">Contact</Button>
          </CardActions>
        </Card> */}
        </Box>
      </Paper>
    </Container>
  );
}

export default Task;

