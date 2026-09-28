# Will Barbershop: Launch Notes

Everything below needs a quick yes/no from Will before launch. The site shows each item today. Nothing on it is invented; items marked **Confirm** come from public listings that disagree with each other or that could be out of date.

## 1. Facts to confirm with the owner
| # | Item | What the site says now | Source / why confirm |
|---|---|---|---|
| 1 | **Owner name and spelling** | Wilmer "Will" Montilla | Booksy staff listing says "Wilmer Montilla". Personal IG is @realwillbarber ("Will Barber EL DOMI"). Check the spelling and that he's happy to be named. |
| 2 | **Business name** | Will Barbershop (also listed as "Will Barber") | IG handle is willbarbershop___, Booksy says "Will barber", the wall sign reads "WILL BARBER". Pick one official name for Google, Booksy and the site. |
| 3 | **Hours (CONFLICT)** | Open 7 days, 9 AM to 8 PM, plus a note that Sunday hours may be shorter | IG bio: "Open Monday–Sunday, 9AM–8PM". Booksy (per the brief): Mon–Thu 9–7, Fri 8:30–8:30, Sat 8–8, Sun 11–3. Booksy also showed **Monday Sep 28, 2026 as Closed**. Get the real weekly hours, then update `openingHoursSpecification` in the JSON-LD (build script), the hours table on visit.html, the footer, the FAQ and llms.txt. |
| 4 | **Google rating** | 5.0 from 37 Google reviews (home page + `aggregateRating` in the home JSON-LD) | From the brief. Booksy showed **4.7 from 35 reviews**. The site credits the rating to Google, so confirm the Google numbers at launch and keep them current. |
| 5 | **Review quotes** | Three short Booksy reviews, first names only: Don, Euris, Donovan | Copied word for word from the public Booksy page (Euris's "Exelente" spelling kept as written). Confirm Will is OK showing them. Swap them for Google reviews if he'd rather. |
| 6 | **Service menu and prices** | Regular $40+, Cut & face steamer $50, Master $100 (1h30), After 7 PM $100+, Cut & beard $50+, Cut/beard/steamer $65, Kid $40, House cut $150 | From Booksy on 2026-09-27. Confirm nothing has changed. |
| 7 | **Color & designs pricing** | "Quote in shop" for designs/part lines and bleach/platinum | Booksy has no priced item for these, but the shop's photos show the work. Ask Will for prices or add them to Booksy. |
| 8 | **House calls** | $150, book on Booksy, address and timing confirmed at booking | Booksy "House cut $150 / 30 min". Ask about the travel area and any minimums, and add them to the copy. |
| 9 | **Amenities** | Parking space, credit cards, accessible, child-friendly, Wi-Fi, loyalty program | Booksy amenities list. Confirm each one. Booksy also lists "pets allowed", which the site leaves out. Also check whether there's a cash or Zelle option. |
| 10 | **Parking copy** | Shop parking space, otherwise nearby street parking (follow posted signs/meters) | General guidance. Confirm where the shop's space is. |
| 11 | **Spanish spoken** | "English & Spanish spoken" | Implied by "Dominican barbers" and the Spanish captions. Confirm. |
| 12 | **Now hiring** | "Now hiring barbers / Vacantes disponibles" section on visit.html and a hiring FAQ | From IG posts. Confirm he's still hiring. If not, remove the section (visit.html + es/visit.html), the FAQ line in llms.txt, and "Now hiring barbers" from the visit meta description. |
| 13 | **Quote from Will** | "Whenever you decide to come, you'll be very welcome." (and the Spanish version) | Adapted from his Booksy "about" text ("Ask for Will... Whenever you decide to come you'll be very welcome"). Confirm he's fine with the wording. |
| 14 | **Slogans** | "Change have to be made." (the house motto, kept exactly as written), "No days off", "Offering the best service", "Con la calidad que nos caracteriza", "They gotta be clean or they won't be" | His own IG captions. Kept verbatim on purpose. |
| 15 | **Neighborhood wording** | "Near VCU", "a few blocks from VCU", "Carver / Jackson Ward" | From the brief. Confirm Will is happy with the neighborhood names. |

## 2. Photo credits and licensing
- Every photo on the site comes from the business's own public Instagram (@willbarbershop___). Will must approve their use, and ideally confirm he owns them or has the clients' consent, before launch.
- Photos with big burned-in reel text were left out or cropped clean. So were photos centred on children and crowded waiting-room shots with identifiable customers.
- The platinum-cut photo from Instagram was removed because the client may be a minor. Ask Will for a color/platinum photo of an adult client (with consent) to show color work.
- Clients' faces appear in several cut photos (twists, beards, tapers). Get Will's OK that these clients agreed to be posted. Swap any he's unsure about.
- The site uses 23 images (18 in the gallery). Better originals (full-res, no Instagram compression) would sharpen the gallery a lot, so ask Will for his camera-roll files.

## 3. Items to swap or finish
- [ ] **Hours**: replace with Will's confirmed weekly schedule (see #3). Per-day hours can go straight into the visit table.
- [ ] **Google Business Profile**: add the website link, and use the Google Maps place URL for "Get directions" if he wants it pinned to his listing (it currently uses an address search).
- [ ] **Lantern** booking link (secondary) is only in JSON-LD `sameAs` and llms.txt. Keep it or drop it.
- [ ] **Email**: none is published. Add one to the footer, the JSON-LD `email` and llms.txt if Will wants it.
- [ ] **Logo**: header, footer, icons and schema use the "WILL BARBER" emblem supplied by Couture House (assets/img/will-barber-logo.png, transparent). Confirm Will approves it and ask for his original vector file for print.
- [ ] **og.jpg**: regenerate if the hero photo changes.
- [ ] Update `sitemap.xml` `<lastmod>` on launch day.

## 4. Technical notes
- There are no forms (the brief didn't ask for any). Contact runs through tel:/sms: links, Booksy, and walk-ins.
- CSP in `netlify.toml` allows exactly one inline script, by hash (`document.documentElement.classList.add('js')`). If that line changes, update the hash.
- Fonts are self-hosted (Fontsource: Anton, Playfair Display italic 400/700, Inter variable), latin subset, SIL Open Font License.
- All motion respects `prefers-reduced-motion`, and all content is visible with JavaScript off.

## 5. Proposed domain
**willbarbershoprva.com**. Register it (plus willbarber.com / willbarbershop.com if they're available and cheap). Every canonical, hreflang, Open Graph, sitemap and JSON-LD URL already uses `https://willbarbershoprva.com/`.
