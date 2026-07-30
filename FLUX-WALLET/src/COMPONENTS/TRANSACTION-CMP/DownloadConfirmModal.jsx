export function DownloadConfirmModal({ isOpen, onClose, onConfirm, summary, count, filename }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="download-confirm-modal" onClick={(e) => e.stopPropagation()}>
        <h3 className="download-confirm-title">Download Transactions</h3>
        <div className="download-confirm-details">
          <div className="download-confirm-row">
            <span className="download-confirm-label">Filter</span>
            <span className="download-confirm-value">{summary}</span>
          </div>
          <div className="download-confirm-row">
            <span className="download-confirm-label">Transactions</span>
            <span className="download-confirm-value">{count}</span>
          </div>
          <div className="download-confirm-row">
            <span className="download-confirm-label">File name</span>
            <span className="download-confirm-value download-confirm-filename">{filename}</span>
          </div>
        </div>
        <div className="download-confirm-actions">
          <button className="download-confirm-cancel" onClick={onClose}>
            Cancel
          </button>
          <button className="download-confirm-download" onClick={onConfirm}>
            Download PDF
          </button>
        </div>
      </div>
    </div>
  );
}