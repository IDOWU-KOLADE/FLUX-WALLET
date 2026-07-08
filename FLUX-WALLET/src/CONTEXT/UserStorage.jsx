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
    monthlyBudget: '',
    currency: 'NGN',
    securityQuestions,
    securityAnswers,
    transactions: [],
    categories: {
      expense: ["Food & Groceries", "Transport", "Bills & Utilities", "Entertainment", "Others"],
      income: ["Salary", "Freelance", "Investment", "Other Income"]
    }
  };
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
export const resetPassword = (username, newPassword) => {
  const storage = getStorage();
  storage.users[username].password = newPassword;
  SetStorage(storage);
}; 