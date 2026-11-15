# Design

This document explains who TB Free is for, the principles behind it, and the visual, language and accessibility choices that follow from them.

## Audiences

| Audience | Situation | What they need |
|---|---|---|
| **General public** | May have a cough and be unsure it is TB; may fear stigma. | Plain facts, a private self-check, a clear next step. |
| **Patients on treatment** | Six months of daily medicine; side effects; missed doses. | A daily routine, reminders that do not reveal the illness, guidance on what is normal and what is not. |
| **Frontline health workers** | Busy clinics, limited time, shared phones. | A fast screen, a referral note, a simple case log. |
| **Policy makers** | Programme managers who hold data in spreadsheets. | The care cascade and state-level gaps from their own CSV. |

The home screen is a role picker so each person reaches their tool in one tap.

## Design principles

1. **Free, with no barriers.** No account, no paywall, no advert.
2. **Private by default.** Nothing leaves the device. Reminder text is neutral. Records use codes.
3. **Works where people are.** Offline-first, low-end Android, small download, 390 px phones first.
4. **Say what to do.** Every result ends in an action: go to a facility, get tested, keep watching, keep taking medicine.
5. **Never alarm without cause, never reassure falsely.** The self-check has four graded outcomes. "Low" still advises seeing a clinician if symptoms appear.
6. **Plain language.** Short sentences, no jargon. Myths are written as the thing people actually say, followed by the fact.
7. **Respect the clinician.** Rules follow WHO screening guidance and are kept in one reviewable file.

## Screen map

```
Home (role picker)
├── Learn      myths and facts, next steps
├── Check      self-check ──► result: urgent | test | watch | low
├── My treatment   setup ──► daily tracker, alarm, side effects, missed doses, rights
├── Health worker  screen (adult | child | people with HIV) ──► case log ──► referral note
├── Policy     load CSV or sample ──► cascade, flags by state, thresholds
└── About
```

Primary navigation is a fixed bar at the bottom of the screen, within thumb reach on a phone.

## Visual system

### Colour

Colours are CSS custom properties defined once in `styles.css`, with a full dark theme that follows the device setting.

| Token | Light | Dark | Use |
|---|---|---|---|
| `--bg` | `#f7faf9` | `#0f1714` | Page background |
| `--card` | `#ffffff` | `#17221e` | Cards, header |
| `--ink` | `#14201c` | `#e8f1ee` | Body text |
| `--mute` | `#4d5f58` | `#a3b6af` | Secondary text |
| `--brand` | `#0b6b57` | `#35c2a1` | Brand, buttons, links |
| `--ok` / `--okbg` | `#0b6b57` / `#e4f4ee` | `#7fe3c6` / `#12352b` | Reassuring result |
| `--warn` / `--warnbg` | `#9a5b00` / `#fff4de` | `#f2c36b` / `#3a2d10` | Get tested, tell your nurse |
| `--bad` / `--badbg` | `#a4161a` / `#fde8e8` | `#ff9a9a` / `#3a1618` | Urgent, go to clinic today |

Green is the brand colour and is deliberately calm. Red is kept for real urgency only.

**Colour is never the only signal.** Every traffic-light result also carries a text label ("Normal", "Tell your nurse", "Go to clinic today"), so the app works for colour-blind users and in bright sunlight.

### Typography

System font stack (`system-ui`, `-apple-system`, `Segoe UI`, `Roboto`) at a 17 px base. No web fonts are downloaded, which saves data and renders instantly. Yorùbá tone marks and Igbo dot-below characters render correctly in system fonts.

### Layout and components

- Single column, `max-width: 760px`, centred; 16 px page padding.
- Cards for grouped content, sticky header, fixed bottom navigation.
- Touch targets at least 44 px high for inputs, selects and buttons.
- Collapsible `<details>` blocks for myths and side effects, so pages stay short.
- Result banners (`ok`, `test`, `warn`, `bad`) combine colour, a heading and a sentence.
- Policy charts are drawn with simple bars using `--bar` and `--bar2`, so they follow the theme without a chart library.

## Language and tone

- Five languages: English, Naijá Pidgin, Hausa, Yorùbá and Igbo. The selector is always in the header.
- Text lives in `content.js`, so translators never edit logic.
- Non-English strings are drafts. They must be reviewed by native speakers before public release.
- Tone is warm and direct, never blaming. TB is described as curable, and treatment as free.
- Medical wording follows the national programme where possible; place names and helplines are added only when verified.

## Accessibility

- Semantic HTML: `header`, `main`, `nav`, headings in order, `label` for every control.
- A "skip to content" link and a visually hidden text class for screen readers.
- Visible focus styles, full keyboard operation, and `aria-label` on controls without visible text.
- Contrast chosen for body text and status banners in both themes.
- Respects the device's light or dark preference.
- No flashing, no timers and no auto-playing media.
- Layouts verified at 390 px wide with no horizontal scrolling.

## Privacy in the interface

- The reminder file names the event "Take my medicine", never "TB".
- The case log asks for a code, not a name.
- A visible "clear my data" action removes everything the app has stored.
- No cookie banner is needed because the app sets no cookies and loads no third-party content.

## Content safety rules

- The app informs and triages; it does **not** diagnose.
- Coughing blood always produces the most urgent outcome.
- Side effects are grouped as normal, tell your nurse, or go to clinic today.
- Missed-dose guidance tells people to contact their clinic and never to double doses.
- Children and people living with HIV have their own screening rules and their own wording.

## Open design questions

- How much of the interface should use icons for people with low literacy, and how should audio support work offline?
- Should there be a printed or SMS companion for people without smartphones?
- Which verified facility and helpline data can be included, and who maintains it?
- What review process should a state TB programme use to approve content changes?
