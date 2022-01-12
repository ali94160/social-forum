import React from "react";
import ModalContextProvider from "./ModalContext";
import AuthContextProvider from "./AuthContext"

interface Props {
  children: JSX.Element;
}

function AllContexts({ children }: Props) {
  return (
    <>
      <AuthContextProvider>
        <ModalContextProvider>{children}</ModalContextProvider>
      </AuthContextProvider>
    </>
  );
}

export default AllContexts;
