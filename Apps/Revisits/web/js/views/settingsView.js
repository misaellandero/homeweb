import { settings } from '../settings.js';
import { exportBackup, importBackup } from '../store.js';
import { showToast } from '../ui.js';
import { requestNotificationPermission } from '../notifications.js';
import { t, getLanguage, setLanguage, LANGUAGES } from '../i18n.js';
import { canPromptInstall, triggerInstall, isStandalone, onInstallStateChange } from '../install.js';

export async function render(container) {
	container.innerHTML = `
		<div class="card">
			<h2>${t('headingInstall')}</h2>
			${installSectionHTML()}
		</div>

		<div class="card">
			<h2>${t('headingLanguage')}</h2>
			<select id="languageSelect" style="width:100%; border:1px solid var(--border); border-radius:10px; padding:10px 12px; font-size:15px; background:var(--surface); color:var(--text);">
				${LANGUAGES.map((l) => `<option value="${l.code}" ${getLanguage() === l.code ? 'selected' : ''}>${escapeAttr(l.name)}</option>`).join('')}
			</select>
		</div>

		<div class="card">
			<h2>${t('headingReportCounters')}</h2>
			<label class="row between" style="margin-bottom:12px;">
				<span>${t('toggleCountPubs')}</span>
				<input type="checkbox" id="toggleCountPubs" ${settings.countPubs ? 'checked' : ''}>
			</label>
			<label class="row between" style="margin-bottom:12px;">
				<span>${t('toggleCountVideos')}</span>
				<input type="checkbox" id="toggleCountVideos" ${settings.countVideos ? 'checked' : ''}>
			</label>
			<label class="row between">
				<span>${t('toggleCountReturnVisits')}</span>
				<input type="checkbox" id="toggleCountReturnVisits" ${settings.countReturnVisits ? 'checked' : ''}>
			</label>
		</div>

		<div class="card">
			<h2>${t('headingNotifications')}</h2>
			<p class="sub">${t('notificationsHint')}</p>
			<button class="btn btn-primary" id="enableNotifBtn">
				${'Notification' in window && Notification.permission === 'granted' ? t('notificationsEnabledLabel') : t('btnEnableNotifications')}
			</button>
		</div>

		<div class="card">
			<h2>${t('headingBackup')}</h2>
			<p class="sub">${t('backupHint')}</p>
			<div class="row" style="gap:10px; flex-wrap:wrap;">
				<button class="btn" id="exportBtn"><i class="fas fa-download"></i> ${t('btnExport')}</button>
				<label class="btn" style="cursor:pointer;">
					<i class="fas fa-upload"></i> ${t('btnImport')}
					<input type="file" id="importInput" accept="application/json" hidden>
				</label>
			</div>
		</div>

		<div class="card">
			<h2>${t('headingDangerZone')}</h2>
			<button class="btn btn-danger" id="resetBtn"><i class="fas fa-exclamation-triangle"></i> ${t('btnResetAll')}</button>
		</div>
	`;

	container.querySelector('#installAppBtn')?.addEventListener('click', async () => {
		await triggerInstall();
		render(container);
	});

	onInstallStateChange(() => render(container));

	container.querySelector('#languageSelect').addEventListener('change', (e) => {
		setLanguage(e.target.value);
	});

	container.querySelector('#toggleCountPubs').addEventListener('change', (e) => { settings.countPubs = e.target.checked; });
	container.querySelector('#toggleCountVideos').addEventListener('change', (e) => { settings.countVideos = e.target.checked; });
	container.querySelector('#toggleCountReturnVisits').addEventListener('change', (e) => { settings.countReturnVisits = e.target.checked; });

	container.querySelector('#enableNotifBtn').addEventListener('click', async () => {
		const granted = await requestNotificationPermission();
		if (granted) showToast(t('notificationsEnabledLabel'));
		render(container);
	});

	container.querySelector('#exportBtn').addEventListener('click', async () => {
		const dump = await exportBackup();
		const blob = new Blob([JSON.stringify(dump, null, 2)], { type: 'application/json' });
		const url = URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.href = url;
		a.download = `revisits-backup-${new Date().toISOString().slice(0, 10)}.json`;
		a.click();
		URL.revokeObjectURL(url);
	});

	container.querySelector('#importInput').addEventListener('change', async (e) => {
		const file = e.target.files[0];
		if (!file) return;
		try {
			const text = await file.text();
			const json = JSON.parse(text);
			if (!confirm(t('confirmImport'))) return;
			await importBackup(json);
			showToast(t('toastImported'));
		} catch (err) {
			console.error(err);
			showToast(t('toastImportError'));
		}
	});

	container.querySelector('#resetBtn').addEventListener('click', async () => {
		if (!confirm(t('confirmResetAll'))) return;
		await importBackup({ territories: [], revisits: [], visits: [], services: [], dayGoals: [], reports: [], medals: [] });
		showToast(t('toastDataCleared'));
	});
}

function escapeAttr(str) {
	return String(str).replace(/"/g, '&quot;');
}

function installSectionHTML() {
	if (isStandalone()) {
		return `<p class="sub">${t('alreadyInstalledLabel')}</p>`;
	}
	if (canPromptInstall()) {
		return `<button class="btn btn-primary" id="installAppBtn"><i class="fas fa-download"></i> ${t('btnInstallApp')}</button>`;
	}
	return `<p class="sub">${t('manualInstallHint')}</p>`;
}
