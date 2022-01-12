import React from "react";
import { StyledAvatar } from "./StyledAvatar";

interface Props {
  justify?: string;
  margin?: string;
  backgroundColor?: string;
}

function Avatar({ justify, margin, backgroundColor }: Props) {
  return (
    <StyledAvatar
      justify={justify}
      margin={margin}
      backgroundColor={backgroundColor}
    >
      A
    </StyledAvatar>
  );
}

export default Avatar;
