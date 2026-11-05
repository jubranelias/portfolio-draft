# Portfolio template

The portfolio of Jubran Elias, freelance product designer, built with React, TypeScript and Vite: Home, Works and case studies, About, Noticed (a visual diary), Dihzahyners (urban art) and Say hello (contact).

The home page opens with a bold, text-led hero. See "The hero" below.

## Quick start

You need Node.js 18 or newer.

```bash
npm install
npm run dev          # local development at http://localhost:5173
npm run build        # production build in /dist
npm run preview      # serve /dist locally to check the build
```

There is also `npm run build:single`, which produces one self-contained `dist-single/index.html` with every asset inlined and hash URLs (`/#/about`). It is handy for previews or for sending someone a single file; use the normal build for your real site.

## Project structure

```
src/
  config/site.ts        Brand, copy, links, navigation, services, clients, about page, FAQs
  content/projects.ts   Portfolio projects (cards + case study pages)
  content/diary.ts      Noticed: the visual diary (photos, captions, filters)
  assets/images/        Every image, registered once in assets/images/index.ts
  styles/tokens.css     Colours, fonts, type scale, spacing, radii, motion timing
  styles/base.css       Reset, utilities, reveal and text animations
  styles/components.css Nav, buttons, footer, cards, marquee, cube, forms, accordion
  styles/sections.css   Home page sections
  styles/pages.css      About, Works, case study, Noticed, Dihzahyners, Contact, 404
  components/           Reusable building blocks (see below)
  components/hero3d/    The hero: Hero3D.tsx
  pages/                One file per route
  hooks/                Scroll progress, in-view detection, reduced motion, page meta
  lib/                  Form submission, smooth scrolling
scripts/
  generate-placeholders.mjs   Regenerates the placeholder artwork
```

Main components: `Navbar`, `Footer`, `Button`, `Logo`, `HeadingSwap` (cycling hero headline), `ClientMarquee`, `StudioIntro` (pinned scroll section), `ProjectCard` and `ProjectGrid`, `ServiceCube` (3D cube), `ScrollWords` (word-by-word highlight), `CtaBanner`, `ContactForm`, `Accordion`, `Reveal` and `SplitText` (entrance animations).

## Making it your own

### Brand, copy and links
Edit `src/config/site.ts`. It holds your name, wordmark, location, contact details, social links, navigation labels, hero headlines, client list, services, call-to-action text, the whole About page, FAQs and SEO defaults. Components read everything from here.

### Projects and articles
Add, remove or reorder entries in `src/content/projects.ts`. Each project automatically gets a card and a page at `/works/<slug>`. The "Next case" link follows the array order.

### Images
All images are imported once in `src/assets/images/index.ts`. To replace one, either overwrite the file with the same name, or add your file (for example `hisesne-cover.webp`), change its import line, and update the alt text where the image is used in `site.ts` or `content/`. Recommended sizes: project covers 2000×1500, case study covers 2400×1350, portraits 1200×1500, hero strip images about 1200px on the long side. Export as WebP or AVIF at quality 75–80.

The included images are generated SVG placeholders. Each one shows a small "Placeholder image" label so none slip into production unnoticed. Run `npm run placeholders` to regenerate them.

### Logo
Edit `src/components/Logo.tsx`. Replace the inline `<svg>` with your mark, or import an image file and render `<img src={logo} alt="" />`. The large footer and studio wordmarks use `brand.wordmark` from `site.ts`.

### Colours and fonts
Edit `src/styles/tokens.css`. The light theme is the default; the dark theme applies when a visitor's system is set to dark. To turn dark mode off, delete the `@media (prefers-color-scheme: dark)` block and the `[data-theme='dark']` block. To change fonts, install the matching Fontsource packages, swap the imports in `src/main.tsx`, and update the `--font-display` and `--font-body` tokens.

