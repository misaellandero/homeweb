import * as store from '../store.js';
import { openModal, closeModal, showToast } from '../ui.js';
import { escapeHTML, formatHours, formatDateLong, todayISO, startOfWeek, endOfWeek, startOfMonth, endOfMonth, startOfYear, endOfYear } from '../utils.js';
import { settings, getTimerState, setTimerState, clearTimerState } from '../settings.js';
import { scheduleTimerGoalNotification, clearTimerGoalNotification } from '../notifications.js';

let periodScope = 'dia';
let timerIntervalId = null;

const PRESETS = [
	{ label: 'Sin límite', seconds: null },
	{ label: '5 min', seconds: 5 * 60 },
	{ label: '10 min', seconds: 10 * 60 },
	{ label: '15 min', seconds: 15 * 60 },
	{ label: '30 min', seconds: 30 * 60 },
	{ label: '1 hora', seconds: 60 * 60 },
	{ label: '2 horas', seconds: 2 * 60 * 60 }
];

export async function render(container) {
	stopTicking();

	const services = await store.listServices();
	const timerState = getTimerState();

	container.innerHTML = `
		<div class="card">
			<div class="segmented" id="periodSeg">
				${['dia', 'semana', 'mes', 'año'].map((p) => `<button data-scope="${p}" class="${periodScope === p ? 'active' : ''}">${cap(p)}</button>`).join('')}
			</div>
			<div class="stat-grid" id="periodStats" style="margin-top:12px;"></div>
		</div>

		<div class="card">
			<h2><i class="fas fa-stopwatch"></i> Temporizador</h2>
			<div class="timer-display" id="timerDisplay">00:00:00</div>
			<div id="timerCounters" class="row wrap" style="gap:10px; justify-content:center; margin-bottom:14px;"></div>
			<div class="row" style="gap:10px;" id="timerControls"></div>
		</div>

		<div class="card">
			<div class="row between">
				<h2 style="margin:0;"><i class="fas fa-clock"></i> Historial</h2>
				<button class="btn btn-primary" id="manualReportBtn"><i class="fas fa-plus"></i> Registrar</button>
			</div>
			<div id="reportHistory"></div>
		</div>
	`;

	container.querySelectorAll('#periodSeg button').forEach((btn) => {
		btn.addEventListener('click', () => {
			periodScope = btn.dataset.scope;
			render(container);
		});
	});

	await renderPeriodStats(container, services);
	await renderHistory(container);
	renderTimer(container, services, timerState);

	container.querySelector('#manualReportBtn').addEventListener('click', () => openReportForm(services));
}

function cap(s) {
	return s.charAt(0).toUpperCase() + s.slice(1);
}

function periodRange() {
	const today = new Date();
	if (periodScope === 'dia') return [new Date(today.getFullYear(), today.getMonth(), today.getDate()), new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59, 999)];
	if (periodScope === 'semana') return [startOfWeek(today), endOfWeek(today)];
	if (periodScope === 'mes') return [startOfMonth(today), endOfMonth(today)];
	return [startOfYear(today), endOfYear(today)];
}

async function renderPeriodStats(container, services) {
	const [start, end] = periodRange();
	const reports = await store.listReportsInRange(start, end);
	const hours = store.sumHours(reports);
	const studies = store.sumField(reports, 'studies');
	const returnVisits = store.sumField(reports, 'returnVisits');

	let goal = 0;
	const monthlyGoal = await store.totalMonthlyGoal();
	if (monthlyGoal > 0) {
		if (periodScope === 'dia') goal = await store.dayGoalForWeekday(new Date().getDay());
		else if (periodScope === 'semana') goal = monthlyGoal * (7 / 30);
		else if (periodScope === 'mes') goal = monthlyGoal;
		else goal = monthlyGoal * 12;
	}

	const grid = container.querySelector('#periodStats');
	grid.innerHTML = `
		<div class="stat-tile"><div class="value">${formatHours(hours)}</div><div class="label">Horas${goal ? ' / ' + formatHours(goal) : ''}</div></div>
		<div class="stat-tile"><div class="value">${studies}</div><div class="label">Estudios</div></div>
		<div class="stat-tile"><div class="value">${returnVisits}</div><div class="label">Revisitas</div></div>
		<div class="stat-tile"><div class="value">${services.length}</div><div class="label">Tipos de servicio</div></div>
	`;
}

