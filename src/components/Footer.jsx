import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Github, Linkedin, Mail, MapPin, Phone } from 'lucide-react'
import { profile, social } from '../content.js'

const navLinks = [
  { label: 'About', id: null, to: '/' },
  { label: 'Projects', id: 'projects' },
  { label: 'Experience', id: 'experience' },
  { label: 'Stack', id: 'stack' },
  { label: 'Blog', id: 'blog' },
  { label: 'Contact', id: 'contact' },
]

export default function Footer() {
  const navigate = useNavigate()
  const location = useLocation()

  const goTo = (id) => (e) => {
    e.preventDefault()
    if (!id) {
      if (location.pathname === '/') window.scrollTo({ top: 0, behavior: 'smooth' })
      else navigate('/')
      return
    }
    if (location.pathname === '/') {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    } else {
      navigate(`/#${id}`)
    }
  }

  return (
    <footer className="border-t border-white/5 mt-24">
      <div className="max-w-2xl md:max-w-4xl mx-auto px-4 sm:px-6 py-14 grid sm:grid-cols-3 gap-10">
        {/* Brand */}
        <div>
          <h3 className="font-display text-lg mb-2">{profile.name}</h3>
          <p className="text-accent text-sm font-semibold mb-3">{profile.headlineTop} {profile.headlineBottom}</p>
          <p className="text-muted text-sm leading-relaxed mb-5">{profile.bio}</p>
          <div className="flex gap-2">
            {social.github && (
              <a href={social.github} target="_blank" rel="noreferrer" className="w-9 h-9 flex items-center justify-center rounded-lg bg-panel border border-white/5 text-muted hover:text-accent transition-colors">
                <Github size={16} />
              </a>
            )}
            {social.linkedin && (
              <a href={social.linkedin} target="_blank" rel="noreferrer" className="w-9 h-9 flex items-center justify-center rounded-lg bg-panel border border-white/5 text-muted hover:text-accent transition-colors">
                <Linkedin size={16} />
              </a>
            )}
            {social.email && (
              <a href={`mailto:${social.email}`} className="w-9 h-9 flex items-center justify-center rounded-lg bg-panel border border-white/5 text-muted hover:text-accent transition-colors">
                <Mail size={16} />
              </a>
            )}
          </div>
        </div>

        {/* Navigation */}
        <div>
          <p className="text-xs font-bold uppercase tracking-wide text-muted mb-4">Navigation</p>
          <ul className="space-y-3">
            {navLinks.map((n) => (
              <li key={n.label}>
                <a href={n.to || `#${n.id}`} onClick={goTo(n.id)} className="text-sm text-ink/80 hover:text-accent transition-colors">
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Get in touch */}
        <div>
          <p className="text-xs font-bold uppercase tracking-wide text-muted mb-4">Get In Touch</p>
          <ul className="space-y-3">
            {social.email && (
              <li className="flex items-center gap-2 text-sm text-ink/80">
                <Mail size={14} className="text-accent shrink-0" />
                <a href={`mailto:${social.email}`} className="hover:text-accent transition-colors truncate">{social.email}</a>
              </li>
            )}
            {social.phone && (
              <li className="flex items-center gap-2 text-sm text-ink/80">
                <Phone size={14} className="text-accent shrink-0" />
                <span>{social.phone}</span>
              </li>
            )}
            <li className="flex items-center gap-2 text-sm text-ink/80">
              <MapPin size={14} className="text-accent shrink-0" />
              <span>{profile.location}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/5 py-6 text-center">
        <p className="text-muted text-xs">© {new Date().getFullYear()} {profile.name}. All rights reserved.</p>
      </div>
    </footer>
  )
}
