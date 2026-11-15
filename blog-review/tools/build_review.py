import html, sys, os
OUT = sys.argv[1]
S = 'screenshots/'
LANGS = [('en', 'English'), ('pcm', 'Naijá Pidgin'), ('ha', 'Hausa'), ('yo', 'Yorùbá'), ('ig', 'Igbo')]

H, M = [], []   # html, markdown parts

def h(level, text):
    H.append(f'<h{level}>{html.escape(text)}</h{level}>'); M.append('#' * level + ' ' + text + '\n')
def p(text, cls=''):
    H.append(f'<p class="{cls}">{text}</p>'); M.append(text.replace('<b>', '**').replace('</b>', '**').replace('<i>', '*').replace('</i>', '*') + '\n')
def ul(items):
    H.append('<ul>' + ''.join(f'<li>{i}</li>' for i in items) + '</ul>')
    M.append('\n'.join('- ' + i.replace('<b>', '**').replace('</b>', '**') for i in items) + '\n')
import base64, io
from PIL import Image
_cache = {}
def data_uri(f):
    # Embed a compressed JPEG so review.html works in any viewer (no relative paths needed)
    if f not in _cache:
        im = Image.open(f'{OUT}/{S}{f}').convert('RGB')
        maxw = 1000 if f.startswith('web-') else 520
        if im.width > maxw:
            im = im.resize((maxw, round(im.height * maxw / im.width)), Image.LANCZOS)
        b = io.BytesIO(); im.save(b, 'JPEG', quality=80, optimize=True)
        _cache[f] = 'data:image/jpeg;base64,' + base64.b64encode(b.getvalue()).decode()
    return _cache[f]
def img(f, alt, cls):
    return f'<img class="{cls}" src="{data_uri(f)}" alt="{html.escape(alt)}">'
def pair(name, caption, alt):
    H.append(f'<figure><div class="pair">{img("web-"+name+".png", alt+" (web)", "w")}{img("m-"+name+".png", alt+" (mobile)", "m")}</div>'
             f'<figcaption><b>Left:</b> web (1280 px wide). <b>Right:</b> phone (390 px wide). {caption}</figcaption></figure>')
    M.append(f'![{alt} - web]({S}web-{name}.png)\n\n![{alt} - mobile]({S}m-{name}.png)\n\n*{caption}*\n')
def callout(text):
    H.append(f'<div class="callout">{text}</div>'); M.append('> ' + text.replace('<b>', '**').replace('</b>', '**') + '\n')

H.append('''<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>TB Free: A Hands-On Review</title><style>
:root{--ink:#14201c;--mute:#4d5f58;--brand:#0b6b57;--bg:#fff;--soft:#f1f6f4;--line:#d5e0dc}
@media (prefers-color-scheme:dark){:root{--ink:#e8f1ee;--mute:#a3b6af;--brand:#35c2a1;--bg:#0f1714;--soft:#17221e;--line:#2b3b36}}
body{margin:0;background:var(--bg);color:var(--ink);font:18px/1.65 Georgia,'Times New Roman',serif}
main{max-width:860px;margin:0 auto;padding:24px 16px 80px}
h1{font:800 2.1rem/1.2 system-ui,sans-serif;margin:.3em 0}h2{font:700 1.5rem/1.3 system-ui,sans-serif;margin:2em 0 .4em;border-bottom:2px solid var(--brand);padding-bottom:4px}
h3{font:700 1.15rem system-ui,sans-serif;margin:1.6em 0 .3em}
.lede{font-size:1.2rem;color:var(--mute)}
figure{margin:22px 0;background:var(--soft);border:1px solid var(--line);border-radius:12px;padding:12px}
.pair{display:flex;gap:14px;align-items:flex-start;justify-content:center}
.pair img.w{width:100%;max-width:520px;border:1px solid var(--line);border-radius:6px}
.pair img.m{width:210px;max-width:36%;border:1px solid var(--line);border-radius:10px}
figcaption{font:.88rem/1.4 system-ui,sans-serif;color:var(--mute);margin-top:8px}
.callout{background:var(--soft);border-left:5px solid var(--brand);padding:10px 14px;border-radius:6px;font-family:system-ui,sans-serif;font-size:.98rem;margin:16px 0}
table{border-collapse:collapse;width:100%;font:.92rem system-ui,sans-serif;margin:12px 0}th,td{border:1px solid var(--line);padding:7px;text-align:left;vertical-align:top}th{background:var(--soft)}
.langgrid{display:grid;grid-template-columns:repeat(3,1fr);gap:8px}.langgrid img{width:100%;border:1px solid var(--line);border-radius:8px}
.lang{background:var(--soft);border:1px solid var(--line);border-radius:12px;padding:12px;margin:18px 0}
.lang h3{margin-top:0}
.webrow img{width:100%;border:1px solid var(--line);border-radius:6px;margin-top:8px}
p.small{font:.85rem system-ui,sans-serif;color:var(--mute)}
</style></head><body><main>''')

