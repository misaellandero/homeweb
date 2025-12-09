// Lógica pública para el RSVP
const codigoForm = document.getElementById("codigo-form");
const rsvpForm = document.getElementById("rsvp-form");
const codigoMensaje = document.getElementById("codigo-mensaje");
const estadoDetalle = document.getElementById("estado-invitado");
const contadorTiempo = document.getElementById("contador-tiempo");
const fase2Fieldset = document.getElementById("fase2");
const acompanantesHelp = document.getElementById("acompanantes-help");
const heroDateEl = document.getElementById("hero-date");

let invitadoActual = null;
let detenerCuentaRegresiva = null;

/**
 * Busca el invitado en Firestore usando el código proporcionado.
 * @param {string} codigo Codigo de invitación capturado en el formulario.
 */
async function cargarInvitadoPorCodigo(codigo) {
  try {
    codigoMensaje.textContent = "Validando código...";
    const snap = await db
      .collection("invitados")
      .where("codigoInvitacion", "==", codigo.trim())
      .limit(1)
      .get();

    if (snap.empty) {
      codigoMensaje.textContent = "No encontramos ese código. Verifica tu invitación.";
      rsvpForm.classList.add("hidden");
      invitadoActual = null;
      return;
    }

    invitadoActual = { id: snap.docs[0].id, ...snap.docs[0].data() };
    codigoMensaje.textContent = `Hola ${invitadoActual.nombreCompleto || "invitado"}.`;
    prepararFormularioSegunEstado();
  } catch (error) {
    console.error("Error al cargar invitado", error);
    codigoMensaje.textContent = "Ocurrió un error al validar. Intenta más tarde.";
  }
}

/**
 * Ajusta la UI del formulario según el estado de la invitación.
 */
function prepararFormularioSegunEstado() {
  if (!invitadoActual) return;
  rsvpForm.classList.remove("hidden");
  acompanantesHelp.textContent = `Máximo permitido: ${
    invitadoActual.numInvitadosPermitidos ?? 0
  }`;
  const campoAcompanantes = document.getElementById("numAcompanantes");
  campoAcompanantes.max = invitadoActual.numInvitadosPermitidos || 0;
  campoAcompanantes.value = invitadoActual.rsvpNumAsistentes || 0;

  inicializarEstadoInvitado(construirEstadoPublico(invitadoActual));
  const requiereFase2 =
    invitadoActual.estadoInvitacion === "confirmado_fase1" ||
    invitadoActual.estadoInvitacion === "confirmado_final";
  fase2Fieldset.classList.toggle("hidden", !requiereFase2);

  const radioObjetivo = document.querySelector(
    `input[name="asistencia"][value="${
      invitadoActual.estadoInvitacion === "rechazado" ? "no" : "si"
    }"]`
  );
  if (radioObjetivo) radioObjetivo.checked = true;

  document.getElementById("comentarios").value = invitadoActual.notas || "";
  document.getElementById("vestimentaConfirmada").checked = !!invitadoActual.vestimentaConfirmada;
  document.getElementById("viajeConfirmado").checked = !!invitadoActual.viajeConfirmado;
  document.getElementById("hospedajeConfirmado").checked = !!invitadoActual.hospedajeConfirmado;
}

/**
 * Guarda la respuesta del invitado en Firestore.
 */
async function guardarRSVP(event) {
  event.preventDefault();
  if (!invitadoActual) return;

  const asistencia = rsvpForm.elements["asistencia"].value;
  const numAcompanantes = parseInt(
    rsvpForm.elements["numAcompanantes"].value,
    10
  );
  const comentarios = rsvpForm.elements["comentarios"].value;
  const vestimenta = document.getElementById("vestimentaConfirmada").checked;
  const viaje = document.getElementById("viajeConfirmado").checked;
  const hospedaje = document.getElementById("hospedajeConfirmado").checked;

  const nuevoEstado = determinarEstado(asistencia, {
    vestimenta,
    viaje,
    hospedaje,
  });

  const payload = {
    rsvpNumAsistentes: asistencia === "si" ? numAcompanantes + 1 : 0,
    notas: comentarios,
    vestimentaConfirmada: vestimenta,
    viajeConfirmado: viaje,
    hospedajeConfirmado: hospedaje,
    estadoInvitacion: nuevoEstado,
    fechaConfirmacionFase1:
      nuevoEstado !== "pendiente_primera_confirmacion"
        ? firebase.firestore.FieldValue.serverTimestamp()
        : invitadoActual.fechaConfirmacionFase1 || null,
  };

  try {
    await db.collection("invitados").doc(invitadoActual.id).update(payload);
    invitadoActual.estadoInvitacion = nuevoEstado;
    if (estadoDetalle) {
      estadoDetalle.textContent = "¡Respuesta guardada!";
    }
    if (contadorTiempo) contadorTiempo.textContent = "";
    inicializarEstadoInvitado(construirEstadoPublico(invitadoActual));
  } catch (error) {
    console.error("Error al guardar RSVP", error);
    if (estadoDetalle) {
      estadoDetalle.textContent = "No pudimos guardar tu respuesta, intenta de nuevo.";
    }
  }
}

