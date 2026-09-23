// First-run onboarding: a short full-screen sequence explaining the app,
// offering to install it, requesting notification/location permissions, and
// helping set up a first service goal — mirroring the native app's own
// OnboardingView (Shared/Views/Welcome/Views/OnboardingView.swift) adapted
// for the web (it adds an install step the native app doesn't need, since
// native already *is* the installed app).

import { settings } from './settings.js';
import { t } from './i18n.js';
import { requestNotificationPermission } from './notifications.js';
import { getCurrentPosition, isSupported as isGeoSupported } from './geo.js';
import { isStandalone, isIOS, isSafari, canPromptInstall, triggerInstall } from './install.js';
import * as store from './store.js';
import * as goalsView from './views/goals.js';

let overlay = null;
let stepIndex = 0;
let steps = [];

export async function maybeShowOnboarding() {
	if (settings.onboardingCompleted) return;
	await showOnboarding();
}

export async function showOnboarding() {
	closeOnboarding();
	const services = await store.listServices();
	steps = buildSteps({ needsServiceStep: services.length === 0 });
	stepIndex = 0;
	render();
}

function buildSteps({ needsServiceStep }) {
	const list = ['welcome', 'notifications', 'location'];
	if (!isStandalone()) list.splice(1, 0, 'install');
	if (needsServiceStep) list.push('service');
	return list;
}

function finish() {
	settings.onboardingCompleted = true;
	closeOnboarding();
}

function closeOnboarding() {
	overlay?.remove();
	overlay = null;
}

function goTo(delta) {
	stepIndex = Math.min(steps.length - 1, Math.max(0, stepIndex + delta));
	render();
}

function render() {
	if (!overlay) {
		overlay = document.createElement('div');
		overlay.className = 'onboarding-overlay';
		document.body.append(overlay);
	}

	const step = steps[stepIndex];
	overlay.innerHTML = `
		<div class="onboarding-card">
			${stepIndex > 0 ? `<button type="button" class="onboarding-back" aria-label="${escapeAttr(t('back'))}"><i class="fas fa-arrow-left"></i></button>` : ''}
			<button type="button" class="onboarding-skip">${stepIndex === steps.length - 1 ? t('btnFinish') : t('btnSkip')}</button>
			<div class="onboarding-body">${stepBodyHTML(step)}</div>
			<div class="onboarding-dots">
				${steps.map((_, i) => `<span class="onboarding-dot ${i === stepIndex ? 'active' : ''}"></span>`).join('')}
			</div>
		</div>
	`;

	overlay.querySelector('.onboarding-back')?.addEventListener('click', () => goTo(-1));
	overlay.querySelector('.onboarding-skip').addEventListener('click', () => {
		if (stepIndex === steps.length - 1) finish();
		else goTo(1);
	});

	wireStep(step);
}

