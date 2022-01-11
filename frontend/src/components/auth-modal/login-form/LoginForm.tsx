import React, { BaseSyntheticEvent, useState } from "react";

import {
  Button,
  Checkbox,
} from "@mui/material";

import {
  StyledButton,
  StyledForm,
  StyledFormControl,
  StyledInputContainer,
} from "./StyledLoginForm";
import BasicTextField from "../../basics/basic-text-field/BasicTextField";
import BasicVisibilityInput from "../../basics/basic-visibility-input/BasicVisibilityInput";
import { useModal } from "../../../context/ModalContext";

const login = (ev: BaseSyntheticEvent) => {
  ev.preventDefault();
  console.log("TRIGGER LOGIN");
};

function LoginForm() {
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [check, setCheck] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const {toggleAuthModal} = useModal()

  return (
    <StyledForm onSubmit={login}>
      <h3>Log in</h3>
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
      <Button sx={{background: "grey"}} type="button" variant="contained" onClick={toggleAuthModal}>
        Cancel
      </Button>
    </StyledForm>
  );
}

export default LoginForm;
