/* 
  PROJECT: AI Bicycle Overtake Radar (STEM Safety)
  FILE: sw.js (PWA Offline Service Worker Caching Loop)
  VERSION: 4.1.0-Debugger
  DATE: 2026-10-27
  CHANGELOG: Incremented cache name to force-evict old assets and register on-screen console layer.
*/

const CACHE_NAME = 'bike-radar-v4.1.0-debugger';
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
