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
const alertaNoAsistira = document.getElementById("alerta-no-asistira");
const resumenCard = document.getElementById("rsvp-resumen");
const resumenEditarBtn = document.getElementById("resumen-editar");
const resumenEstadoElem = document.getElementById("resumen-estado");
const resumenEstadoDetalleElem = document.getElementById("resumen-estado-detalle");
const resumenTiempoElem = document.getElementById("resumen-tiempo");
const resumenDetallesContainer = document.getElementById("resumen-detalles");
const resumenAccionesContainer = document.getElementById("resumen-acciones");
const paseCard = document.getElementById("pase-digital");
const paseMensajeElem = document.getElementById("pase-mensaje");
const paseNombreElem = document.getElementById("pase-nombre");
const paseCodigoElem = document.getElementById("pase-codigo");
const paseMesaElem = document.getElementById("pase-mesa");
const paseMesaHelperElem = document.getElementById("pase-mesa-helper");
const paseQRCanvas = document.getElementById("pase-qr");
const paseQRPlaceholder = document.getElementById("pase-qr-placeholder");
const paseGenerarBtn = document.getElementById("pase-generar");
const paseDescargarBtn = document.getElementById("pase-descargar");
const heroCountdownContainer = document.getElementById("hero-countdown");
const heroCountdownHelper = document.getElementById("hero-countdown-helper");
const heroCountdownElems = {
  days: document.getElementById("hero-countdown-days"),
  hours: document.getElementById("hero-countdown-hours"),
  minutes: document.getElementById("hero-countdown-minutes"),
  seconds: document.getElementById("hero-countdown-seconds"),
};
const heroLocationElem = document.querySelector(".hero__location");
const sectionLockNote = document.getElementById("section-lock-note");
const detalleUbicacionNombre = document.getElementById("detalle-ubicacion-nombre");
const detalleUbicacionDireccion = document.getElementById("detalle-ubicacion-direccion");
const detalleUbicacionLink = document.getElementById("detalle-ubicacion-link");
const detalleUbicacionMensaje = document.getElementById("detalle-ubicacion-mensaje");
const detalleProgramaLista = document.getElementById("detalle-programa-lista");
const detalleProgramaMensaje = document.getElementById("detalle-programa-mensaje");
const ubicacionesPublicList = document.getElementById("ubicaciones-lista");
const ubicacionesMapaFrame = document.getElementById("ubicaciones-mapa");
const ubicacionesMapaNombre = document.getElementById("ubicaciones-mapa-nombre");
const ubicacionesMapaDireccion = document.getElementById("ubicaciones-mapa-direccion");
const ubicacionesMapaLink = document.getElementById("ubicaciones-mapa-link");
const HERO_LOCATION_LOCKED_TEXT = "Muy pronto revelaremos el lugar del evento ✨";
const UBICACIONES_LOCK_MESSAGE =
  "Muy pronto revelaremos los detalles de la ubicación. Ingresa tu código para verlos aquí.";
const pinterestSectionElem = document.getElementById("pinterest-section");
const pinterestWidgetContainer = document.getElementById("pinterest-widget");
const pinterestDescripcionElem = document.getElementById("pinterest-description");
const pinterestPlaceholderElem = document.getElementById("pinterest-placeholder");
const pinterestEmbedElem = document.getElementById("pinterest-embed");
const pinterestDefaultHref =
  pinterestEmbedElem?.dataset?.defaultHref || "https://www.pinterest.com/anapinskywalker/style/";
const PINTEREST_SCALE_HEIGHT = Number(pinterestEmbedElem?.dataset?.pinScaleHeight) || 360;
const PINTEREST_SCALE_WIDTH = Number(pinterestEmbedElem?.dataset?.pinScaleWidth) || 280;
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
const seccionesBloqueadasElems = document.querySelectorAll(".section--locked");

let invitadoActual = null;
let detenerCuentaRegresiva = null;
let pasoActual = 1;
const TOTAL_PASOS = 3;
let rsvpModoEdicion = true;
let rsvpNoAsiste = false;
let detenerHeroCountdown = null;
let ubicacionesPublicas = [];
let ubicacionesDesbloqueadas = false;
let ubicacionSeleccionadaIndex = 0;
const HERO_LOCATION_DEFAULT = "Ubicación por confirmar";
let itinerarioPublico = [];
let seccionesBloqueadas = true;
let pinterestWidgetPublico = null;
let pinterestWidgetUnsubscribe = null;
const PINTEREST_SHORT_HOSTS = ["pin.it", "pin.st"];
let paseQRInstance = null;
let paseQRValue = "";
const paseQRBaseCanvas = document.createElement("canvas");
paseQRBaseCanvas.width = 320;
paseQRBaseCanvas.height = 320;


function escapeHTML(texto = "") {
  const div = document.createElement("div");
  div.textContent = texto;
  return div.innerHTML;
}

function normalizarPinterestUrl(url = "") {
  if (!url) return "";
  let limpio = url.trim();
  if (!limpio) return "";
  if (limpio.startsWith("//")) {
    limpio = `https:${limpio}`;
  } else if (!/^https?:\/\//i.test(limpio)) {
    limpio = `https://${limpio}`;
  }
  try {
    const parsed = new URL(limpio);
    const host = parsed.hostname.toLowerCase();
    const esPinterest =
      host.includes("pinterest.") && !host.includes("pinimg") && !host.endsWith("pin.it");
    if (esPinterest && host !== "www.pinterest.com") {
      parsed.hostname = "www.pinterest.com";
      limpio = parsed.toString();
    } else {
      limpio = parsed.toString();
    }
  } catch (error) {
    // Ignoramos errores de parsing y regresamos la cadena original normalizada.
  }
  return limpio;
}

