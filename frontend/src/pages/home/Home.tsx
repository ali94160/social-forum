import React, { useEffect } from "react";
import { usePost } from "../../context/PostContext";
import PostCard from '../../components/postCard/PostCard'

interface Post {
  _id: string;
  title: string;
  content: string;
  categoryId: string;
}

function Home() {
  const { getPosts, posts } = usePost();

  useEffect(() => {
    getPosts((a: any, b: any) => {
      return a.createdDate - b.createdDate;
    });
  }, []);

  return <div>{posts && 
    posts.map((post: Post) => <PostCard key={post._id} post={post}/>)
  }</div>;
}

export default Home;
