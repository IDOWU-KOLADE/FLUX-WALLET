import { X, Share, PlusSquare, Download } from "lucide-react";

export function InstallPromptModal({ platform, onInstall, onClose }) {
  return (
    <div className="install-prompt-overlay">
      <div className="install-prompt-card">
        <button className="install-prompt-close" onClick={onClose} aria-label="Dismiss">
          <X size={18} />
        </button>

        <img className="install-prompt-logo" src="/icons/icon-192.png" alt="Flux Wallet" />
        <h3 className="install-prompt-title">Install Flux Wallet</h3>
        <p className="install-prompt-body">
          Add it to your home screen for quick, full-screen access — no browser bar, opens like a real app.
        </p>

        {platform === "android" && (
          <button className="install-prompt-btn" onClick={onInstall}>
            <Download size={16} />
            Install App
          </button>
        )}

      {platform === "ios" && (
          <div className="install-prompt-ios-steps">
            <p className="install-prompt-ios-note">
              Open this site in Safari if you haven't already, then:
            </p>
            <div className="install-prompt-ios-step">
              <Share size={16} />
              <span>Tap the Share icon (square with an arrow) in the bottom toolbar</span>
            </div>
            <div className="install-prompt-ios-step">
              <PlusSquare size={16} />
              <span>Scroll down and tap "Add to Home Screen"</span>
            </div>
          </div>
        )}

        <button className="install-prompt-later" onClick={onClose}>
          Not now
        </button>
      </div>
    </div>
  );
}