function detectarTipoPinterest(url = "") {
  if (!url) return "pin";
  try {
    const parsed = new URL(url);
    const host = parsed.hostname.toLowerCase();
    if (PINTEREST_SHORT_HOSTS.some((shortHost) => host.endsWith(shortHost))) {
      return "short";
    }
    if (host.includes("pin.it")) return "pin";
    const segmentos = parsed.pathname.split("/").filter(Boolean);
    if (!segmentos.length) return "pin";
    if (segmentos[0] === "pin" || segmentos.includes("pin")) return "pin";
    return "board";
  } catch (error) {
    return url.includes("/pin/") ? "pin" : "board";
  }
}

function esPinterestShortUrl(url = "", config = {}) {
  const tipo = detectarTipoPinterest(url);
  if (tipo === "short") return true;
  const existeMetaBoard = config.scaleHeight || config.scaleWidth || config.boardWidth;
  if (!existeMetaBoard) return false;
  if (!url) return false;
  try {
    const parsed = new URL(url);
    return PINTEREST_SHORT_HOSTS.some((host) => parsed.hostname.toLowerCase().endsWith(host));
  } catch (error) {
    return false;
  }
}

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
  rsvpNoAsiste = asistencia === "no";
  if (rsvpNoAsiste) {
    pasoActual = 1;
  }
  alertaNoAsistira?.classList.toggle("hidden", !rsvpNoAsiste);
  actualizarPasoUI();
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

function establecerResumenEstado(titulo = "--", detalle = "") {
  if (resumenEstadoElem) resumenEstadoElem.textContent = titulo || "--";
  if (resumenEstadoDetalleElem) resumenEstadoDetalleElem.textContent = detalle || "";
}

function actualizarResumenTiempo(texto = "") {
  if (!resumenTiempoElem) return;
  resumenTiempoElem.textContent = texto;
  if (!texto) {
    delete resumenTiempoElem.dataset.countdownLabel;
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
  const cancelada =
    (invitadoActual.estadoInvitacion || invitadoActual.estado) === "rechazado" ||
    (invitadoActual.estadoInvitacion || invitadoActual.estado) === "cancelado_por_tiempo";
  resumenDetallesContainer?.classList.toggle("hidden", cancelada);
  resumenAccionesContainer?.classList.toggle("hidden", cancelada);
}

function obtenerMesaInvitado(invitado = {}) {
  if (!invitado) return null;
  return (
    invitado.mesaAsignada ||
    invitado.mesa ||
    invitado.mesaNumero ||
    invitado.mesaNombre ||
    invitado.mesaInvitado ||
    invitado.asiento ||
    null
  );
}

function puedeGenerarPase(invitado) {
  if (!invitado) return false;
  const estado = (invitado.estadoInvitacion || invitado.estado || "").toLowerCase();
  return ["en_espera_codigo", "confirmado_final", "si_confirmado"].includes(estado);
}

function limpiarQRDelPase() {
  if (paseQRCanvas) {
    const ctx = paseQRCanvas.getContext("2d");
    if (ctx) {
      ctx.clearRect(0, 0, paseQRCanvas.width, paseQRCanvas.height);
    }
  }
  paseDescargarBtn?.classList.add("hidden");
  paseQRPlaceholder?.classList.remove("hidden");
  paseQRValue = "";
}

function obtenerDatosParaPase() {
  const nombre = invitadoActual?.nombreCompleto?.trim() || "Invitado especial";
  const codigo = invitadoActual?.codigoInvitacion || invitadoActual?.id || "BODA";
  const asistentes = Math.max(Number(invitadoActual?.rsvpNumAsistentes) || 0, 1);
  const mesaTexto = obtenerMesaInvitado(invitadoActual);
  return {
    nombre,
    codigo,
    asistentes,
    mesa: mesaTexto || "Mesa por confirmar",
  };
}

function dibujarPaseDecorado(datos = {}) {
  if (!paseQRCanvas || !paseQRInstance) return;
  const ctx = paseQRCanvas.getContext("2d");
  if (!ctx) return;
  const width = paseQRCanvas.width;
  const height = paseQRCanvas.height;
  ctx.clearRect(0, 0, width, height);
  const gradient = ctx.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, "#fff8f2");
  gradient.addColorStop(1, "#f3e6ff");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);
  ctx.strokeStyle = "rgba(116, 68, 102, 0.25)";
  ctx.lineWidth = 4;
  ctx.strokeRect(12, 12, width - 24, height - 24);
  const headerHeight = 150;
  const noviosImg = new Image();
  noviosImg.onload = () => {
    ctx.save();
    ctx.fillStyle = "rgba(255, 255, 255, 0.92)";
    ctx.fillRect(24, 24, width - 48, headerHeight);
    ctx.shadowColor = "rgba(116, 68, 102, 0.2)";
    ctx.shadowBlur = 20;
    const imgWidth = 220;
    const imgHeight = headerHeight - 30;
    ctx.drawImage(noviosImg, width / 2 - imgWidth / 2, 30, imgWidth, imgHeight);
    ctx.restore();
    dibujarContenidoPase(ctx, width, height, datos, headerHeight);
  };
  noviosImg.onerror = () => dibujarContenidoPase(ctx, width, height, datos, headerHeight);
  noviosImg.src = "assets/images/novios.png";
}

