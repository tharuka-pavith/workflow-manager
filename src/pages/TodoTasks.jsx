import React from 'react';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
//import Grid from '@mui/material/Grid';
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, TablePagination } from '@mui/material';

import {Link} from 'react-router-dom';

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
        label: 'Assigned To',
        minWidth: 170,
    },
    { id: 'viewmore', label: 'View', minWidth: 100, align: 'center' },
];

function createData(initialized_date, name, description, attachments, assigned_to) {
    const viewmore = <Link to="/dashboard/task">View more</Link>
    return { initialized_date, name, description, attachments, assigned_to, viewmore}
}
const rows = [
    createData(Date().toString().substring(4,15), 'Cash Voucher', "This is the description for voucher ", "Link1 link2 link3", "You"),
    createData(Date().toString().substring(4,15), 'Approval Letter', "An approval letter", "Link", "You"),
    createData(Date().toString().substring(4,15), 'Cash Voucher', "This is the description for voucher ", "Link1 Link 2", "You"),
    createData(Date().toString().substring(4,15), 'Approval Letter', "an approval letter", "Link", "You"),
    createData(Date().toString().substring(4,15), 'Approval Letter', "an approval letter", "Link", "You"),
    createData(Date().toString().substring(4,15), 'Cash Voucher', "This is the description for voucher lorem ipsum dolor sit amet", "Link", "You"),
    createData(Date().toString().substring(4,15), 'Cash Voucher', "This is the description for voucher ", "Link", "You"),
    createData(Date().toString().substring(4,15), 'Approval Letter', "approval letter", "Link", "You"),
    createData(Date().toString().substring(4,15), 'Approval Letter', "approval letter", "Link", "You"),
    createData(Date().toString().substring(4,15), 'Cash Voucher', "This is the description for voucher ", "Link", "You"),
    createData(Date().toString().substring(4,15), 'Cash Voucher', "This is the description for voucher ", "Link", "You"),
    createData(Date().toString().substring(4,15), 'Cash Voucher', "This is the description for voucher ", "Link", "You"),
    createData(Date().toString().substring(4,15), 'Approval Letter', "approval letter", "Link", "You"),
    createData(Date().toString().substring(4,15), 'Approval Letter', "approval letter", "Link", "You"),
    createData(Date().toString().substring(4,15), 'Cash Voucher', "This is the description for voucher ", "Link", "You"),

];

function TodoTask(){
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