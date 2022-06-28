import React,{useState} from 'react';
import useHookForm from "../../compents/hooks/UseHookForm";
import {FishSearchSchema} from "./FishSearchSchema";
import {Box, Button,MenuItem, Select, Typography} from "@mui/material";
import Form from "../../compents/hook-forms/Form";
import {ControlledTextField} from "../../compents/hook-forms/TextFieldForm";
import { GetAllFishesBy} from "../../api/api";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import {toast} from "react-toastify";


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


function SearchTable({fishes, setFilteredFishes}) {
    return (
        <TableContainer component={Paper}>
            <Typography
                sx={{ flex: "1 1 100%" }}
                variant="h6"
                id="tableTitle"
                p={2}
            >
                Resultado
            </Typography>
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
            <Button variant="text" color="error" onClick={()=> setFilteredFishes([])}>
                fechar
            </Button>
        </TableContainer>
    );
}


const SearchFish = () => {
    const initialValues = {
        filteredBy: "scientificNames",
        field: "",
    };
    const [filteredFishes, setFilteredFishes] = useState([]);
    const [filterField, setFilterField] = useState(initialValues.filteredBy);

    const handleChange = (event) => {
        setFilterField(event.target.value);
        methods.setValue('filteredBy', event.target.value);
    };

    const FORM_ID = "SearchFish";

    const { methods } = useHookForm(initialValues, FishSearchSchema, "onSubmit");


    const handleSubmit = async (formValues) => {
        await GetAllFishesBy(formValues.filteredBy, formValues.field).then((response) => {
            setFilteredFishes(response.data);
            methods.reset();
        }
        ).catch((error) => {
            console.log(error);
            setFilteredFishes([]);
            toast.error("não foi possível realizar a busca");
            methods.reset();
        }
        );
    }

    return (
        <Box display="flex" flexDirection="column" flexWrap="wrap" width="100%">
            <Form id={FORM_ID} methods={methods} onSubmit={handleSubmit}>
                    <Typography variant="h6" marginTop={2}>Pesquisar</Typography>
                    <Select
                        id="filterBy"
                        name="filteredBy"
                        value={filterField}
                        label="Filtrar Por"
                        onChange={handleChange}
                        sx={{margin: "10px"}}
                    >
                        <MenuItem value={"pittags"}>Pittag</MenuItem>
                        <MenuItem value={"scientificNames"}>Nome cíentifico</MenuItem>
                        <MenuItem value={"captureLocations"}>Local de captura</MenuItem>
                        <MenuItem value={"releaseLocations"}>Local de soltura</MenuItem>
                        <MenuItem value={"dnaSamples"}>Amostra de DNA</MenuItem>
                    </Select>
                <ControlledTextField
                    name="field"
                    control={methods.control}
                    label="Campo"
                    sx={{ width: "40%", margin: "10px"}}
                />
                    <Button
                        variant="outlined"
                        type="submit"
                        form={FORM_ID}
                        color={"primary"}
                        sx={{margin: "10px"}}
                    >
                        Buscar
                    </Button>
            </Form>
            {
                filteredFishes.length > 0 ? <SearchTable fishes={filteredFishes} setFilteredFishes={setFilteredFishes}/> : ""
            }

        </Box>
    );
}
export default SearchFish;