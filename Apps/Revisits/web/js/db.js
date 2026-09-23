const DB_NAME = 'revisits-db';
const DB_VERSION = 1;

const STORES = {
	territories: { keyPath: 'id', indexes: [] },
	revisits: {
		keyPath: 'id',
		indexes: [
			{ name: 'nextVisit', keyPath: 'nextVisit' },
			{ name: 'visitType', keyPath: 'visitType' },
			{ name: 'territoryId', keyPath: 'territoryId' }
		]
	},
	visits: {
		keyPath: 'id',
		indexes: [
			{ name: 'revisitId', keyPath: 'revisitId' },
			{ name: 'date', keyPath: 'date' }
		]
	},
	services: { keyPath: 'id', indexes: [] },
	dayGoals: {
		keyPath: 'id',
		indexes: [{ name: 'serviceId', keyPath: 'serviceId' }]
	},
	reports: {
		keyPath: 'id',
		indexes: [
			{ name: 'serviceId', keyPath: 'serviceId' },
			{ name: 'date', keyPath: 'date' }
		]
	},
	medals: {
		keyPath: 'id',
		indexes: [{ name: 'date', keyPath: 'date' }]
	}
};

let dbPromise = null;

function openDB() {
	if (dbPromise) return dbPromise;

	dbPromise = new Promise((resolve, reject) => {
		const request = indexedDB.open(DB_NAME, DB_VERSION);

		request.onupgradeneeded = () => {
			const db = request.result;
			for (const [storeName, config] of Object.entries(STORES)) {
				if (db.objectStoreNames.contains(storeName)) continue;
				const store = db.createObjectStore(storeName, { keyPath: config.keyPath });
				for (const index of config.indexes) {
					store.createIndex(index.name, index.keyPath, { unique: false });
				}
			}
		};

		request.onsuccess = () => resolve(request.result);
		request.onerror = () => reject(request.error);
	});

	return dbPromise;
}

function withStore(storeName, mode, callback) {
	return openDB().then((db) => {
		return new Promise((resolve, reject) => {
			const tx = db.transaction(storeName, mode);
			const store = tx.objectStore(storeName);
			const result = callback(store);
			tx.oncomplete = () => resolve(result);
			tx.onerror = () => reject(tx.error);
			tx.onabort = () => reject(tx.error);
		});
	});
}

function requestToPromise(request) {
	return new Promise((resolve, reject) => {
		request.onsuccess = () => resolve(request.result);
		request.onerror = () => reject(request.error);
	});
}

export const db = {
	put(storeName, value) {
		return withStore(storeName, 'readwrite', (store) => store.put(value));
	},

	get(storeName, id) {
		return openDB().then((database) => {
			const tx = database.transaction(storeName, 'readonly');
			return requestToPromise(tx.objectStore(storeName).get(id));
		});
	},

	getAll(storeName) {
		return openDB().then((database) => {
			const tx = database.transaction(storeName, 'readonly');
			return requestToPromise(tx.objectStore(storeName).getAll());
		});
	},

	getAllByIndex(storeName, indexName, value) {
		return openDB().then((database) => {
			const tx = database.transaction(storeName, 'readonly');
			const index = tx.objectStore(storeName).index(indexName);
			return requestToPromise(index.getAll(value));
		});
	},

	delete(storeName, id) {
		return withStore(storeName, 'readwrite', (store) => store.delete(id));
	},

	clear(storeName) {
		return withStore(storeName, 'readwrite', (store) => store.clear());
	},

	async exportAll() {
		const dump = {};
		for (const storeName of Object.keys(STORES)) {
			dump[storeName] = await db.getAll(storeName);
		}
		return dump;
	},

	async importAll(dump) {
		for (const storeName of Object.keys(STORES)) {
			const rows = dump[storeName];
			if (!Array.isArray(rows)) continue;
			await db.clear(storeName);
			for (const row of rows) {
				await db.put(storeName, row);
			}
		}
	}
};

export const STORE_NAMES = Object.keys(STORES);
