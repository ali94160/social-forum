import React, { useState } from "react";
import {
  StyledWrapper,
  StyledCommentField,
  StyledBtn,
  StyledAvatar,
} from "./StyledCommentSection";

function CommentSection() {
  const [comment, setComment] = useState("");
  const handleChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setComment(e.target.value);
  };
  return (
    <StyledWrapper>
      <StyledAvatar>H</StyledAvatar>
      <StyledCommentField
        id="outlined-multiline-flexible"
        multiline
        maxRows={4}
        value={comment}
        onChange={(e) => handleChange(e)}
      />
      <StyledBtn>Send</StyledBtn>
    </StyledWrapper>
  );
}

export default CommentSection;
