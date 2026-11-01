const VERSION = 'hatchpile-v5';
const MATTER = 'https://cdnjs.cloudflare.com/ajax/libs/matter-js/0.20.0/matter.min.js';
const PRECACHE = [
  './', 'index.html', 'manifest.webmanifest',
  'assets/bg.png', 'assets/gold.png', 'assets/panel.png', 'assets/hatchpile.ttf', 'assets/icon-192.png',
  ...Array.from({ length: 11 }, (_, i) => `assets/c${String(i).padStart(2, '0')}.png`),
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSION).then(c => Promise.all([
    c.addAll(PRECACHE),
    fetch(MATTER, { mode: 'no-cors' }).then(res => c.put(MATTER, res)).catch(() => {}),
  ])).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  if (req.mode === 'navigate') {
    e.respondWith(fetch(req).then(res => { const copy = res.clone(); caches.open(VERSION).then(c => c.put('./', copy)); return res; }).catch(() => caches.match('./')));
    return;
  }
  e.respondWith(caches.match(req).then(hit => hit || fetch(req).then(res => {
    if ((res.ok && (res.type === 'basic' || res.type === 'cors')) || res.type === 'opaque') { const copy = res.clone(); caches.open(VERSION).then(c => c.put(req, copy)); }
    return res;
  })));
});
