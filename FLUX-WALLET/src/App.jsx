import { useState, useEffect, createContext,useContext, useReducer,useRef} from 'react'
import reactLogo from './assets/react.svg'
import {BrowserRouter, Routes, Route, Link, NavLink} from "react-router-dom"
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import { AppProvider } from './CONTEXT/AppContext.jsx'

import './CSS/index.css'

import {AuthPage} from './PAGES/Auth.jsx'
import { MainPage } from './PAGES/Dashboard'
import { ProfilePage } from './PAGES/Profile.jsx'
import { RxHamburgerMenu } from "react-icons/rx";
import { AddTransactionPage } from './PAGES/AddTransaction.jsx'
import { CategoryPage } from './PAGES/Category.jsx'
import { Transactions } from './PAGES/Transactions.jsx'
import { StatsPage } from './PAGES/Stats.jsx'
function App() {
  
return (
  <AppProvider>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<AuthPage/>}/>
      <Route path='/dashboard' element={<MainPage/>}/>
      <Route path='/profile' element={<ProfilePage/>}/>
      <Route path='/add' element={<AddTransactionPage/>}/>
      <Route path='/category' element={<CategoryPage/>}/>
      <Route path='/transactions' element={<Transactions/>}/>
      <Route path='/stats' element={<StatsPage/>}/>
    </Routes>
    </BrowserRouter>
  </AppProvider>
)

}


export default App
