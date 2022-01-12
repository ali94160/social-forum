import React, { useState } from "react";

import { Modal, Fade, Box, Typography, Backdrop } from "@mui/material";
import { useModal } from "../../context/ModalContext";
import LoginForm from "./login-form/LoginForm";
import BasicModal from "../basics/basic-modal/BasicModal";
import RegisterForm from "./register-form/RegisterForm";

function AuthModal() {
  const { isAuthOpen, toggleAuthModal } = useModal();
  const [showRegister, setShowRegister] = useState<boolean>(false);
  const toggleRegister = () => setShowRegister(!showRegister);

  const handleClose = () => {
    toggleAuthModal()
    setShowRegister(false);
  }

  return (
    <BasicModal isOpen={isAuthOpen} handleClose={handleClose}>
      {showRegister ? (
        <RegisterForm toggleRegister={toggleRegister} toggleModal={toggleAuthModal}/>
      ) : (
        <LoginForm toggleRegister={toggleRegister} toggleModal={toggleAuthModal}/>
      )}
    </BasicModal>
  );
}

export default AuthModal;
