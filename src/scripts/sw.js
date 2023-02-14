import 'regenerator-runtime';
import cacheHelper from './utils/cache-helper';

const assetToCache = [
  './',
  './icons/maskable_icon.png',
  './icons/maskable_icon_x192.png',
  './icons/maskable_icon_x256.png',
  './icons/maskable_icon_x384.png',
  './icons/maskable_icon_x512.png',
  './index.html',
  './favicon.png',
  './app.bundle.js',
  './app.webmanifest',
  './sw.bundle.js',

];
self.addEventListener('install', (event) => {
  event.waitUntil(cacheHelper.cachingAppShell([...assetToCache]));
});

self.addEventListener('activate', (event) => {
  event.waitUntil(cacheHelper.deleteOldCache());
});

self.addEventListener('fetch', (event) => {
  event.respondWith(cacheHelper.revalidateCache(event.request));
});
