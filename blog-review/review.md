# TB Free: a hands-on review of a free, offline TB tool for Nigeria

Tuberculosis is curable, and testing and treatment are free at government DOTS centres in Nigeria. Yet people still delay care because of stigma, misbeliefs, cost and distance. **TB Free** is a free web app built for four audiences at once: the public, people on treatment, frontline health workers and policy makers. This review walks through every feature, on a laptop and on a phone, in all five languages.

> **Status, stated up front:** TB Free is a working prototype, not a clinically approved product. Its medical text has not yet been reviewed by the national TB programme, the Hausa, Yorùbá, Igbo and Pidgin text is draft, and the dashboard demo uses invented data. Nothing has yet been tested with real patients or nurses.

## At a glance

| Question | Answer |
|---|---|
| Cost | Free. No account, no ads, no paywall, no tracking. |
| Who is it for? | Public, patients, health workers, policy makers. |
| Works offline? | Yes. With the network off, all five main pages still loaded after a first visit. |
| Where does data go? | It stays in the browser on the device. Nothing is uploaded. |
| Languages | English, Naijá Pidgin, Hausa, Yorùbá, Igbo (partly translated). |
| Devices | Phone, tablet, laptop; installable. |

*How the screenshots were made:* a real Chrome browser at 1280 px wide for "web" and 390 px wide at 2x resolution for "phone". Every screen shows sample or demo data, and none is a real person.

## 1. The home screen: one door per audience

The home page opens with the one fact that matters most: TB is curable and care is free. Below it, five large cards route people by who they are rather than by feature. A person with a cough taps *Do I have TB signs?*, a patient taps *I am on TB treatment*, and so on. The bottom navigation bar follows the same split, so a health worker never has to wade through patient content.

![Home screen - web](screenshots/web-01-home.png)

![Home screen - mobile](screenshots/m-01-home.png)

*The role cards are big touch targets, with text sized for low-end phones.*

## 2. For the general public

### Learn: what to do, and myths versus facts

This page gives the practical next steps in plain language, such as which test to ask for (a GeneXpert rapid test), what a sputum sample is, and how long treatment lasts. It then takes on eight common myths one by one, including witchcraft and curses, sharing plates, "stop when you feel better" and "children cannot get TB". Each myth is a tap-to-open card with the fact underneath.

![Learn page - web](screenshots/web-02-learn.png)

![Learn page - mobile](screenshots/m-02-learn.png)

*Free-testing note, next steps and the myth list.*

![Learn page with myths open - web](screenshots/web-02b-learn-myths-open.png)

![Learn page with myths open - mobile](screenshots/m-02b-learn-myths-open.png)

*Two myths expanded.*

### Check: a private symptom and risk self-check

Seven symptoms and six risk factors, as big tick boxes. The result updates instantly with each tick. Nothing is saved or sent. It has four outcomes, and a more serious one is never hidden behind a gentler one.

![Self-check, empty - web](screenshots/web-03-check-empty.png)

![Self-check, empty - mobile](screenshots/m-03-check-empty.png)

*Before anything is ticked.*

![Self-check, test advised - web](screenshots/web-04-check-result-test.png)

![Self-check, test advised - mobile](screenshots/m-04-check-result-test.png)

*Cough for 2+ weeks, night sweats and HIV ticked: "get a free TB test", plus a prompt to also ask for an HIV test.*

![Self-check, urgent - web](screenshots/web-05-check-result-urgent.png)

![Self-check, urgent - mobile](screenshots/m-05-check-result-urgent.png)

*Coughing blood is red and urgent: go to a clinic today.*

![Self-check, watch - web](screenshots/web-06-check-result-watch.png)

![Self-check, watch - mobile](screenshots/m-06-check-result-watch.png)

*Fever alone: a softer "keep watching" message, never a false all-clear.*

> **Why it matters:** the app never says "you have TB" or "you do not". It says what to do next and repeats that only a test confirms TB. A close contact of someone with TB is told to be screened even with no symptoms.

## 3. For people on TB treatment

The treatment lasts months, and missed doses are the main way TB turns into the harder drug-resistant form. This section is a private daily companion.

### Set up

Pick the start date and length (6 months is the usual for drug-sensitive TB, with 4, 9, 12 or custom options), and it says to confirm the exact length with the health worker.

![Treatment setup - web](screenshots/web-07-patient-setup.png)

![Treatment setup - mobile](screenshots/m-07-patient-setup.png)

*Two fields and a Save button.*

### Daily tracker

Shows "Day 25 of 180", a progress bar, doses ticked, and adherence so far. One big button records today. A four-week calendar lets you tap any day to fix a mistake. If adherence drops below 90%, a red line tells the person to talk to their health worker, as in the demo below at 80%.

