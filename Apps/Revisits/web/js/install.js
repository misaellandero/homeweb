import { t } from './i18n.js';

const DISMISS_KEY = 'revisits.installBannerDismissed';
let deferredPrompt = null;
let onStateChange = null;

export function initInstallPrompt() {
	window.addEventListener('beforeinstallprompt', (e) => {
		e.preventDefault();
		deferredPrompt = e;
		if (!wasDismissed() && !isStandalone()) showBanner();
		onStateChange?.();
	});

	window.addEventListener('appinstalled', () => {
		deferredPrompt = null;
		hideBanner();
		onStateChange?.();
	});
}

export function canPromptInstall() {
	return !!deferredPrompt;
}

export function isStandalone() {
	return window.matchMedia?.('(display-mode: standalone)').matches || window.navigator.standalone === true;
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

function showBanner() {
	if (document.getElementById('installBanner')) return;

	const banner = document.createElement('div');
	banner.id = 'installBanner';
	banner.className = 'install-banner';
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
	document.body.append(banner);
	document.body.classList.add('has-install-banner');

	banner.querySelector('#installBannerDismiss').addEventListener('click', dismiss);
	banner.querySelector('#installBannerInstall').addEventListener('click', triggerInstall);
}

function hideBanner() {
	document.getElementById('installBanner')?.remove();
	document.body.classList.remove('has-install-banner');
}
