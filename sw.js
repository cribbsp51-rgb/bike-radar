/* 
  PROJECT: AI Bicycle Overtake Radar (STEM Safety)
  FILE: sw.js (PWA Offline Service Worker Caching Loop)
  VERSION: 4.0.0-LiteRT
  DATE: 2026-10-22
  CHANGELOG: Locks local repository folders into smartphone hardware memory to bypass all mobile cross-domain blocking firewalls natively.
*/

const CACHE_NAME = 'bike-radar-v4.0.0-LiteRT';
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
      console.log('LiteRT Caching Engine: Syncing internal binaries offline!');
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
