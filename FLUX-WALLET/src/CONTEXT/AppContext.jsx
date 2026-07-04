// src/CONTEXT/AppContext.jsx
import { createContext, useContext, useState } from "react";
import { getCurrentUser, logoutUser } from "./UserStorage";
const AppContext = createContext();


export function AppProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(getCurrentUser());
  const [screen,setScreen] = useState('login');
  const [error,seterror] = useState('');
  const [loginDetails, setLoginDetails] = useState({username:'',password:''})
  const [userdetails,setUserDetails] = useState({username:'',password: ''})
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const logout = () => {
    logoutUser();
    setCurrentUser(null);
    setScreen('login')
  };

  const refreshUser = () => {
    setCurrentUser(getCurrentUser());
  };

  return (
    <AppContext.Provider value={{ 
      //Global App State
    currentUser, setCurrentUser, logout, refreshUser,
      //  Auth Flow State
    screen,setScreen,error,seterror,loginDetails,setLoginDetails,userdetails,setUserDetails,selectedQuestions,setSelectedQuestions
    
    }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);