### Client logos
The marquee uses simple geometric marks from `components/ClientMark.tsx`. To use real logos, add a `logo` image field to each client in `site.ts` and render it in `ClientMarquee.tsx` instead of `<ClientMark />`.

### Call-to-action video
Set `cta.video` in `site.ts` to an `.mp4` URL (or an imported file) to use a looping muted video instead of the background image.

## The hero

The home page opens with a text-only hero in `Hero3D.tsx`: eyebrow, headline (its words rise in one by one), supporting text, two buttons, an availability badge and a scroll cue. As you scroll away the text drifts up and fades.

**Changing the words.** Edit `hero3d` in `src/config/site.ts`: eyebrow, headline, supporting text, both buttons and where they link, the availability label (set `available: false` to hide it) and the scroll label.

## Adding or removing pages and sections

To add a page, create `src/pages/MyPage.tsx`, add a `<Route>` in `src/App.tsx`, and, if it should appear in the menu, add it to `site.nav`. Use `useDocumentMeta('Title', 'Description')` at the top of the page for its browser title and meta description.

To remove a page, delete its route in `App.tsx` and its entry in `site.nav`. The footer's page list is built from `site.nav`.

To remove a home section, delete its block in `src/pages/Home.tsx`. Sections are independent, so nothing else needs changing. `CtaBanner` can be dropped onto any page.

## Integrations and environment variables

No environment variables are required.

**Forms are not connected to anything yet.** The Say hello page uses a plain "Email me" button (a mailto link) instead of a form. (The previous note about the form no longer applies:) it validated input, but with no endpoint configured they run in demo mode: nothing is sent, and the visitor sees a message saying so. To receive submissions, set `forms.contactEndpoint` in `site.ts` to any service that accepts a JSON `POST` (Formspree, Basin, Getform, or your own API). The form shows a success message only when the server returns a 2xx response, and shows an error otherwise. Test a real submission after connecting.

There is no analytics, CMS or cookie banner. Add analytics in `index.html` if you need it, and check whether your region requires a consent banner.

## Deployment

`npm run build` outputs a static site in `/dist` that works on Netlify, Vercel, Cloudflare Pages, GitHub Pages or any static host. Because routes use clean URLs (`/about`), configure your host to serve `index.html` for unknown paths:

- Netlify: add `public/_redirects` containing `/* /index.html 200`
- Vercel: add `vercel.json` with `{ "rewrites": [{ "source": "/(.*)", "destination": "/" }] }`
- Hosts without rewrite support: use `npm run build:single`, which uses hash URLs instead.

## Accessibility and motion

The site includes a skip link, visible focus rings, labelled form fields with inline errors linked through `aria-describedby`, a mobile menu that moves focus into the menu, closes on Escape and returns focus to the toggle, an accordion with proper `aria-expanded` and region roles, and a real HTML `<h1>` in the hero. When a visitor has reduced motion enabled, the headline stops cycling, the marquee becomes a scrollable row, scroll-linked effects settle in their final state, and entrance animations are skipped.

## Notes on fidelity to the reference

The reference was inspected through its page content and structure. Its CSS and rendered pixels were not available, so the colour palette, type sizes and spacing are close interpretations of a soft-beige, bold-type agency style rather than measured values. Typefaces are Inter Tight (headings) and Inter (body). The reference's background videos are replaced by a slowly drifting image, with an optional video slot.

## Placeholders and unfinished items

- All images, client marks, team members, projects, articles, prices in the FAQ and contact details are fictional placeholders. "Jubran Elias" is the site owner; the contact email is still a placeholder.
- The hero speaks as one person ("I turn complex ideas…"), but the About page, services and FAQs still use a studio "we". Rewrite those in `site.ts` to match.
- Forms run in demo mode until you add endpoints (see above).
- Social links point to the networks' home pages.
- The Noticed diary is stored in code. Pulling it live from Instagram needs the Instagram Graph API (a professional account and an access token), or a feed service such as Behold or Curator; either would replace the list in `src/content/diary.ts` with a fetch.
- No search engine sitemap or `robots.txt` is generated. Add them to `public/` once your domain is final.
- Open Graph images are not set. Add `og:image` tags in `index.html` once you have a share image.


