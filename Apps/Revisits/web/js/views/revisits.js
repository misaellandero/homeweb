import * as store from '../store.js';
import { openModal, closeModal, showToast } from '../ui.js';
import { escapeHTML, formatDateLong, todayISO } from '../utils.js';
import { PEOPLE_TYPES, PEOPLE_EMOJI, VISIT_TYPES, SOURCES, SOURCES_EMOJI, SOURCES_TEXT, houseImage, randomHouseIcon } from '../constants.js';
import { checkDueReminders } from '../notifications.js';

let currentFilter = 'todos';
let currentSearch = '';

export async function render(container) {
	const revisits = await store.listRevisits();
	checkDueReminders(revisits);

	const filtered = revisits.filter((r) => matchesFilter(r) && matchesSearch(r));

	container.innerHTML = `
		<div class="card">
			<div class="row wrap" style="margin-bottom:10px;">
				<input type="search" id="revisitSearch" placeholder="Buscar por nombre..." style="flex:1; min-width:160px; border:1px solid var(--border); border-radius:10px; padding:8px 12px;" value="${escapeHTML(currentSearch)}">
			</div>
			<div class="segmented" id="revisitFilters">
				<button data-filter="todos" class="${currentFilter === 'todos' ? 'active' : ''}">Todos</button>
				<button data-filter="estudio" class="${currentFilter === 'estudio' ? 'active' : ''}">Estudio</button>
				<button data-filter="revisita" class="${currentFilter === 'revisita' ? 'active' : ''}">Revisita</button>
				<button data-filter="vencidas" class="${currentFilter === 'vencidas' ? 'active' : ''}">Vencidas</button>
			</div>
		</div>
		<div class="card" id="revisitListCard">
			${filtered.length ? `<div id="revisitList"></div>` : `<div class="empty-state"><i class="fas fa-door-open" style="font-size:32px; opacity:.4;"></i><p>No hay revisitas todavía.<br>Toca el botón + para agregar la primera.</p></div>`}
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
	const typeClass = revisit.visitType === 'Estudio' ? 'estudio' : 'revisita';

	el.innerHTML = `
		<img src="${houseImage(revisit.visitType, revisit.houseIcon)}" class="avatar" style="background:none; object-fit:contain;" alt="">
		<div class="meta">
			<div class="name">${escapeHTML(revisit.emoji || '')} ${escapeHTML(revisit.name || '')} ${escapeHTML(revisit.lastName || '')}</div>
			<div class="sub">${revisit.visitType === 'Estudio' ? 'Estudio' : 'Revisita'}${revisit.nextVisit ? ' · Próxima: ' + formatDateLong(revisit.nextVisit) : ''}</div>
		</div>
		${overdue ? '<span class="badge overdue">Vencida</span>' : upcoming ? '<span class="badge upcoming">Hoy</span>' : ''}
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

	const sheet = openModal(isNew ? 'Nueva revisita' : 'Editar revisita', `
		<form id="revisitForm">
			<div class="field">
				<label>Edad / tipo de persona</label>
				<select name="personType">
					<option value="">— Sin especificar —</option>
					${PEOPLE_TYPES.map((t, i) => `<option value="${i}" ${revisit?.personType === i ? 'selected' : ''}>${PEOPLE_EMOJI[i]} ${t}</option>`).join('')}
				</select>
			</div>
			<div class="row">
				<div class="field" style="flex:1;">
					<label>Nombre</label>
					<input name="name" required value="${escapeHTML(revisit?.name || '')}">
				</div>
				<div class="field" style="flex:1;">
					<label>Apellido</label>
					<input name="lastName" value="${escapeHTML(revisit?.lastName || '')}">
				</div>
			</div>
			<div class="field">
				<label>Revisita</label>
				<div class="segmented" id="visitTypeSeg">
					${VISIT_TYPES.map((t) => `<button type="button" data-value="${t}" class="${(revisit?.visitType || 'Revisita') === t ? 'active' : ''}">${t}</button>`).join('')}
				</div>
			</div>
			<div class="field">
				<label>Territorio</label>
				<select name="territoryId">
					<option value="">— Sin territorio —</option>
					${territories.map((t) => `<option value="${t.id}" ${revisit?.territoryId === t.id ? 'selected' : ''}>${escapeHTML(t.name)}</option>`).join('')}
					<option value="__new__">+ Nuevo territorio…</option>
				</select>
			</div>
			<div class="field">
				<label>Observaciones sobre la persona</label>
				<input name="observations" value="${escapeHTML(revisit?.observations || '')}">
			</div>
			<div class="field">
				<label>Teléfono de contacto</label>
				<input name="phone" type="tel" value="${escapeHTML(revisit?.phone || '')}">
			</div>
			<div class="field">
				<label>Referencias de la casa</label>
				<input name="houseDetails" value="${escapeHTML(revisit?.houseDetails || '')}">
			</div>
			<div class="field">
				<label>Próxima visita</label>
				<input name="nextVisit" type="date" value="${revisit?.nextVisit ? revisit.nextVisit.slice(0, 10) : ''}">
			</div>
			<h2 style="font-size:14px; margin-top:16px;">Recordatorios</h2>
			<label class="row" style="gap:8px; font-size:14px; margin-bottom:8px;">
				<input type="checkbox" name="notification" ${revisit?.notification ? 'checked' : ''}> Recordarme esta revisita
			</label>
			<label class="row" style="gap:8px; font-size:14px; margin-bottom:8px;">
				<input type="checkbox" name="weekReminder" ${revisit?.weekReminder ? 'checked' : ''}> Recordarme cada semana
			</label>
			${isNew ? initialVisitSectionHTML() : ''}
			<div class="row" style="margin-top:16px; gap:10px;">
				${!isNew ? `<button type="button" class="btn btn-danger" id="deleteRevisitBtn"><i class="fas fa-trash"></i></button>` : ''}
				<button type="submit" class="btn btn-primary btn-block">${isNew ? 'Guardar' : 'Actualizar'}</button>
			</div>
		</form>
	`);

	wireVisitTypeSegmented(sheet);
	wireSourcePicker(sheet);
	wireTerritorySelect(sheet);

	if (!isNew) {
		sheet.querySelector('#deleteRevisitBtn').addEventListener('click', async () => {
			if (!confirm('¿Eliminar esta revisita y todo su historial?')) return;
			await store.deleteRevisit(revisit.id);
			closeModal();
			showToast('Revisita eliminada');
			renderCurrentIfMounted();
		});
	}

	sheet.querySelector('#revisitForm').addEventListener('submit', async (e) => {
		e.preventDefault();
		const fd = new FormData(e.target);
		const personTypeRaw = fd.get('personType');
		const personType = personTypeRaw === '' ? null : Number(personTypeRaw);

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
			lastVisit: revisit?.lastVisit || null
		};

		const saved = await store.saveRevisit(data);

		if (isNew && fd.get('registerInitialVisit') === 'on') {
			const visit = collectVisitFields(fd, saved.id);
			visit.studie = saved.visitType === 'Estudio';
			await store.saveVisit(visit);
			await store.saveRevisit({ ...saved, lastVisit: visit.date, nextVisit: visit.nextVisit || saved.nextVisit });
		}

		closeModal();
		showToast(isNew ? 'Revisita guardada' : 'Revisita actualizada');
		renderCurrentIfMounted();
	});
}

