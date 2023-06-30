import React from 'react';

// React hooks
import { useEffect, useState } from 'react';

// React Router
import { useLocation } from 'react-router-dom';

// MUI components
import { Divider, Button, MenuItem, Typography, Container, Box, Stepper, Step, StepLabel } from '@mui/material';
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

  const [activeStep, setActiveStep] = useState(0); //keep track of currently active step
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
    if(userID == step.user_id){
      setIsCurrentUser(true);
    }else{
      setIsCurrentUser(false);
    }
    handleClickOpen();
    console.log("step: ",step);
    console.log(userID);
    console.log('isCurrentUser ', isCurrentUser);
  };
  /******************* */

  useEffect(() => {
    const fetchData = async () => {
      const docRef = doc(db, "current_tasks", docID);
      const docSnap = await getDoc(docRef);
      //console.log("doc data",docSnap.data());
      setDocData(docSnap.data());
      setWorkflow(docSnap.data().workflow);
    };
    fetchData();
  }, [docID]);

  useEffect(() => {
    console.log(docData);
    setWorkflow(docData.workflow);
    console.log(workflow);

    workflow.forEach((e)=>{
      steps.push(e.fullName);
    });

    console.log(steps);

  }, [docData]);

  const isStepFailed = (step) => {
    return step === 1;
  };

  return (
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
        <Typography variant='subtitle1' >Description: {docData.description}</Typography>
        <Typography variant='subtitle1' >Initialized Date:{docData.initialized_date}</Typography>
        <Typography variant='subtitle1' >Due Date:{docData.due_date}</Typography> */}
        <table>
          <tbody>
            <tr>
              <td><Typography variant='subtitle1' >Task name:</Typography></td>
              <td><Typography variant='subtitle1' >{docData.task_name}</Typography></td>
            </tr>
            <tr>
              <td><Typography variant='subtitle1' >Description:</Typography></td>
              <td><Typography variant='subtitle1' >{docData.description}</Typography></td>
            </tr>
            <tr>
              <td><Typography variant='subtitle1' >Initialized Date:</Typography></td>
              <td><Typography variant='subtitle1' >{docData.initialized_date}</Typography></td>
            </tr>
            <tr>
              <td><Typography variant='subtitle1' >Due Date:</Typography></td>
              <td><Typography variant='subtitle1' >{docData.due_date}</Typography></td>
            </tr>
            <tr>
              <td><Typography variant='subtitle1' >Attachments:</Typography></td>
              <td><Typography variant='subtitle1' ><a>Link</a></Typography></td>
            </tr>
          </tbody>
        </table>

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

    </Container>
  );
}

export default Task;

