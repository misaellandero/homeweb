import * as store from '../store.js';
import { openModal, closeModal, showToast } from '../ui.js';
import { escapeHTML, formatDateLong, todayISO } from '../utils.js';
import { PEOPLE_EMOJI, VISIT_TYPES, SOURCES_EMOJI, houseImage, randomHouseIcon } from '../constants.js';
import { checkDueReminders } from '../notifications.js';
import { t, personTypeLabel, sourceLabel, sourceRefLabel, visitTypeLabel } from '../i18n.js';
import * as geo from '../geo.js';

let currentFilter = 'todos';
let currentSearch = '';

export async function render(container) {
	const revisits = await store.listRevisits();
	checkDueReminders(revisits);

	const filtered = revisits.filter((r) => matchesFilter(r) && matchesSearch(r));

	container.innerHTML = `
		<div class="card">
			<div class="row wrap" style="margin-bottom:10px;">
				<input type="search" id="revisitSearch" placeholder="${escapeHTML(t('searchPlaceholder'))}" style="flex:1; min-width:160px; border:1px solid var(--border); border-radius:10px; padding:8px 12px;" value="${escapeHTML(currentSearch)}">
			</div>
			<div class="segmented" id="revisitFilters">
				<button data-filter="todos" class="${currentFilter === 'todos' ? 'active' : ''}">${t('filterAll')}</button>
				<button data-filter="estudio" class="${currentFilter === 'estudio' ? 'active' : ''}">${t('filterEstudio')}</button>
				<button data-filter="revisita" class="${currentFilter === 'revisita' ? 'active' : ''}">${t('filterRevisita')}</button>
				<button data-filter="vencidas" class="${currentFilter === 'vencidas' ? 'active' : ''}">${t('filterOverdue')}</button>
			</div>
		</div>
		<div class="card" id="revisitListCard">
			${filtered.length ? `<div id="revisitList"></div>` : `<div class="empty-state"><i class="fas fa-door-open" style="font-size:32px; opacity:.4;"></i><p>${escapeHTML(t('emptyRevisitsTitle'))}<br>${escapeHTML(t('emptyRevisitsHint'))}</p></div>`}
		</div>
	`;

	const listEl = container.querySelector('#revisitList');
	if (listEl) {
		for (const revisit of filtered) {
			listEl.append(renderListItem(revisit));
		}
	}

	container.querySelector('#revisitSearch').addEventListener('input', (e) => {
		currentSearch = e.target.value;
		render(container);
	});

	container.querySelectorAll('#revisitFilters button').forEach((btn) => {
		btn.addEventListener('click', () => {
			currentFilter = btn.dataset.filter;
			render(container);
		});
	});
}

function matchesFilter(revisit) {
	if (currentFilter === 'todos') return true;
	if (currentFilter === 'estudio') return revisit.visitType === 'Estudio';
	if (currentFilter === 'revisita') return revisit.visitType === 'Revisita';
	if (currentFilter === 'vencidas') return isOverdue(revisit);
	return true;
}

function matchesSearch(revisit) {
	if (!currentSearch.trim()) return true;
	const q = currentSearch.trim().toLowerCase();
	return `${revisit.name || ''} ${revisit.lastName || ''}`.toLowerCase().includes(q);
}

function isOverdue(revisit) {
	return revisit.nextVisit && revisit.nextVisit.slice(0, 10) < todayISO();
}

function isUpcoming(revisit) {
	return revisit.nextVisit && revisit.nextVisit.slice(0, 10) === todayISO();
}

function renderListItem(revisit) {
	const el = document.createElement('div');
	el.className = 'list-item';
	const overdue = isOverdue(revisit);
	const upcoming = isUpcoming(revisit);

	el.innerHTML = `
		<img src="${houseImage(revisit.visitType, revisit.houseIcon)}" class="avatar" style="background:none; object-fit:contain;" alt="">
		<div class="meta">
			<div class="name">${escapeHTML(revisit.emoji || '')} ${escapeHTML(revisit.name || '')} ${escapeHTML(revisit.lastName || '')}</div>
			<div class="sub">${escapeHTML(visitTypeLabel(revisit.visitType))}${revisit.nextVisit ? ' · ' + escapeHTML(t('nextVisitPrefix')) + ' ' + formatDateLong(revisit.nextVisit) : ''}</div>
		</div>
		${overdue ? `<span class="badge overdue">${escapeHTML(t('badgeOverdue'))}</span>` : upcoming ? `<span class="badge upcoming">${escapeHTML(t('badgeToday'))}</span>` : ''}
	`;
	el.addEventListener('click', () => openDetail(revisit.id));
	return el;
}

