import styled from "styled-components";

import { Box, List, ListItem, Typography, Drawer } from "@mui/material";

export const StyledDrawerContainer = styled.div`
  background: var(--dark-teal);
  opacity: 0.95;
  width: 20vw;
  min-width: 200;
  box-sizing: border-box;
  height: 100%;
`;

export const StyledDrawer = styled(Drawer)`
  box-shadow: 60px -16px teal;
`;

export const StyledBox = styled(Box)`
  overflow: "auto";
`;

export const StyledText = styled(Typography)`
  && {
    color: white;
    font-weight: normal;
    padding-left: 10px;
  }
`;
