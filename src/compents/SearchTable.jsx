import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const columns = [
    { id: "id", label: "Id", minWidth: 50, align: "right" },
    { id: "pittag", label: "Pittag", minWidth: 100, align: "center" },
    {
        id: "scientificName",
        label: "Nome científico",
        minWidth: 100,
        align: "center",
    },
    {
        id: "commonName",
        label: "Nome comum",
        minWidth: 100,
        align: "center",
    },
    {
        id: "captureLocation",
        label: "Local de captura",
        minWidth: 100,
        align: "center",
    },
    {
        id: "releaseDate",
        label: "Data de soltura",
        minWidth: 100,
        align: "center",
        format: (value) => {
            const date = new Date(value);
            return value ? date.toLocaleString("pt-BR") : "";
        },
    },
    {
        id: "releaseLocation",
        label: "Local de soltura",
        minWidth: 100,
        align: "center",
    },
    {
        id: "dnaSample",
        label: "Código da amostra de DNA",
        minWidth: 100,
        align: "center",
    },
    {
        id: "recapture",
        label: "Recaptura",
        minWidth: 100,
        align: "center",
        format: (value) => (value ? "Sim" : "Não"),
    },
];

export default function SearchTable({fishes}) {
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
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
                    {
                        fishes
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((fish, i) => {
                                return (
                                    <TableRow
                                        hover
                                        role="checkbox"
                                        tabIndex={-1}
                                        key={fish.id}
                                        sx={{
                                            ...(i % 2 === 0 && { backgroundColor: "#caf0f8" }),
                                        }}
                                    >
                                        {columns.map((column) => {
                                            const value = fish[column.id];
                                            return (
                                                <TableCell key={column.id} align={column.align}>
                                                    {column.format ? column.format(value) : value}
                                                </TableCell>
                                            );
                                        })}
                                    </TableRow>
                                );
                            })
                    }
                </TableBody>
            </Table>
        </TableContainer>
    );
}