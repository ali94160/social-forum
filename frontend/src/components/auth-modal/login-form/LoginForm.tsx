import React, { useState } from "react";

import {
  InputAdornment,
  InputLabel,
  OutlinedInput,
  IconButton,
  Button,
  Box,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

import {
  StyledForm,
  StyledTextField,
  StyledFormControl,
  StyledInputContainer,
} from "./StyledLoginForm";

const login = (ev) => {
  ev.preventDefault();
  console.log("TRIGGER LOGIN");
};

function LoginForm() {
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <StyledForm onSubmit={login}>
      <h3>Log in</h3>
      <StyledInputContainer>
        <StyledTextField
          type="email"
          value={email}
          label="E-mail"
          placeholder="123@email.com"
          onChange={(ev) => setEmail(ev.target.value)}
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
      <Button type="submit" variant="contained">
        Log in
      </Button>
    </StyledForm>
  );
}

export default LoginForm;
