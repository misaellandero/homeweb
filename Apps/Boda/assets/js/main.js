// Lógica pública para el RSVP
const codigoForm = document.getElementById("codigo-form");
const rsvpForm = document.getElementById("rsvp-form");
const codigoMensaje = document.getElementById("codigo-mensaje");
const estadoDetalle = document.getElementById("estado-invitado");
const contadorTiempo = document.getElementById("contador-tiempo");
const acompanantesHelp = document.getElementById("acompanantes-help");
const acompanantesInput = document.getElementById("numAcompanantes");
const numNinosConfirmadosInput = document.getElementById("numNinosConfirmados");
const nombresAsistentesInput = document.getElementById("nombresAsistentes");
const resumenCard = document.getElementById("rsvp-resumen");
const resumenEditarBtn = document.getElementById("resumen-editar");
const resumenEstadoElem = document.getElementById("resumen-estado");
const resumenEstadoDetalleElem = document.getElementById("resumen-estado-detalle");
const resumenTiempoElem = document.getElementById("resumen-tiempo");
const resumenAsistentesElem = document.getElementById("resumen-asistentes");
const resumenNinosElem = document.getElementById("resumen-ninos");
const resumenNombresElem = document.getElementById("resumen-nombres");
const resumenViajeElem = document.getElementById("resumen-viaje");
const resumenAsistenciaElem = document.getElementById("resumen-asistencia");
const resumenVestimentaElem = document.getElementById("resumen-vestimenta");
const resumenComentariosElem = document.getElementById("resumen-comentarios");
const heroDateEl = document.getElementById("hero-date");
const pasoMensaje = document.getElementById("paso-mensaje");
const stepSections = document.querySelectorAll(".form-step");
const stepIndicators = document.querySelectorAll(".rsvp-step");
const stepPrevBtn = document.getElementById("step-prev");
const stepNextBtn = document.getElementById("step-next");
const stepSubmitBtn = document.getElementById("step-submit");
const asistenciaViajeField = document.getElementById("asistencia-viaje-field");

let invitadoActual = null;
let detenerCuentaRegresiva = null;
let pasoActual = 1;
const TOTAL_PASOS = 3;
let rsvpModoEdicion = true;

function obtenerOpcionesRadio(nombre) {
  if (!rsvpForm || !nombre) return [];
  const campos = rsvpForm.elements[nombre];
  if (!campos) return [];
  if (campos.length !== undefined) {
    return Array.from(campos);
  }
  return [campos];
}

function obtenerValorRadio(nombre) {
  const opciones = obtenerOpcionesRadio(nombre);
  const seleccionada = opciones.find((input) => input.checked);
  return seleccionada ? seleccionada.value : "";
}

function establecerValorRadio(nombre, valor) {
  const opciones = obtenerOpcionesRadio(nombre);
  if (!opciones.length) return;
  opciones.forEach((input) => {
    input.checked = valor ? input.value === valor : false;
  });
}

function mostrarMensajePaso(texto = "") {
  if (pasoMensaje) pasoMensaje.textContent = texto;
}

function sincronizarCampoViaje() {
  if (!asistenciaViajeField) return;
  const planeaViajar = obtenerValorRadio("planeaViajar");
  const mostrar = planeaViajar === "si";
  asistenciaViajeField.classList.toggle("hidden", !mostrar);
  if (!mostrar) {
    establecerValorRadio("requiereAsistencia", "");
  }
}

