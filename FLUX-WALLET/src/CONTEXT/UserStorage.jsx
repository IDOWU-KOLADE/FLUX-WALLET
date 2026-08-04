import { EMOJI_BACKGROUNDS, DEFAULT_EMOJI_BG } from "../COMPONENTS/CATEGORY-CMP/EmojiData";
export function getStorage () {
  const data = JSON.parse(localStorage.getItem('FluxData'))
  return data? data: { users: {}, loggedInUser: null };
}
export const formatUsername = (name) => {
  return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
}
export function SetStorage (data) {
  localStorage.setItem('FluxData',JSON.stringify(data))
}
export function registerUser (username,password, securityQuestions, securityAnswers,) {
  const storage = getStorage()
  storage.users[username] = {
    password,
    monthlyBudget: null,
    currency: 'NGN',
    profilePicture: null,
    securityQuestions,
    securityAnswers,
    hasSeenWelcome: false,
    transactions: [],
    budgetHistory: [],  
          
    lastReportDownloadedMonth: null,   
    categories:  [
    // Expense categories (5)
    { id: crypto.randomUUID(), name: "Food & Groceries", icon: {emoji:"🍔", bg: "#fff3e0"}, type: "expense", isDefault: true, isDeleted: false },
    { id: crypto.randomUUID(), name: "Transport",         icon: { emoji: "🚗", bg: "#e3f2fd" }, type: "expense", isDefault: true, isDeleted: false },
    { id: crypto.randomUUID(), name: "Entertainment",     icon: { emoji: "🎬", bg: "#f3e5f5" }, type: "expense", isDefault: true, isDeleted: false },
    { id: crypto.randomUUID(), name: "Bills & Utilities", icon: { emoji: "💡", bg: "#e8f5e9" }, type: "expense", isDefault: true, isDeleted: false },
    { id: crypto.randomUUID(), name: "Other",             icon: { emoji: "🧾", bg: "#f1f5f9" }, type: "expense", isDefault: true, isDeleted: false },

    // Income categories (4)
    { id: crypto.randomUUID(), name: "Salary",    icon: { emoji: "💰", bg: "#fff9db" }, type: "income", isDefault: true, isDeleted: false },
    { id: crypto.randomUUID(), name: "Freelance",  icon: { emoji: "💻", bg: "#e0e7ff" }, type: "income", isDefault: true, isDeleted: false },
    { id: crypto.randomUUID(), name: "Gifts",      icon: { emoji: "🎁", bg: "#fce7f3" }, type: "income", isDefault: true, isDeleted: false },
    { id: crypto.randomUUID(), name: "Other",      icon: { emoji: "💵", bg: "#dcfce7" }, type: "income", isDefault: true, isDeleted: false },
  ]
}
  SetStorage(storage)
}
const TRANSFER_DEFAULTS = [
  { name: "Lending", icon: { emoji: "🤝", bg: "#cffafe" }, type: "expense" },
  { name: "Savings", icon: { emoji: "🏦", bg: "#ede9fe" }, type: "expense" },
  { name: "Loan Repayment", icon: { emoji: "💰", bg: "#d1fae5" }, type: "income" },
];

// Heals any account — brand new or years old — that's missing one or more of the
// transfer categories. Runs inside getCurrentUser() below, so there's no separate
// migration step to remember to run; it just self-corrects on every load.
function ensureTransferCategories(username) {
  const storage = getStorage();
  const user = storage.users[username];
  if (!user) return;

  const existingNames = user.categories.map((c) => c.name.toLowerCase());
  const missing = TRANSFER_DEFAULTS.filter(
    (def) => !existingNames.includes(def.name.toLowerCase())
  );
  if (missing.length === 0) return;

  const newCategories = missing.map((def) => ({
    id: crypto.randomUUID(),
    name: def.name,
    icon: def.icon,
    type: def.type,
    isDefault: true,
    isDeleted: false,
    isTransfer: true,
  }));

  user.categories = [...user.categories, ...newCategories];
  SetStorage(storage);
}
export function getCurrentUser () {
 const storage = getStorage();
 const username = storage.loggedInUser;
 if (username) ensureTransferCategories(username);
 const freshStorage = getStorage(); // re-read in case the heal above just wrote new data
 return username? {username,...freshStorage.users[username]}: null;
}
export function loginUser (username, password) {
    const storage = getStorage();
    const user = storage.users[username];
    if (!user) {
      return {success: false, error: 'user not found'}
    }
  if (user.password !== password) return { success: false, error: 'Wrong password' };
  storage.loggedInUser = username;
  SetStorage(storage);
  return { success: true, error: null};
  
}
export function logoutUser () {
    const storage = getStorage();
  storage.loggedInUser = null;
  SetStorage(storage);


}


