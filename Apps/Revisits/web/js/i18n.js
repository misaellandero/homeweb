import { DICT } from './i18n-strings.js';

export const LANGUAGES = [
	{ code: 'es', name: 'Español', locale: 'es-MX' },
	{ code: 'en', name: 'English', locale: 'en-US' },
	{ code: 'de', name: 'Deutsch', locale: 'de-DE' },
	{ code: 'fr', name: 'Français', locale: 'fr-FR' },
	{ code: 'it', name: 'Italiano', locale: 'it-IT' },
	{ code: 'pt', name: 'Português', locale: 'pt-PT' },
	{ code: 'nl', name: 'Nederlands', locale: 'nl-NL' },
	{ code: 'el', name: 'Ελληνικά', locale: 'el-GR' },
	{ code: 'pl', name: 'Polski', locale: 'pl-PL' },
	{ code: 'ru', name: 'Русский', locale: 'ru-RU' },
	{ code: 'tr', name: 'Türkçe', locale: 'tr-TR' },
	{ code: 'uk', name: 'Українська', locale: 'uk-UA' },
	{ code: 'vi', name: 'Tiếng Việt', locale: 'vi-VN' },
	{ code: 'th', name: 'ไทย', locale: 'th-TH' },
	{ code: 'id', name: 'Bahasa Indonesia', locale: 'id-ID' },
	{ code: 'hi', name: 'हिन्दी', locale: 'hi-IN' },
	{ code: 'ja', name: '日本語', locale: 'ja-JP' },
	{ code: 'ko', name: '한국어', locale: 'ko-KR' }
];

const LANG_CODES = LANGUAGES.map((l) => l.code);

let currentLang = 'es';
let onChangeCallback = null;

export function initLanguage(storedCode) {
	if (storedCode && LANG_CODES.includes(storedCode)) {
		currentLang = storedCode;
		return currentLang;
	}
	const nav = (navigator.language || 'es').slice(0, 2).toLowerCase();
	currentLang = LANG_CODES.includes(nav) ? nav : 'es';
	return currentLang;
}

export function getLanguage() {
	return currentLang;
}

export function getLocale() {
	return LANGUAGES.find((l) => l.code === currentLang)?.locale || 'es-MX';
}

export function onLanguageChange(callback) {
	onChangeCallback = callback;
}

export function setLanguage(code) {
	if (!LANG_CODES.includes(code)) return;
	currentLang = code;
	if (onChangeCallback) onChangeCallback(code);
}

export function t(key, vars) {
	const table = DICT[currentLang] || DICT.es;
	let str = table.strings[key] ?? DICT.es.strings[key] ?? key;
	if (vars) {
		for (const [k, v] of Object.entries(vars)) {
			str = str.replaceAll(`{{${k}}}`, v);
		}
	}
	return str;
}

export function personTypeLabel(i) {
	const table = DICT[currentLang] || DICT.es;
	return table.personTypes[i] ?? DICT.es.personTypes[i] ?? '';
}

export function sourceLabel(i) {
	const table = DICT[currentLang] || DICT.es;
	return table.sources[i] ?? DICT.es.sources[i] ?? '';
}

export function sourceRefLabel(i) {
	const table = DICT[currentLang] || DICT.es;
	return table.sourceRefs[i] ?? DICT.es.sourceRefs[i] ?? '';
}

export function weekdayName(i) {
	const table = DICT[currentLang] || DICT.es;
	return table.weekdays[i] ?? DICT.es.weekdays[i] ?? '';
}

export function weekdayShortName(i) {
	const table = DICT[currentLang] || DICT.es;
	return table.weekdaysShort[i] ?? DICT.es.weekdaysShort[i] ?? '';
}

export function medalLabel(type) {
	const table = DICT[currentLang] || DICT.es;
	return table.medals[type] ?? DICT.es.medals[type] ?? type;
}

export function visitTypeLabel(type) {
	return type === 'Estudio' ? t('wordEstudio') : t('wordRevisita');
}
