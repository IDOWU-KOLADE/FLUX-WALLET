//THE MAIN PAGE AND MAIN DEAL WHERE THE USER SEES THE LAST 5 TRANSACTION TOO
/* Shows:
Total Balance (income - expenses)
Total Income
Total Expenses
Last 5 transactions
Monthly budget progress bar */

import { AiOutlineHome } from "react-icons/ai";
import { HiOutlineClipboardList } from "react-icons/hi";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { IoStatsChartOutline } from "react-icons/io5";
import { AiOutlineUser } from "react-icons/ai";
import { NavLink } from "react-router-dom";
import { BsWallet2 } from "react-icons/bs";      // wallet
import { HiArrowTrendingUp } from "react-icons/hi2"; // income arrow
import { HiMinus } from "react-icons/hi";          // expenses minus

export function MainPage () {

return (
    <div className="dashboard-div">
      <div className="main-div">
        <DashHero/>
        <BudgetAnalysis/>
        <Summary/>
        <RecentTransaction/>
      </div>
    </div>
)
}

function DashHero () {

    return(
			<div className="hero-div">
				<div className="hero-section">
					<div className="hero-texts">
						<h4>Good morning, Skolade👋</h4>
						<h1>Take control of your money.</h1>
						<p>Track your income, manage expenses and reach your financial goals.</p>
					</div>
					<button className="add-transact">+ Add Transaction</button>
					<img className="hero-illustration" src="./PUBLIC/IMAGES/Hero-illustration.png"/>
				</div>
			</div>
    )
}
function BudgetAnalysis () {


	return (
      <div className="dashAnalytics-div">
        <div className="innerAnalytics">
          <p className="head-p">You've used 60% of your monthly budget</p>
          <div className="progress-bar-container">
            <div className="progress-bar-fill" style={{ width: "60%" }}></div>
          </div>
          <div className="price-usage-div">
            <p>#60,000 of #100,000</p>
            <p>60%</p>
          </div>
        </div>
      </div>
	)
}

function Summary () {
  return (
    <div className="summary-div">
      <div className="inner-summary">
        <div className="summary-head">
          <p>Summary</p>
          <select className="month-select">
            <option value="this-month">This Month</option>
            <option value="last-month">Last Month</option>
            <option value="last-3-months">Stats</option>
          </select>
        </div>
        <div className="icon-summary">
          <div className="balance-div">
            <div className="icon-circle green">
              <BsWallet2 size={20} />
            </div>
            <p className="small-summary-p balance">Total Balance</p>
            <p className="summary-amount">#120,000</p>
          </div>
          <div className="income-div">
            <div className="icon-circle teal">
              <HiArrowTrendingUp size={20} />
            </div>
            <p className="small-summary-p income">Income</p>
            <p className="summary-amount">#200,000</p>
          </div>
          <div className="expenses-div">
            <div className="icon-circle red">
              <HiMinus size={20} />
            </div>
            <p className="small-summary-p expenses">Expenses</p>
            <p className="summary-amount">#80,000</p>
          </div>
          
        </div>
      </div>
    </div>
  )
}

function RecentTransaction () {
  return (
    <div className="r-transaction-div">
      <div className="r-transaction-inner">
        <div className="top-transaction-p">
          <p className="first-p">Recent Transactions</p>
          <p className="sec-p">See all</p>
        </div>

        <div className="analysis-flex">
          <div className="analysis-element">
            <div className="category-item">
              <div className="category-icon" style={{ backgroundColor: "#fff3e0" }}>
                🛒
              </div>
              <div className="detail">
                <span className="detail1">Food & Groceries</span>
                <span className="detail2">Expense</span>
              </div>
            </div>
            <div className="price-details">
              <p className="first-p">+ #200,000</p>
              <p className="sec-p">May 20, 2024</p>
            </div>
          </div>
          <div className="analysis-element">
            <div className="category-item">
              <div className="category-icon" style={{ backgroundColor: "#e3f2fd"  }}>
                🚗
              </div>
              <div className="detail">
                <span className="detail1">Transport</span>
                <span className="detail2">Expense</span>
              </div>
            </div>
            <div className="price-details">
              <p className="first-p">+ #100,000</p>
              <p className="sec-p">May 20, 2024</p>
            </div>
          </div>
          <div className="analysis-element">
            <div className="category-item">
              <div className="category-icon" style={{ backgroundColor: "#e8f5e9" }}>
                 💡
              </div>
              <div className="detail">
                <span className="detail1">Bills & Utilities</span>
                <span className="detail2">Expense</span>
              </div>
            </div>
            <div className="price-details">
              <p className="first-p">+ #210,000</p>
              <p className="sec-p">May 21, 2024</p>
            </div>
          </div>
          <div className="analysis-element">
            <div className="category-item">
              <div className="category-icon" style={{ backgroundColor: "#f3e5f5" }}>
                 🎮
              </div>
              <div className="detail">
                <span className="detail1">Entertainment</span>
                <span className="detail2">Expense</span>
              </div>
            </div>
            <div className="price-details">
              <p className="first-p">+ #50,000</p>
              <p className="sec-p">May 22, 2024</p>
            </div>
          </div>
          <div className="analysis-element">
            <div className="category-item">
              <div className="category-icon" style={{ backgroundColor: "#fdecea" }}>
                 💊
              </div>
              <div className="detail">
                <span className="detail1">Health</span>
                <span className="detail2">Expense</span>
              </div>
            </div>
            <div className="price-details">
              <p className="first-p">+ #120,00000000</p>
              <p className="sec-p">May 24, 2024</p>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  )
}
export function BottomNav() {
  return (
    <nav className="bottom-nav">
      <NavLink to="/" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
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