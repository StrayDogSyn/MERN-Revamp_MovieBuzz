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

function classifyBlockquoteLead(content) {
  if (/^`Consider This`/.test(content)) {
    return { type: 'reflection-consider', label: '🤔 Reflection Prompt — Consider This' };
  }
  if (/^`Try It Out`/.test(content)) {
    return { type: 'reflection-try', label: '🛠️ Hands-On — Try It Out' };
  }
  // "**Term**\nDefinition" on its own, e.g. Key Concepts blocks — the bold
  // term IS the label, so no extra HTML needs to be injected.
  if (/^\*\*[^*\n]+\*\*\s*\n/.test(content)) {
    return { type: 'concept', label: null };
  }
  const emojiMatch = content.match(/^(\p{Extended_Pictographic}️?)/u);
  if (emojiMatch && EMOJI_CALLOUT_MAP[emojiMatch[1]]) {
    return { type: EMOJI_CALLOUT_MAP[emojiMatch[1]], label: null };
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
    if (label) {
      const labelToken = new state.Token('html_block', '', 0);
      labelToken.content = `<div class="callout-label lift">${label}</div>\n`;
      tokens.splice(i + 1, 0, labelToken);
      i++;
    }
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
  for (let i = 0; i < tokens.length; i++) {
    if (tokens[i].type !== 'heading_open' || tokens[i].tag !== 'h3') continue;
    const inline = tokens[i + 1];
    if (!inline || inline.type !== 'inline') continue;
    const match = inline.content.match(STEP_HEADING_RE);
    if (!match) continue;
    const num = match[1] || match[2];
    const rest = match[3];
    tokens[i].attrJoin('class', 'step-heading');
    inline.content = `<span class="step-badge" aria-hidden="true">${num}</span>` +
      `<span class="sr-only">Step ${num}: </span>${rest}`;
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
    '<details open class="glossary-disclosure glass">',
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
