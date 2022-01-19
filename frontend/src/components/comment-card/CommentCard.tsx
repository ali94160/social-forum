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
}

function CommentCard({ comment }: Props) {
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
        <RightGrid item xs={8} sm={9} lg={10}>
          <StyledComment>{comment.content}</StyledComment>
        </RightGrid>
        <Grid item xs={1}>
            {/* space for edit dots */}
        </Grid>
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