function sincronizarCampoAsistencia() {
  const asistencia = obtenerValorRadio("asistencia");
  if (acompanantesInput) {
    const habilitado = asistencia === "si";
    acompanantesInput.disabled = !habilitado;
    if (!habilitado) {
      acompanantesInput.value = 0;
    } else {
      const maxPermitido = Math.max(Number(acompanantesInput.max || 0), 0);
      const valorActual = Number(acompanantesInput.value);
      if (Number.isNaN(valorActual) || valorActual < 1) {
        acompanantesInput.value = maxPermitido > 0 ? 1 : 0;
      } else if (maxPermitido > 0 && valorActual > maxPermitido) {
        acompanantesInput.value = maxPermitido;
      }
    }
  }
  if (numNinosConfirmadosInput) {
    numNinosConfirmadosInput.disabled = asistencia !== "si";
    if (asistencia !== "si") {
      numNinosConfirmadosInput.value = 0;
    } else {
      const maxPermitido = Math.max(Number(numNinosConfirmadosInput.max || 0), 0);
      const valorActual = Number(numNinosConfirmadosInput.value);
      if (Number.isNaN(valorActual) || valorActual < 0) {
        numNinosConfirmadosInput.value = 0;
      } else if (maxPermitido > 0 && valorActual > maxPermitido) {
        numNinosConfirmadosInput.value = maxPermitido;
      }
    }
  }
  if (nombresAsistentesInput) {
    nombresAsistentesInput.disabled = asistencia !== "si";
    if (asistencia !== "si") {
      nombresAsistentesInput.value = "";
    }
  }
  actualizarLimiteNinos();
  if (asistencia !== "si") {
    establecerValorRadio("planeaViajar", "no");
    sincronizarCampoViaje();
  }
}

function actualizarLimiteNinos(maxPermitidos = null) {
  if (!numNinosConfirmadosInput) return;
  const referencia =
    maxPermitidos !== null
      ? maxPermitidos
      : Math.max(Number(acompanantesInput?.value || 0), 0);
  if (referencia >= 0) {
    numNinosConfirmadosInput.max = referencia;
  }
  const valorActual = Number(numNinosConfirmadosInput.value);
  if (Number.isNaN(valorActual) || valorActual < 0) {
    numNinosConfirmadosInput.value = 0;
  } else if (valorActual > referencia) {
    numNinosConfirmadosInput.value = referencia;
  }
}

function normalizarListaNombres(texto = "") {
  if (!texto) return [];
  return texto
    .split(/[\n,]/)
    .map((entry) => entry.trim())
    .filter((entry) => entry.length > 0);
}

function estaRSVPCompleto(invitado) {
  if (!invitado) return false;
  const estado = (invitado.estadoInvitacion || invitado.estado || "").toLowerCase();
  return estado === "en_espera_codigo";
}

function obtenerDescripcionEstadoResumen(invitado) {
  if (!invitado) return "--";
  const estadoPublico = mapearEstadoPublico(invitado.estadoInvitacion || invitado.estado);
  switch (estadoPublico) {
    case "EN_ESPERA_CODIGO":
      return "Confirmación completa";
    case "DIJO_QUE_SI":
      return "Pendiente de detalles";
    case "SI_CONFIRMADO":
      return "Checklist finalizado";
    case "NO_VA":
      return "No asistirá";
    case "CANCELADO_TIEMPO":
      return "Invitación cancelada";
    default:
      return "Sin respuesta";
  }
}

function actualizarResumenRSVP() {
  if (!invitadoActual || !resumenCard) return;
  const asistentesTotal = Number(invitadoActual.rsvpNumAsistentes) || 0;
  const ninosTotal = Number(invitadoActual.rsvpNumNinos) || 0;
  const nombres = Array.isArray(invitadoActual.rsvpNombresAsistentes)
    ? invitadoActual.rsvpNombresAsistentes
    : typeof invitadoActual.rsvpNombresAsistentes === "string"
    ? normalizarListaNombres(invitadoActual.rsvpNombresAsistentes)
    : [];
  const planeaViajar = invitadoActual.planeaViajar === true ? "Sí" : "No";
  const requiereAsistencia = invitadoActual.requiereAsistenciaViaje ? "Sí" : "No";
  const vestimenta = invitadoActual.vestimentaConfirmada ? "Confirmada" : "Pendiente";
  resumenAsistentesElem &&
    (resumenAsistentesElem.textContent =
      asistentesTotal > 0 ? `${asistentesTotal} persona${asistentesTotal === 1 ? "" : "s"}` : "Sin confirmar");
  resumenNinosElem &&
    (resumenNinosElem.textContent = ninosTotal > 0 ? `${ninosTotal} niño${ninosTotal === 1 ? "" : "s"}` : "Sin niños registrados");
  resumenNombresElem &&
    (resumenNombresElem.textContent = nombres.length ? nombres.join("\n") : "Aún no registras nombres.");
  resumenViajeElem && (resumenViajeElem.textContent = planeaViajar);
  resumenAsistenciaElem && (resumenAsistenciaElem.textContent = planeaViajar === "Sí" ? requiereAsistencia : "No aplica");
  resumenVestimentaElem && (resumenVestimentaElem.textContent = vestimenta);
  resumenComentariosElem &&
    (resumenComentariosElem.textContent = invitadoActual.notas?.trim() || "Sin comentarios adicionales.");
}

