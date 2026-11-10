// Offline-Cache
const CACHE = 'kranprotokoll-202611101406';
const FILES = ["./","icons/apple-touch-icon.png","icons/icon-192.png","icons/icon-512.png","index.html","js/app.js","js/chunk-3VE3B4OY.js","js/chunk-HIQGWE75.js","js/chunk-YTBG3PTG.js","js/pdf-NIYXVHS7.js","js/web-33MZSJSC.js","js/web-525YERLV.js","manifest.webmanifest","pdf.worker.min.mjs"];
self.addEventListener('install', e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)).then(() => self.skipWaiting())); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET' || new URL(e.request.url).origin !== location.origin) return;
  e.respondWith(caches.match(e.request, { ignoreSearch: true }).then(r => r || fetch(e.request).catch(() => caches.match('./'))));
});
