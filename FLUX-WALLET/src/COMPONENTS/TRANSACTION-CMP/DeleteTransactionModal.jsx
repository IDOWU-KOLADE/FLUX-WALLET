export function DeleteTransactionModal({ transaction, onCancel, onConfirm }) {
  if (!transaction) return null;

  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <h3 className="modal-title">Delete Transaction?</h3>
        <p className="modal-subtitle">
          "{transaction.description}" will be permanently removed. This can't be undone.
        </p>
        <div className="report-modal-actions">
          <button className="btn-text" onClick={onCancel}>Cancel</button>
          <button className="modal-danger-btn" onClick={onConfirm}>Delete</button>
        </div>
      </div>
    </div>
  );
}