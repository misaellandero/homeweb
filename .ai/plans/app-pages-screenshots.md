---
title: Capturas reales en las páginas de apps y portafolio completo
status: pending
agent: tron (Claude)
summary: Galería de capturas de tienda (es/en) en cada página de app, tarjetas faltantes en el portafolio (Baruch, Klenny, PetPal) y estados de tienda corregidos (Fox vs Hunters ya está publicada).
created: 2026-10-29
---

# Capturas reales en las páginas de apps y portafolio completo

## Diagnóstico (2026-10-29)

| App | En portafolio | Página | Capturas en la página | Recursos en el repo de la app | Tienda |
|---|---|---|---|---|---|
| Baruch (Informes) | No | `Apps/Baruch/index.html` | 1 iPhone + 1 Mac (es/en) | iPhone 6, iPad 6, Mac 4 (es/en) `Informes/Arte/AppStore Screenshots` | En revisión |
| Klenny (KeyClean) | No | `Apps/KeyClean/index.html` | Ninguna (ícono y hero) | Mac 4 (es/en) `KeyClean/Arte/AppStore Screenshots/Mac` | No publicada |
| PetPal | No | `Apps/PetPal/index.html` | Ilustraciones, no capturas | `PetPal/Arte/AppStore/screenshots/final/mosaic-dogs-duo-2026-10-29/{es-MX,en-US}` | No publicada |
| Fox vs Hunters (Impostor) | Sí, con "lista de espera" | Dos páginas: `Apps/Fox vs Hunters/` y `Apps/Impostor/` | Mascota y marcador | `Impostor/Arte/Arte Appstore/{Es,En,iPad}` | **Publicada** (id6787015090) |
| DebtMe | Sí | `Apps/DebtMe/index_debtMe.html` (plantilla vieja) | Mockup viejo `DebtDevices.png` | `debtMe/Art/AppStore/capturas-2026/{es,en}` | Publicada |
| Revisits | Sí | `Apps/Revisits/index_revisitas.html` | Capturas anteriores | `revisits/Arte/AppStore Screenshots/{iPhone,iPad,Mac,Watch} 2026` | Publicada |
| Loxi | Sí | `Apps/Loxi/index.html` | 1 captura | `Loxi/Arte/AppStore/0{1,2,3}_main_web.png` | Publicada |
| CaffeinateBar | Sí | `Apps/CaffeinateBar/index.html` | Ninguna | `CaffeinateBar/Arte` (3 pruebas, sin set de tienda) | Publicada |
| Cota | Sí | `Apps/Cota/` | 4 imágenes | Sin repo local | Lista de espera |
| SpriteVaultControl | No | `Apps/SpriteVaultControl/Index.html` | Ninguna | Sin repo local | ? |

## Plan

1. **Script de sincronización** `Tools/app-screenshots/sync.py`: mapa app → carpeta de capturas en `~/GitHub/<repo>`; copia las finales a `Apps/<App>/assets/images/screens/<plataforma>-<idioma>-<n>.jpg`, redimensionadas (iPhone 640 px de ancho, iPad 900, Mac 1440) y en JPG ~80 % para no inflar el repo. Volver a ejecutarlo trae las capturas nuevas.
2. **Galería reutilizable** (`assets/css/landing.css` + marcado común): carrusel horizontal con scroll-snap, pestañas iPhone/iPad/Mac cuando haya varias, y un bloque por idioma (`data-lang-block`, igual que Baruch). Sin JS nuevo salvo el selector de plataforma.
3. **Páginas por app**, una por commit:
   - Baruch: ampliar a la galería completa (iPhone, iPad y Mac).
   - Klenny: galería de Mac y renombrar la carpeta a `Apps/Klenny/` dejando `Apps/KeyClean/` como redirección, porque la URL de soporte y la de privacidad de App Store Connect apuntan ahí.
   - PetPal: cambiar las ilustraciones por las capturas duo.
   - Fox vs Hunters: galería con las de `Impostor`, el botón de App Store en vez de la lista de espera y una sola página canónica.
   - DebtMe, Revisits y Loxi: cambiar los mockups viejos por las capturas 2026.
   - CaffeinateBar: solo si hay un set de capturas de tienda; si no, se queda como está.
4. **Portafolio** (`index.html`): tarjetas nuevas para Baruch ("En revisión"), Klenny y PetPal ("Próximamente"); Fox vs Hunters con el badge de App Store; los íconos nuevos en el hero.
5. **Privacidad (repo público)**: antes de copiar, revisar cada set para confirmar que solo hay datos ficticios. Se descarta cualquier captura con nombres, teléfonos o correos reales, en especial las de Revisits, DebtMe y Baruch.
6. **Verificación**: Chrome headless a 1440 y 390 px de ancho en cada página (es/en), sin scroll horizontal, y que las rutas resuelvan con un `http.server` local. Commits por app, sin push.

## Decisiones de Misael

- Fox vs Hunters: ¿qué página es la canónica, `Apps/Fox vs Hunters/` o `Apps/Impostor/`? La otra redirige.
- ¿Muestro Baruch, Klenny y PetPal en el portafolio antes de que estén publicadas, con un badge de "Próximamente" o "En revisión"?
- ¿Renombro la carpeta `Apps/KeyClean/` a `Apps/Klenny/` con redirección, o la dejo como está?
- Cota y SpriteVault no tienen repo local: ¿se quedan como están?

## Tarea: press kit para todas las apps (pedido por Misael, 2026-10-29)

Cada app con página en `Apps/<App>/` debe tener `presskit.html` (enlazado desde su página y su pie) y un `presskit.zip` descargable:

- Datos clave: nombre, plataformas, precio y modelo (p. ej. Klenny: compra única, todo incluido), fecha de lanzamiento, desarrollador, contacto (hola@misaellandero.com), enlace a App Store.
- Descripción corta y larga, en es y en.
- Ícono 1024 px (claro y oscuro si existe) y logo o wordmark.
- Capturas de tienda por plataforma e idioma (las mismas del script de sincronización).
- Video de vista previa, si existe, sin datos personales en el encuadre.
- Plantilla compartida en `Apps/shared/` para que todas se vean igual.

Orden sugerido: Klenny y Baruch (lanzamientos), luego Revisits, DebtMe, Loxi, Fox vs Hunters, PetPal, CaffeinateBar y Cota.