function aplicarModoRSVP() {
  const completado = estaRSVPCompleto(invitadoActual);
  if (completado) {
    actualizarResumenRSVP();
  }
  const mostrarResumen = completado && !rsvpModoEdicion;
  if (rsvpForm) {
    rsvpForm.classList.toggle("hidden", mostrarResumen);
  }
  resumenCard?.classList.toggle("hidden", !mostrarResumen);
}

function actualizarPasoUI() {
  stepSections.forEach((section) => {
    const stepValue = Number(section.dataset.step);
    section.classList.toggle("is-active", stepValue === pasoActual);
  });
  stepIndicators.forEach((indicator) => {
    const stepValue = Number(indicator.dataset.step);
    indicator.classList.toggle("is-active", stepValue === pasoActual);
  });
  stepPrevBtn?.classList.toggle("hidden", pasoActual === 1);
  stepNextBtn?.classList.toggle("hidden", pasoActual === TOTAL_PASOS);
  stepSubmitBtn?.classList.toggle("hidden", pasoActual !== TOTAL_PASOS);
}

function cambiarPaso(nuevoPaso) {
  const clamped = Math.min(Math.max(1, nuevoPaso), TOTAL_PASOS);
  pasoActual = clamped;
  mostrarMensajePaso("");
  actualizarPasoUI();
}

function validarPaso(step) {
  if (!rsvpForm) return true;
  const asistencia = obtenerValorRadio("asistencia");
  switch (step) {
    case 1: {
      if (!asistencia) {
        mostrarMensajePaso("Selecciona si asistirás para continuar.");
        return false;
      }
      if (asistencia === "si" && acompanantesInput) {
        const max = Number(acompanantesInput.max || 0);
        const valor = Number(acompanantesInput.value || 0);
        if (Number.isNaN(valor) || valor < 0) {
          mostrarMensajePaso("Indica un número válido de asistentes.");
          return false;
        }
        if (max >= 0 && valor > max) {
          mostrarMensajePaso(`Tu invitación permite máximo ${max} asistentes.`);
          return false;
        }
        if (numNinosConfirmadosInput) {
          const valorNinos = Number(numNinosConfirmadosInput.value || 0);
          if (Number.isNaN(valorNinos) || valorNinos < 0) {
            mostrarMensajePaso("Indica cuántos niños asistirán o deja 0 si no aplica.");
            return false;
          }
          if (valorNinos > valor) {
            mostrarMensajePaso("El número de niños no puede ser mayor al total de asistentes.");
            return false;
          }
        }
      }
      break;
    }
    case 2: {
      if (asistencia !== "si") break;
      const planeaViajar = obtenerValorRadio("planeaViajar");
      if (!planeaViajar) {
        mostrarMensajePaso("Cuéntanos si viajarás para poder apoyarte.");
        return false;
      }
      if (planeaViajar === "si" && !obtenerValorRadio("requiereAsistencia")) {
        mostrarMensajePaso("Indica si necesitas asistencia con el viaje.");
        return false;
      }
      break;
    }
    case 3: {
      if (asistencia === "si" && !document.getElementById("vestimentaConfirmada").checked) {
        mostrarMensajePaso("Confirma que revisaste el código de vestimenta.");
        return false;
      }
      break;
    }
    default:
      break;
  }
  mostrarMensajePaso("");
  return true;
}

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
      cambiarPaso(1);
      mostrarMensajePaso("");
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
  const totalPermitidosRaw = Number(invitadoActual.numInvitadosPermitidos);
  const maxPermitidos =
    Number.isFinite(totalPermitidosRaw) && totalPermitidosRaw >= 0 ? totalPermitidosRaw : 1;
  const asistentesRegistrados =
    invitadoActual.rsvpNumAsistentes && invitadoActual.rsvpNumAsistentes > 0
      ? invitadoActual.rsvpNumAsistentes
      : 0;
  acompanantesHelp.textContent = `Máximo permitido según tu invitación: ${maxPermitidos}`;
  if (acompanantesInput) {
    acompanantesInput.max = maxPermitidos;
    acompanantesInput.value = Math.min(asistentesRegistrados, maxPermitidos);
  }
  if (numNinosConfirmadosInput) {
    numNinosConfirmadosInput.max = maxPermitidos;
    const valorNinos = Number(invitadoActual.rsvpNumNinos) || 0;
    numNinosConfirmadosInput.value = Math.min(Math.max(valorNinos, 0), maxPermitidos);
  }
  if (nombresAsistentesInput) {
    if (Array.isArray(invitadoActual.rsvpNombresAsistentes)) {
      nombresAsistentesInput.value = invitadoActual.rsvpNombresAsistentes.join("\n");
    } else if (typeof invitadoActual.rsvpNombresAsistentes === "string") {
      nombresAsistentesInput.value = invitadoActual.rsvpNombresAsistentes;
    } else {
      nombresAsistentesInput.value = "";
    }
  }
  actualizarLimiteNinos(maxPermitidos);

  inicializarEstadoInvitado(construirEstadoPublico(invitadoActual));
  const asistenciaValor =
    invitadoActual.estadoInvitacion === "rechazado" ? "no" : "si";
  establecerValorRadio("asistencia", asistenciaValor);
  const planeaValor =
    invitadoActual.planeaViajar === true
      ? "si"
      : invitadoActual.planeaViajar === false
      ? "no"
      : "";
  establecerValorRadio("planeaViajar", planeaValor);
  const requiereAsistenciaValor =
    invitadoActual.requiereAsistenciaViaje === true
      ? "si"
      : invitadoActual.requiereAsistenciaViaje === false
      ? "no"
      : "";
  establecerValorRadio("requiereAsistencia", requiereAsistenciaValor);
  document.getElementById("vestimentaConfirmada").checked = !!invitadoActual.vestimentaConfirmada;
  sincronizarCampoViaje();
  sincronizarCampoAsistencia();
  cambiarPaso(1);
  document.getElementById("comentarios").value = invitadoActual.notas || "";
  const completado = estaRSVPCompleto(invitadoActual);
  if (completado && rsvpModoEdicion) {
    rsvpModoEdicion = false;
  }
  if (!completado) {
    rsvpModoEdicion = true;
  }
  actualizarResumenRSVP();
  aplicarModoRSVP();
}

