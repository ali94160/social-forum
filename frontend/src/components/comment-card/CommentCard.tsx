import React from "react";
import { Grid } from "@mui/material";
import { CommentItem } from "../../interfaces/Comment";
import {
  StyledCard,
  LeftGrid,
  RightGrid,
  StyledName,
  StyledRole,
  StyledDate,
  StyledComment,
} from "./StyledCommentCard";
import BasicAvatar from "../basics/basic-avatar/BasicAvatar";
import { trimString } from "../../utils/helper-methods";
import { User } from "../../interfaces/User";

interface Props {
  comment: CommentItem;
  ownerId: string;
  moderators: User[];
}

function CommentCard({ comment, ownerId, moderators }: Props) {
  const created = new Date(comment.createdDate);
  const date = created.toLocaleDateString();
  const time = created.toLocaleTimeString().substring(0, 5);
  const isOwner = comment.writerId._id === ownerId;
  let isModerator = false;
  if (!isOwner) {
    isModerator = moderators.some(moderator => moderator._id === comment.writerId._id);
  }

  const getRole = () => {
    if (isOwner)
      return "Post-owner"
    
    if (isModerator)
      return "Post-moderator"
    
    return "User";
  }

  const getUsername = () => {
    return comment?.writerId?.username
      ? trimString(comment.writerId.username, 8)
      : "Null user";
  };

  return (
    <StyledCard>
      <Grid container>
        <LeftGrid item xs={3} sm={2} lg={1}>
          <BasicAvatar username={comment?.writerId?.username} />
          <StyledName>
            {getUsername()}
            <StyledRole>{getRole()}</StyledRole>
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
