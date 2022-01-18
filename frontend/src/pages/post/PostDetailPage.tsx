import CommentCard from '../../components/comment-card/CommentCard';
import Post from '../../components/post/Post';

const mockData = {
  comments: [
    {
      
    }
  ]
}

function PostDetailPage() {
  return (
    <div>
      <Post />
      <CommentCard comment={}/>
    </div>
  )
}

export default PostDetailPage
