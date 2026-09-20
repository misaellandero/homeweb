import * as store from '../store.js';
import { t, visitTypeLabel } from '../i18n.js';
import { escapeHTML } from '../utils.js';
import { openDetail, openNewRevisitForm } from './revisits.js';

let map = null;
let markersLayer = null;

export async function render(container) {
	if (typeof L === 'undefined') {
		container.innerHTML = `<div class="empty-state">${t('mapUnavailable')}</div>`;
		return;
	}

	const revisits = await store.listRevisits();
	const located = revisits.filter((r) => r.mapLat != null && r.mapLng != null);

	if (!container.querySelector('#territoriosMap')) {
		container.innerHTML = `
			<div id="territoriosMap" class="territorios-map"></div>
			<div id="territoriosEmpty" class="empty-state" style="display:none;"></div>
		`;
	}

	const emptyEl = container.querySelector('#territoriosEmpty');
	const mapEl = container.querySelector('#territoriosMap');

	if (!located.length) {
		mapEl.style.display = 'none';
		emptyEl.style.display = 'flex';
		emptyEl.innerHTML = `
			<p>${escapeHTML(t('emptyTerritorios'))}</p>
			<button class="btn btn-primary" id="emptyTerritoriosAddBtn"><i class="fas fa-plus"></i> ${t('btnAddFirstRevisit')}</button>
		`;
		emptyEl.querySelector('#emptyTerritoriosAddBtn').addEventListener('click', () => {
			document.querySelector('#app-tabbar button[data-tab="revisitas"]')?.click();
			openNewRevisitForm();
		});
		return;
	}

	mapEl.style.display = 'block';
	emptyEl.style.display = 'none';

	if (!map) {
		map = L.map(mapEl, { zoomControl: true });
		L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
			attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
			maxZoom: 19
		}).addTo(map);
		markersLayer = L.layerGroup().addTo(map);
	}

	markersLayer.clearLayers();

	const bounds = [];
	for (const revisit of located) {
		const color = revisit.visitType === 'Estudio' ? '#28a745' : '#235ee7';
		const marker = L.circleMarker([revisit.mapLat, revisit.mapLng], {
			radius: 10,
			color: '#fff',
			weight: 2,
			fillColor: color,
			fillOpacity: 0.95
		});
		const name = `${revisit.emoji || ''} ${escapeHTML(revisit.name || '')} ${escapeHTML(revisit.lastName || '')}`.trim();
		marker.bindPopup(`
			<strong>${name}</strong><br>
			<span style="color:${color};">${escapeHTML(visitTypeLabel(revisit.visitType))}</span><br>
			<a href="#" data-open-revisit="${revisit.id}">${escapeHTML(t('mapPopupOpen'))}</a>
		`);
		marker.on('popupopen', () => {
			const link = document.querySelector(`a[data-open-revisit="${revisit.id}"]`);
			link?.addEventListener('click', (e) => {
				e.preventDefault();
				openDetail(revisit.id);
			});
		});
		markersLayer.addLayer(marker);
		bounds.push([revisit.mapLat, revisit.mapLng]);
	}

	requestAnimationFrame(() => {
		map.invalidateSize();
		if (bounds.length === 1) {
			map.setView(bounds[0], 15);
		} else {
			map.fitBounds(bounds, { padding: [30, 30] });
		}
	});
}
