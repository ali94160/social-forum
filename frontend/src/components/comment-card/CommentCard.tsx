import React from "react";
import { Grid } from "@mui/material";
import { CommentItem } from "../../interfaces/Comment";
import {
  StyledCard,
  LeftGrid,
  RightGrid,
  StyledName,
  StyledDate,
  StyledComment,
} from "./StyledCommentCard";
import BasicAvatar from "../basics/basic-avatar/BasicAvatar";
import { trimString } from "../../utils/helper-methods";

interface Props {
  comment: CommentItem;
  isMyPost?: boolean;
}

function CommentCard({ comment, isMyPost }: Props) {
  console.log(comment.createdDate);

  const created = new Date(comment.createdDate);
  const date = created.toLocaleDateString();
  const time = created.toLocaleTimeString().substring(0, 5);
  return (
    <StyledCard>
      <Grid container>
        <LeftGrid item xs={3} sm={2} lg={1}>
          <BasicAvatar username={comment?.writerId?.username} />
          <StyledName>
            {comment?.writerId?.username
              ? trimString(comment.writerId.username, 8)
              : "Null user"}
          </StyledName>
        </LeftGrid>
        <RightGrid item xs={9} sm={10} lg={11}>
          <StyledComment>{comment.content}</StyledComment>
        </RightGrid>
        <Grid container>
          <StyledDate>
            {date} {time}
          </StyledDate>
        </Grid>
      </Grid>
    </StyledCard>
  );
}

export default CommentCard;
