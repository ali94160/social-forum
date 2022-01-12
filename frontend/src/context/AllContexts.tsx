import React from "react";
import DropDownContextProvider from "./DropDownContext";

interface Props {
  children: JSX.Element;
}

function AllContexts({ children }: Props) {
  return (
    <>
      <DropDownContextProvider>{children}</DropDownContextProvider>
    </>
  );
}

export default AllContexts;
