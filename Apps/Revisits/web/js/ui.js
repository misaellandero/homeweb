let activeBackdrop = null;

export function openModal(title, bodyHTML, { onClose } = {}) {
	closeModal();

	const backdrop = document.createElement('div');
	backdrop.className = 'modal-backdrop';
	backdrop.innerHTML = `
		<div class="modal-sheet" role="dialog" aria-modal="true">
			<div class="modal-title">
				<h2>${title}</h2>
				<button type="button" class="close-x" aria-label="Cerrar">&times;</button>
			</div>
			<div class="modal-body"></div>
		</div>
	`;

	backdrop.querySelector('.modal-body').append(
		typeof bodyHTML === 'string' ? htmlToFragment(bodyHTML) : bodyHTML
	);

	backdrop.addEventListener('click', (e) => {
		if (e.target === backdrop) closeModal();
	});
	backdrop.querySelector('.close-x').addEventListener('click', () => closeModal());

	document.body.append(backdrop);
	activeBackdrop = backdrop;
	if (onClose) backdrop._onClose = onClose;

	return backdrop.querySelector('.modal-sheet');
}

export function closeModal() {
	if (activeBackdrop) {
		if (activeBackdrop._onClose) activeBackdrop._onClose();
		activeBackdrop.remove();
		activeBackdrop = null;
	}
}

export function htmlToFragment(html) {
	const template = document.createElement('template');
	template.innerHTML = html.trim();
	return template.content;
}

let toastTimeoutId = null;

export function showToast(message) {
	let toast = document.getElementById('appToast');
	if (!toast) {
		toast = document.createElement('div');
		toast.id = 'appToast';
		toast.className = 'toast';
		document.body.append(toast);
	}
	toast.textContent = message;
	toast.classList.add('show');
	clearTimeout(toastTimeoutId);
	toastTimeoutId = setTimeout(() => toast.classList.remove('show'), 2600);
}
