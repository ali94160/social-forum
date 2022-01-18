import {
  StyledCardWrapper,
  StyledAvatarWrapper,
  StyledAvatar,
  StyledOwner,
  StyledContentWrapper,
  StyledTitle,
  StyledContent,
  StyledCommentLength,
  StyledCommentWrapper,
  StyledCommentIcon,
  StyledDots,
  StyledCommentSection,
} from "./StyledPostCard";
import { PostObj } from "../../interfaces/Post";
import EditDots from "../edit-dots/EditDots";

function PostCard({ post, isInMyPostPage }: PostObj) {
  const renderAvatar = () => (
    <StyledAvatarWrapper>
      <StyledAvatar>
        {post?.ownerId?.username.charAt(0).toUpperCase()}
      </StyledAvatar>
      <StyledOwner>{post?.ownerId?.username}</StyledOwner>
    </StyledAvatarWrapper>
  );

  const renderContent = () => (
    <StyledContentWrapper>
      <StyledTitle>{post.title}</StyledTitle>
      <StyledContent>{post.content}</StyledContent>
    </StyledContentWrapper>
  );

  const renderComment = () => (
    <StyledCommentWrapper>
      {isInMyPostPage && <EditDots postId={post._id} />}
      <StyledCommentSection>
        <StyledCommentIcon />
        <StyledCommentLength>{post.commentLength}</StyledCommentLength>
      </StyledCommentSection>
    </StyledCommentWrapper>
  );

  return (
    <StyledCardWrapper>
      {renderAvatar()}
      {renderContent()}
      {renderComment()}
    </StyledCardWrapper>
  );
}

export default PostCard;
