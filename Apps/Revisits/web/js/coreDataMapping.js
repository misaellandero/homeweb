// Pure field/value conversions between the web app's IndexedDB record shape
// and the native app's Core Data SQLite row shape. No browser globals here
// (besides crypto.randomUUID, available in both browsers and Node) so this
// module can be exercised directly in tests.
import { DICT } from './i18n-strings.js';

export const ENTITIES = ['DayGoal', 'Medals', 'Reports', 'Revisit', 'Service', 'Territory', 'Visit'];

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export function uuidToBytes(uuidStr) {
	const hex = uuidStr.replace(/-/g, '');
	const bytes = new Uint8Array(16);
	for (let i = 0; i < 16; i++) bytes[i] = parseInt(hex.substr(i * 2, 2), 16);
	return bytes;
}

export function bytesToUuid(bytes) {
	const hex = Array.from(bytes, (b) => b.toString(16).padStart(2, '0')).join('');
	return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
}

export function idToBytes(id) {
	return uuidToBytes(UUID_RE.test(id || '') ? id : crypto.randomUUID());
}

export function idFromBlob(bytes) {
	return bytes ? bytesToUuid(bytes) : crypto.randomUUID();
}

export function personTypeToNative(personType) {
	if (personType == null) return null;
	return DICT.es.personTypes[personType] ?? null;
}

export function personTypeFromNative(type) {
	if (!type) return null;
	const index = DICT.es.personTypes.indexOf(type);
	return index === -1 ? null : index;
}

export function visitTypeToNative(visitType) {
	return visitType === 'Estudio' ? '0' : '1';
}

export function visitTypeFromNative(visitType) {
	return visitType === '0' ? 'Estudio' : 'Revisita';
}

export function boolToInt(v) {
	return v ? 1 : 0;
}
