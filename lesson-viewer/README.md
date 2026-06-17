# TLM Lesson Viewer — Architecture & Template Spec

A static lesson viewer that renders the Movie Buzz curriculum's `student.md` files
as standalone, Brand-Guide-compliant HTML pages, with no client-side JavaScript
required to read or navigate the content. This document is the spec: how the
build works, why it's built this way, how to extend it to the remaining weeks,
and what it does *not* yet handle.

**Status: prototype.** Only Week 00 and Week 08 are built (see `src/nav-data.js`,
`prototype: true`). This is deliberate — see "Scope boundary" below.

## Why static pre-rendering, not client-side parsing

The viewer reads each week's `student.md` once, at build time, and writes a
plain `.html` file per week. There is no in-browser markdown parser, no
hydration, no fetch-and-render step.

- **The deployment target is a closed intranet.** There's no public CDN to
  lean on for a markdown-parsing library, and pulling one from a CDN mirror
  (e.g. `devdocs.tlm.cloud`) adds a runtime dependency that can silently fail
  — a broken mirror, a blocked request, a version mismatch — and the student
  just sees a blank page or raw markdown text with no error surfaced. A build
  failure, by contrast, is loud and happens on the *author's* machine before
  anything ships.
- **"Zero placeholders, production-ready" rules out client-side fallback
  states.** A client-rendered page has at least one frame (or, on a slow
  connection, several seconds) where the page is a loading skeleton or raw
  markdown. Pre-rendered HTML has no such state — what's in the file is what
  the student sees, immediately.
- **It degrades to zero JavaScript, full stop.** Not "works without JS for the
  reading experience" — there is no JS in the output at all. Disclosure
  widgets are native `<details>`, the mobile sidebar toggle is a CSS checkbox
  hack (see `weeks/assets/styles.css`), and navigation is plain anchor links.
  This is a stronger guarantee than the brief asked for, and it was a
  deliberate choice: every additional runtime dependency is one more thing
  that can break unobserved in a closed-intranet deployment with no error
  reporting pipeline back to the curriculum team.

## File structure

```
lesson-viewer/
├── package.json          # markdown-it + markdown-it-anchor, "npm run build"
├── build.js               # the build script — reads student.md, writes weeks/<dir>/index.html
├── src/
│   ├── nav-data.js        # WEEKS manifest (id, dirName, title, phase, prototype flag)
│   ├── markdown-rules.js  # semantic-markup translation (callouts, step badges, checkboxes, glossary)
│   └── template.html      # HTML shell with {{PLACEHOLDER}} slots
├── weeks/                 # BUILD OUTPUT — one directory per rendered week
│   ├── assets/
│   │   └── styles.css     # Brand Guide tokens + all component styles (hand-written, not generated)
│   ├── week_00_welcome_call/
│   │   └── index.html
│   └── week_08_nodejs_and_http/
│       └── index.html
└── README.md               # this file
```

Source `student.md` files live outside this directory, at
`../week_NN_<slug>/student.md` (one level up, in the repo root) — `build.js`
resolves `REPO_ROOT` as `path.resolve(__dirname, '..')` and never copies or
modifies the source files.

## One static file per week, not an SPA with data injection

The brief asked this to be argued explicitly rather than asserted:

- **An SPA needs a JS router to turn URL/hash changes into the right
  content**, which reintroduces exactly the runtime dependency the static
  approach exists to avoid. If that router fails to load, *every* week
  becomes unreachable, not just one.
- **A `<noscript>` fallback for an SPA still means maintaining two render
  paths** (a JS path and a noscript path) that can drift out of sync. One
  static file per week means there is only ever one render path: the build
  script.
- **Static files survive being opened directly from disk, emailed as an
  attachment, or mirrored onto a USB stick for a classroom with flaky intranet
  access** — none of which work cleanly with an SPA that expects to be served
  from an origin with working relative fetches.
- **The cost of "one file per week" is duplication** (every page repeats the
  same sidebar HTML and a `<link>` to a shared stylesheet). That's an
  acceptable, bounded cost — 19 small HTML files, not 1900 — and it's what
  buys the zero-JS guarantee above. A shared external stylesheet
  (`weeks/assets/styles.css`) means the duplication is markup only, not CSS.

## Brand Guide compliance — design language

