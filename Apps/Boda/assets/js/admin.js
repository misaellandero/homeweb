// Lógica del panel administrativo
const loginForm = document.getElementById("login-form");
const dashboard = document.getElementById("dashboard");
const authSection = document.getElementById("auth-section");
const loginMessage = document.getElementById("login-message");
const logoutBtn = document.getElementById("logout-btn");
const tablaBody = document.getElementById("tabla-body");
const refreshBtn = document.getElementById("refresh-table");
const filterButtons = document.querySelectorAll("[data-filter]");
const crearInvitadoForm = document.getElementById("crear-invitado-form");
const editarInvitadoForm = document.getElementById("editar-invitado-form");
const asignarLugarBtn = document.getElementById("asignar-lugar");
const borrarInvitadoBtn = document.getElementById("borrar-invitado");
const crearCard = document.getElementById("crear-card");
const rolInfo = document.getElementById("rol-info");

let filtroActual = "todos";
let invitadosCache = [];
let invitadoSeleccionado = null;
let rolActual = "verificador";

// Configura los correos permitidos para cada rol.
const ROLE_CONFIG = {
  admin: ["novio@correo.com", "novia@correo.com"],
  verificador: ["ayuda@correo.com"],
};

function obtenerRolPorCorreo(email) {
  if (!email) return "verificador";
  if (ROLE_CONFIG.admin.includes(email)) return "admin";
  if (ROLE_CONFIG.verificador.includes(email)) return "verificador";
  return "verificador";
}

function actualizarUIporRol() {
  const esAdmin = rolActual === "admin";
  crearCard?.classList.toggle("hidden", !esAdmin);
  if (borrarInvitadoBtn) {
    borrarInvitadoBtn.disabled = !esAdmin;
    borrarInvitadoBtn.title = esAdmin
      ? ""
      : "Solo administradores pueden borrar invitados.";
  }
}

/**
 * Inicia sesión con Firebase Authentication.
 */
async function iniciarSesion(email, password) {
  try {
    await auth.signInWithEmailAndPassword(email, password);
    loginMessage.textContent = "";
  } catch (error) {
    console.error("Login error", error);
    loginMessage.textContent = "Credenciales inválidas o error de red.";
  }
}

/**
 * Obtiene la lista de invitados desde Firestore y actualiza la tabla.
 */
async function cargarListaInvitados() {
  try {
    const snap = await db.collection("invitados").orderBy("nombreCompleto").get();
    invitadosCache = snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    pintarTabla();
  } catch (error) {
    console.error("Error al cargar invitados", error);
    tablaBody.innerHTML = `<tr><td colspan="12">Error al cargar datos.</td></tr>`;
  }
}

/**
 * Renderiza la tabla de invitados usando el filtro activo.
 */
function pintarTabla() {
  const filtrados = invitadosCache.filter((invitado) => filtrarInvitado(invitado));
  if (!filtrados.length) {
    tablaBody.innerHTML = `<tr><td colspan="12">Sin invitados con ese filtro.</td></tr>`;
    return;
  }

  tablaBody.innerHTML = filtrados
    .map(
      (invitado) => `
        <tr data-id="${invitado.id}">
          <td>${invitado.nombreCompleto || ""}</td>
          <td>${invitado.lado || "-"}</td>
          <td>${invitado.codigoInvitacion || "-"}</td>
          <td>${invitado.numInvitadosPermitidos ?? "-"}</td>
          <td>${invitado.estadoInvitacion || "-"}</td>
          <td>${invitado.rsvpNumAsistentes ?? 0}</td>
          <td>${invitado.vestimentaConfirmada ? "✔" : "-"}</td>
          <td>${invitado.viajeConfirmado ? "✔" : "-"}</td>
          <td>${invitado.hospedajeConfirmado ? "✔" : "-"}</td>
          <td>${invitado.esListaEspera ? "Sí" : "No"}</td>
          <td>${invitado.prioridadListaEspera ?? "-"}</td>
          <td>
            <button class="btn btn--ghost" data-action="seleccionar">Editar</button>
          </td>
        </tr>`
    )
    .join("");
}

/**
 * Determina si el invitado pasa el filtro seleccionado.
 */
function filtrarInvitado(invitado) {
  if (filtroActual === "fase1") {
    return invitado.estadoInvitacion === "confirmado_fase1";
  }
  if (filtroActual === "final") {
    return invitado.estadoInvitacion === "confirmado_final";
  }
  if (filtroActual === "lista-espera") {
    return invitado.esListaEspera;
  }
  return true;
}

/**
 * Asigna los datos del invitado seleccionado al formulario de edición.
 */
function seleccionarInvitado(id) {
  invitadoSeleccionado = invitadosCache.find((inv) => inv.id === id) || null;
  if (!invitadoSeleccionado) return;
  for (const [key, value] of Object.entries(invitadoSeleccionado)) {
    if (editarInvitadoForm.elements[key] !== undefined) {
      editarInvitadoForm.elements[key].value = value;
    }
  }
  editarInvitadoForm.elements["id"].value = invitadoSeleccionado.id;
}

/**
 * Crea un invitado nuevo en Firestore.
 */
async function crearInvitado(data) {
  if (rolActual !== "admin") return;
  const payload = formDataToObject(data);
  payload.numInvitadosPermitidos = Number(payload.numInvitadosPermitidos || 0);
  payload.prioridadListaEspera = Number(payload.prioridadListaEspera || 0);
  payload.esListaEspera = payload.esListaEspera === "true";
  payload.fechaEnvioInvitacion = payload.fechaEnvioInvitacion || new Date().toISOString();

  try {
    await db.collection("invitados").add(payload);
    document.getElementById("crear-invitado-mensaje").textContent = "Invitado creado";
    crearInvitadoForm.reset();
    await cargarListaInvitados();
  } catch (error) {
    console.error("Error al crear invitado", error);
  }
}