/**
 * Determina el estado de la invitación basado en las respuestas.
 */
function determinarEstado(asistencia, extras) {
  if (asistencia === "no") return "rechazado";
  if (extras.vestimenta && extras.viaje && extras.hospedaje) {
    return "confirmado_final";
  }
  return "confirmado_fase1";
}

function construirEstadoPublico(invitado) {
  if (!invitado) return null;
  return {
    estado: mapearEstadoPublico(invitado.estadoInvitacion || invitado.estado),
    fechaLimiteRespuesta: invitado.fechaLimiteRespuesta,
    fechaLimiteDetalles: invitado.fechaLimiteDetalles,
  };
}

function mapearEstadoPublico(estadoOriginal = "") {
  const conocidos = new Set([
    "SIN_RESPUESTA",
    "DIJO_QUE_SI",
    "SI_CONFIRMADO",
    "NO_VA",
    "CANCELADO_TIEMPO",
  ]);
  const upper = (estadoOriginal || "").toUpperCase();
  if (conocidos.has(upper)) return upper;
  switch (estadoOriginal) {
    case "pendiente_primera_confirmacion":
      return "SIN_RESPUESTA";
    case "confirmado_fase1":
      return "DIJO_QUE_SI";
    case "confirmado_final":
      return "SI_CONFIRMADO";
    case "rechazado":
      return "NO_VA";
    case "cancelado_por_tiempo":
      return "CANCELADO_TIEMPO";
    default:
      return "SIN_RESPUESTA";
  }
}

function inicializarEstadoInvitado(invitado) {
  if (!estadoDetalle) return;

  if (detenerCuentaRegresiva) {
    detenerCuentaRegresiva();
    detenerCuentaRegresiva = null;
  }
  if (contadorTiempo) {
    contadorTiempo.textContent = "";
    delete contadorTiempo.dataset.countdownLabel;
  }

  if (!invitado) {
    estadoDetalle.textContent = "No encontramos información de tu invitación.";
    return;
  }

  switch (invitado.estado) {
    case "SIN_RESPUESTA": {
      estadoDetalle.textContent = "Aún no has respondido si vas a asistir.";
      if (!contadorTiempo) break;
      if (!invitado.fechaLimiteRespuesta) {
        contadorTiempo.textContent = "No tenemos una fecha límite configurada.";
        break;
      }
      contadorTiempo.dataset.countdownLabel = "Tu invitación se cancelará en:";
      detenerCuentaRegresiva = iniciarCuentaRegresiva(
        invitado.fechaLimiteRespuesta,
        contadorTiempo,
        () => {
          if (contadorTiempo) {
            contadorTiempo.textContent =
              "Tu invitación ha sido cancelada por no responder a tiempo.";
          }
          // TODO: Actualizar el estado en Firebase cuando expire la primera respuesta.
          notificarExpiracionRespuesta();
        }
      );
      break;
    }
    case "DIJO_QUE_SI": {
      estadoDetalle.innerHTML =
        "<p>Gracias por confirmar que vas a asistir.</p><p>Debes confirmar tu traje y viaje antes de:</p>";
      if (!contadorTiempo) break;
      if (!invitado.fechaLimiteDetalles) {
        contadorTiempo.textContent = "No tenemos una fecha límite configurada.";
        break;
      }
      contadorTiempo.dataset.countdownLabel = "Tiempo restante:";
      detenerCuentaRegresiva = iniciarCuentaRegresiva(
        invitado.fechaLimiteDetalles,
        contadorTiempo,
        () => {
          estadoDetalle.textContent =
            "Tu lugar ha sido liberado porque no confirmaste tus detalles a tiempo.";
          if (contadorTiempo) contadorTiempo.textContent = "";
          // TODO: Actualizar el estado en Firebase cuando expire la confirmación de detalles.
          notificarExpiracionDetalles();
        }
      );
      break;
    }
    case "SI_CONFIRMADO": {
      estadoDetalle.textContent = "Todo listo 🎉 Has confirmado asistencia, traje y viaje.";
      break;
    }
    case "NO_VA":
    case "CANCELADO_TIEMPO": {
      estadoDetalle.textContent = "Esta invitación ya no está activa.";
      break;
    }
    default: {
      estadoDetalle.textContent = "Seguimos procesando tu invitación.";
    }
  }
}

