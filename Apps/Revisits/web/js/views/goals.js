import * as store from '../store.js';
import { openModal, closeModal, showToast } from '../ui.js';
import { escapeHTML, formatHours, formatDateLong, monthLabel, daysInMonth, toISODate } from '../utils.js';
import { settings } from '../settings.js';
import { MEDAL_IMAGES } from '../constants.js';
import { t, weekdayName, weekdayShortName, medalLabel } from '../i18n.js';

let scope = 'mes';
let viewDate = new Date();

export async function render(container) {
	const services = await store.listServices();
	const monthlyGoal = await store.totalMonthlyGoal();

	container.innerHTML = `
		<div class="card">
			<h2 style="margin:0 0 10px;">${t('headingGoals')}</h2>
			<div class="segmented" id="scopeSeg">
				<button data-scope="mes" class="${scope === 'mes' ? 'active' : ''}">${t('scopeMonth')}</button>
				<button data-scope="año" class="${scope === 'año' ? 'active' : ''}">${t('scopeYear')}</button>
			</div>
			${scope === 'año' ? `
			<div class="segmented" id="yearKindSeg" style="margin-top:8px;">
				<button data-kind="calendario" class="${settings.yearPeriodKind === 'calendario' ? 'active' : ''}">${t('yearKindCalendar')}</button>
				<button data-kind="servicio" class="${settings.yearPeriodKind === 'servicio' ? 'active' : ''}">${t('yearKindService')}</button>
			</div>` : ''}
			<div id="scopeStats" style="margin-top:14px;"></div>
		</div>

		${scope === 'mes' ? `
		<div class="card">
			<div class="toolbar">
				<button class="icon-btn" id="prevMonth"><i class="fas fa-chevron-left"></i></button>
				<strong id="monthLabel"></strong>
				<button class="icon-btn" id="nextMonth"><i class="fas fa-chevron-right"></i></button>
			</div>
			<div class="calendar-grid" id="calendarGrid"></div>
		</div>` : ''}

		<div class="card">
			<h2><i class="fas fa-medal"></i> ${t('headingMedals')}</h2>
			<div id="medalsRow"></div>
		</div>

		<div class="card">
			<div class="row between">
				<h2 style="margin:0;">${t('headingServiceTypes')}</h2>
				<button class="btn btn-primary" id="newServiceBtn"><i class="fas fa-plus"></i> ${t('btnNewService')}</button>
			</div>
			<div id="servicesList"></div>
		</div>
	`;

	container.querySelector('#scopeSeg').querySelectorAll('button').forEach((btn) => {
		btn.addEventListener('click', () => { scope = btn.dataset.scope; render(container); });
	});
	container.querySelector('#yearKindSeg')?.querySelectorAll('button').forEach((btn) => {
		btn.addEventListener('click', () => { settings.yearPeriodKind = btn.dataset.kind; render(container); });
	});

	await renderScopeStats(container, monthlyGoal);
	if (scope === 'mes') {
		await renderCalendar(container);
		container.querySelector('#prevMonth').addEventListener('click', () => {
			viewDate = new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1);
			renderCalendar(container);
		});
		container.querySelector('#nextMonth').addEventListener('click', () => {
			viewDate = new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1);
			renderCalendar(container);
		});
	}
	await renderMedals(container);
	await renderServicesList(container, services);

	container.querySelector('#newServiceBtn').addEventListener('click', () => openServiceForm());
}

function yearRange(kind) {
	const now = new Date();
	if (kind === 'servicio') {
		const year = now.getMonth() >= 8 ? now.getFullYear() : now.getFullYear() - 1;
		return [new Date(year, 8, 1), new Date(year + 1, 7, 31, 23, 59, 59, 999)];
	}
	return [new Date(now.getFullYear(), 0, 1), new Date(now.getFullYear(), 11, 31, 23, 59, 59, 999)];
}

