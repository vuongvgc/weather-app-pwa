const CACHE_NAME = "version-1";
const urlsToCache = ["index.html", "offline.html"];
const self = this;
// 1: install SW
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        console.debug("cache open");
        return cache.addAll(urlsToCache);
      })
      .catch((error) => {
        console.debug("error", error);
      })
  );
});
// 2: Listen SW
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then(() => {
      return fetch(event.request).catch(() => caches.match("offline.html"));
    })
  );
});
// 3: activate SW

self.addEventListener("activate", (event) => {
  const cacheWhiteList = [];
  cacheWhiteList.push(CACHE_NAME);
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhiteList.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      )
    )
  );
});