function iniciarCuentaRegresiva(fechaLimite, elementoDestino, onExpire) {
  if (!elementoDestino || !fechaLimite) return null;
  const fechaObjetivo =
    fechaLimite instanceof Date ? fechaLimite : new Date(fechaLimite);
  if (Number.isNaN(fechaObjetivo.getTime())) {
    elementoDestino.textContent = "Fecha no disponible.";
    return null;
  }

  const prefijo = elementoDestino.dataset?.countdownLabel
    ? `${elementoDestino.dataset.countdownLabel.trim()} `
    : "";

  const renderTiempo = () => {
    const restante = fechaObjetivo.getTime() - Date.now();
    if (restante <= 0) {
      elementoDestino.textContent = `${prefijo}0 días 00:00:00`;
      if (typeof onExpire === "function") onExpire();
      return false;
    }
    const partes = convertirMilisegundosADHMS(restante);
    elementoDestino.textContent = `${prefijo}${partes.dias} días ${formatearDosDigitos(
      partes.horas
    )}:${formatearDosDigitos(partes.minutos)}:${formatearDosDigitos(partes.segundos)}`;
    return true;
  };

  if (!renderTiempo()) {
    return null;
  }

  const intervalId = window.setInterval(() => {
    if (!renderTiempo()) {
      window.clearInterval(intervalId);
    }
  }, 1000);

  return () => window.clearInterval(intervalId);
}

function convertirMilisegundosADHMS(ms) {
  const segundosTotales = Math.floor(ms / 1000);
  const dias = Math.floor(segundosTotales / 86400);
  const horas = Math.floor((segundosTotales % 86400) / 3600);
  const minutos = Math.floor((segundosTotales % 3600) / 60);
  const segundos = segundosTotales % 60;
  return { dias, horas, minutos, segundos };
}

function formatearDosDigitos(valor) {
  return String(Math.max(0, valor)).padStart(2, "0");
}

function notificarExpiracionRespuesta() {
  // Implementa aquí la actualización de estado en Firebase cuando expire la primera respuesta.
}

function notificarExpiracionDetalles() {
  // Implementa aquí la actualización de estado en Firebase cuando expire la confirmación de detalles.
}

async function cargarDatosEvento() {
  if (!heroDateEl) return;
  try {
    const doc = await db.collection("configuracion").doc("fechasLimite").get();
    if (doc.exists && doc.data().fechaBoda) {
      heroDateEl.textContent = formatearFechaBoda(doc.data().fechaBoda);
    }
  } catch (error) {
    console.error("Error al cargar fecha del evento", error);
  }
}

function formatearFechaBoda(isoString) {
  const fecha = new Date(isoString);
  if (Number.isNaN(fecha.getTime())) return "Fecha por confirmar";
  const opcionesFecha = {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  };
  const opcionesHora = {
    hour: "numeric",
    minute: "2-digit",
  };
  const fechaTexto = new Intl.DateTimeFormat("es-MX", opcionesFecha).format(fecha);
  const horaTexto = new Intl.DateTimeFormat("es-MX", opcionesHora).format(fecha);
  return `${capitalizar(fechaTexto)} · ${horaTexto}`;
}

function capitalizar(texto) {
  if (!texto) return "";
  return texto.charAt(0).toUpperCase() + texto.slice(1);
}

codigoForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const codigo = codigoForm.codigoInvitacion.value;
  if (!codigo) return;
  cargarInvitadoPorCodigo(codigo);
});

rsvpForm?.addEventListener("submit", guardarRSVP);

cargarDatosEvento();
