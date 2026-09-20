import * as store from '../store.js';
import { openModal, closeModal, showToast } from '../ui.js';
import { escapeHTML, formatHours, formatDateLong, todayISO, startOfWeek, endOfWeek, startOfMonth, endOfMonth, startOfYear, endOfYear } from '../utils.js';
import { settings, getTimerState, setTimerState, clearTimerState } from '../settings.js';
import { scheduleTimerGoalNotification, clearTimerGoalNotification } from '../notifications.js';
import { t } from '../i18n.js';

let periodScope = 'dia';
let timerIntervalId = null;

function presets() {
	return [
		{ label: t('presetNoLimit'), seconds: null },
		{ label: t('preset5min'), seconds: 5 * 60 },
		{ label: t('preset10min'), seconds: 10 * 60 },
		{ label: t('preset15min'), seconds: 15 * 60 },
		{ label: t('preset30min'), seconds: 30 * 60 },
		{ label: t('preset1h'), seconds: 60 * 60 },
		{ label: t('preset2h'), seconds: 2 * 60 * 60 }
	];
}

export async function render(container) {
	stopTicking();

	const services = await store.listServices();
	const timerState = getTimerState();

	const periods = [
		{ key: 'dia', label: t('periodDay') },
		{ key: 'semana', label: t('periodWeek') },
		{ key: 'mes', label: t('periodMonth') },
		{ key: 'año', label: t('periodYear') }
	];

	container.innerHTML = `
		<div class="card">
			<div class="segmented" id="periodSeg">
				${periods.map((p) => `<button data-scope="${p.key}" class="${periodScope === p.key ? 'active' : ''}">${p.label}</button>`).join('')}
			</div>
			<div class="stat-grid" id="periodStats" style="margin-top:12px;"></div>
		</div>

		<div class="card">
			<h2><i class="fas fa-stopwatch"></i> ${t('headingTimer')}</h2>
			<div class="timer-display" id="timerDisplay">00:00:00</div>
			<div id="timerCounters" class="row wrap" style="gap:10px; justify-content:center; margin-bottom:14px;"></div>
			<div class="row" style="gap:10px;" id="timerControls"></div>
		</div>

		<div class="card">
			<div class="row between">
				<h2 style="margin:0;"><i class="fas fa-clock"></i> ${t('headingHistory')}</h2>
				<button class="btn btn-primary" id="manualReportBtn"><i class="fas fa-plus"></i> ${t('btnRegister')}</button>
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
		<div class="stat-tile"><div class="value">${formatHours(hours)}</div><div class="label">${t('wordHoras')}${goal ? ' / ' + formatHours(goal) : ''}</div></div>
		<div class="stat-tile"><div class="value">${studies}</div><div class="label">${t('wordEstudios')}</div></div>
		<div class="stat-tile"><div class="value">${returnVisits}</div><div class="label">${t('wordRevisitas')}</div></div>
		<div class="stat-tile"><div class="value">${services.length}</div><div class="label">${t('statServiceTypes')}</div></div>
	`;
}

