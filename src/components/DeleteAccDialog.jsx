import * as React from 'react';
import PropTypes from 'prop-types';

// MUI material
import {Dialog, DialogTitle, Button} from '@mui/material';

// React router
import { useNavigate } from 'react-router-dom';

//Firebase functions
import { getAuth} from "firebase/auth";
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