export default async function handler(req, res) {
  const { code, error, error_description } = req.query

  if (error) {
    res.status(400).send(`GitHub OAuth error: ${error_description || error}`)
    return
  }

  const clientId = process.env.OAUTH_CLIENT_ID
  const clientSecret = process.env.OAUTH_CLIENT_SECRET

  if (!clientId || !clientSecret) {
    res.status(500).send('Missing OAUTH_CLIENT_ID or OAUTH_CLIENT_SECRET environment variable on the server.')
    return
  }

  try {
    const tokenRes = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ client_id: clientId, client_secret: clientSecret, code }),
    })
    const data = await tokenRes.json()

    if (data.error || !data.access_token) {
      res.status(400).send(`OAuth token exchange failed: ${data.error_description || data.error || 'unknown error'}`)
      return
    }

    const payload = JSON.stringify({ token: data.access_token, provider: 'github' })

    const html = `<!doctype html>
<html><body>
<script>
  (function() {
    function receiveMessage(e) {
      window.opener.postMessage(
        'authorization:github:success:${payload.replace(/'/g, "\\'")}',
        e.origin
      );
      window.removeEventListener('message', receiveMessage, false);
    }
    window.addEventListener('message', receiveMessage, false);
    window.opener.postMessage('authorizing:github', '*');
  })();
</script>
</body></html>`

    res.setHeader('Content-Type', 'text/html')
    res.status(200).send(html)
  } catch (err) {
    res.status(500).send('Server error during OAuth exchange: ' + err.message)
  }
}
