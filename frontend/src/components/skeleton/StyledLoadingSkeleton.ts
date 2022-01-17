import styled from "styled-components";
import Skeleton from "@mui/material/Skeleton";
import Stack from '@mui/material/Stack';

export const StyledSkeleton = styled(Skeleton)`
  margin: 2rem auto;
  &&& {
    width: 90%;
    height: 100px;
  }
`;

export const StyledStack = styled(Stack)`
  margin: 2rem auto;
  margin-left: 8rem;
`;