h(1, 'TB Free: a hands-on review of a free, offline TB tool for Nigeria')
p('Tuberculosis is curable, and testing and treatment are free at government DOTS centres in Nigeria. Yet people still delay care because of stigma, misbeliefs, cost and distance. <b>TB Free</b> is a free web app built for four audiences at once: the public, people on treatment, frontline health workers and policy makers. This review walks through every feature, on a laptop and on a phone, in all five languages.', 'lede')
callout('<b>Status, stated up front:</b> TB Free is a working prototype, not a clinically approved product. Its medical text has not yet been reviewed by the national TB programme, the Hausa, Yorùbá, Igbo and Pidgin text is draft, and the dashboard demo uses invented data. Nothing has yet been tested with real patients or nurses.')

h(2, 'At a glance')
H.append('''<table><tr><th>Question</th><th>Answer</th></tr>
<tr><td>Cost</td><td>Free. No account, no ads, no paywall, no tracking.</td></tr>
<tr><td>Who is it for?</td><td>Public, patients, health workers, policy makers.</td></tr>
<tr><td>Works offline?</td><td>Yes. I switched the network off and all five main pages still loaded after a first visit.</td></tr>
<tr><td>Where does data go?</td><td>It stays in the browser on the device. Nothing is uploaded. The dashboard reads CSV files locally.</td></tr>
<tr><td>Languages</td><td>English, Naijá Pidgin, Hausa, Yorùbá, Igbo (partly translated: see the Languages section).</td></tr>
<tr><td>Devices</td><td>Phone, tablet, laptop. Installs on a phone's home screen like an app.</td></tr>
<tr><td>Size</td><td>No external fonts, libraries or images. It is a few small files, which suits slow connections and cheap phones.</td></tr></table>''')
M.append('''| Question | Answer |\n|---|---|\n| Cost | Free. No account, no ads, no paywall, no tracking. |\n| Who is it for? | Public, patients, health workers, policy makers. |\n| Works offline? | Yes. With the network off, all five main pages still loaded after a first visit. |\n| Where does data go? | It stays in the browser on the device. Nothing is uploaded. |\n| Languages | English, Naijá Pidgin, Hausa, Yorùbá, Igbo (partly translated). |\n| Devices | Phone, tablet, laptop; installable. |\n''')
p('<i>How the screenshots were made:</i> a real Chrome browser at 1280 px wide for "web" and 390 px wide at 2x resolution for "phone". Every screen shows sample or demo data, and none is a real person.', 'small')

h(2, '1. The home screen: one door per audience')
p('The home page opens with the one fact that matters most: TB is curable and care is free. Below it, five large cards route people by who they are rather than by feature. A person with a cough taps <i>Do I have TB signs?</i>, a patient taps <i>I am on TB treatment</i>, and so on. The bottom navigation bar follows the same split, so a health worker never has to wade through patient content.')
pair('01-home', 'The role cards are big touch targets, with text sized for low-end phones.', 'Home screen')

h(2, '2. For the general public')
h(3, 'Learn: what to do, and myths versus facts')
p('This page gives the practical next steps in plain language, such as which test to ask for (a GeneXpert rapid test), what a sputum sample is, and how long treatment lasts. It then takes on eight common myths one by one, including witchcraft and curses, sharing plates, "stop when you feel better" and "children cannot get TB". Each myth is a tap-to-open card with the fact underneath.')
pair('02-learn', 'Free-testing note, next steps and the myth list.', 'Learn page')
pair('02b-learn-myths-open', 'Two myths expanded.', 'Learn page with myths open')
h(3, 'Check: a private symptom and risk self-check')
p('Seven symptoms and six risk factors, as big tick boxes. The result updates instantly with each tick. Nothing is saved or sent. It has four outcomes, and a more serious one is never hidden behind a gentler one.')
pair('03-check-empty', 'Before anything is ticked.', 'Self-check, empty')
pair('04-check-result-test', 'Cough for 2+ weeks, night sweats and HIV ticked: "get a free TB test", plus a prompt to also ask for an HIV test.', 'Self-check, test advised')
pair('05-check-result-urgent', 'Coughing blood is red and urgent: go to a clinic today.', 'Self-check, urgent')
pair('06-check-result-watch', 'Fever alone: a softer "keep watching" message, never a false all-clear.', 'Self-check, watch')
callout('<b>Why it matters:</b> the app never says "you have TB" or "you do not". It says what to do next and repeats that only a test confirms TB. A close contact of someone with TB is told to be screened even with no symptoms.')

