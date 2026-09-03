// Everything on this site is loaded from JSON files in /content at build time.
// Add, edit, or delete a file (via /admin or directly on GitHub) and it shows
// up automatically on the next deploy. No code changes needed for content.

function slugFromPath(path) {
  return path.split('/').pop().replace('.json', '')
}

function loadSingle(glob) {
  const entry = Object.values(glob)[0]
  return (entry && (entry.default || entry)) || {}
}

function loadMany(glob) {
  return Object.entries(glob).map(([path, mod]) => ({
    slug: slugFromPath(path),
    ...(mod.default || mod),
  }))
}

const profileGlob = import.meta.glob('../content/site/profile.json', { eager: true })
const statsGlob = import.meta.glob('../content/site/stats.json', { eager: true })
const focusGlob = import.meta.glob('../content/site/focus-areas.json', { eager: true })
const skillsGlob = import.meta.glob('../content/site/skills.json', { eager: true })
const eduGlob = import.meta.glob('../content/education/*.json', { eager: true })
const certGlob = import.meta.glob('../content/certifications/*.json', { eager: true })
const expGlob = import.meta.glob('../content/experience/*.json', { eager: true })
const communityGlob = import.meta.glob('../content/community/*.json', { eager: true })
const projectGlob = import.meta.glob('../content/projects/*.json', { eager: true })
const blogGlob = import.meta.glob('../content/blog/*.json', { eager: true })
const socialGlob = import.meta.glob('../content/settings/social.json', { eager: true })

export const profile = loadSingle(profileGlob)
export const stats = loadSingle(statsGlob).items || []
export const focusAreas = loadSingle(focusGlob).items || []
export const skills = loadSingle(skillsGlob)

export const education = loadMany(eduGlob)
export const certifications = loadMany(certGlob)

export const experience = loadMany(expGlob).sort(
  (a, b) => new Date(b.startDate || 0) - new Date(a.startDate || 0)
)

export const community = loadMany(communityGlob)

export const projects = loadMany(projectGlob).map((p) => ({
  images: [],
  tech: [],
  link: '',
  github: '',
  ...p,
}))

export const posts = loadMany(blogGlob)
  .map((p) => ({ tags: [], ...p }))
  .sort((a, b) => new Date(b.date) - new Date(a.date))

export const social = loadSingle(socialGlob)

export const projectCategories = ['All', 'Security', 'Full Stack', 'Backend', 'AI']
