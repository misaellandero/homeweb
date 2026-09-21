import { t } from './i18n.js';

const DISMISS_KEY = 'revisits.installBannerDismissed';
const APP_STORE_URL = 'https://apps.apple.com/mx/app/revisits/id1513271477';
let deferredPrompt = null;
let onStateChange = null;

export function initInstallPrompt() {
	window.addEventListener('beforeinstallprompt', (e) => {
		e.preventDefault();
		deferredPrompt = e;
		renderInstallBanner();
		onStateChange?.();
	});

	window.addEventListener('appinstalled', () => {
		deferredPrompt = null;
		hideBanner();
		onStateChange?.();
	});

	renderInstallBanner();
	initServiceWorkerUpdateWatcher();
}

export function canPromptInstall() {
	return !!deferredPrompt;
}

export function isStandalone() {
	return window.matchMedia?.('(display-mode: standalone)').matches || window.navigator.standalone === true;
}

export function isIOS() {
	const ua = navigator.userAgent || '';
	const isIOSDevice = /iPad|iPhone|iPod/.test(ua) && !window.MSStream;
	const isIPadOS = navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1;
	return isIOSDevice || isIPadOS;
}

export function isSafari() {
	const ua = navigator.userAgent || '';
	return /^((?!chrome|android|crios|fxios|edg).)*safari/i.test(ua);
}

export function isApplePlatform() {
	return isIOS() || /Macintosh|Mac OS X/.test(navigator.userAgent || '');
}

export function onInstallStateChange(callback) {
	onStateChange = callback;
}

export async function triggerInstall() {
	if (!deferredPrompt) return null;
	deferredPrompt.prompt();
	const result = await deferredPrompt.userChoice;
	deferredPrompt = null;
	hideBanner();
	onStateChange?.();
	return result.outcome;
}

function wasDismissed() {
	try {
		return localStorage.getItem(DISMISS_KEY) === '1';
	} catch {
		return false;
	}
}

function dismiss() {
	try {
		localStorage.setItem(DISMISS_KEY, '1');
	} catch {
		/* ignore */
	}
	hideBanner();
}

function renderInstallBanner() {
	if (isStandalone() || wasDismissed()) {
		hideBanner();
		return;
	}
	if (document.getElementById('installBanner')) return;

	const banner = document.createElement('div');
	banner.id = 'installBanner';
	banner.className = 'install-banner';

	if (isApplePlatform()) {
		banner.innerHTML = `
			<div class="install-banner-text">
				<strong>${t('installBannerAppleTitle')}</strong>
				<span>${t('installBannerAppleHint')}</span>
			</div>
			<div class="install-banner-actions">
				<button class="btn btn-ghost" id="installBannerDismiss">${t('btnNotNow')}</button>
				<a class="btn btn-primary" id="installBannerAppStore" href="${APP_STORE_URL}" target="_blank" rel="noopener">${t('btnGetAppStore')}</a>
			</div>
		`;
	} else if (canPromptInstall()) {
		banner.innerHTML = `
			<div class="install-banner-text">
				<strong>${t('installBannerTitle')}</strong>
				<span>${t('installBannerHint')}</span>
			</div>
			<div class="install-banner-actions">
				<button class="btn btn-ghost" id="installBannerDismiss">${t('btnNotNow')}</button>
				<button class="btn btn-primary" id="installBannerInstall">${t('btnInstallNow')}</button>
			</div>
		`;
	} else {
		banner.innerHTML = `
			<div class="install-banner-text">
				<strong>${t('installBannerTitle')}</strong>
				<span>${t('manualInstallHint')}</span>
			</div>
			<div class="install-banner-actions">
				<button class="btn btn-ghost" id="installBannerDismiss">${t('btnNotNow')}</button>
			</div>
		`;
	}

	document.body.append(banner);
	document.body.classList.add('has-install-banner');

	banner.querySelector('#installBannerDismiss').addEventListener('click', dismiss);
	banner.querySelector('#installBannerInstall')?.addEventListener('click', triggerInstall);
}

function hideBanner() {
	document.getElementById('installBanner')?.remove();
	document.getElementById('updateBanner')?.remove();
	document.body.classList.remove('has-install-banner');
}

// ---------- Service worker update banner ----------
// The service worker caches the app shell aggressively, so once a new
// version deploys, an already-open tab keeps running the old JS until it
// reloads. `controllerchange` only fires for a REAL update (a different
// worker taking over an already-controlled page) — never for the initial
// registration on a fresh load, which is why `hadControllerAtLoad` matters.

function initServiceWorkerUpdateWatcher() {
	if (!('serviceWorker' in navigator)) return;
	const hadControllerAtLoad = !!navigator.serviceWorker.controller;
	navigator.serviceWorker.addEventListener('controllerchange', () => {
		if (hadControllerAtLoad) showUpdateBanner();
	});
}

function showUpdateBanner() {
	if (document.getElementById('updateBanner')) return;
	document.getElementById('installBanner')?.remove();

	const banner = document.createElement('div');
	banner.id = 'updateBanner';
	banner.className = 'install-banner';
	banner.innerHTML = `
		<div class="install-banner-text">
			<strong>${t('updateBannerTitle')}</strong>
			<span>${t('updateBannerHint')}</span>
		</div>
		<div class="install-banner-actions">
			<button class="btn btn-primary" id="updateBannerBtn"><i class="fas fa-sync-alt"></i> ${t('btnUpdateNow')}</button>
		</div>
	`;
	document.body.append(banner);
	document.body.classList.add('has-install-banner');
	banner.querySelector('#updateBannerBtn').addEventListener('click', () => location.reload());
}
