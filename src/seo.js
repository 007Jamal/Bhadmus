const SITE_URL = 'https://bhadmus-ibrahim-portfolio.vercel.app'
const DEFAULT_IMAGE = `${SITE_URL}/og-default.png`

function upsertMeta(attr, key, content) {
  if (!content) return
  let tag = document.querySelector(`meta[${attr}="${key}"]`)
  if (!tag) {
    tag = document.createElement('meta')
    tag.setAttribute(attr, key)
    document.head.appendChild(tag)
  }
  tag.setAttribute('content', content)
}

function upsertCanonical(url) {
  let link = document.querySelector('link[rel="canonical"]')
  if (!link) {
    link = document.createElement('link')
    link.setAttribute('rel', 'canonical')
    document.head.appendChild(link)
  }
  link.setAttribute('href', url)
}

/**
 * Sets document title, meta description, canonical URL, and Open Graph /
 * Twitter Card tags for the current page. Call this in a useEffect on any
 * route that should have its own distinct title/description (project
 * pages, blog posts, etc). Home's defaults live in index.html.
 */
export function setPageMeta({ title, description, path = '/', image, type = 'website' }) {
  if (title) document.title = title
  const url = `${SITE_URL}${path}`
  const img = image || DEFAULT_IMAGE

  upsertMeta('name', 'description', description)
  upsertCanonical(url)

  upsertMeta('property', 'og:title', title)
  upsertMeta('property', 'og:description', description)
  upsertMeta('property', 'og:url', url)
  upsertMeta('property', 'og:type', type)
  upsertMeta('property', 'og:image', img)

  upsertMeta('name', 'twitter:card', 'summary_large_image')
  upsertMeta('name', 'twitter:title', title)
  upsertMeta('name', 'twitter:description', description)
  upsertMeta('name', 'twitter:image', img)
}