function dibujarContenidoPase(ctx, width, height, datos, headerHeight = 140) {
  ctx.save();
  ctx.textAlign = "center";
  ctx.fillStyle = "#744466";
  ctx.font = "600 26px 'Poppins', 'Segoe UI', sans-serif";
  const tituloY = 24 + headerHeight + 40;
  ctx.fillText("PASE BODA DARA Y MISAEL", width / 2, tituloY);

  ctx.fillStyle = "#2f2f2f";
  ctx.font = "600 22px 'Poppins', 'Segoe UI', sans-serif";
  ctx.fillText(datos.nombre || "Invitado especial", width / 2, tituloY + 40);

  ctx.fillStyle = "#5a7022";
  ctx.font = "16px 'Poppins', 'Segoe UI', sans-serif";
  ctx.fillText(
    `Código: ${datos.codigo || "BODA"} · Pases: ${datos.asistentes ?? 1}`,
    width / 2,
    tituloY + 70
  );

  const qrImage = new Image();
  qrImage.onload = () => {
    const qrMargin = 70;
    const qrMaxHeight = height - (tituloY + 220);
    const qrSize = Math.min(width - qrMargin * 2, qrMaxHeight);
    const qrX = (width - qrSize) / 2;
    const qrY = tituloY + 90;
    ctx.fillStyle = "rgba(255,255,255,0.95)";
    ctx.fillRect(qrX - 10, qrY - 10, qrSize + 20, qrSize + 20);
    ctx.drawImage(qrImage, qrX, qrY, qrSize, qrSize);

    ctx.fillStyle = "#744466";
    ctx.font = "600 18px 'Poppins', 'Segoe UI', sans-serif";
    ctx.fillText(datos.mesa || "Mesa por confirmar", width / 2, height - 60);
    ctx.fillStyle = "#444";
    ctx.font = "14px 'Poppins', 'Segoe UI', sans-serif";
    ctx.fillText("Presenta este pase en la entrada", width / 2, height - 30);

    paseQRPlaceholder?.classList.add("hidden");
    paseDescargarBtn?.classList.remove("hidden");
  };
  qrImage.onerror = () => {
    paseQRPlaceholder?.classList.remove("hidden");
  };
  qrImage.src = paseQRInstance.toDataURL("image/png");
  ctx.restore();
}

function actualizarModuloPase() {
  if (!paseCard) return;
  const mostrarModulo = invitadoActual && !rsvpModoEdicion;
  paseCard.classList.toggle("hidden", !mostrarModulo);
  if (!mostrarModulo) {
    limpiarQRDelPase();
    return;
  }
  const nombre = invitadoActual.nombreCompleto || invitadoActual.nombre || "Invitado especial";
  const codigo = invitadoActual.codigoInvitacion || "SIN-CODIGO";
  const mesaAsignada = obtenerMesaInvitado(invitadoActual);
  if (paseNombreElem) paseNombreElem.textContent = nombre;
  if (paseCodigoElem) paseCodigoElem.textContent = codigo;
  if (paseMesaElem) paseMesaElem.textContent = mesaAsignada || "Por confirmar";
  if (paseMesaHelperElem) {
    paseMesaHelperElem.textContent = mesaAsignada
      ? "Si tu mesa cambia te avisaremos por este mismo medio."
      : "Asignaremos tu mesa muy pronto. Te avisaremos cuando esté lista.";
  }
  const listoParaPase = puedeGenerarPase(invitadoActual);
  if (paseGenerarBtn) {
    paseGenerarBtn.disabled = !listoParaPase;
    paseGenerarBtn.textContent = listoParaPase ? "Generar pase digital" : "Completa tu confirmación";
  }
  if (paseMensajeElem) {
    paseMensajeElem.textContent = listoParaPase
      ? "Tu pase está listo. Genera el QR para conocer tu mesa y mostrarlo el día del evento."
      : "Completa tu confirmación (viaje y vestimenta) para activar tu pase digital.";
  }
  if (!listoParaPase) {
    limpiarQRDelPase();
  }
}

function generarPaseDigital() {
  if (!invitadoActual || !puedeGenerarPase(invitadoActual) || !paseQRCanvas) return;
  if (typeof QRious === "undefined") {
    paseMensajeElem &&
      (paseMensajeElem.textContent =
        "No pudimos cargar el generador de QR. Actualiza la página e inténtalo de nuevo.");
    return;
  }
  const codigo = invitadoActual.codigoInvitacion || invitadoActual.id || "INVITADO";
  const mesaAsignada = obtenerMesaInvitado(invitadoActual) || "PENDIENTE";
  const asistentes = Number(invitadoActual.rsvpNumAsistentes) || 0;
  const payload = `BODA|${codigo}|MESA:${mesaAsignada}|PAX:${Math.max(asistentes, 1)}`;
  if (!paseQRInstance) {
    paseQRInstance = new QRious({
      element: paseQRBaseCanvas,
      size: paseQRBaseCanvas.width,
      value: payload,
      level: "H",
    });
  } else {
    paseQRInstance.value = payload;
  }
  paseQRValue = payload;
  paseDescargarBtn?.classList.add("hidden");
  paseQRPlaceholder?.classList.remove("hidden");
  dibujarPaseDecorado(obtenerDatosParaPase());
  paseMensajeElem &&
    (paseMensajeElem.textContent =
      "¡Listo! Descarga tu pase y muéstralo el día del evento. Si lo pierdes puedes generarlo de nuevo.");
}

function descargarPaseQR() {
  if (!paseQRCanvas || !paseDescargarBtn || !paseQRValue) return;
  const enlaceDescarga = document.createElement("a");
  enlaceDescarga.href = paseQRCanvas.toDataURL("image/png");
  const codigo = invitadoActual?.codigoInvitacion || "boda";
  enlaceDescarga.download = `pase-${codigo}.png`;
  enlaceDescarga.click();
}

function aplicarModoRSVP() {
  const mostrarResumen = invitadoActual && !rsvpModoEdicion;
  if (invitadoActual) {
    actualizarResumenRSVP();
    resumenCard?.classList.toggle("hidden", !mostrarResumen);
  } else {
    resumenCard?.classList.add("hidden");
  }
  if (rsvpForm) {
    rsvpForm.classList.toggle("hidden", !!mostrarResumen);
  }
  actualizarModuloPase();
}

