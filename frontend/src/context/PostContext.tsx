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

  const values = { createPost };

  return <PostContext.Provider value={values}>{children}</PostContext.Provider>;
}

export default PostContextProvider;
