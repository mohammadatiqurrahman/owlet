import React, { useContext } from "react";

const ClassContext = React.createContext();

export const ClassProvider = ({ children }) => {
  return <ClassContext.Provider value="hi">{children}</ClassContext.Provider>;
};

export const useClassContext = () => {
  return useContext(ClassContext);
};
