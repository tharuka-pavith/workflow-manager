import React, { useEffect, useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Link } from '@mui/material';
import { Typography, TextField, Box, Button, Grid } from '@mui/material';
import { Upload } from '@mui/icons-material';
import { getFirestore, doc, updateDoc, getDoc, setDoc, deleteDoc } from "firebase/firestore";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { getDatabase, ref as databaseRef, set } from "firebase/database";

import uploadFile from '../utils/fileUpload';

export default function TaskDialog_V1(props) {
  /**
  * props.step
  * props.isCurrentUser
  * props.handleClose
  * props.open
  * props.docID
  * props.index - store the workflow array index of clicked step
  * props.activeStep - holds the index of ongong step (with the help of "completed" field in doc data)
  * props.rejectedAt - stores the index of the step where rejected (if no rejects value is equal to -1)
  * props.workflow -  the workflow
  * owner - task owner
  */

  const db = getFirestore();
  const storage = getStorage();

  const [comment, setComment] = useState('');
  const [approved, setApproved] = useState(true);
  const [completed, setCompleted] = useState(false);
  const [attachments, setAttachments] = useState([]);
  const [timestamp, setTimestamp] = useState(Date());
  const [selectedFiles, setSelectedFiles] = useState([]);

  const [isUploading, setIsUploading] = useState(false);

  const fetchData = async () => {
    //get file details and store in attachments
    //console.log('length', props.workflow.length);
    const attachmentsTempArr = props.step.attachments;
    const filesArr = [];
    //console.log('attachmentsTempArr ', props.step);
    // Create an array of promises using getDownloadURL for each file
    if (attachmentsTempArr !== undefined) {
      const downloadURLPromises = attachmentsTempArr.map((file) => {
        const fileRef = ref(storage, `tasks/${props.docID}/${props.step.user_id}/${file}`);
        return getDownloadURL(fileRef);
      });

      try {
        const downloadURLs = await Promise.all(downloadURLPromises);
        // Map the attachmentsTempArr and downloadURLs arrays to create the filesArr
        attachmentsTempArr.forEach((file, index) => {
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
      console.log("attachmentsTempArr is null");
    }
  }
  useEffect(() => {
    fetchData();
  }, [props.step]);


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
        const updateDocPromise = await updateDoc(taskDocRef, {
          workflow: workflow,
        });

        console.log('Workflow element updated successfully!');

        //if this is the final step
        if ((props.workflow.length - 1 === props.index) && approved) {
          moveTaskToCompletedTasks_v2(docID);
        } else if (!approved) {
          moveTaskToRejectedTasks_v2(docID);
        }
      }
      else {
        console.log("Document doesn't exist!");
      }


    } catch (error) {
      console.error('Error updating workflow element:', error);
    }
  };

  /**Move the task to completed_tasks collection */
  async function moveTaskToCompletedTasks_v2(docID) {
    try {
      // Get the current task
      const currentTaskDocRef = doc(db, "current_tasks", docID);
      const currentTaskDocSnap = await getDoc(currentTaskDocRef);

      if (currentTaskDocSnap.exists()) {
        // Copy the current task to completed_tasks
        const data = currentTaskDocSnap.data();
        await setDoc(doc(db, "completed_tasks", docID), data);

        // Delete current task from current_tasks
        await deleteDoc(doc(db, "current_tasks", docID));

        console.log("Task moved to completed_tasks successfully!");

        //remove the task from each assigned users
        const workflow = data.workflow;
        workflow.forEach(async (element) => {
          const uid = element.user_id;
          const userRef = doc(db, "users", uid);
          const userDocSnap = await getDoc(userRef);
          const assigned_tasks = userDocSnap.data().assigned_tasks;

          //remove the doc
          const index = assigned_tasks.indexOf(docID);
          if (index !== -1) {
            assigned_tasks.splice(index, 1);
          }

          await updateDoc(userRef, {
            assigned_tasks: assigned_tasks,
          });
        });
        console.log("tasks removed from assigned users successfully");

        //remove task from owner
        const ownerRef = doc(db, "users", props.owner);
        const ownerDocSnap = await getDoc(ownerRef);
        const my_tasks = ownerDocSnap.data().my_tasks;
        //remove the doc
        const index = my_tasks.indexOf(docID);
        if (index !== -1) {
          my_tasks.splice(index, 1);
        }
        await updateDoc(ownerRef, {
          my_tasks: my_tasks,
        });
      } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
      }
    } catch (error) {
      console.error("Error moving task:", error);
    }
  }

  /**Move the task to rejected tasks */
  async function moveTaskToRejectedTasks_v2(docID) {
    try {
      // Get the current task
      const currentTaskDocRef = doc(db, "current_tasks", docID);
      const currentTaskDocSnap = await getDoc(currentTaskDocRef);

      if (currentTaskDocSnap.exists()) {
        // Copy the current task to completed_tasks
        const data = currentTaskDocSnap.data();
        await setDoc(doc(db, "rejected_tasks", docID), data);

        // Delete current task from current_tasks
        await deleteDoc(doc(db, "current_tasks", docID));

        console.log("Task moved to rejected_tasks successfully!");

        //remove the task from each assigned users
        const workflow = data.workflow;
        workflow.forEach(async (element) => {
          const uid = element.user_id;
          const userRef = doc(db, "users", uid);
          const userDocSnap = await getDoc(userRef);
          const assigned_tasks = userDocSnap.data().assigned_tasks;

          //remove the doc
          const index = assigned_tasks.indexOf(docID);
          if (index !== -1) {
            assigned_tasks.splice(index, 1);
          }

          await updateDoc(userRef, {
            assigned_tasks: assigned_tasks,
          });
        });
        console.log("tasks removed from assigned users successfully");

        //remove task from owner
        const ownerRef = doc(db, "users", props.owner);
        const ownerDocSnap = await getDoc(ownerRef);
        const my_tasks = ownerDocSnap.data().my_tasks;
        //remove the doc
        const index = my_tasks.indexOf(docID);
        if (index !== -1) {
          my_tasks.splice(index, 1);
        }
        await updateDoc(ownerRef, {
          my_tasks: my_tasks,
        });
      } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
      }
    } catch (error) {
      console.error("Error moving task:", error);
    }
  }


  useEffect(() => {
    // This block of code will run every time attachments state changes
    if (attachments.length > 0) {
      // Now you can perform actions that depend on attachments being updated
      updateWorkflowElement(props.docID, props.index, {
        approved: approved,
        completed: true,
        comments: comment,
        timestamp: timestamp,
        attachments: attachments
      });
    }
  }, [attachments]); // Watch for changes in attachments state
  
  /**
   * Call this function when user clicks save button
   */
  async function handleSave() {
    setIsUploading(true);
    try {
      const realtimeDB = getDatabase();

      await setTimestamp(Date()); //get current timestamp
      await setCompleted(true); //mark this step as completed

      /**Upload files to firebase storage */
      const attachmentNames = [];
      /*
      selectedFiles.forEach(
        (file) => {
          //Upload path:"tasks/{task_id}/{user_id}/{file_name}"
          const fileLink = uploadFile(`tasks/${props.docID}/${props.step.user_id}/${file.name}`, file);
          console.log("File Link: ", fileLink);
          attachmentNames.push(file.name);
        }
      );
      */
      const uploadPromises = selectedFiles.map((file) => {
        return uploadFile(`tasks/${props.docID}/${props.step.user_id}/${file.name}`, file)
          .then((fileLink) => {
            console.log("File Link: ", fileLink);
            //attachmentNames.push(file.name);
            //console.log("New attachment",file.name);
          })
          .catch((error) => {
            console.error("Error uploading file:", error);
          });
      });


      await Promise.all(uploadPromises); //wait until all promises are done

      await (()=>{
        selectedFiles.forEach(element => {
          attachmentNames.push(element.name);
        });
      }) ();
      

      //Todo: Complete setAttachments function
      await setAttachments(attachmentNames);

      //store updated data in Json object
      const updatedData = await (() => {
        return {
          approved: approved,
          completed: true,
          comments: comment,
          timestamp: timestamp,
          attachments: attachments
        };
      })();
    
      // const updatedData = {
      //   approved: approved,
      //   completed: true,
      //   comments: comment,
      //   timestamp: timestamp,
      //   attachments: attachments
      // }
      //console.log(updatedData);
      await updateWorkflowElement(props.docID, props.index, updatedData);  //call the function to update workflow in Firebase

      if (!approved) { //notification
        await set(databaseRef(realtimeDB, 'notifications/' + props.owner + '/' + props.docID), {
          owner: props.owner,
          task_name: "Your task",
          description: "You have a rejected task",
          type: 'Rejected Task',
          severity: 'error',
          path: '/dashboard/rejected'
        });
      }
      setIsUploading(false);
      props.handleClose();
    } catch (error) {
      console.error('Error handling save:', error);
      setIsUploading(false);
    }
  }

  /**
   * General dialog box
   * @param {*} props .step = {fullName: "", user_id:"",comments:"",approved:boolean, completed:boolean}
   * @returns A dialog component with specific details
   */
  function RenderNormalDialog(props) {
    const storage = getStorage();

    const status = props.step.approved ? "Approved" : (props.step.completed ? "Rejected" : "Pending");
    //const [attachments, setAttachments] = useState([]);
    //console.log('Attachments 1st:', props.step.attachments);
    //attachment file can be accessed through props.step
    //attachment file can be accessed through props.step
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
   * Use this if the current user is the assigned user in the step.
   */
  function RenderSpecificDialog(props) {
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
            {/* <Button onClick={() => {
              // if(completed){alert("You cannot edit after completing!")}
              // else{handleSave();}
              handleSave();
              props.handleClose();
            }} autoFocus variant="outlined"
            > Submit </Button> */}
            <Button onClick={() => {
              if (!isUploading) { // Only allow click when not uploading
                handleSave();
                // props.handleClose();
              }
            }} autoFocus variant="outlined"
              disabled={isUploading} // Disable the button when uploading
            > Submit </Button>

          </DialogActions>
        </Dialog>
      </div>
    );
  }

  if (props.isCurrentUser) {
    if (props.index !== props.activeStep) {
      return RenderNormalDialog(props); // Current user can't edit
    } else {
      if ((props.rejectedAt !== -1) && (props.index > props.rejectedAt)) {
        return RenderNormalDialog(props); // Current user should not be able to edit his step after rejection
      } else {
        //return RenderSpecificDialog(props); // Current user can edit.This was the original code. Uncomment ifa any error occr
        if (props.step.completed) {
          return RenderNormalDialog(props);
        }
        else {
          return RenderSpecificDialog(props); //current user can edit
        }
      }
    }
  } else {
    return RenderNormalDialog(props); // Dialog is not for the current user
  }
}