async function renderHistory(container) {
	const reports = await store.listReports();
	const services = await store.listServices();
	const serviceName = (id) => services.find((s) => s.id === id)?.name || t('wordServicio');

	const historyEl = container.querySelector('#reportHistory');
	if (!reports.length) {
		historyEl.innerHTML = `
			<div class="empty-state">
				<p>${escapeHTML(t('emptyHistory'))}</p>
				<button class="btn btn-primary" id="emptyHistoryAddBtn"><i class="fas fa-plus"></i> ${t('btnRegister')}</button>
			</div>
		`;
		historyEl.querySelector('#emptyHistoryAddBtn').addEventListener('click', () => openReportForm(services));
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
				<div class="sub">${escapeHTML(serviceName(report.serviceId))}${report.studies ? ' · ' + t('wordEstudios') + ': ' + report.studies : ''}${report.returnVisits ? ' · ' + t('wordRevisitas') + ': ' + report.returnVisits : ''}${report.pubs ? ' · ' + t('wordPublicaciones') + ': ' + report.pubs : ''}${report.videos ? ' · ' + t('wordVideos') + ': ' + report.videos : ''}</div>
			</div>
			<button class="icon-btn" aria-label="${escapeHTML(t('ariaDelete'))}"><i class="fas fa-trash"></i></button>
		`;
		row.querySelector('button').addEventListener('click', async (e) => {
			e.stopPropagation();
			if (!confirm(t('confirmDeleteReport'))) return;
			await store.deleteReport(report.id);
			showToast(t('toastReportDeleted'));
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
	const sheet = openModal(t('reportFormTitle'), `
		<form id="reportForm">
			<div class="field">
				<label>${t('labelDate')}</label>
				<input type="date" name="date" value="${prefill.date || todayISO()}">
			</div>
			${services.length ? `
			<div class="field">
				<label>${t('labelServiceType')}</label>
				<select name="serviceId">${sourceServiceOptions(services, prefill.serviceId || services[0]?.id)}</select>
			</div>` : `<p class="empty-state">${escapeHTML(t('noServicesHint'))}</p>`}
			<div class="field">
				<label>${t('labelHoursFraction')}</label>
				<input type="number" name="hours" step="0.25" min="0" max="24" value="${prefill.hours ?? 0}">
			</div>
			<div class="row wrap" style="gap:16px;">
				<div class="field" style="flex:1;">
					<label>${t('wordEstudios')}</label>
					<input type="number" name="studies" min="0" max="100" value="${prefill.studies ?? 0}">
				</div>
				${settings.countReturnVisits ? `<div class="field" style="flex:1;"><label>${t('wordRevisitas')}</label><input type="number" name="returnVisits" min="0" max="100" value="${prefill.returnVisits ?? 0}"></div>` : ''}
			</div>
			<div class="row wrap" style="gap:16px;">
				${settings.countPubs ? `<div class="field" style="flex:1;"><label>${t('wordPublicaciones')}</label><input type="number" name="pubs" min="0" max="100" value="${prefill.pubs ?? 0}"></div>` : ''}
				${settings.countVideos ? `<div class="field" style="flex:1;"><label>${t('wordVideos')}</label><input type="number" name="videos" min="0" max="100" value="${prefill.videos ?? 0}"></div>` : ''}
			</div>
			<button type="submit" class="btn btn-primary btn-block" style="margin-top:8px;">${t('save')}</button>
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
		showToast(t('toastReportSaved'));
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
		const fields = [{ key: 'studies', label: t('wordEstudios') }];
		if (settings.countPubs) fields.push({ key: 'pubs', label: t('wordPublicaciones') });
		if (settings.countVideos) fields.push({ key: 'videos', label: t('wordVideos') });
		if (settings.countReturnVisits) fields.push({ key: 'returnVisits', label: t('wordRevisitas') });

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
			const state = getTimerState();
			const running = state.running !== false;
			controls.innerHTML = `
				<div class="row" style="gap:10px; width:100%;">
					<button class="btn btn-danger" id="ignoreBtn" style="flex:1;"><i class="fas fa-trash"></i> ${t('btnIgnore')}</button>
					<button class="btn" id="pauseResumeBtn" style="flex:1;">
						${running ? `<i class="fas fa-pause"></i> ${t('btnPause')}` : `<i class="fas fa-play"></i> ${t('btnResume')}`}
					</button>
				</div>
				<button class="btn btn-primary btn-block" id="registerBtn" style="margin-top:10px;"><i class="fas fa-check"></i> ${t('btnRegister')}</button>
			`;
			controls.querySelector('#ignoreBtn').addEventListener('click', () => {
				if (!confirm(t('confirmIgnoreTimer'))) return;
				clearTimerState();
				clearTimerGoalNotification();
				render(container);
			});
			controls.querySelector('#pauseResumeBtn').addEventListener('click', () => {
				const s = getTimerState();
				if (!s) return;
				if (s.running !== false) {
					s.accumulatedMs = elapsedMs(s);
					s.running = false;
					s.startTime = null;
				} else {
					s.running = true;
					s.startTime = new Date().toISOString();
				}
				setTimerState(s);
				stopTicking();
				renderTimer(container, services, s);
			});
			controls.querySelector('#registerBtn').addEventListener('click', () => {
				const s = getTimerState();
				const elapsedHours = elapsedMs(s) / 3_600_000;
				openReportForm(services, {
					date: todayISO(),
					serviceId: s.serviceId,
					hours: Math.round(elapsedHours * 100) / 100,
					studies: s.counters.studies,
					pubs: s.counters.pubs,
					videos: s.counters.videos,
					returnVisits: s.counters.returnVisits,
					clearTimer: true
				});
			});
		} else {
			const PRESETS = presets();
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
						running: true,
						startTime: new Date().toISOString(),
						accumulatedMs: 0,
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
		display.textContent = formatClock(elapsedMs(state));
	}

	const active = !!timerState;
	drawControls(active);
	drawCounters();
	if (active && timerState.running !== false) {
		tick();
		timerIntervalId = setInterval(tick, 1000);
	} else if (active) {
		display.textContent = formatClock(elapsedMs(timerState));
	} else {
		display.textContent = '00:00:00';
	}
}

function elapsedMs(state) {
	const accumulated = state.accumulatedMs || 0;
	if (state.running === false || !state.startTime) return accumulated;
	return accumulated + (Date.now() - new Date(state.startTime).getTime());
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
