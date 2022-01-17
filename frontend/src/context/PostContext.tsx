import React, { createContext, useContext, useState } from "react";
import { PostItem } from '../interfaces/Post';

const PostContext = createContext<any>(null);

export const usePost = () => useContext(PostContext);

interface Props {
  children: any;
}

function PostContextProvider({ children }: Props) {
  const [posts, setPosts] = useState<null | PostItem[]>(null);

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

  const values = { createPost, getPosts, posts };

  return <PostContext.Provider value={values}>{children}</PostContext.Provider>;
}

export default PostContextProvider;
