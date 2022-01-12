import { createContext, useContext, useState } from "react";
import { LoginUser, RegisterUser } from "../interfaces/User";

const AuthContext = createContext<any>(null);

export const useAuth = () => useContext(AuthContext);

interface Props {
  children: any;
}

function AuthContextProvider({ children }: Props) {
  const login = async (user: LoginUser) => {
    const response: Response = await fetch("/api/login", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    });
    
    return response.status === 200
  }
  const register = async (user: RegisterUser) => {
    const response: Response = await fetch("/api/register", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    });

    return response.status === 200;
  }

  const values = {
    login,
    register
  };

  return (
    <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
  );
}

export default AuthContextProvider;
