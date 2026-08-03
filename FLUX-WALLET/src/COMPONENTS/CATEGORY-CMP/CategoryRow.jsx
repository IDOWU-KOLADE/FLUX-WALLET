import { MoreVertical } from "lucide-react";

/**
 * One row in the category list. Same component for default and user categories —
 * the only difference is whether `onMenuClick` is passed (default categories get
 * no ellipsis at all, since they can't be edited/deleted).
 *
 * category: { id, name, icon: { emoji, bg }, type, isDefault, isDeleted }
 * onMenuClick(category, anchorEvent): called when the ellipsis is tapped
 */
export function CategoryRow({ category, onMenuClick }) {
  const { name, icon, type, isTransfer } = category;

  return (
    <div className="category-row">
      <div className="category-row-icon" style={{ backgroundColor: icon.bg }}>
        <span>{icon.emoji}</span>
      </div>

      <div className="category-row-main">
        <span className="category-row-name">{name}</span>
        {isTransfer && <span className="category-row-transfer-badge">Transfer</span>}
      </div>

      <span className={`category-type-tag category-type-tag--${type}`}>
        {type === "expense" ? "Expense" : "Income"}
      </span>

      {onMenuClick && (
        <button
          type="button"
          className="category-row-menu-btn"
          aria-label={`Options for ${name}`}
          onClick={(e) => onMenuClick(category, e)}
        >
          <MoreVertical size={18} />
        </button>
      )}
    </div>
  );
}