import styled from 'styled-components';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';

export const StyledPost = styled(Card)`
&& {
    background-color: var(--yellow); 
    width: 100;
    max-height: fit-content;
    margin: 100px 40px;
    padding-bottom: 10px;
  }
`;

export const StyledGrid = styled(Grid)`
  && {
    margin: 3px 0 0 3px;
  }
`;

