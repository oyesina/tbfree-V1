# Mom Test: TB Free

Method: Rob Fitzpatrick's *The Mom Test*. Rules: (1) talk about their life, not your idea; (2) ask about specific past events, not opinions or future promises; (3) seek facts and commitments, not compliments.

## 1. Honest status

| Part | Status |
|---|---|
| Desk audit of assumptions against published evidence | **Done** (section 3) |
| Interview kit (questions, bad vs good, pass bar) | **Done** (sections 4–5) |
| Real conversations with patients, nurses, policy makers | **NOT DONE.** I cannot interview people and will not invent quotes. Needs you or a field partner. |
| Overall verdict | **NOT PASSED. Provisionally promising.** The pass can only be earned by evidence in section 6. |

## 2. Core assumptions (riskiest first)

| # | Assumption | Evidence so far | Status |
|---|---|---|---|
| A1 | People with TB symptoms delay care mainly from stigma, misbeliefs, cost and poor access, not lack of an app | Nigerian qualitative studies (below) | Supported for *barriers*; **unproven that a phone tool changes behaviour** |
| A2 | Target users have a smartphone, data and literacy | None gathered | **Unverified. Biggest risk.** The people most affected may rely on feature phones, radio, community workers |
| A3 | Frontline workers lack a tool they would use over paper registers / existing systems (e.g. national reporting) | None | **Unverified** |
| A4 | Patients forget doses / drop out for reasons a reminder fixes | Studies point to stigma, cost, side effects as drivers | **Weak.** Reminders may not be the bottleneck |
| A5 | Policy makers lack cascade visibility they would act on | None. They likely already have national data | **Unverified** |
| A6 | Free, offline, no-account will be trusted | None | **Unverified.** Trust may need endorsement by NTBLCP / local clinics |

### Evidence used
- Meta-synthesis of Nigerian TB barriers and facilitators: [BMC Public Health 2021](https://bmcpublichealth.biomedcentral.com/articles/10.1186/s12889-021-10173-5/tables/2). Themes: individual, interpersonal, health-system factors; case finding relies on patients self-presenting.
- Southern Nigeria DOTS study: beliefs about causes (e.g. witchcraft) and perceived cost deter orthodox care ([Okeibunor 2006](https://pmc.ncbi.nlm.nih.gov/articles/PMC4696418), per search summary).
- Stigma making women delay care (Ebonyi, Oshi 2016); delayed access in Oyo State ([Frontiers in Sociology 2024](https://www.frontiersin.org/journals/sociology/articles/10.3389/fsoc.2024.1378586/pdf)).
- Burden figures (about 510,000 estimated new cases in 2024; incidence not falling) come from news coverage of the 2025 WHO report ([Africa Check](https://africacheck.org/spot-check/burden-of-tb-in-nigeria-weighs-heavier-new-data-shows/)). **Verify against WHO before quoting.** I read only search summaries, not the full papers.

### What this means for the build
Desk evidence says stigma, misbeliefs and cost matter. The app addresses stigma with private use, myths/facts and a discreet reminder. It cannot address cost or distance. A2 and A4 stay open.

## 3. Mom Test audit of my own process

- **Fluff risk:** The idea came from you, not from users. Treat the whole app as a hypothesis.
- **Fixed:** I cut claims I could not source (no hotline numbers, no invented statistics, sample data labelled synthetic).
- **Open:** Language drafts and clinical text are unreviewed. That is a trust risk, not a validation.

## 4. Interview kit (run 5+ per segment before building more)

Never mention the app first. Never ask "would you use…?"

**Patient / recent patient (or caregiver)**
- Walk me through the day you first noticed the cough. What did you do next? Who did you tell?
- Where did you go first? What did that cost you, in money and days?
- Tell me about the last time you missed or nearly missed a dose. What was happening?
- What phone do you have? Last time you looked up a health question, how did you do it?
- Who knows you have TB? How did you decide that?

**Frontline worker (DOTS nurse, CHEW, volunteer)**
- Tell me about the last patient who stopped coming. What did you do?
- Show me how you record a case today. What is the most annoying part?
- Last time you referred someone, how did you know they arrived?
- What do you already use on your phone for work?

**Policy maker / programme officer**
- Last time a decision on TB funding or staffing was made, what data did you use? What was missing?
- What report do you wait longest for? What did you do while waiting?
- Have you tried to adopt a digital tool before? What happened?

**Public / community leader**
- Last time someone near you had a long cough, what happened?
- Where do people here get health information? Who do they trust?

**Bad vs good:** "Do you think a TB app is useful?" (opinion) → "How did you last look for health information?" (past fact).

## 5. Pass bar (set before interviewing, so it cannot be bent later)

Per segment, after at least 5 interviews:
- At least 3 of 5 describe the problem unprompted, with a **specific recent example**.
- At least 2 are **already spending time, money or workarounds** on it.
- At least 1 gives a **commitment** when shown a prototype: time (a 2-week field trial), reputation (introduces a colleague or their programme), or data (shares a real record format).
- Compliments ("nice idea") and "I'd definitely use it" count as **zero**.

**Kill/pivot signals:** most patients lack smartphones (pivot to USSD/SMS/IVR/radio or tools for community workers); nurses already have a workable system (drop the worker module); no policy maker will share data.

## 6. Evidence log (fill in; one row per conversation)

| Date | Segment | Setting | Specific past event heard | Workaround/spend | Commitment given | Compliment only? |
|---|---|---|---|---|---|---|
| | | | | | | |

**Tally:** Patients 0/5 · Workers 0/5 · Policy 0/5 · Public 0/5 → **Verdict: NOT PASSED**

## 7. Suggested route to real conversations
- Ask the state TB programme or a DOTS facility for introductions (needed for clinical sign-off anyway).
- Use TB survivor networks and community volunteers; offer interviews with consent, no names in notes.
- Keep notes with codes only, matching the app's privacy rule.
