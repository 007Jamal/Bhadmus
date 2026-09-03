import { useState } from 'react'
import { Send } from 'lucide-react'
import { social } from '../content.js'

const BUDGET_OPTIONS = ['Select...', 'Under $500', '$500 – $2,000', '$2,000 – $5,000', '$5,000+', 'Just exploring']

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', budget: '', message: '' })
  const [status, setStatus] = useState('idle') // idle | sending | sent | error

  const update = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')

    // Fire the WhatsApp ping in the background regardless of Formspree state.
    // It silently no-ops server-side if not configured, so this is always safe.
    fetch('/api/notify-whatsapp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    }).catch(() => {})

    if (!social.formspreeId) {
      // No email backend configured yet: fall back to opening the user's email client
      const subject = encodeURIComponent(`Portfolio inquiry from ${form.name || 'a visitor'}`)
      const body = encodeURIComponent(
        `Name: ${form.name}\nEmail: ${form.email}\nBudget: ${form.budget}\n\n${form.message}`
      )
      window.location.href = `mailto:${social.email}?subject=${subject}&body=${body}`
      setStatus('idle')
      return
    }

    try {
      const res = await fetch(`https://formspree.io/f/${social.formspreeId}`, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: new FormData(e.target),
      })
      if (res.ok) {
        setStatus('sent')
        setForm({ name: '', email: '', budget: '', message: '' })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  if (status === 'sent') {
    return (
      <div className="bg-panel rounded-2xl p-8 border border-white/5 text-center">
        <p className="text-accent font-bold mb-1">Message sent.</p>
        <p className="text-muted text-sm">Thanks for reaching out, I'll get back to you soon.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="block text-xs font-bold uppercase tracking-wide text-muted mb-2">Name</label>
        <input
          type="text"
          required
          value={form.name}
          onChange={update('name')}
          placeholder="Your Name"
          className="w-full bg-panel border border-white/10 rounded-xl px-4 py-3 text-sm text-ink placeholder:text-muted focus:outline-none focus:border-accent/50 transition-colors"
        />
      </div>

      <div>
        <label className="block text-xs font-bold uppercase tracking-wide text-muted mb-2">Email</label>
        <input
          type="email"
          required
          value={form.email}
          onChange={update('email')}
          placeholder="your@email.com"
          className="w-full bg-panel border border-white/10 rounded-xl px-4 py-3 text-sm text-ink placeholder:text-muted focus:outline-none focus:border-accent/50 transition-colors"
        />
      </div>

      <div>
        <label className="block text-xs font-bold uppercase tracking-wide text-muted mb-2">Budget</label>
        <select
          value={form.budget}
          onChange={update('budget')}
          className="w-full bg-panel border border-white/10 rounded-xl px-4 py-3 text-sm text-ink focus:outline-none focus:border-accent/50 transition-colors"
        >
          {BUDGET_OPTIONS.map((opt) => (
            <option key={opt} value={opt === 'Select...' ? '' : opt}>{opt}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-xs font-bold uppercase tracking-wide text-muted mb-2">Message</label>
        <textarea
          required
          rows={5}
          value={form.message}
          onChange={update('message')}
          placeholder="Tell me about your project..."
          className="w-full bg-panel border border-white/10 rounded-xl px-4 py-3 text-sm text-ink placeholder:text-muted focus:outline-none focus:border-accent/50 transition-colors resize-none"
        />
      </div>

      <button
        type="submit"
        disabled={status === 'sending'}
        className="w-full flex items-center justify-center gap-2 bg-accent text-black font-bold py-4 rounded-xl hover:opacity-90 transition-opacity disabled:opacity-60"
      >
        {status === 'sending' ? 'Sending...' : 'Send Message'}
        <Send size={18} />
      </button>

      {status === 'error' && (
        <p className="text-red-400 text-xs text-center">Something went wrong. Try emailing directly instead.</p>
      )}
    </form>
  )
}
