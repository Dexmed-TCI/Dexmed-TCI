// Service worker: caches the whole app so it works with no network.
// When you change any file, increase VERSION so phones pick up the new copy.
const VERSION = 'dex-tci-v4';
const FILES = [
  './',
  './index.html',
  './manifest.webmanifest',
  './apple-touch-icon.png',
  './icon-192.png',
  './icon-512.png',
  './icon-maskable-512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(VERSION).then(cache => cache.addAll(FILES)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// Pages: try the network first (so updates arrive when online), fall back to the cache offline.
// Everything else: cache first.
self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET') return;
  if (req.mode === 'navigate') {
    const fromCache = () => caches.match('./index.html', { ignoreSearch: true });
    const network = fetch(req).then(res => {
      if (res.ok) { const copy = res.clone(); caches.open(VERSION).then(c => c.put('./index.html', copy)); }
      return res;
    });
    // Weak signal: if the network hasn't answered in 3 s, show the cached copy.
    const timeout = new Promise(resolve => setTimeout(resolve, 3000)).then(fromCache);
    event.respondWith(
      Promise.race([network, timeout])
        .then(res => res || network)
        .catch(() => fromCache())
        .then(res => res || fromCache())
    );
    return;
  }
  event.respondWith(caches.match(req, { ignoreSearch: true }).then(hit => hit || fetch(req)));
});
