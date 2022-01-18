import React from "react";
import { Grid } from "@mui/material";
import { CommentItem } from "../../interfaces/Comment";
import { StyledCard } from "./StyledCommentCard";
import { StyledAvatar } from "../post-card/StyledPostCard";
import BasicAvatar from "../basics/basic-avatar/BasicAvatar";
import { getFirstCap } from "../../utils/helper-methods";
import { StyledTitleGrid } from "../post/StyledPost";

interface Props {
  comment: CommentItem;
  isMyPost?: boolean;
}


function CommentCard({ comment, isMyPost }: Props) {
  return (
    <StyledCard>
      <Grid container>

      <Grid
        item
        xs={2}
        >
        <BasicAvatar username={comment.writerId.username} />
        <div>{comment.writerId.username}</div>
      </Grid>
      <Grid item xs={10}>
          {comment.content}
      </Grid>
        </Grid>
    </StyledCard>
  );
}

export default CommentCard;
