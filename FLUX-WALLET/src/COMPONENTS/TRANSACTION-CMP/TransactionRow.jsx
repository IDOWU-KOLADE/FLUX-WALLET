import { useState, useRef } from "react";
import { createPortal } from "react-dom";
import { MoreHorizontal } from "lucide-react";
import { formatAmount } from "../../utils/currency";

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

const MENU_WIDTH = 120;
const MENU_HEIGHT = 84; // approx height of the 2-item popup
const BOTTOM_NAV_HEIGHT = 79; // matches .transactions-page's padding-bottom in Transactions.css

export function TransactionRow({ transaction, category, currency, onClick, onEdit, onDelete }) {
  const isIncome = transaction.type === "income";
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
  const menuBtnRef = useRef(null);

  const openMenu = (e) => {
    e.stopPropagation();
    const rect = menuBtnRef.current.getBoundingClientRect();

    // Default: open below the button. If that would land under/behind the
    // fixed BottomNav, flip it to open ABOVE the button instead.
    let top = rect.bottom + 4;
    if (top + MENU_HEIGHT > window.innerHeight - BOTTOM_NAV_HEIGHT) {
      top = rect.top - MENU_HEIGHT - 4;
    }

    let left = rect.right - MENU_WIDTH;
    if (left < 8) left = 8; // don't let it run off the left edge on narrow screens

    setMenuPosition({ top, left });
    setMenuOpen(true);
  };

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

      <div className="transaction-row-menu-wrap">
        <button
          ref={menuBtnRef}
          className="transaction-row-menu-btn"
          onClick={openMenu}
          aria-label="Transaction options"
        >
          <MoreHorizontal size={18} />
        </button>

        {menuOpen && createPortal(
          <>
            <div
              className="transaction-menu-overlay"
              onClick={(e) => { e.stopPropagation(); setMenuOpen(false); }}
            />
            <div
              className="transaction-menu-popup"
              style={{ position: "fixed", top: menuPosition.top, left: menuPosition.left }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="transaction-menu-item"
                onClick={() => { setMenuOpen(false); onEdit(transaction); }}
              >
                Edit
              </button>
              <button
                className="transaction-menu-item transaction-menu-item--danger"
                onClick={() => { setMenuOpen(false); onDelete(transaction); }}
              >
                Delete
              </button>
            </div>
          </>,
          document.body
        )}
      </div>
    </div>
  );
}