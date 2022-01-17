import styled from "styled-components";
import { Toolbar, Typography } from "@mui/material";

import { AppBar, Button, Box } from "@mui/material";

interface buttonProps {
  justify?: string;
}

export const StyledAppBar = styled(AppBar)`
  && {
    background: var(--dark-teal);
  }
`;

export const StyledButton = styled(Button)<buttonProps>`
  && {
    color: var(--menu-text-color);
    text-transform: capitalize;
  }
  justify-self: ${(props) => (props.justify ? props.justify : "")};
`;

export const StyledTypography = styled(Typography)`
  padding-left: 1rem;
`;

export const StyledToolBar = styled(Toolbar)`
  && {
    margin: 0;
    padding: 0;
    display: grid;
  }
  width: 100vw;
  grid-template-columns: auto auto 1fr;
`;
export const StyledBox = styled(Box)`
  flex-grow: 1;
`;
