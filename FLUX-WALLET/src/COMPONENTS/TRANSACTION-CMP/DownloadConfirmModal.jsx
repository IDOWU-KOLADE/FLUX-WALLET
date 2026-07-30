import { useState, useEffect } from "react";

export function DownloadConfirmModal({ isOpen, onClose, onConfirm, summary, count, defaultFilename }) {
  const [filename, setFilename] = useState(defaultFilename);

  // Reset to the fresh auto-generated name every time the modal opens,
  // so a stale typed name from a previous open doesn't leak into a new filter context.
  useEffect(() => {
    if (isOpen) setFilename(defaultFilename);
  }, [isOpen, defaultFilename]);

  if (!isOpen) return null;

  const handleConfirm = () => {
    const sanitized = sanitizeFilename(filename);
    onConfirm(sanitized);
  };

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
        </div>

        <label className="download-confirm-filename-label" htmlFor="pdf-filename">
          File name
        </label>
        <input
          id="pdf-filename"
          className="download-confirm-filename-input"
          type="text"
          value={filename}
          onChange={(e) => setFilename(e.target.value)}
        />

        <div className="download-confirm-actions">
          <button className="download-confirm-cancel" onClick={onClose}>
            Cancel
          </button>
          <button className="download-confirm-download" onClick={handleConfirm}>
            Download PDF
          </button>
        </div>
      </div>
    </div>
  );
}

function sanitizeFilename(name) {
  const trimmed = name.trim() || "FluxWallet-transactions"; // never allow an empty filename
  const withoutInvalidChars = trimmed.replace(/[\\/:*?"<>|]/g, "-"); // Windows-invalid characters
  const withoutExtension = withoutInvalidChars.replace(/\.pdf$/i, ""); // strip any .pdf the user typed, so we don't get .pdf.pdf
  return `${withoutExtension}.pdf`;
}