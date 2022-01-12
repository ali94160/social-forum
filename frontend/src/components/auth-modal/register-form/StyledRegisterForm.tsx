import styled from "styled-components";

import { Box, Button } from "@mui/material";

export const StyledInputContainer = styled(Box)`
  margin: 4% 0%;
`;

export const StyledButton = styled(Button)`
  background: var(--dark-teal) !important;
  font-weight: bold !important;
`;

export const StyledLoginButton = styled(Button)`
  text-transform: none !important;
  color: var(--dark-teal) !important;
`;

export const StyledCloseButton = styled(Button)`
  background: grey !important;
  font-weight: bold !important;
`;

export const StyledButtonContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 2%;
`;
