import React from 'react';

// MUI components
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

/**Forward reference function for Alert */
const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

/**CustomAlert component */
export default function CustomAlert(props) {
    const { alert, handleClose } = props;
    return (
        <Snackbar open={alert.open} autoHideDuration={2000} onClose={handleClose} 
        anchorOrigin={{ vertical:"bottom", horizontal:"right" }}>
            <Alert severity={alert.severity} sx={{ width: '100%' }} onClose={handleClose}>
                {alert.message}
            </Alert>
        </Snackbar>
    );
}