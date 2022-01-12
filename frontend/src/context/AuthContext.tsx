import { createContext, useContext, useState, useEffect } from "react";
import { LoginUser, RegisterUser, User } from "../interfaces/User";

const AuthContext = createContext<any>(null);

export const useAuth = () => useContext(AuthContext);

interface Props {
  children: any;
}

function AuthContextProvider({ children }: Props) {

  const [user, setUser] = useState<User | null>(null);


  useEffect(() => {
    whoAmI()
  }, [])

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

  const whoAmI = async () => {
    const response: Response = await fetch("/api/whoAmI")
    
    if (response.status === 200) {
      const responseUser: User = await response.json()
      setUser(responseUser);
    }
  }

  const values = {
    login,
    register,
    whoAmI,
    user
  };

  return (
    <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
  );
}

export default AuthContextProvider;
