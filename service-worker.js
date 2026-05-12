const CACHE_NAME = "my-101-dreams-v6";

const FILES_TO_CACHE = [
  "./",
  "./index.html",
  "./manifest.json",
  "./css/style.css",
  "./pages/add-dream.html",
  "./pages/dream-detail.html",
  "./pages/categories.html",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./js/shared/storage.js",
  "./js/shared/text.js",
  "./js/shared/dates.js",
  "./js/shared/backup.js",
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
  "./js/dreams/detail/detail.js",
  "./js/components/dream-card.js",
  "./js/components/empty-state.js",
  "./js/components/stat-card.js",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(FILES_TO_CACHE))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames
          .filter((cacheName) => cacheName !== CACHE_NAME)
          .map((cacheName) => caches.delete(cacheName))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin) return;

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return cachedResponse || fetch(event.request);
    })
  );
});