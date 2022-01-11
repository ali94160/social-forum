import React, { createContext, useContext, useState } from "react";

const ModalContext = createContext<any>(null);

export const useModal = () => useContext(ModalContext)

interface Props {
  children: any
}

function ModalContextProvider({ children }: Props) {
  const [isLoginModal, setIsLoginModal] = useState(false);
  const toggleLoginModal = () => setIsLoginModal(!isLoginModal)
  
  const values = {
    isLoginModal,
    toggleLoginModal
  };

  return (
    
    <ModalContext.Provider value={values}>
      {children}
    </ModalContext.Provider>
    )
}

export default ModalContextProvider;
