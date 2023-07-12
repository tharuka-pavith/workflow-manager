import React from 'react';

// Reac hooks
import { useState } from 'react';

// MUI components
import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from '@mui/material';
import { Typography, TextField, Box,Button } from '@mui/material';

//Firestore functions
import { getFirestore, doc, updateDoc, getDoc } from "firebase/firestore";

/**TaskDialog component */
export default function TaskDialog(props) {
  /**
   * props.steps
   * props.isCurrentUser
   * props.handleClose
   * props.open
   * props.docID
   * props.index - store the workflow array index of clicked step
   * props.activeStep - holds the index of ongong step (with the help of "completed" field in doc data)
   * props.rejectedAt - stores the index of the step where rejected (if no rejects value is equal to -1)
   */

  //console.log("At TaskDialog :", props); //if this dialog is for current user

  if (props.isCurrentUser) {
    //if the dialog is for current user
    //return RenderSpecificDialog(props);
    if(props.index != props.activeStep){
      return RenderNormalDialog(props); //current user can't edit
    }else{
      if((props.rejectedAt != -1) && (props.index > props.rejectedAt)){
        //There are previously rejected steps & current user step is after rejection
        //Current user should not be able to edit his step
        return RenderNormalDialog(props);
      }
      else{
        return RenderSpecificDialog(props); //current user can edit
      }
      // return RenderSpecificDialog(props);
    }
  } else {
    //if dialog is not for current user
    return RenderNormalDialog(props);
  }

  // return (
  //   <div>
  //     {/* <Button variant="outlined" onClick={handleClickOpen}>
  //       Open alert dialog
  //     </Button> */}
  //     <Dialog
  //       open={props.open}
  //       onClose={props.handleClose}
  //       aria-labelledby="alert-dialog-title"
  //       aria-describedby="alert-dialog-description"

  //     >
  //       <DialogTitle id="alert-dialog-title">
  //         Assignee: {props.step.fullName}
  //       </DialogTitle>
  //       <DialogContent>
  //         <DialogContentText id="alert-dialog-description">
  //           <table>
  //             <tbody>
  //               <tr>
  //                 <td><Typography variant='subtitle1' >Comments:</Typography></td>
  //                 <td><Typography variant='subtitle1' >Any comments</Typography></td>
  //               </tr>
  //               <tr>
  //                 <td><Typography variant='subtitle1' >Attachments:</Typography></td>
  //                 <td><Typography variant='subtitle1' >link1 link2 link3</Typography></td>
  //               </tr>
  //               <tr>
  //                 <td><Typography variant='subtitle1' >Reveiewd on:</Typography></td>
  //                 <td><Typography variant='subtitle1' >12th Jun 2023</Typography></td>
  //               </tr>
  //               <tr>
  //                 <td><Typography variant='subtitle1' >Status:</Typography></td>
  //                 <td><Typography variant='subtitle1' >Approved</Typography></td>
  //               </tr>

  //             </tbody>
  //           </table>
  //         </DialogContentText>
  //       </DialogContent>
  //       <DialogActions>
  //         <Button onClick={props.handleClose}>Close</Button>
  //         {/* <Button onClick={props.handleClose} autoFocus>
  //           Agree
  //         </Button> */}
  //       </DialogActions>
  //     </Dialog>
  //   </div>
  // );
}

/**
 * General dialog box
 * @param {*} props .step = {fullName: "", user_id:"",comments:"",approved:boolean, completed:boolean}
 * @returns A dialog component with specific details
 */
function RenderNormalDialog(props) {

  const approved = props.step.approved ? "Approved" : "Not Approved";

  return (
    <div>
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Open alert dialog
      </Button> */}
      <Dialog
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth="false"
        maxWidth="sm"
      >
        <DialogTitle id="alert-dialog-title">
          Assigned to: {props.step.fullName}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <table>
              <tbody>
                <tr>
                  <td><Typography variant='subtitle1' >Comments:</Typography></td>
                  <td><Typography variant='subtitle1' >{props.step.comments}</Typography></td>
                </tr>
                <tr>
                  <td><Typography variant='subtitle1' >Attachments:</Typography></td>
                  {/*TODO: <td><Typography variant='subtitle1' >link1 link2 link3</Typography></td> */}
                </tr>
                <tr>
                  <td><Typography variant='subtitle1' >Reveiewd on:</Typography></td>
                  <td><Typography variant='subtitle1' >{props.step.approved_date}</Typography></td>
                </tr>
                <tr>
                  <td><Typography variant='subtitle1' >Status:</Typography></td>
                  <td><Typography variant='subtitle1' >{approved}</Typography></td>
                </tr>
              </tbody>
            </table>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleClose}>Close</Button>
          {/* <Button onClick={props.handleClose} autoFocus>
            Agree
          </Button> */}
        </DialogActions>
      </Dialog>
    </div>
  );
}

