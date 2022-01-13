import styled from "styled-components";
import { Toolbar, Typography } from "@mui/material";

import { AppBar, Button, Box } from "@mui/material";

export const StyledAppBar = styled(AppBar)`
  background: var(--dark-teal) !important;
`;

export const StyledButton = styled(Button)`
  color: var(--menu-text-color) !important;
  text-transform: capitalize !important;
`;

export const StyledTypography = styled(Typography)`
  padding-left: 1rem;
`;

export const StyledToolBar = styled(Toolbar)`
  margin: 0 !important;
  padding: 0 !important;
  width: 100vw;
  display: grid !important;
  grid-template-columns: auto auto 1fr;
`;
export const StyledBox = styled(Box)`
  flex-grow: 1;
`;
