# VIOT Research

Personal research site for Shantanu Pawar — propulsion research (VIOT: Virtual Ion-Optics
Testbed) plus a portfolio of other engineering/software projects. Astro, hand-written CSS
(no framework), GSAP for scroll animation.

## Development

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Structure

```
data/
  projects.json   # portfolio entries (Projects page) — each has a `published` flag
  profile.json    # public contact info (email, GitHub, LinkedIn, Scholar, CV)
src/
  layouts/BaseLayout.astro
  pages/
    index.astro       # VIOT overview
    methods.astro      # VIOT methodology
    data.astro         # VIOT results
    about.astro         # People / contact
    projects.astro       # Portfolio grid, reads data/projects.json
    admin.astro           # Private admin panel (not linked in nav)
  styles/global.css
```

## Adding or editing a project

Go to `/admin/` on the deployed site (it isn't linked from the nav — bookmark it). You'll need
a GitHub [Personal Access Token](https://github.com/settings/tokens) scoped to **Contents:
Read and write** on this repo (a fine-grained token limited to this repo is best). Paste it
in and click Connect.

- The token is kept only in that browser tab's `sessionStorage` — it's never sent anywhere
  except `api.github.com`, and it's gone as soon as you close the tab.
- Every Save/Publish/Unpublish/Delete action commits directly to `data/projects.json` (or
  `data/profile.json` for contact info) on `main` via GitHub's Contents API.
- A project with `published: false` is a draft: it's committed to the repo (so it's technically
  visible in repo history to anyone, like any public-repo commit) but is filtered out of the
  public `/projects/` page until you flip it to published.
- Nobody else can write through this page even if they find the URL — without a valid token
  with push access to this repo, every write request GitHub's API receives simply fails.

To add/edit a project by hand instead, just edit `data/projects.json` directly and push.

## Deployment

Every push to `main` triggers `.github/workflows/deploy.yml`, which runs `npm run build` and
publishes `dist/` to GitHub Pages via `actions/deploy-pages`. No manual steps — commits from
the admin panel trigger the same workflow and redeploy automatically within a couple of
minutes.

`astro.config.mjs` sets `site`/`base` for this repo's GitHub Pages project-page URL
(`https://chiku149.github.io/aerocore/`). If the repo is ever renamed, update `base` to match.