/**
 * User specific dialog component.
 * Use this if current user is the assigned user in the step.
 */
function RenderSpecificDialog(props) {
  const db = getFirestore();

  const [comment, setComment] = useState('');
  const [approved, setApproved] = useState(false);
  const [completed, setCompleted] = useState(false);
  // const [approvedDate, setApprovedDate] = useState('');
  const [attachements, setAttachments] = useState([]);
  const [timestamp, setTimestamp] = useState(Date());

  const updateWorkflowElement = async (docID, workflowIndex, updatedData) => {
    try {
      const taskDocRef = doc(db, "current_tasks", docID);
      // Get the task document from Firestore
      const taskDoc = await getDoc(taskDocRef);

      if (taskDoc.exists()) {
        // Retrieve the workflow array from the task document
        const workflow = taskDoc.data().workflow;

        // Update the specific element in the workflow array
        // workflow[workflowIndex] = {
        //   ...workflow[workflowIndex],
        //   ...updatedData
        // };
        workflow[workflowIndex] = {
          user_id : props.step.user_id,
          fullName: props.step.fullName,
          ...updatedData
        };

        console.log('updated workflow: ', workflow);

        // Update the task document with the modified workflow array
        await updateDoc(taskDocRef, {
          workflow: workflow,
        });

        console.log('Workflow element updated successfully!');
      }
      else{
        console.log("Document doesn't exist!");
      }


    } catch (error) {
      console.error('Error updating workflow element:', error);
    }
  };

  /**
   * Call this function when user clicks save button
   */
  function handleSave() {
    setTimestamp(Date()); //get current timestamp
    setCompleted(true); //mark this step as completed

    //Todo: Complete setAttachments function
    setAttachments(['test.pdf']);
    
    //store updated data in Json object
    const updatedData = {
      approved: approved,
      completed: true,
      comments: comment,
      timestamp: timestamp,
      attachments: attachements
    }
    console.log(updatedData);
    updateWorkflowElement(props.docID, props.index, updatedData);  //call the function to update workflow in Firebase
  }

  return (
    <div>
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Open alert dialog
      </Button> */}
      <Dialog
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth="false"
        maxWidth="sm"

      >
        <DialogTitle id="alert-dialog-title">
          Assigned to: {props.step.fullName}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ my: "5%" }}>
            <DialogContentText id="alert-dialog-description">

              <TextField id="outlined-multiline-static" fullWidth onChange={(e) => setComment(e.target.value)}
                label="Comment" multiline rows={2} placeholder='Add comments' value={comment}
              />

              <Typography variant='subtitle1' sx={{ my: '1%' }}>Attachments:</Typography>
              <Button variant="outlined" sx={{ mx: '1%' }}>Add</Button>

              <Typography variant='subtitle1' sx={{ my: '1%' }}>Status: {approved ? "Approve" : "Reject"}</Typography>
              <Button variant="contained" sx={{ mx: '1%' }}

                onClick={() => { setApproved(true) }}>Approve</Button>
              <Button variant="contained" color='error' sx={{ mx: '1%' }}
                onClick={() => { setApproved(false) }}>Reject</Button>

              <Typography variant='subtitle1' sx={{ my: '1%' }}>Date:{timestamp}</Typography>

            </DialogContentText>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleClose} variant="text" color='error'>Close</Button>
          <Button onClick={() => { 
            // if(completed){alert("You cannot edit after completing!")}
            // else{handleSave();}
            handleSave();
            props.handleClose();
           }} autoFocus variant="outlined"
          > Save </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}