const PREFIX = 'revisits.';

function getJSON(key, fallback) {
	try {
		const raw = localStorage.getItem(PREFIX + key);
		return raw === null ? fallback : JSON.parse(raw);
	} catch {
		return fallback;
	}
}

function setJSON(key, value) {
	try {
		localStorage.setItem(PREFIX + key, JSON.stringify(value));
	} catch {
		/* storage unavailable (private mode, quota) - fail silently */
	}
}

export const settings = {
	get countPubs() { return getJSON('countPubs', false); },
	set countPubs(v) { setJSON('countPubs', !!v); },

	get countVideos() { return getJSON('countVideos', false); },
	set countVideos(v) { setJSON('countVideos', !!v); },

	get countReturnVisits() { return getJSON('countReturnVisits', true); },
	set countReturnVisits(v) { setJSON('countReturnVisits', !!v); },

	get yearPeriodKind() { return getJSON('yearPeriodKind', 'calendario'); },
	set yearPeriodKind(v) { setJSON('yearPeriodKind', v); },

	get notificationsEnabled() { return getJSON('notificationsEnabled', false); },
	set notificationsEnabled(v) { setJSON('notificationsEnabled', !!v); },

	get language() { return getJSON('language', null); },
	set language(v) { setJSON('language', v); },

	get fontScale() { return getJSON('fontScale', 1); },
	set fontScale(v) { setJSON('fontScale', v); }
};

export function applyFontScale() {
	document.documentElement.style.setProperty('--app-scale', settings.fontScale);
}

export function getTimerState() {
	return getJSON('timerState', null);
}

export function setTimerState(state) {
	setJSON('timerState', state);
}

export function clearTimerState() {
	try {
		localStorage.removeItem(PREFIX + 'timerState');
	} catch {
		/* ignore */
	}
}

export function getPendingCounters() {
	return getJSON('pendingCounters', { studies: 0, pubs: 0, videos: 0, returnVisits: 0 });
}

export function setPendingCounters(counters) {
	setJSON('pendingCounters', counters);
}

export function clearPendingCounters() {
	try {
		localStorage.removeItem(PREFIX + 'pendingCounters');
	} catch {
		/* ignore */
	}
}
