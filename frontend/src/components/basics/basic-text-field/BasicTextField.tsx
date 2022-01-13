import React from "react";

import { StyledTextField } from "./StyledBasicTextField";

interface Props {
  maxRows?: number | string;
  multiline?: boolean | false;
  label?: string;
  placeholder?: string | "";
  rows?: number | string;
  required?: boolean | false;
  type?: string | "text";
  value?: any;
  handleChange: Function;
}

function BasicTextField({
  maxRows,
  multiline,
  type,
  placeholder,
  label,
  value,
  rows,
  required,
  handleChange,
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
      required={required}
    />
  );
}

export default BasicTextField;
