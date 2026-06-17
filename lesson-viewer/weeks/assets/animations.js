/* TLM Lesson Viewer — Anime.js orchestration
 * Fires on DOMContentLoaded. Skips entirely when prefers-reduced-motion is set.
 * Requires anime.min.js (loaded before this script in the page).
 */
(function () {
  'use strict';

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  document.addEventListener('DOMContentLoaded', function () {

    /* ── Nav links: slide in from the left ── */
    var navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(function (el) {
      el.style.opacity = '0';
      el.style.transform = 'translateX(-8px)';
    });
    anime({
      targets: navLinks,
      opacity: [0, 1],
      translateX: [-8, 0],
      easing: 'cubicBezier(0.22, 1, 0.36, 1)',
      duration: 380,
      delay: anime.stagger(22, { start: 60 })
    });

    /* ── h2 headings: cascade in with stagger ── */
    var headings = document.querySelectorAll('.main h2');
    headings.forEach(function (el) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(14px)';
    });
    anime({
      targets: headings,
      opacity: [0, 1],
      translateY: [14, 0],
      easing: 'cubicBezier(0.22, 1, 0.36, 1)',
      duration: 520,
      delay: anime.stagger(60, { start: 80 })
    });

    /* ── Callouts: stagger in with scale pop ── */
    var callouts = document.querySelectorAll('blockquote.callout');
    callouts.forEach(function (el) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(10px) scale(0.98)';
    });
    anime({
      targets: callouts,
      opacity: [0, 1],
      translateY: [10, 0],
      scale: [0.98, 1],
      easing: 'cubicBezier(0.22, 1, 0.36, 1)',
      duration: 480,
      delay: anime.stagger(45, { start: 200 })
    });

    /* ── Step headings: slide in from slight left offset ── */
    var stepHeadings = document.querySelectorAll('.step-heading');
    stepHeadings.forEach(function (el) {
      el.style.opacity = '0';
      el.style.transform = 'translateX(-6px)';
    });
    anime({
      targets: stepHeadings,
      opacity: [0, 1],
      translateX: [-6, 0],
      easing: 'cubicBezier(0.22, 1, 0.36, 1)',
      duration: 420,
      delay: anime.stagger(35, { start: 160 })
    });

    /* ── Details disclosures: fade up ── */
    var disclosures = document.querySelectorAll('details');
    disclosures.forEach(function (el) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(8px)';
    });
    anime({
      targets: disclosures,
      opacity: [0, 1],
      translateY: [8, 0],
      easing: 'cubicBezier(0.22, 1, 0.36, 1)',
      duration: 440,
      delay: anime.stagger(30, { start: 240 })
    });

    /* ── [data-anime] generic targets ── */
    var animeTargets = document.querySelectorAll('[data-anime]');
    if (animeTargets.length) {
      anime({
        targets: animeTargets,
        opacity: [0, 1],
        translateY: [12, 0],
        easing: 'cubicBezier(0.22, 1, 0.36, 1)',
        duration: 500,
        delay: anime.stagger(40, { start: 120 })
      });
    }

  });
})();
