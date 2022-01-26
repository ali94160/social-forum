import React, { createContext, useContext, useState } from "react";
import { PostItem, UpdatePost } from "../interfaces/Post";

const PostContext = createContext<any>(null);

export const usePost = () => useContext(PostContext);

interface Props {
  children: any;
}

function PostContextProvider({ children }: Props) {
  const [posts, setPosts] = useState<null | PostItem[]>(null);
  const [myPosts, setMyPosts] = useState<null | PostItem[]>(null);
  const [post, setPost] = useState<null | PostItem>(null);

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

  const getPost = async (id: string) => {
    const response: Response = await fetch("/api/posts/" + id);
    try {
      const body = await response.json();
      if (response.status === 200) {
        setPost(body);
      }
    } catch (e) {
      setPost(null)
    }
    return response.status;
  }
    
  const getPosts = async (ascDate: boolean, ascTitle: boolean, categoryId?: string) => {
    let query = `/api/posts?createdDate=${ascDate ? "asc" : "desc"}&title=${ascTitle ? "asc" : "desc"}`;
    if (categoryId) {
      query = `${query}&categoryId=${categoryId}`;
    }
    const response: Response = await fetch(query);
    try {
      const result = await response.json();
      setPosts(result);
    } catch {
      setPosts([])
    }
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
    if (response.status === 200) {
      getPost(post._id);
    } else {
      return response.status;
    }
  }

  const updateModerators = async(postId: string, moderators: string[]) => {
    const res = await fetch(`/api/posts/${postId}/moderators`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(moderators),
    });

    return res.status === 200;
  }

  const values = {
    createPost,
    getPosts,
    posts,
    myPosts,
    getMyPosts,
    deletePost,
    getPost,
    updatePost,
    post,
    updateModerators,
  };

  return <PostContext.Provider value={values}>{children}</PostContext.Provider>;
}

export default PostContextProvider;
