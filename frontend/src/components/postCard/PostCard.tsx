interface Post {
  post: {
    _id: string;
    title: string;
    content: string;
    categoryId: string;
  };
}

function PostCard({ post }: Post) {
  return (
    <div>
      <h1>{post.title}</h1>
    </div>
  );
}

export default PostCard;