// ---------- Add / edit form ----------

export function openNewRevisitForm() {
	openForm(null);
}

async function openForm(revisit) {
	const isNew = !revisit;
	const territories = await store.listTerritories();

	const sheet = openModal(isNew ? t('newRevisitTitle') : t('editRevisitTitle'), `
		<form id="revisitForm">
			<div class="field">
				<label>${t('labelPersonType')}</label>
				<select name="personType">
					<option value="">${t('optionUnspecified')}</option>
					${Array.from({ length: 14 }, (_, i) => `<option value="${i}" ${revisit?.personType === i ? 'selected' : ''}>${PEOPLE_EMOJI[i]} ${escapeHTML(personTypeLabel(i))}</option>`).join('')}
				</select>
			</div>
			<div class="row">
				<div class="field" style="flex:1;">
					<label>${t('labelFirstName')}</label>
					<input name="name" required value="${escapeHTML(revisit?.name || '')}">
				</div>
				<div class="field" style="flex:1;">
					<label>${t('labelLastName')}</label>
					<input name="lastName" value="${escapeHTML(revisit?.lastName || '')}">
				</div>
			</div>
			<div class="field">
				<label>${t('labelRevisitTypeField')}</label>
				<div class="segmented" id="visitTypeSeg">
					${VISIT_TYPES.map((v) => `<button type="button" data-value="${v}" class="${(revisit?.visitType || 'Revisita') === v ? 'active' : ''}">${escapeHTML(visitTypeLabel(v))}</button>`).join('')}
				</div>
			</div>
			<div class="field">
				<label>${t('labelTerritory')}</label>
				<select name="territoryId">
					<option value="">${t('optionNoTerritory')}</option>
					${territories.map((terr) => `<option value="${terr.id}" ${revisit?.territoryId === terr.id ? 'selected' : ''}>${escapeHTML(terr.name)}</option>`).join('')}
					<option value="__new__">${t('optionNewTerritory')}</option>
				</select>
			</div>
			<div class="field">
				<label>${t('labelObservations')}</label>
				<input name="observations" value="${escapeHTML(revisit?.observations || '')}">
			</div>
			<div class="field">
				<label>${t('labelPhone')}</label>
				<input name="phone" type="tel" value="${escapeHTML(revisit?.phone || '')}">
			</div>
			<div class="field">
				<label>${t('labelHouseDetails')}</label>
				<input name="houseDetails" value="${escapeHTML(revisit?.houseDetails || '')}">
			</div>
			<div class="field">
				<label>${t('labelNextVisit')}</label>
				<input name="nextVisit" type="date" value="${revisit?.nextVisit ? revisit.nextVisit.slice(0, 10) : ''}">
			</div>
			${locationFieldsHTML(revisit)}
			<h2 style="font-size:14px; margin-top:16px;">${t('headingReminders')}</h2>
			<label class="row" style="gap:8px; font-size:14px; margin-bottom:8px;">
				<input type="checkbox" name="notification" ${revisit?.notification ? 'checked' : ''}> ${t('labelNotification')}
			</label>
			<label class="row" style="gap:8px; font-size:14px; margin-bottom:8px;">
				<input type="checkbox" name="weekReminder" ${revisit?.weekReminder ? 'checked' : ''}> ${t('labelWeekReminder')}
			</label>
			${isNew ? initialVisitSectionHTML() : ''}
			<div class="row" style="margin-top:16px; gap:10px;">
				${!isNew ? `<button type="button" class="btn btn-danger" id="deleteRevisitBtn"><i class="fas fa-trash"></i></button>` : ''}
				<button type="submit" class="btn btn-primary btn-block">${isNew ? t('save') : t('update')}</button>
			</div>
		</form>
	`);

	wireVisitTypeSegmented(sheet);
	wireSourcePicker(sheet);
	wireTerritorySelect(sheet);
	wireLocationField(sheet);

	if (!isNew) {
		sheet.querySelector('#deleteRevisitBtn').addEventListener('click', async () => {
			if (!confirm(t('confirmDeleteRevisit'))) return;
			await store.deleteRevisit(revisit.id);
			closeModal();
			showToast(t('toastRevisitDeleted'));
			renderCurrentIfMounted();
		});
	}

	sheet.querySelector('#revisitForm').addEventListener('submit', async (e) => {
		e.preventDefault();
		const fd = new FormData(e.target);
		const personTypeRaw = fd.get('personType');
		const personType = personTypeRaw === '' ? null : Number(personTypeRaw);
		const lat = fd.get('mapLat');
		const lng = fd.get('mapLng');

		const data = {
			id: revisit?.id,
			personType,
			emoji: personType != null ? PEOPLE_EMOJI[personType] : (revisit?.emoji || ''),
			name: fd.get('name')?.trim(),
			lastName: fd.get('lastName')?.trim(),
			visitType: sheet.querySelector('#visitTypeSeg .active').dataset.value,
			territoryId: fd.get('territoryId') || null,
			observations: fd.get('observations')?.trim(),
			phone: fd.get('phone')?.trim(),
			houseDetails: fd.get('houseDetails')?.trim(),
			nextVisit: fd.get('nextVisit') || null,
			notification: fd.get('notification') === 'on',
			weekReminder: fd.get('weekReminder') === 'on',
			houseIcon: revisit?.houseIcon || randomHouseIcon(),
			lastVisit: revisit?.lastVisit || null,
			mapLat: lat ? Number(lat) : null,
			mapLng: lng ? Number(lng) : null
		};

		const saved = await store.saveRevisit(data);

		if (isNew && fd.get('registerInitialVisit') === 'on') {
			const visit = collectVisitFields(fd, saved.id);
			visit.studie = saved.visitType === 'Estudio';
			await store.saveVisit(visit);
			await store.saveRevisit({ ...saved, lastVisit: visit.date, nextVisit: visit.nextVisit || saved.nextVisit });
		}

		closeModal();
		showToast(isNew ? t('toastRevisitSaved') : t('toastRevisitUpdated'));
		renderCurrentIfMounted();
	});
}

