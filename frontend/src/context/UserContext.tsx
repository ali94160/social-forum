import { createContext, useContext, useState, useEffect } from "react";
import { LoginUser, RegisterUser, User } from "../interfaces/User";

const UserContext = createContext<any>(null);

export const useUser = () => useContext(UserContext);

interface Props {
  children: any;
}

function UserContextProvider({ children }: Props) {
  const deleteSelf = async (password: string) => {
    const response: Response = await fetch("/api/user/self", {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(password),
    });

    return response.status === 200;
  };

  const isAdmin = async () => {
    const response = await fetch("/api/admin");
    return response.status;
  };

  const searchUser = async (username: string) => {
    const response: Response = await fetch(`/api/users/username/${username}`);
    const user = await response.json();
    return user;
  };

  const values = {
    deleteSelf,
    isAdmin,
    searchUser,
  };

  return <UserContext.Provider value={values}>{children}</UserContext.Provider>;
}

export default UserContextProvider;