export function addCategory (username, name, icon, type, isTransfer = false) {
 const storage = getStorage();
 const newCategory = {id:crypto.randomUUID(), name, icon ,type,isDefault:false, isDeleted: false, isTransfer}
 storage.users[username].categories = [...storage.users[username].categories, newCategory];
 SetStorage(storage)
}
export function editCategory (username, id, updates) {
      const storage = getStorage();
      storage.users[username].categories = storage.users[username].categories.map((cat) =>
        cat.id === id ? { ...cat, ...updates } : cat
      );
      SetStorage(storage);
}
export function deleteCategory(username, id) {
  const storage = getStorage();
  storage.users[username].categories = storage.users[username].categories.map((cat) =>
    cat.id === id ? { ...cat, isDeleted: true } : cat
  );
  SetStorage(storage);
}
export function addTransaction (username,{type,amount,description,categoryId,date,notes}) {
    const storage = getStorage();
    const newTransaction = {
        id: crypto.randomUUID(),
        type,
        amount: Number(amount), 
        description,
        categoryId,
        date,
        notes,
          };
      storage.users[username].transactions= [...storage.users[username].transactions, newTransaction];
      SetStorage(storage);
}


export function normalizeAnswer(answer) {
  return answer.trim().toLowerCase().replace(/\s+/g, " ");
}
export function findUserByUsername(username) {
  const storage = getStorage();
  return storage.users[username] ?? null;
}
export const resetPassword = (username, newPassword) => {
  const storage = getStorage();
  if (!storage.users[username]) return false;
  storage.users[username].password = newPassword;
  SetStorage(storage);
  return true;
};
// "YYYY-MM" — same key shape used to compare budget-history entries and to stamp
// "last report downloaded" against, so both features speak the same language.
export function budgetKey(month, year) {
  return `${year}-${String(month + 1).padStart(2, "0")}`;
}

// Sets (or replaces) the budget entry for the CURRENT real-world month.
// Editing your budget twice in the same month updates that one entry, not two.
export function setMonthlyBudget(username, amount) {
  const storage = getStorage();
  const user = storage.users[username];
  const now = new Date();
  const history = user.budgetHistory ?? [];

  // MIGRATION: the very first edit made under the new history system needs to preserve
  // whatever the OLD flat value was — otherwise it's silently lost the moment someone
  // edits for the first time, and every past month incorrectly looks like "no budget set."
  // Dated far in the past on purpose, so it's always the fallback answer for any month
  // that doesn't have a more specific, later entry.
  if (history.length === 0 && user.monthlyBudget != null) {
    history.push({ amount: user.monthlyBudget, month: 0, year: 1970 });
  }

  const entry = { amount: Number(amount), month: now.getMonth(), year: now.getFullYear() };
  const existingIndex = history.findIndex((e) => e.month === entry.month && e.year === entry.year);
  user.budgetHistory = existingIndex >= 0
    ? history.map((e, i) => (i === existingIndex ? entry : e))
    : [...history, entry];

  user.monthlyBudget = entry.amount;
  SetStorage(storage);
}

// Finds whatever budget was actually in effect for a given month/year —
// the most recent history entry dated ON OR BEFORE that month, carrying forward
// until a newer entry appears. Falls back to the plain monthlyBudget field for
// accounts that predate budgetHistory entirely.
export function getEffectiveBudget(user, month, year) {
  const history = Array.isArray(user?.budgetHistory) ? user.budgetHistory : [];
  const applicable = history
    .filter((e) => e.year < year || (e.year === year && e.month <= month))
    .sort((a, b) => (b.year - a.year) || (b.month - a.month));

  if (applicable.length > 0) return applicable[0].amount;
  if (history.length === 0) return user?.monthlyBudget ?? null;
  return null;
}

// Does a given month have enough real data to justify a report at all?
export function hasMonthlyReportData(user, month, year) {
  const hasTransactions = (user?.transactions ?? []).some((t) => {
    const d = new Date(t.date);
    return d.getMonth() === month && d.getFullYear() === year;
  });
  const hasBudget = getEffectiveBudget(user, month, year) != null;
  return hasTransactions && hasBudget;
}

// Has THIS specific month's report already been downloaded/claimed?
export function shouldShowMonthlyReport(user, month, year) {
  return user?.lastReportDownloadedMonth !== budgetKey(month, year);
}

export function markReportDownloaded(username, month, year) {
  const storage = getStorage();
  storage.users[username].lastReportDownloadedMonth = budgetKey(month, year);
  SetStorage(storage);
}
export function setProfilePicture(username, base64Image) {
  const storage = getStorage();
  storage.users[username].profilePicture = base64Image;
  SetStorage(storage);
}
export function editTransaction(username, transactionId, updates) {
  const storage = getStorage();
  storage.users[username].transactions = storage.users[username].transactions.map((t) =>
    t.id === transactionId ? { ...t, ...updates } : t
  );
  SetStorage(storage);
}

export function deleteTransaction(username, transactionId) {
  const storage = getStorage();
  storage.users[username].transactions = storage.users[username].transactions.filter(
    (t) => t.id !== transactionId
  );
  SetStorage(storage);
}
// registerUser — add alongside the other new fields:


// New helpers:
export function shouldShowWelcome(user) {
  return !user?.hasSeenWelcome;
}

export function markWelcomeShown(username) {
  const storage = getStorage();
  storage.users[username].hasSeenWelcome = true;
  SetStorage(storage);
}