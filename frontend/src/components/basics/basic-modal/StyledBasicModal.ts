import styled from "styled-components";

import { Box, Modal } from "@mui/material";

export const StyledModal = styled(Modal)``;

export const StyledBox = styled(Box)`
  border-radius: 10px;
  &&& {
    background-color: var(--yellow);
  }
`;
