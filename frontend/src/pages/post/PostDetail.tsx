import Post from "../../components/post/Post";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useComment } from "../../context/CommentContext";
import { usePost } from "../../context/PostContext";
import { CommentItem } from "../../interfaces/Comment";
import { PostItem } from "../../interfaces/Post";
import CommentSection from "../../components/commentSection/CommentSection";
import CommentList from "../../components/comment-list/CommentList";
import LoadingDetailedSkeleton from "../../components/skeleton/LoadingDetailedSkeleton";

function PostDetailPage() {
  // typescript doesnt recognize string nor undefined/null/empty object
  const { id } = useParams<string | any>();
  const { user } = useAuth();
  const { getPost } = usePost();
  const { getComments } = useComment();
  const [status, setStatus] = useState(0);
  const [post, setPost] = useState<PostItem | undefined>();
  const [comments, setComments] = useState<CommentItem[]>([]);

  useEffect(() => {
    handlePost();
  }, []);

  const handlePost = async () => {
    const res = await getPost(id);
    setStatus(res.status);
    if (res.status === 200) {
      setPost(res.body);
      handleComments();
    }
  };

  const handleComments = async () => {
    if (post) {
      const res = await getComments(post._id);
      if (res.status === 200) {
        setComments(res.body);
      }
    }
  }

  if (status === 0 || status === 401) {
    return <LoadingDetailedSkeleton />;
  } else if (status === 404) {
    // LÄGG TILL 404 SIDAAAAA
    return;
  }

  return (
    <div>
      <Post id={id} post={post} />
      {post && comments && comments.length > 0 ? (
        <CommentList
          comments={comments}
          ownerId={post.ownerId._id}
          moderators={post.moderatorsIds}
        />
      ) : (
        <p>There are nothing here O_Q</p>
      )}
      {user && (
        <CommentSection
          username={user.username}
          postId={id}
          updateComments={handleComments}
        />
      )}
    </div>
  );
}

export default PostDetailPage;
