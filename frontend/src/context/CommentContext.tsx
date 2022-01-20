import React, { createContext, useContext, useState } from "react";
import { CommentItem } from "../interfaces/Comment";

const CommentContext = createContext<any>(null);

export const useComment = () => useContext(CommentContext);

interface Props {
  children: any;
}

interface Comment {
  content: string;
  postId: string;
}


function CommentContextProvider({ children }: Props) {
  const [comments, setComments] = useState<CommentItem[]>([]);

  const addComment = async (comment: Comment) => {
    const res: Response = await fetch("/api/comments", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(comment),
    });

    return res.status === 200;
  }

  const getComments = async (postId: string) => {
    const response: Response = await fetch("/api/post/comments/" + postId);
    if (response.status === 200) {
      const body = await response.json();
      setComments(body);
      return response.status;
    }
    return response.status;
  }


  const values = {
    addComment,
    getComments,
    comments
  };

  return (
    <CommentContext.Provider value={values}>{children}</CommentContext.Provider>
  );
}

export default CommentContextProvider;
