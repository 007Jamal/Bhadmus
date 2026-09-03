import { Link, useNavigate, useLocation } from 'react-router-dom'

const navItems = [
  { label: 'Home', type: 'top' },
  { label: 'Projects', type: 'anchor', id: 'projects' },
  { label: 'Experience', type: 'anchor', id: 'experience' },
  { label: 'Stack', type: 'anchor', id: 'stack' },
  { label: 'Blog', type: 'anchor', id: 'blog' },
  { label: 'Contact', type: 'anchor', id: 'contact' },
]

export default function BottomNav() {
  const navigate = useNavigate()
  const location = useLocation()

  const handleAnchor = (id) => (e) => {
    e.preventDefault()
    if (location.pathname === '/') {
      const el = document.getElementById(id)
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    } else {
      navigate(`/#${id}`)
    }
  }

  const handleTop = (e) => {
    e.preventDefault()
    if (location.pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      navigate('/')
    }
  }

  return (
    <nav className="fixed bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-0.5 sm:gap-1 bg-panel/95 backdrop-blur border border-white/10 rounded-2xl px-1.5 sm:px-2 py-2 shadow-2xl max-w-[94vw] overflow-x-auto no-scrollbar">
      {navItems.map((item) => {
        const commonClass = 'px-2.5 sm:px-3 py-2 rounded-xl text-[10px] sm:text-xs font-semibold whitespace-nowrap transition-colors shrink-0'
        if (item.type === 'top') {
          return (
            <a key={item.label} href="/" onClick={handleTop} className={`${commonClass} text-accent hover:bg-white/5`}>
              {item.label}
            </a>
          )
        }
        return (
          <a key={item.label} href={`#${item.id}`} onClick={handleAnchor(item.id)} className={`${commonClass} text-muted hover:text-ink hover:bg-white/5`}>
            {item.label}
          </a>
        )
      })}
    </nav>
  )
}
