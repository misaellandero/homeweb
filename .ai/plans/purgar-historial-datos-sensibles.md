---
title: Purgar del historial de homeweb los respaldos de BD, .env y comprobantes
status: pending
agent: Tron
summary: Reescribir el historial de homeweb con git filter-repo para borrar de todos los commits los .sql, .env y comprobantes_pago que ya se quitaron en 14ebe08, y forzar el push. Destructivo e irreversible; requiere aprobación de Misael.
created: 2026-10-23
---

# Purgar datos sensibles del historial de homeweb

## Por qué
El commit `14ebe08` quitó los archivos del sitio, pero siguen en los 315 commits anteriores. Cualquiera puede clonar el repo (público) y recuperarlos.

## Qué se borra de todo el historial (en `sistema/`, `Apps/DebtMe/sistema/`, `Apps/Revisits/sistema/`)
- `base_datos/` (respaldos `.sql` de 2019 con usuarios: nombre, teléfono, email, password, INE, RFC/CURP)
- `php/facturas/.env` (claves viejas de Facturapi)
- `images/comprobantes_pago/`

## Pasos (Tron, solo tras aprobación)
1. Respaldo completo: `git clone --mirror https://github.com/misaellandero/homeweb.git ~/Backups/homeweb-antes-de-purga.git` (local, fuera de GitHub; borrarlo cuando todo esté verificado, porque contiene los datos).
2. Instalar la herramienta: `brew install git-filter-repo` (necesita red).
3. En un clon espejo nuevo y limpio:
   ```sh
   git filter-repo --invert-paths \
     --path-glob '*base_datos/*' \
     --path-glob '*php/facturas/.env' \
     --path-glob '*comprobantes_pago/*'
   ```
4. Verificar: `git log --all --name-only | grep -E 'base_datos|facturas/.env|comprobantes_pago'` debe salir vacío; el sitio (`index.html`, `Apps/*`) intacto.
5. `git push --force --mirror` a GitHub (reescribe `main` y las 2 ramas `claude/*`).
6. En `~/GitHub/homeweb` local: volver a clonar (o `git fetch` + `git reset --hard origin/main`), conservando antes el cambio sin commit de `Apps/Revisits/watch/css/main_revisits.css` y la carpeta `.claude/`.
7. Pedir a GitHub Support que purgue vistas en caché de commits viejos (opcional; los SHAs antiguos pueden seguir accesibles un tiempo por URL directa).

## Riesgos
- Cambian todos los SHAs: cualquier clon viejo (otra Mac, worktrees en `.claude/worktrees/`) queda divergente y debe reclonarse.
- El workflow "Update Sprite Vault Mirror" hace commits automáticos: pausarlo durante la purga para que no empuje sobre el historial viejo.
- GitHub Pages se vuelve a publicar solo; revisar misaellandero.com después.
- No hay forks (forks_count 0), así que no hay copias públicas conocidas.

## Decide Misael
- Aprobar o rechazar. Si se aprueba, Tron ejecuta los pasos 1–6 y reporta.
