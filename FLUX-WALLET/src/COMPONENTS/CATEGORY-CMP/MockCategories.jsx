// Standalone mock data so this page renders realistically on its own.
// Delete this file once CategoryPage is wired to real UserStorage.jsx data —
// swap the two useState calls in CategoryPage.jsx to pull from currentUser.categories instead.

export const MOCK_DEFAULT_CATEGORIES = [
  { id: "d1", name: "Food & Groceries", icon: { emoji: "🍔", bg: "#fff3e0" }, type: "expense", isDefault: true, isDeleted: false },
  { id: "d2", name: "Transport", icon: { emoji: "🚗", bg: "#e3f2fd" }, type: "expense", isDefault: true, isDeleted: false },
  { id: "d3", name: "Bills & Utilities", icon: { emoji: "💡", bg: "#e8f5e9" }, type: "expense", isDefault: true, isDeleted: false },
  { id: "d4", name: "Entertainment", icon: { emoji: "🎬", bg: "#f3e5f5" }, type: "expense", isDefault: true, isDeleted: false },
  { id: "d5", name: "Other", icon: { emoji: "🧾", bg: "#f1f5f9" }, type: "expense", isDefault: true, isDeleted: false },
  { id: "d6", name: "Salary", icon: { emoji: "💰", bg: "#fff9db" }, type: "income", isDefault: true, isDeleted: false },
  { id: "d7", name: "Freelance", icon: { emoji: "💻", bg: "#e0e7ff" }, type: "income", isDefault: true, isDeleted: false },
];

export const MOCK_USER_CATEGORIES = [
  { id: "u1", name: "Gifts", icon: { emoji: "🎁", bg: "#fce7f3" }, type: "expense", isDefault: false, isDeleted: false },
  { id: "u2", name: "Education", icon: { emoji: "🎓", bg: "#e0e7ff" }, type: "expense", isDefault: false, isDeleted: false },
  { id: "u3", name: "Investments", icon: { emoji: "📈", bg: "#dcfce7" }, type: "income", isDefault: false, isDeleted: false },
  { id: "u4", name: "Health", icon: { emoji: "❤️", bg: "#fce7f3" }, type: "expense", isDefault: false, isDeleted: false },
];

// Use this when testing the empty state — pass [] as MOCK_USER_CATEGORIES instead.