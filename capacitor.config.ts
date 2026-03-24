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
      backgroundColor: "#ffffff",
      navigationBarColor: "#ffffff",
      statusBarColor: "#ffffff",
    },
    StatusBar: {
      overlaysWebView: false,
      style: Style.Light,
      backgroundColor: "#ffffffff",
    },
    SplashScreen: {
      launchAutoHide: true,
      launchFadeOutDuration: 500, // плавное затухание (опционально)
      backgroundColor: "#000", // цвет фона под сплешем
      androidScaleType: "CENTER_CROP", // очень важно для Android
      splashFullScreen: true,
      splashImmersive: true, // убирает статус-бар и навигацию
    },
  },
};

export default config;
