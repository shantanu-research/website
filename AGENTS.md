## Website — personal portfolio/research site

Astro 7 + React 19 islands + Tailwind CSS 4, animated with animejs + GSAP. Pages: index, about, research, writing (`src/pages/`, `src/pages/projects/`).

## Layout
- `src/components/` — animated islands (CountUp, Reveal, ShatterText, PipelineScrub, NavScroller, AEROCORE-Design)
- `src/layouts/`, `src/lib/`, `src/styles/`
- `data/profile.json`, `data/projects.json` — content driving the site; prefer editing these over hardcoding content in components
- `public/` — static assets

## Commands
```bash
npm install
npm run dev       # astro dev
npm run build      # astro build
npm run preview    # astro preview
```
When starting the dev server for a long-running session, prefer `astro dev --background` and manage it with `astro dev stop` / `astro dev status` / `astro dev logs` rather than a foreground process.

## Conventions
- New animated components go in `src/components/`, following the existing naming style (PascalCase, one effect per component — see CountUp/Reveal/ShatterText for the pattern).
- Content edits (profile info, project listings) belong in `data/*.json`, not scattered across page components.
