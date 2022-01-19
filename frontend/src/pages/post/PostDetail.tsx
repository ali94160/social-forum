import Post from '../../components/post/Post';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { usePost } from '../../context/PostContext';
import LoadingDetailedSkeleton from '../../components/skeleton/LoadingDetailedSkeleton';
import { PostItem } from '../../interfaces/Post';
import CommentList from '../../components/comment-list/CommentList';

function PostDetailPage() {
  const id = useParams();
  const { getPost } = usePost();
  const [status, setStatus] = useState(0);
  const [post, setPost] = useState<PostItem | undefined>();

  useEffect(() => {
    handlePost();
  }, []);

  const handlePost = async () => {
    const res = await getPost(id);
    setStatus(res.status);
    if (res.status === 200) {
      setPost(res.body);
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
      {post?.comments && post?.comments.length > 0
        ? <CommentList comments={post.comments}/>
        : <p>There are nothing here O_Q</p>
      }
    </div>
  )
}

export default PostDetailPage
