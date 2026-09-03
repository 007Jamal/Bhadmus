import { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { marked } from 'marked'
import { posts } from '../content.js'
import { setPageMeta } from '../seo.js'

export default function BlogPost() {
  const { slug } = useParams()
  const post = posts.find((p) => p.slug === slug)

  useEffect(() => {
    if (post) {
      setPageMeta({
        title: `${post.title} | Bhadmus Ibrahim`,
        description: post.excerpt || post.title,
        path: `/blog/${post.slug}`,
        image: post.cover || undefined,
        type: 'article',
      })
    } else {
      setPageMeta({ title: 'Post not found | Bhadmus Ibrahim', description: 'This post could not be found.' })
    }
  }, [post])

  if (!post) {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 pt-16">
        <p className="text-muted">Post not found.</p>
        <Link to="/#blog" className="text-accent">Back to blog</Link>
      </div>
    )
  }

  const html = marked.parse(post.body || '')

  return (
    <div className="max-w-2xl md:max-w-3xl mx-auto px-4 sm:px-6 pt-16 pb-20">
      <nav className="flex items-center gap-2 text-xs text-muted mb-6" aria-label="Breadcrumb">
        <Link to="/" className="hover:text-ink transition-colors">Home</Link>
        <span>/</span>
        <Link to="/#blog" className="hover:text-ink transition-colors">Blog</Link>
        <span>/</span>
        <span className="text-ink/70 truncate">{post.title}</span>
      </nav>

      <Link to="/#blog" className="inline-flex items-center gap-2 text-muted hover:text-ink mb-8 text-sm">
        <ArrowLeft size={16} /> Back to blog
      </Link>

      <p className="text-muted text-xs mb-2">
        {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
      </p>
      <h1 className="font-display text-3xl sm:text-4xl md:text-5xl mb-6 break-words">{post.title}</h1>

      {post.cover && (
        <div className="w-full aspect-video bg-panel rounded-2xl border border-white/5 overflow-hidden mb-8">
          <img src={post.cover} alt={post.title} loading="lazy" className="w-full h-full object-cover" />
        </div>
      )}

      {post.tags && post.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-8">
          {post.tags.map((t) => (
            <span key={t} className="text-xs bg-white/5 px-3 py-1 rounded-full text-muted">{t}</span>
          ))}
        </div>
      )}

      <div
        className="prose-blog text-ink/90 leading-relaxed"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  )
}
