import * as React from "react";
import { Modal, Fade, Box, Typography, Backdrop } from "@mui/material";

type Props = {
  isOpen: boolean;
  handleClose: Function;
  children?: JSX.Element | JSX.Element[];
};

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  minWidth: 330,
  minHeight: 180,
  bgcolor: "background.paper",
  boxShadow: 4,
  outline: "none",
  p: 4,
};

export default function BasicModal({ children, isOpen, handleClose }: Props) {
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={isOpen}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={isOpen}>
          <Box sx={style}>{children}</Box>
        </Fade>
      </Modal>
    </div>
  );
}
