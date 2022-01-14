import React from "react";
import ModalContextProvider from "./ModalContext";
import AuthContextProvider from "./AuthContext";
import PostContextProvider from "./PostContext";

interface Props {
  children: JSX.Element;
}

function AllContexts({ children }: Props) {
  return (
    <>
      <AuthContextProvider>
        <PostContextProvider>
          <ModalContextProvider>{children}</ModalContextProvider>
        </PostContextProvider>
      </AuthContextProvider>
    </>
  );
}

export default AllContexts;
