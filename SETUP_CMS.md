# Sveltia CMS — Pasos para activarlo

El código ya está listo. El contenido editable vive en `src/data/hero.json` y
`src/data/espacios.json`, el panel en `public/admin/`, y la autenticación en
`api/auth.js` + `api/callback.js`. Faltan 4 pasos que dependen de tus cuentas.

## 1. Subir el proyecto a GitHub

```bash
git init
git add .
git commit -m "Sitio + Sveltia CMS"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/TU_REPO.git
git push -u origin main
```

> En Vercel, conecta el proyecto a este repo (si no lo está ya) para que cada
> cambio guardado desde el CMS dispare un redeploy automático.

## 2. Editar `public/admin/config.yml`

Cambia dos líneas:

- `repo: TU_USUARIO/TU_REPO` → tu repo real (ej. `cesarcinieg/paseo`)
- `base_url:` → tu dominio de producción (ya viene con el de Vercel; cámbialo si
  usas dominio propio)

Si tu repo es **privado**, deja el scope en `repo`. Si es **público**, puedes
poner `OAUTH_SCOPE=public_repo` en Vercel (paso 4) para pedir menos permisos.

## 3. Crear la GitHub OAuth App

GitHub → Settings → Developer settings → **OAuth Apps** → New OAuth App:

- **Homepage URL:** `https://TU_DOMINIO`
- **Authorization callback URL:** `https://TU_DOMINIO/api/callback`

Guarda y copia el **Client ID** y genera un **Client Secret**.

## 4. Variables de entorno en Vercel

Project → Settings → Environment Variables:

| Nombre                 | Valor                          |
|------------------------|--------------------------------|
| `GITHUB_CLIENT_ID`     | (de la OAuth App)              |
| `GITHUB_CLIENT_SECRET` | (de la OAuth App)              |
| `OAUTH_SCOPE`          | `public_repo` (opcional, repo público) |

Redeploy después de agregarlas.

## Probar

1. Entra a `https://TU_DOMINIO/admin`
2. "Login with GitHub" → autoriza
3. Edita un local o los textos del hero → **Publish**
4. Sveltia hace commit a `src/data/*.json` → Vercel reconstruye solo.

## Notas

- Las imágenes que subas desde el CMS se guardan en `/public` y se referencian
  desde la raíz (`/archivo.jpg`).
- El color del badge de cada local se calcula solo según el tipo
  (Local comercial = primario, Oficina = secundario).
- Para editar más secciones (contacto, tour, etc.) más adelante: mueve ese
  contenido a un JSON en `src/data/` y agrega su colección en `config.yml`.
