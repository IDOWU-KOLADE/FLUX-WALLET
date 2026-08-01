import { useState, useEffect } from "react";
import { EmojiPickerModal } from "./EmojiPickerModal";
import { EMOJI_BACKGROUNDS, DEFAULT_EMOJI_BG } from "./EmojiData";

const DEFAULT_EMOJI = { emoji: "😀", bg: "#f1f5f9" };
const MAX_NAME_LENGTH = 24; // generous enough for real category names, short enough to never break layout

export function CategoryForm({ editingCategory, existingCategories, onSubmit, onCancelEdit }) {
  const [name, setName] = useState("");
  const [icon, setIcon] = useState(DEFAULT_EMOJI);
  const [type, setType] = useState("expense");
  const [pickerOpen, setPickerOpen] = useState(false);
  const [error, setError] = useState("");

  const isEditMode = Boolean(editingCategory);

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
    setError(""); // clear any leftover error from a previous form session
  }, [editingCategory]);

  function handleSubmit(e) {
    e.preventDefault();

    const trimmedName = name.trim().replace(/\s+/g, " ");

    if (!trimmedName) {
      setError("Please enter a category name");
      return;
    }
    if (trimmedName.length > MAX_NAME_LENGTH) {
      setError(`Name must be ${MAX_NAME_LENGTH} characters or fewer`);
      return;
    }

    const isDuplicate = existingCategories.some((cat) => {
      const isSameCategory = editingCategory && cat.id === editingCategory.id;
      if (isSameCategory) return false; // don't compare against itself when editing
      return (
        cat.type === type &&
        cat.name.trim().toLowerCase() === trimmedName.toLowerCase()
      );
    });

    if (isDuplicate) {
      setError(`A ${type} category named "${trimmedName}" already exists`);
      return;
    }

    setError("");
    onSubmit({ name: trimmedName, icon, type });
  }

  return (
    <>
    <div className="category-form">
      {isEditMode && (
        <p className="category-form-editing-label">Editing: {editingCategory.name}</p>
      )}

      <form onSubmit={handleSubmit}>
        <div className="category-form-row">
          <input
            type="text"
            className="category-form-input"
            placeholder="e.g. Urgencies"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setError("");
            }}
            maxLength={MAX_NAME_LENGTH}
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
            onClick={() => { setType("expense"); setError(""); }}
          >
            Expense
          </button>
          <button
            type="button"
            className={`type-toggle-btn ${type === "income" ? "type-toggle-btn--active-income" : ""}`}
            onClick={() => { setType("income"); setError(""); }}
          >
            Income
          </button>
        </div>

        {error && <p className="category-form-error">{error}</p>}

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
            setIcon({ emoji, bg: EMOJI_BACKGROUNDS[emoji] ?? DEFAULT_EMOJI_BG });
            setPickerOpen(false);
          }}
          onClose={() => setPickerOpen(false)}
        />
      )}
    </div>
    </>
  );
}