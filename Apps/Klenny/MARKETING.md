# Klenny: URL corta, analítica y UTMs

Este archivo es público, igual que todo el sitio. No pongas aquí datos personales, llaves ni números de órdenes.

## URL corta

`https://misaellandero.com/klenny` sirve `klenny/index.html` (en la raíz del repo, en minúsculas), que redirige a
`/Apps/Klenny/index.html` y **conserva** `?query` y `#hash`:

| Enlace publicado | Abre |
|---|---|
| `misaellandero.com/klenny` | la página de Klenny (idioma del navegador) |
| `misaellandero.com/klenny?lang=es` | la página en español |
| `misaellandero.com/klenny?utm_source=reddit&utm_medium=organic&utm_campaign=lanzamiento-2026` | la página, con la campaña registrada |
| `misaellandero.com/klenny#faq` | la página, directo a una sección (`#download`, `#install`, `#app-store`, `#faq`) |

La redirección es por JavaScript, así que el referrer externo (reddit.com, etc.) se perdería. `klenny/index.html` lo guarda en
`sessionStorage` (`klenny-referrer`) y `klenny.js` se lo pasa a GoatCounter.

Ojo: macOS no distingue mayúsculas en el disco, pero GitHub Pages sí. No crees una carpeta `Klenny/` en la raíz; la página real
está en `Apps/Klenny/`.

## Analítica: GoatCounter (sin cookies)

Está **apagada** hasta que haya cuenta. Para encenderla:

1. Crea la cuenta en https://www.goatcounter.com (gratis). El "código" es el subdominio: `https://<código>.goatcounter.com`.
2. En `Apps/Klenny/assets/js/klenny.js`, al inicio, llena la constante (único lugar de configuración, aplica a index, terms y
   privacy):

   ```js
   var GOATCOUNTER_CODE = 'tu-codigo';
   ```

3. Publica. Con el código vacío no se carga ningún script ni se hace ninguna petición a GoatCounter.

Comportamiento:
- Carga `https://gc.zgo.at/count.js` con `data-goatcounter="https://<código>.goatcounter.com/count"`.
- No se carga si el navegador envía Do Not Track o Global Privacy Control.
- La visita se cuenta con la ruta sin query (`/Apps/Klenny/`, `/Apps/Klenny/privacy.html`), para no partirla por `?lang=` o
  `utm_*`. GoatCounter lee las campañas del query (`utm_campaign`, `utm_source`) por su cuenta y las muestra en su panel
  "Campaigns".
- GoatCounter ignora `localhost`, así que en pruebas locales no se envía nada.
- El aviso de privacidad (`privacy.html`, sección "This Website / Este sitio web") ya lo menciona.

### Eventos

Solo se envían si GoatCounter está cargado (`window.goatcounter.count`). El título dice desde dónde fue el clic.

| Evento (`path`) | Cuándo | Título de ejemplo |
|---|---|---|
| `download-dmg` | Cualquier botón de descarga: hero, sección Descarga, comparación, barra fija del móvil, "Descargar de nuevo" de la guía | `Download DMG (hero)`, `Download DMG (mobile-bar)` |
| `buy-polar` | Cualquier enlace a `buy.polar.sh` | `Buy on Polar (download)` |
| `lang-es` / `lang-en` | Cambio de idioma con el selector | `Language: es` |

## UTMs

`klenny.js` lee `utm_source`, `utm_medium`, `utm_campaign`, `utm_content` y `utm_term` de la URL, los guarda en
`sessionStorage` (`klenny-utm`, se borra al cerrar la pestaña) y los agrega a los enlaces de compra de Polar. Polar los guarda en
los metadatos de la orden, así se sabe qué canal vendió. Si la página llega sin UTMs, usa los guardados en esa pestaña.

Convenciones: todo en minúsculas, con guiones, sin espacios ni acentos. `utm_campaign` es la campaña (por ejemplo
`lanzamiento-2026`, `navidad-2026`); `utm_content` distingue la pieza o variante (por ejemplo `video-limpieza-01`).

| Canal | `utm_source` | `utm_medium` | Ejemplo |
|---|---|---|---|
| Reddit (post) | `reddit` | `organic` | `misaellandero.com/klenny?utm_source=reddit&utm_medium=organic&utm_campaign=lanzamiento-2026` |
| Reddit Ads | `reddit` | `paid` | `misaellandero.com/klenny?utm_source=reddit&utm_medium=paid&utm_campaign=lanzamiento-2026&utm_content=anuncio-a` |
| TikTok | `tiktok` | `video` | `misaellandero.com/klenny?utm_source=tiktok&utm_medium=video&utm_campaign=lanzamiento-2026&utm_content=video-01` |
| Instagram Reels | `instagram` | `reels` | `misaellandero.com/klenny?utm_source=instagram&utm_medium=reels&utm_campaign=lanzamiento-2026` |
| YouTube Shorts | `youtube` | `shorts` | `misaellandero.com/klenny?utm_source=youtube&utm_medium=shorts&utm_campaign=lanzamiento-2026` |
| YouTube (video largo) | `youtube` | `video` | `misaellandero.com/klenny?utm_source=youtube&utm_medium=video&utm_campaign=lanzamiento-2026` |
| X | `x` | `social` | `misaellandero.com/klenny?utm_source=x&utm_medium=social&utm_campaign=lanzamiento-2026` |
| Threads | `threads` | `social` | `misaellandero.com/klenny?utm_source=threads&utm_medium=social&utm_campaign=lanzamiento-2026` |
| AlternativeTo | `alternativeto` | `listing` | `misaellandero.com/klenny?utm_source=alternativeto&utm_medium=listing&utm_campaign=lanzamiento-2026` |
| Creadores / reseñas | `<nombre-del-canal>` | `creator` | `misaellandero.com/klenny?utm_source=nombre-del-canal&utm_medium=creator&utm_campaign=lanzamiento-2026` |

Con idioma: agrega `&lang=es` o `&lang=en` (por ejemplo, un video en español:
`misaellandero.com/klenny?lang=es&utm_source=tiktok&utm_medium=video&utm_campaign=lanzamiento-2026`).

Límites: las compras que se hacen desde la app (después de la limpieza gratis) no llevan estos UTMs. Para esas ver el informe de
marketing en el repo KeyClean (`.ai/marketing/canales-y-publicidad-2026-11.md`, sección 3.4: campo "¿Dónde conociste Klenny?" o
códigos de descuento por canal en Polar).
