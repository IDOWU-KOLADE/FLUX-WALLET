import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { CategoryPickerModal } from './CategoryPickerModal'

/**
 * The tappable "Cat\ egory" field on the Add Transaction form.
 * Opens CategoryPickerModal, shows the chosen category's icon+name once picked.
 *
 * allCategories: the user's full categories array (currentUser.categories) —
 *   filtering by type + !isDeleted happens inside this component, not the caller,
 *   so the parent form doesn't need to know about that rule.
 * transactionType: "expense" | "income" — comes from the parent's toggle state.
 * selectedCategory: the currently chosen category object, or null.
 * onChange(category): called when the user picks one.
 *
 * IMPORTANT: if transactionType changes (user flips the Expense/Income toggle)
 * and the currently selected category no longer matches, the PARENT should
 * clear selectedCategory back to null — this component doesn't own that
 * decision since it doesn't control the toggle. See usage note at bottom.
 */
export function CategoryField({ allCategories, transactionType, selectedCategory, onChange }) {
  const [pickerOpen, setPickerOpen] = useState(false);
  const navigate = useNavigate();

  const filteredCategories = allCategories.filter(
    (cat) => cat.type === transactionType && !cat.isDeleted
  );

  return (
    <div className="category-field">
      <span className="category-form-label">Category</span>

      <button
        type="button"
        className="category-field-trigger"
        onClick={() => setPickerOpen(true)}
      >
        {selectedCategory ? (
          <span className="category-field-selected">
            <span
              className="category-field-icon"
              style={{ backgroundColor: selectedCategory.icon.bg }}
            >
              {selectedCategory.icon.emoji}
            </span>
            {selectedCategory.name}
          </span>
        ) : (
          <span className="category-field-placeholder">Select a category</span>
        )}
        <ChevronDown size={18} />
      </button>

      {pickerOpen && (
        <CategoryPickerModal
          categories={filteredCategories}
          onSelect={(cat) => {
            onChange(cat);
            setPickerOpen(false);
          }}
          onManageCategories={() => {
            setPickerOpen(false); 
            navigate("/category");
          }}
          onClose={() => setPickerOpen(false)}
        />
      )}
    </div>
  );
}

/*
USAGE NOTE — auto-clear on type toggle, handled in the PARENT (AddTransactionPage):

useEffect(() => {
  if (selectedCategory && selectedCategory.type !== transactionType) {
    setSelectedCategory(null);
  }
}, [transactionType]);

This is what stops a stale Expense category from silently staying selected
after the user flips the toggle to Income (or vice versa).
*/