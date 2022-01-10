import React from "react";

interface Props {
  children: JSX.Element;
}

function AllContexts({ children }: Props) {
  return <div>{children};</div>;
}

export default AllContexts;
