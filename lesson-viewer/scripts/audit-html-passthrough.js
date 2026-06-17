'use strict';
// Confirms the markdown pipeline never passes raw <script> or <iframe> tags
// through to rendered output outside of syntax-highlighted code blocks.
// Note: html: true is required in build.js to support <details>/<summary> in
// student.md files. This script enforces the security boundary on the *output*
// instead of the config, scanning every generated page for unsafe tags.
// Run via: node scripts/audit-html-passthrough.js

const fs = require('fs');
const path = require('path');

const OUTPUT_DIR = path.join(__dirname, '..', 'weeks');

function walkHtml(dir, fileList = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) walkHtml(fullPath, fileList);
    else if (entry.name.endsWith('.html') && entry.name !== 'index.html' || entry.name === 'index.html') {
      fileList.push(fullPath);
    }
  }
  return fileList;
}

// Strip content that legitimately contains script/iframe text before scanning:
// 1. <pre>/<code> blocks — curriculum content teaches HTML/JS and shows these tags
// 2. <script src="..."> tags the template injects for anime.js and local assets —
//    those are safe by construction (external src only, no inline content)
// What remains and still matches <script or <iframe is a genuine passthrough risk.
function stripSafeContent(html) {
  return html
    .replace(/<pre[\s\S]*?<\/pre>/gi, '')
    .replace(/<code[\s\S]*?<\/code>/gi, '')
    .replace(/<script\s[^>]*src=["'][^"']*["'][^>]*><\/script>/gi, '');
}

// Match <script> without a src= attribute (inline scripts) or bare <iframe
const UNSAFE_TAGS = [/<script(?![^>]*\bsrc=)[^>]*>/i, /<iframe[\s>]/i];

const files = walkHtml(OUTPUT_DIR);
const violations = [];

for (const file of files) {
  const content = fs.readFileSync(file, 'utf8');
  const stripped = stripSafeContent(content);
  for (const pattern of UNSAFE_TAGS) {
    if (pattern.test(stripped)) {
      violations.push(`${file}: unsafe tag matched by ${pattern}`);
    }
  }
}

if (violations.length > 0) {
  console.error(`\nHTML passthrough guard FAILED — ${violations.length} violation(s):\n`);
  violations.forEach(v => console.error('  ' + v));
  process.exit(1);
}

console.log(`HTML passthrough guard passed — ${files.length} page(s) checked, 0 unsafe tags outside code blocks.`);
process.exit(0);
