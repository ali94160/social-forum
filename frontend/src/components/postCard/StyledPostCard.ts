import styled from "styled-components";
import Avatar from "@mui/material/Avatar";
import ChatIcon from "@mui/icons-material/Chat";

export const StyledCardWrapper = styled.div`
  background: var(--light-teal);
  width: 90%;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  padding: 0.5rem;
  margin-bottom: 1rem;
`;

export const StyledAvatarWrapper = styled.div`
  align-self: center;
`;

export const StyledAvatar = styled(Avatar)`
  background: var(--dark-teal) !important;
`;

export const StyledOwner = styled.p`
  font-size: 1rem;
  margin: 0;
`;

export const StyledContentWrapper = styled.div``;

export const StyledTitle = styled.p`
  font-weight: bold;
  font-size: 1rem;
`;

export const StyledContent = styled.p`
  font-size: 1rem;
`;

export const StyledCommentWrapper = styled.div`
  justify-self: end;
  display: flex;
  gap: 0.4rem;
`;

export const StyledCommentIcon = styled(ChatIcon)`
  font-size: 1.2rem !important;
  align-self: end;
`;

export const StyledCommentLength = styled.p`
  margin: 0;
  font-size: 1rem;
  align-self: end;
`;
