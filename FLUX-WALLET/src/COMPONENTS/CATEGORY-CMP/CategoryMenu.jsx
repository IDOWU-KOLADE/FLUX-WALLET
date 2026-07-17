import { Pencil, Trash2 } from "lucide-react";

/**
 * Small dropdown anchored under the tapped ellipsis button.
 * position: { top, left } in px, computed by the parent from the click event.
 * onEdit / onDelete: called with no args — parent already knows which category
 * is active (it's stored as `activeCategory` in CategoryPage's state).
 * onClose: called when the user taps outside the menu.
 */
export function CategoryMenu({ position, onEdit, onDelete, onClose }) {
  return (
    <>
      {/* invisible backdrop just to catch the "click outside to close" case */}
      <div className="category-menu-backdrop" onClick={onClose} />
      <div className="category-menu" style={{ top: position.top, left: position.left }}>
        <button type="button" className="category-menu-item" onClick={onEdit}>
          <Pencil size={16} />
          <span>Edit</span>
        </button>
        <button type="button" className="category-menu-item category-menu-item--danger" onClick={onDelete}>
          <Trash2 size={16} />
          <span>Delete</span>
        </button>
      </div>
    </>
  );
}