import { useState, useEffect, useCallback } from "react";

function detectIOS() {
  return /iphone|ipad|ipod/i.test(window.navigator.userAgent);
}

function detectStandalone() {
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    window.navigator.standalone === true
  );
}

export function usePwaInstall() {
  const [isStandalone, setIsStandalone] = useState(detectStandalone);
  const [isIOS] = useState(detectIOS);
  const [deferredPrompt, setDeferredPrompt] = useState(null);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    const handleAppInstalled = () => {
      setIsStandalone(true);
      setDeferredPrompt(null);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.addEventListener("appinstalled", handleAppInstalled);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, []);

  const promptInstall = useCallback(async () => {
    if (!deferredPrompt) return null;
    deferredPrompt.prompt();
    const choice = await deferredPrompt.userChoice;
    setDeferredPrompt(null);
    return choice;
  }, [deferredPrompt]);

  // platform is exclusive: a device is only ever one or the other, or neither once installed
  const platform = isStandalone ? null : isIOS ? "ios" : deferredPrompt ? "android" : null;

  return { isStandalone, platform, promptInstall };
}