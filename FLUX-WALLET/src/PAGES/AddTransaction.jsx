// THE PAGE WHERE YOU ACTUALLY ADD YOUR INCOME OR EXPENSES
/* Form page to create transactions.

Fields:
Name
Amount
Type (income / expense)
Category (food, transport, etc.)
Date
Rules:
No empty submission (useForm custom hook)
Redirect to /transactions after submit

👉 This is the “input system” */


import { useNavigate } from "react-router-dom";

export function AddTransactionPage() {
  return (
    <div className="add-transaction-page">
      <AddTransactionHeader />
      <div className="add-transaction-form">
        <TransactionTypeToggle />
        <NameField />
        <AmountField />
        <CategoryField />
        <DateField />
        <NotesField />
      </div>
      <SubmitBar />
    </div>
  );
}

function AddTransactionHeader() {
  const navigate = useNavigate();
  return (
    <div className="at-header">
      <button className="at-back-btn" onClick={() => navigate(-1)}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15 18l-6-6 6-6" stroke="var(--color-text-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      <h1 className="at-title">Add Transaction</h1>
      <div className="at-header-spacer" />
    </div>
  );
}

function TransactionTypeToggle() {
  return (
    <div className="at-field-group">
      <label className="at-label">Transaction Type</label>
      <div className="at-toggle">
        <button className="at-toggle-btn at-toggle-active">Income</button>
        <button className="at-toggle-btn">Expense</button>
      </div>
    </div>
  );
}

function NameField() {
  return (
    <div className="at-field-group">
      <label className="at-label">Name / Description</label>
      <input
        className="at-input"
        type="text"
        placeholder="e.g. Salary, Groceries, Freelance"
      />
    </div>
  );
}

function AmountField() {
  return (
    <div className="at-field-group">
      <label className="at-label">Amount (₦)</label>
      <input
        className="at-input"
        type="number"
        placeholder="e.g. 50,000"
      />
    </div>
  );
}

function CategoryField() {
  return (
    <div className="at-field-group">
      <label className="at-label">Category</label>
      <div className="at-select-wrapper">
        <select className="at-select" defaultValue="">
          <option value="" disabled>Select category</option>
        </select>
        <svg className="at-select-chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M6 9l6 6 6-6" stroke="var(--color-text-secondary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    </div>
  );
}

function DateField() {
  return (
    <div className="at-field-group">
      <label className="at-label">Date</label>
      <div className="at-date-wrapper">
        <input
          className="at-input at-date-input"
          type="text"
          placeholder="May 20, 2024"
        />
        <svg className="at-date-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="3" y="5" width="18" height="16" rx="2" stroke="var(--color-text-secondary)" strokeWidth="1.5"/>
          <path d="M3 10h18M8 3v4M16 3v4" stroke="var(--color-text-secondary)" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      </div>
    </div>
  );
}

function NotesField() {
  return (
    <div className="at-field-group">
      <label className="at-label">Notes (optional)</label>
      <textarea
        className="at-textarea"
        placeholder="Add a note..."
        rows={3}
      />
    </div>
  );
}

function SubmitBar() {
  return (
    <div className="at-submit-bar">
      <button className="btn-add-transaction">Add Transaction</button>
    </div>
  );
}
