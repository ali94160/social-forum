import { createContext, useContext, useState, useEffect } from "react";
import { LoginUser, RegisterUser, User } from "../interfaces/User";

const UserContext = createContext<any>(null);

export const useUser = () => useContext(UserContext);

interface Props {
  children: any;
}

function UserContextProvider({ children }: Props) {
  const [me, setMe] = useState({});

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

  const whoAmI = async () => {
    const response: Response = await fetch("/api/whoAmI");
    const body = await response.json();
    if (response.status === 200) {
      setMe(body);
    }
  }

  const values = {
    deleteSelf,
    whoAmI,
    me
  };

  return <UserContext.Provider value={values}>{children}</UserContext.Provider>;
}

export default UserContextProvider;