This viewer uses the **TLM Brand Guide 2022** palette exclusively:

| Token | Hex | Pantone | Usage |
|---|---|---|---|
| `--brand-gold` | `#DAA520` | 124C | Active nav state, headings rule, step badges |
| `--brand-gold-deep` | `#B87F1B` | — | Links, secondary accents |
| `--brand-black` | `#23221F` | 419C | Body text, sidebar background, code blocks |
| `--brand-cream` | `#F8EED5` | — | Callout backgrounds, table headers |
| `--brand-grey` | `#AAA99F` | — | Borders, disabled states |
| `--brand-offwhite` | `#F0F0F0` | — | Page background |

No hue outside this set appears anywhere in `weeks/assets/styles.css`. This is
a **light, print-first theme**, not the dark dev-tool palette used in other
supplemental tooling in this repo (see `docs/audit_dump.txt` for that
contrasting design language) — Movie Buzz is canon, and the Brand Guide names
a light palette, so the viewer is light.

**Typography:** Helvetica Neue (Regular for body, Condensed for headings),
per the Brand Guide, with a plain system-font fallback chain.

**Monospace font — not specified by the Brand Guide, chosen here:** the stack
uses the `ui-monospace` generic CSS keyword first, falling through to Cascadia
Code / Source Code Pro / Menlo / Consolas / Liberation Mono. `ui-monospace`
asks each OS to supply its own platform-native monospace font, which that OS
has already paired against its system sans-serif (the same role Helvetica
Neue plays here). That avoids two things: shipping or hosting a new font file
on a closed intranet with no stated font-licensing process, and picking a
single mono face that might clash with Helvetica Neue on some platforms but
not others. This is **not** the monospace face used in the dark-theme
supplemental tooling — it's an independent choice made to pair with Helvetica
Neue specifically.

## Semantic markup translation

The brief describes a yellow/red/orange/green/mediumseagreen color convention
from the org's Canvas LMS style guide. **That convention is not literally
present in this repo's `student.md` files** — there are no color spans, no
HTML comments marking regions, nothing for a parser to key on by color. What
*is* consistently present, across every week sampled, are structural and
lexical signals the curriculum authors already use. `src/markdown-rules.js`
classifies against those signals instead of inventing a parallel scheme:

| Org convention | Source signal actually found in student.md | Rendered component |
|---|---|---|
| Vocab dropdown (orange) | `<details><summary>` blocks (weeks 00, 01, 04) | Same `<details>`, restyled with Brand Guide colors + custom triangle marker — not reinvented |
| Glossary/answer (red) | Flat `## Glossary` heading + definition list (weeks 02, 03, 05–16) | Synthesized `<details open class="glossary-disclosure">` wrapper around the existing list, preserving the `#glossary` anchor for legacy in-page TOC links |
| Step labels (green) | `### 1. ...` / `### Step N:` / `### Task N:` / `### Example N:` headings | Numbered circular gold step badge + `sr-only` "Step N:" text for screen readers |
| Discussion questions (mediumseagreen) | Key-Concepts-style blockquotes (`> **Term**\nDefinition`) | `callout--concept` styled blockquote — the bold term doubles as its own label |
| Socratic prompts (caret blockquotes) | `` > `Consider This` `` / `` > `Try It Out` `` backtick-labeled blockquotes | `callout--reflection-consider` / `callout--reflection-try`, with an injected icon+text label strip (🤔 Reflection Prompt / 🛠️ Hands-On) since the source label alone is too terse to stand alone visually |
| Instructor-only (yellow) | **Not present in student.md at all** — confirmed by diffing week 00 and week 08's `teacher.md` against `student.md`; instructor-only content (Socratic intervention notes, reference-implementation callouts) is stripped before student.md is authored | No component needed; the viewer only ever renders `student.md` |

Additional emoji-prefixed blockquotes not named in the original org convention
but found repeatedly in the source (🔑 access code/meta bar, 💡 tips, ⚠️
warnings, 📌 notes, 🎫 exit tickets, 🗺️ orientation, 🚀 stretch goals, 📖
reference) are each given their own `callout--*` class and border-left color,
on the same "color is never the only signal" rule — see `EMOJI_CALLOUT_MAP` in
`src/markdown-rules.js`. Every callout type keeps the source emoji or a
generated text label in addition to its color, so the distinction survives in
black-and-white print and for colorblind readers.

