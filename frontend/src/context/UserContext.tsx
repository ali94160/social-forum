import {createContext, useContext, useState } from "react";

const UserContext = createContext<any>(null);

export const useUser = () => useContext(UserContext);

interface Props {
  children: any;
}

function UserContextProvider({ children }: Props) {

  const values = {

  };

  return (
    <UserContext.Provider value={values}>{children}</UserContext.Provider>
  );
}

export default UserContextProvider;
