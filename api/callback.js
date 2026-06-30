// Recibe el "code" de GitHub, lo intercambia por un access_token
// y lo devuelve a la ventana del CMS via postMessage.
export default async function handler(req, res) {
  const clientId = process.env.GITHUB_CLIENT_ID;
  const clientSecret = process.env.GITHUB_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    res.status(500).send('Faltan GITHUB_CLIENT_ID o GITHUB_CLIENT_SECRET');
    return;
  }

  const code = req.query.code;
  if (!code) {
    res.status(400).send('Falta el parámetro "code"');
    return;
  }

  try {
    const tokenRes = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        client_id: clientId,
        client_secret: clientSecret,
        code,
      }),
    });

    const data = await tokenRes.json();
    const token = data.access_token;

    const status = token ? 'success' : 'error';
    const result = token
      ? { token, provider: 'github' }
      : { error: data.error_description || 'No se pudo obtener el token' };

    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.end(renderPage(status, result));
  } catch (err) {
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.end(renderPage('error', { error: String(err) }));
  }
}

function renderPage(status, result) {
  const content = `authorization:github:${status}:${JSON.stringify(result)}`;
  return `<!doctype html><html><head><meta charset="utf-8"></head><body>
<script>
(function () {
  function receiveMessage(e) {
    window.opener.postMessage(${JSON.stringify(content)}, e.origin);
    window.removeEventListener('message', receiveMessage, false);
  }
  window.addEventListener('message', receiveMessage, false);
  window.opener.postMessage('authorizing:github', '*');
})();
</script>
<p>Autenticación completada. Puedes cerrar esta ventana.</p>
</body></html>`;
}