async function renderHistory(container) {
	const reports = await store.listReports();
	const services = await store.listServices();
	const serviceName = (id) => services.find((s) => s.id === id)?.name || 'Servicio';

	const historyEl = container.querySelector('#reportHistory');
	if (!reports.length) {
		historyEl.innerHTML = '<div class="empty-state">Aún no has registrado horas de servicio.</div>';
		return;
	}

	historyEl.innerHTML = '';
	for (const report of reports.slice(0, 60)) {
		const row = document.createElement('div');
		row.className = 'list-item';
		row.innerHTML = `
			<div class="avatar revisita"><i class="fas fa-clock"></i></div>
			<div class="meta">
				<div class="name">${formatDateLong(report.date)} · ${formatHours(report.hours)}</div>
				<div class="sub">${escapeHTML(serviceName(report.serviceId))}${report.studies ? ' · ' + report.studies + ' estudio(s)' : ''}${report.returnVisits ? ' · ' + report.returnVisits + ' revisita(s)' : ''}</div>
			</div>
			<button class="icon-btn" aria-label="Eliminar"><i class="fas fa-trash"></i></button>
		`;
		row.querySelector('button').addEventListener('click', async (e) => {
			e.stopPropagation();
			if (!confirm('¿Eliminar este informe?')) return;
			await store.deleteReport(report.id);
			showToast('Informe eliminado');
			render(document.getElementById('view-informes'));
		});
		historyEl.append(row);
	}
}

// ---------- Manual report form ----------

function sourceServiceOptions(services, selectedId) {
	return services.map((s) => `<option value="${s.id}" ${selectedId === s.id ? 'selected' : ''}>${escapeHTML(s.name)}</option>`).join('');
}

function openReportForm(services, prefill = {}) {
	const sheet = openModal('Registrar informe', `
		<form id="reportForm">
			<div class="field">
				<label>Fecha</label>
				<input type="date" name="date" value="${prefill.date || todayISO()}">
			</div>
			${services.length ? `
			<div class="field">
				<label>Tipo de servicio</label>
				<select name="serviceId">${sourceServiceOptions(services, prefill.serviceId || services[0]?.id)}</select>
			</div>` : '<p class="empty-state">Crea un tipo de servicio en la pestaña Metas para poder asociar tus informes.</p>'}
			<div class="field">
				<label>Horas (15 minutos = 0.25 horas)</label>
				<input type="number" name="hours" step="0.25" min="0" max="24" value="${prefill.hours ?? 0}">
			</div>
			<div class="row wrap" style="gap:16px;">
				<div class="field" style="flex:1;">
					<label>Estudios</label>
					<input type="number" name="studies" min="0" max="100" value="${prefill.studies ?? 0}">
				</div>
				${settings.countReturnVisits ? `<div class="field" style="flex:1;"><label>Revisitas</label><input type="number" name="returnVisits" min="0" max="100" value="${prefill.returnVisits ?? 0}"></div>` : ''}
			</div>
			<div class="row wrap" style="gap:16px;">
				${settings.countPubs ? `<div class="field" style="flex:1;"><label>Publicaciones</label><input type="number" name="pubs" min="0" max="100" value="${prefill.pubs ?? 0}"></div>` : ''}
				${settings.countVideos ? `<div class="field" style="flex:1;"><label>Videos</label><input type="number" name="videos" min="0" max="100" value="${prefill.videos ?? 0}"></div>` : ''}
			</div>
			<button type="submit" class="btn btn-primary btn-block" style="margin-top:8px;">Guardar</button>
		</form>
	`);

	sheet.querySelector('#reportForm').addEventListener('submit', async (e) => {
		e.preventDefault();
		const fd = new FormData(e.target);
		const report = {
			id: prefill.id,
			date: fd.get('date'),
			serviceId: fd.get('serviceId') || null,
			hours: Number(fd.get('hours')) || 0,
			studies: Number(fd.get('studies')) || 0,
			returnVisits: Number(fd.get('returnVisits')) || 0,
			pubs: Number(fd.get('pubs')) || 0,
			videos: Number(fd.get('videos')) || 0
		};
		await store.saveReport(report);
		if (prefill.clearTimer) {
			clearTimerState();
			clearTimerGoalNotification();
		}
		closeModal();
		showToast('Informe guardado');
		render(document.getElementById('view-informes'));
	});
}

// ---------- Timer ----------

