import Post from '../../components/post/Post';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { usePost } from '../../context/PostContext';
import LoadingDetailedSkeleton from '../../components/skeleton/LoadingDetailedSkeleton';
import { PostItem } from '../../interfaces/Post';

function PostDetailPage() {
  const id = useParams();
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
      <Post post={post} />
      
    </div>
  )
}

export default PostDetailPage
