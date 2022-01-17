import styled from "styled-components";

import { Box, Button, TextField } from "@mui/material";

export const StyledInputContainer = styled(Box)`
  margin: 4% 0%;
`;

export const StyledCloseButton = styled(Button)`
  background: grey !important;
  font-weight: bold !important;
`;

export const StyledRegisterButton = styled(Button)`
  text-transform: none !important;
  color: var(--dark-teal) !important;
`;

export const StyledForm = styled.form`
`;

export const StyledTextField = styled(TextField)`
  width: 100%;
  `;

export const StyledButtonContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 2%;
`;


