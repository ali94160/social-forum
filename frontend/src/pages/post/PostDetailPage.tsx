import Post from '../../components/post/Post';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { usePost } from '../../context/PostContext';

function PostDetailPage() {
  const id = useParams();
  const { getPost } = usePost();
  const [status, setStatus] = useState(0);
  const [post, setPost] = useState({});

  useEffect(() => {
    handlePost();
  }, []);

  const handlePost = async () => {
    const res = await getPost(id);
    console.log('post', res.body)
    setStatus(res.status);
    setPost(res.body);
  }

  if (status === 0 || status === 404) {
    
  }



  return (
    <div>
      <Post id={id} post={post} />
      
    </div>
  )
}

export default PostDetailPage
