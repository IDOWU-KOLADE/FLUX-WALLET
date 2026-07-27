import { SlidersHorizontal, X } from "lucide-react";

// categories here are already filtered to the active tab's type by the parent.
export function CategoryFilterRow({ categories, selectedCategoryIds, onOpenModal, onRemoveCategory }) {
  const selectedCategories = selectedCategoryIds
    .map((id) => categories.find((c) => c.id === id))
    .filter(Boolean); // drop ids that no longer match (auto-clear already handles this, but stay safe)

  const isActive = selectedCategoryIds.length > 0;

  return (
    <div className="category-filter-row">
      <button
        className={`category-trigger-chip ${isActive ? "category-trigger-chip--active" : ""}`}
        onClick={onOpenModal}
      >
        <SlidersHorizontal size={14} />
        <span>Category</span>
      </button>

      {selectedCategories.map((cat) => (
        <div key={cat.id} className="category-selected-chip">
          <span className="category-selected-chip-emoji">{cat.icon.emoji}</span>
          <span>{cat.name}</span>
          <button
            className="category-selected-chip-remove"
            onClick={() => onRemoveCategory(cat.id)}
            aria-label={`Remove ${cat.name} filter`}
          >
            <X size={12} />
          </button>
        </div>
      ))}
    </div>
  );
}