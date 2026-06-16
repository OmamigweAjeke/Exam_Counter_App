// ==========================================================================
// 1. IMPORT BACKGROUND CLOUD HANDLERS
// ==========================================================================
try {
    importScripts('https://cdn.onesignal.com/sdks/web/v15/OneSignalSDK.sw.js');
} catch (error) {
    console.log("OneSignal cloud worker loading gracefully via fallback asset parameters.");
}

// ==========================================================================
// 2. OFFLINE STORAGE ENGINE CONFIGURATION
// ==========================================================================
const CACHE_NAME = 'exam-timer-v2';
const ASSETS = [
  './',
  './index.html',
  './style.css',
  './app.js',
  './manifest.json'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((cachedResponse) => {
      return cachedResponse || fetch(e.request);
    })
  );
});
