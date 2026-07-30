import { X } from "lucide-react";

const CURRENCY_SYMBOLS = { NGN: "₦", USD: "$" };
function formatAmount(amount, currency) {
  const symbol =  CURRENCY_SYMBOLS[currency] ?? "";
  return `${symbol}${Number(amount).toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function TransactionDetailsSheet({ transaction, category, currency, onClose }) {
  const isIncome = transaction.type === "income";

  return (
    <div className="modal-overlay modal-overlay--centered" onClick={onClose}>
      <div className="transaction-details-modal" onClick={(e) => e.stopPropagation()}>
        <div className="details-modal-header">
          <button className="details-close-btn" onClick={onClose} aria-label="Close">
            <X size={18} />
          </button>
        </div>

        <div className="details-modal-content">
          <div className="details-section">
            <span className="details-label">Description</span>
            <p className="details-description">{transaction.description}</p>
          </div>

          <div className="details-divider" />

          <div className="details-row">
            <div className="details-section">
              <span className="details-label">Amount</span>
              <span className={`details-amount ${isIncome ? "amount--income" : "amount--expense"}`}>
                {isIncome ? "+" : "-"}{formatAmount(transaction.amount, currency)}
              </span>
            </div>
            <div className="details-section">
              <span className="details-label">Date</span>
              <div className="details-date-box">{formatDate(transaction.date)}</div>
            </div>
          </div>

          <div className="details-divider" />

          <div className="details-section">
            <span className="details-label">Category</span>
            <div className="details-category-chip" style={{ backgroundColor: category?.icon.bg ?? "#f1f5f9" }}>
              <span className="details-category-emoji">{category?.icon.emoji ?? "🔘"}</span>
              <span>{category?.name ?? "Uncategorized"}</span>
            </div>
          </div>

          {transaction.notes?.trim() && (
            <>
              <div className="details-divider" />
              <div className="details-section">
                <span className="details-label">Note</span>
                <div className="details-notes-box">{transaction.notes}</div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}