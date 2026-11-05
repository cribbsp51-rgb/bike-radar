/* 
  PROJECT: AI Bicycle Overtake Radar (STEM Safety)
  FILE: sw.js (PWA Offline Service Worker Caching Loop)
  VERSION: 4.2.0-FixedAssets
  DATE: 2026-11-05
  CHANGELOG: Updated asset manifests to match verified repository filenames exactly.
*/

const CACHE_NAME = 'bike-radar-v4.2.0-fixed';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './js/vision_bundle.js',
  './wasm/vision_wasm_internal.js',
  './wasm/vision_wasm_internal.wasm',
  './wasm/vision_wasm_nosimd_internal.js',
  './wasm/vision_wasm_nosimd_internal.wasm',
  './models/efficientdet_lite0.tflite'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((c) => {
      console.log('LiteRT Caching Engine: Syncing internal binaries offline!');
      return c.addAll(ASSETS);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            console.log('Clearing obsolete cache: ', key);
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (e) => {
  if (e.request.url.includes('192.168.4.1')) {
    return e.respondWith(fetch(e.request));
  }
  e.respondWith(
    caches.match(e.request).then((res) => res || fetch(e.request))
  );
});
