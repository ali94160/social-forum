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

interface Post {
  post: {
    _id: string;
    title: string;
    content: string;
    categoryId: string;
    commentLength: number;
    createdDate: string;
    ownerId: {
      _id: string;
      username: string;
    };
  };
}

function PostCard({ post }: Post) {
  const renderAvatar = () => (
    <StyledAvatarWrapper>
      <StyledAvatar>
        {post.ownerId.username.charAt(0).toUpperCase()}
      </StyledAvatar>
      <StyledOwner>{post.ownerId.username}</StyledOwner>
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

  return (
    <StyledCardWrapper>
      {renderAvatar()}
      {renderContent()}
      {renderComment()}
    </StyledCardWrapper>
  );
}

export default PostCard;
