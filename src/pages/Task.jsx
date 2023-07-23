import React from 'react';

// React hooks
import { useEffect, useState } from 'react';

// React Router
import { useLocation } from 'react-router-dom';

// MUI components
import { Divider, Button, MenuItem, Typography, Container, Box, Stepper, Step, StepLabel, Grid, Paper, Link, TextField } from '@mui/material';


// import Card from '@mui/material/Card';
// import CardActions from '@mui/material/CardActions';
// import CardContent from '@mui/material/CardContent';

// Firebase functions
import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage, ref, getDownloadURL } from "firebase/storage"; //for storage functionality

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
  const storage = getStorage();

  const auth = getAuth();
  const userID = auth.currentUser.uid; //to check whether step is for current user

  const location = useLocation(); //retrive the state passed by navigation() from parent
  const docID = location.state; //store dock id passed via navigation method
  //console.log("State", location.state) ;

  const [docData, setDocData] = useState({});
  const [workflow, setWorkflow] = useState([]);
  const [attachments, setAttachments] = useState([]); //Attacments added by task creator Ex. ["file.pdf", "doc.pdf"]
  const [steps, setSteps] = useState([]);
  const [workflowIndex, setWorkflowIndex] = useState(0); //store the workflow array index
  const [rejectedAt, setRejectedAt] = useState(-1); //store the step index if the task is rejected in that step
  const [activeStep, setActiveStep] = useState(0); //keep track of currently active step (using 'completed' field in the doc data)
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
    if (userID == step.user_id) {
      setIsCurrentUser(true);
    } else {
      setIsCurrentUser(false);
    }
    handleClickOpen();
    //console.log("step: ", step);

    //console.log(userID);
    //console.log('isCurrentUser ', isCurrentUser);
  };
  /******************* */

  /*
  useEffect(() => {
    const fetchData = async () => {
      const docRef = doc(db, "current_tasks", docID);
      const docSnap = await getDoc(docRef);
      console.log("doc data", docSnap.data());
      setDocData(docSnap.data());
      setWorkflow(docSnap.data().workflow);

      //get file details and store in attachments
      const tempArr = docSnap.data().attachments;
      const filesArr = [];
      tempArr.forEach((file) => {
        const fileRef = ref(storage, `tasks/${docID}/${userID}/${file}`);
        getDownloadURL(fileRef)
          .then((url) => {
            console.log("Download url ", url);
            filesArr.push({ name: file, link: url });
          })
          .catch((error) => {
            // A full list of error codes is available at
            // https://firebase.google.com/docs/storage/web/handle-errors
            switch (error.code) {
              case 'storage/object-not-found':
                // File doesn't exist
                break;
              case 'storage/unauthorized':
                // User doesn't have permission to access the object
                break;
              case 'storage/canceled':
                // User canceled the upload
                break;
  
              // ...
  
              case 'storage/unknown':
                // Unknown error occurred, inspect the server response
                break;
            }
          });
         
      });
      setAttachments(filesArr);
      console.log("Attachements ", attachments);

      //setAttachments(docSnap.data().attachments);
    };
    
    fetchData();
  }, [docID]);
*/

useEffect(() => {
    const fetchData = async () => {
      const docRef = doc(db, "current_tasks", docID);
      const docSnap = await getDoc(docRef);

      //console.log("doc data", docSnap.data());
      setDocData(docSnap.data());
      setWorkflow(docSnap.data().workflow);

      //get file details and store in attachments
      const tempArr = docSnap.data().attachments;
      const filesArr = [];

      // Create an array of promises using getDownloadURL for each file
      const downloadURLPromises = tempArr.map((file) => {
        const fileRef = ref(storage, `tasks/${docID}/${docSnap.data().owner_id}/${file}`);
        return getDownloadURL(fileRef);
      });

      // Wait for all promises to resolve
      try {
        const downloadURLs = await Promise.all(downloadURLPromises);

        // Map the tempArr and downloadURLs arrays to create the filesArr
        tempArr.forEach((file, index) => {
          const url = downloadURLs[index];
          filesArr.push({ name: file, link: url });
        });

        setAttachments(filesArr);
        //console.log("Attachments", filesArr);
      } catch (error) {
        console.error("Error fetching download URLs", error);
        // Handle the error if needed
      }
    };

    fetchData();
  }, [docID, userID]); 



  useEffect(() => {
    //console.log(docData);
    setWorkflow(docData.workflow);
    //console.log("workflow: ", workflow);

    var i = 0; //to store current step index
    var foundActiveStep = false; //store whether active step found or not
    workflow.forEach((e) => {
      steps.push(e.fullName);
      if ((!foundActiveStep) && (!e.completed)) { //search for the active step
        setActiveStep(i);
        foundActiveStep = true;
      }
      if ((e.completed) && (!e.approved)) { //check for rejected step
        setRejectedAt(i);
      }
      i++;
    });
    //console.log(steps);
  }, [docData]);


  const isStepFailed = (step) => {
    if (rejectedAt !== -1) {
      return step === rejectedAt;
    }
  };

  return (
    <Container maxWidth='lg' disableGutters>
      {/* <Paper variant='outlined' sx={{ mt: '150px', width: 'auto', mx: 'auto' }}> */}
      <Paper elevation={12} sx={{ padding: "2%", width: 'auto', mx: 'auto' }}>

        <Typography variant='h5' textAlign={'left'} fontWeight="medium" sx={{ my: '10px' }}>Task: {docData.task_name}</Typography>

        <TaskDialog open={dialogOpen} handleClose={handleClose}
          step={selectedStep} isCurrentUser={isCurrentUser} docID={docID} index={workflowIndex} activeStep={activeStep} rejectedAt={rejectedAt} />

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

          <Divider sx={{ my: '20px' }} />

          {/* <Typography variant='subtitle1' >Task name: {docData.task_name}</Typography>

        <Typography variant='subtitle1' >Description: {docData.description}</Typography>
        <Typography variant='subtitle1' >Initialized Date:{docData.initialized_date}</Typography>
        <Typography variant='subtitle1' >Due Date:{docData.due_date}</Typography> 
        docData.task_name, docData.owner_name, docData.initialized_date, docData.due_date
        docData.description*/}

          <Typography variant='h6' textAlign={'left'} fontWeight="medium" >
            Attachments: {attachments.map(
              (file) => {
                return (<Link href={file.link} target='_blank' rel="noopener" underline='hover' sx={{ mx: '1%' }}>
                  {file.name}</Link>);
              }
            )}</Typography>
          <Typography variant='h6' textAlign={'left'} fontWeight="medium" sx={{ my: '1%' }} >Details:</Typography>
          <Box sx={{ mx: 'auto',my: '15px'  }}>
                <Grid container spacing={4} sx={{ my: '1%' }} >
                    <Grid item xs={3}>
                        <TextField fullWidth  value={"Owner: " + docData.owner_name} readOnly InputProps={{ readOnly: true, }} variant='standard' />
                    </Grid>
                    <Grid item xs={3}>
                        <TextField fullWidth  value={"Initialized Date: " + docData.initialized_date} InputProps={{ readOnly: true, }} variant='standard' />
                    </Grid>
                    <Grid item xs={3}>
                        <TextField fullWidth  value={"Due Date: " + docData.due_date} InputProps={{ readOnly: true, }} variant='standard' />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField fullWidth  value={docData.description} InputProps={{ readOnly: true, }} variant='standard' />
                    </Grid>
                </Grid>
            </Box>


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

