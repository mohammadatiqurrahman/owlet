import React, { useContext, useState } from "react";

const GeneralContext = React.createContext();

export const GeneralProvider = ({ children }) => {
  // Change password modal open or close
  const [changePasswordModal, setChangePasswordModal] = useState(false);

  // Change edit profile open or close
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
