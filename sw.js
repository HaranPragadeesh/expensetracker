
const CACHE_NAME = "expense-cache-${CACHE_VERSION}";
const CACHE_VERSION = "v3";

const FILES_TO_CACHE = [
  "/",
  "/index.html",
  "/css/base.css",
  "/css/components.css",
  "/js/app.js"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(FILES_TO_CACHE))
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(res => res || fetch(event.request))
  );
});
