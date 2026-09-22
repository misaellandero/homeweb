// Applies a SQLite -wal journal file's committed frames onto the main
// database file's page image, producing one consistent byte array — the
// same recovery SQLite itself performs when opening a WAL-mode database.
// Needed because sql.js only reads a single file: handing it just the main
// .sqlite would silently drop any writes still sitting in the WAL.

export function mergeWal(mainBytes, walBytes) {
	if (!walBytes || walBytes.length < 32) return mainBytes;

	const wal = new DataView(walBytes.buffer, walBytes.byteOffset, walBytes.byteLength);
	const magic = wal.getUint32(0, false);
	let littleEndian;
	if (magic === 0x377f0682) littleEndian = true;
	else if (magic === 0x377f0683) littleEndian = false;
	else throw new Error('Not a valid WAL file (bad magic)');

	const pageSize = wal.getUint32(8, false); // header fields are always big-endian; only frame checksums vary
	const salt1 = wal.getUint32(16, false);
	const salt2 = wal.getUint32(20, false);

	let [cksum1, cksum2] = walChecksum(walBytes.subarray(0, 24), 0, 0, littleEndian);

	const frameSize = 24 + pageSize;
	const numFrames = Math.floor((walBytes.length - 32) / frameSize);

	const pages = new Map(); // pageNumber -> Uint8Array(pageSize)
	let committedDbSizePages = null;
	let committedPages = new Map();

	for (let i = 0; i < numFrames; i++) {
		const frameOffset = 32 + i * frameSize;
		const header = walBytes.subarray(frameOffset, frameOffset + 24);
		const headerView = new DataView(header.buffer, header.byteOffset, header.byteLength);
		const pageNumber = headerView.getUint32(0, false);
		const dbSizeAfterCommit = headerView.getUint32(4, false);
		const frameSalt1 = headerView.getUint32(8, false);
		const frameSalt2 = headerView.getUint32(12, false);
		const expectedCksum1 = headerView.getUint32(16, false);
		const expectedCksum2 = headerView.getUint32(20, false);
		const pageData = walBytes.subarray(frameOffset + 24, frameOffset + 24 + pageSize);

		if (frameSalt1 !== salt1 || frameSalt2 !== salt2) break; // stale frame from a prior checkpoint cycle

		const [c1afterHeader, c2afterHeader] = walChecksum(header.subarray(0, 8), cksum1, cksum2, littleEndian);
		const [c1, c2] = walChecksum(pageData, c1afterHeader, c2afterHeader, littleEndian);

		if (c1 !== expectedCksum1 || c2 !== expectedCksum2) break; // checksum mismatch: end of valid/committed frames

		cksum1 = c1;
		cksum2 = c2;
		pages.set(pageNumber, pageData.slice());

		if (dbSizeAfterCommit !== 0) {
			committedDbSizePages = dbSizeAfterCommit;
			committedPages = new Map(pages);
		}
	}

	if (committedDbSizePages === null) return mainBytes; // no committed transactions in the WAL

	const finalSize = committedDbSizePages * pageSize;
	const out = new Uint8Array(finalSize);
	out.set(mainBytes.subarray(0, Math.min(mainBytes.length, finalSize)), 0);

	for (const [pageNumber, data] of committedPages) {
		const start = (pageNumber - 1) * pageSize;
		if (start + pageSize <= finalSize) out.set(data, start);
	}

	return out;
}

// SQLite's WAL checksum: a simple weighted rolling sum over 32-bit words.
function walChecksum(buf, s1, s2, littleEndian) {
	const view = new DataView(buf.buffer, buf.byteOffset, buf.byteLength);
	let x1 = s1 >>> 0;
	let x2 = s2 >>> 0;
	for (let i = 0; i < buf.length; i += 8) {
		const v1 = view.getUint32(i, littleEndian);
		const v2 = view.getUint32(i + 4, littleEndian);
		x1 = (x1 + v1 + x2) >>> 0;
		x2 = (x2 + v2 + x1) >>> 0;
	}
	return [x1, x2];
}
