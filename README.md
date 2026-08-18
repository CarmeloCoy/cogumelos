# Carolina & Carmelo — Product & Engineering Studio

Static, multilingual site prepared for GitHub Pages. Source HTML is compiled
into language-specific pages in the deployable `dist/` directory at build time.

## Local development

Install dependencies with `npm install`, then run `npm run dev`. The static
development server serves the home page at `http://localhost:4200` and reloads
the browser when source files change. `how-we-work.html` is available at
`/how-we-work.html`.

Use `npm run build` to generate the production site in `dist/`.

## Structure

- `index.html` — studio home and service-overview template
- `how-we-work.html` — worked-example template showing how product and engineering decisions are connected
- `assets/css/styles.css` — shared visual system and responsive home styles
- `assets/css/case-study.css` — styles scoped to the worked-example page
- `assets/js/app.js` — home language switcher, theme, service tabs, profile dialogs and animations
- `assets/js/case-study.js` — worked-example translations, theme, navigation and reveal behaviour
- `locales/en.json` — English content
- `locales/es.json` — Spanish content
- `locales/pt.json` — Portuguese content
- `scripts/build.js` — dependency-free build and template renderer
- `scripts/extract-texts.js` — synchronizes template text with locale files
- `assets/images/` — profile photos, favicon and social preview
- `assets/images/case-study/` — repository, identity-system and social-preview evidence for the worked example

## Languages

The site is available in English, Spanish and Portuguese. These are not only
localised versions of the interface: they represent the languages in which
Carolina and Carmelo are comfortable working with clients and partner teams.

The language selector links to the matching generated page. English is
published at the root, Spanish at `es/`, and Portuguese at `pt/`.

## Build

Run `npm run build` to generate the deployable site in `dist/`. The build:

1. Validates the independent locale JSON files.
2. Renders localized HTML for English, Spanish, and Portuguese, including
   language-specific metadata and interactive content.
3. Copies static assets to `dist/assets/`.

The generated page structure is:

```text
dist/
  index.html
  how-we-work.html
  es/index.html
  es/how-we-work.html
  pt/index.html
  pt/how-we-work.html
```

Deploy the contents of `dist/`; do not publish the source files directly.

## Translation inventory

Run `npm run extract:texts` after changing page-template copy. It writes
`locales/source-texts.json`, an inventory of visible text and translatable
`alt`, `aria-label`, and `title` attributes. It also adds or updates English
source values in the structured locale files. New Spanish and Portuguese
entries use the English source as a fallback; existing translations are
preserved.

Add `data-i18n-ignore` to an element whose text or supported translation
attributes should remain out of the extraction inventory and locale files.

Run `npm run clean:translations` to remove stale entries from the
template-derived translation maps after deleting or changing template copy. It
does not alter structured locale content such as service, profile, or metadata
translations.

## Navigation

- The home navigation and delivery section link to `how-we-work.html`.
- The worked example links back to the home and to `index.html#contact`.
- The current contact CTA is `Discuss a project`.
- The CTA can later be replaced with the shared Google Calendar booking URL.

## Publish on GitHub Pages

1. Run `npm run build`.
2. Upload the **contents** of `dist/` to the repository root.
3. In **Settings → Pages**, choose **Deploy from a branch**.
4. Select `main` and `/ (root)`.
5. Save and wait for GitHub Pages to deploy.

## Optional metadata update

After the final domain is known, add absolute `canonical`, `og:url` and
absolute `og:image` values to both HTML pages.


## Service model refinement

The home now presents three problem-led engagements:

1. Product Definition Sprint
2. Product Foundation
3. Product Rescue & Modernisation

Temporary team integration and advisory support are described separately as collaboration formats, rather than as a fourth service. Spanish and Portuguese copy has been rewritten for natural local usage rather than translated literally.


## Latest case-study refinement

`how-we-work.html` now includes an explicit scope-decision section showing what
was deliberately left outside the current phase:

- Final studio brand and name.
- Custom domain and branded email.
- Full brand rollout and broader launch assets.
- Additional public proof that cannot yet be shown without permission.

The section is available in English, Spanish and Portuguese and frames these
items as conscious prioritisation rather than unfinished work.
