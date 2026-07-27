function formatAmount(amount, currency) {
  const symbol = currency === "NGN" ? "₦" : "";
  return `${symbol}${Number(amount).toLocaleString()}`;
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
    <div className="modal-overlay" onClick={onClose}>
      <div className="transaction-details-sheet" onClick={(e) => e.stopPropagation()}>
        <div className="details-sheet-handle" />

        <span className={`details-amount ${isIncome ? "amount--income" : "amount--expense"}`}>
          {isIncome ? "+" : "-"}{formatAmount(transaction.amount, currency)}
        </span>

        <p className="details-description">{transaction.description}</p>

        <p className="details-meta">
          {category?.name ?? "Uncategorized"} · {formatDate(transaction.date)}
        </p>

        {transaction.notes?.trim() && (
          <div className="details-notes">
            <p>{transaction.notes}</p>
          </div>
        )}
      </div>
    </div>
  );
}