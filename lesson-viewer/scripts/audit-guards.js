'use strict';
// Automated version of the manual checks already used in the
// lesson-viewer-review-dump.md generation script (sections 4 and 5).
// Checks: external links, github.com references, disallowed brand tokens.
// Run via: node scripts/audit-guards.js — wired into "npm run build".

const fs = require('fs');
const path = require('path');

const OUTPUT_DIR = path.join(__dirname, '..', 'weeks');

// Domains permitted in rendered <a href> attributes.
// Edit this list only after confirming with Hunter — see CONVENTIONS.md.
const ALLOWLISTED_DOMAINS = [
  'cdn.tlm.cloud',           // CDN for FontAwesome, anime.js — always intranet
  'devdocs.tlm.cloud',
  'mdn.tlm.cloud',
  'wikipedia.tlm.cloud',
  'typing.tlm.cloud',
  'stack.tlm.cloud',
  'support.tlm.cloud',
  'gitlab.tlm.cloud',
  'docs.gitlab.tlm.cloud',
  'localhost',               // tutorial instructions reference local dev servers
];

// Tokens that belong to other TLM tools (express-revamp, CSS Grid demo),
// not this viewer. Their presence signals a copy/paste error.
const DISALLOWED_TOKENS = ['0d1117', 'e8a020', '2dd4bf', 'Nunito', 'JetBrains'];

// Only match <a href="..."> navigable links — not <link rel> stylesheet or <script src> asset refs.
const HREF_PATTERN = /<a\s[^>]*href=["'](https?:\/\/[^"']+)["']/g;

function walk(dir, exts, fileList = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(fullPath, exts, fileList);
    else if (exts.some(ext => entry.name.endsWith(ext))) fileList.push(fullPath);
  }
  return fileList;
}

function isAllowedHost(url) {
  try {
    return ALLOWLISTED_DOMAINS.includes(new URL(url).hostname);
  } catch {
    return false;
  }
}

function main() {
  const htmlFiles = walk(OUTPUT_DIR, ['.html']);
  const cssFiles = walk(OUTPUT_DIR, ['.css']);
  const allTextFiles = walk(OUTPUT_DIR, ['.html', '.css', '.js']);
  const violations = [];

  for (const file of htmlFiles) {
    const content = fs.readFileSync(file, 'utf8');
    let m;
    HREF_PATTERN.lastIndex = 0;
    while ((m = HREF_PATTERN.exec(content)) !== null) {
      if (!isAllowedHost(m[1])) {
        violations.push(`[external-link] ${path.relative(OUTPUT_DIR, file)} -> ${m[1]}`);
      }
    }
  }

  for (const file of allTextFiles) {
    const content = fs.readFileSync(file, 'utf8');
    if (/github\.com/i.test(content)) {
      violations.push(`[github-reference] ${path.relative(OUTPUT_DIR, file)} contains a github.com reference`);
    }
  }

  for (const file of [...htmlFiles, ...cssFiles]) {
    const content = fs.readFileSync(file, 'utf8');
    for (const token of DISALLOWED_TOKENS) {
      if (content.includes(token)) {
        violations.push(`[brand-token] ${path.relative(OUTPUT_DIR, file)} contains disallowed token "${token}"`);
      }
    }
  }

  if (violations.length > 0) {
    console.error(`\nGuard FAILED — ${violations.length} violation(s):\n`);
    violations.forEach(v => console.error('  ' + v));
    process.exit(1);
  }

  console.log(`Guard passed — ${htmlFiles.length} HTML page(s), ${cssFiles.length} CSS file(s) checked, 0 violations.`);
  process.exit(0);
}

main();
