// Lazily loads sql.js (a WebAssembly build of SQLite) from a CDN, only when
// a full-database backup is actually exported or imported — most sessions
// never touch this, so it isn't part of the precached app shell.

const SQLJS_VERSION = '1.14.2';
const SQLJS_BASE = `https://cdn.jsdelivr.net/npm/sql.js@${SQLJS_VERSION}/dist/`;

let sqlPromise = null;

export function loadSqlJs() {
	if (sqlPromise) return sqlPromise;
	sqlPromise = new Promise((resolve, reject) => {
		const init = () => {
			window.initSqlJs({ locateFile: (file) => SQLJS_BASE + file }).then(resolve, reject);
		};
		if (window.initSqlJs) {
			init();
			return;
		}
		const script = document.createElement('script');
		script.src = `${SQLJS_BASE}sql-wasm.js`;
		script.onload = init;
		script.onerror = () => reject(new Error('Could not load sql.js from CDN'));
		document.head.appendChild(script);
	});
	return sqlPromise;
}
