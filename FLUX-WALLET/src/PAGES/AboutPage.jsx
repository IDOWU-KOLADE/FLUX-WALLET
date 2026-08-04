import { useNavigate } from "react-router-dom";
import { ChevronLeft, Wallet, RefreshCw, PieChart, FileText, Info, HardDrive, Tags, Archive, ArrowLeftRight, Calendar, MoreVertical, Download, HelpCircle, Coins, Smartphone, TrendingDown, Search, Image } from "lucide-react";
import { BottomNav, Navbar } from "../COMPONENTS/FREQUENT/NB";

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
const HOW_IT_WORKS = [
  {
    sectionTitle: "Your Data",
    items: [
      {
        icon: HardDrive,
        title: "Stored only on this device",
        body: "Everything you log lives in this browser's local storage — there's no cloud account. Clearing your browser data, switching phones, or reinstalling will erase it for good.",
        bg: "#fef3c7", color: "#d97706",
      },
    ],
  },
  {
    sectionTitle: "Categories",
    items: [
      {
        icon: Tags,
        title: "Make categories your own",
        body: "Add categories that fit your life, and edit or delete the ones you create anytime. Default categories can't be edited — that protects old transactions if one's ever renamed.",
        bg: "#e0e7ff", color: "#6366f1",
      },
      {
        icon: Archive,
        title: "Deleting a category keeps your history intact",
        body: "Old transactions keep their original name and emoji forever, even after their category is deleted. You just can't pick it for new ones.",
        bg: "#fce7f3", color: "#db2777",
      },
    ],
  },
  {
    sectionTitle: "Transfers",
    items: [
      {
        icon: ArrowLeftRight,
        title: "Lending, Savings & Loan Repayment aren't real spending",
        body: "These exist by default because that money isn't gone — it's just moved. They're left out of your budget percentage and income/expense totals. You can mark any category you create the same way from the category form.",
        bg: "#ccfbf1", color: "#0d9488",
      },
    ],
  },
  {
    sectionTitle: "Budget & Reports",
    items: [
      {
        icon: Calendar,
        title: "Your budget carries forward on its own",
        body: "Set it once and it keeps applying every month after, until you change it — no need to re-set it monthly.",
        bg: "#dbeafe", color: "#2563eb",
      },
      {
        icon: FileText,
        title: "Monthly Report shows up by itself",
        body: "A glowing download icon appears in the navbar once a new month starts, summarizing the one before. It's a one-time claim — once downloaded, it's gone until the next month.",
        bg: "#dcfce7", color: "#16a34a",
      },
    ],
  },
  {
    sectionTitle: "Editing & Exporting",
    items: [
      {
        icon: MoreVertical,
        title: "Edit or delete any transaction",
        body: "Tap the ⋯ menu on any row in Transactions to fix a typo, adjust an amount, or remove it entirely.",
        bg: "#f1f5f9", color: "#475569",
      },
      {
        icon: Download,
        title: "Export transactions as a PDF",
        body: "Filter transactions the way you want, then download them — you can edit the filename before it saves.",
        bg: "#ede9fe", color: "#7c3aed",
      },
    ],
  },
  {
    sectionTitle: "Stats & Insights",
    items: [
      {
        icon: PieChart,
        title: "Switch between income and expense breakdowns",
        body: "The Stats page shows one side of your money at a time — toggle between income and expense to see the full picture.",
        bg: "#f3e5f5", color: "#a855f7",
      },
      {
        icon: RefreshCw,
        title: "Compare this month to last month",
        body: "Both the Dashboard summary and Stats page let you switch between this month and last month, so you can see how you're trending.",
        bg: "#e0f2fe", color: "#0284c7",
      },
    ],
  },
  {
    sectionTitle: "Find Things Faster",
    items: [
      {
        icon: Search,
        title: "Filter transactions by type and category",
        body: "On the Transactions page, narrow the list down to just income, just expenses, or a specific category, instead of scrolling through everything.",
        bg: "#fef9c3", color: "#ca8a04",
      },
      {
        icon: Calendar,
        title: "Jump straight to a date",
        body: "Use Jump to Date on the Transactions page to skip straight to a specific day instead of scrolling back through your history.",
        bg: "#dbeafe", color: "#2563eb",
      },
    ],
  },

  {
    sectionTitle: "Account",
    items: [
      {
        icon: HelpCircle,
        title: "Password recovery only needs 2 of 3 right",
        body: "Resetting your password doesn't need every security answer correct — 2 out of 3 is enough to verify it's you.",
        bg: "#fee2e2", color: "#dc2626",
      },
      {
        icon: Coins,
        title: "Currency is just a display symbol",
        body: "Changing your currency in Profile updates how amounts are shown — it doesn't convert your existing numbers between currencies.",
        bg: "#fff7ed", color: "#ea580c",
      },
      {
        icon: Smartphone,
        title: "Install it like a real app",
        body: "Add Flux Wallet to your home screen for quick, full-screen access. Dismissed the prompt? Find it again anytime in Profile → Install App.",
        bg: "#e0f2fe", color: "#0284c7",
      },
      {
        icon: HelpCircle,
        title: "Security answers are forgiving",
        body: "Capitalization and extra spaces don't matter when answering security questions — 'Max' and 'max ' are treated the same.",
        bg: "#fee2e2", color: "#dc2626",
      },
      {
        icon: Image,
        title: "Reposition and zoom your profile photo",
        body: "When you upload a profile picture, you can drag to reposition and use the zoom slider to frame it exactly how you want before saving.",
        bg: "#f3e8ff", color: "#9333ea",
      },
    ],
  },
];

