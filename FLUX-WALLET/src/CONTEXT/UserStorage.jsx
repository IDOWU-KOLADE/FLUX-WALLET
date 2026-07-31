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
    securityQuestions,
    securityAnswers,
    transactions: [],
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
export function getCurrentUser () {
  const storage = getStorage();
  const username = storage.loggedInUser;
  return username? {username,...storage.users[username]}: null;
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


export function addCategory (username, name, icon, type) {
    const storage = getStorage();
    const newCategory = {id:crypto.randomUUID(), name, icon ,type,isDefault:false, isDeleted: false}
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

export function switchUser(username) {
  const storage = getStorage();
  storage.loggedInUser = username;
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