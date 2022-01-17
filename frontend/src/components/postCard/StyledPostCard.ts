import styled from "styled-components";
import Avatar from "@mui/material/Avatar";
import ChatIcon from "@mui/icons-material/Chat";

export const StyledCardWrapper = styled.div`
  background: var(--light-teal);
  width: 90%;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 20% 1fr 1fr;
  padding: 0.5rem;
  margin-bottom: 1rem;
`;

export const StyledAvatarWrapper = styled.div`
  align-self: center;
  text-align: center;
  margin-right: 4.5rem;
  display: grid;
`;

export const StyledAvatar = styled(Avatar)`
  &&& {
    background: var(--dark-teal);
    margin: 0;
    justify-self: center;
  }
`;

export const StyledOwner = styled.p`
  font-size: 1rem;
  margin: 0;
`;

export const StyledContentWrapper = styled.div``;

export const StyledTitle = styled.p`
  max-width: 50vw;
  font-weight: bold;
  font-size: 1rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const StyledContent = styled.p`
  max-width: 50vw;
  font-size: 1rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const StyledCommentWrapper = styled.div`
  justify-self: end;
  display: flex;
  gap: 0.4rem;
`;

export const StyledCommentIcon = styled(ChatIcon)`
  align-self: end;
  &&& {
    font-size: 1.2rem;
  }
`;

export const StyledCommentLength = styled.p`
  margin: 0;
  font-size: 1rem;
  align-self: end;
`;
