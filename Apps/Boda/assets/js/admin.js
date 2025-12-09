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
const nombreCrearInput =
  crearInvitadoForm && crearInvitadoForm.elements
    ? crearInvitadoForm.elements["nombreCompleto"]
    : null;
const ladoCrearSelect =
  crearInvitadoForm && crearInvitadoForm.elements
    ? crearInvitadoForm.elements["lado"]
    : null;
const codigoCrearInput =
  crearInvitadoForm && crearInvitadoForm.elements
    ? crearInvitadoForm.elements["codigoInvitacion"]
    : null;
const modalCrear = document.getElementById("modal-crear");
const modalEditar = document.getElementById("modal-editar");
const addInvitadoBtn = document.getElementById("add-invitado-btn");
const rolInfo = document.getElementById("rol-info");
const tagFilterContainer = document.getElementById("tag-filter-container");
const ladoFilterSelect = document.getElementById("lado-filter-select");
const deadlinePanel = document.getElementById("deadline-panel");
const deadlineForm = document.getElementById("deadline-form");
const deadlineStatus = document.getElementById("deadline-sync-status");
const applyDeadlinesAllBtn = document.getElementById("apply-deadlines-all");
const clearDeadlinesBtn = document.getElementById("clear-deadlines");
const summaryFechaRespuesta = document.getElementById("summary-fecha-respuesta");
const summaryFechaDetalles = document.getElementById("summary-fecha-detalles");
const summaryFechaBoda = document.getElementById("summary-fecha-boda");
const summaryCapacidad = document.getElementById("summary-capacidad");
const summaryDisponibles = document.getElementById("summary-disponibles");
const summaryNovia = document.getElementById("summary-novia");
const summaryNovio = document.getElementById("summary-novio");
const summaryNoviaTotal = document.getElementById("summary-novia-total");
const summaryNovioTotal = document.getElementById("summary-novio-total");
const headerFechaRespuesta = document.getElementById("header-fecha-respuesta");
const headerFechaDetalles = document.getElementById("header-fecha-detalles");
const headerFechaBoda = document.getElementById("header-fecha-boda");
const waitlistBody = document.getElementById("waitlist-body");
const waitlistStatus = document.getElementById("waitlist-status");
const modalPromover = document.getElementById("modal-promover");
const promoverForm = document.getElementById("promover-form");
const promoverDetalle = document.getElementById("promover-detalle");
const promoverMensaje = document.getElementById("promover-mensaje");
const modalPresupuesto = document.getElementById("modal-presupuesto");
const modalApoyo = document.getElementById("modal-apoyo");
const headerActivos = document.getElementById("header-activos");
const headerEspera = document.getElementById("header-espera");
const headerDisponibles = document.getElementById("header-disponibles");
const headerStatsSection = document.querySelector(".header-stats");
const headerDatesSection = document.querySelector(".header-dates");
const panelTabs = document.getElementById("panelTabs");
const capacidadInput = document.getElementById("capacidadMaxima");
const guardarCapacidadBtn = document.getElementById("guardar-capacidad");
const crearEtiquetasInput = crearInvitadoForm?.elements?.etiquetas || null;
const editarEtiquetasInput = editarInvitadoForm?.elements?.etiquetas || null;
const crearEtiquetasSugerencia = document.getElementById("crear-etiquetas-sugerencia");
const editarEtiquetasSugerencia = document.getElementById("editar-etiquetas-sugerencia");
const crearTagEditor = document.getElementById("crear-tag-editor");
const editarTagEditor = document.getElementById("editar-tag-editor");
const itinerarioForm = document.getElementById("itinerario-form");
const itinerarioBody = document.getElementById("itinerario-body");
const itinerarioMensaje = document.getElementById("itinerario-mensaje");
const damasForm = document.getElementById("damas-form");
const damasBody = document.getElementById("damas-body");
const damasMensaje = document.getElementById("damas-mensaje");
const addDamaBtn = document.getElementById("add-dama-btn");
const modalDama = document.getElementById("modal-dama");
const countDamasElem = document.getElementById("count-damas");
const countCaballerosElem = document.getElementById("count-caballeros");
const presupuestoForm = document.getElementById("presupuesto-form");
const presupuestoBody = document.getElementById("presupuesto-body");
const presupuestoMensaje = document.getElementById("presupuesto-mensaje");
const apoyosForm = document.getElementById("apoyos-form");
const apoyosBody = document.getElementById("apoyos-body");
const apoyosMensaje = document.getElementById("apoyos-mensaje");
const budgetIngresosElem = document.getElementById("budget-ingresos");
const budgetGastosElem = document.getElementById("budget-gastos");
const budgetApoyosElem = document.getElementById("budget-apoyos");
const budgetBalanceElem = document.getElementById("budget-balance");
const presupuestoChartCanvas = document.getElementById("presupuesto-chart");
const addPresupuestoBtn = document.getElementById("add-presupuesto-btn");
const addApoyoBtn = document.getElementById("add-apoyo-btn");
const damasLadoSelect = damasForm?.elements?.lado || null;
const damasRolSelect = damasForm?.elements?.rol || null;

const modalCrearInstance =
  typeof bootstrap !== "undefined" && modalCrear ? new bootstrap.Modal(modalCrear) : null;
const modalEditarInstance =
  typeof bootstrap !== "undefined" && modalEditar ? new bootstrap.Modal(modalEditar) : null;
const modalPromoverInstance =
  typeof bootstrap !== "undefined" && modalPromover ? new bootstrap.Modal(modalPromover) : null;
const modalDamaInstance =
  typeof bootstrap !== "undefined" && modalDama ? new bootstrap.Modal(modalDama) : null;
const modalPresupuestoInstance =
  typeof bootstrap !== "undefined" && modalPresupuesto ? new bootstrap.Modal(modalPresupuesto) : null;
const modalApoyoInstance =
  typeof bootstrap !== "undefined" && modalApoyo ? new bootstrap.Modal(modalApoyo) : null;

if (crearInvitadoForm && crearTagEditor) {
  actualizarTagEditor(crearInvitadoForm, crearTagEditor);
}
if (editarInvitadoForm && editarTagEditor) {
  actualizarTagEditor(editarInvitadoForm, editarTagEditor);
}

let filtroActual = "todos";
let filtroLado = "todos";
let invitadosCache = [];
let invitadoSeleccionado = null;
let invitadoListaEsperaSeleccionado = null;
let rolActual = "verificador";
let filtrosEtiquetas = new Set();
let etiquetasDisponibles = [];
let dataTable = null;
let waitlistDataTable = null;
let configuracionFechas = null;
let eventosItinerario = [];
let damasCaballeros = [];
let damaSeleccionada = null;
let ultimaSeleccionLadoInvitado = "novia";
let ultimaSeleccionLadoDama = "novia";
let ultimaSeleccionRolDama = "dama";
let presupuestoItems = [];
let apoyosItems = [];
let presupuestoChart = null;

// Configura los correos permitidos para cada rol.
const ROLE_CONFIG = {
  admin: ["fmlanderoy@hotmail.es", "novia@correo.com"],
  verificador: ["jokelandero@gmail.com"],
};

function obtenerRolPorCorreo(email) {
  if (!email) return "verificador";
  if (ROLE_CONFIG.admin.includes(email)) return "admin";
  if (ROLE_CONFIG.verificador.includes(email)) return "verificador";
  return "verificador";
}

function actualizarUIporRol() {
  const esAdmin = rolActual === "admin";
  addInvitadoBtn?.classList.toggle("hidden", !esAdmin);
  deadlinePanel?.classList.toggle("hidden", !esAdmin);
  itinerarioForm?.classList.toggle("hidden", !esAdmin);
  damasForm?.classList.toggle("hidden", !esAdmin);
  addDamaBtn?.classList.toggle("hidden", !esAdmin);
  addPresupuestoBtn?.classList.toggle("hidden", !esAdmin);
  addApoyoBtn?.classList.toggle("hidden", !esAdmin);
  if (borrarInvitadoBtn) {
    borrarInvitadoBtn.disabled = !esAdmin;
    borrarInvitadoBtn.title = esAdmin
      ? ""
      : "Solo administradores pueden borrar invitados.";
  }
}

function limpiarSeleccionInvitado() {
  invitadoSeleccionado = null;
  if (editarInvitadoForm) {
    editarInvitadoForm.reset();
    if (editarInvitadoForm.elements["id"]) {
      editarInvitadoForm.elements["id"].value = "";
    }
  }
  cerrarModal(modalEditarInstance);
}

function obtenerPrefijoNombre(nombre) {
  if (!nombre) return "";
  const partes = nombre
    .trim()
    .split(/\s+/)
    .filter(Boolean);
  if (!partes.length) return "";
  const primera = partes[0][0] || "";
  const segunda = partes[1] ? partes[1][0] : partes[0][1] || "";
  const prefijo = `${primera}${segunda || ""}`.toUpperCase();
  return prefijo.padEnd(2, "X");
}

function obtenerMaxConsecutivo(base) {
  let max = 0;
  const baseUpper = base.toUpperCase();
  invitadosCache.forEach((invitado) => {
    const codigo = invitado.codigoInvitacion;
    if (!codigo) return;
    const codigoUpper = codigo.toUpperCase();
    if (!codigoUpper.startsWith(baseUpper)) return;
    const resto = codigoUpper.slice(baseUpper.length);
    const numero = parseInt(resto, 10);
    if (!Number.isNaN(numero)) {
      max = Math.max(max, numero);
    }
  });
  return max;
}

async function codigoDisponible(codigo) {
  if (!codigo) return false;
  const snap = await db
    .collection("invitados")
    .where("codigoInvitacion", "==", codigo)
    .limit(1)
    .get();
  return snap.empty;
}

async function generarCodigoInvitacion(nombre, lado) {
  const prefijoNombre = obtenerPrefijoNombre(nombre);
  if (!prefijoNombre.trim()) return "";
  const ladoCodigo = lado === "novia" ? "NA" : "NO";
  const base = `${prefijoNombre}${ladoCodigo}`;
  let consecutivo = obtenerMaxConsecutivo(base) + 1;
  let codigo = `${base}${String(consecutivo).padStart(3, "0")}`;

  // Verifica en Firestore que no exista ya un código igual.
  // Si existe, incrementa el consecutivo hasta encontrar uno libre.
  // Nota: esto minimiza colisiones incluso con múltiples administradores conectados.
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const disponible = await codigoDisponible(codigo);
    if (disponible) return codigo;
    consecutivo += 1;
    codigo = `${base}${String(consecutivo).padStart(3, "0")}`;
  }
}

