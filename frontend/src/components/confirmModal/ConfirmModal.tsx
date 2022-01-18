import React from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import {
  StyledBox,
  StyledDeleteButton,
  StyledCancelButton,
  StyledBtnWrapper,
  StyledTitle,
  StyledText,
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
        <StyledTitle>Delete post</StyledTitle>
        <StyledText>
          NOTE: This will delete your post, content, comments and moderators
          permanently.
        </StyledText>
        <StyledBtnWrapper>
          <StyledDeleteButton onClick={handleDeletePost}>
            Yes
          </StyledDeleteButton>
          <StyledCancelButton onClick={() => setOpenModal(false)}>
            No
          </StyledCancelButton>
        </StyledBtnWrapper>
      </StyledBox>
    </Modal>
  );
}

export default ConfirmModal;
