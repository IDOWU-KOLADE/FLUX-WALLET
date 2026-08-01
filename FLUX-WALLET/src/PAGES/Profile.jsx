import { useState } from "react";
import { useApp } from "../CONTEXT/AppContext";
import { getStorage, SetStorage, switchUser, setMonthlyBudget } from "../CONTEXT/UserStorage";
import { useNavigate } from "react-router-dom";
import { Navbar, BottomNav } from "../COMPONENTS/FREQUENT/NB";
import { Check, Plus } from "lucide-react";

export function ProfilePage() {
  const { currentUser, logout, refreshUser, setScreen } = useApp();
  const navigate = useNavigate();
  const [currencyModal, setCurrencyModal] = useState(false);
  const [budgetModal, setBudgetModal] = useState(false);
  const [switchModal, setSwitchModal] = useState(false);
  const [newBudget, setNewBudget] = useState('');
  const [budgetError, setBudgetError] = useState('');
  const [selectedCurrency, setSelectedCurrency] = useState(currentUser?.currency || 'NGN');

  const CURRENCIES = [
    { code: 'NGN', symbol: '₦', name: 'Nigerian Naira' },
    { code: 'USD', symbol: '$', name: 'US Dollar' },
  ];

  const allUsernames = Object.keys(getStorage().users);

  const saveCurrency = () => {
    const storage = getStorage();
    storage.users[currentUser.username].currency = selectedCurrency;
    SetStorage(storage);
    refreshUser();
    setCurrencyModal(false);
  };

  const saveBudget = () => {
    if (!newBudget.trim()) {
      setBudgetError("Please enter a budget amount");
      return;
    }
    if (Number(newBudget) <= 0) {
      setBudgetError("Budget must be greater than zero");
      return;
    }
    setBudgetError('');
    setMonthlyBudget(currentUser.username, Number(newBudget));
    refreshUser();
    setBudgetModal(false);
    setNewBudget('');
  };

  const closeBudgetModal = () => {
    setBudgetModal(false);
    setNewBudget('');
    setBudgetError('');
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleSwitchProfile = (username) => {
    if (username === currentUser.username) {
      setSwitchModal(false);
      return;
    }
    switchUser(username);
    refreshUser();
    setSwitchModal(false);
    navigate('/dashboard');
  };

  return (
    <>
      <Navbar />
      <div className="profile-page">
        <div className="profile-avatar-section" onClick={() => setSwitchModal(true)}>
          <div className="profile-avatar">
            <span>{currentUser?.username?.charAt(0).toUpperCase()}</span>
          </div>
          <h2 className="profile-username">{currentUser?.username}</h2>
        </div>

        <div className="profile-list">
          <button className="profile-item" onClick={() => setCurrencyModal(true)}>
            <span className="profile-item-label">Currency</span>
            <span className="profile-item-value">
              {currentUser?.currency || 'NGN'} ({CURRENCIES.find(c => c.code === (currentUser?.currency || 'NGN'))?.symbol})
            </span>
          </button>

          <button className="profile-item" onClick={() => setBudgetModal(true)}>
            <span className="profile-item-label">Monthly Budget</span>
            <span className="profile-item-value">
              {currentUser?.monthlyBudget
                ? `${CURRENCIES.find(c => c.code === (currentUser?.currency || 'NGN'))?.symbol}${Number(currentUser.monthlyBudget).toLocaleString()}`
                : 'Not set'}
            </span>
          </button>

          <button className="profile-item" onClick={() => { navigate('/category') }}>
            <span className="profile-item-label">Categories</span>
            <span className="profile-item-arrow">›</span>
          </button>

          <button className="profile-item" onClick={() => {}}>
            <span className="profile-item-label">About Flux Wallet</span>
            <span className="profile-item-value">v1.0.0</span>
          </button>
          <button className="profile-item" onClick={() => setSwitchModal(true)}>
            <span className="profile-item-label">Switch Profile</span>
            <span className="profile-item-arrow">›</span>
          </button>
          <button className="profile-item logout" onClick={handleLogout}>
            <span>Logout</span>
          </button>
        </div>

        {switchModal && (
          <div className="modal-overlay" onClick={() => setSwitchModal(false)}>
            <div className="modal-box" onClick={(e) => e.stopPropagation()}>
              <h3 className="modal-title">Switch Profile</h3>
              <div className="switch-profile-list">
                {allUsernames.map((username) => {
                  const isCurrent = username === currentUser.username;
                  return (
                    <button
                      key={username}
                      className={`switch-profile-option ${isCurrent ? 'selected' : ''}`}
                      onClick={() => handleSwitchProfile(username)}
                    >
                      <div className="switch-profile-avatar">
                        <span>{username.charAt(0).toUpperCase()}</span>
                      </div>
                      <span className="switch-profile-name">{username}</span>
                      {isCurrent && <Check size={18} className="switch-profile-check" />}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {currencyModal && (
          <div className="modal-overlay" onClick={() => setCurrencyModal(false)}>
            <div className="modal-box" onClick={(e) => e.stopPropagation()}>
              <h3 className="modal-title">Select Currency</h3>
              <div className="currency-options">
                {CURRENCIES.map((c) => (
                  <button
                    key={c.code}
                    className={`currency-option ${selectedCurrency === c.code ? 'selected' : ''}`}
                    onClick={() => setSelectedCurrency(c.code)}
                  >
                    <span className="currency-symbol">{c.symbol}</span>
                    <div className="currency-info">
                      <span className="currency-code">{c.code}</span>
                      <span className="currency-name">{c.name}</span>
                    </div>
                    {selectedCurrency === c.code && <span className="currency-check">✓</span>}
                  </button>
                ))}
              </div>
              <button className="modal-save-btn" onClick={saveCurrency}>Save</button>
            </div>
          </div>
        )}

        {budgetModal && (
          <div className="modal-overlay" onClick={closeBudgetModal}>
            <div className="modal-box" onClick={(e) => e.stopPropagation()}>
              <h3 className="modal-title">Set Monthly Budget</h3>
              <p className="modal-subtitle">
                Current: {currentUser?.monthlyBudget
                  ? `${CURRENCIES.find(c => c.code === (currentUser?.currency || 'NGN'))?.symbol}${Number(currentUser.monthlyBudget).toLocaleString()}`
                  : 'Not set'}
              </p>
              <input
                className="modal-input"
                type="number"
                placeholder="e.g. 100000"
                value={newBudget}
                onChange={(e) => { setNewBudget(e.target.value); setBudgetError(''); }}
              />
              {budgetError && <p className="modal-error">{budgetError}</p>}
              <button className="modal-save-btn" onClick={saveBudget}>Save</button>
            </div>
          </div>
        )}

        <BottomNav />
      </div>
    </>
  );
}