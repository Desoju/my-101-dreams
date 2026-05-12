const CACHE_NAME = "my-101-dreams-v4";

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

  "./js/shared/categories/category-data.js",
  "./js/shared/categories/category-storage.js",
  "./js/shared/categories/category-ui.js",
  "./js/shared/categories/category-validation.js",

  "./js/shared/backup.js",

  "./js/components/cards.js",

  "./js/index.js",
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
        cacheNames.map(function (cacheName) {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        }),
      );
    }),
  );
});

self.addEventListener("fetch", function (event) {
  const requestUrl = new URL(event.request.url);

  if (requestUrl.origin !== location.origin) {
    return;
  }

  const cleanPath = requestUrl.pathname;

  event.respondWith(
    caches.match(cleanPath).then(function (cachedResponse) {
      return cachedResponse || fetch(event.request);
    })
  );
});