//THE MAIN PAGE AND MAIN DEAL WHERE THE USER SEES THE LAST 5 TRANSACTION TOO
/* Shows:
Total Balance (income - expenses)
Total Income
Total Expenses
Last 5 transactions
Monthly budget progress bar */
import { BsWallet2 } from "react-icons/bs";      // wallet
import { HiArrowTrendingUp } from "react-icons/hi2"; // income arrow
import { HiMinus } from "react-icons/hi";          // expenses minus

export function MainPage () {

return (
    <div className="dashboard-div">
        <DashHero/>
        <BudgetAnalysis/>
        <Summary/>
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