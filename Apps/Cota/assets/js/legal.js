// Language switch for the Cota legal pages. Each page carries both languages
// as [data-lang-block="es|en"] articles; this shows one and remembers the choice.
// Order of preference: ?lang= in the URL, saved choice, browser language, Spanish.

const SUPPORTED = ["es", "en"];
const STORAGE_KEY = "cota-language"; // shared with the landing page (waitlist.js)

function initialLanguage() {
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
  const title = document.querySelector(`[data-lang-block="${lang}"] h1`);
  if (title) document.title = `${title.textContent} · +Cota`;
  try {
    localStorage.setItem(STORAGE_KEY, lang);
  } catch {}
}

document.querySelectorAll("[data-language]").forEach((button) => {
  button.addEventListener("click", () => applyLanguage(button.dataset.language));
});

applyLanguage(initialLanguage());
