import { useNavigate } from "react-router-dom";

export function WelcomeModal({ onClose }) {
  const navigate = useNavigate();

  const handleGoToAbout = () => {
    onClose();
    navigate("/about"); // adjust if your About route uses a different path
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="welcome-modal" onClick={(e) => e.stopPropagation()}>
        <h3 className="welcome-modal-title">Welcome to Flux Wallet! 🎉</h3>
        <p className="welcome-modal-text">
          Before you dive in, head over to the About page — it walks through everything
          the app can do. Read it all the way to the end so nothing important gets missed.
        </p>
        <div className="welcome-modal-actions">
          <button className="welcome-modal-skip" onClick={onClose}>Skip for now</button>
          <button className="welcome-modal-goto" onClick={handleGoToAbout}>Go to About</button>
        </div>
      </div>
    </div>
  );
}