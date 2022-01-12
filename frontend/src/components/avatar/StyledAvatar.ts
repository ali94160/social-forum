import styled from "styled-components";
import Avatar from "@mui/material/Avatar";

interface Props {
  justify?: string;
  margin?: string;
  backgroundColor?: string;
}

export const StyledAvatar = styled(Avatar)<Props>`
  justify-self: ${(props) => (props.justify ? props.justify : "")};
  margin: ${(props) => (props.margin ? props.margin : "")};
  background: ${(props) =>
    props.backgroundColor ? props.backgroundColor : ""} !important;
`;
