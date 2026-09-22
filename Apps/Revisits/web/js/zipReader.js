// Minimal ZIP reader for extracting a few named entries (the native app's
// full-database backup, when the user zips its .revisitsbackup package
// themselves) without adding a new dependency — only STORE and DEFLATE
// entries are supported, which covers both macOS Finder's "Compress" and
// most other zip tools, using the browser's native DecompressionStream
// instead of a bundled inflate implementation.

const EOCD_SIGNATURE = 0x06054b50;
const CENTRAL_DIR_SIGNATURE = 0x02014b50;

async function inflateRaw(bytes) {
	const stream = new Blob([bytes]).stream().pipeThrough(new DecompressionStream('deflate-raw'));
	return new Uint8Array(await new Response(stream).arrayBuffer());
}

function findEndOfCentralDirectory(view, length) {
	const maxCommentLength = 65535;
	const searchStart = Math.max(0, length - 22 - maxCommentLength);
	for (let i = length - 22; i >= searchStart; i--) {
		if (view.getUint32(i, true) === EOCD_SIGNATURE) return i;
	}
	throw new Error('Not a valid ZIP file (end-of-central-directory record not found)');
}

// Returns a Map of entry name -> Uint8Array for every entry whose name matches `namePattern`.
export async function readZipEntries(zipBytes, namePattern) {
	const view = new DataView(zipBytes.buffer, zipBytes.byteOffset, zipBytes.byteLength);
	const eocdOffset = findEndOfCentralDirectory(view, zipBytes.length);
	const entryCount = view.getUint16(eocdOffset + 10, true);
	let offset = view.getUint32(eocdOffset + 16, true);

	const results = new Map();
	for (let i = 0; i < entryCount; i++) {
		if (view.getUint32(offset, true) !== CENTRAL_DIR_SIGNATURE) {
			throw new Error('Not a valid ZIP file (corrupt central directory)');
		}
		const compressionMethod = view.getUint16(offset + 10, true);
		const compressedSize = view.getUint32(offset + 20, true);
		const nameLength = view.getUint16(offset + 28, true);
		const extraLength = view.getUint16(offset + 30, true);
		const commentLength = view.getUint16(offset + 32, true);
		const localHeaderOffset = view.getUint32(offset + 42, true);
		const name = new TextDecoder().decode(zipBytes.subarray(offset + 46, offset + 46 + nameLength));

		if (namePattern.test(name)) {
			const localNameLength = view.getUint16(localHeaderOffset + 26, true);
			const localExtraLength = view.getUint16(localHeaderOffset + 28, true);
			const dataStart = localHeaderOffset + 30 + localNameLength + localExtraLength;
			const compressedBytes = zipBytes.subarray(dataStart, dataStart + compressedSize);

			let data;
			if (compressionMethod === 0) data = compressedBytes.slice();
			else if (compressionMethod === 8) data = await inflateRaw(compressedBytes);
			else throw new Error(`Unsupported ZIP compression method (${compressionMethod}) for "${name}"`);

			results.set(name, data);
		}

		offset += 46 + nameLength + extraLength + commentLength;
	}
	return results;
}