function renderTimer(container, services, timerState) {
	const controls = container.querySelector('#timerControls');
	const countersEl = container.querySelector('#timerCounters');
	const display = container.querySelector('#timerDisplay');

	function drawCounters() {
		const state = getTimerState();
		const counters = state?.counters || { studies: 0, pubs: 0, videos: 0, returnVisits: 0 };
		const fields = [{ key: 'studies', label: 'Estudios', always: true }];
		if (settings.countPubs) fields.push({ key: 'pubs', label: 'Publicaciones' });
		if (settings.countVideos) fields.push({ key: 'videos', label: 'Videos' });
		if (settings.countReturnVisits) fields.push({ key: 'returnVisits', label: 'Revisitas' });

		countersEl.innerHTML = fields.map((f) => `
			<div class="stat-tile" style="min-width:84px;">
				<div class="row" style="justify-content:center; gap:8px;">
					<button class="icon-btn" data-key="${f.key}" data-delta="-1">-</button>
					<div class="value" data-counter="${f.key}">${counters[f.key] || 0}</div>
					<button class="icon-btn" data-key="${f.key}" data-delta="1">+</button>
				</div>
				<div class="label">${f.label}</div>
			</div>
		`).join('');

		countersEl.querySelectorAll('button').forEach((btn) => {
			btn.addEventListener('click', () => {
				const state = getTimerState();
				if (!state) return;
				const key = btn.dataset.key;
				const delta = Number(btn.dataset.delta);
				state.counters[key] = Math.max(0, (state.counters[key] || 0) + delta);
				setTimerState(state);
				countersEl.querySelector(`[data-counter="${key}"]`).textContent = state.counters[key];
			});
		});
	}

	function drawControls(active) {
		if (active) {
			controls.innerHTML = `
				<button class="btn" id="restartBtn"><i class="fas fa-rotate-left"></i> Reiniciar</button>
				<button class="btn btn-primary btn-block" id="registerBtn"><i class="fas fa-check"></i> Registrar</button>
			`;
			controls.querySelector('#restartBtn').addEventListener('click', () => {
				if (!confirm('¿Reiniciar el temporizador? Se perderá el tiempo acumulado.')) return;
				clearTimerState();
				clearTimerGoalNotification();
				render(container);
			});
			controls.querySelector('#registerBtn').addEventListener('click', () => {
				const state = getTimerState();
				const elapsedHours = (Date.now() - new Date(state.startTime).getTime()) / 3_600_000;
				openReportForm(services, {
					date: todayISO(),
					serviceId: state.serviceId,
					hours: Math.round(elapsedHours * 100) / 100,
					studies: state.counters.studies,
					pubs: state.counters.pubs,
					videos: state.counters.videos,
					returnVisits: state.counters.returnVisits,
					clearTimer: true
				});
			});
		} else {
			controls.innerHTML = `
				<div class="segmented" id="presetSeg" style="flex-wrap:wrap;">
					${PRESETS.map((p, i) => `<button type="button" data-i="${i}">${p.label}</button>`).join('')}
				</div>
			`;
			controls.querySelectorAll('#presetSeg button').forEach((btn) => {
				btn.addEventListener('click', () => {
					const preset = PRESETS[Number(btn.dataset.i)];
					setTimerState({
						active: true,
						startTime: new Date().toISOString(),
						presetSeconds: preset.seconds,
						serviceId: services[0]?.id || null,
						counters: { studies: 0, pubs: 0, videos: 0, returnVisits: 0 }
					});
					if (preset.seconds) scheduleTimerGoalNotification(preset.seconds);
					render(container);
				});
			});
		}
	}

	function tick() {
		const state = getTimerState();
		if (!state) return;
		const elapsedMs = Date.now() - new Date(state.startTime).getTime();
		display.textContent = formatClock(elapsedMs);
	}

	const active = !!timerState;
	drawControls(active);
	drawCounters();
	if (active) {
		tick();
		timerIntervalId = setInterval(tick, 1000);
	} else {
		display.textContent = '00:00:00';
	}
}

function stopTicking() {
	if (timerIntervalId) {
		clearInterval(timerIntervalId);
		timerIntervalId = null;
	}
}

function formatClock(ms) {
	const totalSeconds = Math.max(0, Math.floor(ms / 1000));
	const h = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
	const m = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
	const s = String(totalSeconds % 60).padStart(2, '0');
	return `${h}:${m}:${s}`;
}
