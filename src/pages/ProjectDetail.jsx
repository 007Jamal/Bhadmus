import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Github, ExternalLink } from 'lucide-react'
import { projects } from '../content.js'
import { setPageMeta } from '../seo.js'

export default function ProjectDetail() {
  const { slug } = useParams()
  const project = projects.find((p) => p.slug === slug)
  const hasImages = project && project.images && project.images.length > 0
  const [active, setActive] = useState(0)

  useEffect(() => {
    if (project) {
      setPageMeta({
        title: `${project.name} | Bhadmus Ibrahim`,
        description: project.tagline || project.description?.slice(0, 155),
        path: `/projects/${project.slug}`,
        image: project.images?.[0],
        type: 'article',
      })
    } else {
      setPageMeta({ title: 'Project not found | Bhadmus Ibrahim', description: 'This project could not be found.' })
    }
  }, [project])

  if (!project) {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 pt-16">
        <p className="text-muted">Project not found.</p>
        <Link to="/#projects" className="text-accent">Back to projects</Link>
      </div>
    )
  }

  return (
    <div className="max-w-2xl md:max-w-3xl mx-auto px-4 sm:px-6 pt-16 pb-20">
      <nav className="flex items-center gap-2 text-xs text-muted mb-6" aria-label="Breadcrumb">
        <Link to="/" className="hover:text-ink transition-colors">Home</Link>
        <span>/</span>
        <Link to="/#projects" className="hover:text-ink transition-colors">Projects</Link>
        <span>/</span>
        <span className="text-ink/70 truncate">{project.name}</span>
      </nav>

      <Link to="/#projects" className="inline-flex items-center gap-2 text-muted hover:text-ink mb-8 text-sm">
        <ArrowLeft size={16} /> Back to projects
      </Link>

      <span className="text-xs bg-accent/15 text-accent px-3 py-1 rounded-full">{project.category}</span>
      <h1 className="font-display text-3xl sm:text-4xl md:text-5xl mt-4 mb-2 break-words">{project.name}</h1>
      <p className="text-muted text-base sm:text-lg mb-8">{project.tagline}</p>

      {hasImages ? (
        <div className="mb-4">
          <div className="w-full aspect-video bg-panel rounded-2xl border border-white/5 overflow-hidden">
            <img src={project.images[active]} alt={`${project.name} screenshot ${active + 1}`} loading="lazy" className="w-full h-full object-cover object-top" />
          </div>
          {project.images.length > 1 && (
            <div className="flex gap-2 mt-3 overflow-x-auto no-scrollbar">
              {project.images.map((img, i) => (
                <button
                  key={img}
                  onClick={() => setActive(i)}
                  className={`shrink-0 w-20 aspect-video rounded-lg overflow-hidden border-2 transition-colors ${
                    active === i ? 'border-accent' : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt={`${project.name} thumbnail ${i + 1}`} loading="lazy" className="w-full h-full object-cover object-top" />
                </button>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="w-full aspect-video bg-panel rounded-2xl border border-white/5 flex items-center justify-center mb-8">
          <span className="text-muted text-sm">Screenshot coming soon</span>
        </div>
      )}

      <p className="text-ink/90 leading-relaxed mb-8 mt-6">{project.description}</p>

      <div className="flex flex-wrap gap-2 mb-8">
        {project.tech.map((t) => (
          <span key={t} className="text-xs bg-white/5 px-3 py-1 rounded-full text-muted">{t}</span>
        ))}
      </div>

      <div className="flex flex-wrap gap-3">
        {project.github && (
          <a href={project.github} target="_blank" rel="noreferrer" className="flex items-center gap-2 bg-panel border border-white/5 px-5 py-3 rounded-xl text-sm hover:border-accent/30 transition-colors">
            <Github size={16} /> View Code
          </a>
        )}
        {project.link && (
          <a href={project.link} target="_blank" rel="noreferrer" className="flex items-center gap-2 bg-accent text-black px-5 py-3 rounded-xl text-sm font-medium">
            <ExternalLink size={16} /> Live Site
          </a>
        )}
        {!project.github && !project.link && (
          <span className="text-muted text-sm">Live link coming soon</span>
        )}
      </div>
    </div>
  )
}
