/// <reference lib="WebWorker" />
/// <reference types="vite/client" />

import { clientsClaim } from "workbox-core";
import { cleanupOutdatedCaches, createHandlerBoundToURL, precacheAndRoute } from "workbox-precaching";
import { registerRoute, NavigationRoute } from "workbox-routing";
import { CacheFirst, NetworkFirst, StaleWhileRevalidate } from "workbox-strategies";
import { ExpirationPlugin } from "workbox-expiration";
import { CacheableResponsePlugin } from "workbox-cacheable-response";
import { includes } from "es-toolkit/compat";

declare let self: ServiceWorkerGlobalScope;

// ==================================================
// Предварительное кэширование (Vite заменит __WB_MANIFEST при сборке)
// ==================================================
precacheAndRoute(self.__WB_MANIFEST);
cleanupOutdatedCaches();
// ==================================================
// Навигационные запросы (HTML, маршруты SPA)
// ==================================================
let allowlist: undefined | RegExp[];
if (import.meta.env.DEV)
  allowlist = [/^\/$/]; // разрешаем только главную в dev, чтобы не ломать HMR
registerRoute(
  new NavigationRoute(createHandlerBoundToURL("/"), { allowlist }),
);
// ==================================================
// JS, CSS — StaleWhileRevalidate (быстро, с автообновлением)
// ==================================================
registerRoute(
  ({ request, url }) =>
    includes(["script", "style"], request.destination) || url.pathname.endsWith(".json"),
  new StaleWhileRevalidate({
    cacheName: "assets",
    plugins: [
      new CacheableResponsePlugin({ statuses: [0, 200] }),
      new ExpirationPlugin({
        maxEntries: 60,
        maxAgeSeconds: 7 * 24 * 60 * 60, // 7 дней
      }),
    ],
  }),
);
// ==================================================
// Изображения — CacheFirst (экономия трафика)
// ==================================================
registerRoute(
  ({ request }) => includes(["image"], request.destination),
  new CacheFirst({
    cacheName: "images",
    plugins: [
      new CacheableResponsePlugin({ statuses: [0, 200] }),
      new ExpirationPlugin({
        maxEntries: 100,
        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 дней
      }),
    ],
  }),
);
// ==================================================
// Аудио — CacheFirst (экономия трафика)
// ==================================================
registerRoute(
  ({ url }) => url.pathname.endsWith(".mp3"),
  new CacheFirst({
    cacheName: "images",
    plugins: [
      new CacheableResponsePlugin({ statuses: [0, 200] }),
      new ExpirationPlugin({
        maxEntries: 100,
        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 дней
      }),
    ],
  }),
);
// ==================================================
// Шрифты (.woff2) — CacheFirst (идеально для статичных ресурсов)
// ==================================================
registerRoute(
  ({ url }) => url.pathname.endsWith(".woff2"),
  new CacheFirst({
    cacheName: "fonts",
    plugins: [
      new CacheableResponsePlugin({ statuses: [0, 200] }),
      new ExpirationPlugin({
        maxEntries: 20,
        maxAgeSeconds: 60 * 24 * 60 * 60, // 60 дней
      }),
    ],
  }),
);

// ==================================================
// Финализация
// ==================================================
self.skipWaiting();
clientsClaim();
