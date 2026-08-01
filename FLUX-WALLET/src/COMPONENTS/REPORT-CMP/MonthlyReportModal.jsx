import { formatAmount } from "../../utils/currency";

export function MonthlyReportModal({ onClose, onDownload, monthLabel, report, currency }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="report-modal" onClick={(e) => e.stopPropagation()}>
        <h3 className="report-modal-title">Your {monthLabel} Report is Ready</h3>
        <p className="report-modal-subtitle">A quick look before you download</p>

        <div className="report-modal-stats">
          <div className="report-modal-row">
            <span>Total Spent</span>
            <span className="report-modal-value">{formatAmount(report.totalExpenses, currency)}</span>
          </div>
          {report.budget != null && (
            <div className="report-modal-row">
              <span>Budget Used</span>
              <span className="report-modal-value">{report.percentUsed}%</span>
            </div>
          )}
          {report.savingsRate != null && (
            <div className="report-modal-row">
              <span>Savings Rate</span>
              <span className="report-modal-value">{report.savingsRate}%</span>
            </div>
          )}
          <div className="report-modal-row">
            <span>Transactions</span>
            <span className="report-modal-value">{report.monthTransactionCount}</span>
          </div>
        </div>

        <div className="report-modal-actions">
          <button className="btn-text" onClick={onClose}>Not Now</button>
          <button className="btn-continue" onClick={onDownload}>Download PDF</button>
        </div>
      </div>
    </div>
  );
}