import React, { BaseSyntheticEvent, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useUser } from "../../context/UserContext";

import BasicModal from "../basics/basic-modal/BasicModal";
import BasicVisibilityInput from "../basics/basic-visibility-input/BasicVisibilityInput";

import {
  StyledButton,
  StyledCloseButton,
  StyledForm,
  StyledInputContainer,
  StyledButtonContainer,
  StyledErrorMsg,
  StyledSuccessMsg
} from "./StyledConfirmDeleteUser";

type Props = {
  isConfirmDeleteModal: boolean;
  toggleConfirmDeleteModal: any;
  };

export default function ConfirmDeleteUserModal({ isConfirmDeleteModal, toggleConfirmDeleteModal }: Props) {
  const { deleteSelf } = useUser();
  const { logout } = useAuth();

  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showErrorMessage, setShowErrorMessage] = useState<boolean>(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState<boolean>(false);

  const submitConfirm = async (ev: BaseSyntheticEvent) => {
    ev.preventDefault();
    const isSucceed = await deleteSelf({ password });
    if (!isSucceed) {
    setShowErrorMessage(true);
      return;
    }
    setShowErrorMessage(false);

    setShowSuccessMessage(true);

    setTimeout(() => {
      logout();
    }, 3000);
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
         <StyledErrorMsg>Wrong password!</StyledErrorMsg>
        </StyledInputContainer>
      )}

      {showSuccessMessage && (
        <StyledInputContainer>
         <StyledSuccessMsg>Successfully deleted user and all its data.
           <p>Logging out in 3 sec.</p></StyledSuccessMsg>
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