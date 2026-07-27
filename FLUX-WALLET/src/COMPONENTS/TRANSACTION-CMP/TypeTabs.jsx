const TABS = [
  { key: "all", label: "All" },
  { key: "income", label: "Income" },
  { key: "expense", label: "Expense" },
];

export function TypeTabs({ activeTab, onChange }) {
  return (
    <div className="type-tabs">
      {TABS.map((tab) => (
        <button
          key={tab.key}
          className={`type-tab ${activeTab === tab.key ? "type-tab--active" : ""}`}
          onClick={() => onChange(tab.key)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}