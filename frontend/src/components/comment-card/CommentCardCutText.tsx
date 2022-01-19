import React from "react";
import { Grid } from "@mui/material";
import { CommentItem } from "../../interfaces/Comment";
import {
  StyledCard,
  StyledContainer,
  AvatarContainer,
  TopGrid,
  StyledName,
  StyledDate,
  StyledComment,
} from "./StyledCommentCardCutText";
import BasicAvatar from "../basics/basic-avatar/BasicAvatar";

interface Props {
  comment: CommentItem;
  isMyPost?: boolean;
}

function CommentCardCutText({ comment, isMyPost }: Props) {
  console.log(comment.createdDate);

  const created = new Date(comment.createdDate);
  const date = created.toLocaleDateString();
  const time = created.toLocaleTimeString().substring(0, 5);
  return (
    <StyledCard>
      <StyledContainer container>
        <TopGrid>
          <AvatarContainer>
            <BasicAvatar username={comment?.writerId?.username} />
            <StyledName>
              {comment?.writerId?.username
                ? trimString(comment.writerId.username, 8)
                : "Null user"}
            </StyledName>
          </AvatarContainer>
          <StyledComment>{comment.content}</StyledComment>
        </TopGrid>
        <Grid container>
          <StyledDate>
            {date} {time}
          </StyledDate>
        </Grid>
      </StyledContainer>
    </StyledCard>
  );
}

export default CommentCardCutText;
