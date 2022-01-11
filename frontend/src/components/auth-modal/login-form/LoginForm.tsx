import React, { BaseSyntheticEvent, useState } from "react";

import {
  InputAdornment,
  InputLabel,
  OutlinedInput,
  IconButton,
  Checkbox,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

import {
  StyledButton,
  StyledForm,
  StyledTextField,
  StyledFormControl,
  StyledInputContainer,
} from "./StyledLoginForm";
import BasicTextField from "../../basics/basic-text-field/BasicTextField";

const login = (ev: BaseSyntheticEvent) => {
  ev.preventDefault();
  console.log("TRIGGER LOGIN");
};

function LoginForm() {
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [check, setCheck] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <StyledForm onSubmit={login}>
      <h3>Log in</h3>
      <StyledInputContainer>
        <BasicTextField
          type="email"
          value={email}
          label="E-mail"
          placeholder="123@email.com"
          handleChange={(ev) => setEmail(ev.target.value)}
          required
        />
      </StyledInputContainer>
      <StyledInputContainer>
        <StyledFormControl variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">
            Password
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(ev) => setPassword(ev.target.value)}
            required
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </StyledFormControl>
      </StyledInputContainer>
      <StyledInputContainer>
        <Checkbox
          checked={check}
          onChange={() => setCheck(!check)}
          inputProps={{ "aria-label": "controlled" }}
          required
          sx={{
            color: "var(--dark-teal)",
            "&.Mui-checked": {
              color: "var(--dark-teal)",
            },
          }}
        />
        Accept user conditions
      </StyledInputContainer>
      <StyledButton type="submit" variant="contained">
        Log in
      </StyledButton>
    </StyledForm>
  );
}

export default LoginForm;
