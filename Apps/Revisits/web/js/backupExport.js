import { exportBackup } from './store.js';
import { toSwiftDate } from './swiftDate.js';
import { loadSqlJs } from './sqlite.js';
import { ENTITIES, idToBytes, personTypeToNative, visitTypeToNative, boolToInt } from './coreDataMapping.js';

const TEMPLATE_URL = new URL('../assets/data/revisits-template.sqlite', import.meta.url).href;

export async function buildFullBackupBytes(dump) {
	const SQL = await loadSqlJs();
	const templateBytes = new Uint8Array(await (await fetch(TEMPLATE_URL)).arrayBuffer());
	return buildFullBackupBytesWithSql(SQL, templateBytes, dump);
}

// Split out so tests can supply their own sql.js instance/template bytes
// without touching the browser-only fetch() call above.
export function buildFullBackupBytesWithSql(SQL, templateBytes, dump) {
	const db = new SQL.Database(templateBytes);

	const entPk = {};
	for (const name of ENTITIES) {
		const res = db.exec('SELECT Z_ENT FROM Z_PRIMARYKEY WHERE Z_NAME = ?', [name]);
		entPk[name] = res[0].values[0][0];
	}

	const pkCounters = {};
	function nextPk(entity) {
		pkCounters[entity] = (pkCounters[entity] || 0) + 1;
		return pkCounters[entity];
	}

	const territoryPk = new Map(); // web id -> Z_PK
	for (const t of dump.territories) {
		const pk = nextPk('Territory');
		territoryPk.set(t.id, pk);
		db.run('INSERT INTO ZTERRITORY (Z_PK, Z_ENT, Z_OPT, ZNAME, ZID) VALUES (?, ?, 1, ?, ?)', [
			pk, entPk.Territory, t.name || null, idToBytes(t.id)
		]);
	}

	const servicePk = new Map();
	for (const s of dump.services) {
		const pk = nextPk('Service');
		servicePk.set(s.id, pk);
		db.run('INSERT INTO ZSERVICE (Z_PK, Z_ENT, Z_OPT, ZEXTRATIME, ZTIMEGOAL, ZNAME, ZID) VALUES (?, ?, 1, ?, ?, ?, ?)', [
			pk, entPk.Service, s.extraTime || 0, s.timeGoal || 0, s.name || null, idToBytes(s.id)
		]);
	}

	const revisitPk = new Map();
	for (const r of dump.revisits) {
		const pk = nextPk('Revisit');
		revisitPk.set(r.id, pk);
		const hasLocation = r.mapLat != null && r.mapLng != null;
		db.run(`INSERT INTO ZREVISIT
			(Z_PK, Z_ENT, Z_OPT, ZHOUSEICON, ZMAPMARKET, ZNOTIFICATION, ZWEEKREMINDER, ZTERRITORY,
			 ZLASTVISIT, ZNEXTVISIT, ZEMOJI, ZHOUSEDETAILS, ZLASTNAME, ZMAP_COR_LAT, ZMAP_COR_LOG,
			 ZNAME, ZOBSERVATIONS, ZPHONE, ZTYPE, ZVISITTYPE, ZID)
			VALUES (?, ?, 1, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, [
			pk, entPk.Revisit, r.houseIcon || 0, boolToInt(hasLocation), boolToInt(r.notification), boolToInt(r.weekReminder),
			r.territoryId ? territoryPk.get(r.territoryId) || null : null,
			toSwiftDate(r.lastVisit), toSwiftDate(r.nextVisit), r.emoji || null, r.houseDetails || null, r.lastName || null,
			hasLocation ? String(r.mapLat) : null, hasLocation ? String(r.mapLng) : null,
			r.name || null, r.observations || null, r.phone || null, personTypeToNative(r.personType), visitTypeToNative(r.visitType),
			idToBytes(r.id)
		]);
	}

	for (const v of dump.visits) {
		const pk = nextPk('Visit');
		db.run(`INSERT INTO ZVISIT
			(Z_PK, Z_ENT, Z_OPT, ZNOCOUNT, ZSTUDIE, ZREVISIT, ZDATE, ZNEXTVISIT, ZNEXTVISITNOTES,
			 ZNEXTVISITTOOLBOXREFERENCE, ZNEXTVISITTOOLBOXPUB, ZPARNER, ZTOOLBOXPUB, ZTOOLBOXREFERENCE,
			 ZVISITSUMARYNOTES, ZID)
			VALUES (?, ?, 1, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, [
			pk, entPk.Visit, boolToInt(v.noCount), boolToInt(v.studie),
			v.revisitId ? revisitPk.get(v.revisitId) || null : null,
			toSwiftDate(v.date), toSwiftDate(v.nextVisit), v.nextVisitNotes || null,
			v.nextVisitToolBoxReference || null, v.nextVisitToolboxPub ?? '0', v.parner || null,
			v.toolboxPub ?? '0', v.toolboxReference || null, v.visitSumaryNotes || null, idToBytes(v.id)
		]);
	}

	for (const dg of dump.dayGoals) {
		const pk = nextPk('DayGoal');
		db.run('INSERT INTO ZDAYGOAL (Z_PK, Z_ENT, Z_OPT, ZDAY, ZSERVICE, ZGOAL, ZID) VALUES (?, ?, 1, ?, ?, ?, ?)', [
			pk, entPk.DayGoal, dg.day, dg.serviceId ? servicePk.get(dg.serviceId) || null : null, dg.goal || 0, idToBytes(dg.id)
		]);
	}

	for (const rp of dump.reports) {
		const pk = nextPk('Reports');
		db.run(`INSERT INTO ZREPORTS (Z_PK, Z_ENT, Z_OPT, ZPUBS, ZRETURNVISITS, ZSTUDIES, ZVIDEOS, ZSERVICE, ZDATE, ZHOURS, ZID)
			VALUES (?, ?, 1, ?, ?, ?, ?, ?, ?, ?, ?)`, [
			pk, entPk.Reports, rp.pubs || 0, rp.returnVisits || 0, rp.studies || 0, rp.videos || 0,
			rp.serviceId ? servicePk.get(rp.serviceId) || null : null, toSwiftDate(rp.date), rp.hours || 0, idToBytes(rp.id)
		]);
	}

	for (const m of dump.medals) {
		const pk = nextPk('Medals');
		db.run('INSERT INTO ZMEDALS (Z_PK, Z_ENT, Z_OPT, ZDATE, ZHOURS, ZEMOJI, ZSERVICENAME, ZTYPE, ZID) VALUES (?, ?, 1, ?, ?, ?, ?, ?, ?)', [
			pk, entPk.Medals, toSwiftDate(m.date), m.hours || 0, null, m.serviceName || null, m.type || null, idToBytes(m.id)
		]);
	}

	for (const name of ENTITIES) {
		db.run('UPDATE Z_PRIMARYKEY SET Z_MAX = ? WHERE Z_NAME = ?', [pkCounters[name] || 0, name]);
	}

	const bytes = db.export();
	db.close();
	return bytes;
}

export async function downloadFullBackup() {
	const dump = await exportBackup();
	const bytes = await buildFullBackupBytes(dump);
	const blob = new Blob([bytes], { type: 'application/octet-stream' });
	const url = URL.createObjectURL(blob);
	const a = document.createElement('a');
	a.href = url;
	a.download = `revisits-backup-${new Date().toISOString().slice(0, 10)}.sqlite`;
	a.click();
	URL.revokeObjectURL(url);
}
