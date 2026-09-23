import * as territoriosView from './views/territorios.js';
import * as revisitsView from './views/revisits.js';
import * as reportsView from './views/reports.js';
import * as goalsView from './views/goals.js';
import * as settingsView from './views/settingsView.js';
import { settings, applyFontScale } from './settings.js';
import { initLanguage, onLanguageChange, getLanguage, t } from './i18n.js';
import { initInstallPrompt } from './install.js';
import { maybeShowOnboarding } from './onboarding.js';

const TABS = [
	{ id: 'territorios', icon: 'fa-map-marked-alt', module: territoriosView, labelKey: 'tabTerritorios' },
	{ id: 'revisitas', icon: 'fa-book', module: revisitsView, labelKey: 'tabRevisitas' },
	{ id: 'informes', icon: 'fa-chart-pie', module: reportsView, labelKey: 'tabInformes' },
	{ id: 'metas', icon: 'fa-calendar-alt', module: goalsView, labelKey: 'tabMetas' },
	{ id: 'ajustes', icon: 'fa-cog', module: settingsView, labelKey: 'tabAjustes' }
];

let activeTab = 'revisitas';

function buildShell() {
	document.documentElement.lang = getLanguage();
	const main = document.getElementById('app-main');
	main.innerHTML = TABS.map((tab) => `<div class="view" id="view-${tab.id}"></div>`).join('');

	const tabbar = document.getElementById('app-tabbar');
	tabbar.innerHTML = TABS.map((tab) => `
		<button data-tab="${tab.id}" class="${tab.id === activeTab ? 'active' : ''}">
			<i class="fas ${tab.icon}"></i>
			<span>${t(tab.labelKey)}</span>
		</button>
	`).join('');

	tabbar.querySelectorAll('button').forEach((btn) => {
		btn.addEventListener('click', () => switchTab(btn.dataset.tab));
	});

	const fab = document.getElementById('app-fab');
	fab.setAttribute('aria-label', t('addAria'));

	const siteLink = document.getElementById('site-link');
	if (siteLink) siteLink.textContent = t('siteLink');
}

async function switchTab(tabId) {
	activeTab = tabId;
	document.querySelectorAll('#app-tabbar button').forEach((btn) => {
		btn.classList.toggle('active', btn.dataset.tab === tabId);
	});
	document.querySelectorAll('.view').forEach((view) => {
		view.classList.toggle('active', view.id === `view-${tabId}`);
	});

	const fab = document.getElementById('app-fab');
	fab.style.display = tabId === 'revisitas' ? 'flex' : 'none';

	const tab = TABS.find((t) => t.id === tabId);
	await tab.module.render(document.getElementById(`view-${tabId}`));
}

function wireFab() {
	const fab = document.getElementById('app-fab');
	fab.addEventListener('click', () => {
		if (activeTab === 'revisitas') revisitsView.openNewRevisitForm();
	});
}

async function bootstrap() {
	applyFontScale();
	initLanguage(settings.language);
	onLanguageChange(async (code) => {
		settings.language = code;
		buildShell();
		wireFab();
		await switchTab(activeTab);
	});

	buildShell();
	wireFab();
	await switchTab(activeTab);
	initInstallPrompt();
	maybeShowOnboarding();

	if ('serviceWorker' in navigator) {
		navigator.serviceWorker.register('./sw.js').catch((err) => {
			console.error('Revisits Web: service worker registration failed', err);
		});
	}
}

bootstrap();
