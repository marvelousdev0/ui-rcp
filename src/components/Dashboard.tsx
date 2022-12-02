import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import * as React from "react";

type DashboardProps = {
  columns: {
    action: any;
    field: string;
    fields: any;
    filter: any;
    format: any;
    title: string;
  }[];
  data: {
    properties: any;
    values: { title: string; value: string }[];
  }[];
};

export default function Dashboard({ columns, data }: DashboardProps) {
  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 480 }}>
        <Table
          stickyHeader
          sx={{ minWidth: 650 }}
          size="small"
          aria-label="dashboard table"
        >
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.title}>{column.title}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, idx) => (
              <TableRow
                key={idx}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                {row.values.map((value, idx) => (
                  <TableCell key={idx}>{value.value}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
