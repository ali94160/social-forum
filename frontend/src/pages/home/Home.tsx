import React, { useEffect } from "react";
import { usePost } from "../../context/PostContext";
import PostCard from "../../components/post-card/PostCard";
import LoadingSkeleton from "../../components/skeleton/LoadingSkeleton";
import { PostItem } from "../../interfaces/Post";
import CommentSection from "../../components/commentSection/CommentSection";

function Home() {
  const { getPosts, posts } = usePost();

  useEffect(() => {
    getPosts(true, false);
  }, []);

  return (
    <div style={{ height: "90vh" }}>
      {posts ? (
        posts.map((post: PostItem) => <PostCard key={post._id} post={post} />)
      ) : (
        <LoadingSkeleton />
      )}
      <CommentSection></CommentSection>
    </div>
  );
}

export default Home;
