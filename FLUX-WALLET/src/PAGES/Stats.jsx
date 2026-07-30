import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Wallet, Receipt } from "lucide-react";
import { useApp } from "../CONTEXT/AppContext";
import { Navbar, BottomNav } from "../COMPONENTS/FREQUENT/NB";
import { TypeTabs } from "../COMPONENTS/TRANSACTION-CMP/TypeTabs";
import { EmptyTransactionsState } from "../COMPONENTS/TRANSACTION-CMP/EmptyTransactionsState";
import { CategoryLegendRow } from "../COMPONENTS/STATS-CMP/CategoryLegendRow";
import { OthersLegendRow } from "../COMPONENTS/STATS-CMP/OthersLegendRow";
import { StatCard } from "../COMPONENTS/STATS-CMP/StatCard";
import {
  getPeriodRange,
  getCategoryStats,
  buildConicGradient,
  formatAmount,
  CHART_COLORS,
  OTHERS_COLOR,
} from "../COMPONENTS/STATS-CMP/statsUtils";


const STATS_TABS = [
  { key: "expense", label: "Expense" },
  { key: "income", label: "Income" },
];

const TOP_SLOT_COUNT = 4;

export function StatsPage() {
  const { currentUser } = useApp();
  const navigate = useNavigate();

  const [activeType, setActiveType] = useState("expense");
  const [period, setPeriod] = useState("this-month");

  const allTransactions = currentUser?.transactions ?? [];
  const categories = currentUser?.categories ?? [];
  const currency = currentUser?.currency;

  const { month, year } = getPeriodRange(period);

  const { rows, totalAmount, totalCount } = useMemo(
    () => getCategoryStats(allTransactions, categories, activeType, month, year),
    [allTransactions, categories, activeType, month, year]
  );

  const topRows = rows.slice(0, TOP_SLOT_COUNT);
  const otherRows = rows.slice(TOP_SLOT_COUNT);
  const othersTotal = otherRows.reduce((sum, r) => sum + r.total, 0);

  const slices = [
    ...topRows.map((r, i) => ({ ...r, color: CHART_COLORS[i] })),
    ...(otherRows.length
      ? [{ categoryId: "__others", total: othersTotal, color: OTHERS_COLOR }]
      : []),
  ];

  const conicGradient = buildConicGradient(slices);
  const biggest = rows[0] ?? null;
  const average = totalCount > 0 ? totalAmount / totalCount : 0;
  const isEmpty = rows.length === 0;
  const biggestLabel = activeType === "expense" ? "Biggest Expense" : "Biggest Income Source";

  const goToTransactions = (state) => navigate("/transactions", { state });

  return (
    <>
      <Navbar />
      <div className="stats-page">
        <TypeTabs activeTab={activeType} onChange={setActiveType} tabs={STATS_TABS} />

        <div className="stats-chart-card">
          <div className="stats-chart-header">
            <span className="stats-chart-title">Spending by Category</span>
            <select
              className="month-select"
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
            >
              <option value="this-month">This Month</option>
              <option value="last-month">Last Month</option>
            </select>
          </div>

          {isEmpty ? (
            <EmptyTransactionsState
              message={
                activeType === "expense"
                  ? "No expenses recorded for this period."
                  : "No income recorded for this period."
              }
            />
          ) : (
            <>
              <div className="stats-donut-wrap">
                <div className="stats-donut" style={{ backgroundImage: conicGradient }}>
                  <div className="stats-donut-hole">
                    <span className="stats-donut-hole-label">Total</span>
                    <span className="stats-donut-hole-amount">
                      {formatAmount(totalAmount, currency)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="stats-legend">
                {topRows.map((row, i) => (
                  <CategoryLegendRow
                    key={row.categoryId}
                    color={CHART_COLORS[i]}
                    category={row}
                    amount={row.total}
                    currency={currency}
                  />
                ))}
                {otherRows.length > 0 && (
                  <OthersLegendRow
                    color={OTHERS_COLOR}
                    total={othersTotal}
                    currency={currency}
                    subCategories={otherRows}
                  />
                )}
              </div>
            </>
          )}
        </div>

        {!isEmpty && (
          <div className="stats-cards-list">
            <StatCard
              icon={
                <span
                  className="stats-card-emoji"
                  style={{ backgroundColor: biggest.icon.bg }}
                >
                  {biggest.icon.emoji}
                </span>
              }
              label={biggestLabel}
              value={`${biggest.name} · ${formatAmount(biggest.total, currency)}`}
              onClick={() =>
                goToTransactions({ type: activeType, categoryId: biggest.categoryId, month, year })
              }
            />
            <StatCard
              icon={<Wallet size={20} />}
              label="Average Transaction"
              value={formatAmount(average, currency)}
              iconClassName="teal"
            />
            <StatCard
              icon={<Receipt size={20} />}
              label="Total Transactions"
              value={totalCount}
              iconClassName="green"
              onClick={() => goToTransactions({ type: activeType, month, year })}
            />
          </div>
        )}
      </div>
      <BottomNav />
    </>
  );
}