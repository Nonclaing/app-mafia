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
    // OTA (hot-updates) обновления
    CapacitorUpdater: {
      autoUpdate: false,
    },
    // Работа с http
    CapacitorHttp: {
      enabled: true,
    },
    // Работа с куками
    CapacitorCookies: {
      enabled: true,
    },
    // Отключение базового статусбара
    SystemBars: {
      style: Style.Dark,
      insetsHandling: "disable",
    },
    // Плагина для резервирования пространства у статус бара
    EdgeToEdge: {
      backgroundColor: "#0f172b",
      navigationBarColor: "#0f172b",
      statusBarColor: "#0f172b",
    },
    // Настройка статусбара в старых android
    StatusBar: {
      overlaysWebView: false,
      style: Style.Dark,
      backgroundColor: "#0f172b",
    },
    // Начальный экран открытия приложения
    SplashScreen: {
      launchAutoHide: true,
      launchFadeOutDuration: 500, // плавное затухание (опционально)
      backgroundColor: "#ffffff", // цвет фона под сплешем
      androidScaleType: "CENTER_CROP", // очень важно для Android
      splashFullScreen: true,
      splashImmersive: true, // убирает статус-бар и навигацию
    },
  },
};

export default config;
