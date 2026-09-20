export const PEOPLE_TYPES = [
	'Ancianito', 'Ancianita', 'Señor', 'Señora', 'Joven', 'Adulto',
	'Señorita', 'Niño', 'Niña', 'Mujer', 'Madre', 'Madre joven',
	'Padre', 'Padre joven'
];

export const PEOPLE_EMOJI = [
	'👴', '👵', '👨', '👩', '🧑', '👱‍♀️',
	'👦', '👧', '🙎‍♀️', '👩‍👧‍👦', '🤰', '👨‍👧‍👦',
	'🧑', '🧑'
];

export const VISIT_TYPES = ['Estudio', 'Revisita'];

export const SOURCES = ['Biblia', 'Video', 'Publicación'];
export const SOURCES_EMOJI = ['📖', '📱', '📚'];
export const SOURCES_TEXT = ['Versículo', 'Nombre', 'Capítulo y párrafo'];

export const WEEKDAY_NAMES = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
export const WEEKDAY_SHORT = ['D', 'L', 'M', 'M', 'J', 'V', 'S'];

export const MEDAL_TYPES = {
	day: { label: 'Metas del día', image: 'assets/art/medals/medal_day.png' },
	week: { label: 'Metas de la semana', image: 'assets/art/medals/medal_week.png' },
	month: { label: 'Metas del mes', image: 'assets/art/medals/medal_month.png' },
	year: { label: 'Metas del año', image: 'assets/art/medals/medal_year.png' }
};

export function houseImage(visitType, houseIcon) {
	const n = Math.min(Math.max(Number(houseIcon) || 1, 1), 6);
	const kind = visitType === 'Estudio' ? 'estudio' : 'revisita';
	return `assets/art/houses/casa_${kind}_${n}.png`;
}

export function randomHouseIcon() {
	return 1 + Math.floor(Math.random() * 6);
}
