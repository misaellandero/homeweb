(function () {
	var APP_STORE_URL = 'https://apps.apple.com/mx/app/revisits/id1513271477';

	function detectPlatform() {
		var ua = navigator.userAgent || navigator.vendor || window.opera || '';
		var isIOS = /iPad|iPhone|iPod/.test(ua) && !window.MSStream;
		var isIPadOS = navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1;
		var isMac = /Macintosh|Mac OS X/.test(ua) && !isIPadOS;
		var isAndroid = /Android/.test(ua);
		var isWindows = /Windows/.test(ua);

		if (isIOS || isIPadOS || isMac) return 'apple';
		if (isAndroid) return 'android';
		if (isWindows) return 'windows';
		return 'other';
	}

	var INSTRUCTIONS = {
		android: [
			'Abre <strong>Revisits Web</strong> con Google Chrome.',
			'Toca el menú <strong>⋮</strong> (arriba a la derecha).',
			'Selecciona <strong>Instalar aplicación</strong> (o <strong>Añadir a pantalla de inicio</strong>).',
			'Confirma la instalación: el icono de Revisits aparecerá en tu pantalla de inicio.'
		],
		windows: [
			'Abre <strong>Revisits Web</strong> con Microsoft Edge o Google Chrome.',
			'Haz clic en el icono de instalación en la barra de direcciones (o en el menú <strong>⋮</strong> &gt; Aplicaciones &gt; Instalar este sitio como una aplicación).',
			'Confirma la instalación: Revisits Web se abrirá como una app en tu escritorio y menú de inicio.'
		],
		other: [
			'Abre <strong>Revisits Web</strong> con Google Chrome o Microsoft Edge.',
			'Busca la opción <strong>Instalar aplicación</strong> o <strong>Añadir a pantalla de inicio</strong> en el menú del navegador.',
			'Confirma la instalación para usar Revisits Web sin conexión.'
		]
	};

	document.addEventListener('DOMContentLoaded', function () {
		var btn = document.getElementById('webVersionBtn');
		if (!btn) return;

		btn.addEventListener('click', function () {
			var platform = detectPlatform();

			if (platform === 'apple') {
				window.location.href = APP_STORE_URL;
				return;
			}

			var steps = INSTRUCTIONS[platform] || INSTRUCTIONS.other;
			var body = document.getElementById('webInstallModalBody');
			if (body) {
				body.innerHTML =
					'<ol class="text-left">' +
					steps.map(function (step) { return '<li>' + step + '</li>'; }).join('') +
					'</ol>';
			}

			if (window.jQuery) {
				jQuery('#webInstallModal').modal('show');
			}
		});
	});
})();
