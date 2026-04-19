/* AI Native CEO — Service Worker
 * Стратегия: cache-first для статики, network-first для index.html.
 * Версионируй CACHE при каждом релизе, чтобы пользователи получили обновления. */

const CACHE = 'ai-native-ceo-v1.1.0';

const ASSETS = [
  '/',
  '/index.html',
  '/manifest.webmanifest',
  '/icons/icon-192.png',
  '/icons/icon-512.png',
  '/icons/icon-512-maskable.png',
  '/icons/apple-touch-icon.png',
  '/icons/favicon-32.png',
  '/icons/favicon.ico'
];

/* INSTALL — кэшируем ядро */
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE).then((c) => c.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});

/* ACTIVATE — чистим старые кэши */
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

/* FETCH — гибридная стратегия */
self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);

  /* whitelist.json — всегда сеть, никогда не кэшируем (админ-панель пишет сюда) */
  if (url.pathname === '/whitelist.json' || url.pathname.endsWith('/whitelist.json')) {
    e.respondWith(fetch(req, {cache:'no-store'}).catch(() => new Response('[]', {headers:{'Content-Type':'application/json'}})));
    return;
  }

  /* HTML — network-first (всегда свежая версия, fallback на кэш если оффлайн) */
  if (req.mode === 'navigate' || req.destination === 'document') {
    e.respondWith(
      fetch(req)
        .then((res) => {
          const copy = res.clone();
          caches.open(CACHE).then((c) => c.put(req, copy));
          return res;
        })
        .catch(() => caches.match(req).then((r) => r || caches.match('/index.html')))
    );
    return;
  }

  /* Статика (иконки, manifest) — cache-first */
  if (ASSETS.includes(url.pathname) || url.pathname.startsWith('/icons/')) {
    e.respondWith(
      caches.match(req).then((cached) =>
        cached || fetch(req).then((res) => {
          const copy = res.clone();
          caches.open(CACHE).then((c) => c.put(req, copy));
          return res;
        })
      )
    );
    return;
  }

  /* Всё остальное — сеть с фолбэком на кэш */
  e.respondWith(fetch(req).catch(() => caches.match(req)));
});
