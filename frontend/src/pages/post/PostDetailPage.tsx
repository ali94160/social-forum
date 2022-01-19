import Post from '../../components/post/Post';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { usePost } from '../../context/PostContext';
import LoadingDetailedSkeleton from '../../components/skeleton/LoadingDetailedSkeleton';
import { useAuth } from '../../context/AuthContext';

function PostDetailPage() {
  const id = useParams();
  const { getPost, post } = usePost();
  const [status, setStatus] = useState(0);
  const { user } = useAuth();

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

  console.log('what is user', user)

  return (
    <div>
      <Post post={post} me={user} />
      
    </div>
  )
}

export default PostDetailPage
