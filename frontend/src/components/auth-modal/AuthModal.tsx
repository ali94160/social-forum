import React from 'react'

import { Modal, Fade, Box, Typography, Backdrop } from "@mui/material";
import { useModal } from '../../context/ModalContext';

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function AuthModal() {
  const { isAuthOpen, toggleAuthModal } = useModal();

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={isAuthOpen}
      onClose={toggleAuthModal}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={isAuthOpen}>
        <Box sx={style}>
          <Typography id="transition-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="transition-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </Box>
      </Fade>
    </Modal>
  );
}

export default AuthModal;
