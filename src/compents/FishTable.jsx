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
import {GetAllFishes} from "../api/api";

const columns = [
    { id: 'id', label: 'Id', minWidth: 50, align: 'right' },
    { id: 'pittag', label: 'Pittag', minWidth: 100, align: 'center' },
    {
        id: 'scientificName',
        label: 'Nome Científico',
        minWidth: 100,
        align: 'center',
    },
    {
        id: 'commonName',
        label: 'Nome comum',
        minWidth: 100,
        align: 'center',
    },
    {
        id: 'captureLocation',
        label: 'Local de captura',
        minWidth: 100,
        align: 'center',
    },
    {
        id: 'releaseDate',
        label: 'Data de soltura',
        minWidth: 100,
        align: 'center',
        format: (value) => value.toLocaleString('pt-BR')
    },
    {
        id: 'releaseLocation',
        label: 'Local de soltura',
        minWidth: 100,
        align: 'center',
    },
    {
        id: 'dnaSample',
        label: 'Código da amostra de DNA',
        minWidth: 100,
        align: 'center',
    },
    {
        id: 'recapture',
        label: 'Recaptura',
        minWidth: 100,
        align: 'center',
    },
];

export default function FishTable() {

    const [page, setPage] = useState(0);
    const [fishes, setFishes] = useState([]);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [loading, setLoading] = useState(true);


    const FetchFishes = async () => {
        setLoading(true);
        try {
            var responseFishes = await GetAllFishes();
            setFishes(responseFishes.data);
            setLoading(false)
        } catch {
            console.log("erro ao buscar dados")
        }
    };

    console.log(fishes)

    useEffect(() => {
        FetchFishes();
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
                        { loading? <CircularProgress />  : fishes
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((fish) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={fish.id} >
                                        {columns.map((column) => {
                                            const value = fish[column.id];
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
                count={fishes.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
}
