import { settings } from '../settings.js';
import { exportBackup, importBackup } from '../store.js';
import { showToast } from '../ui.js';
import { requestNotificationPermission } from '../notifications.js';

export async function render(container) {
	container.innerHTML = `
		<div class="card">
			<h2>Contadores del informe</h2>
			<label class="row between" style="margin-bottom:12px;">
				<span>Contar publicaciones</span>
				<input type="checkbox" id="toggleCountPubs" ${settings.countPubs ? 'checked' : ''}>
			</label>
			<label class="row between" style="margin-bottom:12px;">
				<span>Contar videos</span>
				<input type="checkbox" id="toggleCountVideos" ${settings.countVideos ? 'checked' : ''}>
			</label>
			<label class="row between">
				<span>Contar revisitas</span>
				<input type="checkbox" id="toggleCountReturnVisits" ${settings.countReturnVisits ? 'checked' : ''}>
			</label>
		</div>

		<div class="card">
			<h2>Notificaciones</h2>
			<p class="sub">Recordatorios de revisitas y del temporizador funcionan mientras Revisits Web esté abierta o instalada.</p>
			<button class="btn btn-primary" id="enableNotifBtn">
				${'Notification' in window && Notification.permission === 'granted' ? 'Notificaciones activadas' : 'Activar notificaciones'}
			</button>
		</div>

		<div class="card">
			<h2>Respaldo de datos</h2>
			<p class="sub">Tus datos se guardan solo en este dispositivo (IndexedDB). Exporta un respaldo antes de borrar el navegador o cambiar de dispositivo.</p>
			<div class="row" style="gap:10px; flex-wrap:wrap;">
				<button class="btn" id="exportBtn"><i class="fas fa-download"></i> Exportar respaldo</button>
				<label class="btn" style="cursor:pointer;">
					<i class="fas fa-upload"></i> Importar respaldo
					<input type="file" id="importInput" accept="application/json" hidden>
				</label>
			</div>
		</div>

		<div class="card">
			<h2>Zona de riesgo</h2>
			<button class="btn btn-danger" id="resetBtn"><i class="fas fa-triangle-exclamation"></i> Borrar todos los datos</button>
		</div>
	`;

	container.querySelector('#toggleCountPubs').addEventListener('change', (e) => { settings.countPubs = e.target.checked; });
	container.querySelector('#toggleCountVideos').addEventListener('change', (e) => { settings.countVideos = e.target.checked; });
	container.querySelector('#toggleCountReturnVisits').addEventListener('change', (e) => { settings.countReturnVisits = e.target.checked; });

	container.querySelector('#enableNotifBtn').addEventListener('click', async () => {
		const granted = await requestNotificationPermission();
		showToast(granted ? 'Notificaciones activadas' : 'Permiso no concedido');
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
			if (!confirm('Esto reemplazará todos tus datos actuales con los del respaldo. ¿Continuar?')) return;
			await importBackup(json);
			showToast('Respaldo importado');
		} catch (err) {
			console.error(err);
			showToast('No se pudo leer el archivo de respaldo');
		}
	});

	container.querySelector('#resetBtn').addEventListener('click', async () => {
		if (!confirm('Esto borrará permanentemente todas tus revisitas, informes y metas. ¿Continuar?')) return;
		await importBackup({ territories: [], revisits: [], visits: [], services: [], dayGoals: [], reports: [], medals: [] });
		showToast('Datos borrados');
	});
}
