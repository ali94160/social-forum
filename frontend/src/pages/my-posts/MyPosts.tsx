import React, { useEffect } from "react";
import { usePost } from "../../context/PostContext";
import PostCard from "../../components/post-card/PostCard";
import { PostItem } from "../../interfaces/Post";

function MyPosts() {
  const { myPosts, getMyPosts } = usePost();

  useEffect(() => {
    getMyPosts();
  }, []);


  return (
    <div>
      {myPosts &&
        myPosts.map((post: PostItem) => (
          <PostCard key={post._id} post={post} isInMyPostPage={true} />
        ))}
    </div>
  );
}

export default MyPosts;
