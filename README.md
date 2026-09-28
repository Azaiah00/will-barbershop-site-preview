# Will Barbershop — website

Spec website for **Will Barbershop**, a Dominican barbershop at 904 W Leigh St, Richmond, VA 23220 (near VCU).
Designed and built by Couture House Co. as a finished, launch-ready concept: bilingual (English at the root,
full Spanish mirror in `/es/` with `hreflang`), static HTML/CSS/vanilla JS, no build step.

## Pages
| English | Spanish | Purpose |
|---|---|---|
| `index.html` | `es/index.html` | Home: hero, trust strip, menu teaser, about, cut gallery, house calls, reviews, quick facts, FAQ |
| `services.html` | `es/services.html` | Full Booksy menu grouped: Cuts, Beard & Shave, Kids, Color & Designs, House Calls |
| `gallery.html` | `es/gallery.html` | Filterable gallery (Fades, Beards, Curly/Textured, Color & Designs, The shop) with lightbox |
| `visit.html` | `es/visit.html` | Hours, directions, walk-in policy, parking, amenities, now-hiring section |
| `404.html` | — | Bilingual not-found page (root-absolute paths) |

Also: `robots.txt`, `sitemap.xml` (with hreflang alternates), `llms.txt` (AI answer-engine fact sheet),
`site.webmanifest`, `netlify.toml` (security + cache headers, 404), `LAUNCH-NOTES.md`.

## Structure
```
assets/css/fonts.css   self-hosted @font-face (Anton, Playfair Display italic, Inter variable — Fontsource, OFL)
assets/css/site.css    the single site stylesheet
assets/js/site.js      menu, barber-pole progress bar, hex-ceiling glow, razor/blur reveals, gallery filter + lightbox
assets/fonts/          woff2 files (latin subset)
assets/img/            optimized .webp photos (+ -800 versions), og.jpg, favicons, PWA icons
```

## Preview locally
Double-click `index.html`, or (recommended, so fonts and absolute 404 paths work):
```
cd will-barbershop
python3 -m http.server 8080
# open http://localhost:8080
```

## Deploy on Netlify
1. Drag the `will-barbershop` folder onto https://app.netlify.com/drop, or connect a Git repo (publish directory `.`, no build command).
2. Add the custom domain **willbarbershoprva.com** in Site settings → Domain management and enable HTTPS.
3. `netlify.toml` applies security headers (CSP with a hash for the one inline script), long-cache for `/assets/*`, and the custom 404.
4. After launch: submit `https://willbarbershoprva.com/sitemap.xml` in Google Search Console and link the site from Google Business Profile, Booksy and Instagram bio.

If you ever edit the one-line inline script in the `<head>` (`document.documentElement.classList.add('js')`),
update its `sha256-` hash in `netlify.toml`'s CSP.

## Domain
Proposed: **willbarbershoprva.com** (register before launch; all canonical, Open Graph and sitemap URLs already use it).
