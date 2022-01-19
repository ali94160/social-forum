import { BaseSyntheticEvent } from "react";
import { getFirstCap } from "../../../utils/helper-methods";
import { StyledAvatar } from "./StyledBasicAvatar";

interface Props {
  username: string;
  backgroundColor?: string;
  color?: string;
}


function BasicAvatar({ username, backgroundColor, color }: Props) {
  return (
    <>
      <StyledAvatar backgroundcolor={backgroundColor} color={color} >
        {username && getFirstCap(username)}
      </StyledAvatar>
    </>
  );
}

export default BasicAvatar;
