// Klenny web pages (index, privacy, terms).
// 1. EN/ES: elements carry data-lang="en|es" (text) or data-media-lang="en|es" (video and
//    screenshots); only the active language is shown. Buttons: [data-lang-btn]. Attributes are
//    swapped from data-<attr>-en / data-<attr>-es (alt, title, aria-label, content).
//    Order: ?lang= in the URL, saved choice, browser language, English.
// 2. DMG: the only download URL is #dmg-link's href. File name, version and the
//    "download again" link are read from it, so a release changes one string.
// 3. Install guide: starting a download moves #install-guide into #guide-dialog (modal).
//    Closing puts it back in the page.
(function () {
  'use strict';
  var SUPPORTED = ['en', 'es'];
  var KEY = 'klenny-lang';
  var MEDIA_KEY = 'app-media-lang'; // shared with ../shared/media-lang.js on other app pages
  var ATTRS = ['alt', 'title', 'aria-label', 'content'];
  var root = document.documentElement;

  function load(key) { try { return localStorage.getItem(key); } catch (e) { return null; } }
  function save(key, value) { try { localStorage.setItem(key, value); } catch (e) {} }

  function initialLanguage() {
    var query = null;
    try { query = new URLSearchParams(location.search).get('lang'); } catch (e) {}
    if (SUPPORTED.indexOf(query) >= 0) return query;
    var saved = load(KEY);
    if (SUPPORTED.indexOf(saved) >= 0) return saved;
    return (navigator.language || 'en').toLowerCase().indexOf('es') === 0 ? 'es' : 'en';
  }

  function applyLanguage(lang) {
    root.lang = lang;
    document.querySelectorAll('[data-lang], [data-media-lang]').forEach(function (el) {
      var on = (el.getAttribute('data-lang') || el.getAttribute('data-media-lang')) === lang;
      // toggleAttribute (not .hidden) so it also works on SVG <text>.
      el.toggleAttribute('hidden', !on);
      if (!on) {
        if (el.tagName === 'VIDEO') el.pause();
        el.querySelectorAll('video').forEach(function (v) { v.pause(); });
      }
    });
    ATTRS.forEach(function (attr) {
      document.querySelectorAll('[data-' + attr + '-' + lang + ']').forEach(function (el) {
        el.setAttribute(attr, el.getAttribute('data-' + attr + '-' + lang));
      });
    });
    var title = root.getAttribute('data-title-' + lang);
    if (title) document.title = title;
    document.querySelectorAll('[data-lang-btn]').forEach(function (b) {
      b.setAttribute('aria-pressed', String(b.getAttribute('data-lang-btn') === lang));
    });
    save(KEY, lang);
    save(MEDIA_KEY, lang);
    playVisibleVideos();
  }

  // --- Promo video: muted autoplay of the visible language only ------------------------------
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var portrait = window.matchMedia && window.matchMedia('(max-width: 640px)').matches;
  document.querySelectorAll('video[data-poster-portrait]').forEach(function (v) {
    if (portrait) v.setAttribute('poster', v.getAttribute('data-poster-portrait'));
  });
  function playVisibleVideos() {
    if (reduceMotion) return; // controls stay available; nothing moves on its own
    document.querySelectorAll('video[data-autoplay]').forEach(function (v) {
      if (v.hasAttribute('hidden')) return;
      v.muted = true;
      var playing = v.play();
      if (playing && playing.catch) playing.catch(function () {});
    });
  }

  // --- Mac App Store link: one URL in <html data-app-store-url>; hidden while empty ----------
  var storeURL = root.getAttribute('data-app-store-url');
  if (storeURL) {
    document.querySelectorAll('[data-app-store]').forEach(function (a) {
      a.setAttribute('href', storeURL);
      a.removeAttribute('hidden');
    });
  }

  document.addEventListener('click', function (e) {
    var b = e.target.closest('[data-lang-btn]');
    if (b) applyLanguage(b.getAttribute('data-lang-btn'));
  });
  applyLanguage(initialLanguage());

  // --- DMG link -----------------------------------------------------------------------------
  var dmg = document.getElementById('dmg-link');
  if (!dmg) return; // legal pages stop here

  var file = dmg.getAttribute('href').split('/').pop();
  var match = /^Klenny-(.+)\.dmg$/.exec(file);
  document.querySelectorAll('[data-dmg-file]').forEach(function (el) { el.textContent = file; });
  if (match) document.querySelectorAll('[data-dmg-version]').forEach(function (el) { el.textContent = match[1]; });
  document.querySelectorAll('[data-dmg-again]').forEach(function (a) {
    a.setAttribute('href', dmg.getAttribute('href'));
    a.setAttribute('download', '');
  });

  // --- Install guide dialog -----------------------------------------------------------------
  var dialog = document.getElementById('guide-dialog');
  var guide = document.getElementById('install-guide');
  var slot = dialog && dialog.querySelector('[data-guide-slot]');
  var canModal = dialog && guide && slot && typeof dialog.showModal === 'function';
  var marker = document.createComment('install-guide');
  var opener = null;
  var restoreFocus = true;

  function openGuide(from) {
    if (!canModal) {
      // Old browsers: just scroll to the guide in the page.
      setTimeout(function () { location.hash = '#install'; }, 0);
      return;
    }
    if (dialog.open) return;
    opener = from || document.activeElement;
    restoreFocus = true;
    guide.parentNode.insertBefore(marker, guide);
    slot.appendChild(guide);
    root.classList.add('guide-open');
    dialog.showModal();
    dialog.scrollTop = 0;
  }

  dialog && dialog.addEventListener('close', function () {
    if (marker.parentNode) marker.parentNode.replaceChild(guide, marker);
    root.classList.remove('guide-open');
    if (restoreFocus && opener && opener.focus) opener.focus({ preventScroll: true });
  });

  dialog && dialog.addEventListener('click', function (e) {
    if (e.target === dialog) { dialog.close(); return; } // backdrop
    if (e.target.closest('[data-guide-close]')) { dialog.close(); return; }
    var link = e.target.closest('a[href^="#"]');
    if (link && !link.hasAttribute('data-dmg-again')) {
      restoreFocus = false; // let the in-page link take the user there
      dialog.close();
    }
  });

  // The real link downloads natively; we only add the guide on top.
  dmg.addEventListener('click', function () { openGuide(dmg); });

  // Other "Download" buttons start the same download, then show the guide.
  document.querySelectorAll('[data-start-download]').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      var a = document.createElement('a');
      a.href = dmg.href;
      a.setAttribute('download', '');
      a.hidden = true;
      document.body.appendChild(a);
      a.click();
      a.remove();
      openGuide(btn);
    });
  });
})();
