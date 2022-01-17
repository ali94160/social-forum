import styled from "styled-components";
import Skeleton from "@mui/material/Skeleton";

export const StyledSkeleton = styled(Skeleton)`
  margin: 2rem auto;
  &&& {
    width: 90%;
    height: 100px;
  }
`;
