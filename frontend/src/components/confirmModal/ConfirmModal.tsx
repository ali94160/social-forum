import React from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import {
  StyledBox,
  StyledDeleteButton,
  StyledCancelButton,
  StyledBtnWrapper,
  StyledTitle,
} from "./StyledConfirmModal";

interface Props {
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  handleDeletePost: () => void;
}

function ConfirmModal({ openModal, setOpenModal, handleDeletePost }: Props) {
  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);

  return (
    <Modal
      open={openModal}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <StyledBox>
        <StyledTitle>
          Are you sure you want to continue this process?
        </StyledTitle>
        <StyledBtnWrapper>
          <StyledCancelButton onClick={() => setOpenModal(false)}>
            No
          </StyledCancelButton>
          <StyledDeleteButton onClick={handleDeletePost}>
            Yes
          </StyledDeleteButton>
        </StyledBtnWrapper>
      </StyledBox>
    </Modal>
  );
}

export default ConfirmModal;
