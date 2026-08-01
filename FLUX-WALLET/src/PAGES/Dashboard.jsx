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
import { useState, useEffect } from "react";
import { formatAmount } from "../COMPONENTS/STATS-CMP/statsUtils";
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
  const navigate = useNavigate()
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
					<button className="add-transact" onClick={()=> {navigate('/add')}}>+ Add Transaction</button>
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
  

function BudgetProgressCard() {
  const { currentUser } = useApp();
  const budget = currentUser.monthlyBudget;
  const now = new Date();

  const totalSpent = currentUser.transactions
    .filter((t) => t.type === "expense")
    .filter((t) => {
      const d = new Date(t.date);
      return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
    })
    .reduce((sum, t) => sum + t.amount, 0);

  const percentUsed = Math.min(Math.round((totalSpent / budget) * 100), 100);
  const displaySpent = Math.min(totalSpent, budget);

  // Real (uncapped) percentage drives the color — so going over 100% still reads as danger,
  // even though the bar/display text visually caps at 100%.
  const rawPercent = (totalSpent / budget) * 100;
  const status = rawPercent >= 80 ? "danger" : rawPercent >= 50 ? "warning" : "safe";

  return (
    <div className="dashAnalytics-div">
      <div className="innerAnalytics">
        <p className={`head-p budget-status--${status}`}>
          You've used {percentUsed}% of your monthly budget
        </p>
        <div className="progress-bar-container">
          <div
            className={`progress-bar-fill budget-status--${status}`}
            style={{ width: `${percentUsed}%` }}
          ></div>
        </div>
        <div className="price-usage-div">
          <p>{formatAmount(displaySpent, currentUser.currency)} of {formatAmount(budget, currentUser.currency)}</p>
          <p className={`budget-status--${status}`}>{percentUsed}%</p>
        </div>
      </div>
    </div>
  );
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

function getPeriodRange(period) {
  const now = new Date(); // always the real current date — this is what makes it "live"
  let month = now.getMonth();
  let year = now.getFullYear();
  if (period === "last-month") {
    month -= 1;
    if (month < 0) {
      month = 11;
      year -= 1;
    }
  }
  return { month, year };
}

function Summary() {
  const { currentUser, dashboardPeriod,setDashboardPeriod } = useApp();
  const navigate = useNavigate();


  const handleChange = (e) => {
    const value = e.target.value;
    if (value === "stats") {
      navigate("/stats");
      return; // don't update period state — the select shouldn't visually land on "Stats"
    }
    setDashboardPeriod(value)
  };

  const { month, year } = getPeriodRange(dashboardPeriod);

  const periodTransactions = currentUser.transactions.filter((t) => {
    const d = new Date(t.date);
    return d.getMonth() === month && d.getFullYear() === year;
  });

  const totalIncome = periodTransactions.filter((t) => t.type === "income").reduce((sum, t) => sum + t.amount, 0);
  const totalExpenses = periodTransactions.filter((t) => t.type === "expense").reduce((sum, t) => sum + t.amount, 0);
  const totalBalance = totalIncome - totalExpenses;

  return (
    <div className="summary-div">
      <div className="inner-summary">
        <div className="summary-head">
          <p>Summary</p>
          <select className="month-select" value={dashboardPeriod} onChange={handleChange}>
            <option value="this-month">This Month</option>
            <option value="last-month">Last Month</option>
            <option value="stats">Stats</option>
          </select>
        </div>
        <div className="icon-summary">
          <div className="balance-div">
            <div className="icon-circle green">
              <BsWallet2 size={20} />
            </div>
            <p className="small-summary-p balance">Total Balance</p>
            <p className="summary-amount">{formatAmount(totalBalance, currentUser.currency)}</p>
          </div>
          <div className="income-div">
            <div className="icon-circle teal">
              <HiArrowTrendingUp size={20} />
            </div>
            <p className="small-summary-p income">Income</p>
            <p className="summary-amount">{formatAmount(totalIncome, currentUser.currency)}</p>
          </div>
          <div className="expenses-div">
            <div className="icon-circle red">
              <HiMinus size={20} />
            </div>
            <p className="small-summary-p expenses">Expenses</p>
            <p className="summary-amount">{formatAmount(totalExpenses, currentUser.currency)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}


function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function RecentTransaction() {
  const { currentUser } = useApp();
  return currentUser?.transactions?.length > 0 ? <YesTransactionsCard /> : <NoTransactionsCard />;
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
function YesTransactionsCard() {
  const { currentUser } = useApp();
  const navigate = useNavigate();

  const recentFive = currentUser.transactions
    .map((t, index) => ({ ...t, __index: index })) // same tiebreak pattern as the Transactions page
    .sort((a, b) => {
      const dateDiff = new Date(b.date) - new Date(a.date);
      if (dateDiff !== 0) return dateDiff;
      return b.__index - a.__index;
    })
    .slice(0, 5);

  return (
    <div className="r-transaction-div">
      <div className="r-transaction-inner">
        <div className="top-transaction-p">
          <p className="first-p">Recent Transactions</p>
          <p className="sec-p" onClick={() => navigate('/transactions')}>See all</p>
        </div>

        <div className="analysis-flex">
          {recentFive.map((t) => {
            const category = currentUser.categories.find((c) => c.id === t.categoryId);
            const isIncome = t.type === "income";

            return (
              <div className="analysis-element" key={t.id}>
                <div className="category-item">
                  <div className="category-icon" style={{ backgroundColor: category?.icon.bg ?? "#f1f5f9" }}>
                    {category?.icon.emoji ?? "🔘"}
                  </div>
                  <div className="detail">
                    <span className="detail1">{t.description}</span>
                    <span className="detail2">{category?.name ?? "Uncategorized"}</span>
                  </div>
                </div>
                <div className="price-details">
                  <p className={`first-p ${isIncome ? "amount--income" : "amount--expense"}`}>
                    {isIncome ? "+" : "-"} {formatAmount(t.amount, currentUser.currency)}
                  </p>
                  <p className="sec-p">{formatDate(t.date)}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}