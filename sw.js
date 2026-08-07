// Service worker: no cachea el index.html (para no dar problemas al
// actualizar la app), pero SÍ guarda en caché las imágenes (fondos,
// icono...) la primera vez que se cargan, para que las siguientes
// veces se vean al instante sin tener que descargarlas de nuevo.
const IMAGE_CACHE = 'rs-images-v1';

self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (event) => event.waitUntil(self.clients.claim()));

self.addEventListener('fetch', (event) => {
    const url = event.request.url;
    const isImage = /\.(png|jpg|jpeg|webp)$/i.test(url);
    if(!isImage) return; // todo lo demás (html, json, js) va directo a la red, sin caché

    event.respondWith(
        caches.open(IMAGE_CACHE).then(async (cache) => {
            const cached = await cache.match(event.request);
            if(cached) return cached;
            try {
                const response = await fetch(event.request);
                if(response && response.ok) cache.put(event.request, response.clone());
                return response;
            } catch(e) {
                return cached || Promise.reject(e);
            }
        })
    );
});
