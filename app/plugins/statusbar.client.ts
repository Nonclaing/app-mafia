import { defineNuxtPlugin } from "#app";
import { StatusBar, Style } from "@capacitor/status-bar";
import { Capacitor } from "@capacitor/core";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook("app:mounted", async () => {
    // Защита: только на нативных платформах
    if (!Capacitor.isNativePlatform()) return;

    try {
      await StatusBar.setStyle({ style: Style.Light });
      console.log("StatusBar инициализирован");
    }
    catch (err) {
      console.error("StatusBar error:", err);
    }
  });
});
