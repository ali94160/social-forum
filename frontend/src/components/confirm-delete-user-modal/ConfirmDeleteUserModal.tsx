import React, { BaseSyntheticEvent, useState } from "react";

import BasicModal from "../basics/basic-modal/BasicModal";
import BasicTextField from "../basics/basic-text-field/BasicTextField";
import BasicVisibilityInput from "../basics/basic-visibility-input/BasicVisibilityInput";

import {
  StyledButton,
  StyledCloseButton,
  StyledRegisterButton,
  StyledForm,
  StyledInputContainer,
  StyledButtonContainer,
} from "./StyledConfirmDeleteUser";

type Props = {
  isConfirmDeleteModal: boolean;
  toggleConfirmDeleteModal: any;
  };

export default function ConfirmDeleteUserModal({ isConfirmDeleteModal, toggleConfirmDeleteModal }: Props) {
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showErrorMessage, setShowErrorMessage] = useState<boolean>(false);

  const submitConfirm = async (ev: BaseSyntheticEvent) => {
    ev.preventDefault();
    console.log('hey');
  };

  const handleCloseModal = () => {
    toggleConfirmDeleteModal();
    setPassword("");
  }

    return (
    <BasicModal isOpen={isConfirmDeleteModal} handleClose={handleCloseModal}>
      <h1>Delete user</h1>
      <p>NOTE: this will delete user and all its data.</p>
      <p>Enter your password to confirm</p>

      <StyledForm onSubmit={submitConfirm}>
      <small>* = required</small>
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
      {showErrorMessage && (
        <StyledInputContainer>
          Bad credentials!
        </StyledInputContainer>
      )}

      <StyledButtonContainer>
        <StyledButton type="submit" variant="contained">
          Delete user
        </StyledButton>
        <StyledCloseButton
          type="button"
          variant="contained"
          onClick={handleCloseModal}
        >
          Cancel
        </StyledCloseButton>
      </StyledButtonContainer>
      </StyledForm>


    </BasicModal>
    )
}