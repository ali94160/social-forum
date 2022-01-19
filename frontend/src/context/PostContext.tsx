import React, { createContext, useContext, useState } from "react";
import { PostItem, UpdatePost } from "../interfaces/Post";

const PostContext = createContext<any>(null);

export const usePost = () => useContext(PostContext);

interface Props {
  children: any;
}

interface Id {
  id: string;
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

  const getPost = async (data: Id) => {
    console.log('what is id', data.id);
    const response: Response = await fetch('/api/posts/' + data.id);
    const body = await response.json();
    console.log('what is body', body)
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

  const updatePost = async (post: UpdatePost) => {
    const updatePost = {
      content: post.content,
      title: post.title,
      categoryId: post.categoryId
    }
    const response: Response = await fetch(`/api/posts/${post._id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(updatePost)
    });
    // const body = await response.json();
    // return { status: response.status, body }
    if (response.status === 200) {
      getPost({id: post._id});
    } else {
      return response.status;
    }
  }

  const values = {
    createPost,
    getPosts,
    posts,
    myPosts,
    getMyPosts,
    deletePost,
    getPost,
    updatePost
  };

  return <PostContext.Provider value={values}>{children}</PostContext.Provider>;
}

export default PostContextProvider;