async function renderScopeStats(container, monthlyGoal) {
	const now = new Date();
	const [start, end] = scope === 'mes'
		? [new Date(now.getFullYear(), now.getMonth(), 1), new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999)]
		: yearRange(settings.yearPeriodKind);

	const reports = await store.listReportsInRange(start, end);
	const hours = store.sumHours(reports);
	const goal = scope === 'mes' ? monthlyGoal : monthlyGoal * 12;
	const pct = goal > 0 ? Math.min(100, Math.round((hours / goal) * 100)) : 0;

	const el = container.querySelector('#scopeStats');
	el.innerHTML = `
		<div class="row between" style="margin-bottom:6px; font-size:14px;">
			<span>${formatHours(hours)}</span>
			<span style="color:var(--text-muted);">${goal > 0 ? t('goalLabelPrefix') + ' ' + formatHours(goal) : t('noGoalDefined')}</span>
		</div>
		<div style="background:var(--border); border-radius:999px; height:10px; overflow:hidden;">
			<div style="width:${pct}%; height:100%; background:linear-gradient(90deg, var(--brand-start), var(--brand-end));"></div>
		</div>
	`;
}

async function renderCalendar(container) {
	const grid = container.querySelector('#calendarGrid');
	container.querySelector('#monthLabel').textContent = monthLabel(viewDate.getFullYear(), viewDate.getMonth());

	const allDayGoals = await store.listAllDayGoals();
	const dayGoalFor = (weekday) => allDayGoals.filter((g) => g.day === weekday).reduce((s, g) => s + (Number(g.goal) || 0), 0);

	const monthStart = new Date(viewDate.getFullYear(), viewDate.getMonth(), 1);
	const monthEnd = new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 0, 23, 59, 59, 999);
	const reports = await store.listReportsInRange(monthStart, monthEnd);

	const hoursByDay = {};
	for (const r of reports) {
		const key = r.date.slice(0, 10);
		hoursByDay[key] = (hoursByDay[key] || 0) + (Number(r.hours) || 0);
	}

	const total = daysInMonth(viewDate.getFullYear(), viewDate.getMonth());
	const firstWeekday = monthStart.getDay();
	const todayISOValue = toISODate(new Date());

	grid.innerHTML = Array.from({ length: 7 }, (_, i) => `<div class="dow">${escapeHTML(weekdayShortName(i))}</div>`).join('');

	for (let i = 0; i < firstWeekday; i++) {
		grid.insertAdjacentHTML('beforeend', '<div class="calendar-day empty"></div>');
	}

	for (let day = 1; day <= total; day++) {
		const date = new Date(viewDate.getFullYear(), viewDate.getMonth(), day);
		const iso = toISODate(date);
		const goal = dayGoalFor(date.getDay());
		const actual = hoursByDay[iso] || 0;
		let cls = 'calendar-day';
		if (goal > 0) {
			cls += ' has-goal';
			if (actual >= goal) cls += ' goal-met';
			else if (iso < todayISOValue) cls += ' goal-missed';
		}
		const cell = document.createElement('div');
		cell.className = cls;
		cell.innerHTML = `${day}${actual > 0 ? '<span class="dot"></span>' : ''}`;
		cell.addEventListener('click', () => openDayDetail(iso));
		grid.append(cell);
	}
}

async function openDayDetail(iso) {
	const reports = await store.listReports();
	const dayReports = reports.filter((r) => r.date.slice(0, 10) === iso);
	const services = await store.listServices();
	const serviceName = (id) => services.find((s) => s.id === id)?.name || t('wordServicio');

	openModal(formatDateLong(iso), `
		${dayReports.length ? dayReports.map((r) => `
			<div class="card">
				<div class="row between"><strong>${formatHours(r.hours)}</strong><span class="sub">${escapeHTML(serviceName(r.serviceId))}</span></div>
				<div class="sub">${r.studies ? t('wordEstudios') + ': ' + r.studies : ''} ${r.returnVisits ? t('wordRevisitas') + ': ' + r.returnVisits : ''}</div>
			</div>
		`).join('') : `<div class="empty-state">${escapeHTML(t('dayDetailEmpty'))}</div>`}
	`);
}

