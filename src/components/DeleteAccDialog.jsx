import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';

import { getAuth, deleteUser } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { doc, deleteDoc, getFirestore } from "firebase/firestore";

DeleteAccDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

function DeleteAccDialog(props) {

  const auth = getAuth();
  const user = auth.currentUser;
  const uid = user.uid.toString();

  const db = getFirestore();

  const navigate = useNavigate();

  const { onClose, open } = props;

  const handleClose = () => {
    //onClose();
  };

  async function deleteUser(){
    await deleteDoc(doc(db, "users", uid));
  }

  return (
    // <Dialog onClose={onClose} open={open}> use onclose prop to close dialog when user clicks away
    <Dialog open={open}>
      <DialogTitle>Delete this account?</DialogTitle>

      <span sx={{mx:'auto', width:'100%'}}>
      <Button color='error'
      onClick={()=>{
        deleteUser(); //delete user from firestore db

        deleteUser(user).then(() => {
          // User deleted.
          navigate("/home/welcome");
        }).catch((error) => {
          // An error ocurred
          // ...
        });
        onClose();
      }}>
        Yes
      </Button>

      <Button 
      onClick={()=>{
        onClose();
      }}>
        No
      </Button>
      </span>

    </Dialog>
  );
}

export default DeleteAccDialog;