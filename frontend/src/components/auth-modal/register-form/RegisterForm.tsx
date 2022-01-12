import React, { BaseSyntheticEvent, useState } from "react";
import BasicTextField from "../../basics/basic-text-field/BasicTextField";
import BasicVisibilityInput from "../../basics/basic-visibility-input/BasicVisibilityInput";
import { Checkbox } from "@mui/material";
import {
  StyledInputContainer,
  StyledLoginButton,
  StyledButton,
  StyledCloseButton,
  StyledButtonContainer
} from "./StyledRegisterForm";

interface Props {
  toggleRegister: Function;
  toggleModal: Function;
}

function RegisterForm({ toggleRegister, toggleModal }: Props) {
  const register = (ev: BaseSyntheticEvent) => {
    ev.preventDefault();
    console.log("TRIGGER Register");
  };

  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [repeatPassword, setRepeatPassword] = useState<string>("");
  const [check, setCheck] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <form onSubmit={register}>
      <h3>Register</h3>
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
        <BasicTextField
          type="text"
          value={username}
          label="Username"
          placeholder="Name something unique ;)"
          handleChange={(ev: BaseSyntheticEvent) =>
            setUsername(ev.target.value)
          }
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
        <BasicVisibilityInput
          value={repeatPassword}
          variant="outlined"
          label="Repeat password"
          showText={showPassword}
          setShowText={setShowPassword}
          handleChange={(ev: BaseSyntheticEvent) =>
            setRepeatPassword(ev.target.value)
          }
          required
        />
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
      <StyledInputContainer>
        Already have an account?{" "}
        <StyledLoginButton onClick={() => toggleRegister()}>
          Log in here
        </StyledLoginButton>
      </StyledInputContainer>
      <StyledButtonContainer>
        <StyledButton type="submit" variant="contained">
          Register
        </StyledButton>
        <StyledCloseButton
          type="button"
          variant="contained"
          onClick={() => toggleModal()}
        >
          Cancel
        </StyledCloseButton>
      </StyledButtonContainer>
    </form>
  );
}

export default RegisterForm;
