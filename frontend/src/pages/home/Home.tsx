import React, { useEffect } from "react";
import { usePost } from "../../context/PostContext";
import PostCard from "../../components/postCard/PostCard";
import LoadingSkeleton from "../../components/skeleton/LoadingSkeleton";

interface Post {
  _id: string;
  title: string;
  content: string;
  categoryId: string;
  commentLength: number;
  createdDate: string;
  ownerId: {
    _id: string;
    username: string;
  };
}

function Home() {
  const { getPosts, posts } = usePost();

  useEffect(() => {
    getPosts(true, false);
  }, []);

  return (
    <div>
      {posts ? (
        posts.map((post: Post) => <PostCard key={post._id} post={post} />)
      ) : (
        <LoadingSkeleton />
      )}
    </div>
  );
}

export default Home;