export function AboutPage() {
  const navigate = useNavigate();

  return (
    <div className="about-page">
  <Navbar/>

      <div className="about-content">
        <div className="about-hero">
          <div className="about-ring">
            <div className="about-ring-inner">
              <img className="about-ring-logo" src="/IMAGES/no-transactions.png" alt="Flux Wallet" />
            </div>
          </div>
          <h2 className="about-title">Flux Wallet</h2>
          <p className="about-tagline">Money tracking that keeps up with you.</p>
        </div>

      <div className="about-mission-card">
        <p className="about-mission-lead">
          Most budgeting apps ask you to become an accountant. Flux Wallet doesn't.
        </p>
        <p className="about-mission-body">
          It's built on one idea: money tracking only works if it's fast enough that
          you actually keep doing it. Logging a transaction takes seconds, your
          budget remembers itself, and every month closes with a clear picture of
          what happened — no spreadsheets, no guilt, no giving up in week two.
        </p>
      </div>
        <div className="about-mission-card about-budget-card">
          <p className="about-mission-lead">
            Your budget is a ceiling, not a target.
          </p>
          <p className="about-mission-body">
            You don't need to spend all of it every month — that's actually the goal working correctly.
            Whatever's left unspent stays in your account; that's where real savings come from, not from a
            separate effort. The progress bar changes color as a signal, not a scoreboard: green means you're
            well within budget, yellow means you're halfway there, and red means you're close to or over your
            limit. Staying in the green for longer each month is the whole point.
          </p>
        </div>
                  {HOW_IT_WORKS.map((section) => (
          <div key={section.sectionTitle}>
            <h3 className="about-section-label">{section.sectionTitle}</h3>
            <div className="about-list-card">
              {section.items.map(({ icon: Icon, title, body, bg, color }, i) => (
                <div
                  className={`about-list-row ${i === section.items.length - 1 ? "about-list-row--last" : ""}`}
                  key={title}
                >
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
          </div>
        ))}
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
        <div className="about-mission-card about-roadmap-card">
          <p className="about-mission-lead">
            Version 1.0 is just the beginning.
          </p>
          <p className="about-mission-body">
            This is v1.0. The next version moves to a real backend — Supabase — for
            proper, persistent data storage. And... well, we'll let you think about
            what else that opens up.
          </p>
        </div>
        <div className="about-list-card version">
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

        <p className="about-credit">Built by <span style={{color:'black', fontWeight: 700}}>Skolade</span></p>

        <div className="about-social-row">
          <a className="about-social-btn" style={{ backgroundColor: "#f1f5f9", color: "#0f172a" }}
             href="https://x.com/SKOLADE_" target="_blank" rel="noopener noreferrer" aria-label="Flux Wallet on X">
            <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
              <path d="M18.9 2H22l-7.6 8.7L23.5 22h-6.9l-5.4-6.6L4.9 22H1.8l8.1-9.3L1 2h7l4.9 6 6-6Zm-1.2 18h1.9L7.4 4h-2l12.3 16Z" />
            </svg>
          </a>
          <a className="about-social-btn" style={{ backgroundColor: "#e3f2fd", color: "#0a66c2" }}
             href="https://linkedin.com/in/kolade-idowu-334b1140a" target="_blank" rel="noopener noreferrer" aria-label="Flux Wallet on LinkedIn">
            <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
              <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.11 1 2.48 1 4.98 2.12 4.98 3.5ZM.24 8.25h4.49V23H.24V8.25ZM8.4 8.25h4.3v2.01h.06c.6-1.13 2.06-2.32 4.24-2.32 4.53 0 5.37 2.98 5.37 6.86V23h-4.49v-6.62c0-1.58-.03-3.61-2.2-3.61-2.2 0-2.54 1.72-2.54 3.5V23H8.4V8.25Z" />
            </svg>
          </a>
          <a className="about-social-btn" style={{ backgroundColor: "#e8f5e9", color: "#25d366" }}
             href="https://wa.me/2348062301372" target="_blank" rel="noopener noreferrer" aria-label="Flux Wallet on WhatsApp">
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