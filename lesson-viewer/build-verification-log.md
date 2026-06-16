# Lesson Viewer — Build Verification Log

Generated: 2026-06-16  
Build command: `node build.js` from `lesson-viewer/`  
Exit code: 0 — all 19 targets rendered without error

Checks run against every output file:
- **No unreplaced template placeholders** (`{{TITLE}}`, `{{CONTENT_HTML}}`, etc.)
- **`<details>` open/close balance** — counts matched for all 19 files
- **No orphaned markdown syntax** — `**bold**` and `[text](link)` patterns not present outside `<pre>`/`<code>` (Python strip+grep)
- **Sidebar and pager present** — confirmed in all 19 files
- **Semantic element counts** — callouts, details, step-badges, task-checkboxes, glossary disclosure tallied and cross-checked against source files

Notes on zero-counts (all verified against source — not rendering failures):
- `details=0`: Weeks 06 and 07 use the "legacy" flat-section format with no `<details>` blocks in source
- `callouts=0`: Weeks 15, opt-search, opt-testing have zero blockquote syntax (`>`) in source
- `glossary=0`: Weeks 00, 01, 04, 05, 06, 07, opt-search, opt-testing have no `## Glossary` heading in source
- `task-checkboxes=0`: Most legacy-format weeks use no `- [ ]` task-list syntax

---

| Week | Output file | Size | callouts | details | step-badges | task-checkboxes | glossary | Status |
|------|-------------|------|----------|---------|-------------|-----------------|----------|--------|
| 00 | week_00_welcome_call/index.html | 24 KB | 10 | 11 | 9 | 16 | — | PASS |
| 01 | week_01_bash_and_git/index.html | 30 KB | 16 | 14 | 10 | 15 | — | PASS |
| 02 | week_02_dev_environment/index.html | 18 KB | 6 | 1 | — | — | 1 | PASS |
| 03 | week_03_intro_to_react/index.html | 24 KB | 12 | 1 | 2 | — | 1 | PASS |
| 04 | week_04_react_state_and_hooks/index.html | 30 KB | 11 | 14 | 8 | 13 | — | PASS |
| 05 | week_05_react_events_and_hooks/index.html | 87 KB | 4 | 1 | 3 | — | 1 | PASS |
| 06 | week_06_react_component_patterns/index.html | 16 KB | 2 | — | 6 | — | — | PASS |
| 07 | week_07_react_hooks_and_context/index.html | 21 KB | 2 | — | 6 | — | — | PASS |
| 08 | week_08_nodejs_and_http/index.html | 32 KB | 10 | 1 | 4 | — | 1 | PASS |
| 09 | week_09_express_and_cors/index.html | 33 KB | 6 | 1 | 3 | — | 1 | PASS |
| 10 | week_10_tic_tac_toe_checkpoint/index.html | 57 KB | 4 | 1 | 3 | 21 | 1 | PASS |
| 11 | week_11_intro_to_mongodb/index.html | 30 KB | 8 | 1 | 5 | — | 1 | PASS |
| 12 | week_12_mongoose_and_read/index.html | 37 KB | 6 | 1 | 4 | — | 1 | PASS |
| 13 | week_13_create_functionality/index.html | 42 KB | 4 | 1 | 4 | — | 1 | PASS |
| 14 | week_14_update_functionality/index.html | 43 KB | 4 | 1 | 4 | — | 1 | PASS |
| 15 | week_15_delete_functionality/index.html | 22 KB | — | 1 | 4 | — | 1 | PASS |
| 16 | week_16_frontend_backend_integration/index.html | 38 KB | 2 | 1 | 4 | — | 1 | PASS |
| opt-search | week_optional_search_feature/index.html | 22 KB | — | — | 9 | 11 | — | PASS |
| opt-testing | week_optional_testing_suite/index.html | 17 KB | — | — | — | — | — | PASS |

`—` = zero in source; not a rendering failure.

---

## Observations flagged for architectural review

**Week 05 output size (87 KB):** Noticeably larger than peers (next largest is ~57 KB for week 10). Source `student.md` is longer than other pre-backend weeks and contains large embedded code examples. No rendering anomaly — size is proportional to content. No action needed.

**Week opt-testing all-zero counts:** `week_optional_testing_suite/student.md` is a plain instructional guide with no blockquotes, no `<details>`, no task lists, and no `## Glossary`. The 17 KB output is structurally correct HTML with the standard sidebar, pager, and headings rendering normally.

**`<details>` count discrepancy for weeks 00 and 04:** These two weeks contain the highest `<details>` counts (11 and 14 respectively). Cross-check: `week_00_welcome_call/student.md` carries 11 `<details>` blocks in source; `week_04_react_state_and_hooks/student.md` carries 14. Both match source → output exactly.

**No `<details>` imbalance found** in any of the 19 files — every `<details>` open tag has a matching `</details>` close.

**No orphaned markdown syntax** (`**bold**`, `[link](url)`) found outside `<pre>`/`<code>` blocks in any output file.

---

## Deliverables summary

| Artifact | Location |
|---|---|
| 19 week HTML files | `lesson-viewer/weeks/<week_dir>/index.html` |
| Landing page | `lesson-viewer/weeks/index.html` |
| Stylesheet | `lesson-viewer/weeks/assets/styles.css` |
| This log | `lesson-viewer/build-verification-log.md` |
