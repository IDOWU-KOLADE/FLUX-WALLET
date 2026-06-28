// src/CONTEXT/AppContext.jsx
import { createContext, useContext, useState } from "react";
import { getCurrentUser, logoutUser } from "./UserStorage";

const AppContext = createContext();

export function AppProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(getCurrentUser());
  const [screen, setScreen] = useState(currentUser ? "dashboard" : "login");

  const logout = () => {
    logoutUser();
    setCurrentUser(null);
    setScreen("login");
  };

  const refreshUser = () => {
    setCurrentUser(getCurrentUser());
  };

  return (
    <AppContext.Provider value={{ currentUser, setCurrentUser, screen, setScreen, logout, refreshUser }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);