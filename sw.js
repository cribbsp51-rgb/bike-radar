// sw.js - The Offline Cache Manager for Bike Radar STEM Project
/* 
  PROJECT: AI Bicycle Overtake Radar (STEM Safety)
  FILE: sw.js (PWA Offline Service Worker Caching Loop)
  VERSION: 3.0.0-LocalAssets
  DATE: 2026-10-22
  CHANGELOG: Updated matching local file arrays to automate the background caching sequence from identical origin folders. Added a cache buster variable update string.
*/

const CACHE_NAME = 'bike-radar-v3.0.0'; // Changing this string forces the phone to update!
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
