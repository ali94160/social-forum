import React, { createContext, useContext, useState } from "react";

const PostContext = createContext<any>(null);

export const usePost = () => useContext(PostContext);

interface Props {
  children: any;
}

interface Post {
  title: String;
  content: String;
  categoryId: String;
}

interface Id {
  id: String;
}

function PostContextProvider({ children }: Props) {

  const createPost = async (newPost: Post) => {
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
    console.log('what is id', id);
    const response: Response = await fetch('/api/posts/' + id);
    const body = await response.json();
    return { status: response.status, body }
  }

  const values = {
    createPost,
    getPost
  };

  return <PostContext.Provider value={values}>{children}</PostContext.Provider>;
}

export default PostContextProvider;
