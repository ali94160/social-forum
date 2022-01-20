import * as React from "react";
import { Fade, Backdrop } from "@mui/material";
import { StyledModal, StyledBox } from "./StyledBasicModal";

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
  p: 3,
};

export default function BasicModal({ children, isOpen, handleClose }: Props) {
  return (
    <StyledModal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={isOpen}
      onClose={(ev) => handleClose(ev)}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={isOpen}>
        <StyledBox sx={style}>{children}</StyledBox>
      </Fade>
    </StyledModal>
  );
}
