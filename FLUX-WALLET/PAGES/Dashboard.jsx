//THE MAIN PAGE AND MAIN DEAL WHERE THE USER SEES THE LAST 5 TRANSACTION TOO
/* Shows:
Total Balance (income - expenses)
Total Income
Total Expenses
Last 5 transactions
Monthly budget progress bar */

export function MainPage () {

return (
    <div className="dashboard-div">
        <DashHero/>
    </div>
)
}

function DashHero () {

    return(
			<div className="hero-div">
				<div className="hero-section">
					<div className="hero-texts">
						<h4>Good morning, Kolade👋</h4>
						<h1>Take control of your money.</h1>
						<p>Track your income, manage expenses and reach your financial goals.</p>
					</div>
					<button className="add-transact">+ Add Transaction</button>
					<img className="hero-illustration" src="./PUBLIC/IMAGES/Hero-illustration.png"/>
				</div>
				
			</div>
    )
}