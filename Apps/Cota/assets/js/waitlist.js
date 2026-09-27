import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import {
  doc,
  getDoc,
  getFirestore,
  increment,
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

const statsTotalEl = document.querySelector("#stats-total");
const statsPlatformEls = {
  iOS: document.querySelector("#stats-ios"),
  Web: document.querySelector("#stats-web"),
  Android: document.querySelector("#stats-android"),
  "iOS Beta": document.querySelector("#stats-ios-beta"),
};

const PLATFORM_STAT_KEYS = {
  iOS: "ios",
  Web: "web",
  Android: "android",
  "iOS Beta": "iosBeta",
};

const translations = {
  es: {
    documentTitle: "+Cota · Cuidado diario para tus mascotas",
    description:
      "+Cota te ayuda a cuidar a tus mascotas todos los días: paseos, agua, comida, pipí, popó, vacunas, estética y recordatorios, en iPhone, iPad y Mac.",
    languageLabel: "Idioma",
    platformsLabel: "Plataformas",
    eyebrow: "+Cota para iPhone, iPad y Mac",
    heroTitle: "Cuidado diario para tus mascotas, sin perder el ritmo.",
    lede:
      "Registra paseos, agua, comida, pipí y popó; lleva sus vacunas y citas de estética, y recibe recordatorios a tiempo. Todo privado, en tu iPhone.",
    platformLegend: "Quiero recibir noticias de",
    platformIosBeta: "iOS beta (TestFlight)",
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
    statsTotalLabel: "personas en la waitlist",
    privacyLink: "Aviso de privacidad",
    termsLink: "Términos de uso",
    appStoreCta: "Descárgala en el App Store",
    appStoreNote: "Muy pronto en el App Store · 7 días gratis",
    featuresEyebrow: "Funciones",
    featuresTitle: "Todo lo que tu mascota necesita, en un solo lugar",
    featuresLede: "Desde el primer paseo del día hasta su próxima vacuna, +Cota te ayuda a no olvidar nada.",
    f1Title: "Anillos diarios",
    f1Body: "Paseos, pipí, popó y agua con metas para cada mascota. Registra con un toque o desde el widget.",
    f2Title: "Paseos en vivo",
    f2Body: "Traza la ruta, cuenta pasos y registra pipí, popó, agua y fotos, incluso desde la Dynamic Island.",
    f3Title: "Vacunas y salud",
    f3Body: "Historial médico, recordatorios de vacunas y desparasitación, y escaneo de la cartilla de vacunación.",
    f4Title: "Estética",
    f4Body: "Baños, cortes y uñas con citas que se repiten solas cada pocas semanas.",
    f5Title: "Reino de Dominio",
    f5Body: "Cada pipí durante un paseo conquista territorio en el mapa. ¿Qué tan grande es el reino de tu perro?",
    f6Title: "Apple Intelligence",
    f6Body: "Sugerencias de metas, revisión de alimentos y un asistente veterinario, procesados en tu dispositivo.",
    f7Title: "Widgets",
    f7Body: "Anillos de actividad y próximos cuidados en tu pantalla de inicio y de bloqueo.",
    f8Title: "Sincronización privada",
    f8Body: "Con Cota+, tus datos viajan entre tu iPhone, iPad y Mac por tu propio iCloud.",
    privacyEyebrow: "Privacidad",
    privacyTitle: "Los datos de tu mascota son tuyos",
    privacyCta: "Leer el aviso de privacidad",
    privacyPoint1: "Sin cuentas ni servidores propios para tus datos",
    privacyPoint2: "Sin anuncios y sin rastreo",
    privacyPoint3: "La IA funciona en tu dispositivo",
    privacyPoint4: "Sincronización solo por tu iCloud privado",
    plusTitle: "Empieza con 7 días gratis",
    plusLede: "Todas las funciones, mascotas ilimitadas y sincronización con iCloud. Elige el plan que te acomode.",
    planBest: "Mejor precio",
    planAnnual: "Anual",
    planAnnualBody: "El mejor precio por mes. Incluye 7 días gratis.",
    planMonthly: "Mensual",
    planMonthlyBody: "Paga mes a mes. Incluye 7 días gratis.",
    planWeekly: "Semanal",
    planWeeklyBody: "Para probar por poco tiempo, sin compromiso.",
    plusFinePrint: "Los precios se muestran en la app según tu país. La suscripción se renueva automáticamente; cancela cuando quieras desde los ajustes de tu cuenta de Apple.",
    waitlistEyebrow: "Lista de espera",
    waitlistTitle: "¿Usas Android o prefieres la web?",
    waitlistLede: "Únete a la lista y te avisamos cuando +Cota llegue a tu plataforma.",
    footerMadeBy: "+Cota, hecha con cariño por Misael Landero",
    footerContact: "Contacto",
  },
  en: {
    documentTitle: "+Cota · Daily care for your pets",
    description:
      "+Cota helps you care for your pets every day: walks, water, food, pee, poop, vaccines, grooming and reminders, on iPhone, iPad and Mac.",
    languageLabel: "Language",
    platformsLabel: "Platforms",
    eyebrow: "+Cota for iPhone, iPad and Mac",
    heroTitle: "Daily care for your pets, without losing track.",
    lede:
      "Track walks, water, food, pee and poop; keep their vaccines and grooming appointments, and get reminders on time. All private, on your iPhone.",
    platformLegend: "I want updates about",
    platformIosBeta: "iOS beta (TestFlight)",
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
    statsTotalLabel: "people on the waitlist",
    privacyLink: "Privacy Policy",
    termsLink: "Terms of Use",
    appStoreCta: "Download on the App Store",
    appStoreNote: "Coming soon to the App Store · 7 days free",
    featuresEyebrow: "Features",
    featuresTitle: "Everything your pet needs, in one place",
    featuresLede: "From the first walk of the day to their next vaccine, +Cota helps you remember it all.",
    f1Title: "Daily rings",
    f1Body: "Walks, pee, poop and water with goals for each pet. Log with one tap or from the widget.",
    f2Title: "Live Walks",
    f2Body: "Trace the route, count steps and log pee, poop, water and photos, even from the Dynamic Island.",
    f3Title: "Vaccines & health",
    f3Body: "Medical history, vaccine and deworming reminders, and vaccination card scanning.",
    f4Title: "Grooming",
    f4Body: "Baths, haircuts and nails with appointments that repeat on their own every few weeks.",
    f5Title: "Kingdom of Dominion",
    f5Body: "Every pee during a walk claims territory on the map. How big is your dog's kingdom?",
    f6Title: "Apple Intelligence",
    f6Body: "Goal suggestions, food checks and a vet assistant, processed on your device.",
    f7Title: "Widgets",
    f7Body: "Activity rings and upcoming care on your Home Screen and Lock Screen.",
    f8Title: "Private sync",
    f8Body: "With Cota+, your data moves between your iPhone, iPad and Mac through your own iCloud.",
    privacyEyebrow: "Privacy",
    privacyTitle: "Your pet's data is yours",
    privacyCta: "Read the Privacy Policy",
    privacyPoint1: "No accounts and no servers of our own for your data",
    privacyPoint2: "No ads and no tracking",
    privacyPoint3: "AI runs on your device",
    privacyPoint4: "Sync only through your private iCloud",
    plusTitle: "Start with 7 days free",
    plusLede: "Every feature, unlimited pets and iCloud sync. Pick the plan that suits you.",
    planBest: "Best value",
    planAnnual: "Annual",
    planAnnualBody: "The best price per month. Includes 7 days free.",
    planMonthly: "Monthly",
    planMonthlyBody: "Pay month to month. Includes 7 days free.",
    planWeekly: "Weekly",
    planWeeklyBody: "To try it for a short time, no commitment.",
    plusFinePrint: "Prices are shown in the app for your country. The subscription renews automatically; cancel anytime in your Apple Account settings.",
    waitlistEyebrow: "Waitlist",
    waitlistTitle: "On Android or prefer the web?",
    waitlistLede: "Join the list and we'll let you know when +Cota comes to your platform.",
    footerMadeBy: "+Cota, made with love by Misael Landero",
    footerContact: "Contact",
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

function renderStats(stats) {
  if (statsTotalEl) statsTotalEl.textContent = stats.total || 0;
  Object.entries(statsPlatformEls).forEach(([platform, element]) => {
    if (element) element.textContent = stats[PLATFORM_STAT_KEYS[platform]] || 0;
  });
}

async function loadStats() {
  try {
    const statsSnap = await getDoc(doc(db, "cotaWaitlistStats", "summary"));
    renderStats(statsSnap.exists() ? statsSnap.data() : {});
  } catch (error) {
    console.error("Error loading Cota waitlist stats", error);
  }
}

async function readPreviousEntry(entryRef) {
  try {
    const snap = await getDoc(entryRef);
    return {
      exists: snap.exists(),
      platforms: snap.exists() ? snap.data().platforms || [] : [],
      submittedAt: snap.exists() ? snap.data().submittedAt : null,
    };
  } catch (error) {
    // Reading is optional: older Firestore rules may deny it. The waitlist
    // entry itself must still save, so treat this as "unknown" and skip stats.
    console.warn("Could not read previous Cota waitlist entry; stats update will be skipped.", error);
    return null;
  }
}

function updateStats(previousEntry, platforms) {
  const statsUpdate = {};
  if (!previousEntry.exists) statsUpdate.total = increment(1);
  platforms
    .filter((platform) => !previousEntry.platforms.includes(platform))
    .forEach((platform) => {
      statsUpdate[PLATFORM_STAT_KEYS[platform]] = increment(1);
    });
  previousEntry.platforms
    .filter((platform) => !platforms.includes(platform))
    .forEach((platform) => {
      statsUpdate[PLATFORM_STAT_KEYS[platform]] = increment(-1);
    });

  if (!Object.keys(statsUpdate).length) return Promise.resolve();
  return setDoc(doc(db, "cotaWaitlistStats", "summary"), statsUpdate, { merge: true });
}

async function submitToWaitlist(email, platforms, emailId) {
  const entryRef = doc(db, "cotaWaitlist", emailId);
  const previousEntry = await readPreviousEntry(entryRef);

  await setDoc(
    entryRef,
    {
      email,
      platforms,
      source: "cota-web",
      language: currentLanguage,
      page: window.location.pathname,
      locale: navigator.language || "",
      userAgent: navigator.userAgent || "",
      updatedAt: serverTimestamp(),
      submittedAt: previousEntry?.exists ? previousEntry.submittedAt : serverTimestamp(),
    },
    { merge: true }
  );

  if (previousEntry) {
    updateStats(previousEntry, platforms).catch((error) => {
      console.warn("Cota waitlist stats not updated (check Firestore rules).", error);
    });
  }
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
    await submitToWaitlist(email, platforms, emailId);

    saveLocalCopy(email, platforms);
    setStatus(
      platforms.length
        ? t("successWithPlatforms", { platforms: platforms.join(", ") })
        : t("successWithoutPlatforms"),
      "success"
    );
    form.reset();
    if (platformAll) platformAll.checked = false;
    loadStats();
  } catch (error) {
    console.error("Error saving Cota waitlist", error);
    saveLocalCopy(email, platforms);
    setStatus(t("errorStatus"), "error");
  } finally {
    setSubmitting(false);
  }
});

applyLanguage(currentLanguage);
loadStats();
