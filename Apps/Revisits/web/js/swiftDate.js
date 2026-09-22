// Swift's default JSONEncoder/Decoder and Core Data both represent Date as
// timeIntervalSinceReferenceDate: seconds since 2001-01-01T00:00:00Z — not
// the Unix epoch. This constant is the gap between the two references.
export const SWIFT_REFERENCE_OFFSET = 978307200;

export function toSwiftDate(isoDateOnly) {
	if (!isoDateOnly) return null;
	const date = new Date(`${isoDateOnly.slice(0, 10)}T00:00:00`);
	if (Number.isNaN(date.getTime())) return null;
	return Math.round(date.getTime() / 1000) - SWIFT_REFERENCE_OFFSET;
}

export function fromSwiftDate(swiftSeconds) {
	if (swiftSeconds == null) return null;
	const date = new Date((swiftSeconds + SWIFT_REFERENCE_OFFSET) * 1000);
	if (Number.isNaN(date.getTime())) return null;
	const offset = date.getTimezoneOffset();
	const local = new Date(date.getTime() - offset * 60000);
	return local.toISOString().slice(0, 10);
}
