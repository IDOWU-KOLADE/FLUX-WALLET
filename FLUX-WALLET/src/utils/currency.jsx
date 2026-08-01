export const CURRENCY_SYMBOLS = { NGN: "₦", USD: "$" };
export const CURRENCY_CODES = { NGN: "NGN", USD: "USD" }; // text codes — used only by the PDF export, since jsPDF can't reliably render ₦

export const CURRENCIES = [
  { code: "NGN", symbol: CURRENCY_SYMBOLS.NGN, name: "Nigerian Naira" },
  { code: "USD", symbol: CURRENCY_SYMBOLS.USD, name: "US Dollar" },
];
export function formatAmount(amount, currency) {
  const symbol = CURRENCY_SYMBOLS[currency] ?? "";
  const sign = amount < 0 ? "-" : "";
  return `${sign}${symbol}${Math.abs(Number(amount)).toLocaleString()}`;
}