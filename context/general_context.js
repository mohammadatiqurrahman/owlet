import React, { useContext, useState } from "react";

const GeneralContext = React.createContext();

export const GeneralProvider = ({ children }) => {
  const [changePasswordModal, setChangePasswordModal] = useState(false);

  const [userProfileEditModal, setUserProfileEditModal] = useState(false);
  return (
    <GeneralContext.Provider
      value={{
        changePasswordModal,
        setChangePasswordModal,
        userProfileEditModal,
        setUserProfileEditModal,
      }}
    >
      {children}
    </GeneralContext.Provider>
  );
};

export const useGeneralContext = () => {
  return useContext(GeneralContext);
};
