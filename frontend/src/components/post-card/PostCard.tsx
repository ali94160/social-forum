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
import { PostItem } from "../../interfaces/Post";
import { useHistory } from "react-router-dom";
import EditDotsPost from "../edit-dots-post/EditDotsPost";

interface Props {
  post: PostItem;
  isInMyPostPage?: boolean | false;
}

function PostCard({ post, isInMyPostPage }: Props) {
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
    <StyledContentWrapper onClick={handleDetailPage}>
      <StyledTitle>{post.title}</StyledTitle>
      <StyledContent>{post.content}</StyledContent>
    </StyledContentWrapper>
  );

  const renderComment = () => (
    <StyledCommentWrapper>
      {isInMyPostPage && (
        <EditDotsPost postId={post._id} moderators={post.moderatorsIds} />
      )}
      <StyledCommentSection>
        <StyledCommentIcon />
        <StyledCommentLength>{post.commentLength}</StyledCommentLength>
      </StyledCommentSection>
    </StyledCommentWrapper>
  );

  const handleDetailPage = () => {
    history.push(`/posts/${post._id}`);
  };

  return (
    <StyledCardWrapper>
      {renderAvatar()}
      {renderContent()}
      {renderComment()}
    </StyledCardWrapper>
  );
}

export default PostCard;