async function actualizarCodigoSugerido() {
  if (!codigoCrearInput || !nombreCrearInput || !ladoCrearSelect) return;
  const nombre = nombreCrearInput.value.trim();
  if (!nombre) {
    codigoCrearInput.value = "";
    return;
  }
  codigoCrearInput.value = "Generando...";
  const sugerido = await generarCodigoInvitacion(nombre, ladoCrearSelect.value);
  codigoCrearInput.value = sugerido;
}

function parseEtiquetas(valor = "") {
  if (!valor) return [];
  return valor
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);
}

function renderTagChips(valor) {
  const chips = [];
  if (Array.isArray(valor) && valor.length) {
    valor.forEach((tag) => chips.push(`<span class="tag-chip">${tag}</span>`));
  }
  if (!chips.length && typeof valor === "string" && valor.trim()) {
    valor
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean)
      .forEach((tag) => chips.push(`<span class="tag-chip">${tag}</span>`));
  }
  if (!chips.length) {
    chips.push('<span class="tag-chip tag-chip--empty">Sin etiqueta</span>');
  }
  return `<div class="tags-cell">${chips.join("")}</div>`;
}

function normalizarEtiqueta(tag = "") {
  return tag.trim().toLowerCase();
}

function escapeHTML(str = "") {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function parseContactos(valor = "") {
  if (!valor) return [];
  return valor
    .split(",")
    .map((contacto) => contacto.trim())
    .filter(Boolean);
}

function renderContactosAdicionales(row) {
  const lista = Array.isArray(row.contactosAdicionalesLista) ? row.contactosAdicionalesLista : [];
  if (!lista.length) {
    return "—";
  }
  const targetId = `contactos-extra-${row.id}`;
  const contenido = lista.map((contacto) => `<div>${contacto}</div>`).join("");
  return `
    <div class="contactos-extra">
      <button type="button" class="btn btn--ghost" data-action="toggle-contactos" data-target="${targetId}">
        Ver más
      </button>
      <div id="${targetId}" class="contactos-extra__content hidden">${contenido}</div>
    </div>
  `;
}

function encontrarEtiquetaSimilar(nombre = "") {
  const objetivo = normalizarEtiqueta(nombre);
  if (!objetivo) return null;
  let coincidencia = null;
  etiquetasDisponibles.forEach((tag) => {
    const normalizada = normalizarEtiqueta(tag);
    if (normalizada === objetivo) {
      coincidencia = tag;
    } else if (!coincidencia && normalizada.includes(objetivo)) {
      coincidencia = tag;
    }
  });
  return coincidencia;
}

const ESTADOS_CONFIG = {
  pendiente_primera_confirmacion: {
    label: "Invitación sin respuesta",
    description: "Invitación enviada, falta que confirme si asistirá.",
    className: "status-pill--pendiente",
  },
  confirmado_fase1: {
    label: "Confirmó asistencia",
    description: "Aceptó en la primera ronda; falta checklist final.",
    className: "status-pill--fase1",
  },
  confirmado_final: {
    label: "Checklist completado",
    description: "Completo; asistirá y cerró todos los pendientes.",
    className: "status-pill--final",
  },
  rechazado: {
    label: "Declinó asistencia",
    description: "Nos indicó que no podrá asistir.",
    className: "status-pill--rechazado",
  },
  cancelado_por_tiempo: {
    label: "Liberado por tiempo",
    description: "No respondió a tiempo; lugar disponible para otro invitado.",
    className: "status-pill--cancelado",
  },
};

const ESTADO_DEFAULT = {
  label: "Estado no registrado",
  description: "Aún no marcamos el avance de este invitado.",
  className: "status-pill--desconocido",
};

const ESTADOS_CAPACIDAD_EXCLUIDOS = new Set(["cancelado_por_tiempo", "rechazado"]);

function normalizarEstadoValor(estado = "") {
  if (typeof estado !== "string") return "";
  const limpio = estado.trim();
  if (!limpio || limpio === "-") return "";
  return limpio;
}

function capitalizarEstado(estado = "") {
  if (!estado) return "";
  return estado
    .split("_")
    .map((segmento) => segmento.charAt(0).toUpperCase() + segmento.slice(1))
    .join(" ");
}

function obtenerInfoEstado(estadoValor) {
  const normalizado = normalizarEstadoValor(estadoValor);
  if (!normalizado) return ESTADO_DEFAULT;
  if (ESTADOS_CONFIG[normalizado]) return ESTADOS_CONFIG[normalizado];
  return {
    label: capitalizarEstado(normalizado),
    className: "status-pill--desconocido",
  };
}

function renderEstadoPill(info) {
  const vigente = info || ESTADO_DEFAULT;
  const title = vigente.description ? ` title="${vigente.description}"` : "";
  return `<span class="status-pill ${vigente.className}"${title}>${vigente.label}</span>`;
}

function obtenerInfoLado(lado) {
  if (!lado) {
    return { render: '<span class="status-pill status-pill--desconocido">Sin definir</span>' };
  }
  const lower = lado.toLowerCase();
  if (lower === "novia") {
    return {
      render: '<span class="status-pill status-pill--lado novia">Novia</span>',
    };
  }
  if (lower === "novio") {
    return {
      render: '<span class="status-pill status-pill--lado novio">Novio</span>',
    };
  }
  return { render: `<span class="status-pill status-pill--desconocido">${lado}</span>` };
}

function renderAcciones(id, opciones = {}) {
  const incluirPromover = !!opciones.incluirPromover;
  const puedePromover = opciones.puedePromover !== false;
  const puedeEditar = true;
  const puedeBorrar = rolActual === "admin";
  const botones = [
    `<button class="btn btn--ghost" data-action="seleccionar" data-id="${id}" ${
      puedeEditar ? "" : "disabled"
    }>Editar</button>`,
    `<button class="btn btn--ghost btn--danger" data-action="borrar" data-id="${id}" ${
      puedeBorrar ? "" : "disabled"
    }>Borrar</button>`,
  ];
  if (incluirPromover) {
    botones.push(
      `<button class="btn btn--ghost" data-action="promover" data-id="${id}" ${
        puedePromover ? "" : "disabled"
      }>
        Subir a invitado
      </button>`
    );
  }
  return `<div class="table-actions table-actions--stacked table-actions--compact">${botones.join(
    ""
  )}</div>`;
}

function renderGestionCupo(id) {
  const puedeGestionar = rolActual === "admin";
  return `
    <div class="table-actions table-actions--stacked">
      <button class="btn btn--ghost" data-action="cancelar" data-id="${id}" ${
        puedeGestionar ? "" : "disabled"
      }>Cancelar invitación</button>
      <button class="btn btn--ghost" data-action="bajar-espera" data-id="${id}" ${
        puedeGestionar ? "" : "disabled"
      }>Bajar a lista de espera</button>
    </div>
  `;
}

function renderPrioridadControls(row) {
  const puedeGestionar = rolActual === "admin";
  const valor =
    typeof row.prioridadValor === "number" && !Number.isNaN(row.prioridadValor)
      ? row.prioridadValor
      : row.prioridad ?? "-";
  return `
    <div class="priority-control">
      <button class="btn btn--ghost" data-action="prioridad-up" data-id="${row.id}" ${
        puedeGestionar ? "" : "disabled"
      } title="Aumentar prioridad">&#9650;</button>
      <span>${valor}</span>
      <button class="btn btn--ghost" data-action="prioridad-down" data-id="${row.id}" ${
        puedeGestionar ? "" : "disabled"
      } title="Bajar prioridad">&#9660;</button>
    </div>
  `;
}

function actualizarSugerenciaEtiqueta(inputElem, helperElem) {
  if (!inputElem || !helperElem) return;
  const partes = inputElem.value.split(",");
  const actual = normalizarEtiqueta(partes[partes.length - 1] || "");
  if (!actual) {
    helperElem.textContent = "";
    return;
  }
  const sugerida = encontrarEtiquetaSimilar(actual);
  if (!sugerida) {
    helperElem.textContent = "";
    return;
  }
  if (normalizarEtiqueta(sugerida) === actual) {
    helperElem.textContent = `Ya existe una etiqueta con ese nombre: "${sugerida}".`;
  } else {
    helperElem.textContent = `¿Querías usar la etiqueta "${sugerida}"?`;
  }
}

function actualizarTagEditor(form, editorElem) {
  if (!form || !editorElem || !form.elements?.etiquetas) return;
  const tags = parseEtiquetas(form.elements["etiquetas"].value);
  if (!tags.length) {
    editorElem.innerHTML = '<span class="tag-chip tag-chip--empty">Sin etiquetas</span>';
    return;
  }
  const chips = tags
    .map(
      (tag) =>
        `<span class="tag-editor__chip">${tag}<button type="button" class="tag-editor__remove" data-remove-tag="${tag}" data-editor-target="${editorElem.dataset.form}">&times;</button></span>`
    )
    .join("");
  editorElem.innerHTML = chips;
}

function eliminarEtiquetaDesdeEditor(event) {
  const tag = event.target?.dataset?.removeTag;
  const target = event.target?.dataset?.editorTarget;
  if (!tag || !target) return;
  const form = target === "crear" ? crearInvitadoForm : editarInvitadoForm;
  const editor = target === "crear" ? crearTagEditor : editarTagEditor;
  if (!form || !form.elements?.etiquetas) return;
  const tags = parseEtiquetas(form.elements["etiquetas"].value).filter(
    (t) => t.toLowerCase() !== tag.toLowerCase()
  );
  form.elements["etiquetas"].value = tags.join(", ");
  actualizarTagEditor(form, editor);
  const helper = target === "crear" ? crearEtiquetasSugerencia : editarEtiquetasSugerencia;
  actualizarSugerenciaEtiqueta(form.elements["etiquetas"], helper);
}

function actualizarEtiquetasDisponibles() {
  const set = new Set();
  invitadosCache.forEach((invitado) => {
    const etiquetas = Array.isArray(invitado.etiquetas)
      ? invitado.etiquetas
      : parseEtiquetas(invitado.etiquetas || "");
    etiquetas.forEach((tag) => set.add(tag));
  });
  etiquetasDisponibles = Array.from(set).sort((a, b) => a.localeCompare(b));
  actualizarSugerenciaEtiqueta(crearEtiquetasInput, crearEtiquetasSugerencia);
  actualizarSugerenciaEtiqueta(editarEtiquetasInput, editarEtiquetasSugerencia);
}

function renderFiltroEtiquetas() {
  if (!tagFilterContainer) return;
  if (!etiquetasDisponibles.length) {
    tagFilterContainer.innerHTML =
      '<span class="form-helper">No hay etiquetas disponibles todavía.</span>';
    return;
  }
  tagFilterContainer.innerHTML = etiquetasDisponibles
    .map((tag) => {
      const active = filtrosEtiquetas.has(tag) ? "active" : "";
      return `<button type="button" class="tag-chip tag-chip--filter ${active}" data-tag="${tag}">${tag}</button>`;
    })
    .join("");
}

function abrirModal(modalInstance) {
  modalInstance?.show();
}

function cerrarModal(modalInstance) {
  modalInstance?.hide();
}

function formatearFechaHora(fechaISO) {
  if (!fechaISO) return "--";
  const fecha = new Date(fechaISO);
  if (Number.isNaN(fecha.getTime())) return "--";
  return new Intl.DateTimeFormat("es-MX", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(fecha);
}

function formatearMoneda(valor) {
  const numero = Number(valor) || 0;
  return new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
    maximumFractionDigits: 2,
  }).format(numero);
}

