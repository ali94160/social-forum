import { createContext, useContext, useState } from "react";
import { LoginUser, RegisterUser } from "../interfaces/User";

const AuthContext = createContext<any>(null);

export const useAuth = () => useContext(AuthContext);

interface Props {
  children: any;
}

function AuthContextProvider({ children }: Props) {
  const login = (user: LoginUser) => {
    console.log(user);
    
  }
  const register = async (user: RegisterUser) => {
    let response = await fetch("/api/register", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user)
    });
    if (response.status === 200) {
      return true;
    }
    
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
