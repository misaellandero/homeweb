// Language switch for the Baruch pages (landing and legal). Each page carries both languages
// as [data-lang-block="es|en"] articles; this shows one and remembers the choice.
// Order of preference: ?lang= in the URL, saved choice, browser language, Spanish.

const SUPPORTED = ["es", "en"];
const STORAGE_KEY = "baruch-language";

// Section anchors exist once per language; a hash like #privacy picks English.
function languageOfHash() {
  if (!location.hash) return null;
  const target = document.getElementById(decodeURIComponent(location.hash.slice(1)));
  const block = target?.closest("[data-lang-block]");
  return block ? block.dataset.langBlock : null;
}

function scrollToHash() {
  if (!location.hash) return;
  const target = document.getElementById(decodeURIComponent(location.hash.slice(1)));
  if (target && !target.closest("[hidden]")) target.scrollIntoView();
}

function initialLanguage() {
  const fromHash = languageOfHash();
  if (SUPPORTED.includes(fromHash)) return fromHash;
  const fromQuery = new URLSearchParams(location.search).get("lang");
  if (SUPPORTED.includes(fromQuery)) return fromQuery;
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (SUPPORTED.includes(saved)) return saved;
  } catch {}
  const browser = (navigator.language || "es").slice(0, 2).toLowerCase();
  return SUPPORTED.includes(browser) ? browser : "es";
}

function applyLanguage(lang) {
  document.documentElement.lang = lang;
  document.querySelectorAll("[data-lang-block]").forEach((block) => {
    block.hidden = block.dataset.langBlock !== lang;
  });
  document.querySelectorAll("[data-language]").forEach((button) => {
    button.setAttribute("aria-pressed", String(button.dataset.language === lang));
  });
  document.title = lang === "en" ? "Baruch · Congregation Secretary" : "Baruch · Secretario de congregación";
  try {
    localStorage.setItem(STORAGE_KEY, lang);
  } catch {}
}

document.querySelectorAll("[data-language]").forEach((button) => {
  button.addEventListener("click", () => applyLanguage(button.dataset.language));
});

applyLanguage(initialLanguage());
scrollToHash();
window.addEventListener("hashchange", () => {
  const lang = languageOfHash();
  if (lang && lang !== document.documentElement.lang) applyLanguage(lang);
  scrollToHash();
});
