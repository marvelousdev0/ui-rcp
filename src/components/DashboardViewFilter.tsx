import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import * as React from "react";

type DashboardViewFilterProps = {
  filters: {
    id: string;
    title: string;
    [key: string]: any;
  }[];
};

export default function DashboardViewFilter({
  filters,
}: DashboardViewFilterProps) {
  return (
    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <InputLabel id="demo-simple-select-helper-label">View</InputLabel>
      <Select
        labelId="demo-simple-select-helper-label"
        id="demo-simple-select-helper"
        label="View"
        value={filters[0].id}
      >
        {filters.map((filter) => (
          <MenuItem key={filter.id} value={filter.id}>
            {filter.title}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText>
        Select view to display data - it`s just demo
      </FormHelperText>
    </FormControl>
  );
}