h(2, '3. For people on TB treatment')
p('The treatment lasts months, and missed doses are the main way TB turns into the harder drug-resistant form. This section is a private daily companion.')
h(3, 'Set up')
p('Pick the start date and length (6 months is the usual for drug-sensitive TB, with 4, 9, 12 or custom options), and it says to confirm the exact length with the health worker.')
pair('07-patient-setup', 'Two fields and a Save button.', 'Treatment setup')
h(3, 'Daily tracker')
p('Shows "Day 25 of 180", a progress bar, doses ticked, and adherence so far. One big button records today. A four-week calendar lets you tap any day to fix a mistake. If adherence drops below 90%, a red line tells the person to talk to their health worker, as in the demo below at 80%.')
pair('08-patient-tracker', 'Demo data: 24 days in, four days missed. This is the whole patient page, scrolled.', 'Patient tracker')
h(3, 'Reminders without a stigma trap')
p('Browsers cannot reliably ring an alarm when closed, so rather than pretend, the app downloads a <b>daily calendar alarm</b> to the phone. Its name is just "Take my medicine", with no mention of TB, so nosy neighbours or family do not learn the diagnosis from a lock-screen notification.')
h(3, 'Side effects as a traffic light')
p('Eight common problems, each tagged <i>Normal</i>, <i>Tell your nurse</i> or <i>Go to clinic today</i>. Orange urine is normal. Yellow eyes, blurred vision or hearing loss are urgent. Further down are missed-dose rules (never double up, and tell the clinic after two missed days) and a section on rights and support.')
pair('09-patient-sideeffects-open', 'All side-effect cards expanded.', 'Side effects')
p('A red "Delete my data from this phone" button sits at the bottom of the page.')

h(2, '4. For frontline health workers')
p('Three tools on one page, designed for a busy clinic: screen, log, refer.')
h(3, '1) Presumptive TB screen')
p('Choose a group (adult or adolescent, child under 15, or person living with HIV), tick findings, and get a recommended action. The rules differ by group: for people with HIV, <i>any</i> one of cough, fever, night sweats or weight loss triggers testing, while for adults it takes a cough of two weeks or more, or two other signs. The output says to collect sputum for a rapid Xpert test, offer an HIV test, and apply infection control.')
pair('11-worker-adult-presumptive', 'Adult with cough for 2+ weeks: "Presumptive TB". Screen, log and referral all sit on this one page.', 'Health worker, adult screen')
pair('12-worker-child-contact-tpt', 'A symptom-free child under 5 who is a contact is pointed to TB preventive treatment evaluation, not sent home with nothing.', 'Health worker, child contact')
pair('13-worker-plhiv', 'A person living with HIV with only night sweats still counts as presumptive.', 'Health worker, person with HIV')
callout('<b>Guardrail:</b> a banner reminds staff this is decision support only and the current national guidelines and facility algorithm take precedence.')
h(3, '2) Case log, by code and not by name')
p('Staff enter a patient code (not a name), age, sex, state, stage in the care pathway, HIV status and contacts screened. The list lives on the device, can be deleted row by row, and exports to CSV. The export neutralises spreadsheet formula injection, so a malicious entry cannot run code when opened in Excel.')
h(3, '3) Referral note')
p('Pick a logged case, type the receiving facility, and get a short plain-text note to copy or share. Age decides the wording, so a 6-year-old is labelled as a child.')
pair('14-worker-log-and-referral', 'Three demo cases in the log, and a referral note generated for the child case.', 'Case log and referral')

h(2, '5. For policy makers and programme managers')
p('The dashboard answers one question: <i>where do people drop out of the TB care pathway?</i> It reads a CSV file in the browser (never uploaded) in the same format the health-worker log exports. A "Try with sample data" button shows how it works.')
pair('15-policy-empty', 'The empty state explains the CSV columns and states that files stay in your browser.', 'Policy page, empty')
pair('16-policy-dashboard', 'Cascade bars from screened to completed, plus lost to follow-up, a "Where to look first" list, and a state-by-state table with weak spots in red.', 'Policy dashboard')
ul(['<b>Cascade:</b> presumptive, tested, diagnosed, started treatment, completed. Each step shows its percentage of the previous step.',
    '<b>Flags with editable thresholds:</b> the demo defaults to 85% tested, 90% started, 10% lost and 20% HIV unknown, and a policy maker can change every threshold to match their programme target.',
    '<b>By state:</b> a table that colours the worst performers.',
    '<b>Safety:</b> a permanent amber banner reads "SAMPLE DATA: synthetic and invented. Not real Nigerian statistics."'])
