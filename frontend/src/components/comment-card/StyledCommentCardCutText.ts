import styled from "styled-components";
import { Card, Grid } from "@mui/material";

export const StyledCard = styled(Card)`
  && {
    background-color: var(--dark-blue);
    width: 90%;
    height: fit-content;
    min-height: 10vh;
    margin: 2vh auto;
  }
`;

export const StyledContainer = styled(Grid)`
  padding: 1%;
`;

export const AvatarContainer = styled.div`
  margin: 0.5rem 2rem;
  float: left;
`;

export const TopGrid = styled(Grid)`
  /* background-color: pink; */
  height: 100%;
  margin: 1% 2%;
`;

export const StyledName = styled.p`
  text-align: center;
  margin-top: 10%;
  width: 100%;
  height: 100%;
`;

export const StyledDate = styled.div`
  text-align: right;
  width: 100%;
  height: 100%;
`;

export const StyledComment = styled.span`
  overflow-wrap: break-word;
  word-wrap: break-word;
  hyphens: auto;
  height: 100%;
`;
