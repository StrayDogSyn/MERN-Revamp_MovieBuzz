'use strict';

const fs = require('fs');
const path = require('path');
const MarkdownIt = require('markdown-it');
const anchor = require('markdown-it-anchor');
const hljs = require('highlight.js');

const { WEEKS, PHASE_LABELS } = require('./src/nav-data');
const { registerRules, wrapGlossarySection } = require('./src/markdown-rules');

const ROOT = __dirname;
const REPO_ROOT = path.resolve(ROOT, '..');
const OUT_DIR = path.join(ROOT, 'weeks');
const TEMPLATE_PATH = path.join(ROOT, 'src', 'template.html');

// Matches the CommonMark/GFM heading slug algorithm (ASCII punctuation subset — sufficient
// for this curriculum's headings, which are all ASCII). The legacy
// student.md files hand-author their in-page TOC links (e.g.
// "[Glossary](#glossary)") against the GitLab renderer, so heading IDs must
// use the same slug rules or those links 404 in the static output.
const PUNCTUATION_CHARS = '\\\'!"#$%&()*+,./:;<=>?@[]^`{|}~';
const MARKDOWN_PUNCTUATION_RE = new RegExp('[' + PUNCTUATION_CHARS.replace(/[\\\]^]/g, '\\$&') + ']', 'g');

function markdownSlugify(str) {
  return str.toString().toLowerCase().replace(MARKDOWN_PUNCTUATION_RE, '').replace(/ /g, '-');
}

const md = new MarkdownIt({
  html: true,       // required: student.md files use raw <details>/<summary> blocks for disclosure widgets
  linkify: false,   // fixed in prior pass; bare identifiers like todo.id must not become external links
  typographer: false,
  highlight(code, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return '<pre class="hljs"><code>' +
          hljs.highlight(code, { language: lang, ignoreIllegals: true }).value +
          '</code></pre>';
      } catch (_) { /* fall through */ }
    }
    return '<pre class="hljs"><code>' +
      hljs.highlightAuto(code).value +
      '</code></pre>';
  }
}).use(anchor, { slugify: markdownSlugify });
registerRules(md);

function buildSidebarHtml(activeId) {
  const phases = ['pre-backend', 'backend', 'optional'];
  return phases.map(phase => {
    const items = WEEKS.filter(w => w.phase === phase).map(w => {
      const isProtoOnly = w.prototype;
      const href = isProtoOnly
        ? `../${w.dirName}/index.html`
        : null;
      const label = w.id.startsWith('opt-')
        ? w.title
        : `Week ${w.id} · ${w.title}`;
      const cls = w.id === activeId ? 'nav-link active' : 'nav-link';
      if (href) {
        return `<a class="${cls}" href="${href}">${label}</a>`;
      }
      // Not yet rendered in this prototype pass — show as plain text so the
      // full course arc is still visible without producing a dead link.
      return `<span class="${cls.replace('active', '')}" style="opacity:0.55;cursor:default;display:block;padding:7px 20px;font-size:0.92rem;">${label}</span>`;
    }).join('\n');
    return `<div class="nav-phase">${PHASE_LABELS[phase]}</div>\n${items}`;
  }).join('\n');
}

function pagerLink(week, dir) {
  if (!week) return `<span class="disabled">${dir === 'prev' ? '← Previous' : 'Next →'}</span>`;
  const label = week.id.startsWith('opt-') ? week.title : `Week ${week.id}`;
  const arrow = dir === 'prev' ? `← ${label}` : `${label} →`;
  if (!week.prototype) {
    return `<span class="disabled" title="Not yet built in this prototype pass">${arrow}</span>`;
  }
  return `<a href="../${week.dirName}/index.html">${arrow}</a>`;
}

/* Deterministic-but-varied page angle: spread weeks across 100–170deg arc */
function pageGradientAngle(weekId) {
  const ids = ['00','01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','opt-search','opt-testing'];
  const idx = ids.indexOf(weekId);
  const t = idx === -1 ? 0.5 : idx / (ids.length - 1);
  return Math.round(100 + t * 70);
}

