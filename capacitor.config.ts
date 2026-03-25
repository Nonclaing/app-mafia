import type { CapacitorConfig } from "@capacitor/cli";
import { Style } from "@capacitor/status-bar";

const config: CapacitorConfig = {
  appId: "app.mafia",
  appName: "Мафия",
  webDir: ".output/public",
  server: {
    allowNavigation: ["/rest/**", "habr.com"],
  },
  plugins: {
    plugins: {
      CapacitorUpdater: {
        autoUpdate: false,
      },
    },
    CapacitorHttp: {
      enabled: true,
    },
    CapacitorCookies: {
      enabled: true,
    },
    SystemBars: {
      insetsHandling: "disable",
    },
    Keyboard: {
      resizeOnFullScreen: false,
    },
    EdgeToEdge: {
      backgroundColor: "#0f172b",
      navigationBarColor: "#0f172b",
      statusBarColor: "#0f172b",
    },
    StatusBar: {
      overlaysWebView: false,
      style: Style.Light,
      backgroundColor: "#0f172b",
    },
    SplashScreen: {
      launchAutoHide: true,
      launchFadeOutDuration: 500, // плавное затухание (опционально)
      backgroundColor: "#0f172b", // цвет фона под сплешем
      androidScaleType: "CENTER_CROP", // очень важно для Android
      splashFullScreen: true,
      splashImmersive: true, // убирает статус-бар и навигацию
    },
  },
};

export default config;
