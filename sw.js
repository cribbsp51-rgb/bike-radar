// sw.js - The Offline Cache Manager for Bike Radar STEM Project
const CACHE_NAME = 'bike-radar-v1';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  'https://jsdelivr.net'
];

// Install Event: Force-cache all core dashboard and library assets 100% offline
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((c) => {
      console.log('Bike Radar PWA: AI Assets successfully cached for road use!');
      return c.addAll(ASSETS);
    })
  );
});

// Fetch Event: Run entirely offline from phone storage, bypass cache ONLY for raw hardware feed
self.addEventListener('fetch', (e) => {
  // CRITICAL BYPASS: Let the live ESP32 camera video packets stream freely without bloating cache
  if (e.request.url.includes('192.168.4.1')) {
    return e.respondWith(fetch(e.request));
  }
  
  // Serve everything else instantly from the secure offline phone storage
  e.respondWith(
    caches.match(e.request).then((res) => res || fetch(e.request))
  );
});
