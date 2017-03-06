const CACHE_NAME = 'rainbow-explorer-v01';
const expectedCaches = [CACHE_NAME];
const staticFiles = [
  './',
  './main.css',
  './build/bundle.js',
];


/**
 * Perform install steps
 */
self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(staticFiles))
  );
});


/**
 * Handle requests
 */
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  if (url.origin === location.origin) {
    event.respondWith(
      caches.match(event.request).then(response => response || fetch(event.request))
    );
  }
});


/**
 * Clean up old cache versions
 */
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.map((key) => {
        if (!expectedCaches.includes(key)) {
          return caches.delete(key);
        }
      }),
    )).then(() => {
      console.log(`${CACHE_NAME} now ready to handle fetches!`);
    }),
  );
});
