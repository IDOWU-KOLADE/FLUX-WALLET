import { useState, useEffect, createContext,useContext, useReducer,useRef} from 'react'
import reactLogo from './assets/react.svg'
import {BrowserRouter, Routes, Route, Link, NavLink} from "react-router-dom"
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import { AppProvider } from './CONTEXT/AppContext.jsx'
import { DesktopGate } from './COMPONENTS/FREQUENT/DesktopGate.jsx'
import './CSS/index.css'

import {AuthPage} from './PAGES/Auth.jsx'
import { MainPage } from './PAGES/Dashboard'
import { ProfilePage } from './PAGES/Profile.jsx'
import { RxHamburgerMenu } from "react-icons/rx";
import { AddTransactionPage } from './PAGES/AddTransaction.jsx'
import { CategoryPage } from './PAGES/Category.jsx'
import { Transactions } from './PAGES/Transactions.jsx'
import { StatsPage } from './PAGES/Stats.jsx'
import { ProtectedRoute } from './COMPONENTS/FREQUENT/ProtectedRoute.jsx';
import { AboutPage } from './PAGES/AboutPage.jsx';
import { AutoInstallPrompt } from './COMPONENTS/FREQUENT/AutoInstallPrompt.jsx'
function App() {
  
return (
  <DesktopGate>
  <AppProvider>
    <BrowserRouter>
    <AutoInstallPrompt/>
    <Routes>
      <Route path='/' element={<AuthPage/>}/>
      <Route path='/dashboard' element={<ProtectedRoute><MainPage/></ProtectedRoute>}/>
      <Route path='/profile' element={<ProtectedRoute><ProfilePage/></ProtectedRoute>}/>
      <Route path='/add' element={<ProtectedRoute><AddTransactionPage/></ProtectedRoute>}/>
      <Route path='/category' element={<ProtectedRoute><CategoryPage/></ProtectedRoute>}/>
      <Route path='/transactions' element={<ProtectedRoute><Transactions/></ProtectedRoute>}/>
      <Route path='/stats' element={<ProtectedRoute><StatsPage/></ProtectedRoute>}/>
      <Route path='/about' element={<ProtectedRoute><AboutPage/></ProtectedRoute>}/>
    </Routes>
    </BrowserRouter>
  </AppProvider>
  </DesktopGate>
)

}


export default App
