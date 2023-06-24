import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Typography } from '@mui/material';

export default function TaskDialog(props) {
//   const [open, setOpen] = React.useState(false);

//   const handleClickOpen = () => {
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };

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
       
      >
        <DialogTitle id="alert-dialog-title">
          Assignee: {props.step.fullName}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          <table>
          <tbody>
            <tr>
              <td><Typography variant='subtitle1' >Comments:</Typography></td>
              <td><Typography variant='subtitle1' >Hello world</Typography></td>
            </tr>
            <tr>
              <td><Typography variant='subtitle1' >Attachments:</Typography></td>
              <td><Typography variant='subtitle1' >link1 link2 link3</Typography></td>
            </tr>
            <tr>
              <td><Typography variant='subtitle1' >Reveiewd on:</Typography></td>
              <td><Typography variant='subtitle1' >12th Jun 2023</Typography></td>
            </tr>
            <tr>
              <td><Typography variant='subtitle1' >Status:</Typography></td>
              <td><Typography variant='subtitle1' >Approved</Typography></td>
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