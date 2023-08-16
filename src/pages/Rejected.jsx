import React from 'react';

// React hooks
import { useEffect } from 'react';

//MUI components
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, TablePagination } from '@mui/material';
import { Container, Paper, Typography } from '@mui/material';

// React router
import { Link, useNavigate } from 'react-router-dom';

// Firebase functions
import { getAuth } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { collection, query, where, getDocs } from "firebase/firestore";



const columns = [
    { id: 'due_date', label: 'Date', minWidth: 100 },
    { id: 'initialized_date', label: 'Initial Date', minWidth: 100 },
    { id: 'name', label: 'Name', minWidth: 100 },
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
    {
        id: 'assigned_to',
        label: 'Assigned',
        minWidth: 170,
    },
    { id: 'docId', label: 'View', minWidth: 100, align: 'center' },
];


/**Organize data that should be included in the table*/
function createData(due_date, initialized_date, name, description, attachments, assigned_to, docId) {
    const viewmore = <Link to="/dashboard/task">View more</Link>
    return { due_date, initialized_date, name, description, attachments, assigned_to, docId };
}

/**TodoTask component */
function Rejected() {
    const auth = getAuth();
    const db = getFirestore();
    const navigate = useNavigate();

    const [rows, setRows] = React.useState([]);

    // useEffect(() => {
    //     const fetchData = async () => {
    //         const userRef = doc(db, "users", auth.currentUser.uid);
    //         const userSnap = await getDoc(userRef);

    //         const todo_tasks = userSnap.data().assigned_tasks; //get all assigned tasks ids
    //         console.log("todo tasks ", todo_tasks);

    //         //const q = query(collection(db, "current_tasks"), where("owner_id", "==", auth.currentUser.uid)); //the query 
    //         //const querySnapshot = await getDocs(q);
    //         const tempArr = []; //temp array to store task list
    //         const tempDataArr = [];

    //         todo_tasks.forEach(async (id) => { // id = task id
    //             const taskRef = doc(db, "current_tasks", id);
    //             const taskSnap =await getDoc(taskRef);

    //             const data = taskSnap.data();
    //             console.log("data ",data);
    //             const date = new Date(data.due_date).toString();
    //             const temp = createData(date, data.task_name,data.description, "link", data.workflow[0].fullName);
    //             tempArr.push(temp);
    //             //console.log(doc.id, " => ", doc.data().workflow[0]);
    //             //console.log(data.due_date);
    //         });

    //         console.log("tempArr", tempArr);
    //         setRows(tempArr);

    //     };
    //     fetchData();
    // }, []);

    useEffect(() => {
        const fetchData = async () => {
            const userRef = doc(db, "users", auth.currentUser.uid);
            const userSnap = await getDoc(userRef);

            const q = query(collection(db, "rejected_tasks"), where("owner_id", "==", auth.currentUser.uid));
            const querySnapshot = await getDocs(q);

            const tempArr = [];
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                //console.log(doc.id, " => ", doc.data());
                const data = doc.data();
                const due_date = data.due_date.toString();
                const initialized_date = data.initialized_date;
                const temp = createData(due_date,initialized_date, data.task_name,data.description, "link", data.workflow[0].fullName, doc.id);
                tempArr.push(temp);
            });

            console.log("tempArr", tempArr);
            setRows(tempArr);
        };

        fetchData();
    }, []);

    /********* Used to manipulate the table **********/
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    /*************************************************/

    /******** Used to navigate to the task component ******/
    const handleRowClick = (rowData) => {
        //console.log(rowData.docId);
        navigate("/dashboard/rejectedtask", { state: rowData.docId });
    };
    /******************************************************/

    return (
        <Container maxWidth="lg">
            <Paper elevation={12} sx={{ p: '2%' }}>
                <Typography variant='h5' textAlign='left' fontWeight="medium" sx={{ my: '10px' }}>Completed Tasks</Typography>

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

export default Rejected;