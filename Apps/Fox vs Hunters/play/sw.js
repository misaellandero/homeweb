const CACHE_NAME = "fox-vs-hunters-pwa-v2";
const APP_SHELL = [
  "./",
  "./index.html",
  "./app.css",
  "./app.js",
  "./manifest.webmanifest",
  "../assets/images/app-icon.png",
  "../assets/images/fox.png",
  "../assets/images/logo.png",
  "../assets/images/hero-bg.png",
  "../assets/images/mascot.png",
  "../assets/images/scoreboard.png",
  "./audio/SfxCardReveal.m4a",
  "./audio/SfxVoteAdvance1.m4a",
  "./audio/SfxVoteAdvance2.m4a",
  "./audio/SfxPlayerSelect.m4a",
  "./audio/SfxVictoryFoxes.m4a",
  "./audio/SfxVictoryHunters.m4a"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(APP_SHELL))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") {
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) {
        return cached;
      }

      return fetch(event.request)
        .then((response) => {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
          return response;
        })
        .catch(() => caches.match("./index.html"));
    })
  );
});
