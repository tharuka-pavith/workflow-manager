import React from 'react';

// MUI components
import {  CardActions, CardContent, Button, Typography, Card } from '@mui/material';

/**TaskCard component */
function TaskCard(props) {
    return (
        <Card elevation={5} sx={{width: "95%"}}>
            <CardContent>
                <Typography variant='h6' textAlign='left'>{props.heading}</Typography>
                <Typography variant='body1' textAlign='left'>Initialized: {props.date}</Typography>
                <Typography variant='body1' textAlign='left'>{props.details}</Typography>
            </CardContent>
            <CardActions>
            <Button variant='text' size='small'>View</Button>
            </CardActions>
        </Card>
    );
}

export default TaskCard;