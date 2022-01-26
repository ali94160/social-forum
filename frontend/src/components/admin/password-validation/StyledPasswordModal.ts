import styled from 'styled-components';
import { Box, Button, TableCell } from "@mui/material";

export const StyledInputContainer = styled(Box)`
  margin: 4% 0%;
`;

export const StyledCloseButton = styled(Button)`
  &&  {
    background: grey;
    font-weight: bold;
  }
`;

export const StyledButtonContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 2%;
`;

export const StyledErrorMsg = styled.div`
  --dark-text: #C72B1B;
`;