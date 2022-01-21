import { createContext, FC, useContext, useState } from "react";
import { Ban } from '../interfaces/Ban';

type Props = {
  children?: JSX.Element;
};

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

  const values = {
    getBanlist,
    banlist
  };

  return (
    <BanContext.Provider value={values}>
      {children}
    </BanContext.Provider>
  );
};

export default BanContextProvider;