import React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Upload from '@mui/icons-material/Upload';

/***************************************************************** */
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';


const steps = ['Initiated by You', 'Dr. Nimal','Mr. Perera','Ms. Kaamala', 'Dept. Head DEIE', 'Assistant Registrar', 'ViceChancellor'];

/*************************************************************************************** */

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


function Task() {
  const isStepFailed = (step) => {
    return step === 1;
  };

  return (
    <Container maxWidth='lg' sx={{ mt: '120px', width: '100%' }} disableGutters>
      {/* <Paper variant='outlined' sx={{mt: '150px', width: '50%', mx:'auto'}}> */}
      <Typography variant='h5' textAlign={'left'} fontWeight="medium" sx={{ my: '10px' }}>Task: Cash Voucher</Typography>
      <Box sx={{ width: '100%', mt:'100px' }}>
        <Stepper activeStep={1} alternativeLabel>
          {steps.map((label, index) => {
            const labelProps = {};
            if (isStepFailed(index)) {
              labelProps.optional = (
                <Typography variant="caption" color="error">
                  Alert message
                </Typography>
              );

              labelProps.error = true;
            }

            return (
              <Step key={label}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
      </Box>

    </Container>
  );
}

export default Task;

