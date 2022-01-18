import Post from '../../components/post/Post';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { usePost } from '../../context/PostContext';
import LoadingDetailedSkeleton from '../../components/skeleton/LoadingDetailedSkeleton';
import { PostBla } from '../../interfaces/Post';

function PostDetailPage() {
  const id = useParams();
  const { getPost } = usePost();
  const [status, setStatus] = useState(0);
  const [post, setPost] = useState<PostBla | undefined>();

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
      
    </div>
  )
}

export default PostDetailPage
