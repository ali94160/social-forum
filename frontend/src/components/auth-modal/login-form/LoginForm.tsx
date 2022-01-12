import React, { BaseSyntheticEvent, useState } from "react";

import { Button, Checkbox } from "@mui/material";

import {
  StyledButton,
  StyledCloseButton,
  StyledRegisterButton,
  StyledForm,
  StyledInputContainer,
  StyledButtonContainer,
} from "./StyledLoginForm";
import BasicTextField from "../../basics/basic-text-field/BasicTextField";
import BasicVisibilityInput from "../../basics/basic-visibility-input/BasicVisibilityInput";
import { useModal } from "../../../context/ModalContext";

interface Props {
  toggleRegister: Function;
  toggleModal: Function;
}

function LoginForm({ toggleRegister, toggleModal}: Props) {
  const login = (ev: BaseSyntheticEvent) => {
    ev.preventDefault();
    console.log("TRIGGER LOGIN");
  };

  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <StyledForm onSubmit={login}>
      <h3>Log in</h3>
      <small>* = required</small>
      <StyledInputContainer>
        <BasicTextField
          type="email"
          value={email}
          label="E-mail"
          placeholder="123@email.com"
          handleChange={(ev: BaseSyntheticEvent) => setEmail(ev.target.value)}
          required
        />
      </StyledInputContainer>
      <StyledInputContainer>
        <BasicVisibilityInput
          value={password}
          variant="outlined"
          label="Password"
          showText={showPassword}
          setShowText={setShowPassword}
          handleChange={(ev: BaseSyntheticEvent) =>
            setPassword(ev.target.value)
          }
          required
        />
      </StyledInputContainer>
      <StyledInputContainer>
        Don't have an account?{" "}
        <StyledRegisterButton onClick={() => toggleRegister()}>
          Register an account here
        </StyledRegisterButton>
      </StyledInputContainer>
      <StyledButtonContainer>
        <StyledButton type="submit" variant="contained">
          Log in
        </StyledButton>
        <StyledCloseButton
          type="button"
          variant="contained"
          onClick={() => toggleModal()}
        >
          Cancel
        </StyledCloseButton>
      </StyledButtonContainer>
    </StyledForm>
  );
}

export default LoginForm;
