import React from 'react'

import {Box,InputLabel, MenuItem, FormControl } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Category } from '../../interfaces/Category';

interface Props {
  value: string;
  handleChange: Function;
  options: Category[];
  label?: string;
}

function CategorySelect({ value, label, handleChange, options }: Props) {
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
          {options?.length > 0 &&
            options.map((option) => (
              <MenuItem key={"option-" + option._id} value={option._id}>
                {option.title}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
    </Box>
  );
}

export default CategorySelect
