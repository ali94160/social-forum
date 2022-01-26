import Post from "../../components/post/Post";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useComment } from "../../context/CommentContext";
import { usePost } from "../../context/PostContext";
import CommentSection from "../../components/commentSection/CommentSection";
import CommentList from "../../components/comment-list/CommentList";
import LoadingDetailedSkeleton from "../../components/skeleton/LoadingDetailedSkeleton";
import { StyledText } from "./StyledPostDetail";

function PostDetailPage() {
  // typescript doesnt recognize string nor undefined/null/empty object
  const { id } = useParams<string | any>();
  const { user } = useAuth();
  const { getPost, post } = usePost();
  const { getComments } = useComment();
  const [status, setStatus] = useState(0);

  useEffect(() => {
    handlePost();
  }, []);

  useEffect(() => {
    handleComments();
  }, [post]);

  const handlePost = async () => {
    const res = await getPost(true, false, id);
    setStatus(res.status);
  };

  const handleComments = async () => {
    if (post && post._id) {
      await getComments(post._id);
    }
  };

  if (status === 0 || status === 401) {
    return <LoadingDetailedSkeleton />;
  } else if (status === 404) {
    // LÄGG TILL 404 SIDAAAAA
    return;
  }

  return (
    <div>
      <Post post={post} me={user} />
      {post?.ownerId?._id
        ? user 
          ? (<CommentSection
            username={user.username}
            postId={id}
            handleComments={handleComments}
          />)
          : <StyledText>Login to comment</StyledText>
        : <StyledText>Comment section is unavailable for this post</StyledText>}
      <CommentList
        ownerId={post?.ownerId?._id}
        moderators={post.moderatorsIds}
      />
    </div>
  );
}

export default PostDetailPage;
