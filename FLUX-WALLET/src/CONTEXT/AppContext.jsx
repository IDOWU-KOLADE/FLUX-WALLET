// src/CONTEXT/AppContext.jsx
import { createContext, useContext, useState } from "react";
import { getCurrentUser, logoutUser } from "./UserStorage";
const AppContext = createContext();


export function AppProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(getCurrentUser());

  const logout = () => {
    logoutUser();
    setCurrentUser(null);
  };

  const refreshUser = () => {
    setCurrentUser(getCurrentUser());
  };

  return (
    <AppContext.Provider value={{ currentUser, setCurrentUser, logout, refreshUser }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);