import { useState, useEffect, useRef } from "react";
import { X } from "lucide-react";

const ITEM_HEIGHT = 44;
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

function WheelColumn({ items, centerIndex, onSettle }) {
  const itemRefs = useRef([]);
  const timeoutRef = useRef(null);

  useEffect(() => {
    // Let the browser compute true centering instead of trusting manual pixel math.
    itemRefs.current[centerIndex]?.scrollIntoView({ block: "center", behavior: "auto" });
  }, [centerIndex]);

  const handleScroll = (e) => {
    clearTimeout(timeoutRef.current);
    const scrollTop = e.target.scrollTop;
    timeoutRef.current = setTimeout(() => {
      const index = Math.round(scrollTop / ITEM_HEIGHT);
      onSettle(index);
    }, 120);
  };

  return (
    <div className="wheel-column" onScroll={handleScroll}>
      <div style={{ height: ITEM_HEIGHT }} />
      {items.map((label, i) => {
        const distance = Math.abs(i - centerIndex);
        const opacity = distance === 0 ? 1 : distance === 1 ? 0.35 : 0.15;
        return (
          <div
            key={i}
            ref={(el) => (itemRefs.current[i] = el)}
            className={`wheel-item ${distance === 0 ? "wheel-item--center" : ""}`}
            style={{ opacity }}
          >
            {label}
          </div>
        );
      })}
      <div style={{ height: ITEM_HEIGHT }} />
    </div>
  );
}

export function JumpToDateModal({ isOpen, onClose, availableYears, currentMonth, currentYear, onSave }) {
  const [monthIndex, setMonthIndex] = useState(currentMonth);
  const [yearIndex, setYearIndex] = useState(Math.max(0, availableYears.indexOf(currentYear)));

  useEffect(() => {
    if (isOpen) {
      setMonthIndex(currentMonth);
      setYearIndex(Math.max(0, availableYears.indexOf(currentYear)));
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="jump-to-date-modal" onClick={(e) => e.stopPropagation()}>
        <div className="jump-to-date-header">
          <h3>Jump to Date</h3>
          <button onClick={onClose} aria-label="Close">
            <X size={20} />
          </button>
        </div>

        <div className="wheel-wrap">
          <div className="wheel-center-indicator" />
          <WheelColumn items={MONTHS} centerIndex={monthIndex} onSettle={setMonthIndex} />
          <WheelColumn
            items={availableYears.map(String)}
            centerIndex={yearIndex}
            onSettle={setYearIndex}
          />
        </div>

        <button
          className="jump-to-date-save-btn"
          onClick={() => {
            onSave(monthIndex, availableYears[yearIndex]);
            onClose();
          }}
        >
          Save
        </button>
      </div>
    </div>
  );
}