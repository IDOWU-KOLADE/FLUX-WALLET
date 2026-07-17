import { X } from "lucide-react";
import { EMOJI_OPTIONS } from "./emojiData";

/**
 * Popup grid for picking a category emoji.
 * selectedEmoji: currently chosen emoji, highlighted in the grid.
 * onSelect(emoji): called when the user taps an option — parent updates form state.
 * onClose: called on X tap or backdrop tap.
 */
export function EmojiPickerModal({ selectedEmoji, onSelect, onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="emoji-picker" onClick={(e) => e.stopPropagation()}>
        <div className="emoji-picker-header">
          <h3>Choose an emoji</h3>
          <button type="button" className="emoji-picker-close" onClick={onClose} aria-label="Close">
            <X size={20} />
          </button>
        </div>

        <div className="emoji-picker-grid">
          {EMOJI_OPTIONS.map((emoji, i) => (
            <button
              type="button"
              key={`${emoji}-${i}`}
              className={`emoji-picker-option ${selectedEmoji === emoji ? "emoji-picker-option--selected" : ""}`}
              onClick={() => onSelect(emoji)}
            >
              {emoji}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}