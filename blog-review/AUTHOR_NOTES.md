# Author notes (not for publishing)

**Files**
- `review.html`: blog-ready page. Keep the `screenshots/` folder beside it.
- `review.md`: same content in Markdown, for blog platforms that take Markdown. Upload the `screenshots/` images and fix the paths.
- `screenshots/`: 70 PNGs. Names: `web-*` (1280 px) and `m-*` (390 px at 2x). Full-page shots are tall by design.

**Be upfront in the post about**
- All data in the screenshots is demo/synthetic. The dashboard numbers are invented.
- Clinical text, translations and a verified helpline are still pending.
- No real users have tested it. The Mom Test (`../MOM_TEST.md`) is not passed.

**Fixed while taking the screenshots (so the post matches the app)**
- A hidden "number of days" field was visible in the treatment setup.
- The referral note used the last logged case and the wrong age group. It now lets you pick the case and labels children correctly.
- Clipped "Contacts screened" field widened.

**Known rough edges you may notice**
- On a phone the case-log table scrolls sideways, so the delete button can be off-screen until you swipe.
- Non-English screens keep English subtitles and long text.
- Screenshots show the app's 'Tuberculosis (TB) is curable' hero text in English even in other languages: only the headline is translated.

**To re-shoot after any change** (needs Node and Google Chrome):
```bash
npm i puppeteer-core
python3 -m http.server 8765 --directory ../app &
node tools/capture.js screenshots && python3 tools/build_review.py .
```
