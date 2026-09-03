# Hermes Field Guide

A personal power-user course for Hermes Agent that **starts from the learner's actual usage**.

Answer six short questions (pre-filled from the user's real setup — profiles, cron jobs, machines) and the course hides everything already in the routine and teaches only the gaps. Short plain-English lessons with real exercises, progress kept in `localStorage` (nothing leaves the browser).

## Files

- `index.html` — shell + masthead
- `styles.css` — design system (light, petrol/amber/green tokens)
- `data.js` — **all course content**: assessment questions, modules, lessons
- `app.js` — tiny vanilla SPA: router, assessment, plan, lesson reader

## Tailoring it

Everything personal lives in `data.js`:

- `QUESTIONS` — the assessment; each maps to a module level (`done` / `topup` / `full`)
- `DEFAULT_ANSWERS` — pre-fills from what you know about the user
- `MODULES` — module metadata + whyFull/whyTop framing copy
- `LESSONS` — lesson bodies as block objects (`h`, `p`, `ul`, `code`, `callout`, exercise steps, doc links)

Lesson visibility logic in `app.js` / `data.js` helpers: `moduleLevel()` and `visibleLessons()`.

## Deploy

Static site — works from `file://` or any host. This repo is served via GitHub Pages (Settings → Pages, branch `main`, root).
