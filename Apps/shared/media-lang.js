// Selector ES/EN para galerías y videos de las páginas de apps.
// Botones: [data-media-lang-btn="es|en"]. Bloques: [data-media-lang="es|en"].
(function () {
  var KEY = 'app-media-lang';
  function guardado() {
    try { return localStorage.getItem(KEY); } catch (e) { return null; }
  }
  function aplicar(lang) {
    document.querySelectorAll('[data-media-lang]').forEach(function (el) {
      var activo = el.getAttribute('data-media-lang') === lang;
      el.hidden = !activo;
      if (!activo) el.querySelectorAll('video').forEach(function (v) { v.pause(); });
    });
    document.querySelectorAll('[data-media-lang-btn]').forEach(function (b) {
      b.setAttribute('aria-pressed', String(b.getAttribute('data-media-lang-btn') === lang));
    });
    try { localStorage.setItem(KEY, lang); } catch (e) {}
  }
  document.addEventListener('click', function (e) {
    var b = e.target.closest('[data-media-lang-btn]');
    if (b) aplicar(b.getAttribute('data-media-lang-btn'));
  });
  var inicial = guardado() || ((navigator.language || 'en').toLowerCase().indexOf('es') === 0 ? 'es' : 'en');
  aplicar(inicial);
})();
