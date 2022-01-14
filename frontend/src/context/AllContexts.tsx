import React from "react";
import DropDownContextProvider from "./DropDownContext";
import ModalContextProvider from "./ModalContext";
import AuthContextProvider from "./AuthContext";

interface Props {
  children: JSX.Element;
}

function AllContexts({ children }: Props) {
  return (
    <>
      <DropDownContextProvider>
        <AuthContextProvider>
          <ModalContextProvider>{children}</ModalContextProvider>
        </AuthContextProvider>
      </DropDownContextProvider>
    </>
  );
}

export default AllContexts;
