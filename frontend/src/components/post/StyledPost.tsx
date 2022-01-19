import styled from 'styled-components';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';

export const StyledPost = styled(Card)`
&& {
    background-color: var(--yellow); 
    width: 90%;
    max-height: fit-content;
    margin: 2rem auto;
    padding-bottom: 10px;
  }
`;

export const StyledGrid = styled(Grid)`
  && {
    margin: 3px 0 0 3px;
  }
`;

export const StyledLeftGrid = styled(Grid)`
  text-align: right;
  padding-right: 40px;
`;


export const StyledBottomGrid = styled(Grid)`
  && {
    margin-top: 30px;
    }
`;

export const StyledAvatarGrid = styled(Grid)`
  text-align: center;
`;

export const StyledTitleGrid = styled(Grid)`
  font-weight: 800;
  font-size: larger;
`;


