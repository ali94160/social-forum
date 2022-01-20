import React from "react";

import { StyledTextField } from "./StyledBasicTextField";

interface Props {
  maxRows?: number | string;
  minRows?: number | string;
  multiline?: boolean | false;
  label?: string;
  placeholder?: string | "";
  rows?: number | string;
  required?: boolean | false;
  type?: string | "text";
  value?: any;
  handleChange: Function;
  defaultValue?: string;
  fullWidth?: boolean;
  inputProps?: object;
}

function BasicTextField({
  maxRows,
  minRows,
  multiline,
  type,
  placeholder,
  label,
  value,
  rows,
  required,
  handleChange,
  defaultValue,
  fullWidth,
  inputProps
}: Props) {
  return (
    <StyledTextField
      multiline={multiline}
      type={type}
      value={value}
      label={label}
      placeholder={placeholder}
      onChange={(ev) => handleChange(ev)}
      rows={rows}
      maxRows={maxRows}
      minRows={minRows}
      required={required}
      defaultValue={defaultValue}
      fullWidth={fullWidth}
      inputProps={inputProps}
    />
  );
}

export default BasicTextField;
