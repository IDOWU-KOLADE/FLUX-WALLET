import { getCategoryStats } from "../COMPONENTS/STATS-CMP/statsUtils";
import { getEffectiveBudget } from "../CONTEXT/UserStorage";

function getMonthTransactions(transactions, month, year) {
  return transactions.filter((t) => {
    const d = new Date(t.date);
    return d.getMonth() === month && d.getFullYear() === year;
  });
}

function getBiggestTransaction(monthTransactions, type) {
  const filtered = monthTransactions.filter((t) => t.type === type);
  if (filtered.length === 0) return null;
  return filtered.reduce((max, t) => (t.amount > max.amount ? t : max));
}

function getMostFrequentCategory(categoryStatsRows) {
  if (categoryStatsRows.length === 0) return null;
  return categoryStatsRows.reduce((max, row) => (row.count > max.count ? row : max));
}

function getDisciplineDays(monthTransactions, month, year) {
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const activeDays = new Set(monthTransactions.map((t) => new Date(t.date).getDate()));
  return daysInMonth - activeDays.size;
}

function getTopCategoryConcentration(expenseRows) {
  const total = expenseRows.reduce((sum, r) => sum + r.total, 0);
  if (total === 0) return null;
  const topThreeTotal = expenseRows.slice(0, 3).reduce((sum, r) => sum + r.total, 0);
  return Math.round((topThreeTotal / total) * 100);
}

// Single entry point — everything the modal and PDF need, in one call.
export function buildMonthlyReport(user, month, year) {
  const monthTransactions = getMonthTransactions(user.transactions, month, year);

  const expenseStats = getCategoryStats(user.transactions, user.categories, "expense", month, year);
  const incomeStats = getCategoryStats(user.transactions, user.categories, "income", month, year);

  const totalIncome = incomeStats.totalAmount;
  const totalExpenses = expenseStats.totalAmount;
  const savingsRate = totalIncome > 0
    ? Math.round(((totalIncome - totalExpenses) / totalIncome) * 100)
    : null;

  const budget = getEffectiveBudget(user, month, year);
  const percentUsed = budget ? Math.round((totalExpenses / budget) * 100) : null;

  return {
    monthTransactionCount: monthTransactions.length,
    totalIncome,
    totalExpenses,
    budget,
    percentUsed,
    savingsRate,
    biggestExpenseCategory: expenseStats.rows[0] ?? null,
    biggestIncomeCategory: incomeStats.rows[0] ?? null,
    biggestSingleExpense: getBiggestTransaction(monthTransactions, "expense"),
    biggestSingleIncome: getBiggestTransaction(monthTransactions, "income"),
    mostFrequentCategory: getMostFrequentCategory(expenseStats.rows),
    disciplineDays: getDisciplineDays(monthTransactions, month, year),
    topCategoryConcentration: getTopCategoryConcentration(expenseStats.rows),
    expenseBreakdown: expenseStats.rows,
      message: buildReportMessage({ budget, percentUsed }),
  };
}
// New function — add anywhere in the file
function buildReportMessage(report) {
  if (report.budget == null) {
    return "You didn't set a budget last month — want to set one this month to keep track?";
  }
  if (report.percentUsed > 100) {
    const over = report.percentUsed - 100;
    return `You went ${over}% over budget last month — no worries, this month's a clean slate. Ready to reduce the impulse spending?`;
  }
  return "You stayed within budget last month — keep that momentum going this month!";
}