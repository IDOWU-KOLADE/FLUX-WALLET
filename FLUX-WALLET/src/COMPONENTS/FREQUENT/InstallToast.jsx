import { usePwaInstall } from "../../hooks/usePwaInstall";

export function InstallToast() {
  const { showInstallToast } = usePwaInstall();

  if (!showInstallToast) return null;

  return (
    <div className="install-toast">
      Stay on this page while the app installs…
    </div>
  );
}