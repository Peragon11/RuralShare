// Service worker mínimo: solo existe para que el navegador reconozca la
// app como instalable. No cachea nada a propósito, para que siempre
// carguéis la última versión desplegada en Vercel sin sorpresas.
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (event) => event.waitUntil(self.clients.claim()));