function obtenerNumeroInput(input) {
  if (!input) return 0;
  const numero = Number(input.value);
  if (Number.isNaN(numero) || numero < 0) return 0;
  return numero;
}

function recalcularTotalInvitados(form) {
  if (!form || !form.elements) return;
  const adultos = obtenerNumeroInput(form.elements["numAdultosPlaneados"]);
  const ninos = obtenerNumeroInput(form.elements["numNinosPlaneados"]);
  const total = adultos + ninos;
  if (form.elements["numInvitadosPermitidos"]) {
    form.elements["numInvitadosPermitidos"].value = total;
  }
  if (form === editarInvitadoForm || form === crearInvitadoForm) {
    actualizarMaximoConfirmados(form);
  }
}

function actualizarMaximoConfirmados(form) {
  if (!form || !form.elements) return;
  const totalInput = form.elements["numInvitadosPermitidos"];
  const confirmInput = form.elements["rsvpNumAsistentes"];
  if (!confirmInput) return;
  const max = totalInput ? Number(totalInput.value) || 0 : 0;
  if (max > 0) {
    confirmInput.max = max;
    if (Number(confirmInput.value) > max) {
      confirmInput.value = max;
    }
  } else {
    confirmInput.removeAttribute("max");
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
    actualizarEtiquetasDisponibles();
    renderFiltroEtiquetas();
    pintarTabla();
    await actualizarCodigoSugerido();
  } catch (error) {
    console.error("Error al cargar invitados", error);
    tablaBody.innerHTML = `<tr><td colspan="13">Error al cargar datos.</td></tr>`;
  }
}

/**
 * Renderiza la tabla de invitados usando el filtro activo.
 */
function mapInvitadoToRow(invitado) {
  const etiquetas = Array.isArray(invitado.etiquetas)
    ? invitado.etiquetas
    : parseEtiquetas(invitado.etiquetas || "");
  const contactosAdicionales = Array.isArray(invitado.contactosAdicionales)
    ? invitado.contactosAdicionales
    : parseContactos(invitado.contactosAdicionales || "");
  const estadoValor = invitado.estadoInvitacion || "";
  const estadoInfo = invitado.esListaEspera
    ? { label: "Lista de espera", className: "status-pill--waitlist" }
    : obtenerInfoEstado(estadoValor);
  const ladoInfo = obtenerInfoLado(invitado.lado);
  const prioridadValor = Number(invitado.prioridadListaEspera);
  const prioridadLegible = Number.isFinite(prioridadValor)
    ? prioridadValor
    : invitado.prioridadListaEspera ?? "-";
  const notasTexto =
    typeof invitado.notas === "string" ? invitado.notas.trim() : "";
  const notasRender = notasTexto
    ? `<div class="table-note">${escapeHTML(notasTexto)}</div>`
    : "";
  return {
    id: invitado.id,
    nombreCompleto: invitado.nombreCompleto || "",
    notasTexto,
    notasRender,
    lado: invitado.lado || "-",
    ladoRender: ladoInfo.render,
    codigoInvitacion: invitado.codigoInvitacion || "-",
    numInvitadosPermitidos: invitado.numInvitadosPermitidos ?? "-",
    numAdultosPlaneados: invitado.numAdultosPlaneados ?? "-",
    numNinosPlaneados: invitado.numNinosPlaneados ?? "-",
    contactoPrincipal: invitado.contactoPrincipal || "-",
    contactosAdicionalesTexto: contactosAdicionales.join(", "),
    contactosAdicionalesLista: contactosAdicionales,
    estadoInvitacion: estadoValor || "-",
    estadoLegible: estadoInfo.label,
    estadoRender: renderEstadoPill(estadoInfo),
    rsvpNumAsistentes: invitado.rsvpNumAsistentes ?? 0,
    vestimenta: invitado.vestimentaConfirmada ? "Sí" : "No",
    viaje: invitado.viajeConfirmado ? "Sí" : "No",
    hospedaje: invitado.hospedajeConfirmado ? "Sí" : "No",
    listaEspera: invitado.esListaEspera ? "Sí" : "No",
    prioridad: prioridadLegible,
    prioridadValor: Number.isFinite(prioridadValor) ? prioridadValor : null,
    etiquetasTexto: etiquetas.join(", "),
    etiquetasRender: renderTagChips(etiquetas),
    esListaEsperaFlag: !!invitado.esListaEspera,
  };
}

function construirColumnasDataTable(opciones = {}) {
  const incluirPromover = !!opciones.incluirPromover;
  const incluirGestionCupo = !!opciones.incluirGestionCupo;
  const controlPrioridad = !!opciones.controlPrioridad;
  const columnas = [
    {
      data: "nombreCompleto",
      title: "Nombre completo",
      render: (data, type, row) =>
        type === "display"
          ? `<div class="name-cell"><strong>${escapeHTML(data || "-")}</strong>${row.notasRender || ""}</div>`
          : data,
    },
    {
      data: "lado",
      title: "Lado",
      render: (data, type, row) => (type === "display" ? row.ladoRender : data),
    },
    { data: "codigoInvitacion", title: "Código" },
    { data: "numInvitadosPermitidos", title: "N° invitados" },
    { data: "numAdultosPlaneados", title: "Adultos" },
    { data: "numNinosPlaneados", title: "Niños" },
    { data: "contactoPrincipal", title: "Contacto" },
    {
      data: "estadoLegible",
      title: "Estado",
      render: (data, type, row) => (type === "display" ? row.estadoRender : data),
    },
    {
      data: "id",
      title: "Acciones",
      orderable: false,
      searchable: false,
      render: (data, type, row) =>
        type === "display"
          ? renderAcciones(data, {
              incluirPromover,
              puedePromover: row?.puedePromover !== false,
            })
          : data,
    },
    { data: "rsvpNumAsistentes", title: "N° confirmados" },
    {
      data: "vestimenta",
      title: "Vestimenta",
      render: (data, type) => (type === "display" ? (data === "Sí" ? "✔" : "—") : data),
    },
    {
      data: "viaje",
      title: "Viaje",
      render: (data, type) => (type === "display" ? (data === "Sí" ? "✔" : "—") : data),
    },
    {
      data: "hospedaje",
      title: "Hospedaje",
      render: (data, type) => (type === "display" ? (data === "Sí" ? "✔" : "—") : data),
    },
    { data: "listaEspera", title: "Lista espera" },
    ...(controlPrioridad
      ? [
          {
            data: "prioridad",
            title: "Prioridad",
            render: (data, type, row) => {
              if (type !== "display") return data;
              if (row.esListaEsperaFlag) {
                return renderPrioridadControls(row);
              }
              return data ?? "-";
            },
          },
        ]
      : []),
    {
      data: "etiquetasTexto",
      title: "Etiquetas",
      orderable: false,
      render: (data, type, row) => (type === "display" ? row.etiquetasRender : data),
    },
    {
      data: "contactosAdicionalesTexto",
      title: "Contactos adicionales",
      render: (data, type, row) =>
        type === "display" ? renderContactosAdicionales(row) : data,
    },
  ];

  if (incluirGestionCupo) {
    columnas.push({
      data: "id",
      title: "Gestión de cupo",
      orderable: false,
      searchable: false,
      render: (data, type) => (type === "display" ? renderGestionCupo(data) : data),
    });
  }

  return columnas;
}

function pintarTabla() {
  const filtrados = invitadosCache.filter((invitado) => filtrarInvitado(invitado));
  const data = filtrados.map(mapInvitadoToRow);

  if (!dataTable) {
    dataTable = $("#tabla-invitados").DataTable({
      data,
      columns: construirColumnasDataTable({ incluirGestionCupo: true }),
      responsive: true,
      language: {
        url: "https://cdn.datatables.net/plug-ins/1.13.8/i18n/es-MX.json",
      },
      createdRow: (row, rowData) => {
        row.dataset.id = rowData.id;
      },
    });
  } else {
    dataTable.clear();
    dataTable.rows.add(data);
    dataTable.draw();
  }
  pintarTablaListaEspera();
  actualizarResumenCapacidad();
}

function pintarTablaListaEspera() {
  if (!waitlistBody) return;
  const disponibles = calcularDisponibles();
  const waitlistData = invitadosCache
    .filter((inv) => inv.esListaEspera)
    .map((inv) => {
      const row = mapInvitadoToRow(inv);
      row.puedePromover =
        typeof disponibles === "number"
          ? (Number(inv.numInvitadosPermitidos) || 0) <= disponibles
          : false;
      return row;
    });
  if (!waitlistDataTable) {
    waitlistDataTable = $("#tabla-lista-espera").DataTable({
      data: waitlistData,
      columns: construirColumnasDataTable({
        incluirPromover: true,
        incluirGestionCupo: true,
        controlPrioridad: true,
      }),
      responsive: true,
      language: {
        url: "https://cdn.datatables.net/plug-ins/1.13.8/i18n/es-MX.json",
      },
      createdRow: (row, rowData) => {
        row.dataset.id = rowData.id;
      },
    });
  } else {
    waitlistDataTable.clear();
    waitlistDataTable.rows.add(waitlistData);
    waitlistDataTable.draw();
  }
}

/**
 * Determina si el invitado pasa el filtro seleccionado.
 */
function filtrarInvitado(invitado) {
  if (filtroActual !== "lista-espera" && invitado.esListaEspera) {
    return false;
  }
  if (filtroLado !== "todos") {
    const ladoInv = (invitado.lado || "").toLowerCase();
    if (ladoInv !== filtroLado) {
      return false;
    }
  }
  if (filtroActual === "fase1") {
    return invitado.estadoInvitacion === "confirmado_fase1";
  }
  if (filtroActual === "final") {
    return invitado.estadoInvitacion === "confirmado_final";
  }
  if (filtroActual === "lista-espera") {
    return invitado.esListaEspera;
  }
  if (filtrosEtiquetas.size) {
    const etiquetas =
      (Array.isArray(invitado.etiquetas) && invitado.etiquetas) ||
      parseEtiquetas(invitado.etiquetas || "");
    const etiquetasSet = new Set(etiquetas);
    for (const tag of filtrosEtiquetas) {
      if (!etiquetasSet.has(tag)) {
        return false;
      }
    }
  }
  return true;
}

