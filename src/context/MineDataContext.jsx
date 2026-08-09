import React, { createContext, useContext, useState } from "react";

const MineDataContext = createContext();

export const MineDataProvider = ({ children }) => {
  const [mineData, setMineData] = useState(null);

  return (
    <MineDataContext.Provider
      value={{
        mineData,
        setMineData,
      }}
    >
      {children}
    </MineDataContext.Provider>
  );
};

export const useMineData = () => {
  return useContext(MineDataContext);
};