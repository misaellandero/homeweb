import { importBackup } from './store.js';
import { fromSwiftDate } from './swiftDate.js';
import { loadSqlJs } from './sqlite.js';
import { mergeWal } from './walmerge.js';
import { idFromBlob, personTypeFromNative, visitTypeFromNative } from './coreDataMapping.js';
import { readZipEntries } from './zipReader.js';

function rowsOf(db, sql) {
	const res = db.exec(sql);
	if (!res.length) return [];
	const { columns, values } = res[0];
	return values.map((row) => Object.fromEntries(columns.map((c, i) => [c, row[i]])));
}

// Split out so tests can supply their own sql.js instance without touching
// the browser-only File-reading calls in importFullBackupFiles below.
export function parseFullBackupBytes(db) {
	const territoryPkToId = new Map();
	const territories = rowsOf(db, 'SELECT Z_PK, ZNAME, ZID FROM ZTERRITORY').map((r) => {
		const id = idFromBlob(r.ZID);
		territoryPkToId.set(r.Z_PK, id);
		return { id, name: r.ZNAME || '' };
	});

	const servicePkToId = new Map();
	const services = rowsOf(db, 'SELECT Z_PK, ZNAME, ZTIMEGOAL, ZEXTRATIME, ZID FROM ZSERVICE').map((r) => {
		const id = idFromBlob(r.ZID);
		servicePkToId.set(r.Z_PK, id);
		return { id, name: r.ZNAME || '', timeGoal: r.ZTIMEGOAL || 0, extraTime: r.ZEXTRATIME || 0 };
	});

	const revisitPkToId = new Map();
	const revisits = rowsOf(db, `SELECT Z_PK, ZID, ZNAME, ZLASTNAME, ZEMOJI, ZHOUSEDETAILS, ZOBSERVATIONS, ZPHONE,
		ZTYPE, ZVISITTYPE, ZTERRITORY, ZLASTVISIT, ZNEXTVISIT, ZNOTIFICATION, ZWEEKREMINDER, ZHOUSEICON,
		ZMAPMARKET, ZMAP_COR_LAT, ZMAP_COR_LOG FROM ZREVISIT`).map((r) => {
		const id = idFromBlob(r.ZID);
		revisitPkToId.set(r.Z_PK, id);
		const hasLocation = !!r.ZMAPMARKET && r.ZMAP_COR_LAT != null && r.ZMAP_COR_LOG != null;
		return {
			id,
			personType: personTypeFromNative(r.ZTYPE),
			emoji: r.ZEMOJI || '',
			name: r.ZNAME || '',
			lastName: r.ZLASTNAME || '',
			visitType: visitTypeFromNative(r.ZVISITTYPE),
			territoryId: r.ZTERRITORY != null ? territoryPkToId.get(r.ZTERRITORY) || null : null,
			observations: r.ZOBSERVATIONS || '',
			phone: r.ZPHONE || '',
			houseDetails: r.ZHOUSEDETAILS || '',
			nextVisit: fromSwiftDate(r.ZNEXTVISIT),
			lastVisit: fromSwiftDate(r.ZLASTVISIT),
			notification: !!r.ZNOTIFICATION,
			weekReminder: !!r.ZWEEKREMINDER,
			houseIcon: r.ZHOUSEICON || 1,
			mapLat: hasLocation ? Number(r.ZMAP_COR_LAT) : null,
			mapLng: hasLocation ? Number(r.ZMAP_COR_LOG) : null
		};
	});

	const visits = rowsOf(db, `SELECT Z_PK, ZID, ZREVISIT, ZDATE, ZVISITSUMARYNOTES, ZTOOLBOXPUB, ZTOOLBOXREFERENCE,
		ZPARNER, ZNEXTVISIT, ZNEXTVISITNOTES, ZNEXTVISITTOOLBOXPUB, ZNEXTVISITTOOLBOXREFERENCE, ZNOCOUNT, ZSTUDIE FROM ZVISIT`).map((r) => ({
		id: idFromBlob(r.ZID),
		revisitId: r.ZREVISIT != null ? revisitPkToId.get(r.ZREVISIT) || null : null,
		date: fromSwiftDate(r.ZDATE),
		visitSumaryNotes: r.ZVISITSUMARYNOTES || '',
		toolboxPub: r.ZTOOLBOXPUB ?? '0',
		toolboxReference: r.ZTOOLBOXREFERENCE || '',
		parner: r.ZPARNER || '',
		nextVisit: fromSwiftDate(r.ZNEXTVISIT),
		nextVisitNotes: r.ZNEXTVISITNOTES || '',
		nextVisitToolboxPub: r.ZNEXTVISITTOOLBOXPUB ?? '0',
		nextVisitToolBoxReference: r.ZNEXTVISITTOOLBOXREFERENCE || '',
		noCount: !!r.ZNOCOUNT,
		studie: !!r.ZSTUDIE
	}));

	const dayGoals = rowsOf(db, 'SELECT Z_PK, ZID, ZSERVICE, ZDAY, ZGOAL FROM ZDAYGOAL').map((r) => ({
		id: idFromBlob(r.ZID),
		serviceId: r.ZSERVICE != null ? servicePkToId.get(r.ZSERVICE) || null : null,
		day: r.ZDAY,
		goal: r.ZGOAL || 0
	}));

	const reports = rowsOf(db, 'SELECT Z_PK, ZID, ZSERVICE, ZDATE, ZHOURS, ZSTUDIES, ZRETURNVISITS, ZPUBS, ZVIDEOS FROM ZREPORTS').map((r) => ({
		id: idFromBlob(r.ZID),
		serviceId: r.ZSERVICE != null ? servicePkToId.get(r.ZSERVICE) || null : null,
		date: fromSwiftDate(r.ZDATE),
		hours: r.ZHOURS || 0,
		studies: r.ZSTUDIES || 0,
		returnVisits: r.ZRETURNVISITS || 0,
		pubs: r.ZPUBS || 0,
		videos: r.ZVIDEOS || 0
	}));

	const medals = rowsOf(db, 'SELECT Z_PK, ZID, ZDATE, ZHOURS, ZSERVICENAME, ZTYPE FROM ZMEDALS').map((r) => ({
		id: idFromBlob(r.ZID),
		date: fromSwiftDate(r.ZDATE),
		hours: r.ZHOURS || 0,
		serviceName: r.ZSERVICENAME || '',
		type: r.ZTYPE || ''
	}));

	return { territories, revisits, visits, services, dayGoals, reports, medals };
}

