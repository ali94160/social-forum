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
import { useAuth } from "../../../context/AuthContext";

interface Props {
  toggleRegister: Function;
  toggleModal: Function;
}

function LoginForm({ toggleRegister, toggleModal }: Props) {
  const { login, whoAmI,user } = useAuth();
  const submitLogin = async (ev: BaseSyntheticEvent) => {
    ev.preventDefault();
    const isSucceed = await login({ email, password });
    if (isSucceed) {
      whoAmI()
      toggleModal()
      return;
      
    }
    setShowErrorMessage(true);
  };

  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showErrorMessage, setShowErrorMessage] = useState<boolean>(false);

  return (
    <StyledForm onSubmit={submitLogin}>
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
      {showErrorMessage && (
        <StyledInputContainer>
          Bad credentials!
        </StyledInputContainer>
      )}
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
