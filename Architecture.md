# Architecture

TB Free is a static, serverless Progressive Web App. There is no backend, no build step and no runtime dependency. Everything runs in the user's browser and is stored on the user's device.

## Goals that shaped the design

| Goal | Consequence |
|---|---|
| Works on cheap phones and poor networks | Small payload (about 660 lines of JS and CSS in total), vanilla JavaScript, no framework. |
| Works offline after the first visit | Service worker caches the whole app shell. |
| Private by default | No server, no analytics, no accounts. Data stays in `localStorage`. |
| Free to host anywhere | Static files only: GitHub Pages, Netlify, or a ministry server. |
| Clinical rules can be reviewed | Screening rules live in one pure file (`logic.js`) with unit tests. |

## System overview

```
                 ┌────────────────────────── Browser ───────────────────────────┐
                 │                                                              │
 index.html ───► │  app.js  (router + views + storage)                          │
                 │    │  uses                                                   │
                 │    ├──► logic.js    pure functions: no DOM, no storage       │
                 │    ├──► content.js  all text, translations, medical content  │
                 │    └──► localStorage  keys prefixed "tbf."                   │
                 │                                                              │
 sw.js ─────────►│  Service worker: cache-first, falls back to index.html       │
                 └──────────────────────────────────────────────────────────────┘
        No network calls are made by the application code.
```

## Modules

| File | Responsibility | Depends on |
|---|---|---|
| `index.html` | Shell: header, language selector, bottom navigation, `#view` mount point, service-worker registration. | all scripts |
| `app.js` | Hash router, view renderers, event handlers, `localStorage` wrapper, language state. | `logic.js`, `content.js` |
| `logic.js` | Pure functions, exported to both the browser (`window.TBLogic`) and Node (`module.exports`). | none |
| `content.js` | `window.LANGS`, UI strings per language, myths and facts, next steps, side-effect guidance, missed-dose and support text. | none |
| `sw.js` | Install, activate and fetch handlers for offline use. | none |
| `styles.css` | Design tokens and components, light and dark themes. | none |
| `manifest.json`, `icon.svg` | Installability. | none |

### `logic.js` public API

| Function | Purpose |
|---|---|
| `assessPublic(answers)` | Public self-check. Returns `{ level, codes }` where level is `urgent`, `test`, `watch` or `low`. |
| `assessWorker(group, signs)` | Health-worker screen for `adult`, `child` or `plhiv`. Returns `{ presumptive, codes }`. The HIV rule follows the WHO four-symptom screen. |
| `parseCSV(text)` / `toCSV(records)` | RFC 4180-style parsing and export, including quoted cells and a leading BOM. |
| `cascade(records)` | Counts per care stage, from presumptive to diagnosed to on treatment and beyond. |
| `summarise(records)` / `byState(records)` | Aggregates and per-state aggregates used by the policy dashboard. |
| `makeICS(startISO, time, days)` | Builds a daily recurring calendar file for the dose reminder. |
| `sampleData()` | Synthetic records for the policy demo. |

Outputs are **codes**, not sentences. `app.js` maps each code to text in the chosen language from `content.js`. This keeps clinical logic separate from wording, so a translator or clinician can change one without touching the other.

## Routing and views

The app is a single page with hash routing (`#/home`, `#/learn`, `#/check`, `#/patient`, `#/worker`, `#/policy`, `#/about`).

1. `hashchange` fires.
2. The router looks up the view function in the `views` map.
3. The view returns an HTML string, which is written to `#view`.
4. The view then attaches its event handlers (`wire` step).

Every dynamic value is passed through `esc()` before it enters the HTML string. This is the only protection against injection, so it is a hard rule for any new view.

## Data and storage

All keys are namespaced with `tbf.` and stored as JSON.

| Key | Content | Written by |
|---|---|---|
| `tbf.lang` | Selected language code. | language selector |
| `tbf.tx` | Treatment plan: start date, number of days, reminder time, map of taken doses by date. | My treatment |
| `tbf.log` | Health-worker case log: code, age, sex, state, date, stage, HIV status, contacts screened. | Health worker |

The `get` and `set` helpers wrap every access in `try/catch`, so the app still runs when storage is blocked, such as in some private browsing modes. A "clear my data" action removes every `tbf.` key.

Policy data is **never stored**. A CSV chosen in the Policy screen is parsed in memory and discarded when the page closes.

## Offline strategy

`sw.js` uses a versioned cache (`tbfree-v1`).

- **Install:** pre-cache the app shell (`./`, HTML, CSS, JS, manifest, icon) and call `skipWaiting`.
- **Activate:** delete caches whose name is not the current version, then claim clients.
- **Fetch:** cache-first for GET requests; on a miss, go to the network; if that fails, return the cached `index.html`.

**To ship an update, change the cache name** (for example `tbfree-v2`) and update the `FILES` list if files were added. Otherwise returning users keep the old version.

## Testing

`app/tests/logic.test.js` uses the built-in `node:test` runner and covers the screening rules, CSV round-trips, cascade counts, state grouping and calendar output.

```bash
node --test app/tests/
```

Because all rules are in `logic.js`, they are tested without a browser. View code is verified by screenshots: `blog-review/tools/capture.js` drives Chrome through every screen, language and device size.

## Security and privacy notes

- No third-party scripts, fonts or analytics.
- Output escaping through `esc()` for all dynamic content.
- Case-log records use codes rather than names; the app never asks for an identifier.
- The `.ics` reminder title is neutral so a lock screen does not disclose a diagnosis.

## Known limits and extension points

- **Language coverage:** Hausa, Yorùbá, Igbo and Pidgin cover the main screens only. Add keys in `content.js`.
- **No sync:** a health worker's log lives on one device. A future sync service would need consent, encryption and a data-protection assessment first.
- **No facility locator or helpline:** deliberately omitted until a programme supplies verified data.
- **Storage:** `localStorage` is limited to a few MB, which is ample for treatment tracking and a modest case log. Move to IndexedDB if logs grow large.
- **Adding a screen:** add a function to `views`, add a route in the nav, add strings to `content.js` for every language, and put any rules in `logic.js` with a test.
