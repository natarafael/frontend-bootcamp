import * as React from "react";
import { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import {Button, CircularProgress, styled, Tooltip, Typography} from "@mui/material";
import { GetAllPasses } from "../api/api";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import { AiOutlinePlus } from "react-icons/ai";
import Toolbar from "@mui/material/Toolbar";
import { useNavigate } from "react-router";
import { TableSortLabel } from "@mui/material";
import { visuallyHidden } from "@mui/utils";
import {FaFileCsv} from "react-icons/fa";
import axios from "axios";
import { deletePass } from "../api/api";
import { HiOutlineTrash } from "react-icons/hi";
import { toast } from "react-toastify";

const columns = [
  { id: "id", label: "Id", minWidth: 50, align: "right" },
  {
    id: "registryDate",
    label: "Data do registro da passagem",
    minWidth: 100,
    align: "center",
    format: (value) => {
      const date = new Date(value);
      return value ? date.toLocaleString("pt-BR") : "";
    },
  },
  {
    id: "fishIdentifier",
    label: "Id do peixe",
    minWidth: 100,
    align: "center",
  },
  {
    id: "antennaIdentifier",
    label: "Id da antena",
    minWidth: 100,
    align: "center",
  },
];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function TableHeadEnhanced(props) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {columns.map((column) => (
          <TableCell
            key={column.id}
            align={column.align}
            padding={column.disablePadding ? "none" : "default"}
            sortDirection={orderBy === column.id ? order : false}
          >
            <Tooltip
              title="Ordenar"
              placement={
                column.align === "right" ? "bottom-end" : "bottom-start"
              }
              enterDelay={300}
            >
              <TableSortLabel
                active={orderBy === column.id}
                direction={orderBy === column.id ? order : "asc"}
                onClick={createSortHandler(column.id)}
              >
                {column.label}
                {orderBy === column.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === "desc"
                      ? "sorted descending"
                      : "sorted ascending"}
                  </Box>
                ) : null}
              </TableSortLabel>
            </Tooltip>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

const Input = styled('input')({
  display: 'none',
});

export default function PassTable() {
  const [page, setPage] = useState(0);
  const [passes, setPasses] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [loading, setLoading] = useState(false);
  const [deleteChange, setDeleteChange] = useState(false);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("id");
  const [selectedFile, setSelectedFile] = useState(null);
  const navigate = useNavigate();

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const FetchPasses = async () => {
    setLoading(true);
    try {
      var responsePasses = await GetAllPasses();
      setPasses(responsePasses.data);
      setLoading(false);
    } catch {
      console.log("erro ao buscar dados");
    }
  };

  useEffect(() => {
    FetchPasses();
  }, [deleteChange]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleNavigate = () => {
    navigate("/edit-pass");
  };

  const handleSubmit = async (event) => {
    event.preventDefault()
    const formData = new FormData();
    formData.append("selectedFile", selectedFile);
    try {
      await axios({
        method: "post",
        url: "http://localhost:3030/passes/upload",
        data: formData,
        headers: {"Content-Type": "multipart/form-data"},
      });
    } catch (error) {
      console.log(error)
    }
  }

  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0])
  }

  const handleDelete = async (id) => {
    await deletePass(id)
      .then((response) => {
        toast.success("Peixe deletado com sucesso!");
        setDeleteChange(!deleteChange);
      })
      .catch((error) => {
        toast.error("Erro ao deletar peixe!");
        console.log(error);
      });
  };

  return (
      <>
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <Toolbar
        sx={{
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
          margin: 2,
        }}
      >
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h4"
          id="tableTitle"
          component="div"
        >
          Passagens Cadastradas
        </Typography>
        <Tooltip title="Cadastrar passagem">
          <IconButton onClick={handleNavigate}>
            <AiOutlinePlus />
          </IconButton>
        </Tooltip>
      </Toolbar>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHeadEnhanced
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
          />
          <TableBody>
            {loading ? (
              <Box p={4}>
                <CircularProgress variant="indeterminate" />
              </Box>
            ) : (
              passes
                .slice()
                .sort(getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((pass, i) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={pass.id}
                      sx={{
                        ...(i % 2 === 0 && { backgroundColor: "#caf0f8" }),
                      }}
                      onClick={() => {
                        alert("clicou");
                      }}
                    >
                      {columns.map((column) => {
                        const value = pass[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format ? column.format(value) : value}
                          </TableCell>
                        );
                      })}
                      <TableCell>
                        <IconButton onClick={() => handleDelete(pass.id)}>
                          <HiOutlineTrash color={"red"} />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                })
            )}
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
        <Paper sx={{ width: "100%", overflow: "hidden", marginTop:"20px" }}>
          <form onSubmit={handleSubmit}>
          <IconButton size="large">
            <label htmlFor="contained-button-file">
              <Input accept="svg/*" id="contained-button-file" multiple type="file" onChange={handleFileSelect} />
              <FaFileCsv/>
            </label>
          </IconButton>
          <Button type="submit"  variant="outlined">Enviar</Button>
          </form>
        </Paper>
  </>
  );
}
