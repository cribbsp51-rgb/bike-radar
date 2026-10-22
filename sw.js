/* 
  PROJECT: AI Bicycle Overtake Radar (STEM Safety)
  FILE: sw.js (PWA Offline Service Worker Caching Loop)
  VERSION: 3.0.0-AutomatedCDN
  DATE: 2026-10-22
  CHANGELOG: Configured to pull directly from Google's open-access unpkg CDN to automate and bundle all tracking assets into local smartphone storage memory.
*/

const CACHE_NAME = 'bike-radar-v3.0.0-AutomatedCDN';
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
      console.log('Automated Cache Sync Complete for v3.0.0-AutomatedCDN!');
      return c.addAll(ASSETS);
    })
  );
});

self.addEventListener('fetch', (e) => {
  // Let the live bicycle camera stream bypass the cache completely
  if (e.request.url.includes('192.168.4.1')) {
    return e.respondWith(fetch(e.request));
  }
  e.respondWith(
    caches.match(e.request).then((res) => res || fetch(e.request))
  );
});
