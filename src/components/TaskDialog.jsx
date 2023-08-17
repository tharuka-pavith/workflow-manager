import React, { useEffect } from 'react';

// Reac hooks
import { useState } from 'react';

// MUI components
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Link } from '@mui/material';
import { Typography, TextField, Box, Button, Grid } from '@mui/material';

import { Upload } from '@mui/icons-material';

//Firestore functions
import { getFirestore, doc, updateDoc, getDoc } from "firebase/firestore";
import { getStorage, ref, getDownloadURL } from "firebase/storage"; //for storage functionality


import uploadFile from '../utils/fileUpload';


/**TaskDialog component */
export default function TaskDialog(props) {
  /**
   * props.step
   * props.isCurrentUser
   * props.handleClose
   * props.open
   * props.docID
   * props.index - store the workflow array index of clicked step
   * props.activeStep - holds the index of ongong step (with the help of "completed" field in doc data)
   * props.rejectedAt - stores the index of the step where rejected (if no rejects value is equal to -1)
   * props.index
   */

  //console.log("At TaskDialog :", props); //if this dialog is for current user

  if (props.isCurrentUser) {
    //if the dialog is for current user
    //return RenderSpecificDialog(props);
    if (props.index !== props.activeStep) {
      return RenderNormalDialog(props); //current user can't edit
    } else {
      if ((props.rejectedAt !== -1) && (props.index > props.rejectedAt)) {
        //There are previously rejected steps & current user step is after rejection
        //Current user should not be able to edit his step
        return RenderNormalDialog(props);
      }
      else {
        // if (props.step.completed) {
        //   return RenderNormalDialog(props);
        // }
        // else {
        //   return RenderSpecificDialog(props); //current user can edit
        // }
        return RenderSpecificDialog(props);

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
  const storage = getStorage();

  const status = props.step.approved ? "Approved" : (props.step.completed ? "Rejected" : "Pending");
  const [attachments, setAttachments] = useState([]);
  console.log('Attachments 1st:', props.step.attachments);
  //attachment file can be accessed through props.step
  //attachment file can be accessed through props.step


  useEffect(() => {
    const fetchData = async () => {
      //console.log('Attachments 2nd:', props.step.attachments);
      //console.log('Step :', props.step);
      //console.log('DocID :', props.docID);
      //get file details and store in attachments
      const tempArr = props.step.attachments;
      const filesArr = [];

      // Create an array of promises using getDownloadURL for each file
      if (tempArr !== undefined) {
        const downloadURLPromises = tempArr.map((file) => {
          const fileRef = ref(storage, `tasks/${props.docID}/${props.step.user_id}/${file}`);
          return getDownloadURL(fileRef);
        });


        try {
          const downloadURLs = await Promise.all(downloadURLPromises);
          // Map the tempArr and downloadURLs arrays to create the filesArr
          tempArr.forEach((file, index) => {
            const url = downloadURLs[index];
            //console.log('url ', url);
            filesArr.push({ name: file, link: url });
          });

          setAttachments(filesArr);
          //console.log("filesArr", filesArr);
        } catch (error) {
          console.error("Error fetching download URLs", error);
          // Handle the error if needed
        }
      } else {
        console.log("tempArr is null");
      }
    }
    fetchData();
  }, [props.docID, props.step]);

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
          {props.step.fullName}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description" sx={{ py: '1%' }}>
            {/* <table>
              <tbody>
                <tr>
                  <td><Typography variant='subtitle1' >Comments:</Typography></td>
                  <td><Typography variant='subtitle1' >{props.step.comments}</Typography></td>
                </tr>
                <tr>
                  <td><Typography variant='subtitle1' >Attachments:</Typography></td>
                  <td><Typography variant='subtitle1' >
                    {attachments.map(
                      (file) => {
                        return (<Link href={file.link} target='_blank' rel="noopener" underline='hover' sx={{ mx: '1%' }}>
                          {file.name}</Link>);
                      }
                    )}
                  </Typography></td>
                </tr>
                <tr>
                  <td><Typography variant='subtitle1' >Reviewed on:</Typography></td>
                  <td><Typography variant='subtitle1' >{props.step.timestamp}</Typography></td>
                </tr>
                <tr>
                  <td><Typography variant='subtitle1' >Status:</Typography></td>
                  <td><Typography variant='subtitle1' >{approved}</Typography></td>
                </tr>
              </tbody>
            </table> */}
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField value={status} label='Status' variant='filled'
                  color={(status === "Approved" ? "success" : (status === "Rejected" ? "error" : "warning"))}
                  focused InputProps={{ readOnly: true, }} />
              </Grid>

              <Grid item xs={12}>
                <TextField fullWidth value={props.step.comments} label='Comments' variant='filled' InputProps={{ readOnly: true, }} />
              </Grid>

              <Grid item xs={12}>
                <TextField fullWidth value={props.step.timestamp} label='Review Date' variant='filled' InputProps={{ readOnly: true, }} />
              </Grid>

              <Grid item xs={12}>
                <Typography variant='subtitle1' >Attachments:</Typography>
                <Typography variant='subtitle1' >
                  {attachments.map(
                    (file) => {
                      return (<Link href={file.link} target='_blank' rel="noopener" underline='hover' sx={{ mx: '1%' }}>
                        {file.name}</Link>);
                    }
                  )}
                </Typography>
              </Grid>
            </Grid>
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
  const [approved, setApproved] = useState(true);
  const [completed, setCompleted] = useState(false);
  // const [approvedDate, setApprovedDate] = useState('');
  const [attachements, setAttachments] = useState([]);
  const [timestamp, setTimestamp] = useState(Date());
  const [selectedFiles, setSelectedFiles] = useState([]); //State to store files

  /**Functions for file handling */
  const handleFileInputChange = (event) => {
    // Get the selected files from the file input
    const files = event.target.files;
    //setSelectedFiles(files);
    setSelectedFiles(Array.from(files));
  };

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
          user_id: props.step.user_id,
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
      else {
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

    /**Upload files to firebase storage */
    const attachmentNames = [];
    selectedFiles.forEach(
      (file) => {
        //Upload path:"tasks/{task_id}/{user_id}/{file_name}"
        const fileLink = uploadFile(`tasks/${props.docID}/${props.step.user_id}/${file.name}`, file);
        console.log("File Link: ", fileLink);
        attachmentNames.push(file.name);
      }
    );

    //Todo: Complete setAttachments function
    setAttachments(attachmentNames);

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

              <input
                id="file-upload"
                type="file"
                style={{ display: 'none' }}
                multiple
                onChange={handleFileInputChange}
              />
              <Typography variant='subtitle1' sx={{ my: '1%' }}>Attachments:</Typography>
              {selectedFiles.length > 0 && (
                <ul>
                  {Array.from(selectedFiles).map((file, index) => (
                    <li key={index}>{file.name}</li>
                  ))}
                </ul>
              )}
              <label htmlFor="file-upload">
                <Button variant='outlined' startIcon={<Upload />} component="span">Select Files </Button>
              </label>

              <Typography variant='subtitle1' sx={{ my: '1%' }}>Status: {approved ? "Approve" : "Reject"}</Typography>
              <Button sx={{ mx: '1%' }}
                onClick={() => { setApproved(true) }}
                variant={approved ? "contained" : "outlined"}>Approve</Button>
              <Button color='error' sx={{ mx: '1%' }}
                onClick={() => { setApproved(false) }}
                variant={!approved ? "contained" : "outlined"}>Reject</Button>

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
          > Submit </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}