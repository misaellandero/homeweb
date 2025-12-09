// Lógica pública para el RSVP
const codigoForm = document.getElementById("codigo-form");
const rsvpForm = document.getElementById("rsvp-form");
const codigoMensaje = document.getElementById("codigo-mensaje");
const estadoBox = document.getElementById("estadoInvitacion");
const fase2Fieldset = document.getElementById("fase2");
const acompanantesHelp = document.getElementById("acompanantes-help");

let invitadoActual = null;

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

  estadoBox.textContent = estadoLegible(invitadoActual.estadoInvitacion);

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
 * Convierte el estado interno en una descripción amigable.
 */
function estadoLegible(estado) {
  const map = {
    pendiente_primera_confirmacion: "Invitación pendiente, esperando tu respuesta",
    confirmado_fase1: "¡Gracias! Confirmaste la fase 1",
    confirmado_final: "Confirmación final completa",
    rechazado: "Has indicado que no asistirás",
    cancelado_por_tiempo: "Invitación cancelada por tiempo",
  };
  return map[estado] || "Estado por confirmar";
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
    estadoBox.textContent = "¡Respuesta guardada!";
  } catch (error) {
    console.error("Error al guardar RSVP", error);
    estadoBox.textContent = "No pudimos guardar tu respuesta, intenta de nuevo.";
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

codigoForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const codigo = codigoForm.codigoInvitacion.value;
  if (!codigo) return;
  cargarInvitadoPorCodigo(codigo);
});

rsvpForm?.addEventListener("submit", guardarRSVP);