function locationFieldsHTML(revisit) {
	const hasLocation = revisit?.mapLat != null && revisit?.mapLng != null;
	return `
		<div class="field">
			<label>${t('headingLocation')}</label>
			<input type="hidden" name="mapLat" value="${hasLocation ? revisit.mapLat : ''}">
			<input type="hidden" name="mapLng" value="${hasLocation ? revisit.mapLng : ''}">
			<div id="locationStatus" style="font-size:13px; color:var(--text-muted); margin-bottom:6px;">
				${hasLocation ? `${revisit.mapLat.toFixed(5)}, ${revisit.mapLng.toFixed(5)}` : ''}
			</div>
			<div class="row" style="gap:8px;">
				<button type="button" class="btn" id="useLocationBtn">
					<i class="fas fa-location-crosshairs"></i> ${hasLocation ? t('btnUpdateLocation') : t('btnUseMyLocation')}
				</button>
				${hasLocation ? `<button type="button" class="btn btn-ghost" id="removeLocationBtn"><i class="fas fa-xmark"></i></button>` : ''}
			</div>
		</div>
	`;
}

function wireLocationField(sheet) {
	const btn = sheet.querySelector('#useLocationBtn');
	if (!btn) return;
	const status = sheet.querySelector('#locationStatus');
	const latInput = sheet.querySelector('input[name="mapLat"]');
	const lngInput = sheet.querySelector('input[name="mapLng"]');

	if (!geo.isSupported()) {
		btn.disabled = true;
		status.textContent = t('locationUnsupported');
	}

	btn.addEventListener('click', async () => {
		status.textContent = t('locationFetching');
		try {
			const pos = await geo.getCurrentPosition();
			latInput.value = pos.lat;
			lngInput.value = pos.lng;
			status.textContent = `${pos.lat.toFixed(5)}, ${pos.lng.toFixed(5)}`;
			btn.innerHTML = `<i class="fas fa-location-crosshairs"></i> ${t('btnUpdateLocation')}`;
			showToast(t('locationSaved'));

			const houseDetailsInput = sheet.querySelector('input[name="houseDetails"]');
			if (houseDetailsInput && !houseDetailsInput.value.trim()) {
				const address = await geo.reverseGeocode(pos.lat, pos.lng);
				if (address) houseDetailsInput.value = address;
			}
		} catch {
			status.textContent = t('locationError');
		}
	});

	sheet.querySelector('#removeLocationBtn')?.addEventListener('click', () => {
		latInput.value = '';
		lngInput.value = '';
		status.textContent = '';
	});
}

