import React from "react";
import ModalContextProvider from "./ModalContext";

interface Props {
  children: JSX.Element;
}

function AllContexts({ children }: Props) {
  return (
    <>
      <ModalContextProvider>
        {children}
      </ModalContextProvider>
    </>
  );
}

export default AllContexts;
