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
import { GetAllPasses } from "../api/api";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import { AiOutlinePlus } from "react-icons/ai";
import Toolbar from "@mui/material/Toolbar";
import { useNavigate } from "react-router";

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

export default function PassTable() {
  const [page, setPage] = useState(0);
  const [passes, setPasses] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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

  console.log(passes);

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

  const handleNavigate = () => {
    navigate("/edit-pass");
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
            {loading ? (
              <Box p={4}>
                <CircularProgress variant="indeterminate" />
              </Box>
            ) : (
              passes
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
  );
}
