import type { UpdateStatus, UpdateStrategy } from "~/types/app-update";

export const useAppUpdate = () => {
  const config = useRuntimeConfig();
  const { $appUpdater } = useNuxtApp();

  const status = useState<UpdateStatus>("app-update:status", () => "IDLE");
  const strategy = useState<UpdateStrategy>("app-update:strategy", () => "NONE");
  const remoteVersion = useState<string>("app-update:remoteVersion", () => "");
  const releaseNotes = useState<string>("app-update:releaseNotes", () => "");
  const bundleUrl = useState<string>("app-update:bundleUrl", () => "");
  const downloadProgress = useState<number>("app-update:downloadProgress", () => 0);
  const downloadedBundle = useState<unknown | null>(
    "app-update:downloadedBundle",
    () => null,
  );
  const error = useState<string | null>("app-update:error", () => null);
  const initialized = useState<boolean>("app-update:initialized", () => false);

  async function init() {
    console.log("init");
    if (initialized.value) return;
    initialized.value = true;

    await $appUpdater.notifyAppReady();
    await checkForUpdate();
  }

  async function checkForUpdate() {
    status.value = "CHECKING";
    error.value = null;

    try {
      const release = await useGetGithubRelease();

      const version = await $appUpdater.getAppVersion();
      const current = parseSemver(version);
      const remote = parseSemver(release.tag_name);

      if (!current || !remote) {
        throw new Error("Invalid semver format");
      }

      remoteVersion.value = release.tag_name;
      releaseNotes.value = release.body ?? "";

      if (hasNativeUpdate(current, remote)) {
        strategy.value = "NATIVE";
        status.value = "AVAILABLE";
        bundleUrl.value = "";
        return;
      }

      if (hasPatchUpdate(current, remote)) {
        const asset = release.assets.find((item) => item.name === "app-bundle.zip");

        if (!asset) {
          throw new Error("app-bundle.zip not found in release assets");
        }

        strategy.value = "PATCH";
        status.value = "AVAILABLE";
        bundleUrl.value = asset.browser_download_url;
        return;
      }

      strategy.value = "NONE";
      status.value = "UP_TO_DATE";
      bundleUrl.value = "";
    }
    catch (e) {
      status.value = "ERROR";
      error.value = e instanceof Error ? e.message : String(e);
    }
  }

  async function downloadPatch() {
    if (!bundleUrl.value || !remoteVersion.value) return;

    status.value = "DOWNLOADING";
    downloadProgress.value = 0;
    error.value = null;

    const progressHandle = await $appUpdater.addDownloadListener(({ percent }) => {
      downloadProgress.value = percent;
    });

    const failedHandle = await $appUpdater.addDownloadFailedListener(() => {
      status.value = "ERROR";
      error.value = "Download failed";
    });

    try {
      downloadedBundle.value = await $appUpdater.downloadBundle(
        bundleUrl.value,
        remoteVersion.value,
      );
      status.value = "DOWNLOADED";
    }
    catch (e) {
      status.value = "ERROR";
      error.value = e instanceof Error ? e.message : String(e);
    }
    finally {
      await progressHandle?.remove?.().catch(() => undefined);
      await failedHandle?.remove?.().catch(() => undefined);
    }
  }

  async function applyUpdate() {
    if (!downloadedBundle.value) return;

    await $appUpdater.setCurrentBundle(downloadedBundle.value);

    const storeUrl = config.public.appStoreUrl;
    if (storeUrl) {
      window.open(storeUrl, "_blank", "noopener,noreferrer");
    }
  }

  return {
    status,
    strategy,
    remoteVersion,
    releaseNotes,
    bundleUrl,
    downloadProgress,
    downloadedBundle,
    error,
    init,
    checkForUpdate,
    downloadPatch,
    applyUpdate,
  };
};
