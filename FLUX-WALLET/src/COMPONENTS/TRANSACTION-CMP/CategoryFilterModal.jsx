import { useState, useEffect } from "react";
import { X } from "lucide-react";

export function CategoryFilterModal({ isOpen, onClose, categories, initialSelected, onApply }) {
  const [pending, setPending] = useState(initialSelected);


  useEffect(() => {
    if (isOpen) setPending(initialSelected);
  }, [isOpen]);

  if (!isOpen) return null;

  const toggle = (id) => {
    setPending((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="category-filter-modal" onClick={(e) => e.stopPropagation()}>
        <div className="category-filter-modal-header">
          <h3>Filter by Category</h3>
          <button onClick={onClose} aria-label="Close">
            <X size={20} />
          </button>
        </div>

        <div className="category-filter-modal-grid">
          {categories.map((cat) => {
            const active = pending.includes(cat.id);
            return (
              <button
                key={cat.id}
                className={`category-filter-chip ${active ? "category-filter-chip--active" : ""}`}
                onClick={() => toggle(cat.id)}
              >
                <span className="category-filter-chip-emoji" style={{ backgroundColor: cat.icon.bg }}>
                  {cat.icon.emoji}
                </span>
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>

        <div className="category-filter-modal-footer">
          <button
            className="category-filter-apply-btn"
            onClick={() => {
              onApply(pending);
              onClose();
            }}
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
}