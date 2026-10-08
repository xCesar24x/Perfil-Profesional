# César Madrigal Rodríguez — Career Presentation

Sitio interactivo con mi trayectoria profesional, pensado para usarlo en entrevistas: experiencia navegable con paneles expandibles, explorador de habilidades con evidencia y catálogo de certificaciones. Bilingüe (español en `/`, inglés en `/en`).

## Stack

- **Next.js 16** (App Router, páginas 100 % estáticas) + **TypeScript**
- **Tailwind CSS v4** con la paleta del proyecto como tokens (`src/app/globals.css`)
- **Motion** para transiciones y animaciones
- **Phosphor Icons** (peso *light*)
- Tipografías: Instrument Serif · Geist · Geist Mono
- Despliegue en **Vercel**

## Funciones para entrevistas

| Función | Cómo usarla |
| --- | --- |
| Paleta de comandos | `Ctrl + K` / `⌘ + K`: busca cualquier rol, habilidad o certificación y salta directo a ella |
| Idioma en vivo | Botón `ES / EN` en la barra; la URL cambia a `/en` para compartir en inglés |
| Enlaces directos a un rol | `/#role-grupo-anc`, `/en#role-dos-pinos`, etc. abren el rol expandido |
| Métricas con contexto | Cada cifra de *Impacto* abre el rol del que proviene |
| Evidencia de habilidades | Al elegir una habilidad se listan los roles donde se aplicó y las certificaciones que la respaldan |
| CV descargable | Botón en el hero y en contacto (`public/cv/`) |

## Editar el contenido

Todo el contenido vive en `src/data/` y está tipado; no hace falta tocar componentes.

| Archivo | Contenido |
| --- | --- |
| `profile.ts` | Nombre, titular, declaración, contacto, países, educación, idiomas y las métricas de *Impacto* |
| `roles.ts` | Roles, capítulos, logros (usa `**negrita**`), métricas, alcance detallado y habilidades aplicadas |
| `skills.ts` | Categorías y habilidades (`core: true` = aparece en el CV) |
| `certifications.ts` | Certificaciones, emisor, fecha, ID de credencial y habilidades que valida |
| `ui.ts` | Textos de la interfaz en ambos idiomas |

Las relaciones se calculan solas: si agregas `"power-bi"` a las `skills` de un rol o certificación, aparecerá como evidencia en el explorador de habilidades.

Los roles en curso usan `end: null`; su duración se calcula con el mes actual en el navegador.

## Desarrollo local

```bash
npm install
npm run dev
```

Abre http://localhost:3000 (español) o http://localhost:3000/en (inglés).

```bash
npm run build   # build de producción
npm run lint
```

## Despliegue

El repositorio está conectado a Vercel: cada `git push` a `main` publica una nueva versión automáticamente.
