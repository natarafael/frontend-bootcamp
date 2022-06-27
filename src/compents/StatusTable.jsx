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
import { GetAllStatus } from "../api/api";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import { AiOutlinePlus } from "react-icons/ai";
import { useNavigate } from "react-router";
import { TableSortLabel } from "@mui/material";
import { visuallyHidden } from "@mui/utils";

const columns = [
  { id: "id", label: "Id", minWidth: 50, align: "right" },
  {
    id: "observations",
    label: "Nome da antena",
    minWidth: 100,
    align: "center",
  },
  {
    id: "antennaIdentifier",
    label: "Id da antena",
    minWidth: 100,
    align: "center",
  },
  {
    id: "status",
    label: "Status",
    minWidth: 100,
    align: "center",
    format: (value) => (value ? "Ativada" : "Desativada"),
  },
  {
    id: "statusChangeDate",
    label: "Data de mudança de status",
    minWidth: 100,
    align: "center",
    format: (value) => {
      const date = new Date(value);
      return value ? date.toLocaleString("pt-BR") : "";
    },
  },
  {
    id: "latitude",
    label: "Latitude",
    minWidth: 100,
    align: "center",
  },
  {
    id: "longitude",
    label: "Longitude",
    minWidth: 100,
    align: "center",
  },
  {
    id: "installationDate",
    label: "Data de instalação",
    minWidth: 100,
    align: "center",
    format: (value) => {
      const date = new Date(value);
      return value ? date.toLocaleString("pt-BR") : "";
    },
  },
  {
    id: "uninstallDate",
    label: "Data de desativação",
    minWidth: 100,
    align: "center",
    format: (value) => {
      const date = new Date(value);
      return value ? date.toLocaleString("pt-BR") : "";
    },
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

export default function StatusTable() {
  const [page, setPage] = useState(0);
  const [status, setStatus] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("id");
  const navigate = useNavigate();

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const FetchStatus = async () => {
    setLoading(true);
    await GetAllStatus()
      .then((response) => {
        setStatus(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

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

  const handleNavigate = () => {
    navigate("/edit-status");
  };

  return (
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
          Status das Antenas Cadastradas
        </Typography>
        <Tooltip title="Cadastrar status antena">
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
              status
                .slice()
                .sort(getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((status, i) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={status.id}
                      sx={{
                        ...(i % 2 === 0 && { backgroundColor: "#caf0f8" }),
                      }}
                    >
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
                })
            )}
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
