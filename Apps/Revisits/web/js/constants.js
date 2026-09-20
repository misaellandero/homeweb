export const PEOPLE_EMOJI = [
	'👴', '👵', '👨', '👩', '🧑', '👱‍♀️',
	'👦', '👧', '🙎‍♀️', '👩‍👧‍👦', '🤰', '👨‍👧‍👦',
	'🧑', '🧑'
];

export const VISIT_TYPES = ['Estudio', 'Revisita'];

export const SOURCES_EMOJI = ['📖', '📱', '📚'];

export const MEDAL_IMAGES = {
	day: 'assets/art/medals/medal_day.png',
	week: 'assets/art/medals/medal_week.png',
	month: 'assets/art/medals/medal_month.png',
	year: 'assets/art/medals/medal_year.png'
};

export function houseImage(visitType, houseIcon) {
	const n = Math.min(Math.max(Number(houseIcon) || 1, 1), 6);
	const kind = visitType === 'Estudio' ? 'estudio' : 'revisita';
	return `assets/art/houses/casa_${kind}_${n}.png`;
}

export function randomHouseIcon() {
	return 1 + Math.floor(Math.random() * 6);
}
