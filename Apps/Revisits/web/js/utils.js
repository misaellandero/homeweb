export function uid() {
	if (crypto.randomUUID) return crypto.randomUUID();
	return 'id-' + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2);
}

export function todayISO() {
	return toISODate(new Date());
}

export function toISODate(date) {
	const d = new Date(date);
	const offset = d.getTimezoneOffset();
	const local = new Date(d.getTime() - offset * 60000);
	return local.toISOString().slice(0, 10);
}

export function startOfWeek(date) {
	const d = new Date(date);
	const day = d.getDay();
	d.setDate(d.getDate() - day);
	d.setHours(0, 0, 0, 0);
	return d;
}

export function endOfWeek(date) {
	const start = startOfWeek(date);
	const end = new Date(start);
	end.setDate(end.getDate() + 6);
	end.setHours(23, 59, 59, 999);
	return end;
}

export function startOfMonth(date) {
	const d = new Date(date);
	return new Date(d.getFullYear(), d.getMonth(), 1);
}

export function endOfMonth(date) {
	const d = new Date(date);
	return new Date(d.getFullYear(), d.getMonth() + 1, 0, 23, 59, 59, 999);
}

export function startOfYear(date) {
	const d = new Date(date);
	return new Date(d.getFullYear(), 0, 1);
}

export function endOfYear(date) {
	const d = new Date(date);
	return new Date(d.getFullYear(), 11, 31, 23, 59, 59, 999);
}

export function inRange(isoDate, start, end) {
	const t = new Date(isoDate).getTime();
	return t >= start.getTime() && t <= end.getTime();
}

export function formatHours(hours) {
	const h = Number(hours) || 0;
	const wholeHours = Math.floor(h);
	const minutes = Math.round((h - wholeHours) * 60);
	if (minutes === 0) return `${wholeHours}h`;
	return `${wholeHours}h ${minutes}min`;
}

export function formatDateLong(isoDate, locale = 'es-MX') {
	const d = new Date(isoDate + (isoDate.length === 10 ? 'T00:00:00' : ''));
	return d.toLocaleDateString(locale, { day: 'numeric', month: 'long', year: 'numeric' });
}

export function formatDateShort(isoDate, locale = 'es-MX') {
	const d = new Date(isoDate + (isoDate.length === 10 ? 'T00:00:00' : ''));
	return d.toLocaleDateString(locale, { day: 'numeric', month: 'short' });
}

export function monthLabel(year, month, locale = 'es-MX') {
	const d = new Date(year, month, 1);
	const label = d.toLocaleDateString(locale, { month: 'long', year: 'numeric' });
	return label.charAt(0).toUpperCase() + label.slice(1);
}

export function daysInMonth(year, month) {
	return new Date(year, month + 1, 0).getDate();
}

export function escapeHTML(str) {
	if (str == null) return '';
	return String(str)
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&#39;');
}
