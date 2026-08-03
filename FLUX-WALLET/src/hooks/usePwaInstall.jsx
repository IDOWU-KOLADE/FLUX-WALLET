import { useSyncExternalStore, useCallback } from "react";

function detectIOS() {
  return /iphone|ipad|ipod/i.test(window.navigator.userAgent);
}

function detectStandalone() {
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    window.navigator.standalone === true
  );
}

// Singleton state — lives at module scope, not inside any component, so it's
// shared by every call to usePwaInstall() no matter which component mounted first.
let state = {
  isStandalone: detectStandalone(),
  isIOS: detectIOS(),
  deferredPrompt: null,
   showInstallToast: false,   // NEW
};

const listeners = new Set();

function emitChange() {
  listeners.forEach((listener) => listener());
}

function setState(partial) {
  state = { ...state, ...partial };
  emitChange();
}

// Registered ONCE, the moment this module is first imported (which happens the
// instant App.jsx loads, since AutoInstallPrompt imports this hook at the root).
// Whichever page is on screen when the browser actually fires the event no longer
// matters — this listener is always live from app start.
window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  setState({ deferredPrompt: e });
});

window.addEventListener("appinstalled", () => {
  setState({ isStandalone: true, deferredPrompt: null });
});

function subscribe(callback) {
  listeners.add(callback);
  return () => listeners.delete(callback);
}

function getSnapshot() {
  return state;
}

export function usePwaInstall() {
  const snapshot = useSyncExternalStore(subscribe, getSnapshot);

 const promptInstall = useCallback(async () => {
    if (!snapshot.deferredPrompt) return null;
    setState({ showInstallToast: true });
    setTimeout(() => setState({ showInstallToast: false }), 5000);
    snapshot.deferredPrompt.prompt();
    const choice = await snapshot.deferredPrompt.userChoice;
    setState({ deferredPrompt: null });
    return choice;
  }, [snapshot.deferredPrompt]);

  const platform = snapshot.isStandalone
    ? null
    : snapshot.isIOS
    ? "ios"
    : snapshot.deferredPrompt
    ? "android"
    : null;
return {
    isStandalone: snapshot.isStandalone,
    platform,
    promptInstall,
    showInstallToast: snapshot.showInstallToast,   // NEW
  };
}