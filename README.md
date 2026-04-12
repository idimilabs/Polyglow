<div align="center">

# Astrology i18n

**A multilingual Astro 6 theme for editorial blogs and content-first publishing**

[![Astro](https://img.shields.io/badge/Astro-6-BC52EE?logo=astro)](https://astro.build)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Node](https://img.shields.io/badge/Node-%E2%89%A5%2020-339933?logo=node.js)](https://nodejs.org)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Demo](https://img.shields.io/badge/Live_Demo-astrology.idimi.com-0f172a)](https://astrology.idimi.com)

A polished, responsive Astro theme for multilingual blogs, magazines, editorial websites, and personal publishing. It ships with locale-aware routing, typed content collections, SEO-ready defaults, optimized images, and a clean reading experience out of the box.

<a href="https://pagespeed.web.dev/analysis/https-astrology-yo7bu6q1-edgeone-app/nij513nbyr?form_factor=mobile">
  <img src="public/astrology-i18n-lighthouse-score.svg" alt="Lighthouse Score" width="300" />
</a>

</div>

## Contents

- [Theme Submission Copy](#theme-submission-copy)
- [Why This Theme Fits Astro Themes](#why-this-theme-fits-astro-themes)
- [Highlights](#highlights)
- [Demo](#demo)
- [Quick Start](#quick-start)
- [Project Structure](#project-structure)
- [Customization](#customization)
- [Internationalization](#internationalization)
- [Content Authoring](#content-authoring)
- [Configuration](#configuration)
- [Scripts](#scripts)
- [Contributing](#contributing)
- [License](#license)

## Theme Submission Copy

Use the following text when submitting the theme to the Astro Themes portal.

### Short description

`A multilingual Astro 6 blog theme with locale-aware routing, SEO defaults, Pagefind search, and optimized images for content-first publishing.`

### Full description

`Astrology i18n is a multilingual Astro 6 theme built for blogs, editorial websites, and personal publishing. It includes locale-aware routes, centralized translation dictionaries, typed content collections, SEO metadata, RSS, sitemap support, responsive image handling, and Pagefind-powered search. The theme is designed to give creators a clean reading experience out of the box while keeping the codebase easy to customize, extend, and deploy. It is a strong starting point for teams or individuals who want a fast static site with multiple languages and modern Astro conventions.`

## Why This Theme Fits Astro Themes

- Built with the latest Astro major release: `astro@^6.1.1`
- Source code is intended for a public GitHub repository
- All dependencies in `package.json` are public NPM packages
- Includes setup instructions, structure overview, and customization guidance
- Provides a demo site and preview image for submission assets

Note: Astro 6 was announced on March 10, 2026. This project currently targets Astro 6.

## Highlights

- **Multilingual by design**: language-prefixed routes, centralized dictionaries, and fallback-friendly localization.
- **Content collections**: typed frontmatter for posts, pages, and authors.
- **SEO ready**: canonical URLs, Open Graph tags, sitemap, and RSS feeds.
- **Fast by default**: optimized images, prefetching, minimal client-side JavaScript, and Pagefind search.
- **Modern stack**: Astro 6, Tailwind CSS 4, MDX, Partytown, and static deployment support.
- **Editorial layout**: built for long-form reading, featured media, and clear content hierarchy.

## Demo

- Live site: <https://astrology.idimi.com>
- Preview image for theme submission: `public/screenshot.webp`

## Quick Start

### Requirements

- Node.js 20 or newer
- pnpm 10 or newer

### Install

```bash
git clone https://github.com/idimilabs/Astrology-i18n.git
cd Astrology-i18n
pnpm install
```

### Run locally

```bash
pnpm dev
```

Open [http://localhost:4321](http://localhost:4321) in your browser.

### Build and preview

```bash
pnpm build
pnpm preview
```

`pnpm build` outputs the static site to `dist/`.

## Project Structure

```text
.
├── public/                 # Static assets
├── src/
│   ├── assets/             # Optimized images and media
│   ├── components/         # Reusable UI pieces
│   ├── content/            # Posts, pages, and authors
│   ├── i18n/               # Translation dictionaries
│   ├── layouts/            # Page layouts
│   ├── pages/              # Route definitions
│   ├── styles/             # Global styles
│   ├── utils/              # Helpers and shared logic
│   └── content.config.ts   # Content collections schema
├── astro.config.mjs        # Astro configuration
└── package.json            # Scripts and dependencies
```

## Customization

You can adapt the theme for a personal blog, magazine, documentation-style site, or branded editorial publication.

Common changes:

- Update `astro.config.mjs` with your site URL and integration settings
- Replace assets in `public/` and `src/assets/`
- Edit dictionaries in `src/i18n/`
- Add or remove locales in `src/utils/i18n.ts`
- Replace sample content in `src/content/`
- Adjust layout and typography in `src/components/`, `src/layouts/`, and `src/styles/global.css`

## Internationalization

The theme currently supports 10 locales:

`zh`, `en`, `fr`, `es`, `ru`, `ja`, `ko`, `pt`, `de`, `id`

`en` is the default locale.

### Add a new language

1. Add the locale code to `src/utils/i18n.ts`.
2. Update `src/content.config.ts` if the content schema needs to recognize the locale.
3. Create a matching dictionary in `src/i18n/<lang>.json`.
4. Add localized content under `src/content/`.
5. Adjust `astro.config.mjs` if sitemap or routing changes are needed.

### Routing behavior

Locale-aware pages live under `src/pages/[lang]/`. This keeps URLs consistent for multilingual publishing and gives you explicit control over route generation.

## Content Authoring

Posts live in `src/content/posts/[lang]/`. Pages and author profiles follow the same collection-driven pattern.

Example frontmatter:

```yaml
---
title: "The Art of Star Gazing"
description: "A guide to observing the night sky."
pubDate: 2024-03-21
category: "Astronomy"
tags: ["Stars", "Night"]
author: "Astro Learner"
heroImage: "../assets/stars.jpg"
locales: "en"
---
```

Recommended practices:

- Keep titles concise and descriptive
- Use `description` for search and social previews
- Add `heroImage` for posts that benefit from a strong visual lead
- Keep category and tag naming consistent across locales

## Configuration

### GitHub activity calendar

The author page can show a contribution calendar.

```env
GITHUB_TOKEN=your_personal_access_token
```

- Set `GITHUB_TOKEN` locally for development
- Add it to your deployment environment if you want live GitHub activity data in production
- Without the token, the site falls back gracefully

### Analytics

The project includes Partytown support for performance-friendly analytics. Configure your GTM or analytics IDs in `src/components/analytics/`.

### Search

Search is powered by Pagefind and is generated automatically during `pnpm build`.

### Deployment

The project outputs a static site and can be deployed to any static host. A Wrangler deployment script is included:

```bash
pnpm run deploy
```

## Scripts

```bash
pnpm dev
pnpm build
pnpm preview
pnpm check
pnpm format
pnpm deploy
```

## Contributing

Contributions are welcome.

1. Fork the repository.
2. Create a branch for your change.
3. Commit with a clear message.
4. Open a pull request.

## License

MIT. See [LICENSE](LICENSE) for details.

---

<div align="center">
  <p>Built by <a href="https://idimi.com">iDiMi</a></p>
</div>
