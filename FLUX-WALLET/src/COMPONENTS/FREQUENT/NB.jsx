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

      </div>
    </div>

  )
}
