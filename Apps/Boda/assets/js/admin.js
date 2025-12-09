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
const waitlistBody = document.getElementById("waitlist-body");
const waitlistStatus = document.getElementById("waitlist-status");
const modalPromover = document.getElementById("modal-promover");
const promoverForm = document.getElementById("promover-form");
const promoverDetalle = document.getElementById("promover-detalle");
const promoverMensaje = document.getElementById("promover-mensaje");
const headerActivos = document.getElementById("header-activos");
const headerEspera = document.getElementById("header-espera");
const headerDisponibles = document.getElementById("header-disponibles");
const panelTabs = document.getElementById("panelTabs");
const capacidadInput = document.getElementById("capacidadMaxima");
const guardarCapacidadBtn = document.getElementById("guardar-capacidad");

const modalCrearInstance =
  typeof bootstrap !== "undefined" && modalCrear ? new bootstrap.Modal(modalCrear) : null;
const modalEditarInstance =
  typeof bootstrap !== "undefined" && modalEditar ? new bootstrap.Modal(modalEditar) : null;
const modalPromoverInstance =
  typeof bootstrap !== "undefined" && modalPromover ? new bootstrap.Modal(modalPromover) : null;

let filtroActual = "todos";
let invitadosCache = [];
let invitadoSeleccionado = null;
let invitadoListaEsperaSeleccionado = null;
let rolActual = "verificador";
let filtrosEtiquetas = new Set();
let etiquetasDisponibles = [];
let dataTable = null;
let configuracionFechas = null;

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

function renderAcciones(id) {
  const puedeEditar = true;
  const puedeBorrar = rolActual === "admin";
  return `
    <button class="btn btn--ghost" data-action="seleccionar" data-id="${id}" ${
      puedeEditar ? "" : "disabled"
    }>Editar</button>
    <button class="btn btn--ghost btn--danger" data-action="borrar" data-id="${id}" ${
      puedeBorrar ? "" : "disabled"
    }>Borrar</button>
  `;
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
  const estadoValor = invitado.estadoInvitacion || "";
  const estadoInfo = invitado.esListaEspera
    ? { label: "Lista de espera", className: "status-pill--waitlist" }
    : obtenerInfoEstado(estadoValor);
  const ladoInfo = obtenerInfoLado(invitado.lado);
  return {
    id: invitado.id,
    nombreCompleto: invitado.nombreCompleto || "",
    lado: invitado.lado || "-",
    ladoRender: ladoInfo.render,
    codigoInvitacion: invitado.codigoInvitacion || "-",
    numInvitadosPermitidos: invitado.numInvitadosPermitidos ?? "-",
    estadoInvitacion: estadoValor || "-",
    estadoLegible: estadoInfo.label,
    estadoRender: renderEstadoPill(estadoInfo),
    rsvpNumAsistentes: invitado.rsvpNumAsistentes ?? 0,
    vestimenta: invitado.vestimentaConfirmada ? "Sí" : "No",
    viaje: invitado.viajeConfirmado ? "Sí" : "No",
    hospedaje: invitado.hospedajeConfirmado ? "Sí" : "No",
    listaEspera: invitado.esListaEspera ? "Sí" : "No",
    prioridad: invitado.prioridadListaEspera ?? "-",
    etiquetasTexto: etiquetas.join(", "),
    etiquetasRender: renderTagChips(etiquetas),
  };
}

