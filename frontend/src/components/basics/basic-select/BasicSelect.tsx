import React from 'react'

import {Box,InputLabel, MenuItem, FormControl } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';

interface Props {
  value: string;
  handleChange: Function;
  options: string[];
  label?: string;
}

function BasicSelect({value, label, handleChange, options }: Props) {
  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">{label}</InputLabel>
        <Select
          value={value ?? ""}
          label={label}
          onChange={(ev: SelectChangeEvent) =>
            handleChange(ev.target.value as string)
          }
        >
          {options && options.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}

export default BasicSelect
