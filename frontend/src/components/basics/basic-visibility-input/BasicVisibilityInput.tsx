import React from "react";

import {
  InputAdornment,
  InputLabel,
  OutlinedInput,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { StyledFormControl } from './StyledBasicVisibilityInput'

interface Props {
  type?: string | "text";
  placeholder?: string | "";
  required?: boolean | false;
  label?: string;
  value?: any;
  variant?: "outlined" | "standard" | "filled";
  handleChange: Function;
  showText?: boolean;
  setShowText: Function;
}

function BasicVisibilityInput({
  type,
  label,
  value,
  variant,
  required,
  handleChange,
  showText,
  setShowText,
}: Props) {
  return (
    <StyledFormControl variant={variant}>
      <InputLabel htmlFor="outlined-adornment-password">{label + (required ? " *" : "")}</InputLabel>
      <OutlinedInput
        type={showText ? type : "password"}
        value={value}
        onChange={(ev) => handleChange(ev)}
        required={required}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={() => setShowText(!showText)}
              edge="end"
            >
              {showText ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
        label="Password"
      />
    </StyledFormControl>
  );
}

export default BasicVisibilityInput;
