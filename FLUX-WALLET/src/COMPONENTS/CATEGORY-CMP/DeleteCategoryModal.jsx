/**
 * Confirmation modal shown before a user category is deleted.
 * category: the category being deleted (used for the emoji + name in the message).
 * onConfirm / onCancel: parent wires these to the real deleteCategory() later —
 * here they're just passed through, no localStorage call happens in this file.
 */
export function DeleteCategoryModal({ category, onConfirm, onCancel }) {
  if (!category) return null;

  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="delete-modal" onClick={(e) => e.stopPropagation()}>
        <div className="delete-modal-icon" style={{ backgroundColor: category.icon.bg }}>
          <span>{category.icon.emoji}</span>
        </div>

        <h3 className="delete-modal-title">Delete {category.name}?</h3>
        <p className="delete-modal-subtext">
          Past transactions using this category will be unaffected.
        </p>

        <div className="delete-modal-actions">
          <button type="button" className="btn btn--neutral" onClick={onCancel}>
            Cancel
          </button>
          <button type="button" className="btn btn--danger" onClick={onConfirm}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}