async function renderMedals(container) {
	const medals = await store.listMedals();
	const el = container.querySelector('#medalsRow');
	if (!medals.length) {
		el.innerHTML = `<div class="empty-state">${escapeHTML(t('emptyMedals'))}</div>`;
		return;
	}
	el.innerHTML = `<div class="medal-row">${medals.map((m) => `
		<div class="medal">
			<img src="${MEDAL_IMAGES[m.type] || ''}" alt="${escapeHTML(medalLabel(m.type))}">
			<div class="medal-label">${formatDateLong(m.date)}</div>
		</div>
	`).join('')}</div>`;
}

async function renderServicesList(container, services) {
	const el = container.querySelector('#servicesList');
	if (!services.length) {
		el.innerHTML = `<div class="empty-state">${escapeHTML(t('emptyServices'))}</div>`;
		return;
	}
	el.innerHTML = '';
	for (const service of services) {
		const row = document.createElement('div');
		row.className = 'list-item';
		row.innerHTML = `
			<div class="avatar revisita"><i class="fas fa-bullseye"></i></div>
			<div class="meta">
				<div class="name">${escapeHTML(service.name)}</div>
				<div class="sub">${t('monthlyGoalPrefix')} ${formatHours(service.timeGoal || 0)}</div>
			</div>
		`;
		row.addEventListener('click', () => openServiceForm(service));
		el.append(row);
	}
}

async function openServiceForm(service) {
	const dayGoals = service ? await store.listDayGoals(service.id) : [];
	const goalsByDay = Array.from({ length: 7 }, (_, i) => dayGoals.find((g) => g.day === i)?.goal || 0);

	const sheet = openModal(service ? t('editServiceTitle') : t('newServiceTitle'), `
		<form id="serviceForm">
			<div class="field">
				<label>${t('labelServiceName')}</label>
				<input name="name" required value="${escapeHTML(service?.name || '')}" placeholder="${escapeHTML(t('placeholderServiceName'))}">
			</div>
			<div class="field">
				<label>${t('labelMonthlyGoal')}</label>
				<input type="number" name="timeGoal" min="0" step="0.5" value="${service?.timeGoal || 0}">
			</div>
			<h2 style="font-size:14px;">${t('headingDayGoals')}</h2>
			<div class="row wrap" style="gap:10px;">
				${Array.from({ length: 7 }, (_, i) => `
					<div class="field" style="flex:1; min-width:110px;">
						<label>${escapeHTML(weekdayName(i))}</label>
						<input type="number" name="day${i}" min="0" step="0.25" value="${goalsByDay[i]}">
					</div>
				`).join('')}
			</div>
			<div class="row" style="gap:10px; margin-top:10px;">
				${service ? `<button type="button" class="btn btn-danger" id="deleteServiceBtn"><i class="fas fa-trash"></i></button>` : ''}
				<button type="submit" class="btn btn-primary btn-block">${service ? t('update') : t('save')}</button>
			</div>
		</form>
	`);

	if (service) {
		sheet.querySelector('#deleteServiceBtn').addEventListener('click', async () => {
			if (!confirm(t('confirmDeleteService'))) return;
			await store.deleteService(service.id);
			closeModal();
			showToast(t('toastServiceDeleted'));
			render(document.getElementById('view-metas'));
		});
	}

	sheet.querySelector('#serviceForm').addEventListener('submit', async (e) => {
		e.preventDefault();
		const fd = new FormData(e.target);
		const dayValues = Array.from({ length: 7 }, (_, i) => Number(fd.get(`day${i}`)) || 0);
		await store.saveService({
			id: service?.id,
			name: fd.get('name')?.trim(),
			timeGoal: Number(fd.get('timeGoal')) || 0,
			extraTime: service?.extraTime || 0
		}, dayValues);
		closeModal();
		showToast(service ? t('toastServiceUpdated') : t('toastServiceCreated'));
		render(document.getElementById('view-metas'));
	});
}
