import styled from "styled-components";
import { Card, Grid } from "@mui/material";

export const StyledCard = styled(Card)`
  && {
    background-color: var(--dark-blue);
    width: 90%;
    height: fit-content;
    min-height: 10vh;
    margin: 2vh auto;
    padding-top: 1rem;
  }
`;

export const StyledAvatarContainer = styled.div`
  margin-top: calc(0.1% + 2px);
`;

export const LeftGrid = styled(Grid)`
  height: 100%;
  margin: 1%;
`;

export const RightGrid = styled(Grid)`
  height: 100%;
  margin: 1%;
`;

export const StyledName = styled.div`
  font-size: 1.2rem;
  text-align: center;
  margin-top: 10%;
  width: 100%;
  height: 100%;
`;

export const StyledRole = styled.div`
  font-size: 1rem;
  margin: 0 auto;
  opacity: 0.8;
`;

export const StyledDate = styled.div`
  text-align: right;
  width: 100%;
  height: 100%;
  margin: 2%;
`;

export const StyledComment = styled.div`
  overflow-wrap: break-word;
  word-wrap: break-word;
  hyphens: auto;
  height: 100%;
  margin-right: 1rem;
`;
