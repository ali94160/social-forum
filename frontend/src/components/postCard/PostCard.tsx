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
} from "./StyledPostCard";
import { PostObj } from "../../interfaces/Post";
import { useHistory } from 'react-router-dom';

function PostCard({ post }: PostObj) {
  const history = useHistory();

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
      <StyledCommentIcon />
      <StyledCommentLength>{post.commentLength}</StyledCommentLength>
    </StyledCommentWrapper>
  );

  const handleDetailPage = () => {
    console.log('im clicking', post._id)
    history.push(`/posts/${post._id}`);
  }

  return (
    <StyledCardWrapper onClick={handleDetailPage}>
      {renderAvatar()}
      {renderContent()}
      {renderComment()}
    </StyledCardWrapper>
  );
}

export default PostCard;
