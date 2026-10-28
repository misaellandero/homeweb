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
      "Organiza paseos, metas diarias, vacunas y citas de tus mascotas. +Cota guarda sus registros en tu dispositivo y, con Cota+, los sincroniza en tu iCloud privado.",
    languageLabel: "Idioma",
    navLabel: "Secciones",
    navSetup: "Primeros pasos",
    navFeatures: "Funciones",
    navPrivacy: "Privacidad",
    navPlus: "Cota+",
    navWaitlist: "Lista de espera",
    platformsLabel: "Plataformas",
    eyebrow: "+Cota para iPhone, iPad y Mac",
    heroTitle: "Cuida su rutina. No pierdas de vista su salud.",
    lede:
      "Registra paseos y metas diarias; organiza vacunas, citas y documentos. Recibe recordatorios y consulta el progreso de cada mascota. Sus registros permanecen en tu dispositivo o, con Cota+, se sincronizan en tu iCloud privado.",
    setupEyebrow: "Primeros pasos",
    setupTitle: "Configura lo esencial en unos minutos.",
    setupLede: "Crea un perfil, organiza sus cuidados y elige qué quieres seguir cada día.",
    setupProfileTitle: "Crea su perfil",
    setupProfileBody: "Registra vacunas, desparasitación y citas de estética. Si está disponible, importa vacunas anteriores desde una cartilla.",
    setupGoalsTitle: "Elige sus metas",
    setupGoalsBody: "Configura objetivos diarios y selecciona qué anillos quieres ver en Daily y en tus widgets.",
    setupRoutineTitle: "Programa recordatorios",
    setupRoutineBody: "Organiza horarios para paseos y comidas, y recibe avisos cuando se acerquen los próximos cuidados.",
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
    appStoreNote: "Muy pronto en el App Store · prueba gratis en planes elegibles",
    featuresEyebrow: "Funciones",
    featuresTitle: "Todo lo que tu mascota necesita, en un solo lugar",
    featuresLede: "Desde las rutinas de cada día hasta las próximas citas, organiza el cuidado de tus mascotas en un solo lugar.",
    f1Title: "Metas y anillos diarios",
    f1Body: "Registra paseos, pipí, popó, agua y cepillado dental con objetivos para cada mascota.",
    f2Title: "Paseos en vivo",
    f2Body: "Traza la ruta, cuenta pasos y registra pipí, popó, agua y fotos, incluso desde la Dynamic Island.",
    f3Title: "Vacunas y salud",
    f3Body: "Organiza el historial médico y los recordatorios; escanea cartillas para importar vacunas anteriores cuando Apple Intelligence esté disponible.",
    f4Title: "Estética",
    f4Body: "Baños, cortes y uñas con citas que se repiten solas cada pocas semanas.",
    f5Title: "Reino de Dominio",
    f5Body: "Cada pipí durante un paseo conquista territorio en el mapa. ¿Qué tan grande es el reino de tu perro?",
    f6Title: "Apple Intelligence",
    f6Body: "Revisa alimentos, sugiere metas y prepara un plan de cuidados veterinarios en el dispositivo, cuando sea compatible.",
    f7Title: "Widgets",
    f7Body: "Anillos de actividad y próximos cuidados en tu pantalla de inicio y de bloqueo.",
    f8Title: "Sincronización privada",
    f8Body: "Con Cota+, sincroniza tus datos entre dispositivos Apple mediante tu iCloud privado.",
    f9Title: "Próximos cuidados",
    f9Body: "Consulta cuidados vencidos y programados junto con las rutinas y recordatorios de cada mascota.",
    f10Title: "Salud reproductiva",
    f10Body: "Registra observaciones y seguimientos veterinarios para perros. +Cota no predice fertilidad.",
    f11Title: "Hazla tuya",
    f11Body: "Elige tus anillos, ordena acciones rápidas y personaliza el icono y el arte de la app.",
    f12Title: "Fotos, documentos e informes",
    f12Body: "Adjunta archivos a los registros y exporta un informe de salud para compartirlo con tu veterinario.",
    privacyEyebrow: "Privacidad",
    privacyTitle: "La información de tus mascotas es tuya",
    privacyCta: "Leer el aviso de privacidad",
    termsCta: "Leer los términos de uso",
    privacyPoint1: "No necesitas una cuenta; tus registros no se guardan en servidores propios",
    privacyPoint2: "Sin anuncios y sin rastreo",
    privacyPoint3: "Apple Intelligence procesa la IA en tu dispositivo",
    privacyPoint4: "Cota+ sincroniza mediante tu iCloud privado",
    plusTitle: "Más mascotas, sincronización privada",
    plusLede: "El plan gratis incluye una mascota. Cota+ agrega mascotas ilimitadas y sincronización privada con iCloud.",
    planBest: "Mejor precio mensual",
    planAnnual: "Anual",
    planAnnualBody: "El mejor precio por mes. Prueba gratis de 7 días si eres elegible.",
    planMonthly: "Mensual",
    planMonthlyBody: "Pago mes a mes. Prueba gratis de 7 días si eres elegible.",
    planWeekly: "Semanal",
    planWeeklyBody: "Pago semanal. Prueba gratis si tu cuenta y el plan son elegibles.",
    plusFinePrint: "Los precios dependen del país. Las cuentas y los planes elegibles incluyen 7 días gratis. Cota+ se renueva automáticamente; administra o cancela tu suscripción desde los ajustes de tu cuenta de Apple.",
    waitlistEyebrow: "Lista de espera",
    waitlistTitle: "¿Usas Android o prefieres la web?",
    waitlistLede: "Únete a la lista y te avisamos cuando +Cota llegue a tu plataforma.",
    footerMadeBy: "+Cota, hecha con cariño por Misael Landero",
    footerContact: "Contacto",
  },
  en: {
    documentTitle: "+Cota · Daily care for your pets",
    description:
      "Organize walks, daily goals, vaccines and appointments for your pets. +Cota keeps pet records on your device and, with Cota+, syncs them through your private iCloud.",
    languageLabel: "Language",
    navLabel: "Sections",
    navSetup: "Getting started",
    navFeatures: "Features",
    navPrivacy: "Privacy",
    navPlus: "Cota+",
    navWaitlist: "Waitlist",
    platformsLabel: "Platforms",
    eyebrow: "+Cota for iPhone, iPad and Mac",
    heroTitle: "Keep their routine. Stay on top of their health.",
    lede:
      "Track walks and daily goals; organize vaccines, appointments and documents. Get reminders and see each pet's progress. Their records stay on your device or, with Cota+, sync through your private iCloud.",
    setupEyebrow: "Getting started",
    setupTitle: "Set up the essentials in minutes.",
    setupLede: "Create a profile, organize care and choose what you want to track each day.",
    setupProfileTitle: "Create a profile",
    setupProfileBody: "Add vaccine and deworming dates and grooming appointments. If available, import past vaccinations from a card.",
    setupGoalsTitle: "Choose daily goals",
    setupGoalsBody: "Set daily targets and choose which activity rings appear in Daily and your widgets.",
    setupRoutineTitle: "Schedule reminders",
    setupRoutineBody: "Set meal and walk times, and get reminders as upcoming care comes due.",
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
    appStoreNote: "Coming soon to the App Store · free trial on eligible plans",
    featuresEyebrow: "Features",
    featuresTitle: "Everything your pet needs, in one place",
    featuresLede: "Organize everything from daily routines to upcoming appointments for every pet.",
    f1Title: "Daily goals and rings",
    f1Body: "Track walks, pee, poop, water and tooth brushing with goals for each pet.",
    f2Title: "Live Walks",
    f2Body: "Trace the route, count steps and log pee, poop, water and photos, even from the Dynamic Island.",
    f3Title: "Vaccines & health",
    f3Body: "Organize medical history and reminders; scan vaccination cards to import past vaccines when Apple Intelligence is available.",
    f4Title: "Grooming",
    f4Body: "Baths, haircuts and nails with appointments that repeat on their own every few weeks.",
    f5Title: "Kingdom of Dominion",
    f5Body: "Every pee during a walk claims territory on the map. How big is your dog's kingdom?",
    f6Title: "Apple Intelligence",
    f6Body: "Check foods, suggest goals and create veterinary care plans on device, when supported.",
    f7Title: "Widgets",
    f7Body: "Activity rings and upcoming care on your Home Screen and Lock Screen.",
    f8Title: "Private sync",
    f8Body: "With Cota+, sync your data across Apple devices through your private iCloud.",
    f9Title: "Upcoming care",
    f9Body: "See overdue and scheduled care alongside each pet's routines and reminders.",
    f10Title: "Reproductive health",
    f10Body: "Record observations and veterinary follow-ups for dogs. +Cota does not predict fertility.",
    f11Title: "Make it yours",
    f11Body: "Choose activity rings, reorder quick actions and personalize the app icon and artwork.",
    f12Title: "Photos, documents and reports",
    f12Body: "Attach files to records and export a health report to share with your veterinarian.",
    privacyEyebrow: "Privacy",
    privacyTitle: "Your pets' information stays yours",
    privacyCta: "Read the Privacy Policy",
    termsCta: "Read the Terms of Use",
    privacyPoint1: "No account needed; pet records aren't stored on our servers",
    privacyPoint2: "No ads and no tracking",
    privacyPoint3: "Apple Intelligence processes AI on your device",
    privacyPoint4: "Cota+ syncs through your private iCloud",
    plusTitle: "More pets, private sync",
    plusLede: "The free plan includes one pet. Cota+ adds unlimited pets and private iCloud sync.",
    planBest: "Best monthly value",
    planAnnual: "Annual",
    planAnnualBody: "The lowest monthly price. 7-day free trial if eligible.",
    planMonthly: "Monthly",
    planMonthlyBody: "Pay monthly. 7-day free trial if eligible.",
    planWeekly: "Weekly",
    planWeeklyBody: "Pay weekly. Free trial if your account and plan are eligible.",
    plusFinePrint: "Prices vary by country. A 7-day free trial is available only to eligible accounts on eligible plans. Cota+ renews automatically; manage or cancel your subscription in your Apple Account settings.",
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
