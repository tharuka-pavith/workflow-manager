import React from 'react';

// React hooks
import { useEffect, useState } from 'react'; //react hooks

// MUI components
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, TablePagination } from '@mui/material';
import { Container, Paper, Typography, TextField, Box, IconButton } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';


// React router
import { Link, useNavigate } from 'react-router-dom';

//Firebase functions
import { getAuth } from "firebase/auth";
import { collection, query, where, getDocs, getFirestore, orderBy } from "firebase/firestore";

//MUI icons
import SearchIcon from '@mui/icons-material/Search';
import RefreshIcon from '@mui/icons-material/Refresh';


// Columns in the table
const columns = [
    { id: 'initialized_date', label: 'Initialized Date', minWidth: 100 },
    { id: 'due_date', label: 'Due Date', minWidth: 100 },
    { id: 'name', label: 'Task Name', minWidth: 100 },
    {
        id: 'description',
        label: 'Description',
        minWidth: 170,
    },
    {
        id: 'attachments',
        label: 'Attachments',
        minWidth: 170,
    },
    //{id: 'assigned_to', label: 'Assigned', minWidth: 170,},
    //{ id: 'docId', label: 'Task ID', minWidth: 100, align: 'center' },
];

/**Organize data that should be included in the table*/
function createData(due_date, initialized_date, name, description, attachments, assigned_to, docId) {
    const viewmore = <Link to="/dashboard/task">View more</Link>
    return { initialized_date, due_date, name, description, attachments, assigned_to, docId };
}

/**MyTask component */
function MyTask() {
    const auth = getAuth();
    const db = getFirestore();
    const navigate = useNavigate();

    const [rows, setRows] = React.useState([]); //rows store an array of task data owned by the user
    const [initialDataRows, setInitialDataRows] = useState([]);

    const [searchQuery, setSearchQuery] = useState(''); //for search functionality

    useEffect(() => {
        const fetchData = async () => {
            const q = query(collection(db, "current_tasks"), where("owner_id", "==", auth.currentUser.uid),); //the query 
            const querySnapshot = await getDocs(q);
            const tempArr = []; //temp array to store task list

            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                console.log(doc.id);
                const data = doc.data();
                const due_date = data.due_date.toString();
                const initialized_date = data.initialized_date;
                const temp = createData(due_date, initialized_date, data.task_name, data.description, data.attachments, data.workflow[0].fullName, doc.id);
                tempArr.push(temp);
                //console.log(doc.id, " => ", doc.data().workflow[0]);
                //console.log(data.due_date);
            });
            setInitialDataRows(tempArr);
            setRows(tempArr);

        };
        fetchData();
    }, []);

    //------------ Used to manipulate the table -------------//
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    //-------------------------------------------------------//

    //------------ Used to navigate to the task component -------------//
    const handleRowClick = (rowData) => {
        //console.log(rowData.docId);
        navigate("/dashboard/task", { state: rowData.docId });
    };
    //-------------------------------------------------------//

    return (
        <Container maxWidth="lg">
            {/* <Paper elevation={0} sx={{ mt: '120px', width: '100%', mx: 'auto' }}> */}
            <Paper elevation={12} sx={{ p: '2%' }}>
                <Box display={'flex'} justifyContent="space-between">
                    <Typography variant='h5' textAlign='left' fontWeight="medium" sx={{ my: '10px' }}>My Tasks</Typography>
                    <Box>
                        <TextField id="search-textfield" placeholder='Search by Task Name'
                            InputProps={{
                                startAdornment: (<InputAdornment position="start"> <SearchIcon /> </InputAdornment>),
                            }}
                            variant="outlined" size='small'
                            value={searchQuery}
                            onChange={(e) => {
                                setSearchQuery(e.target.value);
                                const filteredTasks = initialDataRows.filter(task =>
                                    task.name.includes(searchQuery)
                                );
                                setRows(filteredTasks);
                            }} />
                        <IconButton onClick={() => { setRows(initialDataRows); setSearchQuery('') }}><RefreshIcon /></IconButton>
                    </Box>
                </Box>
                <TableContainer sx={{ maxHeight: 500 }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        align={column.align}
                                        style={{ minWidth: column.minWidth }}
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row) => {
                                    return (

                                        <TableRow onClick={() => { handleRowClick(row); }} hover role="checkbox" tabIndex={-1} key={row.code}>
                                            {columns.map((column) => {
                                                const value = row[column.id];
                                                return (
                                                    <TableCell key={column.id} align={column.align}>
                                                        {column.format && typeof value === 'number'
                                                            ? column.format(value)
                                                            : value}
                                                    </TableCell>
                                                );
                                            })}
                                        </TableRow>

                                    );
                                })}
                        </TableBody>
                    </Table>
                </TableContainer>

                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </Container >
    );
}


export default MyTask;






















// import TaskCard from '../components/TaskCard';

// const cards = [
//     { heading: "Cash voucher", details: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit.' },
//     { heading: "Approval Letter", details: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit.' },
//     { heading: "Verification Letter", details: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit.' },
//     { heading: "Cash voucher", details: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit.' },
//     { heading: "Cash voucher", details: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit.' },
//     { heading: "Cash voucher", details: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit.' }
// ];

// function createCard(card) {
//     return(
//         <Grid item xs={4}>
//         <TaskCard heading={card.heading} date={new Date().toDateString()} details={card.details} />
//     </Grid>
//     );
// }

// function MyTask() {
//     return (
//         <Container maxWidth="lg">
//             <Paper elevation={0} sx={{ mt: '120px', width: '100%', mx: 'auto' }}>
//                 <Typography variant='h5' textAlign='left' fontWeight="medium" sx={{ my: '10px' }}>My Tasks</Typography>

//                 <Grid container spacing={3}>
//                     <Grid item xs={4}>
//                         <TaskCard heading="Voucher" date={new Date().toDateString()} details="This is a cash voucher" />
//                     </Grid>

//                     {/* <Grid item xs={4}>
//                         <TaskCard heading="Voucher" details="This is a cash voucher" />
//                     </Grid>

//                     <Grid item xs={4}>
//                         <TaskCard heading="Voucher" details="This is a cash voucher" />
//                     </Grid>

//                     <Grid item xs={4}>
//                         <TaskCard heading="Voucher" details="This is a cash voucher" />
//                     </Grid> */}

//                     {cards.map(createCard)}
//                 </Grid>
//             </Paper>
//         </Container>
//     );
// }
