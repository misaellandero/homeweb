import * as store from './store.js';
import { DICT } from './i18n-strings.js';

const FILE_EXTENSION = 'revisits';
const SWIFT_REFERENCE_OFFSET = 978307200; // seconds between the Unix epoch and 2001-01-01T00:00:00Z

function toSwiftDate(isoDateOnly) {
	if (!isoDateOnly) return null;
	const date = new Date(`${isoDateOnly.slice(0, 10)}T00:00:00`);
	if (Number.isNaN(date.getTime())) return null;
	return Math.round(date.getTime() / 1000) - SWIFT_REFERENCE_OFFSET;
}

function personTypeToNative(personType) {
	if (personType == null) return null;
	return DICT.es.personTypes[personType] ?? null;
}

function visitTypeToNative(visitType) {
	return visitType === 'Estudio' ? '0' : '1';
}

function sanitizeFileName(name) {
	const cleaned = name.replace(/[^A-Za-z0-9-_]+/g, '-').replace(/^-+|-+$/g, '');
	return cleaned || 'Revisita';
}

function visitPayload(visit) {
	return {
		id: visit.nativeId || crypto.randomUUID(),
		date: toSwiftDate(visit.date),
		nextVisit: toSwiftDate(visit.nextVisit),
		nextVisitNotes: visit.nextVisitNotes || null,
		parner: visit.parner || null,
		visitSumaryNotes: visit.visitSumaryNotes || null,
		toolboxPub: visit.toolboxPub ?? '0',
		toolboxReference: visit.toolboxReference || null,
		nextVisitToolboxPub: visit.nextVisitToolboxPub ?? '0',
		nextVisitToolBoxReference: visit.nextVisitToolBoxReference || null,
		studie: !!visit.studie,
		noCount: !!visit.noCount
	};
}

export async function buildRevisitSharePayload(revisitId) {
	const revisit = await store.getRevisit(revisitId);
	if (!revisit) return null;
	const visits = await store.listVisitsForRevisit(revisitId);

	let territoryName = null;
	if (revisit.territoryId) {
		const territories = await store.listTerritories();
		territoryName = territories.find((t) => t.id === revisit.territoryId)?.name || null;
	}

	const hasLocation = revisit.mapLat != null && revisit.mapLng != null;

	return {
		version: 1,
		id: crypto.randomUUID(),
		name: revisit.name || null,
		lastName: revisit.lastName || null,
		emoji: revisit.emoji || null,
		houseDetails: revisit.houseDetails || null,
		observations: revisit.observations || null,
		type: personTypeToNative(revisit.personType),
		mapCorLog: hasLocation ? String(revisit.mapLng) : null,
		mapCorLat: hasLocation ? String(revisit.mapLat) : null,
		visitType: visitTypeToNative(revisit.visitType),
		phone: revisit.phone || null,
		mapMarket: hasLocation,
		notification: !!revisit.notification,
		houseIcon: revisit.houseIcon || 1,
		weekReminder: !!revisit.weekReminder,
		lastVisit: toSwiftDate(revisit.lastVisit),
		nextVisit: toSwiftDate(revisit.nextVisit),
		territoryName,
		visits: visits.map(visitPayload)
	};
}

export async function exportRevisitToIOS(revisitId) {
	const payload = await buildRevisitSharePayload(revisitId);
	if (!payload) return;

	const fileName = `${sanitizeFileName(`${payload.name || ''}-${payload.lastName || ''}`)}.${FILE_EXTENSION}`;
	const blob = new Blob([JSON.stringify(payload)], { type: 'application/octet-stream' });
	const url = URL.createObjectURL(blob);
	const a = document.createElement('a');
	a.href = url;
	a.download = fileName;
	a.click();
	URL.revokeObjectURL(url);
}
