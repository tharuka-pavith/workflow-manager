import React from 'react';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
//import Grid from '@mui/material/Grid';
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, TablePagination } from '@mui/material';

import {Link} from 'react-router-dom';

//---------Required Firebase functions---------//
import { getAuth } from "firebase/auth";
import {collection, query, where, getDocs, getFirestore,doc, getDoc } from "firebase/firestore";
//---------------------------------------------//

import { useEffect } from 'react'; //react hook to load data 

const columns = [
    { id: 'initialized_date', label: 'Date', minWidth: 100 },
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
    { id: 'viewmore', label: 'View', minWidth: 100, align: 'center' },
];

function createData(initialized_date, name, description, attachments, assigned_to) {
    const viewmore = <Link to="/dashboard/task">View more</Link>
    return { initialized_date, name, description, attachments, assigned_to, viewmore}
}
// const rows = [
//     createData(Date().toString().substring(4,15), 'Cash Voucher', "This is the description for voucher ", "Link1 link2 link3", "You"),
//     createData(Date().toString().substring(4,15), 'Approval Letter', "An approval letter", "Link", "You"),
//     createData(Date().toString().substring(4,15), 'Cash Voucher', "This is the description for voucher ", "Link1 Link 2", "You"),
//     createData(Date().toString().substring(4,15), 'Approval Letter', "an approval letter", "Link", "You"),
//     createData(Date().toString().substring(4,15), 'Approval Letter', "an approval letter", "Link", "You"),
//     createData(Date().toString().substring(4,15), 'Cash Voucher', "This is the description for voucher lorem ipsum dolor sit amet", "Link", "You"),
//     createData(Date().toString().substring(4,15), 'Cash Voucher', "This is the description for voucher ", "Link", "You"),
//     createData(Date().toString().substring(4,15), 'Approval Letter', "approval letter", "Link", "You"),
//     createData(Date().toString().substring(4,15), 'Approval Letter', "approval letter", "Link", "You"),
//     createData(Date().toString().substring(4,15), 'Cash Voucher', "This is the description for voucher ", "Link", "You"),
//     createData(Date().toString().substring(4,15), 'Cash Voucher', "This is the description for voucher ", "Link", "You"),
//     createData(Date().toString().substring(4,15), 'Cash Voucher', "This is the description for voucher ", "Link", "You"),
//     createData(Date().toString().substring(4,15), 'Approval Letter', "approval letter", "Link", "You"),
//     createData(Date().toString().substring(4,15), 'Approval Letter', "approval letter", "Link", "You"),
//     createData(Date().toString().substring(4,15), 'Cash Voucher', "This is the description for voucher ", "Link", "You"),
// ];

function TodoTask(){
    const auth = getAuth(); 
    const db = getFirestore();
    
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
      
          const todo_tasks = userSnap.data().assigned_tasks; //get all assigned tasks ids
          console.log("todo tasks ", todo_tasks);
      
          const tempArr = await Promise.all(
            todo_tasks.map(async (id) => {
              const taskRef = doc(db, "current_tasks", id);
              const taskSnap = await getDoc(taskRef);
      
              const data = taskSnap.data();
              console.log("data ", data);
              const date = new Date(data.due_date).toString();
              return createData(
                date,
                data.task_name,
                data.description,
                "link",
                data.workflow[0].fullName
              );
            })
          );
      
          console.log("tempArr", tempArr);
          setRows(tempArr);
        };
      
        fetchData();
      }, []);
      
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <Container maxWidth="lg">
            <Paper elevation={0} sx={{ mt: '120px', width: '100%', mx: 'auto' }}>
                <Typography variant='h5' textAlign='left' fontWeight="medium" sx={{ my: '10px' }}>TODO Tasks</Typography>

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
                                        <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
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

export default TodoTask;