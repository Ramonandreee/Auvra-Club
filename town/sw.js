// Auvra Club — service worker (app instalável + abre offline).
// HTML: rede primeiro (atualização chega na hora), cache como reserva offline.
// Bibliotecas de CDN (versão fixada, incl. módulos three/addons) e ícones: cache primeiro.
// Chamadas ao Supabase (API/realtime) nunca passam pelo cache.
const CACHE = 'auvra-town-v35';
const MODELS = 'auvra-models-v2'; // personagens realistas (.glb): cache próprio, não é apagado a cada versão do jogo // v28: câmera de dentro, falas, pôr do sol, portas
const SHELL = ['./', './index.html', './manifest.webmanifest', './icon-192.png', './icon-512.png', './apple-touch-icon.png', './logo.png'];
const CDN = [
  'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.45.4/dist/umd/supabase.js',
  'https://cdn.jsdelivr.net/npm/three@0.161.0/build/three.module.js',
  'https://cdn.jsdelivr.net/npm/three@0.161.0/examples/jsm/utils/BufferGeometryUtils.js',
  'https://cdn.jsdelivr.net/npm/three@0.161.0/examples/jsm/loaders/GLTFLoader.js',
  'https://cdn.jsdelivr.net/npm/three@0.161.0/examples/jsm/utils/SkeletonUtils.js'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL).then(() =>
    Promise.all(CDN.map(u => c.add(u).catch(() => {}))))).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE && k !== MODELS).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  const sameOrigin = url.origin === self.location.origin;
  const isCdn = CDN.includes(req.url) || req.url.startsWith('https://cdn.jsdelivr.net/npm/three@0.161.0/');
  if (!sameOrigin && !isCdn) return; // Supabase e o resto: direto na rede

  if (req.mode === 'navigate' || (sameOrigin && url.pathname.endsWith('.html'))) {
    e.respondWith(fetch(req).then(r => {
      const copy = r.clone(); caches.open(CACHE).then(c => c.put(req, copy)); return r;
    }).catch(() => caches.match(req).then(r => r || caches.match('./'))));
    return;
  }
  if (sameOrigin && url.pathname.includes('/models/')) { // modelos: cache primeiro, guardados à parte
    e.respondWith(caches.open(MODELS).then(c => c.match(req).then(hit => hit || fetch(req).then(r => { if (r.ok) c.put(req, r.clone()); return r; }))));
    return;
  }
  e.respondWith(caches.match(req).then(hit => hit || fetch(req).then(r => {
    if (r.ok) { const copy = r.clone(); caches.open(CACHE).then(c => c.put(req, copy)); }
    return r;
  })));
});
