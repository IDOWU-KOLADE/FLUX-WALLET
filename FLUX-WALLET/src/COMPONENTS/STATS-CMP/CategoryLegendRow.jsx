import { formatAmount } from "./statsUtils";

export function CategoryLegendRow({ color, category, amount, currency }) {
  return (
    <div className="stats-legend-row">
      <span className="stats-legend-dot" style={{ backgroundColor: color }} />
      <span className="stats-legend-name">{category.name}</span>
      <span className="stats-legend-amount">{formatAmount(amount, currency)}</span>
    </div>
  );
}