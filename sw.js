const CACHE_NAME = 'royal-school-v1';
const ASSETS = [
  '/Copy/',
  '/Copy/index.html',
  '/Copy/style.css',
  '/Copy/logo.png',
  '/Copy/manifest.json',
  '/Copy/brand.js',
  '/Copy/firebase-config.js',
  '/Copy/menu.js'
];

// Install Event - Files ko cache mein save karna
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Caching assets...');
      return cache.addAll(ASSETS);
    })
  );
  self.skipWaiting(); // Naya version turant apply karne ke liye
});

// Activate Event - Purane cache ko saaf karna
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      );
    })
  );
});

// Fetch Event - Offline support ke liye
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});
