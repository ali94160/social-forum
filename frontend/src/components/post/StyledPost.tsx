import styled from 'styled-components';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import OutlinedInput from '@mui/material/OutlinedInput';

export const StyledPost = styled(Card)`
&& {
    background-color: var(--yellow); 
    width: 100;
    max-height: fit-content;
    margin: 20px 40px;
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

export const StyledOutlinedInput = styled(OutlinedInput)`
  width: 400px;
`;


