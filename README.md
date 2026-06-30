# Plaza Paseo del Parque

Landing page del desarrollo comercial Plaza Paseo del Parque, con tour virtual 360° y panel de administración de contenido vía CMS.

## Stack

- **[Astro](https://astro.build)** — framework principal, salida estática
- **[Sveltia CMS](https://github.com/sveltia/sveltia-cms)** (Decap-compatible) — edición de contenido vía interfaz visual, autenticado con GitHub OAuth
- **[Vercel](https://vercel.com)** — hosting y despliegue
- **[Pannellum](https://pannellum.org)** — visor de tour virtual 360°

## Desarrollo local

\`\`\`bash
# Instalar dependencias
npm install

# Levantar servidor de desarrollo
npm run dev
\`\`\`


## CMS

El panel de edición de contenido está disponible en `/admin`. Usa autenticación OAuth con GitHub mediante endpoints serverless en `/api/auth` y `/api/callback`.

Requiere las siguientes variables de entorno configuradas en Vercel:

- `GITHUB_CLIENT_ID`
- `GITHUB_CLIENT_SECRET`

## Estructura

\`\`\`
src/
├── components/   # Componentes Astro (Hero, Espacios, Ubicación, etc.)
├── content/      #

cat README.md
E0F
