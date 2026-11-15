# TB Free

A free, offline-capable web app for TB in Nigeria and other high-burden tropical countries. It serves the public, patients, frontline health workers and policy makers. No account, no ads, no server, no tracking.

## Run
```bash
python3 -m http.server 8765 --directory app   # then open http://localhost:8765
node --test app/tests/                         # logic tests
```
Deploy by copying `app/` to any static host (GitHub Pages, Netlify, a ministry server). It is installable on phones as a PWA and works offline after the first visit.

## What is in it
- **Learn / Check**: myths and facts, next steps, private symptom and risk self-check (5 languages: English, Pidgin, Hausa, Yorùbá, Igbo; the non-English text covers the main screens and is a draft).
- **My treatment**: daily dose tracker, calendar alarm download with a neutral "Take my medicine" name, side-effect traffic lights, missed-dose guidance, rights and support.
- **Health worker**: presumptive-TB screen (adult / child / people with HIV), case log by code with CSV export, referral note.
- **Policy**: load a CSV and see the care cascade, flags by state and editable thresholds. The built-in sample is synthetic.

## Before public release
1. Clinical review and sign-off by the NTBLCP or a state TB programme.
2. Native-speaker review of Hausa, Yorùbá, Igbo and Pidgin.
3. Verified helpline and facility-locator data from the programme (not included on purpose).
4. Complete the Mom Test in [MOM_TEST.md](MOM_TEST.md). Current verdict: **not passed**, because no real interviews have been done.
5. Choose an open-source licence.
