import { AiOutlineHome } from "react-icons/ai";
import { HiOutlineClipboardList } from "react-icons/hi";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { IoStatsChartOutline } from "react-icons/io5";
import { AiOutlineUser } from "react-icons/ai";
import { Download } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { useApp } from "../../CONTEXT/AppContext";
import { getPeriodRange } from "../STATS-CMP/statsUtils";
import { shouldShowMonthlyReport, hasMonthlyReportData, markReportDownloaded } from "../../CONTEXT/UserStorage";
import { buildMonthlyReport } from "../../utils/reportUtils";
import { exportMonthlyReportPDF } from "../../utils/pdfExport";
import { MonthlyReportModal } from "../REPORT-CMP/MonthlyReportModal";

const MONTH_NAMES = ["January","February","March","April","May","June","July","August","September","October","November","December"];

export function BottomNav() {
  return (
    <nav className="bottom-nav">
      <NavLink to="/dashboard" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
        <AiOutlineHome size={22} />
        <span>Home</span>
      </NavLink>
      <NavLink to="/transactions" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
        <HiOutlineClipboardList size={22} />
        <span>Transactions</span>
      </NavLink>
      <NavLink to="/add" className="nav-item add-btn">
        <AiOutlinePlusCircle size={28} />
        <span>Add</span>
      </NavLink>
      <NavLink to="/stats" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
        <IoStatsChartOutline size={22} />
        <span>Stats</span>
      </NavLink>
      <NavLink to="/profile" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
        <AiOutlineUser size={22} />
        <span>Profile</span>
      </NavLink>
    </nav>
  )
}

export function Navbar() {
  const { currentUser, refreshUser } = useApp();
  const [reportModalOpen, setReportModalOpen] = useState(false);

  // Auth screens render Navbar before a user exists — bail out cleanly, no report logic needed there.
  if (!currentUser) {
    return (
      <div className='navbar-div'>
        <div className='navbar'>
          <img className='flux-logo' src='/IMAGES/Fluxlogo.png' />
        </div>
      </div>
    );
  }

  const { month: lm, year: ly } = getPeriodRange("last-month");
  const realTrigger = shouldShowMonthlyReport(currentUser, lm, ly) && hasMonthlyReportData(currentUser, lm, ly);
  const report = reportModalOpen ? buildMonthlyReport(currentUser, lm, ly) : null;

  const handleDownload = async () => {
    await exportMonthlyReportPDF({ user: currentUser, month: lm, year: ly, currency: currentUser.currency });
    markReportDownloaded(currentUser.username, lm, ly);
    refreshUser();
    setReportModalOpen(false);
  };

  return (
    <div className='navbar-div'>
      <div className='navbar'>
        <img className='flux-logo' src='/IMAGES/Fluxlogo.png' />

        <div className="navbar-actions">
          {realTrigger && (
            <button
              className="report-icon-btn report-icon-btn--glow"
              onClick={() => setReportModalOpen(true)}
              aria-label="Download monthly report"
            >
              <Download size={20} />
            </button>
          )}

          {/* DEV ONLY — force-opens the modal regardless of real data. Vite strips this
              out entirely in a production build, so nothing to remember to delete later. */}
          {import.meta.env.DEV && (
            <button
              className="report-icon-btn report-dev-btn"
              onClick={() => setReportModalOpen(true)}
              title="DEV: force-open monthly report"
            >
              DEV
            </button>
          )}
        </div>
      </div>

      {reportModalOpen && report && (
        <MonthlyReportModal
          onClose={() => setReportModalOpen(false)}
          onDownload={handleDownload}
          monthLabel={`${MONTH_NAMES[lm]} ${ly}`}
          report={report}
          currency={currentUser.currency}
        />
      )}
    </div>
  );
}