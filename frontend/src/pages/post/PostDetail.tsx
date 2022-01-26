import Post from "../../components/post/Post";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useComment } from "../../context/CommentContext";
import { usePost } from "../../context/PostContext";
import CommentSection from "../../components/commentSection/CommentSection";
import CommentList from "../../components/comment-list/CommentList";
import LoadingDetailedSkeleton from "../../components/skeleton/LoadingDetailedSkeleton";
import { StyledButton, StyledBtnWrapper, StyledText } from "./StyledPostDetail";
import ConfirmModal from "../../components/confirm-modal/ConfirmModal";
import { useUser } from "../../context/UserContext";
import { useHistory } from "react-router-dom";

const modalToConfirmAdminText =
  " NOTE: This will delete the post, content, comments and moderators permanently.";

function PostDetailPage() {
  // typescript doesnt recognize string nor undefined/null/empty object
  const { isAdmin } = useUser();
  const history = useHistory();
  const { id } = useParams<string | any>();
  const { user } = useAuth();
  const { getPost, post, deletePost } = usePost();
  const { getComments } = useComment();
  const [status, setStatus] = useState(0);
  const [imAdmin, setImAdmin] = useState(false);
  const [openConfirmModal, setOpenConfirmModal] = useState(false);

  useEffect(() => {
    handleAdmin();
    handlePost();
  }, []);

  useEffect(() => {
    handleComments();
  }, [post]);

  const handleAdmin = async () => {
    setImAdmin(await isAdmin());
  };

  const handlePost = async () => {
    const res = await getPost(id);
    setStatus(res.status);
  };

  const handleComments = async () => {
    if (post && post._id && post._id === id) {
      await getComments(post._id, "desc");
    }
  };

  if (status === 0 || status === 401) {
    return <LoadingDetailedSkeleton />;
  } else if (status === 404) {
    // LÄGG TILL 404 SIDAAAAA
    return;
  }

  const handleDeletePost = async () => {
    await deletePost(post._id, true);
    setOpenConfirmModal(false);
    history.push("/");
  };

  const renderDeletePostAsAdmin = () => (
    <StyledBtnWrapper onClick={() => setOpenConfirmModal(true)}>
      <StyledButton>Delete post</StyledButton>
    </StyledBtnWrapper>
  );

  return (
    <div>
      {imAdmin && renderDeletePostAsAdmin()}
      <Post post={post} me={user} />
      {post?.ownerId?._id ? (
        user ? (
          <CommentSection
            username={user.username}
            postId={id}
            handleComments={handleComments}
          />
        ) : (
          <StyledText>Login to comment</StyledText>
        )
      ) : (
        <StyledText>Comment section is unavailable for this post</StyledText>
      )}
      <CommentList
        ownerId={post?.ownerId?._id}
        moderators={post.moderatorsIds}
      />
      <ConfirmModal
        openModal={openConfirmModal}
        setOpenModal={setOpenConfirmModal}
        handleDeletePost={handleDeletePost}
        text={modalToConfirmAdminText}
      />
    </div>
  );
}

export default PostDetailPage;