## Preloader

On the first visit in a browser session, an intro plays before the site appears. It is coded (HTML, CSS and a little JavaScript), not a video: the screen starts black, Jubran walks in from the left pushing the black wall across the screen to reveal a white page, pushes it right off the edge, and the "JUBRAN ELIAS / PRODUCT DESIGNER" wordmark rises in letter by letter. The wordmark is `src/components/Wordmark.tsx`: Jubran's lettering traced from `src/assets/images/jubranelias-wordmark.png` into SVG, one path per letter. Then the white page lifts away on a curved edge to reveal the site.

- **Real loading:** the wall's position follows actual loading (fonts, the page and the sprite), never faster than `minDuration` and never stuck past `maxDuration`.
- **No sliding feet:** his steps are driven by how far the wall has moved, so his walk always matches the push, whatever the loading speed.
- **Timing:** `PRELOADER` at the top of `src/components/Preloader.tsx` (minimum and maximum duration, when the name appears, the pause on the name, the exit length).
- **Drawing:** his push cycle is 12 frames from his intro animation, in one transparent sprite sheet, `src/assets/images/preloader-push.webp`.
- **Colours:** `--c-preloader-bg`, `--c-preloader-ink` and `--c-preloader-wall` in `components.css`, plus the matching black cover in the `<style>` block of `index.html`.
- **When it shows:** on every page load (switching pages inside the site doesn't replay it), switched on in `index.html` before the first paint. Visitors who prefer reduced motion get a calm version: no wall or walking, just the name fading in and out.

## Dihzahyners (urban art)

A page at `/dihzahyners` for Dihzahyners, the urban art initiative Jubran founded and led: revitalising public spaces through outdoor painting, with a team of designers, large-scale public interventions and a Facebook community of 160,000+, covered by VICE News, Forbes, TEDx, CNN, Vogue and Designboom.

- **Navigation:** the last item in the menu pill, after a thin divider and marked with a small ✦, so the core product-design links keep their order and weight. In the mobile menu it sits under a divider with a small "Urban art" label. It also appears in the footer's page list.
- **Home page:** a quiet teaser band after the Work section (product design first), with a fanned stack of three project photos that spreads out on hover.
- **The page:** intro, a row of key facts, a "Featured in" press line, then the projects with filter buttons, a masonry grid and a lightbox (Esc closes, arrow keys browse, focus returns to the project you opened).

**Editing it:** everything is in `src/content/creative.ts`: the intro and home-teaser lines, `creativeFacts`, `creativePress`, and the projects. Each project has a title, type (`medium`, which drives the filters), optional year, cover image, alt text, shape, a one-line `summary` for its card, and a `description` (one string per paragraph; write links as `[text](https://url)`). Optional: `video` (a Vimeo or YouTube film, played inside the project: `{ provider: 'vimeo' | 'youtube', id, url }`), `photos` (a photo series shown in the opened project; give a photo a `title` and `credit` to show them in its caption tag; series are laid out as an overlapping collage, in order, with pop-on-hover: `COLLAGE_SLOTS` in `Dihzahyners.tsx`), `partners` (links as `[name](https://url)`) and `tags`. The film projects (Uber, Jotun, Naba'a, 7UP, Bodø) show only their video; the covers for Naba'a, 7UP and Bodø are single stills in `src/assets/images/{nabaa,sevenup,bodo}/` and load in file-name order.

**Films:** Vimeo and YouTube videos load only when a visitor presses play (`src/components/VideoEmbed.tsx`), using Vimeo's do-not-track option and YouTube's privacy-enhanced (youtube-nocookie) player, with a "Watch on Vimeo/YouTube" link underneath. Where a host blocks embedded players (such as a strict preview environment), the page notices and switches to opening the film on Vimeo in a new tab instead of showing a blocked frame. The Uber and Jotun films still use placeholder covers: replace `image` with a still from each film.

## Logo

The J icon lives in `src/components/Logo.tsx` as two SVG paths (the cap and the body), traced from `src/assets/images/jubranelias-icon.png`; the same shape is the browser-tab icon in `index.html`. Its animation is CSS in `components.css` (`.logo__cap`, `.logo__body`): on page load the body rises into place and the cap swings down onto it; on hover the cap tips up slightly from the point where it meets the body, then settles back.


## Noticed (visual diary)

A page at `/noticed` (it replaced the Journal; old `/blog` links land here) for the photos behind the Instagram diary: daily life, travels, exhibitions, places and details.

- **Presentation:** a hand-made collage. Photos overlap in layers, each tilted slightly, with a white print border. Hover one and it pops to the front: it straightens, grows and lifts, the others soften, and a small "No. 07 · place" tag slides up. Click to open it full size (Esc closes, arrow keys browse). Positions are the `SLOTS` list in `src/pages/Noticed.tsx` (twelve slots that repeat further down); on phones the photos fall into two loose, overlapping columns. On touch screens the tags are always visible.
- **Adding a moment:** put the photo in `src/assets/images/diary/`, import it in `src/content/diary.ts`, and add an entry with its place, date, kind (Everyday, Travel, Exhibitions, Places, Details), size (`xl`, `l`, `m`, `s`), a small tilt and an optional note. Newest first; numbers count up from the oldest.
- **Instagram:** the "Follow the diary" button and the closing "On Instagram" link use the Instagram address in `site.socials`.

## "Hi, I'm Jubran" scroll scene

The pinned section on the home page (`StudioIntro.tsx`) shows Jubran's illustrated character in one fixed spot while the two halves of the statement slide apart. As you scroll through it he acts out a tiny scene, one pose at a time: standing, waving hello, smiling, glancing toward the work below, then facing you again. It is driven by scroll position, so scrolling back up plays it in reverse, and each pose change gets a small hop so it reads as an action. The poses are in `src/assets/images/character/` (one canvas size, feet on the same baseline); the timing is the `SCENE` list at the top of the component. With reduced motion he simply stands there waving.

## "Hi, I'm Jubran" scroll section

The pinned section on the home page (`StudioIntro.tsx`) shows an abstract 3D version of the J icon in the middle: the logo extruded into a solid green object, built from stacked layers in CSS 3D (no WebGL, so it stays light). As you scroll, it swings round to show its depth, the cap lifts off the body and tilts at the pinch point, then settles back as the section ends; moving the mouse tilts it slightly. It floats gently on its own and casts a soft shadow. With reduced motion turned on it holds one still, angled pose. Depth, colours and the scroll choreography are in the `.j3d` rules in `sections.css` (`--turn`, `--lift`) and `DEPTH_LAYERS` in the component.


## Typography

Fonts are self-hosted with Fontsource (Inter Tight for display, Inter for text; latin subset, imported in `src/main.tsx`), so they load with the site instead of from Google and the layout never shifts. Display tracking lives in `tokens.css` (`--tracking-display`, `--tracking-heading`). Animated headings slide their words up from a mask (`.split__word`, `.h3d__word`); the mask has padding on every side with a matching negative margin, so descenders, tall letters and overhangs are never clipped and word spacing is unchanged. Hover labels (`RollText`) roll word by word, keeping each word whole so its kerning is preserved.

## Intro

The site opens with intro 2 (`PreloaderLogo.tsx`): Jubran's logo film at 1.35× speed (about 7.4 s), on a background matching the film, with a quiet Skip link that appears after 1.5 s. It plays once per visit (a `sessionStorage` flag set when it finishes or is skipped; the boot script in `index.html` only starts it when the flag is absent). Visitors who prefer reduced motion see the finished logo fade in and out. Intro 1 (`PreloaderPush` in `Preloader.tsx`, Jubran pushing the wall) is kept in the code; switch with `site.preloader.variant` and `DEFAULT_INTRO` in `index.html`.

## Colour and contrast

`--c-accent` (#56e38b) is used only as a fill behind dark text; wherever green is used as text (hover states, links, counters) the darker `--c-accent-text` (#1b8a4b, 4.6:1 on the background) is used. `--c-muted` is #5e5950 (5.5:1), so small grey text passes WCAG AA. Description and paragraph text uses `--c-ink-soft`, a softer grey than headings: #4f4b45 in light mode (7:1) and #bab4a9 in dark mode (8.6:1); headings stay `--c-ink`.

## Portrait (About page)

Jubran's portrait sits beside his story on the About page, cropped to 4:5 and set slightly askew like a print (it straightens on hover). It's two compressed WebP files in `src/assets/images/portrait/` (about 28 KB and 67 KB); the browser picks the one that fits the screen and only loads it as it comes into view. Its width and height are set, so the layout never jumps while it loads. To replace it, export a 4:5 photo at 640 and 1100 px wide with the same file names.

## Hisense case study

`/works/hisesne` shows the full Hisense Iraq — AC Installer Incentive App case study. The copy comes verbatim from the Figma frame "Hisense — Full Case Study" (Projects file, node 3717:180); the presentation follows the site's own design: the case-study hero with meta, numbered chapters in the label/content grid, outlined chips, surface cards, the site's fonts, colours and light/dark themes. Files: `src/components/casestudy/HisenseCaseStudy.tsx`, `HisenseScreens.tsx` (the four app screens, rebuilt in HTML and shown enlarged on a surface panel; they keep the app's own teal UI) and `src/styles/casestudy-hisense.css` (scoped under `.hs`). Arabic text uses Cairo (Fontsource, Arabic subset). The tiny UI icons inside the screens use matching Lucide icons.

## Limelines case study

`/works/limelines` shows the full Limelines case study. The copy comes verbatim from the Figma frame "Case Study / Limelines" (Projects file, node 3658:563), presented in the site's design with the shared parts in `src/components/casestudy/parts.tsx` (hero, chapters, cards, image slots). Images live in `src/assets/images/limelines/` (main idea, wireframes, onboarding, visual language, mobile app, app screens, Today's Picks, lines, ad formats, web For You, web Explore, curations, download, and a 4:3 card cover). The CMS screens (`cms-*.webp`) have all figures and dates frosted out so no data is shown.

## gigthree case study (UI design)

`/works/gigthree` shows the full gigthree case study. The copy comes verbatim from the Figma frame "Gigthree — Full Case Study" (Projects file, node 3642:193), presented in the site's design with the shared case-study parts. Images live in `src/assets/images/gigthree/` (site hero, site pages, platform screens, how it works, about, brand sheet, and a 4:5 card cover) and are placed in the Flow, Exploration and Final Solution chapters. All three full case studies are wired up in `WorkDetail.tsx` (`fullCases`).

## Case-study structure

All three full case studies (Hisense Iraq, Limelines, gigthree) follow the same chapters:

1. **Overview** — a TL;DR card (`Overview` in `parts.tsx`): the facts each study states (role, client, platforms, timeline…), the problem in one line, and the results.
2. **Context & Problem**
3. **Research & Insights**
4. **Exploration & Key Decisions** — user flow, explorations, key decisions
5. **Final Solution**
6. **Validation & Impact**
7. **Reflection** (optional) — not included yet, since none of the source write-ups contain learnings; add a `<Section n="07" title="Reflection">` when there's material for it.

Each chapter uses `SubHead` for its parts; Limelines keeps its original chapter headlines as lead lines (`hs-lede`).

## Plant something (Say hello page)

A small interactive landscape at the end of the Say hello page, under the Email me section: every visitor plants one tree and leaves it behind.

- **Flow:** "Plant a tree →" opens a quiet choice (Pine, Oak, Olive, Palm, or Surprise me). The seed drops, sprouts and grows into the tree; the counter ticks up and a short line of thanks appears ("You planted a tree." plus one of six notes). Returning visitors see "Your … is still here." and can "Find my tree" (everything else fades back and a ring marks theirs, labelled "Your tree", in the site green).
- **Landscape:** a soft rounded panel with refined generative trees: tapered, shaded trunks, branches, and foliage layered in three tones per species (oak canopy of overlapping discs, ragged drooping pine tiers, gnarled olive with airy silver leaves, bending palm with drooping serrated fronds). Three depth rows, far trees smaller and fainter, standing on a single hairline. Each tree's shape varies a little with its id. The mouse adds a slight parallax and a breath of wind; trees sway gently on their own. Trees are laid out at display time (`layout()` in `Landscape.tsx`): side by side in planting order, evenly spaced with a little unevenness, front row first; only when a row is full (11 near, 9 middle, 7 far on desktop) does the next tree start the row behind, offset so it shows between the trees in front. Stored positions aren't used for display, so older trees line up too.
- **Phones:** a closer landscape with fewer far trees, a full-width button and a 2×2 choice. **Reduced motion:** the tree simply appears. Fully keyboard operable, with a live announcement and a text description of the forest for screen readers.
- **Code:** `src/components/forest/` is split into `types.ts` (tree kinds), `Tree.tsx` (drawing + growth stages), `Landscape.tsx` (rows, parallax, wind), `Counter.tsx`, `useForest.ts` (state, free-spot finder) and `store.ts` (persistence); styles in `src/styles/forest.css`. Add a tree type by adding it to `TREE_KINDS` and a drawing function in `Tree.tsx`.
- **Persistence:** `store.ts` defines a `ForestStore` interface. On the regular site, `LocalForestStore` keeps the forest in localStorage (each browser has its own forest, and the visitor's tree survives return visits). On the claude.ai published preview, a shared database is used automatically, so everyone who opens it shares one live forest and one counter. For a shared forest on your own hosting, implement `ForestStore` against any backend (Supabase, Firebase, a small API) and return it from `openForestStore()`.

## Client logos

The home-page client marquee shows real client logos from `src/assets/images/clients/`, listed in `site.clients` (`src/config/site.ts`). Each logo was converted to a single dark mark on a transparent background and cropped to its edges, so they sit evenly on the cards and flip to light in dark mode (`filter: invert(1)`). Mark square or upright logos with `tall: true` to give them a little more height. To add one, drop a PNG or SVG with a transparent background into the folder and add `{ name, logo }` to the list.


## Noticed and Instagram

The Noticed page shows Jubran's Instagram profile (@jubranelias) using Instagram's profile embed (`src/components/InstagramEmbed.tsx`; the handle is `INSTAGRAM_HANDLE` in `src/pages/Noticed.tsx`). Where a page blocks content from other sites (like the claude.ai preview), a "View on Instagram" card links to the profile instead. All Instagram icons and buttons link to https://www.instagram.com/jubranelias/ (`site.socials`). The earlier photo-collage entries in `src/content/diary.ts` are no longer shown.

## Back to top

A small floating circle button (`BackToTop.tsx`, bottom-right) that only appears after the visitor has scrolled more than 1.5 screens, fades out near the top, and scrolls smoothly to the top (instantly with reduced motion), handing keyboard focus to the content. It's no longer in the footer, which keeps its right corner clear for it.

## Deploying to 961host (Apache / cPanel)

1. Run `npm run build`. The `dist/` folder is the site (clean URLs like `/works/hisesne`; the preview's `#/` addresses are only for the single-file preview).
2. Upload everything inside `dist/` to your `public_html` folder (or the domain's root). `dist/.htaccess` is included: it makes the server send `index.html` for every address, so deep links and refreshes work, and sets caching.
3. `dist/og.jpg` is the link-preview image. The preview tags in `index.html` point at `https://jubranelias.com/`; if the site lives at a different address, change `og:url`, `og:image` and `twitter:image` there before building.


## Say hello, analytics, hints

- **Say hello:** no form. An "Email me" card opens the visitor's mail app with a prefilled subject; the email address is also shown as a link.
- **Analytics:** `index.html` loads Plausible for `jubranelias.com`. Create the site at plausible.io to start collecting; until then the script is harmless (it does nothing for unknown domains). The claude.ai preview blocks it.
- **Menu hint:** the Dihzahyners tab carries a small grey "urban art" hint on desktop (`.nav__hint`); the mobile menu already shows "Urban art".
- **Project years:** Hisense 2025, Limelines 2018 – 2019, gigthree 2019 (`src/content/projects.ts` and each case study's Overview).

## Services thumbnails

The three service cards on the home page use animated, code-drawn thumbnails (`src/components/ServiceThumb.tsx`, styles in `sections.css`): a product flow drawing itself node by node (Product strategy), a phone screen laying itself out and a tap filling its button (UX & UI design), and a swatch cycling colours while every component follows (Design systems). They loop slowly, speed up a little on hover, use the site's colours in both themes, and hold a still frame with reduced motion. No image files are involved.

## Footer

A minimal one-line footer (`Footer.tsx`): Instagram and LinkedIn as text links on the left (green with a drawn underline on hover), the copyright centred. On phones they stack, centred.

## Al Jomaih iConnect (fourth project)

`/works/iconnect` is the full case study (`IConnectCaseStudy.tsx`), copy verbatim from the Figma frame "iConnect — Full Case Study" (Projects file, node 3762:9555), in the six-part structure. Final Solution shows seven UI screens and a five-step guided-tour strip (`src/assets/images/iconnect/`); the card cover is the Home screen. Context & Problem shows the eight legacy screens (`legacy-*.webp`, with the signed-in employee's name and photo and the sellers' names blurred, and the browser bar cropped off); Exploration shows the sitemap and the wireframe board.

## Dihzahyners timeline

The Dihzahyners page shows the projects on a timeline (`src/components/CreativeTimeline.tsx`, `.tl` styles in `pages.css`). Only years with something in them appear, as evenly spaced stops: Founded (flag; hover: "Founded by Jubran Elias & Lana Chukri on 28 April 2012"), each project year (one marker per project), and Online only as the last stop (2020, pause icon; hover: moved online, events paused after COVID-19). Milestone notes show in the caption row on hover or focus. A fixed-height caption row above the line shows the hovered or selected project's name so nothing shifts; selecting a marker reveals one main visual (the project's film if it has one, playable in place, otherwise its photo) with the year, type, title and summary; "Open project" opens the project's Facebook album (`album` on each project in `creative.ts`; until set, it goes to the Dihzahyners Facebook page, `DIHZAHYNERS_FACEBOOK`). Arrow keys move between projects. On phones the stops stack vertically with the project names listed under each year. Years and milestones come from `year` in `creative.ts` and the constants at the top of the component.

## Header face

A small face sits before the theme toggle (`StatusFace.tsx`): its eyes follow the cursor, it blinks now and then, and after 5 seconds without movement it falls asleep: eyes close, it nods off with a slow breathing motion and small z's float up, until the mouse moves again. Hover or focus shows a status label with a pulsing green dot; the text is `site.status` in `src/config/site.ts` (currently "Currently designing"). Hidden below 900px; still for reduced motion.


## Banking & trading experience (NDA)

Confidential work is shown as experience, not as a case study: the Work page ends with "Beyond the portfolio · Banking & trading, under NDA" (`ExperienceSection.tsx`, content in `src/content/experience.ts`): two company cards (FP Markets, Eurisko Mobility with client Al Hilal Bank) each with role, dates, summary, three bullets, product tags and a "Confidential. Screens shared on request only." note, plus a "Request a private walkthrough" email button. There is no project card or `/works/...` page for it.

## Project covers

The project covers share one template: the brand's colour as a solid background with a soft light and the product screens themselves, no logos (iConnect royal blue + home dashboard; Hisense teal + three screens in realistic iPhone frames; Limelines lime + Today's Picks in an iPhone frame; gigthree navy + marketing site). Rendered from `covers/make2.py`-style HTML templates. They're 1200×900 WebP files (`iconnect/cover.webp`, `hisense-cover.webp`, `limelines/cover.webp`, `gigthree/cover.webp`).

## Case-study writing format

Each case study chapter opens with one bold line (`Lead`), then a few specifics (`Points` bullets or short cards), then the images; longer reasoning is folded into a closed-by-default `More` expander ("More detail"). Targets: 500–700 words of prose per case study, about two minutes of reading. The Overview card stays as the summary. Components live in `casestudy/parts.tsx`.

## Live apps and coming soon

Case studies for shipped apps show a "Live on the App Store" link under the Overview (`AppLink.tsx`): Hisense Iraq and Limelines. A project can also be a "coming soon" card that links out instead of opening a case page: set `status` and `external` on it in `projects.ts` (Escapyo, with a generated typographic cover `escapyo-cover.webp`).


## Hisense case study (six flows)

`HisenseCaseStudy.tsx` follows the Figma frame "Case Study — Hisense Iraq Installer App" (node 3824:179): Overview, Context (with the wireframe sketches), The six flows (joining, identity, the job, tracking & rewards, support & updates, account & resources; each a lead line, a short paragraph and any shipped screens), Design language, and Scope & status (6 flows, 30+ screens, 3 languages, 12 states). Edit the flows in the `FLOWS` array.

## Back links on case studies

Each case study has a quiet "← Work" link above its title (`CaseHero` in `parts.tsx`) and an "← All work" link just above the "Next case" block (`WorkDetail.tsx`). Top-level pages have no back button; the header is always visible.

## Error and empty states

- 404 (`NotFound.tsx`): "Nothing here, but the work is one click away." with See the work, homepage and Say hello. Unknown project addresses show it too.
- Offline: `OfflineBanner.tsx` shows a sticky dark banner on `offline`, hides on `online`, dismissible. The bundle itself keeps working offline.
- Crash: `ErrorBoundary.tsx` around the page outlet shows "Something went wrong on this page" with reload, homepage and email.
- Broken images: `lib/brokenImages.ts` swaps any failed `<img>` for a neutral "Image unavailable" tile.
- No JavaScript: `<noscript>` message in `index.html`.
- Server 404s: `.htaccess` adds `ErrorDocument 404 /index.html` as a safety net under the rewrite rule.
- Print: a small `@media print` block hides chrome and animations and prints external link addresses.

## Paint Up Volumes (a series)

`paint-up-volumes` in `creative.ts` has a `volumes` array (V.2 Piano … V.7 Stripes, plus the Ayadina Initiative). Its main image is the Triangular staircase (V.4). In the timeline panel the series shows a row of seven cards under the main visual, each linking to its own album (`album` on the volume; falls back to the project's album, then the Facebook page). It has no single "Open project" link; each volume card links to its own album.

## iConnect: anonymised screens

The iConnect screens use a stock portrait for the division president (home and all tour steps), generic app names on the Applications screen (CRM, ERP, Procurement and so on), neutral "Co. A–D" tiles in place of the operating-company logos on every screen, and obviously fake values on the profile (ID 1234567890, passport A00000000, 01 January dates, ACD-00000). The overlay renderer used for this lives outside the project (HTML text/tiles over the exports).
