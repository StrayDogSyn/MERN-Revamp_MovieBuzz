'use strict';

/**
 * Semantic-markup translation layer for the lesson viewer.
 *
 * The source student.md files do NOT contain literal color spans — the
 * yellow/red/orange/green/mediumseagreen convention described in the org
 * style guide lives in the Canvas LMS rich-text editor, not in this plain
 * markdown. What the markdown DOES carry, consistently, are structural and
 * lexical signals: emoji-prefixed blockquotes, a `` `Consider This` ``/
 * `` `Try It Out` `` backtick-label convention for Socratic prompts,
 * `<details>/<summary>` disclosure blocks, numbered "Step/Task/Example N:"
 * headings, GFM task-list checkboxes, and a flat "## Glossary" list.
 *
 * Each function below detects one of those signals and either (a) adds a
 * CSS hook so styles.css can render the Brand-Guide-compliant component, or
 * (b) injects a small amount of static HTML (an icon+label strip, a step
 * badge) so the distinction survives without color as the only signal.
 *
 * All of this runs at BUILD time against the markdown-it token stream
 * (inserted via core.ruler, right after the 'block' rule and before
 * 'inline'). Nothing here ships to the browser as JavaScript.
 */

const EMOJI_CALLOUT_MAP = {
  '💡': 'tip',
  '⚠️': 'warning',
  '🔑': 'meta',
  '📌': 'note',
  '🎫': 'ticket',
  '🗺️': 'orientation',
  '🚀': 'stretch',
  '📖': 'reference',
};

/* Maps callout types to Font Awesome icon classes + display labels */
const FA_ICON_MAP = {
  'tip':                  { icon: 'fas fa-lightbulb',      text: 'Tip' },
  'warning':              { icon: 'fas fa-exclamation-triangle', text: 'Warning' },
  'meta':                 { icon: 'fas fa-key',             text: 'Key Concept' },
  'note':                 { icon: 'fas fa-thumbtack',       text: 'Note' },
  'ticket':               { icon: 'fas fa-ticket-alt',      text: 'Ticket' },
  'orientation':          { icon: 'fas fa-map-signs',       text: 'Orientation' },
  'stretch':              { icon: 'fas fa-rocket',          text: 'Stretch Goal' },
  'reference':            { icon: 'fas fa-book-open',       text: 'Reference' },
  'reflection-consider':  { icon: 'fas fa-brain',           text: 'Reflection — Consider This' },
  'reflection-try':       { icon: 'fas fa-tools',           text: 'Hands-On — Try It Out' },
  'concept':              { icon: 'fas fa-cube',            text: 'Concept' },
  'default':              { icon: 'fas fa-info-circle',     text: 'Note' },
};

function faLabel(type) {
  const fa = FA_ICON_MAP[type] || FA_ICON_MAP['default'];
  return `<i class="${fa.icon} callout-icon" aria-hidden="true"></i><span>${fa.text}</span>`;
}

function classifyBlockquoteLead(content) {
  if (/^`Consider This`/.test(content)) {
    return { type: 'reflection-consider', label: faLabel('reflection-consider') };
  }
  if (/^`Try It Out`/.test(content)) {
    return { type: 'reflection-try', label: faLabel('reflection-try') };
  }
  // "**Term**\nDefinition" on its own, e.g. Key Concepts blocks — the bold
  // term IS the label, so no extra HTML needs to be injected.
  if (/^\*\*[^*\n]+\*\*\s*\n/.test(content)) {
    return { type: 'concept', label: null };
  }
  const emojiMatch = content.match(/^(\p{Extended_Pictographic}️?)/u);
  if (emojiMatch && EMOJI_CALLOUT_MAP[emojiMatch[1]]) {
    const type = EMOJI_CALLOUT_MAP[emojiMatch[1]];
    return { type, label: faLabel(type) };
  }
  return { type: 'default', label: null };
}

/**
 * Adds a `callout callout--<type>` class to every top-level blockquote and,
 * for the two Socratic-prompt variants, injects a small label strip ahead
 * of the question text (those blocks only carry a terse backtick code as
 * their label in the source, e.g. `` `Consider This` ``, which isn't
 * descriptive enough as a standalone visual/text cue).
 */
function classifyCallouts(state) {
  const tokens = state.tokens;
  for (let i = 0; i < tokens.length; i++) {
    if (tokens[i].type !== 'blockquote_open') continue;
    let firstContent = '';
    if (tokens[i + 1] && tokens[i + 1].type === 'paragraph_open' &&
        tokens[i + 2] && tokens[i + 2].type === 'inline') {
      firstContent = tokens[i + 2].content;
    }
    const { type, label } = classifyBlockquoteLead(firstContent);
    tokens[i].attrJoin('class', `callout callout--${type}`);
    // Organic micro-variation: deterministic tilt + glow from token position
    const tiltSign = i % 2 === 0 ? 1 : -1;
    const tiltMag  = ((i * 17) % 5) * 0.1; // 0.0–0.4deg
    const glowInt  = (0.6 + ((i * 13) % 40) / 100).toFixed(2); // 0.60–1.00
    tokens[i].attrSet('style',
      `--tilt:${tiltSign * tiltMag}deg;--glow-intensity:${glowInt}`);
    /* Inject a label strip for every callout type, not just Socratic prompts */
    const effectiveLabel = label || faLabel(type);
    const labelToken = new state.Token('html_block', '', 0);
    labelToken.content = `<div class="callout-label lift">${effectiveLabel}</div>\n`;
    tokens.splice(i + 1, 0, labelToken);
    i++
  }
}