/**
 * Actualiza campos del invitado seleccionado.
 */
async function actualizarInvitado(data) {
  if (!invitadoSeleccionado) return;
  const payload = formDataToObject(data);
  ["rsvpNumAsistentes", "prioridadListaEspera"].forEach((key) => {
    if (key in payload) payload[key] = Number(payload[key] || 0);
  });
  ["vestimentaConfirmada", "viajeConfirmado", "hospedajeConfirmado", "esListaEspera"].forEach(
    (key) => {
      if (key in payload) payload[key] = payload[key] === "true";
    }
  );

  try {
    await db.collection("invitados").doc(invitadoSeleccionado.id).update(payload);
    document.getElementById("editar-invitado-mensaje").textContent = "Cambios guardados";
    await cargarListaInvitados();
  } catch (error) {
    console.error("Error al actualizar", error);
  }
}

/**
 * Elimina el invitado activo.
 */
async function borrarInvitado() {
  if (rolActual !== "admin") return;
  if (!invitadoSeleccionado) return;
  if (!confirm("¿Deseas eliminar este registro?")) return;
  try {
    await db.collection("invitados").doc(invitadoSeleccionado.id).delete();
    invitadoSeleccionado = null;
    editarInvitadoForm.reset();
    await cargarListaInvitados();
  } catch (error) {
    console.error("Error al borrar", error);
  }
}

/**
 * Cambia un invitado de lista de espera a invitado activo.
 */
async function asignarLugarListaEspera() {
  if (!invitadoSeleccionado) return;
  try {
    await db
      .collection("invitados")
      .doc(invitadoSeleccionado.id)
      .update({
        esListaEspera: false,
        estadoInvitacion: "pendiente_primera_confirmacion",
      });
    await cargarListaInvitados();
  } catch (error) {
    console.error("Error al asignar lugar", error);
  }
}

/**
 * Revisa expiraciones y actualiza estados cuando sea necesario.
 */
async function actualizarEstadosPorExpiracion() {
  const ahora = new Date();
  const batch = db.batch();
  invitadosCache.forEach((invitado) => {
    const fase1Vencida =
      invitado.fechaLimiteFase1 && new Date(invitado.fechaLimiteFase1) < ahora;
    const fase2Vencida =
      invitado.fechaLimiteFase2 && new Date(invitado.fechaLimiteFase2) < ahora;

    let nuevoEstado = null;
    if (fase1Vencida && invitado.estadoInvitacion === "pendiente_primera_confirmacion") {
      nuevoEstado = "cancelado_por_tiempo";
    }
    if (
      fase2Vencida &&
      invitado.estadoInvitacion !== "cancelado_por_tiempo" &&
      (!invitado.vestimentaConfirmada || !invitado.viajeConfirmado ||
        (invitado.aplicaHospedaje && !invitado.hospedajeConfirmado))
    ) {
      nuevoEstado = "cancelado_por_tiempo";
    }

    if (nuevoEstado) {
      const ref = db.collection("invitados").doc(invitado.id);
      batch.update(ref, { estadoInvitacion: nuevoEstado });
    }
  });

  try {
    await batch.commit();
    await cargarListaInvitados();
  } catch (error) {
    console.error("Error al actualizar expiraciones", error);
  }
}

/**
 * Convierte un objeto FormData a objeto plano.
 */
function formDataToObject(formData) {
  const obj = {};
  for (const [key, value] of formData.entries()) {
    if (value === "") continue;
    obj[key] = value;
  }
  return obj;
}

// Eventos ---------------------------------
loginForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const email = event.target.email.value;
  const password = event.target.password.value;
  iniciarSesion(email, password);
});

auth.onAuthStateChanged((user) => {
  const isLogged = !!user;
  rolActual = user ? obtenerRolPorCorreo(user.email) : "verificador";
  dashboard.classList.toggle("hidden", !isLogged);
  authSection.classList.toggle("hidden", isLogged);
  actualizarUIporRol();
  if (rolInfo) {
    rolInfo.textContent = `Rol actual: ${isLogged ? rolActual : "--"}`;
  }
  if (isLogged) {
    cargarListaInvitados().then(() => actualizarEstadosPorExpiracion());
  }
});

logoutBtn?.addEventListener("click", () => auth.signOut());

refreshBtn?.addEventListener("click", cargarListaInvitados);

filterButtons.forEach((btn) =>
  btn.addEventListener("click", () => {
    filtroActual = btn.dataset.filter;
    pintarTabla();
  })
);

tablaBody?.addEventListener("click", (event) => {
  if (event.target.matches("[data-action=seleccionar]")) {
    const id = event.target.closest("tr").dataset.id;
    seleccionarInvitado(id);
  }
});

crearInvitadoForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  if (rolActual !== "admin") {
    document.getElementById("crear-invitado-mensaje").textContent =
      "Solo los administradores pueden crear invitados.";
    return;
  }
  crearInvitado(new FormData(event.target));
});

editarInvitadoForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  actualizarInvitado(new FormData(event.target));
});

asignarLugarBtn?.addEventListener("click", asignarLugarListaEspera);

borrarInvitadoBtn?.addEventListener("click", borrarInvitado);
