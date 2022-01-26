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
import EditDotsComment from "../edit-dots-comment/EditDotsComment";
import { trimString } from "../../utils/helper-methods";
import { User } from "../../interfaces/User";
import { useAuth } from "../../context/AuthContext";

interface Props {
  comment: CommentItem;
  ownerId: string;
  moderators: User[];
  hasDeleteAccess: boolean;
}

function CommentCard({ comment, ownerId, moderators, hasDeleteAccess }: Props) {
  const created = new Date(comment.createdDate);
  const date = created.toLocaleDateString();
  const time = created.toLocaleTimeString().substring(0, 5);
  const { user } = useAuth();

  const isCommentOwner = comment?.writerId?._id === user?._id;
  const showEdit = user && (isCommentOwner || hasDeleteAccess);
  
  const isPostOwner = comment?.writerId?._id === ownerId;
  let isPostModerator = false;
  if (!isPostOwner) {
    isPostModerator = moderators.some(
      (moderator) => moderator._id === comment?.writerId?._id
    );
  }

  const getRole = () => {
    if (isPostOwner) return "Post-owner";
    if (isPostModerator) return "Post-moderator";
    return "User";
  };

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
          {showEdit && (
            <EditDotsComment
              commentId={comment._id}
              isCommentOwner={isCommentOwner}
              hasDeleteAccess={hasDeleteAccess}
              postId={comment.postId}
            />
          )}
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
