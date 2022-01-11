import React from 'react'

import { Modal, Fade, Box, Typography, Backdrop } from "@mui/material";
import { useModal } from '../../context/ModalContext';
import LoginForm from './login-form/LoginForm';
import BasicModal from '../basic-modal/BasicModal';

function AuthModal() {
  const { isAuthOpen, toggleAuthModal } = useModal();

  return (
    <BasicModal isOpen={isAuthOpen} handleClose={toggleAuthModal}>
      <LoginForm />
    </BasicModal>
  );
}

export default AuthModal;
