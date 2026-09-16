import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import {
  collection,
  getDocs,
  getFirestore,
} from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js";
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";

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
const auth = getAuth(app);

const PLATFORM_KEYS = ["iOS", "Web", "Android", "iOS Beta"];

const loginSection = document.querySelector("#login-section");
const dashboardSection = document.querySelector("#dashboard-section");
const loginForm = document.querySelector("#login-form");
const loginError = document.querySelector("#login-error");
const logoutButton = document.querySelector("#logout-button");
const refreshButton = document.querySelector("#refresh-button");
const statusNote = document.querySelector("#dashboard-status");
const tableBody = document.querySelector("#entries-body");

const metricTotalEl = document.querySelector("#metric-total");
const metricPlatformEls = {
  iOS: document.querySelector("#metric-ios"),
  Web: document.querySelector("#metric-web"),
  Android: document.querySelector("#metric-android"),
  "iOS Beta": document.querySelector("#metric-ios-beta"),
};

function setStatus(message, tone = "neutral") {
  if (!statusNote) return;
  statusNote.textContent = message;
  statusNote.dataset.tone = tone;
}

function escapeHTML(value) {
  return String(value ?? "").replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  })[char]);
}

function formatTimestamp(timestamp) {
  if (!timestamp || typeof timestamp.toDate !== "function") return "-";
  return timestamp.toDate().toLocaleString();
}

async function loadEntries() {
  setStatus("Cargando registros...", "neutral");
  try {
    const snapshot = await getDocs(collection(db, "cotaWaitlist"));
    const counts = { iOS: 0, Web: 0, Android: 0, "iOS Beta": 0 };
    const rows = [];

    snapshot.forEach((docSnap) => {
      const data = docSnap.data();
      const platforms = Array.isArray(data.platforms) ? data.platforms : [];
      platforms.forEach((platform) => {
        if (platform in counts) counts[platform] += 1;
      });
      rows.push({
        email: data.email || "",
        platforms,
        language: data.language || "",
        submittedAt: data.submittedAt,
      });
    });

    rows.sort((a, b) => (b.submittedAt?.toMillis?.() || 0) - (a.submittedAt?.toMillis?.() || 0));

    if (metricTotalEl) metricTotalEl.textContent = snapshot.size;
    PLATFORM_KEYS.forEach((platform) => {
      if (metricPlatformEls[platform]) metricPlatformEls[platform].textContent = counts[platform];
    });

    tableBody.innerHTML = rows
      .map(
        (row) => `
      <tr>
        <td>${escapeHTML(row.email)}</td>
        <td>${row.platforms.map(escapeHTML).join(", ") || "-"}</td>
        <td>${escapeHTML(row.language || "-")}</td>
        <td>${formatTimestamp(row.submittedAt)}</td>
      </tr>`
      )
      .join("");

    setStatus(`${snapshot.size} registros cargados.`, "success");
  } catch (error) {
    console.error("Error loading Cota waitlist entries", error);
    setStatus("No se pudieron cargar los registros. Revisa las reglas de Firestore.", "error");
  }
}

loginForm?.addEventListener("submit", async (event) => {
  event.preventDefault();
  loginError.textContent = "";
  const email = loginForm.email.value.trim();
  const password = loginForm.password.value;
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.error("Error signing in to Cota admin", error);
    loginError.textContent = "No se pudo iniciar sesión. Verifica tu correo y contraseña.";
  }
});

logoutButton?.addEventListener("click", () => signOut(auth));
refreshButton?.addEventListener("click", () => loadEntries());

onAuthStateChanged(auth, (user) => {
  if (user) {
    loginSection.hidden = true;
    dashboardSection.hidden = false;
    loadEntries();
  } else {
    loginSection.hidden = false;
    dashboardSection.hidden = true;
  }
});
