import styled from "styled-components";
import Box from "@mui/material/Box";

export const StyledBox = styled(Box)`
  && {
    position: absolute;
    top: 50%;
    left: 50%;
    padding: 2rem;
    transform: translate(-50%, -50%);
    width: 400;
    background: white;
  }
`;

export const StyledTitle = styled.p`
  font-weight: bold;
  font-size: 1.5rem;
  margin: 0;
  padding: 0;
`;

export const StyledBtnWrapper = styled.div`
  margin-top: 1rem;
  display: flex;
  gap: 0.5rem;
  width: 100%;
`;

export const StyledDeleteButton = styled.button`
  width: 45%;
  border: none;
  border-radius: 3px;
  background: red;
  color: white;
  padding: 1rem;
  text-decoration: none;
  outline: none;
  font-size: 1.3rem;
`;

export const StyledCancelButton = styled.button`
  width: 45%;
  border: none;
  border-radius: 3px;
  background: lightgrey;
  color: black;
  padding: 1rem;
  text-decoration: none;
  outline: none;
  font-size: 1.3rem;
`;
