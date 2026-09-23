(function () {
	var APP_STORE_URL = 'https://apps.apple.com/mx/app/revisits/id1513271477';

	var STRINGS = {
		en: {
			btnLabel: 'Use on the Web', modalTitle: 'Install Revisits Web', openApp: 'Open Revisits Web', close: 'Close',
			android: ['Open <strong>Revisits Web</strong> with Google Chrome.', 'Tap the <strong>⋮</strong> menu (top right).', 'Select <strong>Install app</strong> (or <strong>Add to Home screen</strong>).', 'Confirm: the Revisits icon will appear on your home screen.'],
			windows: ['Open <strong>Revisits Web</strong> with Microsoft Edge or Google Chrome.', 'Click the install icon in the address bar (or the <strong>⋮</strong> menu &gt; Apps &gt; Install this site as an app).', 'Confirm: Revisits Web will open as an app on your desktop and start menu.'],
			other: ['Open <strong>Revisits Web</strong> with Google Chrome or Microsoft Edge.', 'Look for <strong>Install app</strong> or <strong>Add to Home screen</strong> in the browser menu.', 'Confirm the installation to use Revisits Web offline.']
		},
		es: {
			btnLabel: 'Usar en la Web', modalTitle: 'Instalar Revisits Web', openApp: 'Abrir Revisits Web', close: 'Cerrar',
			android: ['Abre <strong>Revisits Web</strong> con Google Chrome.', 'Toca el menú <strong>⋮</strong> (arriba a la derecha).', 'Selecciona <strong>Instalar aplicación</strong> (o <strong>Añadir a pantalla de inicio</strong>).', 'Confirma la instalación: el icono de Revisits aparecerá en tu pantalla de inicio.'],
			windows: ['Abre <strong>Revisits Web</strong> con Microsoft Edge o Google Chrome.', 'Haz clic en el icono de instalación en la barra de direcciones (o en el menú <strong>⋮</strong> &gt; Aplicaciones &gt; Instalar este sitio como una aplicación).', 'Confirma la instalación: Revisits Web se abrirá como una app en tu escritorio y menú de inicio.'],
			other: ['Abre <strong>Revisits Web</strong> con Google Chrome o Microsoft Edge.', 'Busca la opción <strong>Instalar aplicación</strong> o <strong>Añadir a pantalla de inicio</strong> en el menú del navegador.', 'Confirma la instalación para usar Revisits Web sin conexión.']
		},
		de: {
			btnLabel: 'Im Web nutzen', modalTitle: 'Revisits Web installieren', openApp: 'Revisits Web öffnen', close: 'Schließen',
			android: ['Öffne <strong>Revisits Web</strong> mit Google Chrome.', 'Tippe auf das Menü <strong>⋮</strong> (oben rechts).', 'Wähle <strong>App installieren</strong> (oder <strong>Zum Startbildschirm hinzufügen</strong>).', 'Bestätige: Das Revisits-Symbol erscheint auf deinem Startbildschirm.'],
			windows: ['Öffne <strong>Revisits Web</strong> mit Microsoft Edge oder Google Chrome.', 'Klicke auf das Installationssymbol in der Adressleiste (oder Menü <strong>⋮</strong> &gt; Apps &gt; Diese Seite als App installieren).', 'Bestätige: Revisits Web öffnet sich als App auf deinem Desktop und im Startmenü.'],
			other: ['Öffne <strong>Revisits Web</strong> mit Google Chrome oder Microsoft Edge.', 'Suche im Browsermenü nach <strong>App installieren</strong> oder <strong>Zum Startbildschirm hinzufügen</strong>.', 'Bestätige die Installation, um Revisits Web offline zu nutzen.']
		},
		fr: {
			btnLabel: 'Utiliser sur le Web', modalTitle: 'Installer Revisits Web', openApp: 'Ouvrir Revisits Web', close: 'Fermer',
			android: ['Ouvre <strong>Revisits Web</strong> avec Google Chrome.', 'Appuie sur le menu <strong>⋮</strong> (en haut à droite).', 'Sélectionne <strong>Installer l’application</strong> (ou <strong>Ajouter à l’écran d’accueil</strong>).', 'Confirme : l’icône Revisits apparaîtra sur ton écran d’accueil.'],
			windows: ['Ouvre <strong>Revisits Web</strong> avec Microsoft Edge ou Google Chrome.', 'Clique sur l’icône d’installation dans la barre d’adresse (ou menu <strong>⋮</strong> &gt; Applications &gt; Installer ce site en tant qu’application).', 'Confirme : Revisits Web s’ouvrira comme une application sur ton bureau et menu Démarrer.'],
			other: ['Ouvre <strong>Revisits Web</strong> avec Google Chrome ou Microsoft Edge.', 'Cherche <strong>Installer l’application</strong> ou <strong>Ajouter à l’écran d’accueil</strong> dans le menu du navigateur.', 'Confirme l’installation pour utiliser Revisits Web hors ligne.']
		},
		it: {
			btnLabel: 'Usa sul Web', modalTitle: 'Installa Revisits Web', openApp: 'Apri Revisits Web', close: 'Chiudi',
			android: ['Apri <strong>Revisits Web</strong> con Google Chrome.', 'Tocca il menu <strong>⋮</strong> (in alto a destra).', 'Seleziona <strong>Installa app</strong> (o <strong>Aggiungi a schermata Home</strong>).', 'Conferma: l’icona di Revisits apparirà nella tua schermata Home.'],
			windows: ['Apri <strong>Revisits Web</strong> con Microsoft Edge o Google Chrome.', 'Fai clic sull’icona di installazione nella barra degli indirizzi (o menu <strong>⋮</strong> &gt; App &gt; Installa questo sito come app).', 'Conferma: Revisits Web si aprirà come app sul desktop e nel menu Start.'],
			other: ['Apri <strong>Revisits Web</strong> con Google Chrome o Microsoft Edge.', 'Cerca <strong>Installa app</strong> o <strong>Aggiungi a schermata Home</strong> nel menu del browser.', 'Conferma l’installazione per usare Revisits Web offline.']
		},
		pt: {
			btnLabel: 'Usar na Web', modalTitle: 'Instalar Revisits Web', openApp: 'Abrir Revisits Web', close: 'Fechar',
			android: ['Abre a <strong>Revisits Web</strong> com o Google Chrome.', 'Toca no menu <strong>⋮</strong> (canto superior direito).', 'Seleciona <strong>Instalar aplicação</strong> (ou <strong>Adicionar ao ecrã principal</strong>).', 'Confirma: o ícone da Revisits vai aparecer no teu ecrã principal.'],
			windows: ['Abre a <strong>Revisits Web</strong> com o Microsoft Edge ou Google Chrome.', 'Clica no ícone de instalação na barra de endereços (ou menu <strong>⋮</strong> &gt; Aplicações &gt; Instalar este site como aplicação).', 'Confirma: a Revisits Web vai abrir como uma app no teu ambiente de trabalho e menu iniciar.'],
			other: ['Abre a <strong>Revisits Web</strong> com o Google Chrome ou Microsoft Edge.', 'Procura <strong>Instalar aplicação</strong> ou <strong>Adicionar ao ecrã principal</strong> no menu do navegador.', 'Confirma a instalação para usar a Revisits Web offline.']
		},
		nl: {
			btnLabel: 'Gebruiken op internet', modalTitle: 'Revisits Web installeren', openApp: 'Revisits Web openen', close: 'Sluiten',
			android: ['Open <strong>Revisits Web</strong> met Google Chrome.', 'Tik op het menu <strong>⋮</strong> (rechtsboven).', 'Kies <strong>App installeren</strong> (of <strong>Toevoegen aan startscherm</strong>).', 'Bevestig: het Revisits-icoon verschijnt op je startscherm.'],
			windows: ['Open <strong>Revisits Web</strong> met Microsoft Edge of Google Chrome.', 'Klik op het installatie-icoon in de adresbalk (of menu <strong>⋮</strong> &gt; Apps &gt; Deze site installeren als app).', 'Bevestig: Revisits Web opent als app op je bureaublad en startmenu.'],
			other: ['Open <strong>Revisits Web</strong> met Google Chrome of Microsoft Edge.', 'Zoek <strong>App installeren</strong> of <strong>Toevoegen aan startscherm</strong> in het browsermenu.', 'Bevestig de installatie om Revisits Web offline te gebruiken.']
		},
		el: {
			btnLabel: 'Χρήση στο Web', modalTitle: 'Εγκατάσταση Revisits Web', openApp: 'Άνοιγμα Revisits Web', close: 'Κλείσιμο',
			android: ['Άνοιξε το <strong>Revisits Web</strong> με το Google Chrome.', 'Πάτησε το μενού <strong>⋮</strong> (πάνω δεξιά).', 'Επίλεξε <strong>Εγκατάσταση εφαρμογής</strong> (ή <strong>Προσθήκη στην αρχική οθόνη</strong>).', 'Επιβεβαίωσε: το εικονίδιο Revisits θα εμφανιστεί στην αρχική οθόνη.'],
			windows: ['Άνοιξε το <strong>Revisits Web</strong> με Microsoft Edge ή Google Chrome.', 'Κάνε κλικ στο εικονίδιο εγκατάστασης στη γραμμή διεύθυνσης (ή μενού <strong>⋮</strong> &gt; Εφαρμογές &gt; Εγκατάσταση αυτού του ιστότοπου ως εφαρμογή).', 'Επιβεβαίωσε: το Revisits Web θα ανοίξει ως εφαρμογή στην επιφάνεια εργασίας και στο μενού έναρξης.'],
			other: ['Άνοιξε το <strong>Revisits Web</strong> με Google Chrome ή Microsoft Edge.', 'Αναζήτησε <strong>Εγκατάσταση εφαρμογής</strong> ή <strong>Προσθήκη στην αρχική οθόνη</strong> στο μενού του πρόγραμματος πλοήγησης.', 'Επιβεβαίωσε την εγκατάσταση για να χρησιμοποιείς το Revisits Web χωρίς σύνδεση.']
		},
		pl: {
			btnLabel: 'Użyj w przeglądarce', modalTitle: 'Zainstaluj Revisits Web', openApp: 'Otwórz Revisits Web', close: 'Zamknij',
			android: ['Otwórz <strong>Revisits Web</strong> w Google Chrome.', 'Dotknij menu <strong>⋮</strong> (w prawym górnym rogu).', 'Wybierz <strong>Zainstaluj aplikację</strong> (lub <strong>Dodaj do ekranu głównego</strong>).', 'Potwierdź: ikona Revisits pojawi się na ekranie głównym.'],
			windows: ['Otwórz <strong>Revisits Web</strong> w Microsoft Edge lub Google Chrome.', 'Kliknij ikonę instalacji na pasku adresu (lub menu <strong>⋮</strong> &gt; Aplikacje &gt; Zainstaluj tę witrynę jako aplikację).', 'Potwierdź: Revisits Web otworzy się jako aplikacja na pulpicie i w menu Start.'],
			other: ['Otwórz <strong>Revisits Web</strong> w Google Chrome lub Microsoft Edge.', 'Znajdź <strong>Zainstaluj aplikację</strong> lub <strong>Dodaj do ekranu głównego</strong> w menu przeglądarki.', 'Potwierdź instalację, aby korzystać z Revisits Web offline.']
		},
		ru: {
			btnLabel: 'Использовать в вебе', modalTitle: 'Установить Revisits Web', openApp: 'Открыть Revisits Web', close: 'Закрыть',
			android: ['Откройте <strong>Revisits Web</strong> в Google Chrome.', 'Нажмите меню <strong>⋮</strong> (вверху справа).', 'Выберите <strong>Установить приложение</strong> (или <strong>Добавить на главный экран</strong>).', 'Подтвердите: значок Revisits появится на главном экране.'],
			windows: ['Откройте <strong>Revisits Web</strong> в Microsoft Edge или Google Chrome.', 'Нажмите на значок установки в адресной строке (или меню <strong>⋮</strong> &gt; Приложения &gt; Установить этот сайт как приложение).', 'Подтвердите: Revisits Web откроется как приложение на рабочем столе и в меню Пуск.'],
			other: ['Откройте <strong>Revisits Web</strong> в Google Chrome или Microsoft Edge.', 'Найдите <strong>Установить приложение</strong> или <strong>Добавить на главный экран</strong> в меню браузера.', 'Подтвердите установку, чтобы пользоваться Revisits Web без интернета.']
		},
		tr: {
			btnLabel: 'Web’de kullan', modalTitle: 'Revisits Web’i yükle', openApp: 'Revisits Web’i aç', close: 'Kapat',
			android: ['<strong>Revisits Web</strong>’i Google Chrome ile aç.', '<strong>⋮</strong> menüsüne dokun (sağ üst).', '<strong>Uygulamayı yükle</strong> (veya <strong>Ana ekrana ekle</strong>) seçeneğini seç.', 'Onayla: Revisits simgesi ana ekranında görünecek.'],
			windows: ['<strong>Revisits Web</strong>’i Microsoft Edge veya Google Chrome ile aç.', 'Adres çubuğundaki yükleme simgesine tıkla (veya <strong>⋮</strong> menü &gt; Uygulamalar &gt; Bu siteyi uygulama olarak yükle).', 'Onayla: Revisits Web masaüstünde ve başlat menüsünde bir uygulama olarak açılacak.'],
			other: ['<strong>Revisits Web</strong>’i Google Chrome veya Microsoft Edge ile aç.', 'Tarayıcı menüsünde <strong>Uygulamayı yükle</strong> veya <strong>Ana ekrana ekle</strong> seçeneğini ara.', 'Revisits Web’i çevrimdışı kullanmak için yüklemeyi onayla.']
		},
		uk: {
			btnLabel: 'Використовувати в вебі', modalTitle: 'Встановити Revisits Web', openApp: 'Відкрити Revisits Web', close: 'Закрити',
			android: ['Відкрийте <strong>Revisits Web</strong> у Google Chrome.', 'Торкніть меню <strong>⋮</strong> (вгорі справа).', 'Оберіть <strong>Встановити додаток</strong> (або <strong>Додати на головний екран</strong>).', 'Підтвердьте: значок Revisits з’явиться на головному екрані.'],
			windows: ['Відкрийте <strong>Revisits Web</strong> у Microsoft Edge або Google Chrome.', 'Натисніть на значок встановлення в адресному рядку (або меню <strong>⋮</strong> &gt; Додатки &gt; Встановити цей сайт як додаток).', 'Підтвердьте: Revisits Web відкриється як додаток на робочому столі та в меню Пуск.'],
			other: ['Відкрийте <strong>Revisits Web</strong> у Google Chrome або Microsoft Edge.', 'Знайдіть <strong>Встановити додаток</strong> або <strong>Додати на головний екран</strong> у меню браузера.', 'Підтвердьте встановлення, щоб користуватися Revisits Web офлайн.']
		},
		vi: {
			btnLabel: 'Dùng trên Web', modalTitle: 'Cài đặt Revisits Web', openApp: 'Mở Revisits Web', close: 'Đóng',
			android: ['Mở <strong>Revisits Web</strong> bằng Google Chrome.', 'Chạm vào menu <strong>⋮</strong> (góc trên bên phải).', 'Chọn <strong>Cài đặt ứng dụng</strong> (hoặc <strong>Thêm vào màn hình chính</strong>).', 'Xác nhận: biểu tượng Revisits sẽ xuất hiện trên màn hình chính.'],
			windows: ['Mở <strong>Revisits Web</strong> bằng Microsoft Edge hoặc Google Chrome.', 'Nhấp vào biểu tượng cài đặt trên thanh địa chỉ (hoặc menu <strong>⋮</strong> &gt; Ứng dụng &gt; Cài đặt trang này như ứng dụng).', 'Xác nhận: Revisits Web sẽ mở như một ứng dụng trên màn hình nền và menu Start.'],
			other: ['Mở <strong>Revisits Web</strong> bằng Google Chrome hoặc Microsoft Edge.', 'Tìm <strong>Cài đặt ứng dụng</strong> hoặc <strong>Thêm vào màn hình chính</strong> trong menu trình duyệt.', 'Xác nhận cài đặt để dùng Revisits Web ngoại tuyến.']
		},
		th: {
			btnLabel: 'ใช้บนเว็บ', modalTitle: 'ติดตั้ง Revisits Web', openApp: 'เปิด Revisits Web', close: 'ปิด',
			android: ['เปิด <strong>Revisits Web</strong> ด้วย Google Chrome', 'แตะเมนู <strong>⋮</strong> (มุมขวาบน)', 'เลือก <strong>ติดตั้งแอปพลิเคชัน</strong> (หรือ <strong>เพิ่มลงหน้าจอหลัก</strong>)', 'ยืนยัน: ไอคอน Revisits จะปรากฏบนหน้าจอหลักของคุณ'],
			windows: ['เปิด <strong>Revisits Web</strong> ด้วย Microsoft Edge หรือ Google Chrome', 'คลิกไอคอนการติดตั้งในแถบที่อยู่ (หรือเมนู <strong>⋮</strong> &gt; แอปพลิเคชัน &gt; ติดตั้งเว็บไซต์นี้เป็นแอป)', 'ยืนยัน: Revisits Web จะเปิดเป็นแอปบนเดสก์ทอปและเมนูเริ่ม'],
			other: ['เปิด <strong>Revisits Web</strong> ด้วย Google Chrome หรือ Microsoft Edge', 'มองหา <strong>ติดตั้งแอปพลิเคชัน</strong> หรือ <strong>เพิ่มลงหน้าจอหลัก</strong> ในเมนูเบราว์เซอร์', 'ยืนยันการติดตั้งเพื่อใช้ Revisits Web แบบออฟไลน์']
		},
		id: {
			btnLabel: 'Gunakan di Web', modalTitle: 'Instal Revisits Web', openApp: 'Buka Revisits Web', close: 'Tutup',
			android: ['Buka <strong>Revisits Web</strong> dengan Google Chrome.', 'Ketuk menu <strong>⋮</strong> (kanan atas).', 'Pilih <strong>Instal aplikasi</strong> (atau <strong>Tambahkan ke layar utama</strong>).', 'Konfirmasi: ikon Revisits akan muncul di layar utama Anda.'],
			windows: ['Buka <strong>Revisits Web</strong> dengan Microsoft Edge atau Google Chrome.', 'Klik ikon instal di address bar (atau menu <strong>⋮</strong> &gt; Aplikasi &gt; Instal situs ini sebagai aplikasi).', 'Konfirmasi: Revisits Web akan terbuka sebagai aplikasi di desktop dan menu Start Anda.'],
			other: ['Buka <strong>Revisits Web</strong> dengan Google Chrome atau Microsoft Edge.', 'Cari <strong>Instal aplikasi</strong> atau <strong>Tambahkan ke layar utama</strong> di menu browser.', 'Konfirmasi instalasi untuk menggunakan Revisits Web secara offline.']
		},
		hi: {
			btnLabel: 'वेब पर उपयोग करें', modalTitle: 'Revisits Web इंस्टॉल करें', openApp: 'Revisits Web खोलें', close: 'बंद करें',
			android: ['<strong>Revisits Web</strong> को Google Chrome में खोलें।', '<strong>⋮</strong> मेनू पर टैप करें (स्क्रीन के ओर ऐओर)।', '<strong>ऐप इंस्टॉल करें</strong> (या <strong>होम स्क्रीन में जोड़ें</strong>) चुनें।', 'पुष्टि करें: Revisits आइकॉन आपकी होम स्क्रीन पर दिखाई देगा।'],
			windows: ['<strong>Revisits Web</strong> को Microsoft Edge या Google Chrome में खोलें।', 'एड्रेस बार में इंस्टॉल आइकॉन पर क्लिक करें (या <strong>⋮</strong> मेनू &gt; ऐप्स &gt; इस साइट को ऐप के रूप में इंस्टॉल करें)।', 'पुष्टि करें: Revisits Web आपके डेस्कटॉप और स्टार्ट मेनू में एक ऐप के रूप में खुलेगा।'],
			other: ['<strong>Revisits Web</strong> को Google Chrome या Microsoft Edge में खोलें।', 'ब्राउज़र मेनू में <strong>ऐप इंस्टॉल करें</strong> या <strong>होम स्क्रीन में जोड़ें</strong> खोजें।', 'Revisits Web को ऑफ़लाइन उपयोग करने के लिए इंस्टॉलेशन की पुष्टि करें।']
		},
		ja: {
			btnLabel: 'Webで使う', modalTitle: 'Revisits Webをインストール', openApp: 'Revisits Webを開く', close: '閉じる',
			android: ['<strong>Revisits Web</strong>をGoogle Chromeで開きます。', '右上の<strong>⋮</strong>メニューをタップします。', '<strong>アプリをインストール</strong>（または<strong>ホーム画面に追加</strong>）を選択します。', '確認: Revisitsのアイコンがホーム画面に表示されます。'],
			windows: ['<strong>Revisits Web</strong>をMicrosoft EdgeまたはGoogle Chromeで開きます。', 'アドレスバーのインストールアイコンをクリック（または<strong>⋮</strong>メニュー &gt; アプリ &gt; このサイトをアプリとしてインストール）します。', '確認: Revisits Webがデスクトップとスタートメニューにアプリとして表示されます。'],
			other: ['<strong>Revisits Web</strong>をGoogle ChromeまたはMicrosoft Edgeで開きます。', 'ブラウザーのメニューから<strong>アプリをインストール</strong>または<strong>ホーム画面に追加</strong>を探します。', 'Revisits Webをオフラインで使うにはインストールを確認してください。']
		},
		ko: {
			btnLabel: '웹에서 사용', modalTitle: 'Revisits Web 설치', openApp: 'Revisits Web 열기', close: '닫기',
			android: ['Google Chrome에서 <strong>Revisits Web</strong>을 엽니다.', '오른쪽 상단의 <strong>⋮</strong> 메뉴를 탭합니다.', '<strong>앱 설치</strong>(또는 <strong>홈 화면에 추가</strong>)를 선택합니다.', '확인: Revisits 아이콘이 홈 화면에 나타납니다.'],
			windows: ['Microsoft Edge 또는 Google Chrome에서 <strong>Revisits Web</strong>을 엽니다.', '주소창의 설치 아이콘을 클릭하거나 (<strong>⋮</strong> 메뉴 &gt; 앱 &gt; 이 사이트를 앱으로 설치) 합니다.', '확인: Revisits Web이 데스크톱과 시작 메뉴에 앱으로 열립니다.'],
			other: ['Google Chrome 또는 Microsoft Edge에서 <strong>Revisits Web</strong>을 엽니다.', '브라우저 메뉴에서 <strong>앱 설치</strong> 또는 <strong>홈 화면에 추가</strong>를 찾으세요.', 'Revisits Web을 오프라인에서 사용하려면 설치를 확인하세요.']
		}
	};

	function detectLanguage() {
		var supported = Object.keys(STRINGS);
		var candidates = (navigator.languages && navigator.languages.length) ? navigator.languages : [navigator.language || 'en'];
		for (var i = 0; i < candidates.length; i++) {
			var code = String(candidates[i]).slice(0, 2).toLowerCase();
			if (supported.indexOf(code) !== -1) return code;
		}
		return 'en';
	}

	// TEMPORARY (testing): set back to true to restore the App Store redirect on Apple devices.
	var APPLE_REDIRECT_ENABLED = false;

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

	document.addEventListener('DOMContentLoaded', function () {
		var lang = detectLanguage();
		var strings = STRINGS[lang] || STRINGS.en;

		var btn = document.getElementById('webVersionBtn');
		var modalLabel = document.getElementById('webInstallModalLabel');
		var openAppLink = document.getElementById('openRevisitsWebLink');
		var closeBtn = document.getElementById('webInstallCloseBtn');

		if (btn) btn.innerHTML = '<i class="fas fa-globe"></i> ' + strings.btnLabel;
		if (modalLabel) modalLabel.textContent = strings.modalTitle;
		if (openAppLink) openAppLink.textContent = strings.openApp;
		if (closeBtn) closeBtn.textContent = strings.close;

		if (!btn) return;

		btn.addEventListener('click', function () {
			var platform = detectPlatform();

			if (platform === 'apple' && APPLE_REDIRECT_ENABLED) {
				window.location.href = APP_STORE_URL;
				return;
			}

			if (platform === 'apple') {
				window.location.href = 'web/index.html';
				return;
			}

			var steps = strings[platform] || strings.other;
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
