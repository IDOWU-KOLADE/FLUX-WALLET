import { useState } from "react";
import { ChevronLeft } from "lucide-react";

import { CategoryRow } from "../COMPONENTS/CATEGORY-CMP/CategoryRow";
import { CategoryMenu } from "../COMPONENTS/CATEGORY-CMP/CategoryMenu";
import { DeleteCategoryModal } from "../COMPONENTS/CATEGORY-CMP/DeleteCategoryModal";
import { CategoryForm } from "../COMPONENTS/CATEGORY-CMP/CategoryForm";
import { EmptyCategoriesState } from "../COMPONENTS/CATEGORY-CMP/EmptyCategoryState";
import { MOCK_USER_CATEGORIES } from "../COMPONENTS/CATEGORY-CMP/MockCategories";
import { MOCK_DEFAULT_CATEGORIES } from "../COMPONENTS/CATEGORY-CMP/MockCategories";
import { Navbar } from "../COMPONENTS/FREQUENT/NB";
import { BottomNav } from "../COMPONENTS/FREQUENT/NB";
import { useApp } from "../CONTEXT/AppContext";
import { deleteCategory, editCategory, addCategory} from "../CONTEXT/UserStorage";

/**
 * Standalone Category page — UI ONLY.
 *
 * Everything here runs on local component state + mock data so the page is
 * fully clickable on its own (menu opens, delete modal confirms, edit mode
 * pre-fills the form, emoji picker swaps the icon). None of it touches
 * UserStorage.jsx or localStorage yet.
 *
 * To wire this up for real:
 *  1. Replace the two useState(MOCK_...) calls below with categories pulled
 *     from currentUser (via useApp()), split by `!isDeleted` and isDefault.
 *  2. In handleFormSubmit, call addCategory() or editCategory() depending
 *     on whether `editingCategory` is set, then refreshUser().
 *  3. In handleConfirmDelete, call deleteCategory(categoryToDelete.id),
 *     then refreshUser().
 */
export function CategoryPage() {
  // --- mock data (swap for real currentUser.categories later) ---
  const {currentUser, refreshUser} = useApp()
  const defaultCategories = currentUser.categories.filter(item => item.isDefault && !item.isDeleted )
  const userCategories = currentUser.categories.filter(item => !item.isDefault && !item.isDeleted )
  // const [defaultCategories] = useState(MOCK_DEFAULT_CATEGORIES);
  // const [userCategories, setUserCategories] = useState(MOCK_USER_CATEGORIES);

  // --- ellipsis menu state ---
  const [menuTarget, setMenuTarget] = useState(null); // category the menu is open for
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });

  // --- delete modal state ---
  const [categoryToDelete, setCategoryToDelete] = useState(null);

  // --- form state ---
  const [editingCategory, setEditingCategory] = useState(null);

  function handleMenuClick(category, event) {
    const rect = event.currentTarget.getBoundingClientRect();
    setMenuPosition({ top: rect.bottom + window.scrollY + 4, left: rect.left - 140 });
    setMenuTarget(category);
  }

  function handleEditClick() {
    setEditingCategory(menuTarget);
    setMenuTarget(null);
    // scroll to form so the user actually sees it populate — nice-to-have,
    // safe to remove if you'd rather leave scroll position alone
    document.querySelector(".category-form")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function handleDeleteClick() {
    setCategoryToDelete(menuTarget);
    setMenuTarget(null);
  }

  function handleConfirmDelete() {
    deleteCategory(currentUser.username, categoryToDelete.id);
    refreshUser();
    setCategoryToDelete(null);
  }

  function handleFormSubmit(formValues) {
    if (editingCategory) {
       editCategory(currentUser.username, editingCategory.id, formValues)
    } else {
        addCategory(currentUser.username, formValues.name, formValues.icon, formValues.type)
      };
      refreshUser();
      setEditingCategory(null)
    }
  

  return (
    <>
    <Navbar/>
    <div className="category-page">
      <section className="category-section">
        <h2 className="category-section-label">Default Categories</h2>
        {defaultCategories.map((cat) => (
          <CategoryRow key={cat.id} category={cat} />
        ))}
      </section>

      <section className="category-section">
        <h2 className="category-section-label">Your Categories</h2>
        {userCategories.length === 0 ? (
          <EmptyCategoriesState />
        ) : (
          userCategories.map((cat) => (
            <CategoryRow key={cat.id} category={cat} onMenuClick={handleMenuClick} />
          ))
        )}
      </section>

      <section className="category-section">
        <CategoryForm
          editingCategory={editingCategory}
          onSubmit={handleFormSubmit}
          onCancelEdit={() => setEditingCategory(null)}
        />
      </section>

      {menuTarget && (
        <CategoryMenu
          position={menuPosition}
          onEdit={handleEditClick}
          onDelete={handleDeleteClick}
          onClose={() => setMenuTarget(null)}
        />
      )}

      {categoryToDelete && (
        <DeleteCategoryModal
          category={categoryToDelete}
          onConfirm={handleConfirmDelete}
          onCancel={() => setCategoryToDelete(null)}
        />
      )}
    </div>
    <BottomNav/>
    </>
  );
}
