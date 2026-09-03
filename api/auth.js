export default function handler(req, res) {
  const clientId = process.env.OAUTH_CLIENT_ID
  if (!clientId) {
    res.status(500).send('Missing OAUTH_CLIENT_ID environment variable on the server.')
    return
  }
  const redirectUri = `https://${req.headers.host}/api/callback`
  const authorizeUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&scope=repo&redirect_uri=${encodeURIComponent(redirectUri)}`
  res.writeHead(302, { Location: authorizeUrl })
  res.end()
}
