import { useNavigate } from "react-router-dom";
import { ChevronLeft, Wallet, RefreshCw, PieChart, FileText, Info } from "lucide-react";
import { BottomNav } from "../COMPONENTS/FREQUENT/NB";

const FEATURES = [
  {
    icon: Wallet,
    title: "Log it in seconds",
    body: "Add income or expenses in a few taps, sorted into categories you actually recognize.",
    bg: "#fff3e0", color: "#f97316",
  },
  {
    icon: RefreshCw,
    title: "Budget that carries itself",
    body: "Set it once. It carries forward every month until you change it.",
    bg: "#e3f2fd", color: "#3b82f6",
  },
  {
    icon: PieChart,
    title: "See where it's going",
    body: "A live breakdown of spending by category, biggest expenses, and savings rate.",
    bg: "#f3e5f5", color: "#a855f7",
  },
  {
    icon: FileText,
    title: "A report, done for you",
    body: "Every new month, get a full PDF review of the one before it — real numbers, an honest note, never a guilt trip.",
    bg: "#e8f5e9", color: "#22c55e",
  },
];

export function AboutPage() {
  const navigate = useNavigate();

  return (
    <div className="about-page">
      <div className="about-topbar">
        <button className="about-back-btn" onClick={() => navigate('/profile')} aria-label="Back to profile">
          <ChevronLeft size={20} />
        </button>
        <h1 className="about-topbar-title">About</h1>
        <span className="about-topbar-spacer" />
      </div>

      <div className="about-content">
        <div className="about-hero">
          <div className="about-ring">
            <div className="about-ring-inner">
              <img className="about-ring-logo" src="/IMAGES/Fluxlogo.png" alt="Flux Wallet" />
            </div>
          </div>
          <h2 className="about-title">Flux Wallet</h2>
          <p className="about-tagline">Money tracking that keeps up with you.</p>
        </div>

        <p className="about-mission">
          Most budgeting apps ask you to become an accountant. Flux Wallet doesn't.
          It's built on one idea: money tracking only works if it's fast enough that
          you actually keep doing it. Logging a transaction takes seconds, your
          budget remembers itself, and every month closes with a clear picture of
          what happened — no spreadsheets, no guilt, no giving up in week two.
        </p>

        <div className="about-list-card">
          {FEATURES.map(({ icon: Icon, title, body, bg, color }, i) => (
            <div className={`about-list-row ${i === FEATURES.length - 1 ? "about-list-row--last" : ""}`} key={title}>
              <div className="about-list-icon" style={{ backgroundColor: bg, color }}>
                <Icon size={18} />
              </div>
              <div className="about-list-text">
                <span className="about-list-title">{title}</span>
                <span className="about-list-body">{body}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="about-list-card">
          <div className="about-list-row about-list-row--last">
            <div className="about-list-icon" style={{ backgroundColor: "#f1f5f9", color: "#64748b" }}>
              <Info size={18} />
            </div>
            <div className="about-list-text about-list-text--row">
              <span className="about-list-title">Version</span>
              <span className="about-list-value">1.0.0</span>
            </div>
          </div>
        </div>

        <p className="about-credit">Built by Skolade</p>

        <div className="about-social-row">
          <a className="about-social-btn" style={{ backgroundColor: "#f1f5f9", color: "#0f172a" }}
             href="https://x.com/yourhandle" target="_blank" rel="noopener noreferrer" aria-label="Flux Wallet on X">
            <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
              <path d="M18.9 2H22l-7.6 8.7L23.5 22h-6.9l-5.4-6.6L4.9 22H1.8l8.1-9.3L1 2h7l4.9 6 6-6Zm-1.2 18h1.9L7.4 4h-2l12.3 16Z" />
            </svg>
          </a>
          <a className="about-social-btn" style={{ backgroundColor: "#e3f2fd", color: "#0a66c2" }}
             href="https://linkedin.com/in/yourhandle" target="_blank" rel="noopener noreferrer" aria-label="Flux Wallet on LinkedIn">
            <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
              <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.11 1 2.48 1 4.98 2.12 4.98 3.5ZM.24 8.25h4.49V23H.24V8.25ZM8.4 8.25h4.3v2.01h.06c.6-1.13 2.06-2.32 4.24-2.32 4.53 0 5.37 2.98 5.37 6.86V23h-4.49v-6.62c0-1.58-.03-3.61-2.2-3.61-2.2 0-2.54 1.72-2.54 3.5V23H8.4V8.25Z" />
            </svg>
          </a>
          <a className="about-social-btn" style={{ backgroundColor: "#e8f5e9", color: "#25d366" }}
             href="https://wa.me/yournumber" target="_blank" rel="noopener noreferrer" aria-label="Flux Wallet on WhatsApp">
            <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
              <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.28-1.39a9.9 9.9 0 0 0 4.76 1.21h.01c5.46 0 9.9-4.45 9.9-9.91C21.96 6.45 17.5 2 12.04 2Zm5.8 14.02c-.24.68-1.4 1.3-1.93 1.38-.5.08-1.12.11-1.8-.11-.42-.13-.96-.31-1.65-.6-2.9-1.25-4.79-4.17-4.94-4.36-.14-.2-1.18-1.57-1.18-3 0-1.42.75-2.12 1.02-2.41.27-.28.58-.36.78-.36.2 0 .39 0 .56.01.18.01.42-.07.66.5.24.58.82 2 .9 2.14.07.15.12.32.02.52-.1.2-.15.32-.29.5-.15.17-.31.39-.44.52-.15.15-.3.31-.13.6.17.29.75 1.24 1.61 2 1.11.99 2.04 1.3 2.33 1.45.29.15.46.13.63-.07.17-.2.72-.83.91-1.12.19-.29.38-.24.63-.14.25.1 1.6.75 1.87.89.27.14.45.2.51.32.07.11.07.65-.17 1.33Z" />
            </svg>
          </a>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}