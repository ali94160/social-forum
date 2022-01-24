import styled from "styled-components";

import { Box, Button } from "@mui/material";

export const StyledInputContainer = styled(Box)`
  margin: 4% 0%;
`;

export const StyledLoginButton = styled(Button)`
  && {
    text-transform: none;
    color: var(--dark-teal);
  }
`;

export const StyledCloseButton = styled(Button)`
  && {
    background: grey;
    font-weight: bold;
  }
`;

export const StyledButtonContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 2%;
`;

export const StyledReadMore = styled.span`
  cursor: pointer;
  color: blue;
  text-decoration: underline;
`;