// Thrown when the selected file(s) can't be read as a backup at all — the UI
// shows this error's message (with recovery instructions) instead of a
// generic "couldn't read the file" toast.
export class BackupFormatError extends Error {}

async function extractFromZip(zipFile) {
	const zipBytes = new Uint8Array(await zipFile.arrayBuffer());
	let entries;
	try {
		entries = await readZipEntries(zipBytes, /\.sqlite(-wal)?$/i);
	} catch (err) {
		throw new BackupFormatError('unreadablePackage');
	}
	const mainEntry = [...entries].find(([name]) => /\.sqlite$/i.test(name));
	const walEntry = [...entries].find(([name]) => /\.sqlite-wal$/i.test(name));
	if (!mainEntry) throw new BackupFormatError('unreadablePackage');
	return { mainBytes: mainEntry[1], walBytes: walEntry ? walEntry[1] : null };
}

export async function importFullBackupFiles(files) {
	// A single .zip or .revisitsbackup selection: the native app's backup is a
	// macOS/iOS "package" (a directory bundle containing Revisits.sqlite /
	// -wal / -shm) — browsers can't read package internals directly, so this
	// only works when the user zipped it themselves (Finder: right-click the
	// .revisitsbackup file → Comprimir). A raw .revisitsbackup selection is
	// accepted too in case it happens to arrive zip-shaped, but otherwise
	// throws BackupFormatError with recovery instructions for the UI to show.
	let mainBytes;
	let walBytes;
	if (files.length === 1 && /\.(zip|revisitsbackup)$/i.test(files[0].name)) {
		({ mainBytes, walBytes } = await extractFromZip(files[0]));
	} else {
		const mainFile = files.find((f) => /\.sqlite$/i.test(f.name)) || files[0];
		const walFile = files.find((f) => /\.sqlite-wal$/i.test(f.name));
		mainBytes = new Uint8Array(await mainFile.arrayBuffer());
		walBytes = walFile ? new Uint8Array(await walFile.arrayBuffer()) : null;
	}

	const merged = walBytes ? mergeWal(mainBytes, walBytes) : mainBytes;

	const SQL = await loadSqlJs();
	const db = new SQL.Database(merged);

	try {
		const dump = parseFullBackupBytes(db);
		await importBackup(dump);
		return Object.fromEntries(Object.entries(dump).map(([k, v]) => [k, v.length]));
	} finally {
		db.close();
	}
}