function initialVisitSectionHTML() {
	return `
		<label class="row" style="gap:8px; font-size:14px; margin:16px 0 8px;">
			<input type="checkbox" name="registerInitialVisit" id="registerInitialVisit"> ${t('labelRegisterInitialVisit')}
		</label>
		<div id="initialVisitFields" style="display:none;">
			${visitFieldsHTML({})}
		</div>
	`;
}

function visitFieldsHTML(opts = {}) {
	const v = opts.visit || {};
	return `
		<div class="field">
			<label>${t('labelVisitDate')}</label>
			<input type="date" name="visitDate" value="${v.date ? v.date.slice(0, 10) : todayISO()}">
		</div>
		<div class="field">
			<label>${t('labelVisitSummary')}</label>
			<input name="visitSumaryNotes" value="${escapeHTML(v.visitSumaryNotes || '')}">
		</div>
		<div class="field">
			<label>${t('labelPublication')}</label>
			<div class="segmented source-seg" data-target="toolboxPub">
				${[0, 1, 2].map((i) => `<button type="button" data-value="${i}" class="${String(v.toolboxPub ?? '0') === String(i) ? 'active' : ''}">${SOURCES_EMOJI[i]} ${escapeHTML(sourceLabel(i))}</button>`).join('')}
			</div>
		</div>
		<div class="field">
			<label class="source-ref-label">${escapeHTML(sourceRefLabel(Number(v.toolboxPub) || 0))}</label>
			<input name="toolboxReference" class="source-ref-input" value="${escapeHTML(v.toolboxReference || '')}">
		</div>
		<div class="field">
			<label>${t('labelCompanion')}</label>
			<input name="parner" value="${escapeHTML(v.parner || '')}">
		</div>
		<div class="field">
			<label>${t('labelNextVisit')}</label>
			<input type="date" name="nextVisit" value="${v.nextVisit ? v.nextVisit.slice(0, 10) : ''}">
		</div>
		<div class="field">
			<label>${t('labelNextVisitTopic')}</label>
			<input name="nextVisitNotes" value="${escapeHTML(v.nextVisitNotes || '')}">
		</div>
		<div class="field">
			<label>${t('labelPublicationNext')}</label>
			<div class="segmented source-seg" data-target="nextVisitToolboxPub">
				${[0, 1, 2].map((i) => `<button type="button" data-value="${i}" class="${String(v.nextVisitToolboxPub ?? '0') === String(i) ? 'active' : ''}">${SOURCES_EMOJI[i]} ${escapeHTML(sourceLabel(i))}</button>`).join('')}
			</div>
		</div>
		<div class="field">
			<label class="source-ref-label" data-for="nextVisitToolboxPub">${escapeHTML(sourceRefLabel(Number(v.nextVisitToolboxPub) || 0))}</label>
			<input name="nextVisitToolBoxReference" class="source-ref-input" data-for="nextVisitToolboxPub" value="${escapeHTML(v.nextVisitToolBoxReference || '')}">
		</div>
		<label class="row" style="gap:8px; font-size:14px; margin-bottom:8px;">
			<input type="checkbox" name="countVisit" ${v.noCount ? '' : 'checked'}> ${t('labelCountVisit')}
		</label>
	`;
}

