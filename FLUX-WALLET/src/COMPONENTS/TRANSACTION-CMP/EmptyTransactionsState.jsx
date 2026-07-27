export function EmptyTransactionsState({ message, showCta = false, onCtaClick }) {
  return (
    <div className="empty-transactions-state">
      <img
        className="empty-transactions-illustration"
        src="/IMAGES/no-transactions.png"  // swap for your real NoTransactionsCard asset path
        alt=""
      />
      <p className="empty-transactions-message">{message}</p>
      {showCta && (
        <button className="empty-transactions-cta" onClick={onCtaClick}>
          + Add Transaction
        </button>
      )}
    </div>
  );
}