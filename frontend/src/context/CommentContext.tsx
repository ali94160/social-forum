import React, { createContext, useContext, useState } from "react";

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

  const deleteMyComment = async (commentId: string) => {
    const res = await fetch('/api/user/comments/' + commentId, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      },
    });

    return res.status === 200;
  }


  const values = {
    addComment,
    deleteMyComment
  };

  return (
    <CommentContext.Provider value={values}>{children}</CommentContext.Provider>
  );
}

export default CommentContextProvider;
