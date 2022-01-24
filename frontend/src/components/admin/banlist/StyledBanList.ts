import styled from 'styled-components';
import Button from '@mui/material/Button';
import TableHead from '@mui/material/TableHead';

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

