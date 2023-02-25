import React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

import TaskCard from '../components/TaskCard';

const cards = [
    { heading: "Cash voucher", details: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit.' },
    { heading: "Approval Letter", details: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit.' },
    { heading: "Verification Letter", details: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit.' },
    { heading: "Cash voucher", details: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit.' },
    { heading: "Cash voucher", details: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit.' },
    { heading: "Cash voucher", details: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit.' }
];

function createCard(card) {
    return(
        <Grid item xs={4}>
        <TaskCard heading={card.heading} date="{new Date().toDateString()}" details={card.details} />
    </Grid>
    );
}

function MyTask() {
    return (
        <Container maxWidth="lg">
            <Paper elevation={0} sx={{ mt: '120px', width: '100%', mx: 'auto' }}>
                <Typography variant='h5' textAlign='left' fontWeight="medium" sx={{ my: '10px' }}>My Tasks</Typography>

                <Grid container spacing={3}>
                    <Grid item xs={4}>
                        <TaskCard heading="Voucher" date={new Date().toDateString()} details="This is a cash voucher" />
                    </Grid>

                    <Grid item xs={4}>
                        <TaskCard heading="Voucher" details="This is a cash voucher" />
                    </Grid>

                    <Grid item xs={4}>
                        <TaskCard heading="Voucher" details="This is a cash voucher" />
                    </Grid>

                    <Grid item xs={4}>
                        <TaskCard heading="Voucher" details="This is a cash voucher" />
                    </Grid>

                    {cards.map(createCard)}
                </Grid>
            </Paper>
        </Container>
    );
}

export default MyTask;