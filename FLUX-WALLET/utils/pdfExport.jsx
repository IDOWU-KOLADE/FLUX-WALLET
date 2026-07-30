import jsPDF from "jspdf";

const CURRENCY_CODE = { NGN: "NGN", USD: "USD" }; // text codes, not symbols — see earlier PDF font discussion

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
  const code = CURRENCY_CODE[currency] ?? "";
  return `${sign} ${code} ${Number(amount).toLocaleString()}`;
}

function formatPdfDate(dateStr) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function buildFilterSummary(activeTab, selectedCategoryIds, categories) {
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

function buildFilename({ activeTab, selectedCategoryIds, categories, currentMonth, currentYear }) {
  const MONTH_ABBR = ["jan","feb","mar","apr","may","jun","jul","aug","sep","oct","nov","dec"];
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

export async function exportTransactionsPDF({
  transactions,
  categories,
  currency,
  activeTab,
  selectedCategoryIds,
  currentMonth,
  currentYear,
}) {
  const doc = new jsPDF({ unit: "mm", format: "a4" }); // portrait is the default, so no orientation arg needed
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 15;
  const contentWidth = pageWidth - margin * 2;

  // Column x-positions, laid out left to right within contentWidth
  const col = {
    date: margin,
    description: margin + 25,
    category: margin + 85,
    type: margin + 130,
    amount: pageWidth - margin, // right-aligned, so this is the right EDGE, not a start point
  };

  let y = 20;

  // --- Header (logo + title) — only drawn once, on page 1 ---
  try {
    const logoBase64 = await loadImageAsBase64("/IMAGES/Fluxlogo.png");
    const logoWidth = 32;
    const logoHeight = 12; // adjust this ratio once you see real output — we don't know the file's exact aspect ratio yet
    doc.addImage(logoBase64, "PNG", (pageWidth - logoWidth) / 2, y, logoWidth, logoHeight);
    y += logoHeight + 6;
  } catch {
    y += 4; // if the logo fails to load for any reason, just skip it rather than breaking the whole export
  }

  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.text("Transaction History", pageWidth / 2, y, { align: "center" });
  y += 7;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(120, 120, 120);
  const filterSummary = buildFilterSummary(activeTab, selectedCategoryIds, categories);
  doc.text(filterSummary, pageWidth / 2, y, { align: "center" });
  y += 5;

  doc.setFontSize(8);
  const generatedOn = new Date().toLocaleDateString("en-US", {
    month: "long", day: "numeric", year: "numeric",
  });
  doc.text(`Generated on ${generatedOn}`, pageWidth / 2, y, { align: "center" });
  y += 6;

  doc.setDrawColor(220, 220, 220);
  doc.line(margin, y, pageWidth - margin, y);
  y += 8;

  // --- Table header row (this gets redrawn on every new page, unlike the logo) ---
  function drawColumnHeaders() {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(30, 30, 30);
    doc.text("Date", col.date, y);
    doc.text("Description", col.description, y);
    doc.text("Category", col.category, y);
    doc.text("Type", col.type, y);
    doc.text("Amount", col.amount, y, { align: "right" });
    y += 3;
    doc.setDrawColor(30, 30, 30);
    doc.line(margin, y, pageWidth - margin, y);
    y += 6;
  }

  drawColumnHeaders();

  // --- Table rows ---
  const rowHeight = 8;
  const footerReserve = 20; // leave room at the bottom of the last page for the totals block
  let total = 0;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);

  transactions.forEach((t) => {
    if (y + rowHeight > pageHeight - footerReserve) {
      doc.addPage();
      y = 20;
      drawColumnHeaders();
    }

    const category = categories.find((c) => c.id === t.categoryId);

    doc.setTextColor(60, 60, 60);
    doc.text(formatPdfDate(t.date), col.date, y);

    // Truncate long descriptions so they never overlap the Category column
    const maxDescWidth = col.category - col.description - 4;
    const descLines = doc.splitTextToSize(t.description, maxDescWidth);
    doc.text(descLines[0], col.description, y); // first line only — keeps every row the same height

    doc.text(category?.name ?? "Uncategorized", col.category, y);
    doc.text(t.type === "income" ? "Income" : "Expense", col.type, y);

    doc.setTextColor(t.type === "income" ? 34 : 200, t.type === "income" ? 150 : 50, t.type === "income" ? 80 : 50);
    doc.text(formatPdfAmount(t.amount, t.type, currency), col.amount, y, { align: "right" });

    y += 5;
    doc.setDrawColor(235, 235, 235);
    doc.line(margin, y, pageWidth - margin, y);
    y += 5;

    total += t.type === "income" ? t.amount : -t.amount;
  });

  // --- Footer totals ---
  if (y + footerReserve > pageHeight) {
    doc.addPage();
    y = 20;
  }
  y += 4;
  doc.setDrawColor(30, 30, 30);
  doc.line(margin, y, pageWidth - margin, y);
  y += 7;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(30, 30, 30);
  const code = CURRENCY_CODE[currency] ?? "";
  doc.text(`Total: ${code} ${Math.abs(total).toLocaleString()}`, pageWidth - margin, y, { align: "right" });

  y += 5;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(130, 130, 130);
  doc.text(`${transactions.length} transaction${transactions.length === 1 ? "" : "s"}`, pageWidth - margin, y, { align: "right" });

  const filename = buildFilename({ activeTab, selectedCategoryIds, categories, currentMonth, currentYear });
  doc.save(filename);
}