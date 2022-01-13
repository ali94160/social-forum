import { createContext, FC, useContext, useState } from "react";

type Props = {
  children?: JSX.Element;
};

const DropDownContext = createContext<any>(null);

export const useDropDown = () => useContext(DropDownContext);

const DropDownContextProvider: FC<Props> = ({ children }: Props) => {
  const [showDropDown, setShowDropDown] = useState<Boolean>(false);

  const values = {
    showDropDown,
    setShowDropDown,
  };

  return (
    <DropDownContext.Provider value={values}>
      {children}
    </DropDownContext.Provider>
  );
};

export default DropDownContextProvider;
