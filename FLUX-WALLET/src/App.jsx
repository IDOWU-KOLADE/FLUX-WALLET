import { useState, useEffect, createContext,useContext, useReducer,useRef} from 'react'
import reactLogo from './assets/react.svg'
import {BrowserRouter, Routes, Route, Link, NavLink} from "react-router-dom"
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import { BottomNav } from '../PAGES/Dashboard'

import './CSS/index.css'

import { AuthPage } from '../PAGES/Auth'
import { MainPage } from '../PAGES/Dashboard'
import { RxHamburgerMenu } from "react-icons/rx";

function App() {
  
return (
  <BrowserRouter>
  {/* <Navbar/> */}
  <Routes>
    {/* <Route path='/' element={<AuthPage/>}/> */}
    <Route path='/' element={<MainPage/>}/>
    <Route/>
    <Route/>
    <Route/>
  </Routes>
  {/* <BottomNav/> */}
  </BrowserRouter>
)

}

function Navbar () {
  return (
    <div className='navbar-div'>
      <div className='navbar'>
        <img className='flux-logo' src='/IMAGES/Fluxlogo.png'/>
        <svg className='burger-icon' width="18" height="25" viewBox="0 0 20 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="20" height="2" rx="1" fill="currentColor" />
          <rect y="6" width="20" height="2" rx="1" fill="currentColor" />
          <rect y="12" width="12" height="2" rx="1" fill="currentColor" />
       </svg>
      </div>
    </div>

  )
}
export default App
