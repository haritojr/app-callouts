const CACHE_NAME = 'mp-averias-v2'; // Cambiamos a v2 para forzar actualización
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './manifest.json',
  './librerias/tailwind.js', // Asegúrate de que este nombre sea el correcto
  './librerias/chart.js',
  './librerias/xlsx.js'
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