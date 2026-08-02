import { useState, useEffect } from "react";
import { usePwaInstall } from "../../hooks/usePwaInstall";
import { InstallPromptModal } from "./InstallPromptModal";

const DISMISS_KEY = "fluxInstallDismissCount";
const MAX_DISMISSALS = 5;

function getDismissCount() {
  return Number(localStorage.getItem(DISMISS_KEY) || 0);
}
function incrementDismissCount() {
  localStorage.setItem(DISMISS_KEY, String(getDismissCount() + 1));
}

export function AutoInstallPrompt() {
  const { platform, promptInstall } = usePwaInstall();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (platform && getDismissCount() < MAX_DISMISSALS) {
      setVisible(true);
    }
  }, [platform]);

  const handleClose = () => {
    incrementDismissCount();
    setVisible(false);
  };

  const handleInstall = async () => {
    await promptInstall();
    incrementDismissCount();
    setVisible(false);
  };

  if (!visible || !platform) return null;

  return (
    <InstallPromptModal platform={platform} onInstall={handleInstall} onClose={handleClose} />
  );
}