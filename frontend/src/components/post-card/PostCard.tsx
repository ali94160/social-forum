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
  StyledTrash,
} from "./StyledPostCard";
import { PostItem } from "../../interfaces/Post";
import { useHistory } from "react-router-dom";
import EditDotsPost from "../edit-dots-post/EditDotsPost";
import { useUser } from "../../context/UserContext";
import { useEffect, useState } from "react";
import ConfirmModal from "../confirm-modal/ConfirmModal";
import { usePost } from "../../context/PostContext";

const modalToConfirmAdminText =
  " NOTE: This will delete the post, content, comments and moderators permanently.";

interface Props {
  post: PostItem;
  isInMyPostPage?: boolean | false;
}

function PostCard({ post, isInMyPostPage }: Props) {
  const { deletePost } = usePost();
  const { isAdmin } = useUser();
  const history = useHistory();
  const [imAdmin, setImAdmin] = useState(false);
  const [openConfirmModal, setOpenConfirmModal] = useState(false);

  useEffect(() => {
    handleAdmin();
  }, []);

  const handleAdmin = async () => {
    setImAdmin(await isAdmin());
  };

  const handleDeletePost = async () => {
    await deletePost(post._id, true);
    setOpenConfirmModal(false);
  };

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
      {imAdmin && <StyledTrash onClick={() => setOpenConfirmModal(true)} />}
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
    <>
      <StyledCardWrapper>
        {renderAvatar()}
        {renderContent()}
        {renderComment()}
      </StyledCardWrapper>
      <ConfirmModal
        openModal={openConfirmModal}
        setOpenModal={setOpenConfirmModal}
        handleDeletePost={handleDeletePost}
        text={modalToConfirmAdminText}
      />
    </>
  );
}

export default PostCard;
