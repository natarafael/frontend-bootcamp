import * as React from 'react';
import {useEffect, useState} from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import {CircularProgress} from "@mui/material";
import {GetAllStatus} from "../api/api";
import Box from "@mui/material/Box";

const columns = [
    { id: 'id', label: 'Id', minWidth: 50, align: 'right' },
    { id: 'observations', label: 'Nome da antena', minWidth: 100, align: 'center' },
    {
        id: 'antennaID',
        label: 'Id da antena',
        minWidth: 100,
        align: 'center',
    },
    {
        id: 'statusChangeDate',
        label: 'Data de alteração de status',
        minWidth: 100,
        align: 'center',
    },
];

export default function StatusTable() {

    const [page, setPage] = useState(0);
    const [status, setStatus] = useState([]);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [loading, setLoading] = useState(false);


    const FetchStatus = async () => {
        setLoading(true);
        try {
            var responseStatus = await GetAllStatus();
            setStatus(responseStatus.data);
            setLoading(false)
        } catch {
            console.log("erro ao buscar dados")
        }
    };

    console.log(status)

    useEffect(() => {
        FetchStatus();
    }, []);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 440 }}>
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
                        { loading ? (
                            <Box p={4}>
                                <CircularProgress variant="indeterminate"  />
                            </Box>
                        )  : status
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((status, i) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={status.id} sx={{...(i % 2 === 0 && { backgroundColor: "#caf0f8" })}}>
                                        {columns.map((column) => {
                                            const value = status[column.id];
                                            return (
                                                <TableCell key={column.id} align={column.align}>
                                                    {column.format ? column.format(value) : value}
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
                count={status.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
}

