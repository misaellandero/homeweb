import * as store from './store.js';
import { DICT } from './i18n-strings.js';
import { PEOPLE_EMOJI, randomHouseIcon } from './constants.js';

const SWIFT_REFERENCE_OFFSET = 978307200; // seconds between the Unix epoch and 2001-01-01T00:00:00Z

function fromSwiftDate(swiftSeconds) {
	if (swiftSeconds == null) return null;
	const date = new Date((swiftSeconds + SWIFT_REFERENCE_OFFSET) * 1000);
	if (Number.isNaN(date.getTime())) return null;
	const offset = date.getTimezoneOffset();
	const local = new Date(date.getTime() - offset * 60000);
	return local.toISOString().slice(0, 10);
}

function personTypeFromNative(type) {
	if (!type) return null;
	const index = DICT.es.personTypes.indexOf(type);
	return index === -1 ? null : index;
}

function visitTypeFromNative(visitType) {
	return visitType === '0' ? 'Estudio' : 'Revisita';
}

async function resolveTerritoryId(territoryName) {
	if (!territoryName) return null;
	const territories = await store.listTerritories();
	const existing = territories.find((t) => t.name === territoryName);
	if (existing) return existing.id;
	const created = await store.saveTerritory(territoryName);
	return created.id;
}

function isRevisitSharePayload(payload) {
	return payload && typeof payload === 'object' && Array.isArray(payload.visits) && ('visitType' in payload);
}

export async function importRevisitFromFile(file) {
	const text = await file.text();
	const payload = JSON.parse(text);
	if (!isRevisitSharePayload(payload)) {
		throw new Error('invalid .revisits file');
	}

	const personType = personTypeFromNative(payload.type);
	const territoryId = await resolveTerritoryId(payload.territoryName);
	const hasLocation = payload.mapMarket && payload.mapCorLat != null && payload.mapCorLog != null;

	const revisit = await store.saveRevisit({
		personType,
		emoji: payload.emoji || (personType != null ? PEOPLE_EMOJI[personType] : ''),
		name: payload.name || '',
		lastName: payload.lastName || '',
		visitType: visitTypeFromNative(payload.visitType),
		territoryId,
		observations: payload.observations || '',
		phone: payload.phone || '',
		houseDetails: payload.houseDetails || '',
		nextVisit: fromSwiftDate(payload.nextVisit),
		lastVisit: fromSwiftDate(payload.lastVisit),
		notification: !!payload.notification,
		weekReminder: !!payload.weekReminder,
		houseIcon: payload.houseIcon || randomHouseIcon(),
		mapLat: hasLocation ? Number(payload.mapCorLat) : null,
		mapLng: hasLocation ? Number(payload.mapCorLog) : null
	});

	for (const v of payload.visits) {
		await store.saveVisit({
			revisitId: revisit.id,
			date: fromSwiftDate(v.date),
			visitSumaryNotes: v.visitSumaryNotes || '',
			toolboxPub: v.toolboxPub ?? '0',
			toolboxReference: v.toolboxReference || '',
			parner: v.parner || '',
			nextVisit: fromSwiftDate(v.nextVisit),
			nextVisitNotes: v.nextVisitNotes || '',
			nextVisitToolboxPub: v.nextVisitToolboxPub ?? '0',
			nextVisitToolBoxReference: v.nextVisitToolBoxReference || '',
			noCount: !!v.noCount,
			studie: !!v.studie
		});
	}

	return revisit;
}