GFM task checkboxes (`- [ ] text` / `- [x] text`) are hand-rendered as
disabled `<input type="checkbox">` elements via a single regex against the
inline token content (`renderTaskCheckboxes` in `markdown-rules.js`) — this
was a deliberate decision not to pull in a third-party checkbox-list plugin
for one regex's worth of behavior.

## Navigation

- **Sidebar** (`buildSidebarHtml` in `build.js`): lists all 19 entries in
  `WEEKS` (00–16 plus two optional modules), grouped under three phase
  headers from `PHASE_LABELS` — `Weeks 00–07 · Pre-Backend`, `Weeks 08–16 ·
  Backend`, `Optional Modules`. The boundary sits exactly at Week 8, per the
  brief. Weeks not yet built (`prototype: false`) render as plain disabled
  text so the full 17-week arc is visible even in this two-week prototype,
  without producing a dead link.
- **Prev/next pager** (`pagerLink`): walks `WEEKS` by array index, not by
  phase, so it correctly crosses the Week 7→8 pre-backend/backend boundary
  without a special case. Links to a not-yet-built week render disabled with
  a `title` attribute explaining why.
- **Jump-to-week**: the sidebar itself *is* the jump control — every entry is
  a direct link, always visible (sticky-positioned on desktop, behind the
  zero-JS checkbox-hack toggle on mobile/narrow viewports).

## Build process

```bash
cd lesson-viewer
npm install        # markdown-it, markdown-it-anchor — the only two dependencies
npm run build       # node build.js — renders every week flagged prototype: true in src/nav-data.js
```

Output lands in `weeks/<dirName>/index.html`. The build is idempotent and has
no side effects outside `weeks/` (it never writes into the source
`week_NN_*/` directories).

### Heading-anchor slugging

`build.js` defines its own `markdownSlugify()` rather than using
`markdown-it-anchor`'s default slugify. The legacy `student.md` files hand-
author in-page TOC links (e.g. `[Glossary](#glossary)`) against the GitLab
actual heading-slug algorithm. The default `markdown-it-anchor` slugify
percent-encodes punctuation (producing IDs like `what-is-node.js%3F`), which
does not match those hand-written links and silently breaks in-page
navigation. `markdownSlugify()` replicates the algorithm — lowercase, strip
an ASCII punctuation character class, spaces to hyphens — and was verified
against all of Week 08's TOC links (0 of 18 unresolved after the fix). It
covers ASCII punctuation only; see "Known edge cases" below.

## Extending to the remaining 15 weeks

This is a **separate, later pass** — per the brief's explicit boundary, this
prototype only proves the template against Week 00 and Week 08. To extend it:

1. In `src/nav-data.js`, flip `prototype: true` for each additional week's
   entry (the manifest entries for all 17 weeks plus both optional modules
   already exist — no new entries need to be added unless the curriculum
   grows).
2. Run `npm run build`. No other code changes should be necessary if a week's
   `student.md` matches one of the two formats already proven (see "Two
   authoring eras" below).
3. **Before trusting the output, grep the new week's `student.md` for
   anything in the "Known edge cases" list below** and check it by eye against
   the rendered HTML — this template was built and verified against two
   weeks' worth of markdown shapes, not all seventeen.
4. Re-run the anchor-link check if the week has an in-page TOC: confirm every
   `[text](#anchor)` link in the source resolves to a real `id=` in the
   rendered HTML (the same check used to catch the Week 08 slugify bug).
5. Spot-check the rendered page in a browser, particularly: any `<details>`
   blocks, any blockquote that doesn't match one of the known
   emoji/backtick/bold-term patterns (it will silently fall through to
   `callout--default` — a safe but generic style), and any `### N. ...`
   heading that isn't actually a step (the step-badge regex is intentionally
   narrow but could still misfire on, say, a numbered list inside a heading).

### Two authoring eras

Grepping every `student.md`/`teacher.md` in the repo surfaced two distinct
formatting conventions:

- **Era A** (weeks 00, 01, 04): `<details>`-heavy, checklist-driven, meta-bar
  blockquote up top, `### N. Verb...` step headings.