![Patient tracker - web](screenshots/web-08-patient-tracker.png)

![Patient tracker - mobile](screenshots/m-08-patient-tracker.png)

*Demo data: 24 days in, four days missed. This is the whole patient page, scrolled.*

### Reminders without a stigma trap

Browsers cannot reliably ring an alarm when closed, so rather than pretend, the app downloads a **daily calendar alarm** to the phone. Its name is just "Take my medicine", with no mention of TB, so nosy neighbours or family do not learn the diagnosis from a lock-screen notification.

### Side effects as a traffic light

Eight common problems, each tagged *Normal*, *Tell your nurse* or *Go to clinic today*. Orange urine is normal. Yellow eyes, blurred vision or hearing loss are urgent. Further down are missed-dose rules (never double up, and tell the clinic after two missed days) and a section on rights and support.

![Side effects - web](screenshots/web-09-patient-sideeffects-open.png)

![Side effects - mobile](screenshots/m-09-patient-sideeffects-open.png)

*All side-effect cards expanded.*

A red "Delete my data from this phone" button sits at the bottom of the page.

## 4. For frontline health workers

Three tools on one page, designed for a busy clinic: screen, log, refer.

### 1) Presumptive TB screen

Choose a group (adult or adolescent, child under 15, or person living with HIV), tick findings, and get a recommended action. The rules differ by group: for people with HIV, *any* one of cough, fever, night sweats or weight loss triggers testing, while for adults it takes a cough of two weeks or more, or two other signs. The output says to collect sputum for a rapid Xpert test, offer an HIV test, and apply infection control.

![Health worker, adult screen - web](screenshots/web-11-worker-adult-presumptive.png)

![Health worker, adult screen - mobile](screenshots/m-11-worker-adult-presumptive.png)

*Adult with cough for 2+ weeks: "Presumptive TB". Screen, log and referral all sit on this one page.*

![Health worker, child contact - web](screenshots/web-12-worker-child-contact-tpt.png)

![Health worker, child contact - mobile](screenshots/m-12-worker-child-contact-tpt.png)

*A symptom-free child under 5 who is a contact is pointed to TB preventive treatment evaluation, not sent home with nothing.*

![Health worker, person with HIV - web](screenshots/web-13-worker-plhiv.png)

![Health worker, person with HIV - mobile](screenshots/m-13-worker-plhiv.png)

*A person living with HIV with only night sweats still counts as presumptive.*

> **Guardrail:** a banner reminds staff this is decision support only and the current national guidelines and facility algorithm take precedence.

### 2) Case log, by code and not by name

Staff enter a patient code (not a name), age, sex, state, stage in the care pathway, HIV status and contacts screened. The list lives on the device, can be deleted row by row, and exports to CSV. The export neutralises spreadsheet formula injection, so a malicious entry cannot run code when opened in Excel.

### 3) Referral note

Pick a logged case, type the receiving facility, and get a short plain-text note to copy or share. Age decides the wording, so a 6-year-old is labelled as a child.

![Case log and referral - web](screenshots/web-14-worker-log-and-referral.png)

![Case log and referral - mobile](screenshots/m-14-worker-log-and-referral.png)

*Three demo cases in the log, and a referral note generated for the child case.*

## 5. For policy makers and programme managers

The dashboard answers one question: *where do people drop out of the TB care pathway?* It reads a CSV file in the browser (never uploaded) in the same format the health-worker log exports. A "Try with sample data" button shows how it works.

![Policy page, empty - web](screenshots/web-15-policy-empty.png)

![Policy page, empty - mobile](screenshots/m-15-policy-empty.png)

*The empty state explains the CSV columns and states that files stay in your browser.*

![Policy dashboard - web](screenshots/web-16-policy-dashboard.png)

![Policy dashboard - mobile](screenshots/m-16-policy-dashboard.png)

*Cascade bars from screened to completed, plus lost to follow-up, a "Where to look first" list, and a state-by-state table with weak spots in red.*

- **Cascade:** presumptive, tested, diagnosed, started treatment, completed. Each step shows its percentage of the previous step.
- **Flags with editable thresholds:** the demo defaults to 85% tested, 90% started, 10% lost and 20% HIV unknown, and a policy maker can change every threshold to match their programme target.
- **By state:** a table that colours the worst performers.
- **Safety:** a permanent amber banner reads "SAMPLE DATA: synthetic and invented. Not real Nigerian statistics."

> **Read the numbers carefully:** the demo figures are random by design, so no conclusion about any real state can be drawn from the screenshot. A real file would replace them.

## 6. Languages

Five languages, switched from the selector at the top right. The choice is remembered on the device. Below, each language shows the home page on web and phone, and the self-check result and patient tracker on a phone.

