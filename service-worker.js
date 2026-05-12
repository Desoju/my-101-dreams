const CACHE_NAME = "my-101-dreams-v15";

const FILES_TO_CACHE = [
  "./",
  "./index.html",
  "./manifest.json",
  "./css/style.css",
  "./offline.html",

  "./pages/add-dream.html",
  "./pages/dream-detail.html",
  "./pages/categories.html",

  "./icons/icon-192.png",
  "./icons/icon-512.png",

  "./js/shared/storage.js",
  "./js/shared/text.js",
  "./js/shared/dates.js",
  "./js/shared/backup.js",

  "./js/pwa/pwa-install.js",
  "./js/pwa/pwa-update.js",

  "./js/shared/categories/category-data.js",
  "./js/shared/categories/category-storage.js",
  "./js/shared/categories/category-ui.js",
  "./js/shared/categories/category-validation.js",
  "./js/shared/categories/categories-page.js",

  "./js/dreams/core/dream-status.js",
  "./js/dreams/core/dream-priority.js",
  "./js/dreams/core/dream-progress.js",
  "./js/dreams/core/dream-stats.js",
  "./js/dreams/core/dream-validation.js",

  "./js/dreams/filters/filter-sort.js",
  "./js/dreams/filters/filter-logic.js",
  "./js/dreams/filters/filter-ui.js",
  "./js/dreams/filters/filter-setup.js",

  "./js/dreams/home/index-stats.js",
  "./js/dreams/home/index-render.js",
  "./js/dreams/home/index-stat-filters.js",
  "./js/dreams/home/index.js",

  "./js/dreams/add/add-dream.js",

  "./js/dreams/detail/detail-progress.js",
  "./js/dreams/detail/detail-subgoals.js",
  "./js/dreams/detail/detail-edit.js",
  "./js/dreams/detail/detail-data.js",
  "./js/dreams/detail/detail-render.js",
  "./js/dreams/detail/detail-actions.js",
  "./js/dreams/detail/detail-events.js",
  "./js/dreams/detail/detail.js",

  "./js/components/dream-card.js",
  "./js/components/empty-state.js",
  "./js/components/stat-card.js",

  "./css/base/variables.css",
  "./css/base/base.css",

  "./css/layout/layout.css",

  "./css/components/buttons.css",
  "./css/components/cards.css",
  "./css/components/forms.css",
  "./css/components/badges.css",
  "./css/components/filters.css",
  "./css/components/progress.css",
  "./css/components/stats.css",

  "./css/pages/home.css",
  "./css/pages/detail.css",
  "./css/pages/add-dream.css",
  "./css/pages/categories.css",
  "./css/pages/offline.css",
];

self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(FILES_TO_CACHE);
    }),
  );
});

self.addEventListener("activate", function (event) {
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames
          .filter(function (cacheName) {
            return cacheName !== CACHE_NAME;
          })
          .map(function (cacheName) {
            return caches.delete(cacheName);
          }),
      );
    }),
  );

  self.clients.claim();
});

self.addEventListener("fetch", function (event) {
  if (event.request.method !== "GET") {
    return;
  }

  const requestUrl = new URL(event.request.url);

  if (requestUrl.origin !== self.location.origin) {
    return;
  }

  event.respondWith(
    caches
      .match(event.request, { ignoreSearch: true })
      .then(function (cachedResponse) {
        if (cachedResponse) {
          return cachedResponse;
        }

        return fetch(event.request).catch(function () {
          if (event.request.mode === "navigate") {
            return caches.match("./offline.html");
          }

          return new Response("", {
            status: 408,
            statusText: "Offline",
          });
        });
      }),
  );
});

self.addEventListener("message", function (event) {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});
