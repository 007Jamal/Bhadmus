# Bhadmus Ibrahim — Portfolio

React + Vite + Tailwind portfolio site, with a git-based CMS (Decap CMS) for
editing every section (profile, stats, education, certifications, experience,
community, projects, blog, contact links) without touching code.

> Repo name: this project expects to live at `github.com/007Jamal/Bhadmus`
> (see `public/admin/config.yml` → `backend.repo`). If you name the GitHub
> repo something else, update that one line to match.

## Local development

```bash
npm install
npm run dev
```

## Deploy

Push to GitHub, then connect the repo in Vercel (vercel.com → Add New →
Project → Import your GitHub repo). Vite is auto-detected. Every push to
`main` auto-deploys.

## One-time setup: turning on the CMS (`/admin`)

**1. Create a GitHub OAuth App**
- github.com/settings/developers → OAuth Apps → New OAuth App
- Homepage URL: `https://bhadmus-ibrahim-portfolio.vercel.app`
- Authorization callback URL: `https://bhadmus-ibrahim-portfolio.vercel.app/api/callback`
- Register, copy the **Client ID**, generate and copy a **Client Secret**

**2. Add those as environment variables in Vercel**
- Project → Settings → Environment Variables
- `OAUTH_CLIENT_ID` = the client ID
- `OAUTH_CLIENT_SECRET` = the client secret
- Redeploy once so the env vars take effect

**3. Use it**
- Visit `/admin` on your live site, log in with GitHub
- Every section of the site — Profile, Stats, Focus Areas, Skills, Education,
  Certifications, Experience, Community, Projects, Blog, Settings — is a
  collection you can add to, edit, or delete from, including tags on
  Experience and Blog entries
- Screenshots: open a Project → Screenshots → Add image → pick from camera
  roll → repeat for as many as you want → Save

## Turning on the Contact form

The Contact section is a real form (Name, Email, Budget, Message), not just
link tiles. It can notify you two ways — set up either or both:

**Email (recommended, does the heavy lifting):**
1. Go to formspree.io, sign up free, create a new form
2. Copy the ID from your form's endpoint (`https://formspree.io/f/THIS_PART`)
3. In `/admin` → Settings → Contact & Social Links → paste it into
   **Formspree Form ID** → Save

Until that's set, submitting the form just opens the visitor's email app
pre-filled with their message instead — it still works, just less seamless.

**WhatsApp (optional bonus, free but unofficial):**
Uses a community tool called CallMeBot to ping your own WhatsApp. Not an
official WhatsApp feature, so treat it as a nice-to-have, not guaranteed —
email is the reliable channel.
1. Save `+34 644 59 71 67` as a contact on your phone
2. WhatsApp it: `I allow callmebot to send me messages`
3. It replies with an API key
4. In Vercel → Settings → Environment Variables, add:
   - `WHATSAPP_PHONE` = your number with country code, digits only (e.g. `2348060849929`)
   - `CALLMEBOT_APIKEY` = the key it sent you
5. Redeploy

If these two env vars aren't set, the WhatsApp ping just silently does
nothing — it never breaks the form.

## Animations

Framer Motion is installed and a reusable `<Reveal>` wrapper
(`src/components/Reveal.jsx`) is already applied to the hero, focus cards,
project cards, and section headings — a subtle fade + slide up as things
scroll into view.

To add more, or replace this with your own animation code: paste it directly
into the relevant component, or extend `Reveal.jsx`. Framer Motion's
`motion.div` + `whileInView` / `whileHover` / `whileTap` props are the usual
building blocks.

## 404 handling

Any URL that doesn't match a real route (typo, unpublished project slug,
etc.) shows a custom 404 page (`src/pages/NotFound.jsx`) instead of a blank
screen or Vercel's generic error. `vercel.json` includes the rewrite rule
this needs to work correctly on direct links, not just in-app navigation.

## No database

This site has no database. Every piece of content — projects, blog posts,
experience, skills, contact info — is a JSON file living in this repo under
`content/`. Editing through `/admin` just commits a change to those files on
GitHub, which triggers a normal Vercel rebuild. Nothing to host, nothing to
pay for beyond Vercel's free tier.


## How content is structured

Every section loads from JSON files in `content/`, read automatically by
`src/content.js`. Adding, editing, or deleting a file (via `/admin` or
directly on GitHub) is all that's needed — no code changes:

- `content/site/profile.json` — name, location, headline, bio
- `content/site/stats.json` — the three stat numbers
- `content/site/focus-areas.json` — the two focus cards
- `content/site/skills.json` — stack/tools by category
- `content/education/*.json` — one file per degree
- `content/certifications/*.json` — one file per certification
- `content/experience/*.json` — one file per job, includes `tags`
- `content/community/*.json` — teaching/community entries
- `content/projects/*.json` — one file per project, includes `images`
- `content/blog/*.json` — one file per post, includes `tags`, Markdown body
- `content/settings/social.json` — contact links + Formspree ID

## Still outstanding

- **Digital Age Consults dates** — `content/experience/digital-age-consults.json`
  has `"period": "ADD DATES HERE"` as a placeholder. Update via `/admin` or
  directly in the file once you confirm the exact start/end dates.
- No live/GitHub link yet for: Phishaman, Meridian Solutions, Grimoire
- No screenshots yet for: Loan Management Software, Receipt Maker, Grimoire
- No blog posts yet — first one can be added via `/admin` any time
- Formspree ID not set yet — contact form falls back to mailto until it is
