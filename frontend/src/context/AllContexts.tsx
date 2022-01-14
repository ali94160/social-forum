import React from "react";
import DropDownContextProvider from "./DropDownContext";
import ModalContextProvider from "./ModalContext";
import AuthContextProvider from "./AuthContext";
<<<<<<< HEAD
import PostContextProvider from "./PostContext";
=======
>>>>>>> develop

interface Props {
  children: JSX.Element;
}

function AllContexts({ children }: Props) {
  return (
    <>
<<<<<<< HEAD
      <AuthContextProvider>
        <PostContextProvider>
          <ModalContextProvider>{children}</ModalContextProvider>
        </PostContextProvider>
      </AuthContextProvider>
=======
      <DropDownContextProvider>
        <AuthContextProvider>
          <ModalContextProvider>{children}</ModalContextProvider>
        </AuthContextProvider>
      </DropDownContextProvider>
>>>>>>> develop
    </>
  );
}

export default AllContexts;