/**
 * Asigna los datos del invitado seleccionado al formulario de edición.
 */
function seleccionarInvitado(id) {
  invitadoSeleccionado = invitadosCache.find((inv) => inv.id === id) || null;
  if (!invitadoSeleccionado) return;
  if (editarInvitadoForm) {
    editarInvitadoForm.reset();
  }
  for (const [key, value] of Object.entries(invitadoSeleccionado)) {
    if (editarInvitadoForm.elements[key] === undefined) continue;
    if (key === "etiquetas" && Array.isArray(value)) {
      editarInvitadoForm.elements[key].value = value.join(", ");
      continue;
    }
    if (key === "contactosAdicionales" && Array.isArray(value)) {
      editarInvitadoForm.elements[key].value = value.join(", ");
      continue;
    }
    let formattedValue = value;
    if (typeof formattedValue === "boolean") {
      formattedValue = formattedValue ? "true" : "false";
    } else if (formattedValue === null || formattedValue === undefined) {
      formattedValue = "";
    }
    editarInvitadoForm.elements[key].value = formattedValue;
  }
  editarInvitadoForm.elements["id"].value = invitadoSeleccionado.id;
  actualizarMaximoConfirmados(editarInvitadoForm);
  actualizarTagEditor(editarInvitadoForm, editarTagEditor);
  actualizarSugerenciaEtiqueta(editarEtiquetasInput, editarEtiquetasSugerencia);
  recalcularTotalInvitados(editarInvitadoForm);
  abrirModal(modalEditarInstance);
}

/**
 * Crea un invitado nuevo en Firestore.
 */
async function crearInvitado(formData) {
  if (rolActual !== "admin") return;
  const payload = formDataToObject(formData);
  payload.numAdultosPlaneados = Number(formData.get("numAdultosPlaneados")) || 0;
  payload.numNinosPlaneados = Number(formData.get("numNinosPlaneados")) || 0;
  payload.numInvitadosPermitidos = payload.numAdultosPlaneados + payload.numNinosPlaneados;
  payload.prioridadListaEspera = Number(payload.prioridadListaEspera || 0);
  payload.fechaLimiteRespuesta =
    payload.fechaLimiteRespuesta || deadlineForm?.fechaLimiteRespuesta?.value || null;
  payload.fechaLimiteDetalles =
    payload.fechaLimiteDetalles || deadlineForm?.fechaLimiteDetalles?.value || null;
  payload.esListaEspera = payload.esListaEspera === "true";
  payload.fechaEnvioInvitacion = payload.fechaEnvioInvitacion || new Date().toISOString();
  payload.etiquetas = parseEtiquetas(formData.get("etiquetas") || "");
  payload.contactoPrincipal = formData.get("contactoPrincipal")?.trim() || "";
  payload.contactosAdicionales = parseContactos(formData.get("contactosAdicionales") || "");
  if (!payload.codigoInvitacion) {
    payload.codigoInvitacion = await generarCodigoInvitacion(
      payload.nombreCompleto,
      payload.lado
    );
  }

  try {
    await db.collection("invitados").add(payload);
    document.getElementById("crear-invitado-mensaje").textContent = "Invitado creado";
    crearInvitadoForm.reset();
    recalcularTotalInvitados(crearInvitadoForm);
    await actualizarCodigoSugerido();
    cerrarModal(modalCrearInstance);
    actualizarTagEditor(crearInvitadoForm, crearTagEditor);
    actualizarSugerenciaEtiqueta(crearEtiquetasInput, crearEtiquetasSugerencia);
    await cargarListaInvitados();
  } catch (error) {
    console.error("Error al crear invitado", error);
  }
}

/**
 * Actualiza campos del invitado seleccionado.
 */
async function actualizarInvitado(formData) {
  if (!invitadoSeleccionado) return;
  const payload = formDataToObject(formData);
  const adultosPlaneados = Number(formData.get("numAdultosPlaneados")) || 0;
  const ninosPlaneados = Number(formData.get("numNinosPlaneados")) || 0;
  payload.numAdultosPlaneados = adultosPlaneados;
  payload.numNinosPlaneados = ninosPlaneados;
  [
    "rsvpNumAsistentes",
    "prioridadListaEspera",
    "numInvitadosPermitidos",
  ].forEach((key) => {
    if (key in payload) payload[key] = Number(payload[key] || 0);
  });
  payload.numInvitadosPermitidos = adultosPlaneados + ninosPlaneados;
  ["vestimentaConfirmada", "viajeConfirmado", "hospedajeConfirmado", "esListaEspera"].forEach(
    (key) => {
      if (key in payload) payload[key] = payload[key] === "true";
    }
  );
  payload.etiquetas = parseEtiquetas(formData.get("etiquetas") || "");
  payload.contactoPrincipal =
    formData.get("contactoPrincipal")?.trim() || invitadoSeleccionado.contactoPrincipal || "";
  payload.contactosAdicionales = parseContactos(formData.get("contactosAdicionales") || "");
  const maxPermitidos =
    payload.numInvitadosPermitidos ??
    invitadoSeleccionado.numInvitadosPermitidos ??
    0;
  if (payload.rsvpNumAsistentes !== undefined && maxPermitidos > 0) {
    payload.rsvpNumAsistentes = Math.min(payload.rsvpNumAsistentes, maxPermitidos);
  }

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
async function borrarInvitadoPorId(id) {
  if (rolActual !== "admin") return;
  if (!id) return;
  if (!confirm("¿Deseas eliminar este registro?")) return;
  try {
    await db.collection("invitados").doc(id).delete();
    if (invitadoSeleccionado?.id === id) {
      limpiarSeleccionInvitado();
    }
    await cargarListaInvitados();
  } catch (error) {
    console.error("Error al borrar", error);
  }
}

async function borrarInvitado() {
  if (!invitadoSeleccionado) return;
  await borrarInvitadoPorId(invitadoSeleccionado.id);
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

async function cancelarInvitacion(id) {
  if (rolActual !== "admin" || !id) return;
  const invitado = invitadosCache.find((inv) => inv.id === id);
  if (!invitado) return;
  const confirmar = confirm(
    `¿Cancelar la invitación de ${invitado.nombreCompleto || "este invitado"}?`
  );
  if (!confirmar) return;
  try {
    await db
      .collection("invitados")
      .doc(id)
      .update({
        estadoInvitacion: "cancelado_por_tiempo",
        esListaEspera: false,
        rsvpNumAsistentes: 0,
      });
    await cargarListaInvitados();
  } catch (error) {
    console.error("Error al cancelar la invitación", error);
  }
}

async function moverInvitadoAListaEspera(id) {
  if (rolActual !== "admin" || !id) return;
  const invitado = invitadosCache.find((inv) => inv.id === id);
  if (!invitado || invitado.esListaEspera) return;
  const confirmar = confirm(
    `El invitado ${invitado.nombreCompleto || ""} pasará a la lista de espera. ¿Continuar?`
  );
  if (!confirmar) return;
  try {
    await db
      .collection("invitados")
      .doc(id)
      .update({
        esListaEspera: true,
        estadoInvitacion: "pendiente_primera_confirmacion",
        rsvpNumAsistentes: 0,
      });
    await cargarListaInvitados();
  } catch (error) {
    console.error("Error al mover a lista de espera", error);
  }
}

async function ajustarPrioridadListaEspera(id, delta) {
  if (rolActual !== "admin" || !id || !delta) return;
  const invitado = invitadosCache.find((inv) => inv.id === id);
  if (!invitado || !invitado.esListaEspera) return;
  const actual = Number(invitado.prioridadListaEspera) || 0;
  const nuevoValor = Math.max(0, actual + delta);
  try {
    await db.collection("invitados").doc(id).update({ prioridadListaEspera: nuevoValor });
    await cargarListaInvitados();
  } catch (error) {
    console.error("Error al ajustar prioridad", error);
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
  headerStatsSection?.classList.toggle("hidden", !isLogged);
  headerDatesSection?.classList.toggle("hidden", !isLogged);
  actualizarUIporRol();
  if (rolInfo) {
    rolInfo.textContent = `Rol actual: ${isLogged ? rolActual : "--"}`;
  }
  limpiarSeleccionInvitado();
  if (isLogged) {
    cargarListaInvitados().then(() => actualizarEstadosPorExpiracion());
    if (rolActual === "admin") {
      cargarConfiguracionFechas();
    }
    cargarItinerario();
    cargarDamasCaballeros();
    cargarPresupuestoItems();
    cargarApoyos();
  } else {
    filtroActual = "todos";
    filtroLado = "todos";
    ladoFilterSelect && (ladoFilterSelect.value = "todos");
    eventosItinerario = [];
    renderItinerario();
    damasCaballeros = [];
    renderDamasCaballeros();
    presupuestoItems = [];
    apoyosItems = [];
    renderPresupuesto();
    renderApoyos();
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

ladoFilterSelect?.addEventListener("change", (event) => {
  filtroLado = event.target.value;
  pintarTabla();
});

tablaBody?.addEventListener("click", (event) => {
  const button = event.target.closest("[data-action]");
  if (!button || !tablaBody.contains(button)) return;
  const action = button.dataset.action;
  const id = button.dataset.id || button.closest("tr")?.dataset.id;
  if (action === "toggle-contactos") {
    const targetId = button.dataset.target;
    if (!targetId) return;
    const panel = document.getElementById(targetId);
    if (!panel) return;
    panel.classList.toggle("hidden");
    button.textContent = panel.classList.contains("hidden") ? "Ver más" : "Ocultar";
    return;
  }
  if (!id) return;
  if (action === "seleccionar") {
    seleccionarInvitado(id);
  } else if (action === "borrar") {
    borrarInvitadoPorId(id);
  } else if (action === "cancelar") {
    cancelarInvitacion(id);
  } else if (action === "bajar-espera") {
    moverInvitadoAListaEspera(id);
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

addInvitadoBtn?.addEventListener("click", async () => {
  if (rolActual !== "admin") return;
  if (ladoCrearSelect) {
    ladoCrearSelect.value = ultimaSeleccionLadoInvitado || ladoCrearSelect.value;
  }
  await actualizarCodigoSugerido();
  abrirModal(modalCrearInstance);
  const nombreField =
    crearInvitadoForm &&
    crearInvitadoForm.elements &&
    crearInvitadoForm.elements["nombreCompleto"];
  if (nombreField && nombreField.focus) nombreField.focus();
  actualizarTagEditor(crearInvitadoForm, crearTagEditor);
  actualizarSugerenciaEtiqueta(crearEtiquetasInput, crearEtiquetasSugerencia);
  recalcularTotalInvitados(crearInvitadoForm);
});

nombreCrearInput?.addEventListener("input", actualizarCodigoSugerido);
ladoCrearSelect?.addEventListener("change", () => {
  if (ladoCrearSelect.value) {
    ultimaSeleccionLadoInvitado = ladoCrearSelect.value;
  }
  actualizarCodigoSugerido();
});
damasLadoSelect?.addEventListener("change", () => {
  if (damasLadoSelect.value) {
    ultimaSeleccionLadoDama = damasLadoSelect.value;
  }
});
damasRolSelect?.addEventListener("change", () => {
  if (damasRolSelect.value) {
    ultimaSeleccionRolDama = damasRolSelect.value;
  }
});
crearEtiquetasInput?.addEventListener("input", () => {
  actualizarSugerenciaEtiqueta(crearEtiquetasInput, crearEtiquetasSugerencia);
  actualizarTagEditor(crearInvitadoForm, crearTagEditor);
});
editarEtiquetasInput?.addEventListener("input", () => {
  actualizarSugerenciaEtiqueta(editarEtiquetasInput, editarEtiquetasSugerencia);
  actualizarTagEditor(editarInvitadoForm, editarTagEditor);
});
crearTagEditor?.addEventListener("click", eliminarEtiquetaDesdeEditor);
editarTagEditor?.addEventListener("click", eliminarEtiquetaDesdeEditor);
if (editarInvitadoForm?.elements["numInvitadosPermitidos"]) {
  editarInvitadoForm.elements["numInvitadosPermitidos"].addEventListener("input", () =>
    actualizarMaximoConfirmados(editarInvitadoForm)
  );
}

["numAdultosPlaneados", "numNinosPlaneados"].forEach((campo) => {
  const inputCrear = crearInvitadoForm?.elements?.[campo];
  if (inputCrear) {
    inputCrear.addEventListener("input", () => recalcularTotalInvitados(crearInvitadoForm));
  }
  const inputEditar = editarInvitadoForm?.elements?.[campo];
  if (inputEditar) {
    inputEditar.addEventListener("input", () => recalcularTotalInvitados(editarInvitadoForm));
  }
});
recalcularTotalInvitados(crearInvitadoForm);

tagFilterContainer?.addEventListener("click", (event) => {
  const tag = event.target?.dataset?.tag;
  if (!tag) return;
  if (filtrosEtiquetas.has(tag)) {
    filtrosEtiquetas.delete(tag);
  } else {
    filtrosEtiquetas.add(tag);
  }
  renderFiltroEtiquetas();
  pintarTabla();
});

editarInvitadoForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  actualizarInvitado(new FormData(event.target));
});

asignarLugarBtn?.addEventListener("click", asignarLugarListaEspera);

borrarInvitadoBtn?.addEventListener("click", borrarInvitado);

itinerarioForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  agregarEventoItinerario(new FormData(event.target));
});

itinerarioBody?.addEventListener("click", (event) => {
  const btn = event.target.closest("[data-action='borrar-itinerario']");
  if (!btn) return;
  const id = btn.closest("tr")?.dataset?.id;
  if (!id) return;
  borrarEventoItinerario(id);
});

damasForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  guardarDamaCaballero(new FormData(event.target));
});

addDamaBtn?.addEventListener("click", () => {
  if (rolActual !== "admin") return;
  abrirModalDama();
});

damasBody?.addEventListener("click", (event) => {
  const btn = event.target.closest("[data-action]");
  if (!btn) return;
  const action = btn.dataset.action;
  const row = btn.closest("tr");
  const id = row?.dataset?.id;
  if (!action || !id) return;
  if (action === "editar-dama") {
    const persona = damasCaballeros.find((item) => item.id === id);
    abrirModalDama(persona || null);
  } else if (action === "toggle-vestuario") {
    alternarVestuarioDama(id);
  } else if (action === "borrar-dama") {
    borrarDamaCaballero(id);
  }
});

waitlistBody?.addEventListener("click", (event) => {
  const button = event.target.closest("[data-action]");
  if (!button || !waitlistBody.contains(button)) return;
  if (button.dataset.action === "toggle-contactos") {
    const targetId = button.dataset.target;
    if (!targetId) return;
    const panel = document.getElementById(targetId);
    if (!panel) return;
    panel.classList.toggle("hidden");
    button.textContent = panel.classList.contains("hidden") ? "Ver más" : "Ocultar";
    return;
  }
  const row = button.closest("tr");
  const id = row?.dataset?.id;
  if (!id) return;
  const action = button.dataset.action;
  const invitado = invitadosCache.find((inv) => inv.id === id);
  if (!invitado) return;

  if (action === "promover") {
    const disponibles = calcularDisponibles();
    const cupoNecesario = Number(invitado.numInvitadosPermitidos) || 0;
    if (disponibles !== null && disponibles < cupoNecesario) {
      if (waitlistStatus) {
        waitlistStatus.textContent = "No hay cupos suficientes para este invitado.";
      }
      return;
    }
    abrirModalPromover(invitado);
  } else if (action === "seleccionar") {
    seleccionarInvitado(id);
  } else if (action === "borrar") {
    borrarInvitadoPorId(id);
  } else if (action === "prioridad-up") {
    ajustarPrioridadListaEspera(id, -1);
  } else if (action === "prioridad-down") {
    ajustarPrioridadListaEspera(id, 1);
  }
});

presupuestoForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  guardarPresupuestoItem(new FormData(event.target));
});

