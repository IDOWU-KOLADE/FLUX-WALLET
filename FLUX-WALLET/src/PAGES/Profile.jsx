import { useState, useRef } from "react";
import { useApp } from "../CONTEXT/AppContext";
import { getStorage, SetStorage, setMonthlyBudget } from "../CONTEXT/UserStorage";
import { useNavigate } from "react-router-dom";
import { Navbar, BottomNav } from "../COMPONENTS/FREQUENT/NB";
import { setProfilePicture } from "../CONTEXT/UserStorage";
import { resizeImageToBase64 } from "../utils/imageUtils";
import { CURRENCIES,formatAmount } from "../utils/currency";

export function ProfilePage() {
  const { currentUser, logout, refreshUser, setScreen } = useApp();
  const navigate = useNavigate();
  const [currencyModal, setCurrencyModal] = useState(false);
  const [budgetModal, setBudgetModal] = useState(false);

  const [newBudget, setNewBudget] = useState('');
  const [budgetError, setBudgetError] = useState('');
  const [selectedCurrency, setSelectedCurrency] = useState(currentUser?.currency || 'NGN');





  const saveCurrency = () => {
    const storage = getStorage();
    storage.users[currentUser.username].currency = selectedCurrency;
    SetStorage(storage);
    refreshUser();
    setCurrencyModal(false);
  };
    const fileInputRef = useRef(null);

    const handlePictureChange = async (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const resizedBase64 = await resizeImageToBase64(file);
      setProfilePicture(currentUser.username, resizedBase64);
      refreshUser();
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



  return (
    <>
      <Navbar />
      <div className="profile-page">
        <div className="profile-avatar-section">
          <div className="profile-avatar" onClick={() => fileInputRef.current.click()}>
            {currentUser?.profilePicture ? (
              <img className="profile-avatar-img" src={currentUser.profilePicture} alt="Profile" />
            ) : (
              <span>{currentUser?.username?.charAt(0).toUpperCase()}</span>
            )}
          </div>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handlePictureChange}
            style={{ display: "none" }}
          />
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
              ? formatAmount(currentUser.monthlyBudget, currentUser?.currency || 'NGN')
              : 'Not set'}
            </span>
          </button>

          <button className="profile-item" onClick={() => { navigate('/category') }}>
            <span className="profile-item-label">Categories</span>
            <span className="profile-item-arrow">›</span>
          </button>

          <button className="profile-item" onClick={() => {navigate('/about')}}>
            <span className="profile-item-label">About Flux Wallet</span>
            <span className="profile-item-value">v1.0.0</span>
          </button>

          <button className="profile-item logout" onClick={handleLogout}>
            <span>Logout</span>
          </button>
        </div>

       

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
                ? formatAmount(currentUser.monthlyBudget, currentUser?.currency || 'NGN')
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