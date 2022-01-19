import styled from "styled-components";
import Avatar from "@mui/material/Avatar";

interface Props {
  backgroundcolor?: string;
  color?: string;
}

export const StyledAvatar = styled(Avatar)<Props>`
  && {
    margin: 0 auto;
    justify-self: center;
    color: ${(props) => (props.color ? props.color : "white")};
    background: ${(props) =>
      props.color ? props.backgroundcolor : "var(--dark-teal)"};
  }
`;
