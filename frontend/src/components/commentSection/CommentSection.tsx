import React, { useState } from "react";
import {
  StyledWrapper,
  StyledCommentField,
  StyledBtn,
  StyledAvatar,
} from "./StyledCommentSection";
import { useComment } from "../../context/CommentContext";

interface Props {
  username: string;
  postId: string;
  updateComments: Function;
}

function CommentSection({ username, postId, updateComments }: Props) {
  const [comment, setComment] = useState("");
  const { addComment } = useComment();

  const handleAddComment = async () => {
    const trimComment = comment.trim();
    if (!trimComment) return;
    const newComment = {
      content: trimComment,
      postId: postId,
    };
    addComment(newComment);
    setComment("");
    await updateComments();
    window.scrollTo(0, document.body.scrollHeight);
  };

  return (
    <StyledWrapper>
      <StyledAvatar>{username.charAt(0).toUpperCase()}</StyledAvatar>
      <StyledCommentField
        id="outlined-multiline-flexible"
        multiline
        maxRows={4}
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Type something here.."
      />
      {comment && <StyledBtn onClick={handleAddComment}>Send</StyledBtn>}
    </StyledWrapper>
  );
}

export default CommentSection;
