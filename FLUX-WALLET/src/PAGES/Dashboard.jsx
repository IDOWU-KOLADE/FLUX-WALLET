//THE MAIN PAGE AND MAIN DEAL WHERE THE USER SEES THE LAST 5 TRANSACTION TOO
/* Shows:
Total Balance (income - expenses)
Total Income
Total Expenses
Last 5 transactions
Monthly budget progress bar */
import { Navbar } from "../COMPONENTS/FREQUENT/NB"
import { BottomNav } from "../COMPONENTS/FREQUENT/NB"
import { BsWallet2 } from "react-icons/bs";      // wallet
import { HiArrowTrendingUp } from "react-icons/hi2"; // income arrow
import { HiMinus } from "react-icons/hi";          // expenses minus
import { useEffect } from "react";

import { useApp } from "../CONTEXT/AppContext";
import { getCurrentUser } from "../CONTEXT/UserStorage";
import { useNavigate } from "react-router-dom";

export function MainPage () {
const {refreshUser,currentUser} = useApp()
const navigate = useNavigate(); 
useEffect(()=> {
  refreshUser();
},[])
// separate useEffect that watches currentUser
useEffect(() => {
  //checks if there's no loggedIn user, if t
  if (currentUser === null) {
    navigate('/');
  }
}, [currentUser]);
return (
  <>
  
  <div className="page">
    <Navbar/>
      <div className="dashboard-div">
        <div className="main-div">
          <DashHero/>
          <BudgetAnalysis/>
          <Summary/>
          <RecentTransaction/>
        </div>
      </div>
    <BottomNav/>
  </div>

    </>
)
}

function DashHero () {
const {currentUser} = useApp()
if (!currentUser) return null; // 👈 safety net
    return(
			<div className="hero-div">
				<div className="hero-section">
					<div className="hero-texts">
						<h4>Good morning, {currentUser.username}</h4>
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
const navigate = useNavigate()
const {currentUser}= useApp()
	return(
      currentUser?.monthlyBudget ? (<BudgetProgressCard/>)
      : (<NoBudgetCard/>)
    );
    }
  
function BudgetProgressCard () {
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
function NoBudgetCard () {
  const navigate = useNavigate()
  return (
    <div className="budget-card budget-card-empty">
      <h3 className="budget-empty-title">Set a monthly budget</h3>
      <p className="budget-empty-subtext">
        See how much you've spent and what's left, at a glance.
      </p>
      <button className="btn-set-budget" onClick={() => navigate('/profile')}>
        Set Budget
      </button>
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
  const {currentUser} = useApp()
  return (
      // currentUser?.transactions?.length > 0 ? (<YesTransactionsCard/>) : (<NoTransactionsCard/>)
      <YesTransactionsCard/>
     )
}
function NoTransactionsCard() {
  return (
    <div className="transactions-card">
      <h3 className="transactions-card-title">Recent Transactions</h3>

      <div className="transactions-empty">
        <div className="transactions-empty-icon">
          <svg width="45" height="45" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7 3h8l4 4v14a1 1 0 01-1 1H7a1 1 0 01-1-1V4a1 1 0 011-1z"
              stroke="var(--color-primary)" strokeWidth="1.5" strokeLinejoin="round"/>
            <path d="M15 3v4h4" stroke="var(--color-primary)" strokeWidth="1.5" strokeLinejoin="round"/>
            <circle cx="12" cy="15" r="3.2" stroke="var(--color-primary)" strokeWidth="1.5"/>
            <path d="M12 13.6v2.8M10.8 15h2.4" stroke="var(--color-primary)" strokeWidth="1.3" strokeLinecap="round"/>
          </svg>
        </div>

        <p className="transactions-empty-title">No transactions yet</p>
        <p className="transactions-empty-subtext">Add your first transaction to get started</p>
      </div>
    </div>
  );
}
function YesTransactionsCard () {
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