presupuestoBody?.addEventListener("click", (event) => {
  const btn = event.target.closest("[data-action='borrar-presupuesto']");
  if (!btn) return;
  const id = btn.dataset.id;
  if (!id) return;
  borrarPresupuestoItem(id);
});

apoyosForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  guardarApoyo(new FormData(event.target));
});

addPresupuestoBtn?.addEventListener("click", () => {
  if (rolActual !== "admin") return;
  presupuestoForm?.reset();
  if (presupuestoMensaje) presupuestoMensaje.textContent = "";
  modalPresupuestoInstance?.show();
});

addApoyoBtn?.addEventListener("click", () => {
  if (rolActual !== "admin") return;
  apoyosForm?.reset();
  if (apoyosMensaje) apoyosMensaje.textContent = "";
  modalApoyoInstance?.show();
});

apoyosBody?.addEventListener("click", (event) => {
  const btn = event.target.closest("[data-action='borrar-apoyo']");
  if (!btn) return;
  const id = btn.dataset.id;
  if (!id) return;
  borrarApoyo(id);
});

promoverForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!invitadoListaEsperaSeleccionado) return;
  const fechas = {
    fechaLimiteRespuesta: localInputValueToISO(
      promoverForm.fechaLimiteRespuesta.value
    ),
    fechaLimiteDetalles: localInputValueToISO(promoverForm.fechaLimiteDetalles.value),
  };
  const validacion = validarFechasPromover(fechas);
  if (!validacion.valido) {
    if (promoverMensaje) promoverMensaje.textContent = validacion.mensaje;
    return;
  }
  promoverInvitadoListaEspera(fechas);
});

applyDeadlinesAllBtn?.addEventListener("click", () => manejarAplicarFechas(true));
clearDeadlinesBtn?.addEventListener("click", limpiarFormularioFechas);
deadlineForm?.addEventListener("input", () => {
  actualizarEstadoPanelFechas("Cambios sin guardar");
  renderResumenFechas(obtenerFechasDelFormulario());
  actualizarResumenCapacidad();
});

panelTabs?.addEventListener("shown.bs.tab", (event) => {
  const targetId = event.target?.getAttribute("data-bs-target");
  if (targetId === "#tab-invitados" && dataTable) {
    setTimeout(() => {
      dataTable.columns.adjust().responsive.recalc();
    }, 0);
  }
});

guardarCapacidadBtn?.addEventListener("click", guardarCapacidadMaxima);

async function cargarConfiguracionFechas() {
  if (!deadlineForm || !deadlineStatus) return;
  try {
    const doc = await db.collection("configuracion").doc("fechasLimite").get();
    configuracionFechas = doc.exists ? doc.data() : {};
    if (deadlineForm.fechaBoda) {
      deadlineForm.fechaBoda.value = isoToLocalInputValue(configuracionFechas?.fechaBoda);
    }
    if (capacidadInput) {
      capacidadInput.value =
        configuracionFechas?.capacidadMaxima !== undefined &&
        configuracionFechas?.capacidadMaxima !== null
          ? configuracionFechas.capacidadMaxima
          : "";
    }
    deadlineForm.fechaLimiteRespuesta.value = isoToLocalInputValue(
      configuracionFechas?.fechaLimiteRespuesta
    );
    deadlineForm.fechaLimiteDetalles.value = isoToLocalInputValue(
      configuracionFechas?.fechaLimiteDetalles
    );
    actualizarEstadoPanelFechas("Sin cambios");
    renderResumenFechas(configuracionFechas);
    actualizarResumenCapacidad();
  } catch (error) {
    console.error("Error al cargar configuración de fechas", error);
    actualizarEstadoPanelFechas("Error al cargar");
  }
}

function actualizarEstadoPanelFechas(texto, tipo = "info") {
  if (!deadlineStatus) return;
  deadlineStatus.textContent = texto;
  deadlineStatus.classList.remove("tag-chip--empty");
  if (tipo === "error") {
    deadlineStatus.classList.add("tag-chip--empty");
  }
}

function isoToLocalInputValue(isoString) {
  if (!isoString) return "";
  const fecha = new Date(isoString);
  if (Number.isNaN(fecha.getTime())) return "";
  const ajustada = new Date(fecha.getTime() - fecha.getTimezoneOffset() * 60000);
  return ajustada.toISOString().slice(0, 16);
}

function localInputValueToISO(value) {
  if (!value) return null;
  const fecha = new Date(value);
  if (Number.isNaN(fecha.getTime())) return null;
  return fecha.toISOString();
}

function obtenerFechasDelFormulario() {
  if (!deadlineForm) {
    return {
      fechaBoda: null,
      fechaLimiteRespuesta: null,
      fechaLimiteDetalles: null,
      capacidadMaxima: null,
    };
  }
  const capacidadValor =
    capacidadInput && capacidadInput.value !== "" ? Number(capacidadInput.value) : null;
  return {
    fechaBoda: localInputValueToISO(deadlineForm.fechaBoda?.value),
    fechaLimiteRespuesta: localInputValueToISO(deadlineForm.fechaLimiteRespuesta.value),
    fechaLimiteDetalles: localInputValueToISO(deadlineForm.fechaLimiteDetalles.value),
    capacidadMaxima: capacidadValor,
  };
}

