import { useState, useMemo, useRef } from "react";
import { useNavigate, useLocation} from "react-router-dom";
import { Search, Menu, CalendarDays, Download } from "lucide-react";
import { useApp } from "../CONTEXT/AppContext";

import { DownloadConfirmModal } from "../COMPONENTS/TRANSACTION-CMP/DownloadConfirmModal";
import { exportTransactionsPDF, buildFilterSummary,buildFilename } from "../utils/pdfExport";
import { CategoryFilterRow } from "../COMPONENTS/TRANSACTION-CMP/CategoryFilterRow";
import { JumpToDateModal } from "../COMPONENTS/TRANSACTION-CMP/JumpToDateModal";
import { TransactionRow } from "../COMPONENTS/TRANSACTION-CMP/TransactionRow";
import { TransactionDetailsSheet } from "../COMPONENTS/TRANSACTION-CMP/TransactionDetailsSheet";
import { EmptyTransactionsState } from "../COMPONENTS/TRANSACTION-CMP/EmptyTransactionsState";
import { Navbar, BottomNav } from "../COMPONENTS/FREQUENT/NB";
import {CategoryFilterModal} from "../COMPONENTS/TRANSACTION-CMP/CategoryFilterModal"
import { TypeTabs } from "../COMPONENTS/TRANSACTION-CMP/TypeTabs";
const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

function getMostRecentDate(transactions) {
  if (!transactions.length) return new Date();
  return transactions.reduce(
    (latest, t) => (new Date(t.date) > latest ? new Date(t.date) : latest),
    new Date(transactions[0].date)
  );
}