const STEP_HEADING_RE = /^(?:(?:Step|Task|Example)\s+(\d+)[:.]\s*|(\d+)\.\s+)(.+)$/i;

/**
 * Turns "### 1. Check Node.js" / "### Task 2: ..." / "### Example 3: ..."
 * headings into a numbered step badge + the remaining heading text, so the
 * step convention reads as a UI component instead of relying on the reader
 * noticing a leading digit in plain text.
 */
function addStepBadges(state) {
  const tokens = state.tokens;
  let stepCount = 0;
  for (let i = 0; i < tokens.length; i++) {
    if (tokens[i].type !== 'heading_open' || tokens[i].tag !== 'h3') continue;
    const inline = tokens[i + 1];
    if (!inline || inline.type !== 'inline') continue;
    const match = inline.content.match(STEP_HEADING_RE);
    if (!match) continue;
    const num = match[1] || match[2];
    const rest = match[3];
    /* Organic tilt: alternate subtle direction, constrained to ±0.3deg */
    const tiltSign = stepCount % 2 === 0 ? 1 : -1;
    const tiltMag  = (stepCount % 3) * 0.1; // 0.0, 0.1, 0.2deg
    tokens[i].attrJoin('class', 'step-heading');
    tokens[i].attrSet('style', `--organic-tilt:${tiltSign * tiltMag}deg`);
    inline.content = `<span class="step-badge" aria-hidden="true">${num}</span>` +
      `<span class="sr-only">Step ${num}: </span>${rest}`;
    stepCount++;
  }
}

const TASK_ITEM_RE = /^\[([ xX])\]\s+(.+)$/;

/**
 * Renders GFM-style "- [ ] text" / "- [x] text" list items as disabled
 * checkboxes instead of literal bracket text. Implemented by hand (rather
 * than pulling in a third-party plugin) since the transform is a single
 * regex against the inline token content.
 */
function renderTaskCheckboxes(state) {
  const tokens = state.tokens;
  for (let i = 0; i < tokens.length; i++) {
    if (tokens[i].type !== 'inline') continue;
    const match = tokens[i].content.match(TASK_ITEM_RE);
    if (!match) continue;
    const checked = /x/i.test(match[1]) ? ' checked' : '';
    tokens[i].content = `<input type="checkbox" class="task-checkbox" disabled${checked}> ${match[2]}`;
    // Walk up to the enclosing list_item_open and tag it for spacing/alignment CSS.
    for (let j = i; j >= 0; j--) {
      if (tokens[j].type === 'list_item_open') {
        tokens[j].attrJoin('class', 'task-list-item');
        break;
      }
    }
  }
}

/**
 * Pre-parse text transform: wraps the body of a "## Glossary" section in a
 * `<details open>` disclosure so it follows the org-wide reveal pattern,
 * without removing the heading itself (legacy weeks' in-page TOC links
 * point at `#glossary`, which only resolves if the heading survives).
 *
 * Relies on the CommonMark/GFM rule that a blank line resets HTML-block
 * scanning, so markdown between `<summary>...</summary>` and `</details>`
 * is parsed normally as long as blank lines surround it — the exact same
 * pattern already used by every other `<details>` block in this curriculum.
 */
function wrapGlossarySection(markdownSource) {
  const lines = markdownSource.split('\n');
  const startIdx = lines.findIndex(l => /^##\s+Glossary\b/.test(l.trim()));
  if (startIdx === -1) return markdownSource;

  let endIdx = lines.length;
  for (let i = startIdx + 1; i < lines.length; i++) {
    const trimmed = lines[i].trim();
    if (trimmed === '---' || /^##\s+/.test(lines[i])) {
      endIdx = i;
      break;
    }
  }

  const body = lines.slice(startIdx + 1, endIdx).join('\n').trim();
  const wrapped = [
    '<details open class="glossary-disclosure">',
    '<summary>📖 Click to collapse glossary</summary>',
    '',
    body,
    '',
    '</details>',
  ].join('\n');

  return [
    ...lines.slice(0, startIdx + 1),
    '',
    wrapped,
    ...lines.slice(endIdx),
  ].join('\n');
}

function registerRules(md) {
  md.core.ruler.after('block', 'classify_callouts', classifyCallouts);
  md.core.ruler.after('classify_callouts', 'step_badges', addStepBadges);
  md.core.ruler.after('step_badges', 'task_checkboxes', renderTaskCheckboxes);
}

module.exports = { registerRules, wrapGlossarySection };
