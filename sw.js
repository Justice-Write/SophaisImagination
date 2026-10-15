/* Sophia's Imagination — offline service worker.
   Caches pages and assets on this origin so the site works without a connection.
   No analytics, no cookies, no tracking. Nothing is sent anywhere.
   Bump CACHE when the site changes so stale pages are discarded. */

const CACHE = 'sophai-20260927';

const PRECACHE = [
  '/',
  '/manifest.webmanifest',
  '/diary.html',
  '/index.html',
  '/offline.html',
  '/polls.html',
  '/privacy.html',
  '/process.html',
  '/provenance.html',
  '/terms.html',
  '/assets/icon-192.png',
  '/assets/icon-512.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE)
      .then((cache) => cache.addAll(PRECACHE.map((u) => new Request(u, { cache: 'reload' }))))
      .then(() => self.skipWaiting())

  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k.startsWith('sophai-') && k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  if (req.mode === 'navigate') {
    event.respondWith(
      fetch(req)
        .then(async (res) => {
          if (res.status !== 200) return res;
          const copy = res.clone();
          await caches.open(CACHE).then((c) => c.put(req, copy)).catch(() => {});
          return res;
        })
        .catch(() => caches.match(req).then((hit) => hit || caches.match('/offline.html').then((fallback) => fallback || Response.error())))
    );
    return;
  }

  event.respondWith(
    caches.match(req).then((hit) => hit || fetch(req).then(async (res) => {
      if (res && res.status === 200 && res.type === 'basic') {
        const copy = res.clone();
        await caches.open(CACHE).then((c) => c.put(req, copy)).catch(() => {});
      }
      return res;
    }).catch(() => hit || Response.error()))
  );
});
