// Runs automatically after `npm run build` (see package.json "postbuild").
// Reads the same content/ files the site itself reads, so the sitemap is
// always in sync with whatever projects/posts actually exist -- no manual
// upkeep needed as you add things via /admin.

import fs from 'fs'
import path from 'path'

const SITE_URL = 'https://bhadmus.vercel.app'
const root = process.cwd()

function readJsonDir(dir) {
  const full = path.join(root, dir)
  if (!fs.existsSync(full)) return []
  return fs
    .readdirSync(full)
    .filter((f) => f.endsWith('.json'))
    .map((f) => {
      const data = JSON.parse(fs.readFileSync(path.join(full, f), 'utf-8'))
      return { slug: f.replace('.json', ''), ...data }
    })
}

const projects = readJsonDir('content/projects')
const posts = readJsonDir('content/blog')

const staticUrls = [
  { loc: '/', priority: '1.0' },
]

const projectUrls = projects.map((p) => ({
  loc: `/projects/${p.slug}`,
  priority: '0.7',
}))

const postUrls = posts.map((p) => ({
  loc: `/blog/${p.slug}`,
  priority: '0.6',
  lastmod: p.date ? new Date(p.date).toISOString().split('T')[0] : undefined,
}))

const allUrls = [...staticUrls, ...projectUrls, ...postUrls]

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls
  .map(
    (u) => `  <url>
    <loc>${SITE_URL}${u.loc}</loc>
    ${u.lastmod ? `<lastmod>${u.lastmod}</lastmod>` : ''}
    <priority>${u.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>
`

const distDir = path.join(root, 'dist')
if (!fs.existsSync(distDir)) fs.mkdirSync(distDir, { recursive: true })
fs.writeFileSync(path.join(distDir, 'sitemap.xml'), xml)
console.log(`sitemap.xml generated with ${allUrls.length} URLs`)
