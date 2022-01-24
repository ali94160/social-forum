import { createContext, FC, useContext, useState } from "react";
import { Ban } from '../interfaces/Ban';

type Props = {
  children?: JSX.Element;
};

interface UnbanProps {
  id: string;
  password: string;
}

const BanContext = createContext<any>(null);

export const useBan = () => useContext(BanContext);

const BanContextProvider: FC<Props> = ({ children }: Props) => {
  const [banlist, setBanlist] = useState<null | Ban[]>(null);

  const getBanlist = async () => {
    const res = await fetch('/api/bans');
    if (res.status === 200) {
      const body = await res.json();
      setBanlist(body);
    }
    return res.status;
  }

  const unbanUser = async ({id, password}: UnbanProps) => {
    const res = await fetch(`/api/bans/${id}`, {
      method: 'DELETE',
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({password}),
    });
    if (res.status === 200) {
      getBanlist();
    }
    return res.status;
  }

  const values = {
    getBanlist,
    banlist,
    unbanUser
  };

  return (
    <BanContext.Provider value={values}>
      {children}
    </BanContext.Provider>
  );
};

export default BanContextProvider;