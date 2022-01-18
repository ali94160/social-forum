import styled from "styled-components";
import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";

export const StyledWrapper = styled.div`
  display: flex;
  gap: 1rem;
  width: 95%;
  margin: 0 auto;
`;

export const StyledCommentField = styled(TextField)`
  &&& {
    width: 100%;
    outline: none;
    background: white;
    border: none;
    text-decoration: none;
  }
`;

export const StyledBtn = styled.button`
  border: none;
  padding: 1rem;
  background: white;
  font-size: 1rem;
  text-transform: uppercase;
  letter-spacing: 3px;
  outline: none;
`;

export const StyledAvatar = styled(Avatar)`
  && {
    background: var(--light-teal);
    align-self: center;
  }
`;
