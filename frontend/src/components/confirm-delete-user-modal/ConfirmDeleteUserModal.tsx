import React, { BaseSyntheticEvent, useState } from "react";
import { useAuth } from "../../context/AuthContext";

import BasicModal from "../basics/basic-modal/BasicModal";
import BasicVisibilityInput from "../basics/basic-visibility-input/BasicVisibilityInput";

import {
  StyledButton,
  StyledCloseButton,
  StyledForm,
  StyledInputContainer,
  StyledButtonContainer,
} from "./StyledConfirmDeleteUser";

type Props = {
  isConfirmDeleteModal: boolean;
  toggleConfirmDeleteModal: any;
  };

export default function ConfirmDeleteUserModal({ isConfirmDeleteModal, toggleConfirmDeleteModal }: Props) {
  const { verifyPassword } = useAuth();

  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showErrorMessage, setShowErrorMessage] = useState<boolean>(false);

  const submitConfirm = async (ev: BaseSyntheticEvent) => {
    ev.preventDefault();
    const res = await verifyPassword({password});
    console.log(res, 'true or false?')
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