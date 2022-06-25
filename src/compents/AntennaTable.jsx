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
import {CircularProgress, Tooltip, Typography} from "@mui/material";
import {GetAllAntennas} from "../api/api";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import {AiOutlinePlus} from "react-icons/ai";

const columns = [
    
    { id: 'id', label: 'Id', minWidth: 50, align: 'right' },
    { id: 'latitude', label: 'Latitude', minWidth: 100, align: 'center' },
    {
        id: 'longitude',
        label: 'Longitude',
        minWidth: 100,
        align: 'center',
    },
    {
        id: 'installationDate',
        label: 'Data de instalação',
        minWidth: 100,
        align: 'center',
        format: (value) => {
            const date = new Date(value)
            return value? date.toLocaleString('pt-BR') : ''
        }
    },
    {
        id: 'uninstallDate',
        label: 'Data de desativação',
        minWidth: 100,
        align: 'center',
        format: (value) => {
            const date = new Date(value)
            return value? date.toLocaleString('pt-BR'): ''
        }
    },
];

export default function AntennaTable() {

    const [page, setPage] = useState(0);
    const [antennas, setAntennas] = useState([]);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [loading, setLoading] = useState(false);


    const FetchAntennas = async () => {
        setLoading(true);
        try {
            var responseAntennas = await GetAllAntennas();
            setAntennas(responseAntennas.data);
            setLoading(false)
        } catch {
            console.log("erro ao buscar dados")
        }
    };

    console.log(antennas)

    useEffect(() => {
        FetchAntennas();
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
            <Toolbar
                sx={{
                    pl: { sm: 2 },
                    pr: { xs: 1, sm: 1 },
                    margin:2,
                }}
            >
                <Typography
                    sx={{ flex: '1 1 100%' }}
                    variant="h4"
                    id="tableTitle"
                    component="div"
                >
                    Antenas Cadastradas
                </Typography>
                <Tooltip title="Cadastrar Antena">
                    <IconButton>
                        <AiOutlinePlus />
                    </IconButton>
                </Tooltip>
            </Toolbar>
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
                        )  : antennas
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((antenna, i) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={antenna.id} sx={{...(i % 2 === 0 && { backgroundColor: "#caf0f8" })}}>
                                        {columns.map((column) => {
                                            const value = antenna[column.id];
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
                count={antennas.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
}