async function guardarFechasLimiteGlobales(fechas) {
  const payload = {
    fechaBoda: fechas.fechaBoda || null,
    fechaLimiteRespuesta: fechas.fechaLimiteRespuesta || null,
    fechaLimiteDetalles: fechas.fechaLimiteDetalles || null,
    capacidadMaxima: typeof fechas.capacidadMaxima === "number" ? fechas.capacidadMaxima : null,
    actualizadoEn: firebase.firestore.FieldValue.serverTimestamp(),
  };
  await db.collection("configuracion").doc("fechasLimite").set(payload, { merge: true });
  configuracionFechas = { ...configuracionFechas, ...fechas };
  renderResumenFechas(configuracionFechas);
}

async function aplicarFechasPorDefecto(fechas, aplicarATodos = false) {
  if (!fechas.fechaLimiteRespuesta && !fechas.fechaLimiteDetalles) return;
  const pendientes = invitadosCache.filter((invitado) => {
    const necesitaRespuesta =
      aplicarATodos ||
      (fechas.fechaLimiteRespuesta && !invitado.fechaLimiteRespuesta);
    const necesitaDetalles =
      aplicarATodos ||
      (fechas.fechaLimiteDetalles && !invitado.fechaLimiteDetalles);
    return necesitaRespuesta || necesitaDetalles;
  });
  if (!pendientes.length) {
    actualizarEstadoPanelFechas(
      aplicarATodos ? "Todos ya tenían fechas asignadas." : "No había invitados pendientes."
    );
    return;
  }

  const CHUNK = 400;
  for (let i = 0; i < pendientes.length; i += CHUNK) {
    const batch = db.batch();
    pendientes.slice(i, i + CHUNK).forEach((invitado) => {
      const ref = db.collection("invitados").doc(invitado.id);
      const data = {};
      if (
        fechas.fechaLimiteRespuesta &&
        (aplicarATodos || !invitado.fechaLimiteRespuesta)
      ) {
        data.fechaLimiteRespuesta = fechas.fechaLimiteRespuesta;
      }
      if (
        fechas.fechaLimiteDetalles &&
        (aplicarATodos || !invitado.fechaLimiteDetalles)
      ) {
        data.fechaLimiteDetalles = fechas.fechaLimiteDetalles;
      }
      batch.update(ref, data);
    });
    await batch.commit();
  }
  await cargarListaInvitados();
}

async function manejarAplicarFechas(aplicarATodos = false) {
  if (rolActual !== "admin" || !deadlineForm) return;
  const fechas = obtenerFechasDelFormulario();
  if (!fechas.fechaBoda && !fechas.fechaLimiteRespuesta && !fechas.fechaLimiteDetalles) {
    actualizarEstadoPanelFechas("Ingresa al menos una fecha", "error");
    return;
  }
  try {
    actualizarEstadoPanelFechas("Guardando...");
    await guardarFechasLimiteGlobales(fechas);
    if (fechas.fechaLimiteRespuesta || fechas.fechaLimiteDetalles) {
      await aplicarFechasPorDefecto(fechas, aplicarATodos);
    }
    actualizarEstadoPanelFechas("Fechas aplicadas");
  } catch (error) {
    console.error("Error al aplicar fechas límite", error);
    actualizarEstadoPanelFechas("Error al aplicar fechas", "error");
  }
}

function limpiarFormularioFechas() {
  if (!deadlineForm) return;
  deadlineForm.reset();
  if (configuracionFechas) {
    if (deadlineForm.fechaBoda) {
      deadlineForm.fechaBoda.value = isoToLocalInputValue(configuracionFechas.fechaBoda);
    }
    deadlineForm.fechaLimiteRespuesta.value = isoToLocalInputValue(
      configuracionFechas.fechaLimiteRespuesta
    );
    deadlineForm.fechaLimiteDetalles.value = isoToLocalInputValue(
      configuracionFechas.fechaLimiteDetalles
    );
  }
  actualizarEstadoPanelFechas("Sin cambios");
  renderResumenFechas(configuracionFechas || {});
}

async function guardarCapacidadMaxima() {
  if (rolActual !== "admin") return;
  if (!capacidadInput || capacidadInput.value === "") {
    actualizarEstadoPanelFechas("Ingresa una capacidad válida", "error");
    return;
  }
  const valor = Number(capacidadInput.value);
  if (Number.isNaN(valor) || valor < 0) {
    actualizarEstadoPanelFechas("Capacidad inválida", "error");
    return;
  }
  const payload = {
    fechaBoda: configuracionFechas?.fechaBoda || null,
    fechaLimiteRespuesta: configuracionFechas?.fechaLimiteRespuesta || null,
    fechaLimiteDetalles: configuracionFechas?.fechaLimiteDetalles || null,
    capacidadMaxima: valor,
  };
  try {
    actualizarEstadoPanelFechas("Guardando capacidad...");
    await guardarFechasLimiteGlobales(payload);
    actualizarEstadoPanelFechas("Capacidad actualizada");
    renderResumenFechas({ ...configuracionFechas, capacidadMaxima: valor });
  } catch (error) {
    console.error("Error al guardar capacidad", error);
    actualizarEstadoPanelFechas("No se pudo guardar la capacidad", "error");
  }
}

function renderResumenFechas(fechas = {}) {
  if (summaryFechaRespuesta) {
    summaryFechaRespuesta.textContent = formatearFechaResumen(fechas.fechaLimiteRespuesta);
  }
  if (headerFechaRespuesta) {
    headerFechaRespuesta.textContent = formatearFechaResumen(fechas.fechaLimiteRespuesta);
  }
  if (summaryFechaDetalles) {
    summaryFechaDetalles.textContent = formatearFechaResumen(fechas.fechaLimiteDetalles);
  }
  if (headerFechaDetalles) {
    headerFechaDetalles.textContent = formatearFechaResumen(fechas.fechaLimiteDetalles);
  }
  if (summaryFechaBoda) {
    summaryFechaBoda.textContent = formatearFechaResumen(fechas.fechaBoda);
  }
  if (headerFechaBoda) {
    headerFechaBoda.textContent = formatearFechaResumen(fechas.fechaBoda);
  }
  if (summaryCapacidad) {
    summaryCapacidad.textContent =
      typeof fechas.capacidadMaxima === "number" && !Number.isNaN(fechas.capacidadMaxima)
        ? fechas.capacidadMaxima
        : "--";
  }
  if (capacidadInput) {
    capacidadInput.value =
      typeof fechas.capacidadMaxima === "number" && !Number.isNaN(fechas.capacidadMaxima)
        ? fechas.capacidadMaxima
        : "";
  }
  actualizarResumenCapacidad();
}

