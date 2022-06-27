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
import { CircularProgress, Tooltip, Typography } from "@mui/material";
import { deleteFish,GetAllFishes } from "../api/api";
import Box from "@mui/material/Box";
import { AiOutlinePlus } from "react-icons/ai";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import { useNavigate } from "react-router";
import { TableSortLabel } from "@mui/material";
import { visuallyHidden } from "@mui/utils";
import SearchFish from "../pages/fish/SearchFish";
import {MdEditNote} from "react-icons/md";
import {HiOutlineTrash} from "react-icons/hi";
import {toast} from 'react-toastify';
import {deleteFish} from '../api/api'

const columns = [
  { id: "id", label: "Id", minWidth: 50, align: "right" },
  { id: "pittag", label: "Pittag", minWidth: 100, align: "center" },
  {
    id: "scientificName",
    label: "Nome Científico",
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
            padding={column.disablePadding ? "none" : "normal"}
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

export default function FishTable() {
  const [page, setPage] = useState(0);
  const [fishes, setFishes] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [deleteChange, setDeleteChange] = useState(false);
  const [page, setPage] = useState(0);
  const [fishes, setFishes] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState("desc");
  const [orderBy, setOrderBy] = useState("id");
  const [deleteChange, setDeleteChange] = useState(false);
  const navigate = useNavigate();

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const fetchFishes = async () => {
    setLoading(true);

    await GetAllFishes()
      .then((response) => {
        setFishes(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchFishes();
  }, [deleteChange]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleNavigate = () => {
    navigate("/edit-fish");
  };

  const handleDelete = async (id) => {
    await deleteFish(id)
      .then((response) => {
        toast.success("Peixe deletado com sucesso!");
        setDeleteChange(!deleteChange);
      })
      .catch((error) => {
        toast.error("Erro ao deletar peixe!");
        console.log(error);
      });
  };

  const handleEdit = (id) => {
    navigate("/edit-fish", { state: { id } });
  };

  useEffect(() => {
    fetchFishes();
  }, [deleteChange]);

  return (
      <>
        <Paper sx={{ width: "100%", overflow: "hidden", marginBottom:"15px" }}   >
          <SearchFish/>
        </Paper>
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
        >
          Peixes Cadastrados
        </Typography>
        <Tooltip title="Cadastrar peixe">
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
              fishes
                .slice()
                .sort(getComparator(order, orderBy))
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
                      <TableCell>
                        <IconButton
                            onClick={() => {
                              handleEdit(fish.id);
                            }}
                        >
                          <MdEditNote color={"#d1bd0a"} />
                        </IconButton>
                        <IconButton onClick={() => handleDelete(fish.id)}>
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
        count={fishes.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
    </>
  );
}
