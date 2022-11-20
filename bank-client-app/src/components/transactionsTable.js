import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { useEffect } from "react";
import { useState } from "react";
import DeleteButton from "./DeleteButton";
const columns = [
  { id: "vendor", label: "On", minWidth: 10 },
  { id: "category", label: "Category", minWidth: 10 },
  {
    id: "amount",
    label: "Amount",
    minWidth: 10,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "tr_date",
    label: "Date",
    minWidth: 10,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "delete",
    label: "",
    minWidth: 10,
    align: "right",
  },
];

export default function TransactionsTable(props) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
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
            {props.transactions
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((tr) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={tr.code}>
                    {columns.map((column) => {
                      const value = tr[column.id];
                      return (
                        <TableCell style={typeof value === 'number' ? value < 0 ? {backgroundColor:'#ed6c02', borderRadius: '10px'} : {backgroundColor:'#4BB543',borderRadius: '10px'} : {backgroundColor:'white'}} key={column.id} align={column.align}>
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                    <DeleteButton id={tr.id} deleteFunk={props.deleteFunk} />
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 15]}
        component="div"
        count={props.transactions.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
