import React, { createContext, useContext, useState } from "react";

const ModalContext = createContext<any>(null);

export const useModal = () => useContext(ModalContext)

interface Props {
  children: any
}

function ModalContextProvider({ children }: Props) {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const toggleAuthModal = () => setIsAuthOpen(!isAuthOpen);
  
  const values = {
    isAuthOpen,
    toggleAuthModal,
  };

  return (
    
    <ModalContext.Provider value={values}>
      {children}
    </ModalContext.Provider>
    )
}

export default ModalContextProvider;
