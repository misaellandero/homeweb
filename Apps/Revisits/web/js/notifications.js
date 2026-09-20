import { settings } from './settings.js';

export async function requestNotificationPermission() {
	if (!('Notification' in window)) return false;
	if (Notification.permission === 'granted') {
		settings.notificationsEnabled = true;
		return true;
	}
	const result = await Notification.requestPermission();
	const granted = result === 'granted';
	settings.notificationsEnabled = granted;
	return granted;
}

export function notify(title, body) {
	if (!('Notification' in window)) return;
	if (Notification.permission !== 'granted') return;
	try {
		new Notification(title, { body, icon: 'icons/icon-192.png' });
	} catch {
		/* some browsers require this via a service worker registration instead */
		navigator.serviceWorker?.getRegistration().then((reg) => {
			reg?.showNotification(title, { body, icon: 'icons/icon-192.png' });
		});
	}
}

export function checkDueReminders(revisits) {
	if (Notification.permission !== 'granted') return;
	const todayISO = new Date().toISOString().slice(0, 10);
	const due = revisits.filter((r) => r.notification && r.nextVisit && r.nextVisit.slice(0, 10) <= todayISO);
	if (due.length === 0) return;
	if (due.length === 1) {
		notify('Recordatorio de revisita', `${due[0].name || 'Revisita'} ${due[0].lastName || ''} — hoy toca visitar.`.trim());
	} else {
		notify('Recordatorios de revisitas', `Tienes ${due.length} revisitas programadas para hoy o antes.`);
	}
}

let goalTimeoutId = null;

export function scheduleTimerGoalNotification(afterSeconds) {
	clearTimerGoalNotification();
	if (!afterSeconds || afterSeconds <= 0) return;
	goalTimeoutId = setTimeout(() => {
		notify('Meta de tiempo alcanzado', 'Has cubierto el tiempo programado ⌛️');
	}, afterSeconds * 1000);
}

export function clearTimerGoalNotification() {
	if (goalTimeoutId) {
		clearTimeout(goalTimeoutId);
		goalTimeoutId = null;
	}
}
