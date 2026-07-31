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

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../COMPONENTS/FREQUENT/NB";
import { BottomNav } from "../COMPONENTS/FREQUENT/NB";
import { CategoryField } from "../COMPONENTS/CATEGORY-CMP/CategoryField";
import { useApp } from "../CONTEXT/AppContext";
import { addTransaction } from "../CONTEXT/UserStorage";

export function AddTransactionPage() {
  const { currentUser, refreshUser } = useApp();
  const navigate = useNavigate();

  // --- all form state lives here, in the parent, and gets passed down ---
  const [transactionType, setTransactionType] = useState("expense");
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [date, setDate] = useState("");
  const [notes, setNotes] = useState("");
  const [error, setError] = useState(""); // moved inside the component — hooks can't live at module scope

  // if the user flips Expense/Income and the previously chosen category no
  // longer matches, clear it — this is the exact rule CategoryField's usage
  // note called for, just living in the parent since it owns the toggle.
  useEffect(() => {
    if (selectedCategory && selectedCategory.type !== transactionType) {
      setSelectedCategory(null);
    }
  }, [transactionType]);

  function handleSubmit() {
    if (!name.trim()) {
      setError("Please enter a name or description");
      return;
    }
    if (!amount || Number(amount) <= 0) {
      setError("Please enter a valid amount greater than zero");
      return;
    }
    if (!selectedCategory) {
      setError("Please select a category");
      return;
    }
    if (!date) {
      setError("Please select a date");
      return;
    }

    setError("");
    addTransaction(currentUser.username, {
      type: transactionType,
      amount,
      description: name.trim().replace(/\s+/g, " "), // trims edges AND collapses internal double-spacing
      categoryId: selectedCategory.id,
      date,
      notes: notes.trim().replace(/\s+/g, " "),
    });
    refreshUser();
    navigate("/transactions");
  }

  return (
    <div className="add-transaction-page">
      <Navbar />

      <div className="add-transaction-form">
        <TransactionTypeToggle
          transactionType={transactionType}
          onChange={setTransactionType}
        />
        <NameField name={name} onChange={setName} />
        <AmountField amount={amount} onChange={setAmount} />
        <CategoryField
          allCategories={currentUser.categories}
          transactionType={transactionType}
          selectedCategory={selectedCategory}
          onChange={setSelectedCategory}
        />
        <DateField date={date} onChange={setDate} />
        <NotesField notes={notes} onChange={setNotes} />
      </div>

      {error && (
        <p style={{ color: "red", fontSize: "13px", textAlign: "center", padding: "0 20px" }}>
          {error}
        </p>
      )}

      <SubmitBar onSubmit={handleSubmit} />
      <BottomNav />
    </div>
  );
}

function TransactionTypeToggle({ transactionType, onChange }) {
  return (
    <div className="at-field-group">
      <label className="at-label">Transaction Type</label>
      <div className="at-toggle">
        <button
          type="button"
          className={`at-toggle-btn ${transactionType === "income" ? "at-toggle-active" : ""}`}
          onClick={() => onChange("income")}
        >
          Income
        </button>
        <button
          type="button"
          className={`at-toggle-btn ${transactionType === "expense" ? "at-toggle-active" : ""}`}
          onClick={() => onChange("expense")}
        >
          Expense
        </button>
      </div>
    </div>
  );
}

function NameField({ name, onChange }) {
  return (
    <div className="at-field-group">
      <label className="at-label">Name / Description</label>
      <input
        className="at-input"
        type="text"
        placeholder="e.g. Lunch at the market"
        value={name}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

function AmountField({ amount, onChange }) {
  return (
    <div className="at-field-group">
      <label className="at-label">Amount</label>
      <input
        className="at-input"
        type="number"
        placeholder="e.g. 50,000"
        value={amount}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "-") e.preventDefault(); // blocks typing a minus sign at all
        }}
        min="0"
      />
    </div>
  );
}

function DateField({ date, onChange }) {
  return (
    <div className="at-field-group">
      <label className="at-label">Date</label>
      <input
        className="at-input at-date-input"
        type="date"
        value={date}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

function NotesField({ notes, onChange }) {
  return (
    <div className="at-field-group">
      <label className="at-label">Notes (optional)</label>
      <textarea
        className="at-textarea"
        placeholder="Add a note..."
        rows={3}
        value={notes}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

function SubmitBar({ onSubmit }) {
  return (
    <div className="at-submit-bar">
      <button type="button" className="btn-add-transaction" onClick={onSubmit}>
        Add Transaction
      </button>
    </div>
  );
}