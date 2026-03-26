export const useAppUpdaterStore = defineStore("appUpdater", () => {
  const status = ref<AppUpdateStatus>(APP_UPDATE_STATUSES.IDLE);
  const strategy = ref<UpdateStrategy>(UPDATE_STRATEGIES.NONE);

  const remoteVersion = ref("");
  const releaseDescription = ref("");
  const bundleDownloadUrl = ref("");
  const downloadProgress = ref(0);
  const error = ref("");

  const downloadedBundle = ref<any>(null);

  const setAvailableUpdate = (strat: UpdateStrategy, version: string, desc: string, url: string = "") => {
    status.value = APP_UPDATE_STATUSES.AVAILABLE;
    strategy.value = strat;
    remoteVersion.value = version;
    releaseDescription.value = desc;
    bundleDownloadUrl.value = url;
  };

  const startDownload = async () => {
    if (!bundleDownloadUrl.value || !remoteVersion.value) return;
    status.value = APP_UPDATE_STATUSES.DOWNLOADING;
    downloadProgress.value = 0;

    // Подписка на события до начала скачивания
    capgoAdapter.onDownloadProgress((percent) => {
      downloadProgress.value = percent;
    });

    capgoAdapter.onDownloadFailed(() => {
      status.value = APP_UPDATE_STATUSES.ERROR;
      error.value = "Ошибка загрузки бандла";
    });

    try {
      const bundle = await capgoAdapter.downloadBundle(bundleDownloadUrl.value, remoteVersion.value);
      status.value = APP_UPDATE_STATUSES.DOWNLOADED;
      downloadedBundle.value = bundle;
    }
    catch (err) {
      status.value = APP_UPDATE_STATUSES.ERROR;
      error.value = String(err);
    }
  };

  const applyUpdate = async () => {
    if (!downloadedBundle.value) return;
    await capgoAdapter.setCurrentBundle(downloadedBundle.value);
    await capgoAdapter.minimizeApp(); // Сворачиваем для бесшовного применения бандла
  };

  return {
    status, strategy, remoteVersion, releaseDescription,
    downloadProgress, error,
    setAvailableUpdate, startDownload, applyUpdate,
  };
});
