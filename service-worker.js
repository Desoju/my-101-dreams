const CACHE_NAME = "my-101-dreams-v1.2.2";

const FILES_TO_CACHE = [
  "./",
  "./index.html",
  "./manifest.json",
  "./css/style.css",
  "./offline.html",
  "./404.html",

  "./pages/add-dream.html",
  "./pages/dream-detail.html",
  "./pages/categories.html",

  "./icons/icon-192.png",
  "./icons/icon-512.png",

  "./js/shared/storage.js",
  "./js/shared/text.js",
  "./js/shared/dates.js",
  "./js/shared/backup.js",
  "./js/shared/form-validation.js",

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

  "./js/dreams/add/add-ui.js",
  "./js/dreams/add/add-subgoals.js",
  "./js/dreams/add/add-draft.js",
  "./js/dreams/add/add-dirty-state.js",
  "./js/dreams/add/add-form.js",
  "./js/dreams/add/add-dream.js",

  "./js/dreams/detail/detail-progress.js",
  "./js/dreams/detail/detail-subgoals.js",
  "./js/dreams/detail/detail-edit.js",
  "./js/dreams/detail/detail-data.js",
  "./js/dreams/detail/detail-render.js",
  "./js/dreams/detail/detail-actions.js",
  "./js/dreams/detail/detail-autosave.js",
  "./js/dreams/detail/detail-navigation.js",
  "./js/dreams/detail/detail-events.js",
  "./js/dreams/detail/detail.js",

  "./js/components/dream-card.js",
  "./js/components/empty-state.js",
  "./js/components/stat-card.js",
  "./js/components/toast.js",
  "./js/components/confirm-modal.js",
  "./js/components/onboarding.js",

  "./css/base/tokens/colors.css",
  "./css/base/tokens/components.css",
  "./css/base/tokens/system.css",
  
  "./css/base/base.css",

  "./css/layout/layout.css",

  "./css/components/buttons/buttons-base.css",
  "./css/components/buttons/buttons-utils.css",
  "./css/components/buttons/buttons-variants.css",
  "./css/components/buttons/buttons-links.css",
  "./css/components/buttons/floating-button.css",
  "./css/components/buttons/buttons-special.css",

  "./css/components/cards.css",
  "./css/components/forms.css",
  "./css/components/badges.css",
  "./css/components/filters.css",
  "./css/components/progress.css",
  "./css/components/stats.css",
  "./css/components/toast.css",
  "./css/components/confirm-modal.css",
  "./css/components/empty-state.css",
  "./css/components/animations.css",
  "./css/components/pinterest-preview.css",

  "./css/pages/home.css",
  "./css/pages/add-dream.css",
  "./css/pages/categories.css",
  "./css/pages/offline.css",

  "./css/pages/detail/detail-base.css",
  "./css/pages/detail/detail-view.css",
  "./css/pages/detail/detail-subgoals.css",
  "./css/pages/detail/detail-edit.css",
  "./css/pages/detail/detail-responsive.css",
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
