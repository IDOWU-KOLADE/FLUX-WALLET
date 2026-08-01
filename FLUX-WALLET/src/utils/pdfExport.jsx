import jsPDF from "jspdf";
import { CURRENCY_CODES } from "./currency";
import { buildMonthlyReport } from "./reportUtils";

const MONTH_NAMES = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const MONTH_ABBR = ["jan","feb","mar","apr","may","jun","jul","aug","sep","oct","nov","dec"];

async function loadImageAsBase64(url) {
  const response = await fetch(url);
  const blob = await response.blob();
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

function formatPdfAmount(amount, type, currency) {
  const sign = type === "income" ? "+" : "-";
  const code = CURRENCY_CODES[currency] ?? "";
  return `${sign} ${code} ${Number(amount).toLocaleString()}`;
}

function formatPdfDate(dateStr) {
  return new Date(dateStr).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export function buildFilterSummary(activeTab, selectedCategoryIds, categories) {
  if (activeTab === "all" && selectedCategoryIds.length === 0) return "All Transactions";
  const parts = [];
  if (activeTab !== "all") parts.push(activeTab === "income" ? "Income" : "Expense");
  if (selectedCategoryIds.length === 1) {
    const cat = categories.find((c) => c.id === selectedCategoryIds[0]);
    if (cat) parts.push(cat.name);
  } else if (selectedCategoryIds.length > 1) {
    parts.push(`${selectedCategoryIds.length} Categories`);
  }
  return parts.join(" · ");
}

export function buildFilename({ activeTab, selectedCategoryIds, categories, currentMonth, currentYear }) {
  const parts = [];
  if (activeTab !== "all") parts.push(activeTab);
  if (selectedCategoryIds.length === 1) {
    const cat = categories.find((c) => c.id === selectedCategoryIds[0]);
    if (cat) parts.push(cat.name.toLowerCase().replace(/[^a-z0-9]+/g, ""));
  } else if (selectedCategoryIds.length > 1) {
    parts.push("multicategory");
  }
  if (parts.length === 0) parts.push("all");
  parts.push(`${MONTH_ABBR[currentMonth]}${currentYear}`);
  return `FluxWallet-transactions-${parts.join("-")}.pdf`;
}

// -------------------- Transaction History PDF (unchanged logic, typo fixed) --------------------

export async function exportTransactionsPDF({
  transactions, categories, currency, activeTab, selectedCategoryIds,
  currentMonth, currentYear, overrideFilename,
}) {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 15;

  const col = {
    date: margin,
    description: margin + 25,
    category: margin + 85,
    type: margin + 130,
    amount: pageWidth - margin,
  };

  let y = 20;

  try {
    const logoBase64 = await loadImageAsBase64("/IMAGES/Fluxlogo.png");
    const logoWidth = 32, logoHeight = 12;
    doc.addImage(logoBase64, "PNG", (pageWidth - logoWidth) / 2, y, logoWidth, logoHeight);
    y += logoHeight + 6;
  } catch { y += 4; }

  doc.setFont("helvetica", "bold"); doc.setFontSize(16);
  doc.text("Transaction History", pageWidth / 2, y, { align: "center" }); y += 7;

  doc.setFont("helvetica", "normal"); doc.setFontSize(10); doc.setTextColor(120, 120, 120);
  doc.text(buildFilterSummary(activeTab, selectedCategoryIds, categories), pageWidth / 2, y, { align: "center" }); y += 5;

  doc.setFontSize(8);
  const generatedOn = new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
  doc.text(`Generated on ${generatedOn}`, pageWidth / 2, y, { align: "center" }); y += 6;

  doc.setDrawColor(220, 220, 220); doc.line(margin, y, pageWidth - margin, y); y += 8;

  function drawColumnHeaders() {
    doc.setFont("helvetica", "bold"); doc.setFontSize(9); doc.setTextColor(30, 30, 30);
    doc.text("Date", col.date, y); doc.text("Description", col.description, y);
    doc.text("Category", col.category, y); doc.text("Type", col.type, y);
    doc.text("Amount", col.amount, y, { align: "right" }); y += 3;
    doc.setDrawColor(30, 30, 30); doc.line(margin, y, pageWidth - margin, y); y += 6;
  }

  drawColumnHeaders();

  const rowHeight = 8, footerReserve = 20;
  doc.setFont("helvetica", "normal"); doc.setFontSize(9);

  transactions.forEach((t) => {
    if (y + rowHeight > pageHeight - footerReserve) { doc.addPage(); y = 20; drawColumnHeaders(); }

    const category = categories.find((c) => c.id === t.categoryId);
    doc.setTextColor(60, 60, 60);
    doc.text(formatPdfDate(t.date), col.date, y);

    const maxDescWidth = col.category - col.description - 4;
    const descLines = doc.splitTextToSize(t.description, maxDescWidth);
    doc.text(descLines[0], col.description, y);

    doc.text(category?.name ?? "Uncategorized", col.category, y);
    doc.text(t.type === "income" ? "Income" : "Expense", col.type, y);

    doc.setTextColor(t.type === "income" ? 34 : 200, t.type === "income" ? 150 : 50, t.type === "income" ? 80 : 50);
    doc.text(formatPdfAmount(t.amount, t.type, currency), col.amount, y, { align: "right" });

    y += 5; doc.setDrawColor(235, 235, 235); doc.line(margin, y, pageWidth - margin, y); y += 5;
  });

  const incomeTotal = transactions.filter((t) => t.type === "income").reduce((s, t) => s + t.amount, 0);
  const expenseTotal = transactions.filter((t) => t.type === "expense").reduce((s, t) => s + t.amount, 0);
  const hasIncome = incomeTotal > 0, hasExpense = expenseTotal > 0;
  const code = CURRENCY_CODES[currency] ?? "";

  if (y + footerReserve > pageHeight) { doc.addPage(); y = 20; }
  y += 4; doc.setDrawColor(30, 30, 30); doc.line(margin, y, pageWidth - margin, y); y += 7;

  doc.setFont("helvetica", "normal"); doc.setFontSize(9); doc.setTextColor(60, 60, 60);
  if (hasIncome) { doc.text(`Total Income: ${code} ${incomeTotal.toLocaleString()}`, pageWidth - margin, y, { align: "right" }); y += 5; }
  if (hasExpense) { doc.text(`Total Expenses: ${code} ${expenseTotal.toLocaleString()}`, pageWidth - margin, y, { align: "right" }); y += 5; }

  if (hasIncome && hasExpense) {
    const net = incomeTotal - expenseTotal;
    const sign = net >= 0 ? "+" : "-";
    doc.setFont("helvetica", "bold"); doc.setFontSize(10); doc.setTextColor(30, 30, 30);
    doc.text(`Net Balance: ${sign} ${code} ${Math.abs(net).toLocaleString()}`, pageWidth - margin, y, { align: "right" }); y += 6;
  }

  doc.setFont("helvetica", "normal"); doc.setFontSize(8); doc.setTextColor(130, 130, 130);
  doc.text(`${transactions.length} transaction${transactions.length === 1 ? "" : "s"}`, pageWidth - margin, y, { align: "right" });

  const filename = overrideFilename ?? buildFilename({ activeTab, selectedCategoryIds, categories, currentMonth, currentYear });
  doc.save(filename);
}

// -------------------- NEW: Monthly Report PDF --------------------

export function buildReportFilename(month, year) {
  return `FluxWallet-report-${MONTH_ABBR[month]}${year}.pdf`;
}

export async function exportMonthlyReportPDF({ user, month, year, currency }) {
  const report = buildMonthlyReport(user, month, year);
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 15;
  let y = 20;

  try {
    const logoBase64 = await loadImageAsBase64("/IMAGES/Fluxlogo.png");
    const logoWidth = 32, logoHeight = 12;
    doc.addImage(logoBase64, "PNG", (pageWidth - logoWidth) / 2, y, logoWidth, logoHeight);
    y += logoHeight + 6;
  } catch { y += 4; }

  doc.setFont("helvetica", "bold"); doc.setFontSize(16);
  doc.text("Monthly Report", pageWidth / 2, y, { align: "center" }); y += 7;

  doc.setFont("helvetica", "normal"); doc.setFontSize(10); doc.setTextColor(120, 120, 120);
  doc.text(`${MONTH_NAMES[month]} ${year}`, pageWidth / 2, y, { align: "center" }); y += 5;

  doc.setFontSize(8);
  const generatedOn = new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
  doc.text(`Generated on ${generatedOn}`, pageWidth / 2, y, { align: "center" }); y += 6;

  doc.setDrawColor(220, 220, 220); doc.line(margin, y, pageWidth - margin, y); y += 10;

  const code = CURRENCY_CODES[currency] ?? "";

  function sectionHeader(title) {
    doc.setFont("helvetica", "bold"); doc.setFontSize(11); doc.setTextColor(30, 30, 30);
    doc.text(title, margin, y); y += 3;
    doc.setDrawColor(230, 230, 230); doc.line(margin, y, pageWidth - margin, y); y += 7;
  }

  function line(label, value) {
    if (y > pageHeight - 20) { doc.addPage(); y = 20; }
    doc.setFont("helvetica", "normal"); doc.setFontSize(10); doc.setTextColor(60, 60, 60);
    doc.text(label, margin, y);
    doc.setFont("helvetica", "bold"); doc.setTextColor(30, 30, 30);
    doc.text(value, pageWidth - margin, y, { align: "right" });
    y += 8;
  }

  sectionHeader("Overview");
  line("Total Income", `${code} ${report.totalIncome.toLocaleString()}`);
  line("Total Expenses", `${code} ${report.totalExpenses.toLocaleString()}`);
  if (report.budget != null) {
    line("Monthly Budget", `${code} ${report.budget.toLocaleString()}`);
    line("Budget Used", `${report.percentUsed}%`);
  }
  if (report.savingsRate != null) line("Savings Rate", `${report.savingsRate}%`);
  line("Transactions Logged", `${report.monthTransactionCount}`);

  y += 4;
doc.setFont("helvetica", "italic"); doc.setFontSize(9); doc.setTextColor(90, 90, 90);
const messageLines = doc.splitTextToSize(report.message, pageWidth - margin * 2);
doc.text(messageLines, margin, y);
y += messageLines.length * 5 + 6;
  y += 4;
  sectionHeader("Highlights");
  if (report.biggestExpenseCategory) {
    line("Biggest Expense Category", `${report.biggestExpenseCategory.name} · ${code} ${report.biggestExpenseCategory.total.toLocaleString()}`);
  }
  if (report.biggestIncomeCategory) {
    line("Biggest Income Category", `${report.biggestIncomeCategory.name} · ${code} ${report.biggestIncomeCategory.total.toLocaleString()}`);
  }
  if (report.biggestSingleExpense) {
    line("Biggest Single Expense", `${report.biggestSingleExpense.description} · ${code} ${report.biggestSingleExpense.amount.toLocaleString()}`);
  }
  if (report.biggestSingleIncome) {
    line("Biggest Single Income", `${report.biggestSingleIncome.description} · ${code} ${report.biggestSingleIncome.amount.toLocaleString()}`);
  }
  if (report.mostFrequentCategory) {
    line("Most Frequent Category", `${report.mostFrequentCategory.name} · ${report.mostFrequentCategory.count}x`);
  }
  if (report.topCategoryConcentration != null) {
    line("Top 3 Categories Share", `${report.topCategoryConcentration}%`);
  }
  line("No-Spend Days", `${report.disciplineDays}`);

  if (report.expenseBreakdown.length > 0) {
    y += 4;
    sectionHeader("Expense Breakdown");
    report.expenseBreakdown.forEach((row) => {
      line(row.name, `${code} ${row.total.toLocaleString()}`);
    });
  }

  doc.save(buildReportFilename(month, year));
}