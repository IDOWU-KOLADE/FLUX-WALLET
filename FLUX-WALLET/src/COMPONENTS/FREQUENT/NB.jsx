import { AiOutlineHome } from "react-icons/ai";
import { HiOutlineClipboardList } from "react-icons/hi";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { IoStatsChartOutline } from "react-icons/io5";
import { AiOutlineUser } from "react-icons/ai";
import { NavLink } from "react-router-dom";



export function BottomNav() {
  return (
    <nav className="bottom-nav">
      <NavLink to="/dashboard" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
        <AiOutlineHome size={22} />
        <span>Home</span>
      </NavLink>
      <NavLink to="/transactions" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
        <HiOutlineClipboardList size={22} />
        <span>Transactions</span>
      </NavLink>
      <NavLink to="/add" className="nav-item add-btn">
        <AiOutlinePlusCircle size={28} />
        <span>Add</span>
      </NavLink>
      <NavLink to="/stats" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
        <IoStatsChartOutline size={22} />
        <span>Stats</span>
      </NavLink>
      <NavLink to="/profile" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
        <AiOutlineUser size={22} />
        <span>Profile</span>
      </NavLink>
    </nav>
  )
}

export function Navbar () {
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