function initialVisitSectionHTML() {
	return `
		<label class="row" style="gap:8px; font-size:14px; margin:16px 0 8px;">
			<input type="checkbox" name="registerInitialVisit" id="registerInitialVisit"> Registrar visita inicial
		</label>
		<div id="initialVisitFields" style="display:none;">
			${visitFieldsHTML({ prefix: '' })}
		</div>
	`;
}

function visitFieldsHTML(opts = {}) {
	const v = opts.visit || {};
	return `
		<div class="field">
			<label>Día de la visita</label>
			<input type="date" name="visitDate" value="${v.date ? v.date.slice(0, 10) : todayISO()}">
		</div>
		<div class="field">
			<label>Sobre qué hablaron</label>
			<input name="visitSumaryNotes" value="${escapeHTML(v.visitSumaryNotes || '')}">
		</div>
		<div class="field">
			<label>Publicación</label>
			<div class="segmented source-seg" data-target="toolboxPub">
				${SOURCES.map((s, i) => `<button type="button" data-value="${i}" class="${String(v.toolboxPub ?? '0') === String(i) ? 'active' : ''}">${SOURCES_EMOJI[i]} ${s}</button>`).join('')}
			</div>
		</div>
		<div class="field">
			<label class="source-ref-label">${SOURCES_TEXT[Number(v.toolboxPub) || 0]}</label>
			<input name="toolboxReference" class="source-ref-input" value="${escapeHTML(v.toolboxReference || '')}">
		</div>
		<div class="field">
			<label>Compañero</label>
			<input name="parner" value="${escapeHTML(v.parner || '')}">
		</div>
		<div class="field">
			<label>Próxima visita</label>
			<input type="date" name="nextVisit" value="${v.nextVisit ? v.nextVisit.slice(0, 10) : ''}">
		</div>
		<div class="field">
			<label>Tema próxima visita</label>
			<input name="nextVisitNotes" value="${escapeHTML(v.nextVisitNotes || '')}">
		</div>
		<div class="field">
			<label>Publicación (próxima visita)</label>
			<div class="segmented source-seg" data-target="nextVisitToolboxPub">
				${SOURCES.map((s, i) => `<button type="button" data-value="${i}" class="${String(v.nextVisitToolboxPub ?? '0') === String(i) ? 'active' : ''}">${SOURCES_EMOJI[i]} ${s}</button>`).join('')}
			</div>
		</div>
		<div class="field">
			<label class="source-ref-label" data-for="nextVisitToolboxPub">${SOURCES_TEXT[Number(v.nextVisitToolboxPub) || 0]}</label>
			<input name="nextVisitToolBoxReference" class="source-ref-input" data-for="nextVisitToolboxPub" value="${escapeHTML(v.nextVisitToolBoxReference || '')}">
		</div>
		<label class="row" style="gap:8px; font-size:14px; margin-bottom:8px;">
			<input type="checkbox" name="countVisit" ${v.noCount ? '' : 'checked'}> Contar como revisita
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
				if (labelEl) labelEl.textContent = SOURCES_TEXT[idx];
			});
		});
	});
}

function wireTerritorySelect(sheet) {
	const select = sheet.querySelector('select[name="territoryId"]');
	if (!select) return;
	select.addEventListener('change', async () => {
		if (select.value !== '__new__') return;
		const name = prompt('Nombre del nuevo territorio:');
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

	const sheet = openModal(`${revisit.emoji || ''} ${escapeHTML(revisit.name || '')} ${escapeHTML(revisit.lastName || '')}`.trim(), `
		<div class="row wrap" style="gap:8px; margin-bottom:12px;">
			<span class="badge ${revisit.visitType === 'Estudio' ? '' : ''}" style="background:${revisit.visitType === 'Estudio' ? 'var(--estudio)' : 'var(--revisita)'};">${revisit.visitType}</span>
			${revisit.phone ? `<a href="tel:${escapeHTML(revisit.phone)}" class="badge upcoming"><i class="fas fa-phone"></i> ${escapeHTML(revisit.phone)}</a>` : ''}
		</div>
		${revisit.houseDetails ? `<p><strong>Referencias de la casa:</strong> ${escapeHTML(revisit.houseDetails)}</p>` : ''}
		${revisit.observations ? `<p><strong>Observaciones:</strong> ${escapeHTML(revisit.observations)}</p>` : ''}
		${revisit.nextVisit ? `<p><strong>Próxima visita:</strong> ${formatDateLong(revisit.nextVisit)}</p>` : ''}
		<div class="row" style="gap:10px; margin:14px 0;">
			<button class="btn btn-ghost" id="editRevisitBtn"><i class="fas fa-pen"></i> Editar</button>
			<button class="btn btn-primary" id="addVisitBtn"><i class="fas fa-plus"></i> Nueva visita</button>
		</div>
		<h2 style="font-size:14px;">Historial de visitas</h2>
		<div id="visitHistory">
			${visits.length ? '' : '<div class="empty-state">Sin visitas registradas todavía.</div>'}
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
			${visit.studie ? '<span class="badge" style="background:var(--estudio);">Estudio</span>' : ''}
		</div>
		${visit.visitSumaryNotes ? `<p style="margin:6px 0 0;">${escapeHTML(visit.visitSumaryNotes)}</p>` : ''}
		${visit.nextVisit ? `<p style="margin:6px 0 0; font-size:13px; color:var(--text-muted);">Próxima visita: ${formatDateLong(visit.nextVisit)}${visit.nextVisitNotes ? ' — ' + escapeHTML(visit.nextVisitNotes) : ''}</p>` : ''}
	`;
	return el;
}

async function openVisitForm(revisit) {
	const sheet = openModal('Nueva visita', `
		<form id="visitForm">
			${visitFieldsHTML({})}
			<button type="submit" class="btn btn-primary btn-block" style="margin-top:12px;">Guardar</button>
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
		showToast('Visita guardada');
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
