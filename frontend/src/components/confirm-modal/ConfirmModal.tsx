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
  text?: string;
}

function ConfirmModal({
  openModal,
  setOpenModal,
  handleDeletePost,
  text,
}: Props) {
  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);

  const handleText = () => {
    const defaultText =
      " NOTE: This will delete your post, content, comments and moderators permanently.";

    return text ? text : defaultText;
  };

  return (
    <Modal
      open={openModal}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <StyledBox>
        <StyledTitle>Delete post</StyledTitle>
        <StyledText>{handleText()}</StyledText>
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