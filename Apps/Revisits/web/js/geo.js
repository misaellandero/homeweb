export function isSupported() {
	return 'geolocation' in navigator;
}

export function getCurrentPosition() {
	return new Promise((resolve, reject) => {
		if (!isSupported()) {
			reject(new Error('unsupported'));
			return;
		}
		navigator.geolocation.getCurrentPosition(
			(pos) => resolve({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
			(err) => reject(err),
			{ enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
		);
	});
}

export async function reverseGeocode(lat, lng) {
	try {
		const res = await fetch(
			`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}&zoom=18`,
			{ headers: { Accept: 'application/json' } }
		);
		if (!res.ok) return null;
		const data = await res.json();
		return data?.display_name || null;
	} catch {
		return null;
	}
}

export function mapEmbedUrl(lat, lng, deltaDeg = 0.003) {
	const bbox = `${lng - deltaDeg},${lat - deltaDeg},${lng + deltaDeg},${lat + deltaDeg}`;
	return `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&marker=${lat},${lng}&layer=mapnik`;
}

export function directionsUrl(lat, lng) {
	return `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
}