function actualizarPasoUI() {
  stepSections.forEach((section) => {
    const stepValue = Number(section.dataset.step);
    section.classList.toggle("is-active", stepValue === pasoActual);
    if (rsvpNoAsiste && stepValue !== 1) {
      section.classList.add("hidden-no-asiste");
    } else {
      section.classList.remove("hidden-no-asiste");
    }
  });
  stepIndicators.forEach((indicator) => {
    const stepValue = Number(indicator.dataset.step);
    indicator.classList.toggle("is-active", stepValue === pasoActual);
    indicator.classList.toggle("is-disabled", rsvpNoAsiste && stepValue !== 1);
  });
  stepPrevBtn?.classList.toggle("hidden", pasoActual === 1);
  stepNextBtn?.classList.toggle("hidden", pasoActual === TOTAL_PASOS);
  stepSubmitBtn?.classList.toggle("hidden", pasoActual !== TOTAL_PASOS);
  if (rsvpNoAsiste) {
    stepPrevBtn?.classList.add("hidden");
    stepNextBtn?.classList.add("hidden");
    if (stepSubmitBtn) {
      stepSubmitBtn.classList.remove("hidden");
      stepSubmitBtn.textContent = "Confirmar que libero mi invitación";
    }
  } else if (stepSubmitBtn) {
    stepSubmitBtn.textContent = "Enviar respuestas";
  }
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
      actualizarModuloPase();
      cambiarVisibilidadSecciones(true);
      return;
    }

    invitadoActual = { id: snap.docs[0].id, ...snap.docs[0].data() };
    codigoMensaje.textContent = `Hola ${invitadoActual.nombreCompleto || "invitado"}.`;
    cambiarVisibilidadSecciones(false);
    desbloquearUbicacionesPublicas();
    prepararFormularioSegunEstado();
    actualizarModuloPase();
  } catch (error) {
    console.error("Error al cargar invitado", error);
    codigoMensaje.textContent = "Ocurrió un error al validar. Intenta más tarde.";
    cambiarVisibilidadSecciones(true);
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
  rsvpNoAsiste = asistenciaValor === "no";
  const completado = estaRSVPCompleto(invitadoActual);
  const invitacionCancelada =
    (invitadoActual.estadoInvitacion || invitadoActual.estado) === "rechazado";
  if ((completado || invitacionCancelada) && rsvpModoEdicion) {
    rsvpModoEdicion = false;
  }
  if (!completado && !invitacionCancelada) {
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
  if (asistencia === "no") {
    const confirmaLiberacion = window.confirm(
      "Al confirmar que no asistirás liberaremos tu invitación y este paso no se puede deshacer. ¿Deseas continuar?"
    );
    if (!confirmaLiberacion) {
      mostrarMensajePaso("Tu invitación sigue activa. Si cambias de opinión, selecciona 'Sí'.");
      return;
    }
    rsvpModoEdicion = false;
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
  actualizarResumenTiempo("");

  if (!invitado) {
    estadoDetalle.textContent = "No encontramos información de tu invitación.";
    establecerResumenEstado("Sin datos", "Ingresa tu código para consultar el estado de tu invitación.");
    return;
  }
  establecerResumenEstado("Procesando invitación", "Actualizamos tu información...");

  switch (invitado.estado) {
    case "SIN_RESPUESTA": {
      estadoDetalle.textContent = "Aún no has respondido si vas a asistir.";
      establecerResumenEstado(
        "Pendiente de confirmación",
        "Completa los tres pasos antes de que tu invitación expire."
      );
      if (!contadorTiempo) break;
      if (!invitado.fechaLimiteRespuesta) {
        contadorTiempo.textContent = "No tenemos una fecha límite configurada.";
        actualizarResumenTiempo("No tenemos una fecha límite configurada.");
        break;
      }
      contadorTiempo.dataset.countdownLabel = "Tu invitación se cancelará en:";
      if (resumenTiempoElem) {
        resumenTiempoElem.dataset.countdownLabel = "Tiempo restante:";
      }
      detenerCuentaRegresiva = iniciarCuentaRegresiva(invitado.fechaLimiteRespuesta, [contadorTiempo, resumenTiempoElem], () => {
        if (contadorTiempo) {
          contadorTiempo.textContent = "Tu invitación ha sido cancelada por no responder a tiempo.";
        }
        actualizarResumenTiempo("Tu invitación ha sido cancelada por no responder a tiempo.");
        // TODO: Actualizar el estado en Firebase cuando expire la primera respuesta.
        notificarExpiracionRespuesta();
      });
      break;
    }
    case "DIJO_QUE_SI": {
      estadoDetalle.innerHTML =
        "<p>Gracias por confirmar que vas a asistir.</p><p>Debes confirmar tu traje y viaje antes de:</p>";
      establecerResumenEstado(
        "Confirmación inicial registrada",
        "Falta completar el checklist de viaje y vestimenta antes de la fecha límite."
      );
      if (!contadorTiempo) break;
      if (!invitado.fechaLimiteDetalles) {
        contadorTiempo.textContent = "No tenemos una fecha límite configurada.";
        actualizarResumenTiempo("No tenemos una fecha límite para los detalles.");
        break;
      }
      contadorTiempo.dataset.countdownLabel = "Tiempo restante:";
      if (resumenTiempoElem) {
        resumenTiempoElem.dataset.countdownLabel = "Tiempo restante para checklist:";
      }
      detenerCuentaRegresiva = iniciarCuentaRegresiva(invitado.fechaLimiteDetalles, [contadorTiempo, resumenTiempoElem], () => {
        estadoDetalle.textContent =
          "Tu lugar ha sido liberado porque no confirmaste tus detalles a tiempo.";
        if (contadorTiempo) contadorTiempo.textContent = "";
        actualizarResumenTiempo("Se liberó tu lugar por no completar los detalles.");
        // TODO: Actualizar el estado en Firebase cuando expire la confirmación de detalles.
        notificarExpiracionDetalles();
      });
      break;
    }
    case "SI_CONFIRMADO": {
      estadoDetalle.textContent = "Todo listo 🎉 Has confirmado asistencia, traje y viaje.";
      establecerResumenEstado(
        "Checklist finalizado",
        "Gracias por tener listo tu atuendo, viaje y hospedaje."
      );
      actualizarResumenTiempo("Tu pase digital está activo.");
      break;
    }
    case "EN_ESPERA_CODIGO": {
      estadoDetalle.innerHTML =
        "<p>Invitación confirmada ✅</p><p>Genera tu pase digital para conocer tu mesa y mostrar tu QR en la entrada.</p>";
      establecerResumenEstado(
        "Invitación confirmada",
        "Genera tu pase digital y muéstralo el día del evento."
      );
      actualizarResumenTiempo("Tu pase está disponible en esta página.");
      break;
    }
    case "NO_VA":
    case "CANCELADO_TIEMPO": {
      estadoDetalle.innerHTML =
        "<p>Gracias por avisar con tiempo.</p><p>Hemos liberado tu invitación para que otra persona pueda utilizarla.</p>";
      establecerResumenEstado(
        "Invitación cancelada",
        "Gracias por avisar con tiempo. Tu lugar ha quedado disponible."
      );
      actualizarResumenTiempo("");
      rsvpModoEdicion = false;
      resumenDetallesContainer?.classList.add("hidden");
      resumenAccionesContainer?.classList.add("hidden");
      break;
    }
    default: {
      estadoDetalle.textContent = "Seguimos procesando tu invitación.";
      establecerResumenEstado("Procesando invitación", "Estamos revisando tu información.");
      actualizarResumenTiempo("");
    }
  }
}

function iniciarCuentaRegresiva(fechaLimite, elementosDestino, onExpire) {
  const destinos = (Array.isArray(elementosDestino) ? elementosDestino : [elementosDestino]).filter(Boolean);
  if (!destinos.length || !fechaLimite) return null;
  const fechaObjetivo =
    fechaLimite instanceof Date ? fechaLimite : new Date(fechaLimite);
  if (Number.isNaN(fechaObjetivo.getTime())) {
    destinos.forEach((elementoDestino) => {
      if (elementoDestino) elementoDestino.textContent = "Fecha no disponible.";
    });
    return null;
  }

  const renderTiempo = () => {
    const restante = fechaObjetivo.getTime() - Date.now();
    if (restante <= 0) {
      destinos.forEach((elementoDestino) => {
        if (!elementoDestino) return;
        const prefijo =
          elementoDestino.dataset?.countdownLabel && elementoDestino.dataset.countdownLabel.trim().length
            ? `${elementoDestino.dataset.countdownLabel.trim()} `
            : "";
        elementoDestino.textContent = `${prefijo}0 días 00:00:00`;
      });
      if (typeof onExpire === "function") onExpire();
      return false;
    }
    const partes = convertirMilisegundosADHMS(restante);
    const tiempoTexto = `${partes.dias} días ${formatearDosDigitos(partes.horas)}:${formatearDosDigitos(
      partes.minutos
    )}:${formatearDosDigitos(partes.segundos)}`;
    destinos.forEach((elementoDestino) => {
      if (!elementoDestino) return;
      const prefijo =
        elementoDestino.dataset?.countdownLabel && elementoDestino.dataset.countdownLabel.trim().length
          ? `${elementoDestino.dataset.countdownLabel.trim()} `
          : "";
      elementoDestino.textContent = `${prefijo}${tiempoTexto}`;
    });
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
  try {
    const doc = await db.collection("configuracion").doc("fechasLimite").get();
    if (doc.exists && doc.data().fechaBoda) {
      const fecha = doc.data().fechaBoda;
      if (heroDateEl) {
        heroDateEl.textContent = formatearFechaBoda(fecha);
      }
      iniciarCountdownHero(fecha);
    } else {
      if (heroDateEl) heroDateEl.textContent = "Pronto revelaremos la fecha ✨";
      if (heroCountdownContainer) heroCountdownContainer.classList.add("hidden");
      if (heroCountdownHelper) heroCountdownHelper.textContent = "Pronto revelaremos la fecha ✨";
    }
  } catch (error) {
    console.error("Error al cargar fecha del evento", error);
  }
}

function formatearFechaBoda(isoString) {
  const fecha = new Date(isoString);
  if (Number.isNaN(fecha.getTime())) return "Fecha por confirmar";
  const fechaTexto = new Intl.DateTimeFormat("es-MX", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  })
    .format(fecha)
    .replace(/\.$/, "")
    .toUpperCase();
  return fechaTexto;
}

function formatearFechaCorta(isoString) {
  if (!isoString) return "--/--/----";
  const fecha = new Date(isoString);
  if (Number.isNaN(fecha.getTime())) return "--/--/----";
  const dia = String(fecha.getDate()).padStart(2, "0");
  const mes = String(fecha.getMonth() + 1).padStart(2, "0");
  const anio = fecha.getFullYear();
  return `${dia}/${mes}/${anio}`;
}

function formatearHoraEvento(valor) {
  if (!valor) return "--:--";
  const fecha = new Date(valor);
  if (Number.isNaN(fecha.getTime())) return "--:--";
  return fecha.toLocaleTimeString("es-MX", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function capitalizar(texto) {
  if (!texto) return "";
  return texto.charAt(0).toUpperCase() + texto.slice(1);
}

function iniciarCountdownHero(fechaISO) {
  if (!heroCountdownContainer || !fechaISO) return;
  if (detenerHeroCountdown) {
    window.clearInterval(detenerHeroCountdown);
    detenerHeroCountdown = null;
  }
  const fechaObjetivo = new Date(fechaISO);
  if (Number.isNaN(fechaObjetivo.getTime())) {
    heroCountdownContainer.classList.add("hidden");
    if (heroCountdownHelper) {
      heroCountdownHelper.textContent = "Pronto revelaremos la fecha ✨";
    }
    return;
  }
  heroCountdownContainer.classList.remove("hidden");
  const actualizar = () => {
    const restante = fechaObjetivo.getTime() - Date.now();
    if (restante <= 0) {
      Object.values(heroCountdownElems).forEach((el) => el && (el.textContent = "0"));
      if (heroCountdownHelper) heroCountdownHelper.textContent = "¡El gran día ha llegado!";
      if (detenerHeroCountdown) {
        window.clearInterval(detenerHeroCountdown);
        detenerHeroCountdown = null;
      }
      return;
    }
    const partes = convertirMilisegundosADHMS(restante);
    if (heroCountdownElems.days) heroCountdownElems.days.textContent = String(partes.dias);
    if (heroCountdownElems.hours) heroCountdownElems.hours.textContent = formatearDosDigitos(partes.horas);
    if (heroCountdownElems.minutes)
      heroCountdownElems.minutes.textContent = formatearDosDigitos(partes.minutos);
    if (heroCountdownElems.seconds)
      heroCountdownElems.seconds.textContent = formatearDosDigitos(partes.segundos);
    if (heroCountdownHelper) {
      heroCountdownHelper.textContent = "Para que tiempo y espacio converjan en nuestro amor";
    }
  };
  actualizar();
  detenerHeroCountdown = window.setInterval(actualizar, 1000);
}

function generarMapaEmbed(ubicacion) {
  if (!ubicacion) return "";
  const direccionBase = [ubicacion.nombre, ubicacion.direccion]
    .filter((parte) => parte && parte.trim())
    .join(" ");
  const query = direccionBase || ubicacion.mapsUrl || "";
  if (!query) return "";
  return `https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed`;
}

function cambiarVisibilidadSecciones(bloqueadas) {
  seccionesBloqueadas = bloqueadas;
  seccionesBloqueadasElems.forEach((section) => {
    if (!section) return;
    section.classList.toggle("is-locked", bloqueadas);
  });
  if (sectionLockNote) {
    sectionLockNote.textContent = bloqueadas
      ? "La ubicación y el itinerario se mostrarán al ingresar tu código de invitación."
      : "¡Listo! Ya puedes ver la ubicación y el itinerario completos.";
  }
}

function mostrarEstadoUbicacionesBloqueado() {
  if (ubicacionesMapaFrame) {
    ubicacionesMapaFrame.removeAttribute("src");
  }
  if (ubicacionesMapaNombre) {
    ubicacionesMapaNombre.textContent = "Ubicaciones privadas";
  }
  if (ubicacionesMapaDireccion) {
    ubicacionesMapaDireccion.textContent =
      "Muy pronto revelaremos el mapa completo. Ingresa tu código para conocerlo antes.";
  }
  if (ubicacionesMapaLink) {
    ubicacionesMapaLink.hidden = true;
    ubicacionesMapaLink.removeAttribute("href");
  }
  if (ubicacionesPublicList) {
    ubicacionesPublicList.innerHTML = `<p>${UBICACIONES_LOCK_MESSAGE}</p>`;
  }
  actualizarHeroLocation(null);
  actualizarDetalleUbicacion(null);
}

function actualizarEstadoSeccionUbicaciones() {
  if (ubicacionesDesbloqueadas) {
    renderUbicacionesPublicas();
  } else {
    mostrarEstadoUbicacionesBloqueado();
  }
}

function desbloquearUbicacionesPublicas() {
  if (ubicacionesDesbloqueadas) return;
  ubicacionesDesbloqueadas = true;
  actualizarEstadoSeccionUbicaciones();
}

function renderUbicacionesPublicas() {
  if (!ubicacionesPublicList) return;
  if (!ubicacionesDesbloqueadas) {
    mostrarEstadoUbicacionesBloqueado();
    return;
  }
  if (!ubicacionesPublicas.length) {
    ubicacionesPublicList.innerHTML =
      "<p>Muy pronto compartiremos las ubicaciones del evento.</p>";
    if (ubicacionesMapaFrame) ubicacionesMapaFrame.src = "";
    ubicacionesMapaNombre && (ubicacionesMapaNombre.textContent = "Pronto compartiremos los detalles");
    ubicacionesMapaDireccion && (ubicacionesMapaDireccion.textContent = "");
    ubicacionesMapaLink && (ubicacionesMapaLink.hidden = true);
    actualizarHeroLocation(null);
    actualizarDetalleUbicacion(null);
    return;
  }
  ubicacionesPublicList.innerHTML = ubicacionesPublicas
    .map((ubicacion, index) => {
      const direccion = ubicacion.direccion
        ? `<p>${escapeHTML(ubicacion.direccion)}</p>`
        : "<p>Dirección por confirmar.</p>";
      const linkBoton = ubicacion.mapsUrl
        ? `<a class="btn btn--ghost" href="${escapeHTML(ubicacion.mapsUrl)}" target="_blank" rel="noopener noreferrer">Abrir en Maps</a>`
        : "";
      return `
        <div class="ubicacion-item" data-index="${index}">
          <h4>${escapeHTML(ubicacion.nombre || "Ubicación por confirmar")}</h4>
          ${direccion}
          <div class="ubicacion-actions">
            <button class="btn btn--secondary" data-action="mostrar-ubicacion" data-index="${index}">
              Ver en esta página
            </button>
            ${linkBoton}
          </div>
        </div>
      `;
    })
    .join("");
  mostrarUbicacionEnMapa(ubicacionSeleccionadaIndex < ubicacionesPublicas.length ? ubicacionSeleccionadaIndex : 0);
}

function mostrarUbicacionEnMapa(index) {
  if (!ubicacionesDesbloqueadas) return;
  if (!ubicacionesPublicas.length) return;
  const ubicacion = ubicacionesPublicas[index];
  if (!ubicacion) return;
  ubicacionSeleccionadaIndex = index;
  const embed = generarMapaEmbed(ubicacion);
  if (ubicacionesMapaFrame) {
    if (embed) {
      ubicacionesMapaFrame.src = embed;
    } else {
      ubicacionesMapaFrame.removeAttribute("src");
    }
  }
  if (ubicacionesMapaNombre) {
    ubicacionesMapaNombre.textContent = ubicacion.nombre || "Ubicación del evento";
  }
  if (ubicacionesMapaDireccion) {
    ubicacionesMapaDireccion.textContent = ubicacion.direccion || "";
  }
  if (ubicacionesMapaLink) {
    if (ubicacion.mapsUrl) {
      ubicacionesMapaLink.href = ubicacion.mapsUrl;
      ubicacionesMapaLink.hidden = false;
    } else {
      ubicacionesMapaLink.hidden = true;
    }
  }
  actualizarHeroLocation(ubicacion);
  actualizarDetalleUbicacion(ubicacion);
  if (ubicacionesPublicList) {
    ubicacionesPublicList
      .querySelectorAll(".ubicacion-item")
      .forEach((item) => item.classList.remove("is-active"));
    const active = ubicacionesPublicList.querySelector(`.ubicacion-item[data-index="${index}"]`);
    active?.classList.add("is-active");
  }
}

function actualizarHeroLocation(ubicacion) {
  if (!heroLocationElem) return;
  if (!ubicacionesDesbloqueadas) {
    heroLocationElem.textContent = HERO_LOCATION_LOCKED_TEXT;
    return;
  }
  if (ubicacion) {
    const localidadEstado = obtenerLocalidadEstado(ubicacion.direccion);
    heroLocationElem.textContent = localidadEstado || HERO_LOCATION_DEFAULT;
  } else {
    heroLocationElem.textContent = HERO_LOCATION_DEFAULT;
  }
}

function obtenerLocalidadEstado(direccion = "") {
  if (!direccion) return "";
  const segmentos = direccion
    .split(",")
    .map((parte) => parte.trim())
    .filter(Boolean);
  if (!segmentos.length) return direccion.trim();
  const esPaisMexico = (valor = "") => /méxico/i.test(valor);
  let estado = segmentos.pop() || "";
  if (esPaisMexico(estado) && segmentos.length) {
    estado = segmentos.pop() || estado;
  }
  const localidad = limpiarCodigoPostal(segmentos.pop() || "");
  const resultado = [localidad, estado].filter(Boolean);
  return resultado.join(", ");
}

function limpiarCodigoPostal(texto = "") {
  if (!texto) return "";
  return texto.replace(/^[0-9]+[\s-]*/, "").trim();
}

function actualizarDetalleUbicacion(ubicacion) {
  if (!detalleUbicacionNombre || !detalleUbicacionDireccion) return;
  if (!ubicacionesDesbloqueadas) {
    detalleUbicacionNombre.textContent = "Ubicación privada";
    detalleUbicacionDireccion.textContent =
      "Muy pronto revelaremos la dirección. Ingresa tu código para conocerla completa.";
    if (detalleUbicacionLink) {
      detalleUbicacionLink.hidden = true;
      detalleUbicacionLink.removeAttribute("href");
    }
    if (detalleUbicacionMensaje) {
      detalleUbicacionMensaje.classList.add("hidden");
      detalleUbicacionMensaje.textContent = "";
    }
    return;
  }
  if (!ubicacion) {
    detalleUbicacionNombre.textContent = HERO_LOCATION_DEFAULT;
    detalleUbicacionDireccion.textContent =
      "Agrega una ubicación desde el panel para mostrarla aquí.";
    if (detalleUbicacionLink) {
      detalleUbicacionLink.hidden = true;
      detalleUbicacionLink.removeAttribute("href");
    }
    detalleUbicacionMensaje?.classList.add("hidden");
    return;
  }
  detalleUbicacionNombre.textContent = ubicacion.nombre || HERO_LOCATION_DEFAULT;
  detalleUbicacionDireccion.textContent =
    ubicacion.direccion || "Estamos preparando la dirección completa.";
  if (detalleUbicacionLink) {
    if (ubicacion.mapsUrl) {
      detalleUbicacionLink.hidden = false;
      detalleUbicacionLink.href = ubicacion.mapsUrl;
    } else {
      detalleUbicacionLink.hidden = true;
      detalleUbicacionLink.removeAttribute("href");
    }
  }
  if (detalleUbicacionMensaje) {
    if (ubicacion.notaPublica && ubicacion.notaPublica.trim()) {
      detalleUbicacionMensaje.textContent = ubicacion.notaPublica;
      detalleUbicacionMensaje.classList.remove("hidden");
    } else {
      detalleUbicacionMensaje.classList.add("hidden");
      detalleUbicacionMensaje.textContent = "";
    }
  }
}

async function cargarUbicacionesPublicas() {
  if (!ubicacionesPublicList) return;
  try {
    const snap = await db.collection("ubicacionesEvento").orderBy("nombre").get();
    ubicacionesPublicas = snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    ubicacionSeleccionadaIndex = 0;
    actualizarEstadoSeccionUbicaciones();
  } catch (error) {
    console.error("Error al cargar ubicaciones públicas", error);
    ubicacionesPublicList.innerHTML =
      "<p>No pudimos cargar las ubicaciones en este momento, intenta más tarde.</p>";
    actualizarDetalleUbicacion(null);
    actualizarHeroLocation(null);
  }
}

function renderItinerarioPublico() {
  if (!detalleProgramaLista) return;
  if (!itinerarioPublico.length) {
    detalleProgramaLista.innerHTML = "";
    if (detalleProgramaMensaje) {
      detalleProgramaMensaje.textContent =
        "Aún no publicamos el itinerario. Cuando lo registres en el panel aparecerá aquí.";
      detalleProgramaMensaje.classList.remove("hidden");
    }
    return;
  }
  detalleProgramaLista.innerHTML = itinerarioPublico
    .map((evento) => {
      const hora = formatearHoraEvento(evento.hora);
      const fecha = formatearFechaCorta(evento.hora);
      const lugar = evento.lugarEvento ? ` · ${escapeHTML(evento.lugarEvento)}` : "";
      return `<li><span>${hora}</span> ${escapeHTML(evento.nombreEvento || "Evento")}
        <small>${fecha}${lugar}</small></li>`;
    })
    .join("");
  detalleProgramaMensaje?.classList.add("hidden");
}

async function cargarItinerarioPublico() {
  if (!detalleProgramaLista && !detalleProgramaMensaje) return;
  try {
    const snap = await db.collection("itinerario").orderBy("hora").get();
    itinerarioPublico = snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    renderItinerarioPublico();
  } catch (error) {
    console.error("Error al cargar el itinerario público", error);
    if (detalleProgramaMensaje) {
      detalleProgramaMensaje.textContent =
        "No pudimos cargar el programa por ahora. Intenta nuevamente más tarde.";
      detalleProgramaMensaje.classList.remove("hidden");
    }
  }
}

function extraerReferenciaPinterest(url = "") {
  if (!url) return null;
  try {
    const parsed = new URL(url);
    const segmentos = parsed.pathname.split("/").filter(Boolean);
    if (!segmentos.length) return null;
    if (segmentos[0] === "pin" && segmentos[1]) {
      return { tipo: "pin", pinId: segmentos[1].replace(/[^0-9]/g, "") };
    }
    if (segmentos.length >= 2) {
      return { tipo: "board", user: segmentos[0], board: segmentos[1] };
    }
    return null;
  } catch (error) {
    return null;
  }
}

function mostrarPinterestMensaje(texto = "") {
  const placeholder = document.getElementById("pinterest-placeholder");
  const embed = document.getElementById("pinterest-embed");
  if (placeholder) {
    placeholder.textContent = texto;
    placeholder.classList.remove("hidden");
  }
  if (embed) {
    embed.classList.add("hidden");
  }
}

function actualizarPinterestEmbed(url) {
  if (!url) return;
  const widgetContainer = document.getElementById("pinterest-widget");
  if (!widgetContainer) return;
  const previousPlaceholder = document.getElementById("pinterest-placeholder");
  const placeholderText =
    previousPlaceholder?.textContent || "Pronto verás nuestras ideas favoritas aquí.";
  widgetContainer.innerHTML = "";
  const embed = document.createElement("a");
  embed.id = "pinterest-embed";
  embed.className = "pinterest-embed";
  embed.setAttribute("data-pin-do", "embedBoard");
  embed.setAttribute("data-pin-scale-height", String(PINTEREST_SCALE_HEIGHT));
  embed.setAttribute("data-pin-scale-width", String(PINTEREST_SCALE_WIDTH));
  embed.setAttribute("data-default-href", pinterestDefaultHref);
  embed.href = url;
  const placeholder = document.createElement("p");
  placeholder.id = "pinterest-placeholder";
  placeholder.textContent = placeholderText;
  placeholder.classList.add("hidden");
  widgetContainer.appendChild(embed);
  widgetContainer.appendChild(placeholder);
  reconstruirPinterestEmbed();
}

function reconstruirPinterestEmbed(intentos = 0) {
  if (window.PinUtils && typeof window.PinUtils.build === "function") {
    try {
      window.PinUtils.build();
    } catch (error) {
      console.error("No se pudo regenerar el widget de Pinterest", error);
    }
    return;
  }
  if (intentos < 10) {
    setTimeout(() => reconstruirPinterestEmbed(intentos + 1), 400);
  }
}

function renderPinterestWidget(config = {}) {
  if (!pinterestSectionElem || !pinterestWidgetContainer) return;
  const pinPanelUrl = config?.pinUrl || config?.boardUrl || "";
  const pinUrl = normalizarPinterestUrl(pinPanelUrl);
  const widgetActivo = config?.activo !== false;
  if (!widgetActivo) {
    pinterestSectionElem.classList.add("hidden");
    mostrarPinterestMensaje("Pronto compartiremos nuestras ideas favoritas.");
    return;
  }
  pinterestSectionElem.classList.remove("hidden");
  if (pinterestDescripcionElem) {
    pinterestDescripcionElem.textContent =
      config.descripcion || "Sigue el tablero para inspirarte con nuestros looks.";
  }
  let boardUrl = pinUrl;
  let usandoFallback = false;
  if (!boardUrl) {
    boardUrl = pinterestDefaultHref;
    usandoFallback = true;
  }
  if (esPinterestShortUrl(boardUrl)) {
    mostrarPinterestMensaje(
      "Utiliza la URL completa del tablero (https://www.pinterest.com/usuario/tablero/)."
    );
    return;
  }
  const referencia = boardUrl ? extraerReferenciaPinterest(boardUrl) : null;
  if (!referencia || referencia.tipo !== "board") {
    mostrarPinterestMensaje(
      usandoFallback
        ? "Configura un tablero público en el panel para mostrarlo aquí."
        : "No pudimos interpretar la URL del tablero. Revisa el enlace en el panel."
    );
    return;
  }
  actualizarPinterestEmbed(boardUrl);
}

function cargarPinterestWidgetPublico() {
  if (!pinterestWidgetContainer || typeof db === "undefined") return;
  pinterestWidgetUnsubscribe?.();
  pinterestWidgetUnsubscribe = db
    .collection("configuracion")
    .doc("pinterestWidget")
    .onSnapshot(
      (doc) => {
        pinterestWidgetPublico = doc.exists ? doc.data() : null;
        console.log("[PinterestWidget] Config recibida:", pinterestWidgetPublico);
        renderPinterestWidget(pinterestWidgetPublico || {});
      },
      (error) => {
        console.error("Error al cargar el widget de Pinterest", error);
        mostrarPinterestMensaje("No pudimos cargar el tablero. Intenta más tarde.");
        pinterestSectionElem?.classList.remove("hidden");
      }
    );
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

paseGenerarBtn?.addEventListener("click", generarPaseDigital);
paseDescargarBtn?.addEventListener("click", descargarPaseQR);

resumenEditarBtn?.addEventListener("click", () => {
  rsvpModoEdicion = true;
  aplicarModoRSVP();
  rsvpForm?.scrollIntoView({ behavior: "smooth", block: "start" });
});

ubicacionesPublicList?.addEventListener("click", (event) => {
  const btn = event.target.closest("[data-action='mostrar-ubicacion']");
  if (!btn) return;
  const index = Number(btn.dataset.index);
  if (!Number.isNaN(index)) {
    mostrarUbicacionEnMapa(index);
  }
});

codigoForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const codigo = codigoForm.codigoInvitacion.value;
  if (!codigo) return;
  cargarInvitadoPorCodigo(codigo);
});

rsvpForm?.addEventListener("submit", guardarRSVP);

actualizarEstadoSeccionUbicaciones();
cambiarVisibilidadSecciones(true);
cargarDatosEvento();
cargarUbicacionesPublicas();
cargarItinerarioPublico();
cargarPinterestWidgetPublico();
