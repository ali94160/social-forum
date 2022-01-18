import React, { createContext, useContext, useState } from "react";
import { PostItem } from "../interfaces/Post";

const PostContext = createContext<any>(null);

export const usePost = () => useContext(PostContext);

interface Props {
  children: any;
}

interface Id {
  id: String;
}

function PostContextProvider({ children }: Props) {
  const [posts, setPosts] = useState<null | PostItem[]>(null);
  const [myPosts, setMyPosts] = useState<null | PostItem[]>(null);

  const createPost = async (newPost: PostItem) => {
    const response: Response = await fetch("/api/user/posts", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newPost),
    });

    return response.status === 200;
  };

  const getPost = async ({id}: Id) => {
    const response: Response = await fetch('/api/posts/' + id);
    const body = await response.json();
    return { status: response.status, body }
  }
    
  const getPosts = async (ascDate: boolean, ascTitle: boolean) => {
    const response: Response = await fetch(
      `/api/posts?createdDate=${ascDate ? "asc" : "desc"}&title=${
        ascTitle ? "asc" : "desc"
      }`
    );
    const result = await response.json();
    setPosts(result);
    return response.status === 200;
  };

  const getMyPosts = async () => {
    const response: Response = await fetch("/api/user/posts");
    const result = await response.json();
    setMyPosts(result);
    return response.status === 200;
  };

  const deletePost = async (postId: string) => {
    const response: Response = await fetch(`/api/posts/${postId}`, {
      method: "DELETE",
    });
    if (response.status === 200) {
      getMyPosts();
    }
    return response.status === 200;
  };

  const values = {
    createPost,
    getPosts,
    posts,
    myPosts,
    getMyPosts,
    deletePost,
    getPost
  };

  return <PostContext.Provider value={values}>{children}</PostContext.Provider>;
}

export default PostContextProvider;
