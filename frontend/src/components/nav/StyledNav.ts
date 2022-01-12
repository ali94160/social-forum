import styled from "styled-components"

import { AppBar, Button, Box } from "@mui/material";

export const StyledAppBar = styled(AppBar)`
  background: var(--dark-teal) !important;
`;

export const StyledButton = styled(Button)`
  color: var(--menu-text-color) !important;
  text-transform: capitalize !important;
`;

export const StyledBox = styled(Box)`
  flex-grow: 1;
`;