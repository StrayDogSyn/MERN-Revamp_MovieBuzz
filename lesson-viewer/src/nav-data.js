'use strict';

/**
 * Static manifest of every curriculum week the viewer can render.
 * `studentMdPath` is relative to the repo root (one level above /lesson-viewer/).
 * `phase` drives the sidebar grouping and the pre/post-Week-8 boundary marker.
 *
 * Only `00` and `08` have `prototype: true` — per the build boundary, build.js
 * only renders entries flagged this way. The rest of the list exists so the
 * sidebar/nav can show the full course arc even in the two-week prototype,
 * and so the mechanical replication pass has a ready-made manifest instead
 * of having to reverse-engineer one from the filesystem.
 */

const WEEKS = [
  { id: '00', dirName: 'week_00_welcome_call', title: 'Welcome Call', phase: 'pre-backend', prototype: true },
  { id: '01', dirName: 'week_01_bash_and_git', title: 'Bash & Git', phase: 'pre-backend', prototype: true },
  { id: '02', dirName: 'week_02_dev_environment', title: 'Dev Environment', phase: 'pre-backend', prototype: true },
  { id: '03', dirName: 'week_03_intro_to_react', title: 'Intro to React', phase: 'pre-backend', prototype: true },
  { id: '04', dirName: 'week_04_react_state_and_hooks', title: 'React State & Hooks', phase: 'pre-backend', prototype: true },
  { id: '05', dirName: 'week_05_react_events_and_hooks', title: 'React Events & Hooks', phase: 'pre-backend', prototype: true },
  { id: '06', dirName: 'week_06_react_component_patterns', title: 'React Component Patterns', phase: 'pre-backend', prototype: true },
  { id: '07', dirName: 'week_07_react_hooks_and_context', title: 'React Hooks & Context', phase: 'pre-backend', prototype: true },
  { id: '08', dirName: 'week_08_nodejs_and_http', title: 'Node.js & HTTP', phase: 'backend', prototype: true },
  { id: '09', dirName: 'week_09_express_and_cors', title: 'Express & CORS', phase: 'backend', prototype: true },
  { id: '10', dirName: 'week_10_tic_tac_toe_checkpoint', title: 'Tic-Tac-Toe Checkpoint', phase: 'backend', prototype: true },
  { id: '11', dirName: 'week_11_intro_to_mongodb', title: 'Intro to MongoDB', phase: 'backend', prototype: true },
  { id: '12', dirName: 'week_12_mongoose_and_read', title: 'Mongoose & Read', phase: 'backend', prototype: true },
  { id: '13', dirName: 'week_13_create_functionality', title: 'Create Functionality', phase: 'backend', prototype: true },
  { id: '14', dirName: 'week_14_update_functionality', title: 'Update Functionality', phase: 'backend', prototype: true },
  { id: '15', dirName: 'week_15_delete_functionality', title: 'Delete Functionality', phase: 'backend', prototype: true },
  { id: '16', dirName: 'week_16_frontend_backend_integration', title: 'Frontend/Backend Integration', phase: 'backend', prototype: true },
  { id: 'opt-search', dirName: 'week_optional_search_feature', title: 'Search Feature', phase: 'optional', prototype: true },
  { id: 'opt-testing', dirName: 'week_optional_testing_suite', title: 'Testing Suite', phase: 'optional', prototype: true },
];

const PHASE_LABELS = {
  'pre-backend': 'Weeks 00–07 · Pre-Backend (React & Tooling)',
  backend: 'Weeks 08–16 · Backend (Node, Express, MongoDB)',
  optional: 'Optional Modules',
};

function studentMdPathFor(week) {
  return `../${week.dirName}/student.md`;
}

module.exports = { WEEKS, PHASE_LABELS, studentMdPathFor };
