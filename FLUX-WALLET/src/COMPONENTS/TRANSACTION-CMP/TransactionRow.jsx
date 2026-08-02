import { useState } from "react";
import { MoreHorizontal } from "lucide-react";
import { formatAmount } from "../../utils/currency";

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function TransactionRow({ transaction, category, currency, onClick, onEdit, onDelete }) {
  const isIncome = transaction.type === "income";
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="transaction-row" onClick={onClick}>
      <div
        className="transaction-icon-square"
        style={{ backgroundColor: category?.icon.bg ?? "#f1f5f9" }}
      >
        <span>{category?.icon.emoji ?? "🔘"}</span>
      </div>

      <div className="transaction-row-main">
        <span className="transaction-row-description">{transaction.description}</span>
        <span className="transaction-row-meta">
          {category?.name ?? "Uncategorized"}
        </span>
      </div>

      <div className="transaction-row-side">
        <span className={`transaction-row-amount ${isIncome ? "amount--income" : "amount--expense"}`}>
          {isIncome ? "+" : "-"}{formatAmount(transaction.amount, currency)}
        </span>
        <span className="transaction-row-date">{formatDate(transaction.date)}</span>
      </div>

      <div className="transaction-row-menu-wrap">
        <button
          className="transaction-row-menu-btn"
          onClick={(e) => { e.stopPropagation(); setMenuOpen(true); }}
          aria-label="Transaction options"
        >
          <MoreHorizontal size={18} />
        </button>

        {menuOpen && (
          <>
            <div
              className="transaction-menu-overlay"
              onClick={(e) => { e.stopPropagation(); setMenuOpen(false); }}
            />
            <div className="transaction-menu-popup" onClick={(e) => e.stopPropagation()}>
              <button
                className="transaction-menu-item"
                onClick={() => { setMenuOpen(false); onEdit(transaction); }}
              >
                Edit
              </button>
              <button
                className="transaction-menu-item transaction-menu-item--danger"
                onClick={() => { setMenuOpen(false); onDelete(transaction); }}
              >
                Delete
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}