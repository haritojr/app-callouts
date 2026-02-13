const CACHE_NAME = 'mp-averias-v2'; // Cambiamos a v2 para forzar actualización
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './manifest.json',
  './librerias/tailwindcss.js',
  './librerias/chart.js',
  './librerias/xlsx.js',
  // Fuente (la dejamos online porque descargar fuentes es más complejo, 
  // pero si falla no rompe la app, solo se ve la letra distinta)
  'https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap'
];

// ... el resto del archivo sigue igual ...

// Instalación: Cachear recursos estáticos y librerías
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// Activación: Limpiar cachés antiguas
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(keyList.map((key) => {
        if (key !== CACHE_NAME) {
          return caches.delete(key);
        }
      }));
    })
  );
});

// Fetch: Estrategia Cache First, falling back to Network
// (Intenta servir desde caché, si no está, va a internet)
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});