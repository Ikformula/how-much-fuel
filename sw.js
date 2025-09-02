const CACHE_NAME = "fuel-calc-v1";
const FILES_TO_CACHE = [
  "./",
  "./index.html",
  "./bootswatch-5.3.7-vapor-bootstrap.min.css",
  "./app.js",
  "./manifest.json",
  "./icons/icon-192.png",
  "./icons/icon-512.png"
];

self.addEventListener("install", event => {
  event.waitUntil(
     caches.open(CACHE_NAME).then(cache => {
       return cache.addAll(FILES_TO_CACHE);
     })
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
     caches.match(event.request).then(response => {
       return response || fetch(event.request);
     })
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
     caches.keys().then(keys => {
       return Promise.all(
          keys.filter(key => key !== CACHE_NAME)
             .map(key => caches.delete(key))
       );
     })
  );
});
