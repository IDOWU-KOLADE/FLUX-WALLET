import { useState, useEffect } from "react";
import EmojiPickerModal from "./EmojiPickerModal";

const DEFAULT_EMOJI = { emoji: "😀", bg: "#f1f5f9" };

/**
 * Add/Edit category form. One component, two modes — mode is derived from
 * whether `editingCategory` is set, matching the "editing X" label pattern
 * in the reference design rather than being a separate screen.
 *
 * editingCategory: category being edited, or null when in "add" mode.
 * onSubmit(formValues): called with { name, icon, type } — parent decides
 *   whether that means addCategory() or editCategory() later. No storage
 *   call happens here.
 * onCancelEdit(): called when the "Cancel" link is tapped in edit mode.
 */
export function CategoryForm({ editingCategory, onSubmit, onCancelEdit }) {
  const [name, setName] = useState("");
  const [icon, setIcon] = useState(DEFAULT_EMOJI);
  const [type, setType] = useState("expense");
  const [pickerOpen, setPickerOpen] = useState(false);

  const isEditMode = Boolean(editingCategory);

  // Whenever the parent hands us a new category to edit (or clears it back
  // to null), sync the form fields to match. This is what makes tapping
  // "Edit" on a different row instantly re-populate the same form.
  useEffect(() => {
    if (editingCategory) {
      setName(editingCategory.name);
      setIcon(editingCategory.icon);
      setType(editingCategory.type);
    } else {
      setName("");
      setIcon(DEFAULT_EMOJI);
      setType("expense");
    }
  }, [editingCategory]);

  function handleSubmit(e) {
    e.preventDefault();
    if (!name.trim()) return; // basic guard, no toast/error UI wired up yet
    onSubmit({ name: name.trim(), icon, type });
  }

  return (
    <div className="category-form">
      {isEditMode && (
        <p className="category-form-editing-label">Editing: {editingCategory.name}</p>
      )}

      <form onSubmit={handleSubmit}>
        <div className="category-form-row">
          <input
            type="text"
            className="category-form-input"
            placeholder="e.g. Coffee, Gifts, Salary"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button
            type="button"
            className="category-form-emoji-btn"
            style={{ backgroundColor: icon.bg }}
            onClick={() => setPickerOpen(true)}
            aria-label="Choose emoji"
          >
            {icon.emoji}
          </button>
        </div>

        <span className="category-form-label">Type</span>
        <div className="type-toggle">
          <button
            type="button"
            className={`type-toggle-btn ${type === "expense" ? "type-toggle-btn--active-expense" : ""}`}
            onClick={() => setType("expense")}
          >
            Expense
          </button>
          <button
            type="button"
            className={`type-toggle-btn ${type === "income" ? "type-toggle-btn--active-income" : ""}`}
            onClick={() => setType("income")}
          >
            Income
          </button>
        </div>

        {isEditMode ? (
          <div className="category-form-edit-actions">
            <button type="button" className="btn-text" onClick={onCancelEdit}>
              Cancel
            </button>
            <button type="submit" className="btn btn--primary">
              Save Changes
            </button>
          </div>
        ) : (
          <button type="submit" className="btn btn--primary btn--full">
            Add Category
          </button>
        )}
      </form>

      {pickerOpen && (
        <EmojiPickerModal
          selectedEmoji={icon.emoji}
          onSelect={(emoji) => {
            // bg stays whatever it was, or falls back to a neutral tint —
            // wire this to your real palette-per-emoji logic when you connect it
            setIcon((prev) => ({ emoji, bg: prev.bg }));
            setPickerOpen(false);
          }}
          onClose={() => setPickerOpen(false)}
        />
      )}
    </div>
  );
}