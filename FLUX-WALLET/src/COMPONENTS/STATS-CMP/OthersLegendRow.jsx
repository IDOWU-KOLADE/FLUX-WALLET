import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { formatAmount } from "./statsUtils";

export function OthersLegendRow({ color, total, currency, subCategories }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="stats-others-wrap">
      <button
        className="stats-legend-row stats-others-trigger"
        onClick={() => setExpanded((e) => !e)}
      >
        <span className="stats-legend-dot" style={{ backgroundColor: color }} />
        <span className="stats-legend-name">Others</span>
        <span className="stats-legend-amount">{formatAmount(total, currency)}</span>
        <ChevronDown
          size={14}
          className={`stats-others-chevron ${expanded ? "stats-others-chevron--open" : ""}`}
        />
      </button>

      {expanded && (
        <div className="stats-others-list">
          {subCategories.map((c) => (
            <div key={c.categoryId} className="stats-others-subrow">
              <span className="stats-others-subrow-emoji" style={{ backgroundColor: c.icon.bg }}>
                {c.icon.emoji}
              </span>
              <span className="stats-others-subrow-name">{c.name}</span>
              <span className="stats-others-subrow-amount">{formatAmount(c.total, currency)}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}