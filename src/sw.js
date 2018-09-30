const CACHE_NAME = 'cache-jacob';
const urlsToCache = [
  '/',
  './',
  './?utm=homescreen',
  './index.html',
  './index.html?utm=homescreen',
  './script.js',
  './sw.js',
  './style.css',
  './favicon.ico',
  './assets/img/jacob_logo'
];

self.addEventListener('install', e => {
  console.log('Evento: WS instalado');
  e.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Archivos en cache ');
        return cache.addAll(urlsToCache);
      })
      .catch(err => console.log('fallo registro de cache', err))
  );
});

self.addEventListener('activate', e => {
  console.log('Evento: SW activado');
  const cacheList = [CACHE_NAME];

  e.waitUntil(
    caches.keys()
      .then(cachesNames => (
        Promise.all(
          cachesNames.map(cacheName => {
            if (cacheList.indexOf(cacheName) === -1) {
              return caches.delete(cacheName);
            }
            return null;
          })
        )
      ))
      .then(() => {
        console.log('El cache esta limpio y actualizado');
        return self.clients.claim();
      })
  );
});

self.addEventListener('fetch', e => {
  console.log('Evento recuperado');
  e.respondWith(
    caches.match(e.request)
      .then(resp => {
        if (resp) {
          return resp;
        }

        return fetch(e.request)
          .then(res => {
            const resToCache = res.clone();

            caches.open(CACHE_NAME)
              .then(cache => {
                cache
                  .put(e.request, resToCache)
                  .catch(err => console.log(`${e.request.url}: mensaje -> ${err.message}`));
              });
              return res;
          });
      })
  );
});
