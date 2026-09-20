const CACHE_NAME = 'revisits-web-v3';
const APP_SHELL = [
	'./',
	'./index.html',
	'./manifest.json',
	'./css/app.css',
	'./js/app.js',
	'./js/db.js',
	'./js/utils.js',
	'./js/constants.js',
	'./js/store.js',
	'./js/settings.js',
	'./js/notifications.js',
	'./js/ui.js',
	'./js/i18n.js',
	'./js/i18n-strings.js',
	'./js/geo.js',
	'./js/views/revisits.js',
	'./js/views/reports.js',
	'./js/views/goals.js',
	'./js/views/settingsView.js',
	'./icons/icon-192.png',
	'./icons/icon-512.png',
	'./assets/art/medals/medal_day.png',
	'./assets/art/medals/medal_week.png',
	'./assets/art/medals/medal_month.png',
	'./assets/art/medals/medal_year.png',
	'./assets/art/houses/casa_estudio_1.png',
	'./assets/art/houses/casa_estudio_2.png',
	'./assets/art/houses/casa_estudio_3.png',
	'./assets/art/houses/casa_estudio_4.png',
	'./assets/art/houses/casa_estudio_5.png',
	'./assets/art/houses/casa_estudio_6.png',
	'./assets/art/houses/casa_revisita_1.png',
	'./assets/art/houses/casa_revisita_2.png',
	'./assets/art/houses/casa_revisita_3.png',
	'./assets/art/houses/casa_revisita_4.png',
	'./assets/art/houses/casa_revisita_5.png',
	'./assets/art/houses/casa_revisita_6.png'
];

self.addEventListener('install', (event) => {
	event.waitUntil(
		caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL))
	);
	self.skipWaiting();
});

self.addEventListener('activate', (event) => {
	event.waitUntil(
		caches.keys().then((keys) =>
			Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key)))
		)
	);
	self.clients.claim();
});

self.addEventListener('fetch', (event) => {
	if (event.request.method !== 'GET') return;

	event.respondWith(
		caches.match(event.request).then((cached) => {
			const network = fetch(event.request)
				.then((response) => {
					const copy = response.clone();
					caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
					return response;
				})
				.catch(() => cached);
			return cached || network;
		})
	);
});
