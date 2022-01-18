import React, { useEffect } from "react";
import { usePost } from "../../context/PostContext";
import PostCard from "../../components/post-card/PostCard";
import LoadingSkeleton from "../../components/skeleton/LoadingSkeleton";
import { PostItem } from "../../interfaces/Post";

function Home() {
  const { getPosts, posts } = usePost();

  useEffect(() => {
    getPosts(true, false);
  }, []);

  return (
    <div>
      {posts ? (
        posts.map((post: PostItem) => <PostCard key={post._id} post={post} />)
      ) : (
        <LoadingSkeleton />
      )}
    </div>
  );
}

export default Home;
