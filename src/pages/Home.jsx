import { useEffect, useState, useMemo } from 'react'
import { useLocation, useNavigate, Link } from 'react-router-dom'
import { Github, Linkedin, Mail, GraduationCap, Award, MapPin, BookOpen, ArrowUpRight, Newspaper } from 'lucide-react'
import {
  profile, stats, focusAreas, skills, education, certifications,
  experience, community, projects, posts, social, projectCategories,
} from '../content.js'
import ContactForm from '../components/ContactForm.jsx'
import Reveal from '../components/Reveal.jsx'
import DepthText from '../components/DepthText.jsx'
import DriftWall from '../components/DriftWall.jsx'
import AnimatedList from '../components/AnimatedList.jsx'
import BorderGlow from '../components/BorderGlow.jsx'

export default function Home() {
  const location = useLocation()
  const navigate = useNavigate()
  const [activeCategory, setActiveCategory] = useState('All')

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '')
      const el = document.getElementById(id)
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 80)
      }
    }
  }, [location])

  const skillGroups = [
    { title: 'Languages', items: skills.languages },
    { title: 'Frontend', items: skills.frontend },
    { title: 'Backend', items: skills.backend },
    { title: 'Security Tools', items: skills.security },
    { title: 'Automation', items: skills.automation },
  ].filter((g) => g.items && g.items.length > 0)

  const filteredProjects = activeCategory === 'All' ? projects : projects.filter((p) => p.category === activeCategory)

  const driftItems = useMemo(
    () =>
      projects.flatMap((p) =>
        (p.images || []).map((img) => ({ image: img, title: p.name }))
      ),
    []
  )

  const scrollToProjects = (e) => {
    e.preventDefault()
    const el = document.getElementById('projects')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="w-full overflow-x-hidden">
      {/* HERO */}
      <section className="relative max-w-2xl md:max-w-4xl mx-auto px-4 sm:px-6 pt-6 sm:pt-8 md:pt-14">
        <div className="flex items-center gap-4 mb-10">
          {profile.photo && (
            <img
              src={profile.photo}
              alt={profile.name}
              className="w-14 h-14 sm:w-16 sm:h-16 rounded-full object-cover border-2 border-accent/30 shrink-0"
            />
          )}
          <div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">{profile.name}</h2>
            <p className="text-muted mt-1 text-sm sm:text-base">{profile.location}</p>
          </div>
        </div>

        <div className="mb-6 leading-[0.95]">
          <DepthText
            text={profile.headlineTop}
            layers={18}
            depth={1.6}
            faceColor="#F5F7F6"
            depthColor="#0F6B4C"
            tilt={4}
            pointerTracking
            smoothing={0.14}
            perspective={900}
            autoOrbit
            orbitSpeed={0.2}
            fontSize="clamp(1.9rem, 9.5vw, 3.4rem)"
            fontWeight={900}
            shadow
            className="font-display block"
          />
          <DepthText
            text={profile.headlineBottom}
            layers={18}
            depth={1.6}
            faceColor="#1CE783"
            depthColor="#0A3D28"
            tilt={4}
            pointerTracking
            smoothing={0.14}
            perspective={900}
            autoOrbit
            orbitSpeed={0.2}
            fontSize="clamp(1.9rem, 9.5vw, 3.4rem)"
            fontWeight={900}
            shadow
            className="font-display block"
          />
        </div>
        <p className="text-muted text-base sm:text-lg leading-relaxed mb-8 max-w-2xl">{profile.bio}</p>

        <div className="flex flex-wrap gap-3 mb-4">
          <a href="#projects" onClick={scrollToProjects} className="px-6 py-3 rounded-xl bg-accent text-black font-bold text-sm hover:opacity-90 transition-opacity">
            View My Work
          </a>
          {social.linkedin && (
            <a href={social.linkedin} target="_blank" rel="noreferrer" className="px-6 py-3 rounded-xl border-2 border-accent text-accent font-bold text-sm hover:bg-accent/10 transition-colors">
              LinkedIn
            </a>
          )}
        </div>

        <div className="flex flex-wrap gap-2 mb-14">
          <a href={social.github} target="_blank" rel="noreferrer" className="px-4 py-2 rounded-lg bg-panel border border-white/5 text-muted text-xs font-medium hover:text-ink transition-colors">GitHub</a>
          <a href={social.whatsapp} target="_blank" rel="noreferrer" className="px-4 py-2 rounded-lg bg-panel border border-white/5 text-muted text-xs font-medium hover:text-ink transition-colors">WhatsApp</a>
          <a href={`mailto:${social.email}`} className="px-4 py-2 rounded-lg bg-panel border border-white/5 text-muted text-xs font-medium hover:text-ink transition-colors">Email</a>
        </div>

        <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-14">
          {stats.map((s) => (
            <div key={s.label} className="min-w-0">
              <div className="text-3xl sm:text-4xl font-display text-ink">{s.value}</div>
              <div className="text-[10px] sm:text-xs text-muted uppercase tracking-wide mt-2">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 gap-4 mb-10">
          {focusAreas.map((f, i) => (
            <Reveal key={f.title} delay={i * 0.08}>
              <BorderGlow
                backgroundColor="#121613"
                borderRadius={16}
                glowColor="152 78 51"
                glowRadius={30}
                glowIntensity={0.9}
                coneSpread={30}
                colors={['#1CE783', '#0F6B4C', '#0A3D28', '#1CE783']}
                animationDuration={10}
              >
                <div className="p-6">
                  <h3 className="font-bold text-lg mb-1">{f.title}</h3>
                  <p className="text-muted text-sm">{f.desc}</p>
                </div>
              </BorderGlow>
            </Reveal>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div className="bg-panel rounded-2xl p-6 border border-white/5">
            <div className="flex items-center gap-2 text-accent text-xs font-bold uppercase tracking-wide mb-4">
              <GraduationCap size={16} /> Education
            </div>
            {education.map((ed) => (
              <div key={ed.slug} className="mb-3 last:mb-0">
                <h3 className="font-bold text-lg">{ed.school}</h3>
                <p className="text-muted text-sm mb-3">{ed.degree}</p>
                <span className="inline-block text-xs bg-white/5 px-3 py-1 rounded-full text-muted">{ed.grade} · {ed.status} {ed.year}</span>
              </div>
            ))}
          </div>

          <div className="bg-panel rounded-2xl p-6 border border-white/5">
            <div className="flex items-center gap-2 text-accent text-xs font-bold uppercase tracking-wide mb-4">
              <Award size={16} /> Certifications
            </div>
            <div className="space-y-4">
              {certifications.map((c) => (
                <div key={c.slug} className="flex items-center justify-between gap-2">
                  <div className="min-w-0">
                    <p className="font-semibold text-sm truncate">{c.name}</p>
                    <p className="text-muted text-xs">{c.provider}</p>
                  </div>
                  <span className={`text-[10px] shrink-0 px-2.5 py-1 rounded-full ${c.status === 'Completed' ? 'bg-accent/15 text-accent' : 'bg-white/5 text-muted'}`}>{c.status}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="max-w-2xl md:max-w-4xl mx-auto px-4 sm:px-6 pt-24 scroll-mt-20">
        <Reveal><h1 className="font-display text-4xl sm:text-5xl md:text-6xl mb-8 break-words">PROJECTS</h1></Reveal>

        {driftItems.length > 0 && (
          <Reveal>
            <div className="mb-10 rounded-2xl overflow-hidden border border-white/5" style={{ height: 200 }}>
              <DriftWall
                items={driftItems}
                columns={4}
                tileWidth={150}
                tileHeight={95}
                gap={12}
                tilt={10}
                turn={-8}
                perspective={1000}
                depth={70}
                speed={22}
                direction="up"
                variance={0.4}
                parallax={0.35}
                lift={36}
                fade={0.55}
                dim={0.65}
                overlayColor="#0A0C0B"
              />
            </div>
          </Reveal>
        )}

        <div className="flex flex-wrap gap-2 mb-10">
          {projectCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-colors ${
                activeCategory === cat ? 'bg-accent text-black' : 'bg-panel text-muted hover:text-ink'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          {filteredProjects.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.06}>
              <Link to={`/projects/${p.slug}`} className="block bg-panel rounded-2xl overflow-hidden border border-white/5 hover:border-accent/30 hover:-translate-y-0.5 transition-all">
                {p.images && p.images.length > 0 ? (
                  <div className="w-full aspect-video bg-black/30">
                    <img src={p.images[0]} alt={p.name} className="w-full h-full object-cover object-top" />
                  </div>
                ) : (
                  <div className="w-full aspect-video bg-black/20 flex items-center justify-center">
                    <span className="text-muted text-xs">Screenshot coming soon</span>
                  </div>
                )}
                <div className="p-6">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="font-bold text-lg sm:text-xl">{p.name}</h3>
                    <ArrowUpRight size={18} className="text-muted shrink-0" />
                  </div>
                  <p className="text-muted text-sm mb-4">{p.tagline}</p>
                  <div className="flex flex-wrap gap-2">
                    {p.tech.map((t) => (
                      <span key={t} className="text-xs bg-white/5 px-3 py-1 rounded-full text-muted">{t}</span>
                    ))}
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* EXPERIENCE */}
      <section id="experience" className="max-w-2xl md:max-w-4xl mx-auto px-4 sm:px-6 pt-24 scroll-mt-20">
        <Reveal><h1 className="font-display text-4xl sm:text-5xl md:text-6xl mb-10 break-words">EXPERIENCE</h1></Reveal>

        <div className="relative pl-6 border-l-2 border-white/10 space-y-8 mb-14">
          {experience.map((e) => (
            <div key={e.slug} className="relative">
              <span className="absolute -left-[29px] top-1 w-3 h-3 rounded-full bg-accent" />
              <div className="bg-panel rounded-2xl p-6 border border-white/5">
                <h3 className="font-bold text-lg">{e.company}</h3>
                <p className="text-accent text-sm font-medium">{e.role}</p>
                {e.dept && <p className="text-muted text-xs mt-1">{e.dept}</p>}
                <div className="flex flex-wrap items-center gap-1 text-muted text-xs mt-2">
                  <MapPin size={12} /> {e.location} <span className="mx-1">·</span> {e.period}
                </div>
                <ul className="mt-4 space-y-2">
                  {e.bullets.map((b, i) => (
                    <li key={i} className="text-sm text-ink/80 flex gap-2">
                      <span className="text-accent mt-1">•</span>{b}
                    </li>
                  ))}
                </ul>
                {e.tags && e.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {e.tags.map((t) => (
                      <span key={t} className="text-xs bg-white/5 px-3 py-1 rounded-full text-muted">{t}</span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-2 text-accent text-sm font-bold uppercase tracking-wide mb-4">
          <BookOpen size={16} /> Teaching and Community
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          {community.map((t) => (
            <div key={t.slug} className="bg-panel rounded-2xl p-6 border border-white/5">
              <h3 className="font-bold text-lg">{t.title}</h3>
              <p className="text-accent text-sm">{t.org}</p>
              <p className="text-muted text-xs mt-1 mb-3">{t.period}</p>
              <p className="text-sm text-ink/80">{t.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* STACK */}
      <section id="stack" className="max-w-2xl md:max-w-4xl mx-auto px-4 sm:px-6 pt-24 scroll-mt-20">
        <Reveal><h1 className="font-display text-4xl sm:text-5xl md:text-6xl mb-10 break-words">STACK AND TOOLS</h1></Reveal>
        <div className="space-y-10">
          {skillGroups.map((g) => (
            <div key={g.title}>
              <h2 className="text-accent text-xs font-bold uppercase tracking-wide mb-4">{g.title}</h2>
              <div className="flex flex-wrap gap-3">
                {g.items.map((item) => (
                  <span key={item} className="bg-panel border border-white/5 px-4 py-2 rounded-xl text-sm">{item}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* BLOG */}
      <section id="blog" className="max-w-2xl md:max-w-4xl mx-auto px-4 sm:px-6 pt-24 scroll-mt-20">
        <Reveal><h1 className="font-display text-4xl sm:text-5xl md:text-6xl mb-10 break-words">BLOG</h1></Reveal>

        {posts.length === 0 ? (
          <div className="bg-panel rounded-2xl p-8 border border-white/5 text-center">
            <Newspaper size={28} className="text-muted mx-auto mb-3" />
            <p className="text-muted text-sm">No posts yet. New writing shows up here automatically once published.</p>
          </div>
        ) : (
          <AnimatedList
            items={posts.map((p) => p.title)}
            onItemSelect={(_, index) => navigate(`/blog/${posts[index].slug}`)}
            showGradients
            displayScrollbar={false}
            enableArrowNavigation
          />
        )}
      </section>

      {/* CONTACT */}
      <section id="contact" className="max-w-2xl md:max-w-4xl mx-auto px-4 sm:px-6 pt-24 pb-24 scroll-mt-20">
        <Reveal><h1 className="font-display leading-[0.95] mb-6 break-words text-4xl sm:text-5xl md:text-6xl">LET'S<br />CONNECT</h1></Reveal>
        <p className="text-muted text-base sm:text-lg leading-relaxed mb-8 max-w-xl">
          Open to internships, freelance work, and collaborations, especially anything at the intersection of software engineering and security.
        </p>

        <div className="flex flex-wrap gap-3 mb-10">
          <a href={`mailto:${social.email}`} className="flex items-center gap-2 bg-panel border border-white/5 rounded-xl px-4 py-3 hover:border-accent/30 transition-colors">
            <Mail size={16} className="text-accent shrink-0" />
            <span className="text-sm">{social.email}</span>
          </a>
          <div className="flex items-center gap-2 bg-panel border border-white/5 rounded-xl px-4 py-3">
            <MapPin size={16} className="text-accent shrink-0" />
            <span className="text-sm">{profile.location}</span>
          </div>
        </div>

        <ContactForm />

        <div className="flex flex-wrap gap-3 mt-10">
          <a href={social.github} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-muted hover:text-ink text-sm transition-colors">
            <Github size={16} /> GitHub
          </a>
          <span className="text-white/10">·</span>
          <a href={social.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-muted hover:text-ink text-sm transition-colors">
            <Linkedin size={16} /> LinkedIn
          </a>
        </div>
      </section>
    </div>
  )
}
