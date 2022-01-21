import { createContext, FC, useContext, useState } from "react";
import { Ban } from '../interfaces/Ban';

type Props = {
  children?: JSX.Element;
};

const BanContext = createContext<any>(null);

export const useBan = () => useContext(BanContext);

const BanContextProvider: FC<Props> = ({ children }: Props) => {
  const [banlist, setBanlist] = useState<null | Ban[]>(null);



  const values = {
  };

  return (
    <BanContext.Provider value={values}>
      {children}
    </BanContext.Provider>
  );
};

export default BanContextProvider;