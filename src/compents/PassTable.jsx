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
import {GetAllPasses} from "../api/api";
import Box from "@mui/material/Box";

const columns = [
    { id: 'id', label: 'Id', minWidth: 50, align: 'right' },
    { id: 'registryDate', label: 'Data do registro da passagem', minWidth: 100, align: 'center' },
    {
        id: 'fishId.fish',
        label: 'Id do peixe',
        minWidth: 100,
        align: 'center',
    },
    {
        id: 'antennaId.antenna',
        label: 'Id da antena',
        minWidth: 100,
        align: 'center',
    },
];

export default function PassTable() {

    const [page, setPage] = useState(0);
    const [passes, setPasses] = useState([]);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [loading, setLoading] = useState(false);


    const FetchPasses = async () => {
        setLoading(true);
        try {
            var responsePasses = await GetAllPasses();
            setPasses(responsePasses.data);
            setLoading(false)
        } catch {
            console.log("erro ao buscar dados")
        }
    };

    console.log(passes)

    useEffect(() => {
        FetchPasses();
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
                        )  : passes
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((pass, i) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={pass.id} sx={{...(i % 2 === 0 && { backgroundColor: "#caf0f8" })}}>
                                        {columns.map((column) => {
                                            const value = pass[column.id];
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
                count={passes.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
}
