// sw.js - The Offline Cache Manager for Bike Radar STEM Project
const CACHE_NAME = 'bike-radar-v1';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  'https://unpkg.com',
  'https://unpkg.com',
  'https://unpkg.com',
  'https://unpkg.com',
  'https://googleapis.com'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((c) => {
      console.log('Automated Cache Engine: Syncing AI binaries offline...');
      return c.addAll(ASSETS);
    })
  );
});

self.addEventListener('fetch', (e) => {
  if (e.request.url.includes('192.168.4.1')) {
    return e.respondWith(fetch(e.request));
  }
  e.respondWith(
    caches.match(e.request).then((res) => res || fetch(e.request))
  );
});
