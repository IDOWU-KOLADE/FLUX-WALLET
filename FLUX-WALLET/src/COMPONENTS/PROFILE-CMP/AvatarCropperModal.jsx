import { useState, useRef, useEffect } from "react";

const VIEWPORT = 200;

export function AvatarCropperModal({ imageSrc, onCancel, onSave }) {
  const [naturalSize, setNaturalSize] = useState(null);
  const [zoom, setZoom] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const imgElRef = useRef(null);
  const dragStartRef = useRef(null);
  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      imgElRef.current = img;
      setNaturalSize({ width: img.width, height: img.height });
    };
    img.src = imageSrc;
  }, [imageSrc]);

  const baseScale = naturalSize ? VIEWPORT / Math.min(naturalSize.width, naturalSize.height) : 1;
  const effectiveScale = baseScale * zoom;
  const displayWidth = naturalSize ? naturalSize.width * effectiveScale : 0;
  const displayHeight = naturalSize ? naturalSize.height * effectiveScale : 0;
  const maxOffsetX = Math.max((displayWidth - VIEWPORT) / 2, 0);
  const maxOffsetY = Math.max((displayHeight - VIEWPORT) / 2, 0);

  const clamp = (val, max) => Math.min(Math.max(val, -max), max);

  useEffect(() => {
    setOffset((prev) => ({
      x: clamp(prev.x, maxOffsetX),
      y: clamp(prev.y, maxOffsetY),
    }));
  }, [zoom, naturalSize]);

  const handlePointerDown = (e) => {
    dragStartRef.current = { x: e.clientX - offset.x, y: e.clientY - offset.y };
    setDragging(true);
  };
  const handlePointerMove = (e) => {
    if (!dragging) return;
    const newX = clamp(e.clientX - dragStartRef.current.x, maxOffsetX);
    const newY = clamp(e.clientY - dragStartRef.current.y, maxOffsetY);
    setOffset({ x: newX, y: newY });
  };
  const handlePointerUp = () => setDragging(false);

  const handleSave = () => {
    const canvas = document.createElement("canvas");
    canvas.width = VIEWPORT;
    canvas.height = VIEWPORT;
    const ctx = canvas.getContext("2d");
    const left = VIEWPORT / 2 - displayWidth / 2 + offset.x;
    const top = VIEWPORT / 2 - displayHeight / 2 + offset.y;
    ctx.drawImage(imgElRef.current, left, top, displayWidth, displayHeight);
    onSave(canvas.toDataURL("image/jpeg", 0.85));
  };

  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal-box avatar-cropper-box" onClick={(e) => e.stopPropagation()}>
        <h3 className="modal-title">Adjust Your Photo</h3>

        <div
          className="avatar-cropper-viewport"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
        >
          {naturalSize && (
            <img
              src={imageSrc}
              alt="Crop preview"
              className="avatar-cropper-img"
              style={{
                width: displayWidth,
                height: displayHeight,
                transform: `translate(-50%, -50%) translate(${offset.x}px, ${offset.y}px)`,
              }}
              draggable={false}
            />
          )}
        </div>

        <input
          type="range"
          min="1"
          max="3"
          step="0.05"
          value={zoom}
          onChange={(e) => setZoom(Number(e.target.value))}
          className="avatar-cropper-zoom"
        />

        <div className="report-modal-actions">
          <button className="btn-text" onClick={onCancel}>Cancel</button>
          <button className="btn-continue" onClick={handleSave}>Save</button>
        </div>
      </div>
    </div>
  );
}