- **Era B** (weeks 02, 03, 05–16): TOC-with-anchor-links at the top, a flat
  `## Glossary` list instead of a `<details>` block, `` `Consider This` ``/
  `` `Try It Out` `` Socratic blockquotes, `### Example N:` headings, an Exit
  Ticket + Review section near the end.

Week 00 (Era A) and Week 08 (Era B) were chosen as the prototype pair because
they cover both eras — this was verified, not assumed, before building. Any
week in the 15 remaining should match one of these two shapes; if a week's
`student.md` doesn't cleanly fit either pattern, treat it as a new edge case
to resolve before running the build on it, not something to force through.

## Known edge cases / things this template does not yet handle

- **`instructor.md` / `homework/homework.md` filenames assumed by the
  original brief do not exist in this repo.** The actual convention is
  `teacher.md` (not `instructor.md`) and there is no `homework/` folder or
  `homework.md` file anywhere in the curriculum directory tree. This viewer
  only ever reads `student.md` — confirmed (via diffing `teacher.md` against
  `student.md` for weeks 00 and 08) that all instructor-only content is
  already stripped out of `student.md` by the curriculum authors, so the
  viewer needs no "Instructor Note" component despite the brief specifying
  one. If a homework file format is introduced later, it is out of scope for
  this template as built.
- **The org's literal yellow/red/orange/green/mediumseagreen color
  convention does not exist as syntax in these markdown files.** It lives in
  Canvas LMS rich-text authoring. The classification in `markdown-rules.js`
  is keyed on structural/lexical signals (emoji prefixes, backtick Socratic
  labels, bold-term-only blockquote leads, numbered headings) found by
  grepping the actual source, not on any color marker. If a future week uses
  a callout shape not covered by `EMOJI_CALLOUT_MAP` or
  `classifyBlockquoteLead()`, it will fall through to the generic
  `callout--default` style rather than being miscategorized — safe, but
  worth a manual check per item 3 above.
- **`markdownSlugify()` only strips ASCII punctuation**, not the fuller Unicode
  punctuation ranges the full GFM slug algorithm handles. Every heading sampled
  across this curriculum is plain ASCII, so this is a deliberate scope cut,
  not an oversight — but if a future week's heading contains e.g. an em-dash,
  curly quote, or non-Latin character, re-verify its TOC anchors resolve
  before shipping that week.
- **The step-badge regex (`STEP_HEADING_RE`)** matches `### 1. ...`, `###
  Step 1: ...`, `### Task 1: ...`, and `### Example 1: ...`. A week that uses
  a differently-worded numbered-heading convention (e.g. "### Part 1 —") will
  render as a normal heading with no badge — not wrong, just unenhanced.
  Extend the regex if a new convention shows up.
- **`wrapGlossarySection()` assumes exactly one `## Glossary` heading per
  file**, terminated by either a `---` rule or the next `##` heading. A week
  that splits glossary terms across multiple sections, or nests them under a
  different heading level, will need either a source-markdown tweak or a
  small change to the end-of-section detection.
- **No syntax highlighting in code blocks.** `pre`/`code` get Brand Guide
  styling (dark background, gold left border) but no language-aware token
  coloring. This was a deliberate scope cut for the prototype — none of the
  sampled weeks' code blocks seemed to need it to be readable, but revisit if
  a later week's code samples are dense enough to benefit from it.
- **Images, if any future week's `student.md` embeds them**, aren't yet
  handled by any custom rule — they'll pass through markdown-it's default
  image rendering unstyled. Neither Week 00 nor Week 08 contains an image, so
  this wasn't exercised.

## Accessibility

Every callout, badge, and disclosure component pairs its color with a
non-color signal:

- Callout types keep their source emoji or an injected text label
  (`.callout-label`) — never color alone.
- Step badges are `aria-hidden` (decorative) and paired with a visually-hidden
  (`.sr-only`) "Step N:" string read by screen readers.
- `<details>` triangles use a CSS-content character (`▸`/rotated), not a
  color change, to indicate open/closed state.
- A print stylesheet (`@media print`) forces closed `<details>` elements open
  (`details:not([open]) { display: block }`) since browsers hide collapsed
  `<details>` content by default when printing — without this, a printed
  glossary or vocab dropdown would be silently empty.