callout('<b>Read the numbers carefully:</b> the demo figures are random by design, so no conclusion about any real state can be drawn from the screenshot. A real file would replace them.')

h(2, '6. Languages')
p('Five languages, switched from the selector at the top right. The choice is remembered on the device. Below, each language shows the home page on web and phone, and the self-check result and patient tracker on a phone.')
callout('<b>What is and is not translated:</b> the headline, navigation, role cards, all symptom and risk questions, the result headline, the "free" reminder and the main buttons are translated. The longer reading material (next steps, myths, side effects, health-worker and policy pages, subtitles under the role cards) is still English. All non-English text is a draft that needs review by native speakers and the TB programme before public release.')
for code, name in LANGS:
    H.append(f'<div class="lang"><h3>{name}</h3><div class="langgrid">'
             f'{img(f"m-lang-{code}-home.png", name+" home, mobile", "m")}{img(f"m-lang-{code}-check-result.png", name+" self-check result, mobile", "m")}{img(f"m-lang-{code}-patient.png", name+" patient tracker, mobile", "m")}</div>'
             f'<div class="webrow">{img(f"web-lang-{code}-home.png", name+" home, web", "w")}</div>'
             f'<p class="small">Phone: home, self-check result, patient tracker. Below: web home.</p></div>')
    M.append(f'### {name}\n\n![{name} home mobile]({S}m-lang-{code}-home.png)\n\n![{name} self-check mobile]({S}m-lang-{code}-check-result.png)\n\n![{name} patient tracker mobile]({S}m-lang-{code}-patient.png)\n\n![{name} home web]({S}web-lang-{code}-home.png)\n')

h(2, '7. Phone versus laptop')
p('The same page adapts. On a laptop the content is a centred reading column with generous space, and the dashboard table fits without scrolling. On a phone the layout is a single column, the buttons and tick boxes stay large enough for thumbs, the five-icon bottom bar is always reachable, and wide tables scroll sideways inside their own box rather than breaking the page. I checked that no page overflows sideways at 390 px.')
pair('17-about', 'The About page: privacy promise, limits, and a data-delete button.', 'About page')

h(2, '8. Light and dark mode')
p('The app follows the device setting automatically. Dark mode matters on phones that people use in dim rooms or want to keep discreet.')
pair('dark-home', 'Dark mode, home.', 'Dark mode home')
pair('dark-policy', 'Dark mode, dashboard with sample data.', 'Dark mode dashboard')

h(2, '9. Privacy, offline, and cost')
ul(['<b>Free:</b> no fee, no account, no advertising.',
    '<b>Private:</b> everything stays on the device, with a delete button in two places. Health workers log codes, never names.',
    '<b>Offline:</b> after one visit it loads without internet. I tested all five main pages with the network off.',
    '<b>Light:</b> no heavy images, fonts or libraries.',
    '<b>Accessible:</b> large tap targets, high-contrast colours, keyboard navigation, screen-reader labels, and reduced-motion support.'])

h(2, '10. Verdict')
h(3, 'What works well')
ul(['One app, four audiences, and the role-based home screen keeps each audience focused.',
    'It is careful about stigma and privacy: a discreet alarm name, codes not names, local-only data.',
    'The self-check and screening tools never overclaim, and they always point to a real test.',
    'The dashboard turns a plain CSV into "where to look first", with thresholds the programme controls.',
    'It works offline and on small screens.'])
h(3, 'What is not done yet')
ul(['<b>No clinical sign-off.</b> The medical text needs review by the National TB, Leprosy and Buruli Ulcer Control Programme or a state programme.',
    '<b>Translations are partial drafts</b> and need native-speaker review.',
    '<b>No verified helpline or clinic finder.</b> I left these out on purpose rather than publish unverified numbers.',
    '<b>Untested with real users.</b> The biggest open question is whether the people most affected have smartphones and would use it. The customer-discovery plan in the project (<i>MOM_TEST.md</i>) and a printable interview sheet are ready, but no interviews have happened, so by that test it has <b>not passed</b>.',
    '<b>Reminders depend on the phone calendar</b>, not on push notifications.',
    '<b>The dashboard is only as good as the data fed in.</b> It does not connect to national systems.'])
p('<b>Bottom line:</b> as a free prototype that is honest about its limits, it is a strong start. Before it goes to patients, it needs clinical review, native-speaker translations and real conversations with the people it is meant to help.')

H.append('</main></body></html>')
open(OUT + '/review.html', 'w').write('\n'.join(H))
open(OUT + '/review.md', 'w').write('\n'.join(M))
# sanity: every referenced image exists
import re
print('embedded images:', len(_cache), '| html size MB:', round(os.path.getsize(OUT + '/review.html') / 1e6, 1))
