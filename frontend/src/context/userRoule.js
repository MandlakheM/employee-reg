import React, { createContext, useContext, useState, useEffect } from "react";
import firebase from "firebase/app";

const UserRoleContext = createContext();

export const UserRoleProvider = ({ children }) => {
  const [isSysAdmin, setIsSysAdmin] = useState(false);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        user.getIdTokenResult()
          .then((idTokenResult) => {
            setIsSysAdmin(idTokenResult.claims.sysAdmin || false);
          })
          .catch((error) => {
            console.error("Error fetching ID token:", error);
          });
      } else {
        setIsSysAdmin(false); // No user logged in
      }
    });
  }, []);

  return (
    <UserRoleContext.Provider value={{ isSysAdmin }}>
      {children}
    </UserRoleContext.Provider>
  );
};

export const useUserRole = () => {
  return useContext(UserRoleContext);
};
