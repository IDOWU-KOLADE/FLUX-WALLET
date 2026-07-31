import { formatAmount } from "../../utils/currency";

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function TransactionRow({ transaction, category, currency, onClick }) {
  const isIncome = transaction.type === "income";

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
    </div>
  );
}