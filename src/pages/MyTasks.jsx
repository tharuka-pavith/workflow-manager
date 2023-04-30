import React from 'react';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
//import Grid from '@mui/material/Grid';
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, TablePagination } from '@mui/material';
import { Link } from 'react-router-dom';

// const columns = [
//     { id: 'name', label: 'Name', minWidth: 170 },
//     { id: 'code', label: 'ISO\u00a0Code', minWidth: 100 },
//     {
//         id: 'population',
//         label: 'Population',
//         minWidth: 170,
//         align: 'right',
//         format: (value) => value.toLocaleString('en-US'),
//     },
//     {
//         id: 'size',
//         label: 'Size\u00a0(km\u00b2)',
//         minWidth: 170,
//         align: 'right',
//         format: (value) => value.toLocaleString('en-US'),
//     },
//     {
//         id: 'density',
//         label: 'Density',
//         minWidth: 170,
//         align: 'right',
//         format: (value) => value.toFixed(2),
//     },
// ];
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

// function createData(name, code, population, size) {
//     const density = population / size;
//     return { name, code, population, size, density };
// }


// const rows = [
//     createData('India', 'IN', 1324171354, 3287263),
//     createData('China', 'CN', 1403500365, 9596961),
//     createData('Italy', 'IT', 60483973, 301340),
//     createData('United States', 'US', 327167434, 9833520),
//     createData('Canada', 'CA', 37602103, 9984670),
//     createData('Australia', 'AU', 25475400, 7692024),
//     createData('Germany', 'DE', 83019200, 357578),
//     createData('Ireland', 'IE', 4857000, 70273),
//     createData('Mexico', 'MX', 126577691, 1972550),
//     createData('Japan', 'JP', 126317000, 377973),
//     createData('France', 'FR', 67022000, 640679),
//     createData('United Kingdom', 'GB', 67545757, 242495),
//     createData('Russia', 'RU', 146793744, 17098246),
//     createData('Nigeria', 'NG', 200962417, 923768),
//     createData('Brazil', 'BR', 210147125, 8515767),
// ];

function createData(initialized_date, name, description, attachments, assigned_to) {
    const viewmore = <Link to="/dashboard/task">View more</Link>
    return { initialized_date, name, description, attachments, assigned_to,viewmore}
}

const rows = [
    createData(Date().toString().substring(4,15), 'Cash Voucher', "This is the description for voucher ", "Link1 link2 link3", "Mr. Perera"),
    createData(Date().toString().substring(4,15), 'Approval Letter', "An approval letter", "Link", "Mr. Perera"),
    createData(Date().toString().substring(4,15), 'Cash Voucher', "This is the description for voucher ", "Link1 Link 2", "Mr. Nimal"),
    createData(Date().toString().substring(4,15), 'Approval Letter', "an approval letter", "Link", "Mr. Kamal"),
    createData(Date().toString().substring(4,15), 'Approval Letter', "an approval letter", "Link", "Mr. Perera"),
    createData(Date().toString().substring(4,15), 'Cash Voucher', "This is the description for voucher lorem ipsum dolor sit amet", "Link", "Mr. Namal"),
    createData(Date().toString().substring(4,15), 'Cash Voucher', "This is the description for voucher ", "Link", "Mr. Perera"),
    createData(Date().toString().substring(4,15), 'Approval Letter', "approval letter", "Link", "Mr. Perera"),
    createData(Date().toString().substring(4,15), 'Approval Letter', "approval letter", "Link", "Mrs. Perera "),
    createData(Date().toString().substring(4,15), 'Cash Voucher', "This is the description for voucher ", "Link", "Mr. Perera"),
    createData(Date().toString().substring(4,15), 'Cash Voucher', "This is the description for voucher ", "Link", "Mr. Namal"),
    createData(Date().toString().substring(4,15), 'Cash Voucher', "This is the description for voucher ", "Link", "Mr. Perera"),
    createData(Date().toString().substring(4,15), 'Approval Letter', "approval letter", "Link", "Mr. Perera"),
    createData(Date().toString().substring(4,15), 'Approval Letter', "approval letter", "Link", "Mrs. Perera "),
    createData(Date().toString().substring(4,15), 'Cash Voucher', "This is the description for voucher ", "Link", "Mr. Perera"),
];



function MyTask(){
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
                <Typography variant='h5' textAlign='left' fontWeight="medium" sx={{ my: '10px' }}>My Tasks</Typography>

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
                                        
                                        <TableRow  hover role="checkbox" tabIndex={-1} key={row.code}>
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