function construirColumnasDataTable() {
  return [
    { data: "nombreCompleto", title: "Nombre completo" },
    {
      data: "lado",
      title: "Lado",
      render: (data, type, row) => (type === "display" ? row.ladoRender : data),
    },
    { data: "codigoInvitacion", title: "Código" },
    { data: "numInvitadosPermitidos", title: "N° invitados" },
    {
      data: "estadoLegible",
      title: "Estado",
      render: (data, type, row) => (type === "display" ? row.estadoRender : data),
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
    { data: "prioridad", title: "Prioridad" },
    {
      data: "etiquetasTexto",
      title: "Etiquetas",
      orderable: false,
      render: (data, type, row) => (type === "display" ? row.etiquetasRender : data),
    },
    {
      data: "id",
      title: "Acciones",
      orderable: false,
      searchable: false,
      render: (data, type) => (type === "display" ? renderAcciones(data) : data),
    },
  ];
}

function pintarTabla() {
  const filtrados = invitadosCache.filter((invitado) => filtrarInvitado(invitado));
  const data = filtrados.map(mapInvitadoToRow);

  if (!dataTable) {
    dataTable = $("#tabla-invitados").DataTable({
      data,
      columns: construirColumnasDataTable(),
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
  renderTablaListaEspera();
  actualizarResumenCapacidad();
}

function renderTablaListaEspera() {
  if (!waitlistBody) return;
  const disponibles = calcularDisponibles();
  const puedePromover = typeof disponibles === "number" ? disponibles > 0 : false;
  const lista = invitadosCache
    .filter((inv) => inv.esListaEspera)
    .sort((a, b) => {
      const prioA = typeof a.prioridadListaEspera === "number" ? a.prioridadListaEspera : 9999;
      const prioB = typeof b.prioridadListaEspera === "number" ? b.prioridadListaEspera : 9999;
      return prioA - prioB;
    });

  if (!lista.length) {
    waitlistBody.innerHTML =
      '<tr><td colspan="4">No hay invitados en lista de espera.</td></tr>';
    return;
  }

  waitlistBody.innerHTML = lista
    .map((inv) => {
      const prio =
        inv.prioridadListaEspera ?? "—";
      const estado = inv.estadoInvitacion || "Pendiente";
      const estadoInfo = inv.esListaEspera
        ? { label: "Lista de espera", className: "status-pill--waitlist" }
        : obtenerInfoEstado(estado);
      const disabled = !puedePromover ? "disabled" : "";
      const puedeEditar = true;
      const puedeBorrar = rolActual === "admin";
      return `
        <tr data-id="${inv.id}">
          <td>${inv.nombreCompleto || "Sin nombre"}</td>
          <td>${prio}</td>
          <td>${estadoInfo ? renderEstadoPill(estadoInfo) : estado}</td>
          <td>
            <button class="btn btn--ghost" data-action="seleccionar" ${
              puedeEditar ? "" : "disabled"
            }>Editar</button>
            <button class="btn btn--ghost btn--danger" data-action="borrar" ${
              puedeBorrar ? "" : "disabled"
            }>Borrar</button>
            <button class="btn btn--ghost" data-action="promover" ${disabled}>
              Subir a invitado
            </button>
          </td>
        </tr>
      `;
    })
    .join("");
}

/**
 * Determina si el invitado pasa el filtro seleccionado.
 */
function filtrarInvitado(invitado) {
  if (filtroActual !== "lista-espera" && invitado.esListaEspera) {
    return false;
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
  for (const [key, value] of Object.entries(invitadoSeleccionado)) {
    if (editarInvitadoForm.elements[key] === undefined) continue;
    if (key === "etiquetas" && Array.isArray(value)) {
      editarInvitadoForm.elements[key].value = value.join(", ");
      continue;
    }
    editarInvitadoForm.elements[key].value = value;
  }
  editarInvitadoForm.elements["id"].value = invitadoSeleccionado.id;
  actualizarMaximoConfirmados(editarInvitadoForm);
  abrirModal(modalEditarInstance);
}

/**
 * Crea un invitado nuevo en Firestore.
 */
async function crearInvitado(formData) {
  if (rolActual !== "admin") return;
  const payload = formDataToObject(formData);
  payload.numInvitadosPermitidos = Number(payload.numInvitadosPermitidos || 0);
  payload.prioridadListaEspera = Number(payload.prioridadListaEspera || 0);
  payload.fechaLimiteRespuesta =
    payload.fechaLimiteRespuesta || deadlineForm?.fechaLimiteRespuesta?.value || null;
  payload.fechaLimiteDetalles =
    payload.fechaLimiteDetalles || deadlineForm?.fechaLimiteDetalles?.value || null;
  payload.esListaEspera = payload.esListaEspera === "true";
  payload.fechaEnvioInvitacion = payload.fechaEnvioInvitacion || new Date().toISOString();
  payload.etiquetas = parseEtiquetas(formData.get("etiquetas") || "");
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
    await actualizarCodigoSugerido();
    cerrarModal(modalCrearInstance);
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
  ["rsvpNumAsistentes", "prioridadListaEspera", "numInvitadosPermitidos"].forEach((key) => {
    if (key in payload) payload[key] = Number(payload[key] || 0);
  });
  ["vestimentaConfirmada", "viajeConfirmado", "hospedajeConfirmado", "esListaEspera"].forEach(
    (key) => {
      if (key in payload) payload[key] = payload[key] === "true";
    }
  );
  payload.etiquetas = parseEtiquetas(formData.get("etiquetas") || "");
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
  limpiarSeleccionInvitado();
  if (isLogged) {
    cargarListaInvitados().then(() => actualizarEstadosPorExpiracion());
    if (rolActual === "admin") {
      cargarConfiguracionFechas();
    }
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
  const button = event.target.closest("[data-action]");
  if (!button || !tablaBody.contains(button)) return;
  const action = button.dataset.action;
  const id = button.dataset.id || button.closest("tr")?.dataset.id;
  if (!id) return;
  if (action === "seleccionar") {
    seleccionarInvitado(id);
  } else if (action === "borrar") {
    borrarInvitadoPorId(id);
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
  await actualizarCodigoSugerido();
  abrirModal(modalCrearInstance);
  const nombreField =
    crearInvitadoForm &&
    crearInvitadoForm.elements &&
    crearInvitadoForm.elements["nombreCompleto"];
  if (nombreField && nombreField.focus) nombreField.focus();
});

nombreCrearInput?.addEventListener("input", actualizarCodigoSugerido);
ladoCrearSelect?.addEventListener("change", actualizarCodigoSugerido);
if (editarInvitadoForm?.elements["numInvitadosPermitidos"]) {
  editarInvitadoForm.elements["numInvitadosPermitidos"].addEventListener("input", () =>
    actualizarMaximoConfirmados(editarInvitadoForm)
  );
}

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

waitlistBody?.addEventListener("click", (event) => {
  const button = event.target.closest("[data-action]");
  if (!button || !waitlistBody.contains(button)) return;
  const row = button.closest("tr");
  const id = row?.dataset?.id;
  if (!id) return;
  const action = button.dataset.action;
  const invitado = invitadosCache.find((inv) => inv.id === id);
  if (!invitado) return;

  if (action === "promover") {
    const disponibles = calcularDisponibles();
    if (disponibles !== null && disponibles <= 0) {
      if (waitlistStatus) {
        waitlistStatus.textContent = "No hay cupos libres para subir invitados.";
      }
      return;
    }
    abrirModalPromover(invitado);
  } else if (action === "seleccionar") {
    seleccionarInvitado(id);
  } else if (action === "borrar") {
    borrarInvitadoPorId(id);
  }
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
  if (summaryFechaDetalles) {
    summaryFechaDetalles.textContent = formatearFechaResumen(fechas.fechaLimiteDetalles);
  }
  if (summaryFechaBoda) {
    summaryFechaBoda.textContent = formatearFechaResumen(fechas.fechaBoda);
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

function contarInvitadosActivos() {
  return invitadosCache.filter((invitado) => !invitado.esListaEspera).length;
}

function calcularDisponibles() {
  const max = obtenerCapacidadMaxima();
  if (!max) return null;
  const ocupados = contarInvitadosActivos();
  return Math.max(0, max - ocupados);
}

function actualizarResumenCapacidad() {
  if (!summaryDisponibles) return;
  const max = obtenerCapacidadMaxima();
  const disponibles = calcularDisponibles();
  if (!max) {
    summaryDisponibles.textContent = "--";
    if (waitlistStatus) {
      waitlistStatus.textContent = "Define una capacidad máxima para habilitar ascensos.";
    }
    return;
  }
  const libres = disponibles ?? 0;
  summaryDisponibles.textContent = `${libres} disponibles de ${max}`;
  if (headerActivos) headerActivos.textContent = contarInvitadosActivos();
  if (headerEspera)
    headerEspera.textContent = invitadosCache.filter((inv) => inv.esListaEspera).length;
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
  if (disponibles !== null && disponibles <= 0) {
    if (promoverMensaje) promoverMensaje.textContent = "No hay cupos disponibles.";
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