/**
 * Guarda la respuesta del invitado en Firestore.
 */
async function guardarRSVP(event) {
  event.preventDefault();
  if (!invitadoActual) return;
  if (!validarPaso(TOTAL_PASOS)) return;

  const asistencia = obtenerValorRadio("asistencia");
  if (!asistencia) {
    mostrarMensajePaso("Selecciona si asistirás antes de guardar.");
    return;
  }
  const maxAsistentes = Math.max(Number(acompanantesInput?.max || 0), 0);
  const asistentesValor = Number(acompanantesInput?.value || 0);
  const totalSolicitado = Math.max(Number.isNaN(asistentesValor) ? 0 : asistentesValor, 0);
  const totalAutorizado =
    maxAsistentes > 0 ? Math.min(totalSolicitado, maxAsistentes) : totalSolicitado;
  const minimoAsistentes = maxAsistentes > 0 ? 1 : 0;
  const asistentesConfirmados =
    asistencia === "si" ? Math.max(totalAutorizado, minimoAsistentes) : 0;
  const ninosValor = Number(numNinosConfirmadosInput?.value || 0);
  const ninosConfirmados =
    asistencia === "si"
      ? Math.min(Math.max(Number.isNaN(ninosValor) ? 0 : ninosValor, 0), asistentesConfirmados)
      : 0;
  const comentarios = rsvpForm.elements["comentarios"].value;
  const nombresTexto = nombresAsistentesInput?.value || "";
  const nombresConfirmados = asistencia === "si" ? normalizarListaNombres(nombresTexto) : [];
  const vestimenta = document.getElementById("vestimentaConfirmada").checked;
  const planeaViajarValor = obtenerValorRadio("planeaViajar");
  const planeaViajar = planeaViajarValor === "si";
  const requiereAsistenciaValor = obtenerValorRadio("requiereAsistencia");
  const requiereAsistenciaViaje =
    planeaViajar && requiereAsistenciaValor === "si";
  const flujoViajeCompleto =
    asistencia !== "si"
      ? true
      : planeaViajarValor !== "" &&
        (planeaViajarValor === "no" || requiereAsistenciaValor !== "");

  const nuevoEstado = determinarEstado(asistencia, {
    vestimenta,
    viajeCompletado: flujoViajeCompleto,
  });

  const payload = {
    rsvpNumAsistentes: asistentesConfirmados,
    rsvpNumNinos: ninosConfirmados,
    rsvpNombresAsistentes: nombresConfirmados,
    notas: comentarios,
    vestimentaConfirmada: vestimenta,
    viajeConfirmado: planeaViajar,
    hospedajeConfirmado: planeaViajar ? !requiereAsistenciaViaje : true,
    planeaViajar,
    requiereAsistenciaViaje: planeaViajar ? requiereAsistenciaViaje : false,
    estadoInvitacion: nuevoEstado,
    fechaConfirmacionFase1:
      nuevoEstado !== "pendiente_primera_confirmacion"
        ? firebase.firestore.FieldValue.serverTimestamp()
        : invitadoActual.fechaConfirmacionFase1 || null,
  };

  try {
    await db.collection("invitados").doc(invitadoActual.id).update(payload);
    invitadoActual.estadoInvitacion = nuevoEstado;
    invitadoActual.rsvpNumAsistentes = payload.rsvpNumAsistentes;
    invitadoActual.rsvpNumNinos = payload.rsvpNumNinos;
    invitadoActual.rsvpNombresAsistentes = payload.rsvpNombresAsistentes;
    invitadoActual.notas = comentarios;
    invitadoActual.vestimentaConfirmada = vestimenta;
    invitadoActual.planeaViajar = planeaViajar;
    invitadoActual.requiereAsistenciaViaje = planeaViajar
      ? requiereAsistenciaViaje
      : false;
    invitadoActual.viajeConfirmado = planeaViajar;
    invitadoActual.hospedajeConfirmado = planeaViajar ? !requiereAsistenciaViaje : true;
    mostrarMensajePaso("¡Tu respuesta ha sido guardada!");
    if (estadoDetalle) {
      estadoDetalle.textContent = "¡Respuesta guardada!";
    }
    if (contadorTiempo) contadorTiempo.textContent = "";
    inicializarEstadoInvitado(construirEstadoPublico(invitadoActual));
    if (estaRSVPCompleto(invitadoActual)) {
      rsvpModoEdicion = false;
    }
    actualizarResumenRSVP();
    aplicarModoRSVP();
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
function determinarEstado(asistencia, extras = {}) {
  if (asistencia === "no") return "rechazado";
  if (extras.vestimenta && extras.viajeCompletado) {
    return "en_espera_codigo";
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
    "EN_ESPERA_CODIGO",
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
    case "en_espera_codigo":
      return "EN_ESPERA_CODIGO";
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
    case "EN_ESPERA_CODIGO": {
      estadoDetalle.innerHTML =
        "<p>Gracias por completar los tres pasos.</p><p>Tu código de acceso será generado y te avisaremos en cuanto esté listo.</p>";
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

acompanantesInput?.addEventListener("input", () => {
  actualizarLimiteNinos();
});

actualizarPasoUI();
sincronizarCampoViaje();
sincronizarCampoAsistencia();

stepNextBtn?.addEventListener("click", () => {
  if (validarPaso(pasoActual)) cambiarPaso(pasoActual + 1);
});

stepPrevBtn?.addEventListener("click", () => cambiarPaso(pasoActual - 1));

rsvpForm?.addEventListener("change", (event) => {
  if (event.target.name === "planeaViajar") {
    sincronizarCampoViaje();
  }
  if (event.target.name === "asistencia") {
    sincronizarCampoAsistencia();
  }
});

resumenEditarBtn?.addEventListener("click", () => {
  rsvpModoEdicion = true;
  aplicarModoRSVP();
  rsvpForm?.scrollIntoView({ behavior: "smooth", block: "start" });
});

codigoForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const codigo = codigoForm.codigoInvitacion.value;
  if (!codigo) return;
  cargarInvitadoPorCodigo(codigo);
});

rsvpForm?.addEventListener("submit", guardarRSVP);

cargarDatosEvento();
