// app/plugins/app-updater.client.ts
import { Capacitor } from "@capacitor/core";
import { CapacitorUpdater } from "@capgo/capacitor-updater";
import type { AppUpdaterRuntime } from "~/types/app-update";

export default defineNuxtPlugin(() => {
  const runtime: AppUpdaterRuntime = {
    async getAppVersion() {
      if (!Capacitor.isNativePlatform()) {
        // fallback для веба
        return useRuntimeConfig().public.appVersion;
      }

      const info = await CapacitorUpdater.current();
      return info.bundle.version;
    },

    async notifyAppReady() {
      if (!Capacitor.isNativePlatform()) return;
      await CapacitorUpdater.notifyAppReady();
    },

    downloadBundle(url, version) {
      return CapacitorUpdater.download({ url, version });
    },

    setCurrentBundle(bundle) {
      return CapacitorUpdater.set(bundle);
    },

    addDownloadListener(listener) {
      return CapacitorUpdater.addListener("download", listener);
    },

    addDownloadFailedListener(listener) {
      return CapacitorUpdater.addListener("downloadFailed", listener);
    },
  };

  return {
    provide: {
      appUpdater: runtime,
    },
  };
});
