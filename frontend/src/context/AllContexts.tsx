import React from "react";
import DropDownContextProvider from "./DropDownContext";
import ModalContextProvider from "./ModalContext";
import AuthContextProvider from "./AuthContext";
import UserContextProvider from "./UserContext";

interface Props {
  children: JSX.Element;
}

function AllContexts({ children }: Props) {
  return (
    <>
      <DropDownContextProvider>
        <AuthContextProvider>
          <UserContextProvider>
          <ModalContextProvider>{children}</ModalContextProvider>
          </UserContextProvider>
        </AuthContextProvider>
      </DropDownContextProvider>
    </>
  );
}

export default AllContexts;
