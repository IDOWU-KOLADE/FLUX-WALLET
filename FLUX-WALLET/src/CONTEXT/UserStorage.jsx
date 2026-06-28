// src/CONTEXT/UserStorage.jsx

export const getStorage = () => {
  const data = localStorage.getItem("fluxData");
  return data ? JSON.parse(data) : { users: {}, loggedInUser: null };
};

export const saveStorage = (data) => {
  localStorage.setItem("fluxData", JSON.stringify(data));
};

export const registerUser = (username, password, securityQuestions, securityAnswers) => {
  const storage = getStorage();
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
  saveStorage(storage);
};

export const loginUser = (username, password) => {
  const storage = getStorage();
  const user = storage.users[username];
  if (!user) return { success: false, error: "Username not found" };
  if (user.password !== password) return { success: false, error: "Wrong password" };
  storage.loggedInUser = username;
  saveStorage(storage);
  return { success: true };
};

export const logoutUser = () => {
  const storage = getStorage();
  storage.loggedInUser = null;
  saveStorage(storage);
};

export const getCurrentUser = () => {
  const storage = getStorage();
  const username = storage.loggedInUser;
  if (!username) return null;
  return { username, ...storage.users[username] };
};

export const resetPassword = (username, newPassword) => {
  const storage = getStorage();
  storage.users[username].password = newPassword;
  saveStorage(storage);
};