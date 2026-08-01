import { useState, useEffect } from "react";
import QRCode from "qrcode";

const MOBILE_MAX_WIDTH = 600;

export function DesktopGate({ children }) {
  const [isTooWide, setIsTooWide] = useState(
    typeof window !== "undefined" && window.innerWidth > MOBILE_MAX_WIDTH
  );
  const [qrDataUrl, setQrDataUrl] = useState(null);

  useEffect(() => {
    const handleResize = () => setIsTooWide(window.innerWidth > MOBILE_MAX_WIDTH);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!isTooWide) return;
    const pageUrl = window.location.href;
    QRCode.toDataURL(pageUrl, { width: 200, margin: 1 })
      .then(setQrDataUrl)
      .catch(() => setQrDataUrl(null));
  }, [isTooWide]);

  if (isTooWide) {
    return (
      <div className="desktop-gate">
        <div className="desktop-gate-card">
          <img className="desktop-gate-logo" src="/IMAGES/Fluxlogo.png" alt="Flux Wallet" />
          <h1 className="desktop-gate-title">Flux Wallet is built for your phone</h1>
          <p className="desktop-gate-body">
            We designed the whole experience around a mobile screen — quick
            taps, thumb-friendly navigation, one hand on the go. Scan the
            code below to open it on your phone.
          </p>
          <div className="desktop-gate-qr-wrap">
            {qrDataUrl ? (
              <img className="desktop-gate-qr" src={qrDataUrl} alt="Scan to open Flux Wallet on your phone" />
            ) : (
              <div className="desktop-gate-qr-loading" />
            )}
          </div>
          <p className="desktop-gate-caption">Point your phone's camera at the code</p>
        </div>
      </div>
    );
  }

  return children;
}