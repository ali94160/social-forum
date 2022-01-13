import React from "react";

import { StyledTextField } from "./StyledBasicTextField"

interface Props {
  type?: string | "text";
  placeholder?: string | "";
  required?: boolean | false;
  label?: string;
  value?: any;
  handleChange: Function;
}

function BasicTextField({type, placeholder, label, value, required, handleChange}: Props) {
  return (
    <StyledTextField
      type={type}
      value={value}
      label={label}
      placeholder={placeholder}
      onChange={(ev) => handleChange(ev)}
      required = {required}
    />
  );
}

export default BasicTextField;
