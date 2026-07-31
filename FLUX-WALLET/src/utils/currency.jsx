export const CURRENCY_SYMBOLS = { NGN: "₦", USD: "$" };
export const CURRENCY_CODES = { NGN: "NGN", USD: "USD" }; // text codes — used only by the PDF export, since jsPDF can't reliably render ₦

// Handles negative amounts too (e.g. Dashboard's Total Balance can go negative),
// so this one function covers every place amounts get displayed — sign is
// extracted and placed BEFORE the symbol: -₦20,000, not ₦-20,000.
export function formatAmount(amount, currency) {
  const symbol = CURRENCY_SYMBOLS[currency] ?? "";
  const sign = amount < 0 ? "-" : "";
  return `${sign}${symbol}${Math.abs(Number(amount)).toLocaleString()}`;
}