function wireVisitTypeSegmented(sheet) {
	const seg = sheet.querySelector('#visitTypeSeg');
	if (!seg) return;
	seg.querySelectorAll('button').forEach((btn) => {
		btn.addEventListener('click', () => {
			seg.querySelectorAll('button').forEach((b) => b.classList.remove('active'));
			btn.classList.add('active');
		});
	});

	const checkbox = sheet.querySelector('#registerInitialVisit');
	if (checkbox) {
		checkbox.addEventListener('change', () => {
			sheet.querySelector('#initialVisitFields').style.display = checkbox.checked ? 'block' : 'none';
		});
	}
}

function wireSourcePicker(sheet) {
	sheet.querySelectorAll('.source-seg').forEach((seg) => {
		const target = seg.dataset.target;
		seg.querySelectorAll('button').forEach((btn) => {
			btn.addEventListener('click', () => {
				seg.querySelectorAll('button').forEach((b) => b.classList.remove('active'));
				btn.classList.add('active');
				const idx = Number(btn.dataset.value);
				const labelEl = target === 'toolboxPub'
					? sheet.querySelector('.source-ref-label:not([data-for])')
					: sheet.querySelector(`.source-ref-label[data-for="${target}"]`);
				if (labelEl) labelEl.textContent = sourceRefLabel(idx);
			});
		});
	});
}

function wireTerritorySelect(sheet) {
	const select = sheet.querySelector('select[name="territoryId"]');
	if (!select) return;
	select.addEventListener('change', async () => {
		if (select.value !== '__new__') return;
		const name = prompt(t('promptNewTerritory'));
		if (!name || !name.trim()) {
			select.value = '';
			return;
		}
		const territory = await store.saveTerritory(name.trim());
		const option = document.createElement('option');
		option.value = territory.id;
		option.textContent = territory.name;
		select.insertBefore(option, select.lastElementChild);
		select.value = territory.id;
	});
}

function collectVisitFields(fd, revisitId, existingId) {
	return {
		id: existingId,
		revisitId,
		date: fd.get('visitDate'),
		visitSumaryNotes: fd.get('visitSumaryNotes')?.trim(),
		toolboxPub: fd.get('toolboxPub') ?? '0',
		toolboxReference: fd.get('toolboxReference')?.trim(),
		parner: fd.get('parner')?.trim(),
		nextVisit: fd.get('nextVisit') || null,
		nextVisitNotes: fd.get('nextVisitNotes')?.trim(),
		nextVisitToolboxPub: fd.get('nextVisitToolboxPub') ?? '0',
		nextVisitToolBoxReference: fd.get('nextVisitToolBoxReference')?.trim(),
		noCount: fd.get('countVisit') !== 'on'
	};
}

// ---------- Detail view ----------

