// Sends a WhatsApp notification via CallMeBot (callmebot.com) when the
// contact form is submitted. Optional: if WHATSAPP_PHONE and
// CALLMEBOT_APIKEY env vars aren't set, this just no-ops so the form
// still works fine on email alone.
//
// Setup (one time, free):
// 1. Save +34 644 59 71 67 as a contact on the phone with your WhatsApp
// 2. Send it the message: I allow callmebot to send me messages
// 3. It replies with an API key
// 4. In Vercel: Settings -> Environment Variables, add
//      WHATSAPP_PHONE = your number with country code, no + or spaces (e.g. 2348060849929)
//      CALLMEBOT_APIKEY = the key it sent you
// 5. Redeploy

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' })
    return
  }

  const phone = process.env.WHATSAPP_PHONE
  const apikey = process.env.CALLMEBOT_APIKEY

  if (!phone || !apikey) {
    // Not configured yet -- this is fine, email still handles delivery.
    res.status(200).json({ skipped: true, reason: 'WhatsApp notifications not configured' })
    return
  }

  const { name, email, budget, message } = req.body || {}

  const text = [
    'New portfolio contact form message',
    `Name: ${name || 'n/a'}`,
    `Email: ${email || 'n/a'}`,
    budget ? `Budget: ${budget}` : null,
    '',
    message || '',
  ].filter(Boolean).join('\n')

  const url = `https://api.callmebot.com/whatsapp.php?phone=${phone}&text=${encodeURIComponent(text)}&apikey=${apikey}`

  try {
    await fetch(url)
    res.status(200).json({ sent: true })
  } catch (err) {
    // Never fail the whole form submission just because the WhatsApp ping failed.
    res.status(200).json({ sent: false, error: err.message })
  }
}
