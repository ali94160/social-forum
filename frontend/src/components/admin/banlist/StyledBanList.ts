import styled from 'styled-components';
import { Box, TableHead, Button, TableCell, Typography } from "@mui/material";

interface Props {
  isOpen?: boolean;
}

export const StyledBanlist = styled.div<Props>`
  background-color: ${(props) => (props.isOpen ? 'var(--dark-teal)' : "var(--dark-blue)")};
`;

export const StyledUnbanBtn = styled(Button)`
  && {
    background-color: var(--dark-yellow);
    color: black;
  }
`;

export const StyledTableHead = styled(TableHead)`
  && {
    background-color: var(--yellow);
  }
`;

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

export const StyledUnban = styled.div`

`;

export const StyledTableCell = styled(TableCell)`
  && {
    min-width: 5rem;
  }
`;

export const StyledSpan = styled.span`
  font-style: oblique;
`;