async function openDetail(id) {
	const revisit = await store.getRevisit(id);
	if (!revisit) return;
	const visits = await store.listVisitsForRevisit(id);
	const hasLocation = revisit.mapLat != null && revisit.mapLng != null;

	const sheet = openModal(`${revisit.emoji || ''} ${escapeHTML(revisit.name || '')} ${escapeHTML(revisit.lastName || '')}`.trim(), `
		<div class="row wrap" style="gap:8px; margin-bottom:12px;">
			<span class="badge" style="background:${revisit.visitType === 'Estudio' ? 'var(--estudio)' : 'var(--revisita)'};">${escapeHTML(visitTypeLabel(revisit.visitType))}</span>
			${revisit.phone ? `<a href="tel:${escapeHTML(revisit.phone)}" class="badge upcoming"><i class="fas fa-phone"></i> ${escapeHTML(revisit.phone)}</a>` : ''}
		</div>
		${revisit.houseDetails ? `<p><strong>${t('labelHouseDetailsColon')}</strong> ${escapeHTML(revisit.houseDetails)}</p>` : ''}
		${revisit.observations ? `<p><strong>${t('labelObservationsColon')}</strong> ${escapeHTML(revisit.observations)}</p>` : ''}
		${revisit.nextVisit ? `<p><strong>${t('labelNextVisitColon')}</strong> ${formatDateLong(revisit.nextVisit)}</p>` : ''}
		${hasLocation ? `
			<div class="card" style="padding:0; overflow:hidden; margin-bottom:12px;">
				<iframe src="${geo.mapEmbedUrl(revisit.mapLat, revisit.mapLng)}" style="width:100%; height:160px; border:0; display:block;" loading="lazy"></iframe>
			</div>
			<div class="row" style="gap:10px; margin-bottom:12px;">
				<a class="btn" href="${geo.mapEmbedUrl(revisit.mapLat, revisit.mapLng)}" target="_blank" rel="noopener"><i class="fas fa-map"></i> ${t('btnViewOnMap')}</a>
				<a class="btn btn-primary" href="${geo.directionsUrl(revisit.mapLat, revisit.mapLng)}" target="_blank" rel="noopener"><i class="fas fa-diamond-turn-right"></i> ${t('btnGetDirections')}</a>
			</div>
		` : ''}
		<div class="row" style="gap:10px; margin:14px 0;">
			<button class="btn btn-ghost" id="editRevisitBtn"><i class="fas fa-pen"></i> ${t('edit')}</button>
			<button class="btn btn-primary" id="addVisitBtn"><i class="fas fa-plus"></i> ${t('btnNewVisit')}</button>
		</div>
		<h2 style="font-size:14px;">${t('headingVisitHistory')}</h2>
		<div id="visitHistory">
			${visits.length ? '' : `<div class="empty-state">${escapeHTML(t('emptyVisitHistory'))}</div>`}
		</div>
	`);

	const historyEl = sheet.querySelector('#visitHistory');
	for (const visit of visits) {
		historyEl.append(renderVisitLogItem(visit));
	}

	sheet.querySelector('#editRevisitBtn').addEventListener('click', () => openForm(revisit));
	sheet.querySelector('#addVisitBtn').addEventListener('click', () => openVisitForm(revisit));
}

function renderVisitLogItem(visit) {
	const el = document.createElement('div');
	el.className = 'card';
	el.style.marginBottom = '10px';
	el.innerHTML = `
		<div class="row between">
			<strong>${formatDateLong(visit.date)}</strong>
			${visit.studie ? `<span class="badge" style="background:var(--estudio);">${escapeHTML(t('wordEstudio'))}</span>` : ''}
		</div>
		${visit.visitSumaryNotes ? `<p style="margin:6px 0 0;">${escapeHTML(visit.visitSumaryNotes)}</p>` : ''}
		${visit.nextVisit ? `<p style="margin:6px 0 0; font-size:13px; color:var(--text-muted);">${t('visitNextVisitPrefix')} ${formatDateLong(visit.nextVisit)}${visit.nextVisitNotes ? ' — ' + escapeHTML(visit.nextVisitNotes) : ''}</p>` : ''}
	`;
	return el;
}

async function openVisitForm(revisit) {
	const sheet = openModal(t('newVisitTitle'), `
		<form id="visitForm">
			${visitFieldsHTML({})}
			<button type="submit" class="btn btn-primary btn-block" style="margin-top:12px;">${t('save')}</button>
		</form>
	`);

	wireSourcePicker(sheet);

	sheet.querySelector('#visitForm').addEventListener('submit', async (e) => {
		e.preventDefault();
		const fd = new FormData(e.target);
		const visit = collectVisitFields(fd, revisit.id);
		visit.studie = revisit.visitType === 'Estudio';
		await store.saveVisit(visit);
		await store.saveRevisit({ ...revisit, lastVisit: visit.date, nextVisit: visit.nextVisit || revisit.nextVisit });
		closeModal();
		showToast(t('toastVisitSaved'));
		openDetail(revisit.id);
		renderCurrentIfMounted();
	});
}

function renderCurrentIfMounted() {
	const container = document.getElementById('view-revisitas');
	if (container && container.classList.contains('active')) {
		render(container);
	}
}
