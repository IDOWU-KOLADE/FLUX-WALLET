// Curated set of finance-relevant emojis for the category emoji picker.
// Not the full unicode range on purpose — a finance app's categories cluster
// around a handful of real-life themes, so a big open picker just adds noise.
// Swap this for an emoji-mart array later if you ever want full coverage;
// EmojiPickerModal just renders whatever array it's given.

export const EMOJI_OPTIONS = [
  // Food & drink
  "🍔", "🍕", "☕", "🍎", "🍜",
  // Transport
  "🚗", "🚕", "🚌", "✈️", "⛽",
  // Home & bills
  "💡", "🏠", "🔧", "🧾", "📶",
  // Entertainment
  "🎬", "🎮", "🎵", "🎨", "🎟️",
  // Shopping
  "🛒", "👕", "👟", "💄", "🎁",
  // Health & fitness
  "❤️", "🏥", "💊", "🏋️", "🧴",
  // Education
  "🎓", "📚", "✏️", "🎒", "🧑‍🏫",
  // Income & work
  "💰", "💻", "📈", "💼", "🏦",
  // Travel
  "🧳", "🗺️", "🏖️", "🚆", "🗽",
  // Misc / other
  "🐾", "🌱", "⭐", "💎", "🔘",
];
// emojiBackgrounds.js
export const EMOJI_BACKGROUNDS = {
  "🍔": "#fff3e0", "🍕": "#fff3e0", "☕": "#efe0d0", "🍎": "#fee2e2", "🍜": "#fff3e0",
  "🚗": "#e3f2fd", "🚕": "#e3f2fd", "🚌": "#e3f2fd", "✈️": "#e0f2fe", "⛽": "#e3f2fd",
  "💡": "#e8f5e9", "🏠": "#e8f5e9", "🔧": "#f1f5f9", "🧾": "#f1f5f9", "📶": "#e8f5e9",
  "🎬": "#f3e5f5", "🎮": "#f3e5f5", "🎵": "#f3e5f5", "🎨": "#f3e5f5", "🎟️": "#f3e5f5",
  "🛒": "#fce7f3", "👕": "#fce7f3", "👟": "#fce7f3", "💄": "#fce7f3", "🎁": "#fce7f3",
  "❤️": "#fee2e2", "🏥": "#fee2e2", "💊": "#fee2e2", "🏋️": "#fee2e2", "🧴": "#fee2e2",
  "🎓": "#e0e7ff", "📚": "#e0e7ff", "✏️": "#e0e7ff", "🎒": "#e0e7ff", "🧑‍🏫": "#e0e7ff",
  "💰": "#fff9db", "💻": "#e0e7ff", "📈": "#dcfce7", "💼": "#fff9db", "🏦": "#fff9db",
  "🧳": "#e0f2fe", "🗺️": "#e0f2fe", "🏖️": "#e0f2fe", "🚆": "#e3f2fd", "🗽": "#e0f2fe",
  "🐾": "#f1f5f9", "🌱": "#dcfce7", "⭐": "#fff9db", "💎": "#e0e7ff", "🔘": "#f1f5f9",
};

export const DEFAULT_EMOJI_BG = "#f1f5f9"; // neutral fallback if an emoji isn't in the table