export function getStorage () {
  const data = JSON.parse(localStorage.getItem('FluxData'))
  return data? data: { users: {}, loggedInUser: null };
}

export function SetStorage (data) {
  localStorage.setItem('FluxData',JSON.stringify(data))
}
export function registerUser (username,password, securityQuestions, SecurityAnswers,) {
  const storage = getStorage()
  storage.users[username] = {
    password,
    monthlyBudget: '',
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
  const currentuser = storage.loggedInUser;
  return currentuser? {currentuser,...storage.users[currentuser]}: null;
}
export function loginUser (username, password) {
    const storage = getStorage();
    const user = storage.users[username];
    if (!user) {
      return {success: false, error: 'user not found'}
    } else {
        storage.loggedInUser= username;
        SetStorage(storage)
         return {success: true}
    }
  
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