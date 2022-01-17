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
  };
}

function PostCard({ post }: Post) {
  return (
    <StyledCardWrapper>
      <StyledAvatarWrapper>
        <StyledAvatar>A</StyledAvatar>
        <StyledOwner>Oscar</StyledOwner>
      </StyledAvatarWrapper>
      <StyledContentWrapper>
        <StyledTitle>{post.title}</StyledTitle>
        <StyledContent>{post.content}</StyledContent>
      </StyledContentWrapper>
      <StyledCommentWrapper>
        <StyledCommentIcon />
        <StyledCommentLength>100</StyledCommentLength>
      </StyledCommentWrapper>
    </StyledCardWrapper>
  );
}

export default PostCard;
