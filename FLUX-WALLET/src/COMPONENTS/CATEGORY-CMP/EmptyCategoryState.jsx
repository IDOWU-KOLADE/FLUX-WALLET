import { Wallet } from "lucide-react";

/**
 * Shown in the "Your Categories" section when the user hasn't created any yet.
 * Mirrors the app's existing empty-state pattern (e.g. NoTransactionsCard).
 */
export function EmptyCategoriesState() {
  return (
    <div className="empty-categories">
      <div className="empty-categories-icon">
        <Wallet size={28} />
      </div>
      <p className="empty-categories-title">You haven't created any categories yet</p>
      <p className="empty-categories-subtext">
        Add your own categories to better organize your transactions.
      </p>
    </div>
  );
}