import { X } from "lucide-react";
import { CategoryRow } from "./CategoryRow";

/**
 * Popup for picking a category on the Add Transaction form.
 * Same overlay/modal pattern as EmojiPickerModal, but listing categories
 * instead of emojis — reuses CategoryRow so a category looks identical
 * everywhere in the app (this modal, the Category page, etc).
 *
 * categories: already filtered by the caller (matching the current
 *   Expense/Income toggle, and !isDeleted) — this component doesn't
 *   filter anything itself, it just renders what it's given.
 * onSelect(category): called when a row is tapped.
 * onManageCategories(): called when "Manage categories" is tapped —
 *   wire this to navigate('/categories') in the parent.
 * onClose(): backdrop or X tap.
 */
export function CategoryPickerModal({ categories, onSelect, onManageCategories, onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="category-picker" onClick={(e) => e.stopPropagation()}>
        <div className="category-picker-header">
          <h3>Choose a category</h3>
          <button type="button" className="category-picker-close" onClick={onClose} aria-label="Close">
            <X size={20} />
          </button>
        </div>

        <div className="category-picker-list">
          {categories.length === 0 ? (
            <p className="category-picker-empty">No categories yet for this type.</p>
          ) : (
            categories.map((cat) => (
              <button
                type="button"
                key={cat.id}
                className="category-picker-row-btn"
                onClick={() => onSelect(cat)}
              >
                <CategoryRow category={cat} />
              </button>
            ))
          )}
        </div>
          <button type="button" className="category-picker-manage-btn" onClick={onManageCategories}>
            Can&apos;t find it? Manage categories →
          </button>
      </div>
    </div>
  );
}