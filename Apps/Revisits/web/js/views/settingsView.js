import { settings } from '../settings.js';
import { exportBackup, importBackup } from '../store.js';
import { showToast } from '../ui.js';
import { requestNotificationPermission } from '../notifications.js';
import { t, getLanguage, setLanguage, LANGUAGES } from '../i18n.js';
import { canPromptInstall, triggerInstall, isStandalone, isIOS, isSafari, onInstallStateChange } from '../install.js';

const PAYPAL_DONATE_URL = 'https://paypal.me/landercorp';

const OTHER_APPS = [
	{ name: '+Cota', icon: 'assets/art/other-apps/cota-icon.webp', url: 'https://misaellandero.com/Apps/Cota/index.html' },
	{ name: 'DebtMe', icon: '../../DebtMe/sistema/images/portfolio-icon-light.png', url: 'https://misaellandero.com/Apps/DebtMe/index_debtMe.html' },
	{ name: 'Loxi', icon: '../../Loxi/assets/images/icon.png', url: 'https://misaellandero.com/Apps/Loxi/index.html' },
	{ name: 'Fox vs Hunters', icon: '../../Fox%20vs%20Hunters/assets/images/portfolio-icon-light.png', url: 'https://misaellandero.com/Apps/Fox%20vs%20Hunters/index.html' },
	{ name: 'Caffeinate Bar', icon: '../../CaffeinateBar/assets/images/icon.png', url: 'https://misaellandero.com/Apps/CaffeinateBar/index.html' }
];

export async function render(container) {
	container.innerHTML = `
		<div class="support-hero">
			<i class="fas fa-heart"></i>
			<div>
				<h2>${t('headingSupport')}</h2>
				<p>${t('supportHint')}</p>
				<a class="btn btn-block" id="supportBtn" href="${PAYPAL_DONATE_URL}" target="_blank" rel="noopener">${t('btnSupport')}</a>
			</div>
		</div>

		<div class="card">
			<h2>${t('headingOtherApps')}</h2>
			<p class="sub" style="margin-top:-4px;">${t('otherAppsHint')}</p>
			<div class="other-apps-row">
				${OTHER_APPS.map((app) => `
					<a class="other-app-tile" href="${app.url}" target="_blank" rel="noopener">
						<img src="${app.icon}" alt="${escapeAttr(app.name)}" loading="lazy">
						<span>${escapeAttr(app.name)}</span>
					</a>
				`).join('')}
			</div>
		</div>

		<div class="card install-card">
			<div class="install-card-header">
				<div class="install-icon"><i class="fas ${isStandalone() ? 'fa-check-circle' : 'fa-download'}"></i></div>
				<h2>${t('headingInstall')}</h2>
			</div>
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
			${'Notification' in window && Notification.permission === 'denied'
				? `<p class="sub" style="color:var(--warning);"><i class="fas fa-exclamation-circle"></i> ${t('notificationsDeniedHint')}</p>`
				: `<button class="btn btn-primary" id="enableNotifBtn">
					${'Notification' in window && Notification.permission === 'granted' ? t('notificationsEnabledLabel') : t('btnEnableNotifications')}
				</button>`}
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
			<div style="border-top:1px solid var(--border); margin:16px 0 12px;"></div>
			<p class="sub">${t('nativeBackupHint')}</p>
			<div class="row" style="gap:10px; flex-wrap:wrap;">
				<button class="btn" id="exportNativeBtn"><i class="fas fa-mobile-alt"></i> ${t('btnExportNative')}</button>
				<label class="btn" style="cursor:pointer;">
					<i class="fas fa-mobile-alt"></i> ${t('btnImportNative')}
					<input type="file" id="importNativeInput" accept=".sqlite,.sqlite-wal" multiple hidden>
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

	container.querySelector('#enableNotifBtn')?.addEventListener('click', async () => {
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

	container.querySelector('#exportNativeBtn').addEventListener('click', async () => {
		const btn = container.querySelector('#exportNativeBtn');
		const originalHTML = btn.innerHTML;
		btn.disabled = true;
		btn.innerHTML = `<i class="fas fa-spinner fa-spin"></i> ${escapeAttr(t('workingHint'))}`;
		try {
			const { downloadFullBackup } = await import('../backupExport.js');
			await downloadFullBackup();
		} catch (err) {
			console.error(err);
			showToast(t('toastExportError'));
		} finally {
			btn.disabled = false;
			btn.innerHTML = originalHTML;
		}
	});

	container.querySelector('#importNativeInput').addEventListener('change', async (e) => {
		const files = Array.from(e.target.files);
		e.target.value = '';
		if (!files.length) return;
		if (!confirm(t('confirmImport'))) return;
		try {
			const { importFullBackupFiles } = await import('../backupImport.js');
			await importFullBackupFiles(files);
			showToast(t('toastImported'));
			render(container);
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
		return `<p class="install-hint">${t('alreadyInstalledLabel')}</p>`;
	}
	if (canPromptInstall()) {
		return `<button class="btn btn-primary btn-block btn-lg" id="installAppBtn"><i class="fas fa-download"></i> ${t('btnInstallApp')}</button>`;
	}
	if (isIOS()) {
		return `<p class="install-hint"><i class="fas fa-share-square"></i> ${t('manualInstallHintIOS')}</p>`;
	}
	if (isSafari()) {
		return `<p class="install-hint"><i class="fas fa-share-square"></i> ${t('manualInstallHintSafariMac')}</p>`;
	}
	return `<p class="install-hint"><i class="fas fa-arrow-down"></i> ${t('manualInstallHint')}</p>`;
}