function stepBodyHTML(step) {
	if (step === 'welcome') {
		return `
			<img src="icons/icon-192.png" class="onboarding-icon" alt="">
			<h2>${t('onboardingWelcomeTitle')}</h2>
			<p class="onboarding-tagline">${t('onboardingWelcomeTagline')}</p>
			<p class="onboarding-text">${t('onboardingWelcomeBody')}</p>
			<button type="button" class="btn btn-primary btn-block btn-lg" id="onboardingContinue"><i class="fas fa-thumbs-up"></i> ${t('btnContinue')}</button>
		`;
	}
	if (step === 'install') {
		return `
			<div class="onboarding-badge"><i class="fas fa-download"></i></div>
			<h2>${t('onboardingInstallTitle')}</h2>
			<p class="onboarding-text">${installHint()}</p>
			${canPromptInstall() ? `<button type="button" class="btn btn-primary btn-block btn-lg" id="onboardingInstallBtn"><i class="fas fa-download"></i> ${t('btnInstallApp')}</button>` : ''}
			<button type="button" class="btn btn-block" id="onboardingContinue">${t('btnContinue')}</button>
		`;
	}
	if (step === 'notifications') {
		const granted = 'Notification' in window && Notification.permission === 'granted';
		const denied = 'Notification' in window && Notification.permission === 'denied';
		return `
			<div class="onboarding-badge"><i class="fas ${granted ? 'fa-bell' : 'fa-bell-slash'}"></i></div>
			<h2>${t('onboardingNotifTitle')}</h2>
			<p class="onboarding-text">${t('onboardingNotifBody')}</p>
			${granted ? `<p class="onboarding-status success"><i class="fas fa-check-circle"></i> ${t('notificationsEnabledLabel')}</p>` : ''}
			${denied ? `<p class="onboarding-status warning"><i class="fas fa-exclamation-circle"></i> ${t('notificationsDeniedHint')}</p>` : ''}
			${!granted && !denied ? `<button type="button" class="btn btn-primary btn-block btn-lg" id="onboardingNotifBtn"><i class="fas fa-bell"></i> ${t('btnEnableNotifications')}</button>` : ''}
			<button type="button" class="btn btn-block" id="onboardingContinue">${t('btnContinue')}</button>
		`;
	}
	if (step === 'location') {
		return `
			<div class="onboarding-badge"><i class="fas fa-map-marker-alt"></i></div>
			<h2>${t('onboardingLocationTitle')}</h2>
			<p class="onboarding-text">${t('onboardingLocationBody')}</p>
			<p class="onboarding-status" id="onboardingLocationStatus"></p>
			${isGeoSupported() ? `<button type="button" class="btn btn-primary btn-block btn-lg" id="onboardingLocationBtn"><i class="fas fa-map-marker-alt"></i> ${t('btnEnableLocation')}</button>` : ''}
			<button type="button" class="btn btn-block" id="onboardingContinue">${t('btnFinish')}</button>
		`;
	}
	// service
	return `
		<div class="onboarding-badge"><i class="fas fa-bullseye"></i></div>
		<h2>${t('onboardingServiceTitle')}</h2>
		<p class="onboarding-text">${t('onboardingServiceBody')}</p>
		<button type="button" class="btn btn-primary btn-block btn-lg" id="onboardingServiceBtn"><i class="fas fa-plus"></i> ${t('onboardingServiceCta')}</button>
		<button type="button" class="btn btn-block" id="onboardingContinue">${t('btnFinish')}</button>
	`;
}

function installHint() {
	if (isIOS()) return t('manualInstallHintIOS');
	if (isSafari()) return t('manualInstallHintSafariMac');
	if (canPromptInstall()) return t('installBannerHint');
	return t('manualInstallHint');
}

function wireStep(step) {
	const isLast = stepIndex === steps.length - 1;
	overlay.querySelector('#onboardingContinue')?.addEventListener('click', () => {
		if (isLast) finish();
		else goTo(1);
	});

	if (step === 'install') {
		overlay.querySelector('#onboardingInstallBtn')?.addEventListener('click', async () => {
			await triggerInstall();
			goTo(1);
		});
	}

	if (step === 'notifications') {
		overlay.querySelector('#onboardingNotifBtn')?.addEventListener('click', async () => {
			await requestNotificationPermission();
			render();
		});
	}

	if (step === 'location') {
		overlay.querySelector('#onboardingLocationBtn')?.addEventListener('click', async () => {
			const statusEl = overlay.querySelector('#onboardingLocationStatus');
			try {
				await getCurrentPosition();
				statusEl.className = 'onboarding-status success';
				statusEl.innerHTML = `<i class="fas fa-check-circle"></i> ${t('locationSaved')}`;
			} catch {
				statusEl.className = 'onboarding-status warning';
				statusEl.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${t('locationError')}`;
			}
		});
	}

	if (step === 'service') {
		overlay.querySelector('#onboardingServiceBtn')?.addEventListener('click', () => {
			finish();
			goalsView.openServiceForm();
		});
	}
}

function escapeAttr(str) {
	return String(str).replace(/"/g, '&quot;');
}
