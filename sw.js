// sw.js - The Offline Cache Manager for Bike Radar STEM Project
const CACHE_NAME = 'bike-radar-ai-v3';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './manifest.json',
  './js/vision_bundle.js',
  './wasm/vision_wasm_internal.wasm',
  './wasm/vision_wasm_internal.js',
  './wasm/vision_wasm_simd_internal.wasm',
  './models/efficientdet_lite0.tflite'
];

// Install Event: Save everything to physical phone storage immediately on first load
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Downloading and caching LiteRT AI assets offline...');
      return cache.addAll(ASSETS_TO_CACHE);
    }).then(() => self.skipWaiting())
  );
});

// Activate Event: Claim control immediately
self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

// Fetch Event: Serve files from storage when offline on the road (Bypass cellular network)
self.addEventListener('fetch', (event) => {
  // Let the live video stream pass through directly without caching
  if (event.request.url.includes('192.168.4.1')) {
    return event.respondWith(fetch(event.request));
  }

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return cachedResponse || fetch(event.request);
    })
  );
});