> **What is and is not translated:** the headline, navigation, role cards, all symptom and risk questions, the result headline, the "free" reminder and the main buttons are translated. The longer reading material (next steps, myths, side effects, health-worker and policy pages, subtitles under the role cards) is still English. All non-English text is a draft that needs review by native speakers and the TB programme before public release.

### English

![English home mobile](screenshots/m-lang-en-home.png)

![English self-check mobile](screenshots/m-lang-en-check-result.png)

![English patient tracker mobile](screenshots/m-lang-en-patient.png)

![English home web](screenshots/web-lang-en-home.png)

### Naijá Pidgin

![Naijá Pidgin home mobile](screenshots/m-lang-pcm-home.png)

![Naijá Pidgin self-check mobile](screenshots/m-lang-pcm-check-result.png)

![Naijá Pidgin patient tracker mobile](screenshots/m-lang-pcm-patient.png)

![Naijá Pidgin home web](screenshots/web-lang-pcm-home.png)

### Hausa

![Hausa home mobile](screenshots/m-lang-ha-home.png)

![Hausa self-check mobile](screenshots/m-lang-ha-check-result.png)

![Hausa patient tracker mobile](screenshots/m-lang-ha-patient.png)

![Hausa home web](screenshots/web-lang-ha-home.png)

### Yorùbá

![Yorùbá home mobile](screenshots/m-lang-yo-home.png)

![Yorùbá self-check mobile](screenshots/m-lang-yo-check-result.png)

![Yorùbá patient tracker mobile](screenshots/m-lang-yo-patient.png)

![Yorùbá home web](screenshots/web-lang-yo-home.png)

### Igbo

![Igbo home mobile](screenshots/m-lang-ig-home.png)

![Igbo self-check mobile](screenshots/m-lang-ig-check-result.png)

![Igbo patient tracker mobile](screenshots/m-lang-ig-patient.png)

![Igbo home web](screenshots/web-lang-ig-home.png)

## 7. Phone versus laptop

The same page adapts. On a laptop the content is a centred reading column with generous space, and the dashboard table fits without scrolling. On a phone the layout is a single column, the buttons and tick boxes stay large enough for thumbs, the five-icon bottom bar is always reachable, and wide tables scroll sideways inside their own box rather than breaking the page. I checked that no page overflows sideways at 390 px.

![About page - web](screenshots/web-17-about.png)

![About page - mobile](screenshots/m-17-about.png)

*The About page: privacy promise, limits, and a data-delete button.*

## 8. Light and dark mode

The app follows the device setting automatically. Dark mode matters on phones that people use in dim rooms or want to keep discreet.

![Dark mode home - web](screenshots/web-dark-home.png)

![Dark mode home - mobile](screenshots/m-dark-home.png)

*Dark mode, home.*

![Dark mode dashboard - web](screenshots/web-dark-policy.png)

![Dark mode dashboard - mobile](screenshots/m-dark-policy.png)

*Dark mode, dashboard with sample data.*

## 9. Privacy, offline, and cost

- **Free:** no fee, no account, no advertising.
- **Private:** everything stays on the device, with a delete button in two places. Health workers log codes, never names.
- **Offline:** after one visit it loads without internet. I tested all five main pages with the network off.
- **Light:** no heavy images, fonts or libraries.
- **Accessible:** large tap targets, high-contrast colours, keyboard navigation, screen-reader labels, and reduced-motion support.

## 10. Verdict

### What works well

- One app, four audiences, and the role-based home screen keeps each audience focused.
- It is careful about stigma and privacy: a discreet alarm name, codes not names, local-only data.
- The self-check and screening tools never overclaim, and they always point to a real test.
- The dashboard turns a plain CSV into "where to look first", with thresholds the programme controls.
- It works offline and on small screens.

### What is not done yet

- **No clinical sign-off.** The medical text needs review by the National TB, Leprosy and Buruli Ulcer Control Programme or a state programme.
- **Translations are partial drafts** and need native-speaker review.
- **No verified helpline or clinic finder.** I left these out on purpose rather than publish unverified numbers.
- **Untested with real users.** The biggest open question is whether the people most affected have smartphones and would use it. The customer-discovery plan in the project (<i>MOM_TEST.md</i>) and a printable interview sheet are ready, but no interviews have happened, so by that test it has **not passed**.
- **Reminders depend on the phone calendar**, not on push notifications.
- **The dashboard is only as good as the data fed in.** It does not connect to national systems.

**Bottom line:** as a free prototype that is honest about its limits, it is a strong start. Before it goes to patients, it needs clinical review, native-speaker translations and real conversations with the people it is meant to help.
