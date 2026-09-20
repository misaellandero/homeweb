import * as revisitsView from './views/revisits.js';
import * as reportsView from './views/reports.js';
import * as goalsView from './views/goals.js';
import * as settingsView from './views/settingsView.js';

const TABS = [
	{ id: 'revisitas', label: 'Revisitas', icon: 'fa-door-open', module: revisitsView },
	{ id: 'informes', label: 'Informes', icon: 'fa-chart-simple', module: reportsView },
	{ id: 'metas', label: 'Metas', icon: 'fa-bullseye', module: goalsView },
	{ id: 'ajustes', label: 'Ajustes', icon: 'fa-gear', module: settingsView }
];

let activeTab = 'revisitas';

function buildShell() {
	const main = document.getElementById('app-main');
	main.innerHTML = TABS.map((tab) => `<div class="view" id="view-${tab.id}"></div>`).join('');

	const tabbar = document.getElementById('app-tabbar');
	tabbar.innerHTML = TABS.map((tab) => `
		<button data-tab="${tab.id}" class="${tab.id === activeTab ? 'active' : ''}">
			<i class="fas ${tab.icon}"></i>
			<span>${tab.label}</span>
		</button>
	`).join('');

	tabbar.querySelectorAll('button').forEach((btn) => {
		btn.addEventListener('click', () => switchTab(btn.dataset.tab));
	});
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
	buildShell();
	wireFab();
	await switchTab(activeTab);

	if ('serviceWorker' in navigator) {
		navigator.serviceWorker.register('./sw.js').catch((err) => {
			console.error('Revisits Web: service worker registration failed', err);
		});
	}
}

bootstrap();
