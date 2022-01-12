import React from "react";
import ModalContextProvider from "./ModalContext";
import UserContextProvider from "./UserContext"

interface Props {
  children: JSX.Element;
}

function AllContexts({ children }: Props) {
  return (
    <>
      <UserContextProvider>
        <ModalContextProvider>{children}</ModalContextProvider>
      </UserContextProvider>
    </>
  );
}

export default AllContexts;
