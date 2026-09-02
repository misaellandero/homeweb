import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import {
  doc,
  getFirestore,
  serverTimestamp,
  setDoc,
} from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDiavYigucZvTnIL1I7O8FNcmqmoS-5hRU",
  authDomain: "misaellanderoweb.firebaseapp.com",
  projectId: "misaellanderoweb",
  storageBucket: "misaellanderoweb.firebasestorage.app",
  messagingSenderId: "982500585795",
  appId: "1:982500585795:web:1803f37658b9f654823ff6",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const form = document.querySelector("#waitlist-form");
const note = document.querySelector("#form-note");
const platformAll = document.querySelector("#platform-all");
const platformInputs = Array.from(document.querySelectorAll('input[name="platform"]'));
const specificPlatforms = platformInputs.filter((input) => input !== platformAll);
const submitButton = form?.querySelector("button[type='submit']");
const languageButtons = Array.from(document.querySelectorAll("[data-language]"));
const metaDescription = document.querySelector('meta[name="description"]');

const translations = {
  es: {
    documentTitle: "Cota Waitlist",
    description:
      "Cota es la app para cuidar a tus mascotas en iOS, web y Android. Unete a la waitlist para enterarte de la beta.",
    languageLabel: "Idioma",
    platformsLabel: "Plataformas",
    eyebrow: "Cota para iOS, web y Android",
    heroTitle: "Cuidado diario para tus mascotas, sin perder el ritmo.",
    lede:
      "Registra paseos, agua, comida, pipi, popo, vacunas y recordatorios. Estamos preparando la beta.",
    platformLegend: "Quiero recibir noticias de",
    allPlatforms: "Todas",
    emailLabel: "Correo electronico",
    emailPlaceholder: "tu@email.com",
    submitButton: "Unirme a la waitlist",
    savingButton: "Guardando...",
    initialStatus: "Te avisaremos cuando la beta esté lista para las plataformas que elijas.",
    emptyEmail: "Escribe tu correo para unirte a la waitlist.",
    savingStatus: "Guardando tu registro...",
    successWithPlatforms: "Listo. Guardamos tu correo para recibir noticias de: {platforms}.",
    successWithoutPlatforms:
      "Listo. Guardamos tu correo. Puedes elegir una plataforma si quieres recibir noticias mas precisas.",
    errorStatus:
      "No pudimos conectar con Firebase ahora. Guardamos una copia local para no perder tu registro.",
  },
  en: {
    documentTitle: "Cota Waitlist",
    description:
      "Cota is the pet care app for iOS, web, and Android. Join the waitlist to hear about the beta.",
    languageLabel: "Language",
    platformsLabel: "Platforms",
    eyebrow: "Cota for iOS, web, and Android",
    heroTitle: "Daily care for your pets, without losing track.",
    lede:
      "Track walks, water, food, pee, poop, vaccines, and reminders. We are preparing the beta.",
    platformLegend: "I want updates about",
    allPlatforms: "All",
    emailLabel: "Email address",
    emailPlaceholder: "you@email.com",
    submitButton: "Join waitlist",
    savingButton: "Saving...",
    initialStatus: "We will let you know when the beta is ready for the platforms you choose.",
    emptyEmail: "Enter your email to join the waitlist.",
    savingStatus: "Saving your registration...",
    successWithPlatforms: "Done. We saved your email for updates about: {platforms}.",
    successWithoutPlatforms:
      "Done. We saved your email. You can choose a platform if you want more specific updates.",
    errorStatus:
      "We could not connect to Firebase right now. A local copy was saved so your registration is not lost.",
  },
};

let currentLanguage = getInitialLanguage();

function getInitialLanguage() {
  const savedLanguage = localStorage.getItem("cota-language");
  if (savedLanguage === "en" || savedLanguage === "es") return savedLanguage;
  return navigator.language && navigator.language.toLowerCase().startsWith("en") ? "en" : "es";
}

function t(key, replacements = {}) {
  let value = translations[currentLanguage][key] || translations.es[key] || "";
  Object.entries(replacements).forEach(([name, replacement]) => {
    value = value.replace("{" + name + "}", replacement);
  });
  return value;
}

function applyLanguage(language) {
  currentLanguage = language === "en" ? "en" : "es";
  localStorage.setItem("cota-language", currentLanguage);
  document.documentElement.lang = currentLanguage;
  document.title = t("documentTitle");
  if (metaDescription) metaDescription.content = t("description");

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    element.textContent = t(element.dataset.i18n);
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
    element.placeholder = t(element.dataset.i18nPlaceholder);
  });
  document.querySelectorAll("[data-i18n-aria-label]").forEach((element) => {
    element.setAttribute("aria-label", t(element.dataset.i18nAriaLabel));
  });

  languageButtons.forEach((button) => {
    const isSelected = button.dataset.language === currentLanguage;
    button.setAttribute("aria-pressed", String(isSelected));
  });
}

function setStatus(message, type = "neutral") {
  if (!note) return;
  note.textContent = message;
  note.dataset.status = type;
}

function setSubmitting(isSubmitting) {
  if (!submitButton) return;
  submitButton.disabled = isSubmitting;
  submitButton.textContent = isSubmitting ? t("savingButton") : t("submitButton");
}

function normalizeEmail(email) {
  return String(email || "").trim().toLowerCase();
}

async function createEmailId(email) {
  const bytes = new TextEncoder().encode(email);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

function getSelectedPlatforms(data) {
  return data.getAll("platform").filter((platform) => platform !== "All");
}

function saveLocalCopy(email, platforms) {
  localStorage.setItem("cota-waitlist-email", email);
  localStorage.setItem("cota-waitlist-platforms", JSON.stringify(platforms));
}

languageButtons.forEach((button) => {
  button.addEventListener("click", () => {
    applyLanguage(button.dataset.language);
    setStatus(t("initialStatus"), "neutral");
  });
});

platformAll?.addEventListener("change", () => {
  specificPlatforms.forEach((input) => {
    input.checked = platformAll.checked;
  });
});

specificPlatforms.forEach((input) => {
  input.addEventListener("change", () => {
    if (!platformAll) return;
    platformAll.checked = specificPlatforms.every((item) => item.checked);
  });
});

form?.addEventListener("submit", async (event) => {
  event.preventDefault();
  const data = new FormData(form);
  const email = normalizeEmail(data.get("email"));
  const platforms = getSelectedPlatforms(data);

  if (!email) {
    setStatus(t("emptyEmail"), "error");
    return;
  }

  setSubmitting(true);
  setStatus(t("savingStatus"), "neutral");

  try {
    const emailId = await createEmailId(email);
    await setDoc(
      doc(db, "cotaWaitlist", emailId),
      {
        email,
        platforms,
        source: "cota-web",
        language: currentLanguage,
        page: window.location.pathname,
        locale: navigator.language || "",
        userAgent: navigator.userAgent || "",
        updatedAt: serverTimestamp(),
        submittedAt: serverTimestamp(),
      },
      { merge: true }
    );

    saveLocalCopy(email, platforms);
    setStatus(
      platforms.length
        ? t("successWithPlatforms", { platforms: platforms.join(", ") })
        : t("successWithoutPlatforms"),
      "success"
    );
    form.reset();
    if (platformAll) platformAll.checked = false;
  } catch (error) {
    console.error("Error saving Cota waitlist", error);
    saveLocalCopy(email, platforms);
    setStatus(t("errorStatus"), "error");
  } finally {
    setSubmitting(false);
  }
});

applyLanguage(currentLanguage);
