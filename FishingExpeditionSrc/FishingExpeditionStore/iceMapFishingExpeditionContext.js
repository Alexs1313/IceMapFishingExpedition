import React, { createContext, useContext, useState } from 'react';
export const StoreContext = createContext(undefined);
export const useStore = () => useContext(StoreContext);

export const ContextProvider = ({ children }) => {
  const [isEnabledIceMapMusic, setIsEnabledIceMapMusic] = useState(false);

  const contextValue = {
    isEnabledIceMapMusic,
    setIsEnabledIceMapMusic,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  );
};