export function Transactions() {
  const { currentUser } = useApp();
  const navigate = useNavigate();
  const location = useLocation();
const incoming = location.state ?? {};
  const searchInputRef = useRef(null);

  const allTransactions = currentUser?.transactions ?? [];
  const allCategories = currentUser?.categories ?? []; // for LOOKUP — includes deleted, so history stays intact
  const selectableCategories = allCategories.filter((c) => !c.isDeleted); // for PICKING — filters/pickers only ever offer these

  const [activeTab, setActiveTab] = useState(incoming.type ?? "all");
  const [selectedCategoryIds, setSelectedCategoryIds] = useState(
    incoming.categoryId ? [incoming.categoryId] : []
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [dateModalOpen, setDateModalOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
 const [downloadModalOpen, setDownloadModalOpen] = useState(false);

  const mostRecent = getMostRecentDate(allTransactions);
  const [currentMonth, setCurrentMonth] = useState(incoming.month ?? mostRecent.getMonth());
  const [currentYear, setCurrentYear] = useState(incoming.year ?? mostRecent.getFullYear());

  const availableYears = useMemo(
    () => [...new Set(allTransactions.map((t) => new Date(t.date).getFullYear()))].sort((a, b) => a - b),
    [allTransactions]
  );
  // Jump-to-date needs at least one year to scroll to, even for a brand new user.
  const yearOptions = availableYears.length ? availableYears : [mostRecent.getFullYear()];

  const typeFilteredCategories = useMemo(
    () => selectableCategories.filter((c) => activeTab === "all" || c.type === activeTab),
    [selectableCategories, activeTab]
  );


    const handleTabChange = (tab) => {
      setActiveTab(tab);
      setSelectedCategoryIds((prev) =>
        prev.filter((id) => {
          const cat = allCategories.find((c) => c.id === id); // was: categories
          return cat && (tab === "all" || cat.type === tab);
        })
      );
    };
      const handleDownload = (filename) => {
        exportTransactionsPDF({
          transactions: filteredTransactions,
          categories: allCategories, // was: categories
          currency: currentUser.currency,
          activeTab,
          selectedCategoryIds,
          currentMonth,
          currentYear,
          overrideFilename: filename,
        });
        setDownloadModalOpen(false);
      };

const filteredTransactions = useMemo(() => {
  return allTransactions
    .map((t, index) => ({ ...t, __index: index })) // tag original position before sorting
    .filter((t) => {
      if (activeTab !== "all" && t.type !== activeTab) return false;
      if (selectedCategoryIds.length && !selectedCategoryIds.includes(t.categoryId)) return false;
      const d = new Date(t.date);
      if (d.getMonth() !== currentMonth || d.getFullYear() !== currentYear) return false;
      if (searchQuery.trim() && !t.description.toLowerCase().includes(searchQuery.trim().toLowerCase())) return false;
      return true;
    })
    .sort((a, b) => {
      const dateDiff = new Date(b.date) - new Date(a.date);
      if (dateDiff !== 0) return dateDiff;
      return b.__index - a.__index; // same day: later-added (higher index) shows first
    });
}, [allTransactions, activeTab, selectedCategoryIds, currentMonth, currentYear, searchQuery]);

  const hasAnyTransactions = allTransactions.length > 0;
  let emptyMessage = null;
  let showCta = false;

  if (!hasAnyTransactions) {
    emptyMessage = "Start by adding your first transaction to keep track of your finances.";
    showCta = true;
  } else if (filteredTransactions.length === 0) {
    if (searchQuery.trim()) emptyMessage = "No transactions match your search";
    else if (selectedCategoryIds.length) emptyMessage = "No transactions match your filters";
    else emptyMessage = "No transactions this month";
  }

  const monthLabel = `${MONTH_NAMES[currentMonth]} ${currentYear}`;

  return (
    <div className="transactions-page">
      {/* <div className="transactions-topbar">
        <Menu size={22} />
        <h1>Transactions</h1>
        <button onClick={() => searchInputRef.current?.focus()} aria-label="Search">
          <Search size={20} />
        </button>
      </div> */}
      <Navbar/>


      <div className="transactions-filters-wrap">
        <TypeTabs activeTab={activeTab} onChange={handleTabChange} />
        <CategoryFilterRow
          categories={typeFilteredCategories}
          selectedCategoryIds={selectedCategoryIds}
          onOpenModal={() => setCategoryModalOpen(true)}
          onRemoveCategory={(id) => setSelectedCategoryIds((prev) => prev.filter((x) => x !== id))}
        />
      </div>
      

<div className="transactions-searchbar-wrap">
  <div className="transactions-searchbar">
    <Search size={16} className="transactions-searchbar-icon" />
    <input
      ref={searchInputRef}
      type="text"
      placeholder="Search transactions..."
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
    />
  </div>
  <button
    className="transactions-download-btn"
    onClick={() => setDownloadModalOpen(true)}
    disabled={filteredTransactions.length === 0}
    aria-label="Download as PDF"
  >
    <Download size={18} />
  </button>
</div>

      <div className="transactions-list-container">
        <div className="transactions-list-header">
          <span className="transactions-month-label">{monthLabel}</span>
          <button className="transactions-jump-btn" onClick={() => setDateModalOpen(true)}>
            <CalendarDays size={16} />
            <span>Jump to date</span>
          </button>
        </div>

        <div className="transactions-list-scroll">
          {emptyMessage ? (
            <EmptyTransactionsState
              message={emptyMessage}
              showCta={showCta}
              onCtaClick={() => navigate("/add")}
            />
          ) : (
            filteredTransactions.map((t) => (
              <TransactionRow
                key={t.id}
                transaction={t}
                category={allCategories.find((c) => c.id === t.categoryId)}
                currency={currentUser.currency}
                onClick={() => setSelectedTransaction(t)}
              />
            ))
          )}
        </div>
      </div>

      <CategoryFilterModal
        isOpen={categoryModalOpen}
        onClose={() => setCategoryModalOpen(false)}
        categories={typeFilteredCategories}
        initialSelected={selectedCategoryIds}
        onApply={setSelectedCategoryIds}
      />
      <DownloadConfirmModal
        isOpen={downloadModalOpen}
        onClose={() => setDownloadModalOpen(false)}
        onConfirm={handleDownload}
        summary={buildFilterSummary(activeTab, selectedCategoryIds, allCategories)}
        count={filteredTransactions.length}
        defaultFilename={buildFilename({ activeTab, selectedCategoryIds, categories: allCategories, currentMonth, currentYear })}
      />
      <JumpToDateModal
        isOpen={dateModalOpen}
        onClose={() => setDateModalOpen(false)}
        availableYears={yearOptions}
        currentMonth={currentMonth}
        currentYear={currentYear}
        onSave={(month, year) => {
          setCurrentMonth(month);
          setCurrentYear(year);
        }}
      />

      {selectedTransaction && (
        <TransactionDetailsSheet
          transaction={selectedTransaction}
          category={allCategories.find((c) => c.id === selectedTransaction.categoryId)}
          currency={currentUser.currency}
          onClose={() => setSelectedTransaction(null)}
        />
      )}

      <BottomNav />
    </div>
  );
}