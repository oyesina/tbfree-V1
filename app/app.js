(function () {
  'use strict';
  const L = window.TBLogic, C = window.CONTENT;
  const $ = s => document.querySelector(s);
  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const store = {
    get(k, d) { try { const v = localStorage.getItem('tbf.' + k); return v ? JSON.parse(v) : d; } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem('tbf.' + k, JSON.stringify(v)); } catch (e) { } },
    clear() { try { Object.keys(localStorage).filter(k => k.indexOf('tbf.') === 0).forEach(k => localStorage.removeItem(k)); } catch (e) { } }
  };
  let lang = store.get('lang', 'en');
  if (!window.I18N[lang]) lang = 'en';
  const t = k => (window.I18N[lang] && window.I18N[lang][k]) || window.I18N.en[k] || k;
  const iso = d => { const z = new Date(d.getTime() - d.getTimezoneOffset() * 60000); return z.toISOString().slice(0, 10); };
  const today = () => iso(new Date());
  const download = (name, text, type) => {
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([text], { type: type || 'text/plain' }));
    a.download = name; document.body.appendChild(a); a.click(); a.remove();
  };

  // ---------- Views ----------
  const views = {};

  views.home = () => `
    <section class="hero"><h1>${esc(t('tagline'))}</h1>
      <p>Free for everyone. No account. No ads. Works without internet after the first visit. Your information stays on your phone.</p></section>
    <div class="grid two" style="margin-top:12px">
      <a class="role" href="#/learn">${esc(t('role_public'))}<small>Facts, myths, what to do next</small></a>
      <a class="role" href="#/check">${esc(t('role_check'))}<small>2-minute private self-check</small></a>
      <a class="role" href="#/patient">${esc(t('role_patient'))}<small>Daily tracker, reminders, side effects</small></a>
      <a class="role" href="#/worker">${esc(t('role_worker'))}<small>Screening aid, referral note, case log</small></a>
      <a class="role" href="#/policy">${esc(t('role_policy'))}<small>Cascade dashboard from your own data</small></a>
      <a class="role" href="#/about">About, privacy and sources<small>Open and free to reuse</small></a>
    </div>
    <p class="banner">Draft for review: clinical content must be checked by your national or state TB programme before wide release. This tool supports, and never replaces, a health worker.</p>`;

  views.learn = () => `
    <h1>${esc(t('role_public'))}</h1>
    <div class="res test">${esc(t('free_note'))}</div>
    <h2>What to do if you think you have TB</h2>
    <ol>${C.nextSteps.map(s => `<li>${esc(s)}</li>`).join('')}</ol>
    <h2>Myths and facts</h2>
    ${C.myths.map(m => `<details><summary>“${esc(m[0])}”</summary><p><b>Fact:</b> ${esc(m[1])}</p></details>`).join('')}
    <p><a class="btn" href="#/check">${esc(t('role_check'))}</a></p>`;

  const checkKeys = [['cough2w', 'q_cough2w'], ['blood', 'q_blood'], ['fever', 'q_fever'], ['sweats', 'q_sweats'], ['weightloss', 'q_weightloss'], ['fatigue', 'q_fatigue'], ['chestpain', 'q_chestpain'],
  ['contact', 'q_contact'], ['hiv', 'q_hiv'], ['diabetes', 'q_diabetes'], ['underweight', 'q_underweight'], ['smoker', 'q_smoker'], ['priortb', 'q_priortb']];
  views.check = () => `
    <h1>${esc(t('role_check'))}</h1>
    <p class="mute">Tick anything that applies. Nothing is saved or sent anywhere.</p>
    <form id="chk">${checkKeys.map(([k, q], i) => `${i === 7 ? '<h3>Risk factors</h3>' : i === 0 ? '<h3>Symptoms</h3>' : ''}
      <label class="chk"><input type="checkbox" name="${k}"> <span>${esc(t(q))}</span></label>`).join('')}</form>
    <div id="chkres" role="status"></div>`;
  views.check.after = () => {
    const f = $('#chk'), out = $('#chkres');
    const run = () => {
      const a = {}; f.querySelectorAll('input').forEach(i => a[i.name] = i.checked);
      const any = Object.values(a).some(Boolean);
      const r = L.assessPublic(a);
      if (!any) { out.innerHTML = ''; return; }
      out.innerHTML = `<div class="res ${r.level}">${esc(t('res_' + r.level))}</div>
        ${r.codes.map(c => C.codes[c] ? `<p>${esc(C.codes[c])}</p>` : '').join('')}
        ${r.level !== 'low' ? `<p>${esc(t('free_note'))}</p><ol>${C.nextSteps.slice(0, 3).map(s => `<li>${esc(s)}</li>`).join('')}</ol>` : ''}
        <p class="mute">This is guidance, not a diagnosis. Only a test can confirm TB.</p>`;
    };
    f.addEventListener('change', run);
  };

  // ----- Patient -----
  const getTx = () => store.get('tx', null);
  views.patient = () => {
    const tx = getTx();
    if (!tx) return `<h1>${esc(t('role_patient'))}</h1>
      <p>Set up your tracker. Ask your health worker for your exact treatment length.</p>
      <form id="txsetup" class="card">
        <label class="f" for="st">Treatment start date</label><input id="st" type="date" value="${today()}" max="${today()}" required>
        <label class="f" for="mo">Treatment length</label>
        <select id="mo"><option value="6" selected>6 months (usual for drug-sensitive TB)</option><option value="4">4 months</option><option value="9">9 months</option><option value="12">12 months</option><option value="custom">Other: ask your nurse</option></select>
        <label class="f" for="dy" id="dylab" hidden>Number of days</label><input id="dy" type="number" min="30" max="730" value="180" hidden>
        <p><button type="submit">${esc(t('save'))}</button></p></form>
      <p class="mute">Your data stays on this phone only.</p>`;
    const total = tx.days, start = new Date(tx.start + 'T00:00:00');
    const dayN = Math.max(1, Math.floor((new Date(today() + 'T00:00:00') - start) / 864e5) + 1);
    const doses = Object.keys(tx.taken).filter(k => tx.taken[k]).length;
    const elapsed = Math.min(dayN, total);
    const adh = Math.round((doses / elapsed) * 100);
    const cells = []; for (let i = 27; i >= 0; i--) { const d = new Date(); d.setDate(d.getDate() - i); cells.push(iso(d)); }
    const isTaken = tx.taken[today()];
    return `<h1>${esc(t('role_patient'))}</h1>
      <div class="card"><b>Day ${Math.min(dayN, total)} of ${total}</b> (about ${Math.max(0, total - dayN)} days to go)
        <div class="bar" role="img" aria-label="${Math.round(elapsed / total * 100)} percent of treatment time passed"><i style="width:${Math.min(100, elapsed / total * 100)}%"></i></div>
        <p>Doses ticked: <b>${doses}</b> · Adherence so far: <b>${adh}%</b> ${adh < 90 ? '<span class="flag">Tell your health worker if you are missing doses.</span>' : ''}</p>
        <button id="took" ${isTaken ? 'class="sec"' : ''}>${esc(isTaken ? '✓ ' + t('taken') : t('took'))}</button></div>
      <h2>Last 4 weeks</h2><p class="mute">Tap a day to change it.</p>
      <div class="cal">${cells.map(d => `<button data-d="${d}" class="${tx.taken[d] ? 'on' : ''} ${d === today() ? 'today' : ''}" aria-pressed="${!!tx.taken[d]}" aria-label="${d}">${Number(d.slice(8))}</button>`).join('')}</div>
      <h2>Reminder</h2>
      <p class="mute">The most reliable reminder is your phone’s own calendar alarm. This downloads a daily alarm named “Take my medicine”, with no mention of TB.</p>
      <div class="row"><input id="rt" type="time" value="${esc(tx.time || '08:00')}" aria-label="Reminder time"><button class="sec" id="ics">Add daily alarm to my phone</button></div>
      <h2>Side effects: what is normal and what is not</h2>
      ${C.sideEffects.map(s => `<details><summary><span class="tag ${s[2]}">${s[2] === 'ok' ? 'Normal' : s[2] === 'tell' ? 'Tell your nurse' : 'Go to clinic today'}</span>${esc(s[0])}</summary><p>${esc(s[1])}</p></details>`).join('')}
      <h2>Missed a dose?</h2><ul>${C.missed.map(s => `<li>${esc(s)}</li>`).join('')}</ul>
      <h2>Support and your rights</h2><ul>${C.support.map(s => `<li>${esc(s)}</li>`).join('')}</ul>
      <p class="banner">Always follow your health worker’s instructions on drugs and dates. This tracker is only a reminder aid.</p>
      <p><button class="danger" id="wipe">${esc(t('clear'))}</button></p>`;
  };
  views.patient.after = () => {
    const f = $('#txsetup');
    if (f) {
      const mo = $('#mo');
      mo.addEventListener('change', () => { const c = mo.value === 'custom'; $('#dy').hidden = !c; $('#dylab').hidden = !c; });
      f.addEventListener('submit', e => {
        e.preventDefault();
        const days = mo.value === 'custom' ? Math.max(30, Math.min(730, Number($('#dy').value) || 180)) : Number(mo.value) * 30;
        store.set('tx', { start: $('#st').value || today(), days, taken: {}, time: '08:00' }); render();
      }); return;
    }
    const tx = getTx();
    $('#took').addEventListener('click', () => { tx.taken[today()] = !tx.taken[today()]; store.set('tx', tx); render(); });
    document.querySelectorAll('.cal button').forEach(b => b.addEventListener('click', () => { tx.taken[b.dataset.d] = !tx.taken[b.dataset.d]; store.set('tx', tx); render(); }));
    $('#rt').addEventListener('change', e => { tx.time = e.target.value; store.set('tx', tx); });
    $('#ics').addEventListener('click', () => {
      const left = Math.max(1, tx.days - Math.floor((new Date(today() + 'T00:00:00') - new Date(tx.start + 'T00:00:00')) / 864e5));
      download('daily-reminder.ics', L.makeICS(today(), $('#rt').value || '08:00', left), 'text/calendar');
    });
    $('#wipe').addEventListener('click', () => { if (confirm('Delete your treatment data from this phone?')) { store.set('tx', null); render(); } });
  };

  // ----- Health worker -----
  const wsym = [['cough', 'Cough (any duration)'], ['cough2w', 'Cough ≥ 2 weeks'], ['blood', 'Coughing blood'], ['fever', 'Fever'], ['sweats', 'Night sweats'], ['weightloss', 'Weight loss / poor growth'], ['noPlay', 'Child: reduced playfulness / lethargy'], ['contact', 'Close contact of a TB patient'], ['under5', 'Contact is a child under 5']];
  views.worker = () => `
    <h1>${esc(t('role_worker'))}</h1>
    <div class="banner">Decision support only. Follow the current national TB guidelines and your facility algorithm.</div>
    <h2>1. Presumptive TB screen</h2>
    <form id="ws" class="card">
      <label class="f" for="grp">Patient group</label>
      <select id="grp"><option value="adult">Adult / adolescent</option><option value="child">Child under 15</option><option value="plhiv">Living with HIV</option></select>
      ${wsym.map(([k, l]) => `<label class="chk"><input type="checkbox" name="${k}"><span>${esc(l)}</span></label>`).join('')}
    </form><div id="wres" role="status"></div>
    <h2>2. Log the case (for your records)</h2>
    <p class="mute">Use a code, not a name. Data stays on this device until you export it.</p>
    <form id="wl" class="card">
      <div class="row"><input type="text" id="c_code" placeholder="Patient code" required maxlength="30" aria-label="Patient code">
      <input type="number" id="c_age" placeholder="Age" min="0" max="120" required aria-label="Age" style="width:90px">
      <select id="c_sex" aria-label="Sex"><option>F</option><option>M</option></select></div>
      <div class="row" style="margin-top:8px"><input type="text" id="c_state" placeholder="State" maxlength="30" aria-label="State">
      <select id="c_stage" aria-label="Stage"><option value="presumptive">Presumptive</option><option value="tested">Tested</option><option value="diagnosed">Diagnosed TB</option><option value="on_treatment">On treatment</option><option value="completed">Completed</option><option value="lost">Lost to follow-up</option></select>
      <select id="c_hiv" aria-label="HIV status"><option value="unknown">HIV unknown</option><option value="neg">HIV neg</option><option value="pos">HIV pos</option></select>
      <input type="number" id="c_cs" min="0" max="50" placeholder="Contacts screened" aria-label="Contacts screened" style="width:170px"></div>
      <p><button type="submit">Add to log</button></p></form>
    <div id="wlog"></div>
    <h2>3. Referral note</h2>
    <p class="mute">Creates a short text you can copy or share. Code only; add no names.</p>
    <div class="row"><select id="r_case" aria-label="Which logged case"></select><input type="text" id="r_to" placeholder="Refer to (facility)" aria-label="Refer to facility"><button class="sec" id="r_make">Make note</button></div>
    <textarea id="r_txt" rows="5" style="width:100%;margin-top:8px" aria-label="Referral note"></textarea>
    <div class="row"><button class="sec" id="r_copy">Copy</button><button class="sec" id="r_share">Share</button></div>`;
  views.worker.after = () => {
    const ws = $('#ws'), wres = $('#wres');
    const screen = () => {
      const s = {}; ws.querySelectorAll('input').forEach(i => s[i.name] = i.checked);
      if (!Object.values(s).some(Boolean)) { wres.innerHTML = ''; return; }
      const r = L.assessWorker($('#grp').value, s);
      wres.innerHTML = `<div class="res ${r.presumptive ? 'test' : 'low'}">${r.presumptive ? 'Presumptive TB' : 'Not presumptive on this screen'}</div><ul>${r.codes.map(c => `<li>${esc(C.workerCodes[c])}</li>`).join('')}</ul>`;
    };
    ws.addEventListener('change', screen); $('#grp').addEventListener('change', screen);

    const logUI = () => {
      const recs = store.get('log', []);
      $('#wlog').innerHTML = recs.length ? `<div class="scroll"><table><thead><tr><th>Code</th><th>Age/Sex</th><th>State</th><th>Stage</th><th>HIV</th><th></th></tr></thead><tbody>
        ${recs.map((r, i) => `<tr><td>${esc(r.code)}</td><td>${esc(r.age)}/${esc(r.sex)}</td><td>${esc(r.state)}</td><td>${esc(r.stage)}</td><td>${esc(r.hiv)}</td><td><button class="danger" data-del="${i}" aria-label="Delete ${esc(r.code)}" style="min-height:36px;padding:4px 10px">✕</button></td></tr>`).join('')}</tbody></table></div>
        <div class="row" style="margin-top:8px"><button class="sec" id="exp">Export CSV (${recs.length})</button><button class="danger" id="clr">Clear log</button></div>` : '<p class="mute">No cases logged yet.</p>';
      document.querySelectorAll('[data-del]').forEach(b => b.addEventListener('click', () => { const r = store.get('log', []); r.splice(Number(b.dataset.del), 1); store.set('log', r); logUI(); }));
      const e = $('#exp'); if (e) e.addEventListener('click', () => download('tb-cases-' + today() + '.csv', L.toCSV(store.get('log', [])), 'text/csv'));
      const c = $('#clr'); if (c) c.addEventListener('click', () => { if (confirm('Delete the whole log from this device?')) { store.set('log', []); logUI(); } });
    };
    $('#wl').addEventListener('submit', e => {
      e.preventDefault();
      const recs = store.get('log', []);
      recs.push({ code: $('#c_code').value.trim(), age: $('#c_age').value, sex: $('#c_sex').value, state: $('#c_state').value.trim(), date: today(), stage: $('#c_stage').value, hiv: $('#c_hiv').value, contacts_screened: $('#c_cs').value || '0' });
      store.set('log', recs); $('#c_code').value = ''; logUI();
    });
    logUI();

    const note = () => {
      const all = store.get('log', []), last = all[Number($('#r_case').value)] || {};
      const g = last.age !== undefined && last.age !== '' ? (Number(last.age) < 15 ? 'child' : 'adult') : $('#grp').value;
      return `TB referral ${today()}\nPatient code: ${last.code || '____'}  Age/Sex: ${last.age || '__'}/${last.sex || '_'}\nReferred to: ${$('#r_to').value || '____'}\nReason: presumptive TB (${g}); needs Xpert / further evaluation.\nHIV status: ${last.hiv || 'unknown'}\nPlease confirm receipt.`;
    };
    const fillCases = () => {
      const recs = store.get('log', []);
      $('#r_case').innerHTML = recs.length ? recs.map((r, i) => `<option value="${i}" ${i === recs.length - 1 ? 'selected' : ''}>${esc(r.code)}</option>`).join('') : '<option value="-1">(no case logged)</option>';
    };
    fillCases();
    $('#wl').addEventListener('submit', () => setTimeout(fillCases, 0));
    $('#r_make').addEventListener('click', () => { $('#r_txt').value = note(); });
    $('#r_copy').addEventListener('click', () => { try { navigator.clipboard.writeText($('#r_txt').value); } catch (e) { $('#r_txt').select(); document.execCommand('copy'); } });
    $('#r_share').addEventListener('click', () => { const v = $('#r_txt').value; if (navigator.share) navigator.share({ text: v }).catch(() => { }); else { try { navigator.clipboard.writeText(v); } catch (e) { } } });
  };

  // ----- Policy -----
  let policyRecs = null, policyIsSample = false;
  const thr = () => store.get('thr', { tested: 85, started: 90, completed: 85, lost: 10, hivUnknown: 20 });
  const fmt = v => v == null ? '–' : v + '%';
  views.policy = () => {
    const th = thr();
    const head = `<h1>${esc(t('role_policy'))}</h1>
      <p>See where people drop out of the TB care pathway. Load a CSV exported from the health-worker log, or from your own system using the same columns.</p>
      <div class="card"><div class="row"><input type="file" id="pf" accept=".csv,text/csv" aria-label="Choose CSV file"><button class="sec" id="psample">Try with sample data</button></div>
      <p class="mute">Columns: ${L.FIELDS.join(', ')}. Stages: ${L.STAGES.join(', ')}, lost. Files are read in your browser and never uploaded.</p></div>`;
    if (!policyRecs) return head;
    const S = L.summarise(policyRecs), c = S.cascade, labels = ['Presumptive (screened)', 'Tested', 'Diagnosed with TB', 'Started treatment', 'Completed treatment'];
    const max = c.counts[0] || 1;
    const flags = [];
    if (S.rates.tested != null && S.rates.tested < th.tested) flags.push(`Only ${S.rates.tested}% of presumptive cases were tested (target ${th.tested}%): check diagnostic access and sputum transport.`);
    if (S.rates.started != null && S.rates.started < th.started) flags.push(`${100 - S.rates.started}% of diagnosed patients did not start treatment (target ≥ ${th.started}%): pre-treatment loss; check tracing and linkage.`);
    if (S.rates.lost != null && S.rates.lost > th.lost) flags.push(`${S.rates.lost}% lost to follow-up during treatment (flag > ${th.lost}%): review DOT support, food/transport aid, stigma.`);
    if (S.hivUnknownShare != null && S.hivUnknownShare > th.hivUnknown) flags.push(`HIV status unknown for ${S.hivUnknownShare}% of cases (flag > ${th.hivUnknown}%): strengthen HIV testing for TB patients.`);
    return head + (policyIsSample ? '<div class="banner"><b>SAMPLE DATA: synthetic and invented.</b> Not real Nigerian statistics. Use only to see how the dashboard works.</div>' : '') +
      `<h2>Care cascade (${S.cascade.total} records${c.invalid ? `, ${c.invalid} skipped: unknown stage` : ''})</h2>
      ${c.counts.map((n, i) => `<div>${labels[i]}: <b>${n}</b> ${i ? `<span class="mute">(${fmt(i === 1 ? S.rates.tested : i === 2 ? S.rates.diagnosed : i === 3 ? S.rates.started : S.rates.completed)} of previous step)</span>` : ''}
        <div class="bar" role="img" aria-label="${labels[i]} ${n}"><i style="width:${n / max * 100}%"></i></div></div>`).join('')}
      <div>Lost to follow-up after starting: <b>${c.lost}</b> (${fmt(S.rates.lost)})<div class="bar lost"><i style="width:${c.lost / max * 100}%"></i></div></div>
      <p>Children under 15: <b>${fmt(S.childShare)}</b> · HIV status unknown: <b>${fmt(S.hivUnknownShare)}</b></p>
      <h2>Where to look first</h2>${flags.length ? `<ul>${flags.map(f => `<li>${esc(f)}</li>`).join('')}</ul>` : '<p>No flags at current thresholds.</p>'}
      <details><summary>Edit flag thresholds</summary><p class="mute">These are placeholders. Set them to your programme’s targets.</p>
        <div class="row">${[['tested', 'Min % tested'], ['started', 'Min % started'], ['lost', 'Max % lost'], ['hivUnknown', 'Max % HIV unknown']].map(([k, l]) => `<label>${l}<br><input type="number" data-th="${k}" value="${th[k]}" min="0" max="100" style="width:90px"></label>`).join('')}</div></details>
      <h2>By state</h2><div class="scroll"><table><thead><tr><th>State</th><th>Screened</th><th>% tested</th><th>% started</th><th>% lost</th></tr></thead><tbody>
      ${L.byState(policyRecs).map(s => `<tr><td>${esc(s.state)}</td><td>${s.cascade.counts[0]}</td><td class="${s.rates.tested != null && s.rates.tested < th.tested ? 'flag' : ''}">${fmt(s.rates.tested)}</td><td class="${s.rates.started != null && s.rates.started < th.started ? 'flag' : ''}">${fmt(s.rates.started)}</td><td class="${s.rates.lost != null && s.rates.lost > th.lost ? 'flag' : ''}">${fmt(s.rates.lost)}</td></tr>`).join('')}</tbody></table></div>
      <p class="mute">Percentages are of the previous step. Small counts are unreliable; do not act on a state with very few records.</p>`;
  };
  views.policy.after = () => {
    $('#psample').addEventListener('click', () => { policyRecs = L.sampleData(); policyIsSample = true; render(); });
    $('#pf').addEventListener('change', e => {
      const f = e.target.files[0]; if (!f) return;
      const r = new FileReader();
      r.onload = () => { policyRecs = L.parseCSV(String(r.result)); policyIsSample = false; render(); };
      r.readAsText(f);
    });
    document.querySelectorAll('[data-th]').forEach(i => i.addEventListener('change', () => { const th = thr(); th[i.dataset.th] = Number(i.value); store.set('thr', th); render(); }));
  };

  views.about = () => `
    <h1>About TB Free</h1>
    <p>A free, open tool for everyone affected by TB: the public, patients, health workers and policy makers. No fees, no ads, no account, no tracking. It works offline after the first visit and is light enough for low-cost phones.</p>
    <h2>Privacy</h2><ul><li>Everything you enter is stored only in this browser on this device.</li><li>Nothing is sent to a server. The dashboard reads CSV files locally.</li><li>Health workers should log patient codes, never names.</li></ul>
    <p><button class="danger" id="wipeall">${esc(t('clear'))}</button></p>
    <h2>Limits</h2><ul><li>It is guidance, not a diagnosis. Only a test confirms TB.</li><li>Clinical text is a draft that needs sign-off by the National TB, Leprosy and Buruli Ulcer Control Programme or a state programme.</li><li>Hausa, Yorùbá, Igbo and Pidgin screens are drafts pending native-speaker review.</li><li>No hotline numbers are listed because they must be verified by the programme before publishing.</li></ul>
    <h2>Reuse</h2><p>Plan: open-source licence so ministries and NGOs can adapt, translate and host it free.</p>`;
  views.about.after = () => $('#wipeall').addEventListener('click', () => { if (confirm('Delete all TB Free data from this phone?')) { store.clear(); location.hash = '#/home'; render(); } });

  // ---------- Router ----------
  const navItems = [['home', '🏠', 'nav_home'], ['check', '🩺', 'nav_check'], ['patient', '💊', 'nav_patient'], ['worker', '📋', 'nav_worker'], ['policy', '📊', 'nav_policy']];
  function render() {
    const name = (location.hash.replace(/^#\/?/, '') || 'home').split('?')[0];
    const key = views[name] ? name : 'home';
    const v = views[key];
    const main = $('#view');
    main.innerHTML = v();
    if (v.after) v.after();
    $('#nav').innerHTML = navItems.map(([k, ic, lk]) => `<a href="#/${k}" ${k === key ? 'aria-current="page"' : ''}><b aria-hidden="true">${ic}</b>${esc(t(lk))}</a>`).join('');
    document.documentElement.lang = lang === 'pcm' ? 'en' : lang;
    document.title = 'TB Free';
  }
  let lastKey = null;
  window.addEventListener('hashchange', () => { render(); $('#view').focus(); window.scrollTo(0, 0); });
  const sel = $('#lang');
  sel.innerHTML = Object.keys(window.LANGS).map(k => `<option value="${k}" ${k === lang ? 'selected' : ''}>${esc(window.LANGS[k])}</option>`).join('');
  sel.addEventListener('change', () => { lang = sel.value; store.set('lang', lang); render(); });
  render();

  if ('serviceWorker' in navigator && location.protocol.indexOf('http') === 0) navigator.serviceWorker.register('sw.js').catch(() => { });
})();
