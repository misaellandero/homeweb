import { db } from './db.js';
import { uid, toISODate, startOfWeek, endOfWeek, startOfMonth, endOfMonth, startOfYear, endOfYear, inRange } from './utils.js';

// ---------- Territories ----------

export async function listTerritories() {
	const rows = await db.getAll('territories');
	return rows.sort((a, b) => a.name.localeCompare(b.name));
}

export async function saveTerritory(name) {
	const territory = { id: uid(), name };
	await db.put('territories', territory);
	return territory;
}

// ---------- Revisits ----------

export async function listRevisits() {
	const rows = await db.getAll('revisits');
	return rows.sort((a, b) => (a.name || '').localeCompare(b.name || ''));
}

export async function getRevisit(id) {
	return db.get('revisits', id);
}

export async function saveRevisit(data) {
	const revisit = { ...data, id: data.id || uid() };
	await db.put('revisits', revisit);
	return revisit;
}

export async function deleteRevisit(id) {
	const visits = await db.getAllByIndex('visits', 'revisitId', id);
	for (const visit of visits) {
		await db.delete('visits', visit.id);
	}
	await db.delete('revisits', id);
}

// ---------- Visits (visit log entries) ----------

export async function listVisitsForRevisit(revisitId) {
	const rows = await db.getAllByIndex('visits', 'revisitId', revisitId);
	return rows.sort((a, b) => new Date(b.date) - new Date(a.date));
}

export async function saveVisit(data) {
	const visit = { ...data, id: data.id || uid() };
	await db.put('visits', visit);
	return visit;
}

export async function deleteVisit(id) {
	return db.delete('visits', id);
}

// ---------- Services + day goals ----------

export async function listServices() {
	const rows = await db.getAll('services');
	return rows.sort((a, b) => (a.name || '').localeCompare(b.name || ''));
}

export async function getService(id) {
	return db.get('services', id);
}

export async function listDayGoals(serviceId) {
	return db.getAllByIndex('dayGoals', 'serviceId', serviceId);
}

export async function listAllDayGoals() {
	return db.getAll('dayGoals');
}

export async function saveService(data, dayGoalHours) {
	const service = { ...data, id: data.id || uid() };
	await db.put('services', service);

	const existing = await listDayGoals(service.id);
	for (const goal of existing) {
		await db.delete('dayGoals', goal.id);
	}
	if (Array.isArray(dayGoalHours)) {
		for (let day = 0; day < dayGoalHours.length; day++) {
			await db.put('dayGoals', {
				id: uid(),
				serviceId: service.id,
				day,
				goal: Number(dayGoalHours[day]) || 0
			});
		}
	}
	return service;
}

export async function deleteService(id) {
	const goals = await listDayGoals(id);
	for (const goal of goals) {
		await db.delete('dayGoals', goal.id);
	}
	const reports = await db.getAllByIndex('reports', 'serviceId', id);
	for (const report of reports) {
		await db.delete('reports', report.id);
	}
	await db.delete('services', id);
}

export async function totalMonthlyGoal() {
	const services = await listServices();
	return services.reduce((sum, s) => sum + (Number(s.timeGoal) || 0), 0);
}

export async function dayGoalForWeekday(weekday) {
	const goals = await listAllDayGoals();
	return goals.filter((g) => g.day === weekday).reduce((sum, g) => sum + (Number(g.goal) || 0), 0);
}

// ---------- Reports ----------

export async function listReports() {
	const rows = await db.getAll('reports');
	return rows.sort((a, b) => new Date(b.date) - new Date(a.date));
}

export async function listReportsInRange(start, end) {
	const rows = await listReports();
	return rows.filter((r) => inRange(r.date, start, end));
}

export async function saveReport(data) {
	const report = { ...data, id: data.id || uid() };
	await db.put('reports', report);
	await computeAndAwardMedals(new Date(report.date));
	return report;
}

export async function deleteReport(id) {
	return db.delete('reports', id);
}

export function sumHours(reports) {
	return reports.reduce((sum, r) => sum + (Number(r.hours) || 0), 0);
}

export function sumField(reports, field) {
	return reports.reduce((sum, r) => sum + (Number(r[field]) || 0), 0);
}

// ---------- Medals ----------

export async function listMedals() {
	const rows = await db.getAll('medals');
	return rows.sort((a, b) => new Date(b.date) - new Date(a.date));
}

async function hasMedal(type, periodStartISO) {
	const medals = await listMedals();
	return medals.some((m) => m.type === type && m.date === periodStartISO);
}

async function awardMedal(type, periodStartISO, hours) {
	await db.put('medals', {
		id: uid(),
		type,
		date: periodStartISO,
		hours,
		serviceName: ''
	});
}

export async function computeAndAwardMedals(referenceDate) {
	const monthlyGoal = await totalMonthlyGoal();
	if (monthlyGoal <= 0) return [];

	const awarded = [];
	const weekday = referenceDate.getDay();

	const dayStart = toISODate(referenceDate);
	const dayGoal = await dayGoalForWeekday(weekday);
	const dayReports = await listReportsInRange(
		new Date(referenceDate.getFullYear(), referenceDate.getMonth(), referenceDate.getDate()),
		new Date(referenceDate.getFullYear(), referenceDate.getMonth(), referenceDate.getDate(), 23, 59, 59, 999)
	);
	if (dayGoal > 0 && sumHours(dayReports) >= dayGoal && !(await hasMedal('day', dayStart))) {
		await awardMedal('day', dayStart, sumHours(dayReports));
		awarded.push('day');
	}

	const weekStart = toISODate(startOfWeek(referenceDate));
	const weekGoal = monthlyGoal * (7 / 30);
	const weekReports = await listReportsInRange(startOfWeek(referenceDate), endOfWeek(referenceDate));
	if (sumHours(weekReports) >= weekGoal && !(await hasMedal('week', weekStart))) {
		await awardMedal('week', weekStart, sumHours(weekReports));
		awarded.push('week');
	}

	const monthStart = toISODate(startOfMonth(referenceDate));
	const monthReports = await listReportsInRange(startOfMonth(referenceDate), endOfMonth(referenceDate));
	if (sumHours(monthReports) >= monthlyGoal && !(await hasMedal('month', monthStart))) {
		await awardMedal('month', monthStart, sumHours(monthReports));
		awarded.push('month');
	}

	const yearStart = toISODate(startOfYear(referenceDate));
	const yearGoal = monthlyGoal * 12;
	const yearReports = await listReportsInRange(startOfYear(referenceDate), endOfYear(referenceDate));
	if (sumHours(yearReports) >= yearGoal && !(await hasMedal('year', yearStart))) {
		await awardMedal('year', yearStart, sumHours(yearReports));
		awarded.push('year');
	}

	return awarded;
}

// ---------- Backup ----------

export async function exportBackup() {
	return db.exportAll();
}

export async function importBackup(json) {
	return db.importAll(json);
}
