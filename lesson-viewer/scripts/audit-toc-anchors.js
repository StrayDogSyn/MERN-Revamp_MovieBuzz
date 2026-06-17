'use strict';
// For every generated week page, confirms every in-page href="#slug"
// has a matching id="slug" somewhere in the same document.
// Does NOT modify how slugs are generated — read-only check only.
// Run via: node scripts/audit-toc-anchors.js

const fs = require('fs');
const path = require('path');

const OUTPUT_DIR = path.join(__dirname, '..', 'weeks');

function walkHtml(dir, fileList = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) walkHtml(fullPath, fileList);
    else if (entry.name.endsWith('.html')) fileList.push(fullPath);
  }
  return fileList;
}

const HREF_ANCHOR = /href=["']#([^"']+)["']/g;
const ID_ATTR = /\bid=["']([^"']+)["']/g;
let totalBroken = 0;

for (const file of walkHtml(OUTPUT_DIR)) {
  const content = fs.readFileSync(file, 'utf8');
  const ids = new Set();
  let m;

  ID_ATTR.lastIndex = 0;
  while ((m = ID_ATTR.exec(content)) !== null) ids.add(m[1]);

  const broken = [];
  HREF_ANCHOR.lastIndex = 0;
  while ((m = HREF_ANCHOR.exec(content)) !== null) {
    if (!ids.has(m[1])) broken.push(m[1]);
  }

  if (broken.length > 0) {
    totalBroken += broken.length;
    console.error(`${path.relative(OUTPUT_DIR, file)}: ${broken.length} broken anchor(s) -> ${broken.join(', ')}`);
  }
}

if (totalBroken > 0) {
  console.error(`\nTOC-anchor guard FAILED — ${totalBroken} broken anchor(s) total.`);
  process.exit(1);
}

console.log('TOC-anchor guard passed — every in-page anchor resolves to a matching id.');
process.exit(0);