function formatearFechaResumen(iso) {
  if (!iso) return "--";
  const fecha = new Date(iso);
  if (Number.isNaN(fecha.getTime())) return "--";
  return fecha.toLocaleString("es-MX", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

async function cargarItinerario() {
  if (!itinerarioBody) return;
  try {
    const snap = await db.collection("itinerario").orderBy("hora").get();
    eventosItinerario = snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    renderItinerario();
  } catch (error) {
    console.error("Error al cargar itinerario", error);
    itinerarioBody.innerHTML =
      '<tr><td colspan="4">No pudimos cargar el itinerario.</td></tr>';
  }
}

function renderItinerario() {
  if (!itinerarioBody) return;
  if (!eventosItinerario.length) {
    itinerarioBody.innerHTML =
      '<tr><td colspan="4">Todavía no hay eventos en el itinerario.</td></tr>';
    return;
  }
  itinerarioBody.innerHTML = eventosItinerario
    .map(
      (evento) => `
        <tr data-id="${evento.id}">
          <td>${evento.nombreEvento || "-"}</td>
          <td>${evento.lugarEvento || "-"}</td>
          <td>${formatearFechaHora(evento.hora)}</td>
          <td>
            <button class="btn btn--ghost btn--danger" data-action="borrar-itinerario">
              Borrar
            </button>
          </td>
        </tr>
      `
    )
    .join("");
}

async function agregarEventoItinerario(formData) {
  if (rolActual !== "admin") {
    if (itinerarioMensaje) {
      itinerarioMensaje.textContent = "Solo los administradores pueden agregar eventos.";
    }
    return;
  }
  const nombreEvento = formData.get("nombreEvento")?.trim();
  const lugarEvento = formData.get("lugarEvento")?.trim();
  const horaEvento = formData.get("horaEvento");
  if (!nombreEvento || !lugarEvento || !horaEvento) {
    if (itinerarioMensaje) {
      itinerarioMensaje.textContent = "Completa todos los campos.";
    }
    return;
  }
  const fecha = new Date(horaEvento);
  if (Number.isNaN(fecha.getTime())) {
    if (itinerarioMensaje) {
      itinerarioMensaje.textContent = "La fecha del evento no es válida.";
    }
    return;
  }
  try {
    await db.collection("itinerario").add({
      nombreEvento,
      lugarEvento,
      hora: fecha.toISOString(),
      creadoEn: firebase.firestore.FieldValue.serverTimestamp(),
    });
    itinerarioForm.reset();
    if (itinerarioMensaje) itinerarioMensaje.textContent = "Evento agregado.";
    await cargarItinerario();
  } catch (error) {
    console.error("Error al agregar evento", error);
    if (itinerarioMensaje) itinerarioMensaje.textContent = "No pudimos agregar el evento.";
  }
}

async function borrarEventoItinerario(id) {
  if (rolActual !== "admin") return;
  if (!id) return;
  if (!confirm("¿Deseas eliminar este evento?")) return;
  try {
    await db.collection("itinerario").doc(id).delete();
    await cargarItinerario();
  } catch (error) {
    console.error("Error al borrar evento", error);
  }
}

async function cargarDamasCaballeros() {
  if (!damasBody) return;
  try {
    const snap = await db.collection("damasCaballeros").orderBy("nombre").get();
    damasCaballeros = snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    renderDamasCaballeros();
  } catch (error) {
    console.error("Error al cargar damas y caballeros", error);
    damasBody.innerHTML =
      '<tr><td colspan="6">No pudimos cargar esta sección.</td></tr>';
  }
}

function renderDamasCaballeros() {
  if (!damasBody) return;
  actualizarResumenDamasCaballeros();
  if (!damasCaballeros.length) {
    damasBody.innerHTML =
      '<tr><td colspan="6">Aún no has agregado damas ni caballeros.</td></tr>';
    return;
  }
  damasBody.innerHTML = damasCaballeros
    .map((persona) => {
      const vestuario = persona.vestuarioConfirmado
        ? '<span class="status-pill status-pill--fase1">Listo</span>'
        : '<span class="status-pill status-pill--pendiente">Pendiente</span>';
      const imagen = persona.imagen
        ? `<a href="${persona.imagen}" target="_blank" rel="noopener">Ver imagen</a>`
        : "—";
      return `
        <tr data-id="${persona.id}">
          <td>${persona.nombre || "-"}</td>
          <td>${persona.lado || "-"}</td>
          <td>${persona.rol || "-"}</td>
          <td>${vestuario}</td>
          <td>${imagen}</td>
          <td>
            <button class="btn btn--ghost" data-action="editar-dama" data-id="${persona.id}">
              Editar
            </button>
            <button class="btn btn--ghost" data-action="toggle-vestuario" data-id="${persona.id}">
              Cambiar estado
            </button>
            <button class="btn btn--ghost btn--danger" data-action="borrar-dama" data-id="${persona.id}">
              Borrar
            </button>
          </td>
        </tr>
      `;
    })
    .join("");
}

function actualizarResumenDamasCaballeros() {
  if (!countDamasElem || !countCaballerosElem) return;
  const damas = damasCaballeros.filter(
    (persona) => (persona.rol || "").toLowerCase() === "dama"
  ).length;
  const caballeros = damasCaballeros.filter(
    (persona) => (persona.rol || "").toLowerCase() === "caballero"
  ).length;
  countDamasElem.textContent = damas;
  countCaballerosElem.textContent = caballeros;
}

async function cargarPresupuestoItems() {
  if (!presupuestoBody) return;
  try {
    const snap = await db.collection("presupuesto").orderBy("concepto").get();
    presupuestoItems = snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    renderPresupuesto();
  } catch (error) {
    console.error("Error al cargar presupuesto", error);
    presupuestoBody.innerHTML =
      '<tr><td colspan="7">No pudimos cargar los movimientos.</td></tr>';
  }
}

async function cargarApoyos() {
  if (!apoyosBody) return;
  try {
    const snap = await db.collection("presupuestoApoyos").orderBy("descripcion").get();
    apoyosItems = snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    renderApoyos();
  } catch (error) {
    console.error("Error al cargar apoyos", error);
    apoyosBody.innerHTML = '<tr><td colspan="3">No pudimos cargar los apoyos.</td></tr>';
  }
}

function renderPresupuesto() {
  if (!presupuestoBody) return;
  if (!presupuestoItems.length) {
    presupuestoBody.innerHTML =
      '<tr><td colspan="8">Todavía no registras movimientos.</td></tr>';
  } else {
    const puedeBorrar = rolActual === "admin";
    presupuestoBody.innerHTML = presupuestoItems
      .map((item) => {
        const total = Number(item.totalCalculado) || 0;
        const costoAdulto =
          item.modalidad === "por_persona"
            ? formatearMoneda(item.costoAdulto || 0)
            : "—";
        const costoNino =
          item.modalidad === "por_persona" && item.costoNino
            ? formatearMoneda(item.costoNino || 0)
            : item.modalidad === "por_persona"
            ? "—"
            : "—";
        const adultosAplicados =
          item.modalidad === "por_persona" ? item.totalAdultosAplicados || 0 : "-";
        const ninosAplicados =
          item.modalidad === "por_persona" ? item.totalNinosAplicados || 0 : "-";
        return `
          <tr data-id="${item.id}">
            <td>${item.concepto || "-"}</td>
            <td>${(item.tipo || "").toUpperCase()}</td>
            <td>${item.modalidad === "por_persona" ? "Por persona" : "Costo fijo"}</td>
            <td>${item.modalidad === "fijo" ? formatearMoneda(item.montoBase) : "—"}</td>
            <td>${item.modalidad === "por_persona" ? `${costoAdulto} × ${adultosAplicados}` : "—"}</td>
            <td>${
              item.modalidad === "por_persona" && (item.costoNino || 0) > 0
                ? `${costoNino} × ${ninosAplicados}`
                : item.modalidad === "por_persona"
                ? "—"
                : "—"
            }</td>
            <td>${formatearMoneda(total)}</td>
            <td>
              <button class="btn btn--ghost btn--danger" data-action="borrar-presupuesto" data-id="${item.id}" ${
                puedeBorrar ? "" : "disabled"
              }>Eliminar</button>
            </td>
          </tr>
        `;
      })
      .join("");
  }
  actualizarResumenFinanciero();
}

function renderApoyos() {
  if (!apoyosBody) return;
  if (!apoyosItems.length) {
    apoyosBody.innerHTML = '<tr><td colspan="3">Aún no registras apoyos.</td></tr>';
  } else {
    const puedeBorrar = rolActual === "admin";
    apoyosBody.innerHTML = apoyosItems
      .map(
        (item) => `
        <tr data-id="${item.id}">
          <td>${item.descripcion || "-"}</td>
          <td>${formatearMoneda(item.monto)}</td>
          <td>
            <button class="btn btn--ghost btn--danger" data-action="borrar-apoyo" data-id="${item.id}" ${
              puedeBorrar ? "" : "disabled"
            }>Eliminar</button>
          </td>
        </tr>
      `
      )
      .join("");
  }
  actualizarResumenFinanciero();
}

async function guardarPresupuestoItem(formData) {
  if (rolActual !== "admin") {
    if (presupuestoMensaje) presupuestoMensaje.textContent = "Solo los administradores pueden agregar.";
    return;
  }
  const concepto = formData.get("concepto")?.trim();
  const tipo = formData.get("tipo") || "gasto";
  const modalidad = formData.get("modalidad") || "fijo";
  const montoBase = Number(formData.get("montoBase"));
  const costoAdulto = Number(formData.get("costoAdulto"));
  const costoNino = Number(formData.get("costoNino"));
  if (!concepto) {
    if (presupuestoMensaje) presupuestoMensaje.textContent = "Completa el concepto.";
    return;
  }
  let totalCalculado = 0;
  let numPersonas = 0;
  let totalAdultosAplicados = 0;
  let totalNinosAplicados = 0;
  if (modalidad === "por_persona") {
    if (Number.isNaN(costoAdulto) || costoAdulto <= 0) {
      if (presupuestoMensaje) presupuestoMensaje.textContent =
        "Ingresa el costo por adulto para este concepto.";
      return;
    }
    totalAdultosAplicados = contarAdultosActivos();
    totalNinosAplicados = contarNinosActivos();
    totalCalculado = costoAdulto * totalAdultosAplicados;
    if (!Number.isNaN(costoNino) && costoNino > 0) {
      totalCalculado += costoNino * totalNinosAplicados;
    }
    numPersonas = totalAdultosAplicados + totalNinosAplicados;
  } else {
    if (Number.isNaN(montoBase) || montoBase <= 0) {
      if (presupuestoMensaje) presupuestoMensaje.textContent = "Ingresa un monto fijo válido.";
      return;
    }
    totalCalculado = montoBase;
  }
  try {
    await db.collection("presupuesto").add({
      concepto,
      tipo,
      modalidad,
      montoBase,
      numPersonas,
      totalCalculado,
      costoAdulto: Number.isNaN(costoAdulto) ? 0 : costoAdulto,
      costoNino: Number.isNaN(costoNino) ? 0 : costoNino,
      totalAdultosAplicados,
      totalNinosAplicados,
      creadoEn: firebase.firestore.FieldValue.serverTimestamp(),
    });
    presupuestoForm?.reset();
    if (presupuestoMensaje) presupuestoMensaje.textContent = "Movimiento agregado.";
    modalPresupuestoInstance?.hide();
    await cargarPresupuestoItems();
  } catch (error) {
    console.error("Error al guardar movimiento", error);
    if (presupuestoMensaje) presupuestoMensaje.textContent =
      "No pudimos registrar el movimiento.";
  }
}

async function borrarPresupuestoItem(id) {
  if (rolActual !== "admin" || !id) return;
  if (!confirm("¿Eliminar este movimiento?")) return;
  try {
    await db.collection("presupuesto").doc(id).delete();
    await cargarPresupuestoItems();
  } catch (error) {
    console.error("Error al borrar movimiento", error);
  }
}

async function guardarApoyo(formData) {
  if (rolActual !== "admin") {
    if (apoyosMensaje) apoyosMensaje.textContent = "Solo los administradores pueden agregar.";
    return;
  }
  const descripcion = formData.get("descripcion")?.trim();
  const monto = Number(formData.get("monto"));
  if (!descripcion || Number.isNaN(monto)) {
    if (apoyosMensaje) apoyosMensaje.textContent = "Completa la descripción y el monto.";
    return;
  }
  try {
    await db.collection("presupuestoApoyos").add({
      descripcion,
      monto,
      creadoEn: firebase.firestore.FieldValue.serverTimestamp(),
    });
    apoyosForm?.reset();
    if (apoyosMensaje) apoyosMensaje.textContent = "Apoyo registrado.";
    modalApoyoInstance?.hide();
    await cargarApoyos();
  } catch (error) {
    console.error("Error al guardar apoyo", error);
    if (apoyosMensaje) apoyosMensaje.textContent = "No pudimos registrar el apoyo.";
  }
}

async function borrarApoyo(id) {
  if (rolActual !== "admin" || !id) return;
  if (!confirm("¿Eliminar este apoyo/ahorro?")) return;
  try {
    await db.collection("presupuestoApoyos").doc(id).delete();
    await cargarApoyos();
  } catch (error) {
    console.error("Error al borrar apoyo", error);
  }
}

function calcularTotalesPresupuesto() {
  const totales = {
    ingresos: 0,
    gastos: 0,
    apoyos: 0,
  };
  presupuestoItems.forEach((item) => {
    const total = Number(item.totalCalculado) || 0;
    if (item.tipo === "ingreso") {
      totales.ingresos += total;
    } else {
      totales.gastos += total;
    }
  });
  apoyosItems.forEach((apoyo) => {
    totales.apoyos += Number(apoyo.monto) || 0;
  });
  return totales;
}

function actualizarResumenFinanciero() {
  if (!budgetIngresosElem || !budgetGastosElem) return;
  const totales = calcularTotalesPresupuesto();
  budgetIngresosElem.textContent = formatearMoneda(totales.ingresos);
  budgetGastosElem.textContent = formatearMoneda(totales.gastos);
  budgetApoyosElem.textContent = formatearMoneda(totales.apoyos);
  const balance = totales.ingresos + totales.apoyos - totales.gastos;
  budgetBalanceElem.textContent = formatearMoneda(balance);
  actualizarGraficaPresupuesto(totales);
}

function actualizarGraficaPresupuesto(totales) {
  if (!presupuestoChartCanvas || typeof Chart === "undefined") return;
  const dataset = [
    Math.max(0, totales.gastos),
    Math.max(0, totales.ingresos + totales.apoyos),
  ];
  const dataConfig = {
    labels: ["Gastos", "Recursos"],
    datasets: [
      {
        data: dataset,
        backgroundColor: ["#cc8a9f", "#a3bc43"],
      },
    ],
  };
  if (presupuestoChart) {
    presupuestoChart.data = dataConfig;
    presupuestoChart.update();
  } else {
    presupuestoChart = new Chart(presupuestoChartCanvas, {
      type: "pie",
      data: dataConfig,
      options: {
        plugins: {
          legend: {
            position: "bottom",
          },
        },
      },
    });
  }
}

function abrirModalDama(persona = null) {
  if (!damasForm) return;
  damaSeleccionada = persona;
  if (damasMensaje) damasMensaje.textContent = "";
  damasForm.reset();
  damasForm.elements["id"].value = persona?.id || "";
  damasForm.elements["nombre"].value = persona?.nombre || "";
  damasForm.elements["lado"].value =
    persona?.lado || ultimaSeleccionLadoDama || "novia";
  damasForm.elements["rol"].value = persona?.rol || ultimaSeleccionRolDama || "dama";
  damasForm.elements["vestuarioConfirmado"].value = persona?.vestuarioConfirmado ? "true" : "false";
  damasForm.elements["imagen"].value = persona?.imagen || "";
  modalDamaInstance?.show();
}

async function guardarDamaCaballero(formData) {
  if (rolActual !== "admin") {
    if (damasMensaje) damasMensaje.textContent = "Solo los administradores pueden agregar.";
    return;
  }
  const id = formData.get("id")?.trim();
  const nombre = formData.get("nombre")?.trim();
  const lado = formData.get("lado") || "novia";
  const rol = formData.get("rol") || "dama";
  const vestuarioConfirmado = formData.get("vestuarioConfirmado") === "true";
  const imagen = formData.get("imagen")?.trim() || "";
  if (!nombre || !lado || !rol) {
    if (damasMensaje) damasMensaje.textContent = "Completa todos los campos obligatorios.";
    return;
  }
  try {
    if (id) {
      await db
        .collection("damasCaballeros")
        .doc(id)
        .update({ nombre, lado, rol, vestuarioConfirmado, imagen });
      if (damasMensaje) damasMensaje.textContent = "Registro actualizado.";
    } else {
      await db.collection("damasCaballeros").add({
        nombre,
        lado,
        rol,
        vestuarioConfirmado,
        imagen,
        creadoEn: firebase.firestore.FieldValue.serverTimestamp(),
      });
      if (damasMensaje) damasMensaje.textContent = "Agregado al listado.";
    }
    damasForm.reset();
    modalDamaInstance?.hide();
    await cargarDamasCaballeros();
  } catch (error) {
    console.error("Error al guardar damas/caballeros", error);
    if (damasMensaje) damasMensaje.textContent = "No pudimos guardar el registro.";
  }
}

async function alternarVestuarioDama(id) {
  if (!id) return;
  const persona = damasCaballeros.find((item) => item.id === id);
  if (!persona) return;
  try {
    await db
      .collection("damasCaballeros")
      .doc(id)
      .update({ vestuarioConfirmado: !persona.vestuarioConfirmado });
    await cargarDamasCaballeros();
  } catch (error) {
    console.error("Error al actualizar vestuario", error);
  }
}

async function borrarDamaCaballero(id) {
  if (rolActual !== "admin") return;
  if (!id) return;
  if (!confirm("¿Deseas eliminar este registro?")) return;
  try {
    await db.collection("damasCaballeros").doc(id).delete();
    await cargarDamasCaballeros();
  } catch (error) {
    console.error("Error al borrar registro de damas/caballeros", error);
  }
}

function obtenerCapacidadMaxima() {
  if (deadlineForm?.capacidadMaxima && deadlineForm.capacidadMaxima.value !== "") {
    return Number(deadlineForm.capacidadMaxima.value);
  }
  if (
    configuracionFechas &&
    typeof configuracionFechas.capacidadMaxima === "number" &&
    !Number.isNaN(configuracionFechas.capacidadMaxima)
  ) {
    return configuracionFechas.capacidadMaxima;
  }
  return 0;
}

function esInvitadoActivoParaCapacidad(invitado) {
  if (!invitado || invitado.esListaEspera) return false;
  const estado = (invitado.estadoInvitacion || "").trim();
  return !ESTADOS_CAPACIDAD_EXCLUIDOS.has(estado);
}

function contarInvitadosActivos() {
  return invitadosCache
    .filter(esInvitadoActivoParaCapacidad)
    .reduce(
      (acc, invitado) => acc + (Number(invitado.numInvitadosPermitidos) || 0),
      0
    );
}

function contarInvitadosPorLado(lado) {
  const ladoNormalizado = (lado || "").toLowerCase();
  if (!ladoNormalizado) return 0;
  return invitadosCache
    .filter(
      (invitado) =>
        esInvitadoActivoParaCapacidad(invitado) &&
        (invitado.lado || "").toLowerCase() === ladoNormalizado
    )
    .reduce(
      (acc, invitado) => acc + (Number(invitado.numInvitadosPermitidos) || 0),
      0
    );
}

function contarInvitacionesPorLado(lado) {
  const ladoNormalizado = (lado || "").toLowerCase();
  if (!ladoNormalizado) return 0;
  return invitadosCache.filter(
    (invitado) =>
      esInvitadoActivoParaCapacidad(invitado) &&
      (invitado.lado || "").toLowerCase() === ladoNormalizado
  ).length;
}

function contarInvitadosListaEspera() {
  return invitadosCache
    .filter((invitado) => invitado.esListaEspera)
    .reduce(
      (acc, invitado) => acc + (Number(invitado.numInvitadosPermitidos) || 0),
      0
    );
}

function contarAdultosActivos() {
  return invitadosCache
    .filter(esInvitadoActivoParaCapacidad)
    .reduce((acc, invitado) => acc + (Number(invitado.numAdultosPlaneados) || 0), 0);
}

function contarNinosActivos() {
  return invitadosCache
    .filter(esInvitadoActivoParaCapacidad)
    .reduce((acc, invitado) => acc + (Number(invitado.numNinosPlaneados) || 0), 0);
}

function calcularDisponibles() {
  const max = obtenerCapacidadMaxima();
  if (!max) return null;
  const ocupados = contarInvitadosActivos();
  return Math.max(0, max - ocupados);
}

function actualizarResumenCapacidad() {
  const noviaActivos = contarInvitadosPorLado("novia");
  const novioActivos = contarInvitadosPorLado("novio");
  if (summaryNovia) summaryNovia.textContent = noviaActivos;
  if (summaryNovio) summaryNovio.textContent = novioActivos;
  const totalNovia = contarInvitacionesPorLado("novia");
  const totalNovio = contarInvitacionesPorLado("novio");
  if (summaryNoviaTotal) summaryNoviaTotal.textContent = totalNovia;
  if (summaryNovioTotal) summaryNovioTotal.textContent = totalNovio;

  if (!summaryDisponibles) return;
  const max = obtenerCapacidadMaxima();
  const disponibles = calcularDisponibles();
  if (!max) {
    summaryDisponibles.textContent = "--";
    if (waitlistStatus) {
      waitlistStatus.textContent = "Define una capacidad máxima para habilitar ascensos.";
    }
    if (headerActivos) headerActivos.textContent = contarInvitadosActivos();
    if (headerEspera) headerEspera.textContent = contarInvitadosListaEspera();
    if (headerDisponibles) headerDisponibles.textContent = "--";
    return;
  }
  const libres = disponibles ?? 0;
  summaryDisponibles.textContent = `${libres} disponibles de ${max}`;
  if (headerActivos) headerActivos.textContent = contarInvitadosActivos();
  if (headerEspera) headerEspera.textContent = contarInvitadosListaEspera();
  if (headerDisponibles) headerDisponibles.textContent = libres;
  if (waitlistStatus) {
    waitlistStatus.textContent =
      disponibles && disponibles > 0
        ? `Hay ${disponibles} lugares disponibles.`
        : "Sin lugares disponibles por ahora.";
  }
}

function abrirModalPromover(invitado) {
  if (!promoverForm) return;
  invitadoListaEsperaSeleccionado = invitado;
  if (promoverDetalle) {
    promoverDetalle.textContent = `Subirás a ${invitado.nombreCompleto || "invitado"} (${
      invitado.prioridadListaEspera ?? "prioridad sin definir"
    }).`;
  }
  if (promoverMensaje) promoverMensaje.textContent = "";
  promoverForm.fechaLimiteRespuesta.value = isoToLocalInputValue(
    configuracionFechas?.fechaLimiteRespuesta
  );
  promoverForm.fechaLimiteDetalles.value = isoToLocalInputValue(
    configuracionFechas?.fechaLimiteDetalles
  );
  abrirModal(modalPromoverInstance);
}

function validarFechasPromover(fechas) {
  if (!fechas.fechaLimiteRespuesta || !fechas.fechaLimiteDetalles) {
    return { valido: false, mensaje: "Completa ambas fechas." };
  }
  const ahora = new Date();
  const fechaRespuesta = new Date(fechas.fechaLimiteRespuesta);
  const fechaDetalles = new Date(fechas.fechaLimiteDetalles);
  if (Number.isNaN(fechaRespuesta.getTime()) || Number.isNaN(fechaDetalles.getTime())) {
    return { valido: false, mensaje: "Fechas inválidas." };
  }
  if (fechaRespuesta <= ahora || fechaDetalles <= ahora) {
    return { valido: false, mensaje: "Las fechas deben ser posteriores a hoy." };
  }
  if (fechaDetalles <= fechaRespuesta) {
    return {
      valido: false,
      mensaje: "La fecha del checklist debe ser después de la fecha de respuesta.",
    };
  }
  return { valido: true };
}

async function promoverInvitadoListaEspera(fechas) {
  if (!invitadoListaEsperaSeleccionado) return;
  const disponibles = calcularDisponibles();
  const cupoNecesario =
    Number(invitadoListaEsperaSeleccionado.numInvitadosPermitidos) || 0;
  if (disponibles !== null && disponibles < cupoNecesario) {
    if (promoverMensaje) promoverMensaje.textContent = "No hay cupos disponibles suficientes.";
    return;
  }
  try {
    await db
      .collection("invitados")
      .doc(invitadoListaEsperaSeleccionado.id)
      .update({
        esListaEspera: false,
        estadoInvitacion: "pendiente_primera_confirmacion",
        fechaLimiteRespuesta: fechas.fechaLimiteRespuesta,
        fechaLimiteDetalles: fechas.fechaLimiteDetalles,
      });
    if (promoverMensaje) promoverMensaje.textContent = "Invitado promovido.";
    invitadoListaEsperaSeleccionado = null;
    cerrarModal(modalPromoverInstance);
    await cargarListaInvitados();
  } catch (error) {
    console.error("Error al promover invitado", error);
    if (promoverMensaje) promoverMensaje.textContent = "Error al promover invitado.";
  }
}
