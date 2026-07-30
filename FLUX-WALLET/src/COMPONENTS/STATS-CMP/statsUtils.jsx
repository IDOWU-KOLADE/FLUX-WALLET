const CURRENCY_SYMBOLS = { NGN: "₦", USD: "$" };

export function formatAmount(amount, currency) {
  const symbol = CURRENCY_SYMBOLS[currency] ?? "";
  return `${symbol}${Number(amount).toLocaleString()}`;
}

export function getPeriodRange(period) {
  const now = new Date();
  let month = now.getMonth();
  let year = now.getFullYear();
  if (period === "last-month") {
    month -= 1;
    if (month < 0) {
      month = 11;
      year -= 1;
    }
  }
  return { month, year };
}

// One shared aggregation — the donut AND the cards both consume this,
// so "Biggest Expense" can never disagree with what the chart shows.
export function getCategoryStats(transactions, categories, type, month, year) {
  const periodTransactions = transactions.filter((t) => {
    if (t.type !== type) return false;
    const d = new Date(t.date);
    return d.getMonth() === month && d.getFullYear() === year;
  });

  const totalsByCategory = new Map();
  periodTransactions.forEach((t) => {
    const existing = totalsByCategory.get(t.categoryId) ?? { total: 0, count: 0 };
    totalsByCategory.set(t.categoryId, {
      total: existing.total + t.amount,
      count: existing.count + 1,
    });
  });

  const rows = [...totalsByCategory.entries()].map(([categoryId, { total, count }]) => {
    const category = categories.find((c) => c.id === categoryId);
    return {
      categoryId, // kept as the REAL id, even if the category is now soft-deleted —
                  // this is what makes tap-through filtering still work correctly
      name: category?.name ?? "Uncategorized",
      icon: category?.icon ?? { emoji: "❔", bg: "#f1f5f9" },
      total,
      count,
    };
  });

  // Primary: total spent, descending. Tiebreak: full alphabetical name, ascending.
  rows.sort((a, b) => {
    if (b.total !== a.total) return b.total - a.total;
    return a.name.localeCompare(b.name);
  });

  return {
    rows,
    totalAmount: periodTransactions.reduce((sum, t) => sum + t.amount, 0),
    totalCount: periodTransactions.length,
  };
}

// Builds a conic-gradient with small gaps between arcs (drawn as thin
// bands of the card background color) so same-length adjacent slices
// still read as visually separate shapes.
// buildConicGradient — replace the whole function
export function buildConicGradient(slices, gapDeg = 3) {
  if (!slices.length) return "none";
  const total = slices.reduce((sum, s) => sum + s.total, 0);
  if (total === 0) return "none";

  const bg = "var(--color-card)";
  const halfGap = slices.length > 1 ? gapDeg / 2 : 0;
  const feather = 0.4; // tiny blend distance so hard edges anti-alias cleanly instead of jagging
  let cumulative = 0;
  const stops = [];

  slices.forEach((slice) => {
    const startAngle = (cumulative / total) * 360;
    cumulative += slice.total;
    const endAngle = (cumulative / total) * 360;

    const gapStart = startAngle + halfGap;
    const gapEnd = endAngle - halfGap;

    stops.push(`${bg} ${startAngle}deg`);
    stops.push(`${bg} ${gapStart - feather}deg`);
    stops.push(`${slice.color} ${gapStart + feather}deg`);
    stops.push(`${slice.color} ${gapEnd - feather}deg`);
    stops.push(`${bg} ${gapEnd + feather}deg`);
    stops.push(`${bg} ${endAngle}deg`);
  });

  return `conic-gradient(${stops.join(", ")})`;
}

// Fixed rank-based palette — index 0 always goes to whichever category is
// ranked #1 that period, regardless of which category that happens to be.
export const CHART_COLORS = ["#f97316", "#3b82f6", "#a855f7", "#22c55e"];
export const OTHERS_COLOR = "#94a3b8";