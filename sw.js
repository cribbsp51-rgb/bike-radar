/* 
  PROJECT: AI Bicycle Overtake Radar (STEM Safety)
  FILE: sw.js (PWA Offline Service Worker Caching Loop)
  VERSION: 3.0.0-LocalAssets
  DATE: 2026-10-22
  CHANGELOG: Configured to cache local repository folder assets for zero-internet functionality.
*/

const CACHE_NAME = 'bike-radar-v3.0.0-LocalAssets';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './js/vision_bundle.js',
  './wasm/vision_wasm_internal.js',
  './wasm/vision_wasm_internal.wasm',
  './wasm/vision_wasm_simd_internal.wasm',
  './models/efficientdet_lite0.tflite'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((c) => {
      console.log('Automated Cache Sync Complete for v3.0.0-LocalAssets!');
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
