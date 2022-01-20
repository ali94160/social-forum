import Post from "../../components/post/Post";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { usePost } from "../../context/PostContext";
import LoadingDetailedSkeleton from "../../components/skeleton/LoadingDetailedSkeleton";
import { PostItem } from "../../interfaces/Post";
import CommentSection from "../../components/commentSection/CommentSection";
import { useAuth } from "../../context/AuthContext";
import CommentList from "../../components/comment-list/CommentList";

function PostDetailPage() {
  // typescript doesnt recognize string nor undefined/null/empty object
  const { id } = useParams<string | any>();
  const { user } = useAuth();
  const { getPost, post } = usePost();
  const [status, setStatus] = useState(0);

  useEffect(() => {
    handlePost();
  }, []);

  useEffect(() => {
  }, [post])

  const handlePost = async () => {
    const res = await getPost(id);
    setStatus(res.status);
  }

  if (status === 0 || status === 401) {
    return <LoadingDetailedSkeleton />;
  } else if (status === 404) {
    // LÄGG TILL 404 SIDAAAAA
    return;
  }
  return (
    <div>
      <Post post={post} me={user} />
      {user && <CommentSection username={user.username} postId={id} />}
      {post?.comments && post?.comments.length > 0 ? (
        <CommentList
          comments={post.comments}
          ownerId={post.ownerId._id}
          moderators={post.moderatorsIds}
        />
      ) : (
        <p>There are nothing here O_Q</p>
      )}
    </div>
  );
}

export default PostDetailPage;
