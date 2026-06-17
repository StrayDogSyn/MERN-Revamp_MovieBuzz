'use strict';
// Detects CSS selector blocks that declare the same property more than once
// at top level (i.e. not inside an @media or @keyframes block). This is the
// class of bug that split .callout-label and pre {} across two blocks in the
// previous pass. Intentional additive second blocks (e.g. one block for layout,
// a second block adding only `animation`) are fine and will NOT be flagged,
// because they don't redeclare the same property.
// Known limitation: a naive bracket-matcher — does not handle CSS custom
// properties with braces in values. If false-positive noise grows, that's the
// trigger to revisit stylelint (human decision, not Cascade's to make).
// Run via: node scripts/audit-duplicate-css-selectors.js

const fs = require('fs');
const path = require('path');

const CSS_FILE = path.join(__dirname, '..', 'weeks', 'assets', 'styles.css');
const content = fs.readFileSync(CSS_FILE, 'utf8');

// Strip comments
const stripped = content.replace(/\/\*[\s\S]*?\*\//g, '');

// Parse top-level selector blocks only.
// selectorProps: Map<selector, Map<property, count>>
const selectorProps = new Map();

const parts = stripped.split(/([{}])/);
const stack = [];
let pendingSelector = '';
let currentBody = '';

for (const part of parts) {
  if (part === '{') {
    const selector = pendingSelector.trim().replace(/\s+/g, ' ');
    const isAtRule = selector.startsWith('@');
    stack.push({ selector, isAtRule });
    if (!isAtRule && stack.length === 1 && selector) {
      if (!selectorProps.has(selector)) selectorProps.set(selector, new Map());
      // currentBody will be collected until the matching }
    }
    pendingSelector = '';
    currentBody = '';
  } else if (part === '}') {
    const frame = stack.pop();
    if (frame && !frame.isAtRule && stack.length === 0 && frame.selector) {
      // Parse properties out of currentBody
      const propMap = selectorProps.get(frame.selector);
      if (propMap) {
        for (const decl of currentBody.split(';')) {
          const colonIdx = decl.indexOf(':');
          if (colonIdx === -1) continue;
          const propName = decl.slice(0, colonIdx).trim();
          if (propName) propMap.set(propName, (propMap.get(propName) || 0) + 1);
        }
      }
    }
    pendingSelector = '';
    currentBody = '';
  } else {
    if (stack.length === 1 && !stack[0].isAtRule) {
      currentBody += part;
    } else {
      pendingSelector = part;
    }
  }
}

const violations = [];
for (const [selector, propMap] of selectorProps) {
  for (const [prop, count] of propMap) {
    if (count > 1) {
      violations.push(`"${selector}" — property "${prop}" declared ${count} times`);
    }
  }
}

if (violations.length > 0) {
  console.error(`\nDuplicate-property guard FAILED — ${violations.length} conflict(s) at top-level:\n`);
  violations.forEach(v => console.error('  ' + v));
  process.exit(1);
}

console.log(`Duplicate-property guard passed — ${selectorProps.size} unique top-level selector(s) checked, 0 conflicting property declarations.`);
process.exit(0);