/* Deterministic seed per week in [0.3, 0.95] for glow/animation variance */
function animationSeed(weekId) {
  let hash = 0;
  for (let i = 0; i < weekId.length; i++) hash = (hash * 31 + weekId.charCodeAt(i)) & 0xffff;
  return (0.3 + (hash % 1000) / 1000 * 0.65).toFixed(3);
}

/* Strip markdown syntax to plain text for search index snippets */
function mdToText(src) {
  return src
    .replace(/```[\s\S]*?```/g, '')
    .replace(/`[^`]+`/g, '')
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/!?\[([^\]]*?)\]\([^)]*?\)/g, '$1')
    .replace(/[*_~]{1,3}([^*_~]+)[*_~]{1,3}/g, '$1')
    .replace(/^[-*+>]\s+/gm, '')
    .replace(/\n{2,}/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function renderWeek(week, template, searchIndex) {
  const mdPath = path.join(REPO_ROOT, week.dirName, 'student.md');
  const raw = fs.readFileSync(mdPath, 'utf8');
  const preprocessed = wrapGlossarySection(raw);
  const contentHtml = md.render(preprocessed);

  const titleMatch = raw.match(/^#\s+(.+)$/m);
  const title = titleMatch ? titleMatch[1].replace(/[#*_`]/g, '').trim() : week.title;

  /* Accumulate search index entry */
  const plainText = mdToText(raw);
  searchIndex.push({
    id:      week.id,
    title,
    url:     `${week.dirName}/index.html`,
    snippet: plainText.slice(0, 300),
    body:    plainText
  });

  const idx = WEEKS.findIndex(w => w.id === week.id);
  const prevWeek = idx > 0 ? WEEKS[idx - 1] : null;
  const nextWeek = idx < WEEKS.length - 1 ? WEEKS[idx + 1] : null;

  const bodyStyle = `--page-gradient-angle:${pageGradientAngle(week.id)}deg;--animation-seed:${animationSeed(week.id)}`;

  const html = template
    .replace(/{{TITLE}}/g, title)
    .replace(/{{PHASE_LABEL}}/g, PHASE_LABELS[week.phase])
    .replace(/{{SIDEBAR_HTML}}/g, buildSidebarHtml(week.id))
    .replace(/{{CONTENT_HTML}}/g, contentHtml)
    .replace(/{{ASSET_PATH}}/g, '../assets/styles.css')
    .replace(/{{PREV_LINK}}/g, pagerLink(prevWeek, 'prev'))
    .replace(/{{NEXT_LINK}}/g, pagerLink(nextWeek, 'next'))
    .replace(/{{BODY_STYLE}}/g, bodyStyle)
    .replace(/{{ANIMATIONS_PATH}}/g, '../assets/animations.js')
    .replace(/{{SEARCH_PATH}}/g, '../assets/search.js');

  const outDir = path.join(OUT_DIR, week.dirName);
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, 'index.html'), html, 'utf8');
  console.log(`Built ${week.dirName}/index.html`);
}

function main() {
  const template = fs.readFileSync(TEMPLATE_PATH, 'utf8');
  const targets = WEEKS.filter(w => w.prototype);
  const searchIndex = [];
  let errorCount = 0;

  for (const week of targets) {
    try {
      renderWeek(week, template, searchIndex);
    } catch (err) {
      console.error(`\nBuild failed while processing: ${path.join(REPO_ROOT, week.dirName, 'student.md')}`);
      console.error(`Reason: ${err.message}\n`);
      errorCount++;
    }
  }

  if (errorCount > 0) {
    console.error(`Build aborted — ${errorCount} source file(s) failed. Fix the error(s) above and re-run.`);
    process.exit(1);
  }

  const indexPath = path.join(OUT_DIR, 'assets', 'search-index.json');
  fs.writeFileSync(indexPath, JSON.stringify(searchIndex, null, 2), 'utf8');
  console.log(`Wrote search-index.json (${searchIndex.length} entries)`);
  console.log(`\nBuild summary: ${targets.length} page(s) built, 0 errors.`);
}

main();
