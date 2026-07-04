import { useState, useEffect, createContext,useContext, useReducer,useRef} from 'react'
import reactLogo from './assets/react.svg'
import {BrowserRouter, Routes, Route, Link, NavLink} from "react-router-dom"
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import { AppProvider } from './CONTEXT/AppContext.jsx'

import './CSS/index.css'

import {AuthPage} from './PAGES/Auth.jsx'
import { MainPage } from './PAGES/Dashboard'
import { RxHamburgerMenu } from "react-icons/rx";

function App() {
  
return (
  <AppProvider>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<AuthPage/>}/>
      <Route path='/dashboard' element={<MainPage/>}/>
      <Route/>
      <Route/>
      <Route/>
    </Routes>
    </BrowserRouter>
  </AppProvider>
)

}


export default App
