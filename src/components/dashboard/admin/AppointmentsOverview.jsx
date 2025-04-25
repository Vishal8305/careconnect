import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Box, Divider } from "@mui/material";

const AppointmentsOverview = () => {
  const columns = ["#", "Patient", "Age", "Date & Time", "Doctor", "Fees", "Action"];
  const rows = []; // Add your appointment data here

  return (
    <Box sx={{ padding: "20px" }} mt={5}>
      <Typography variant="h6" fontWeight="bold" gutterBottom color="#616161">
        All Appointments
      </Typography>
      <Divider/>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((column, index) => (
                <TableCell key={index} style={{ fontWeight: "bold" }}>
                  {column}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.length === 0 ? (
              <TableRow>
                <TableCell colSpan={columns.length} align="center">
                  No appointments available
                </TableCell>
              </TableRow>
            ) : (
              rows.map((row, rowIndex) => (
                <TableRow key={rowIndex}>
                  {columns.map((col, colIndex) => (
                    <TableCell key={colIndex}>{row[col.toLowerCase()] || "-"}</TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default AppointmentsOverview;
