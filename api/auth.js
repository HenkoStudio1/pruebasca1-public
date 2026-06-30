// Inicia el flujo OAuth de GitHub para Sveltia/Decap CMS.
// Redirige al usuario a GitHub para autorizar la app.
export default function handler(req, res) {
  const clientId = process.env.GITHUB_CLIENT_ID;
  if (!clientId) {
    res.status(500).send('Falta la variable de entorno GITHUB_CLIENT_ID');
    return;
  }

  const proto = req.headers['x-forwarded-proto'] || 'https';
  const host = req.headers.host;
  const redirectUri = `${proto}://${host}/api/callback`;
  const scope = process.env.OAUTH_SCOPE || 'repo';
  const state = Math.random().toString(36).slice(2);

  const url =
    'https://github.com/login/oauth/authorize' +
    `?client_id=${encodeURIComponent(clientId)}` +
    `&redirect_uri=${encodeURIComponent(redirectUri)}` +
    `&scope=${encodeURIComponent(scope)}` +
    `&state=${encodeURIComponent(state)}`;

  res.writeHead(302, { Location: url });
  res.end();
}
