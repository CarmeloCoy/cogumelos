# Carolina & Carmelo — Product & Engineering Studio

Static, multilingual site prepared for GitHub Pages.

## Structure

- `index.html` — studio home and service overview
- `how-we-work.html` — worked example showing how product and engineering decisions are connected
- `assets/css/styles.css` — shared visual system and responsive home styles
- `assets/css/case-study.css` — styles scoped to the worked-example page
- `assets/js/app.js` — home language switcher, theme, service tabs, profile dialogs and animations
- `assets/js/case-study.js` — worked-example translations, theme, navigation and reveal behaviour
- `assets/images/` — profile photos, favicon and social preview
- `assets/images/case-study/` — repository, identity-system and social-preview evidence for the worked example

## Languages

The site is available in English, Spanish and Portuguese. These are not only
localised versions of the interface: they represent the languages in which
Carolina and Carmelo are comfortable working with clients and partner teams.

The language preference is shared between `index.html` and
`how-we-work.html` through local storage.

## Navigation

- The home navigation and delivery section link to `how-we-work.html`.
- The worked example links back to the home and to `index.html#contact`.
- The current contact CTA is `Discuss a project`.
- The CTA can later be replaced with the shared Google Calendar booking URL.

## Publish on GitHub Pages

1. Upload the **contents** of this folder to the repository root.
2. In **Settings → Pages**, choose **Deploy from a branch**.
3. Select `main` and `/ (root)`.
4. Save and wait for GitHub Pages to deploy.

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
