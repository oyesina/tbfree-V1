/* TB Free — pure logic (no DOM). Works in browser (window.TBLogic) and Node (module.exports). */
(function (root) {
  'use strict';

  // ---- Public self-check -------------------------------------------------
  // answers: object of booleans. Returns {level, codes}
  // levels: 'urgent' | 'test' | 'watch' | 'low'
  function assessPublic(a) {
    a = a || {};
    const other = ['fever', 'sweats', 'weightloss', 'fatigue', 'chestpain'].filter(k => a[k]).length;
    const risks = ['hiv', 'diabetes', 'underweight', 'smoker', 'priortb'].filter(k => a[k]).length;
    const codes = [];
    let level = 'low';
    if (a.blood) { level = 'urgent'; codes.push('blood'); }
    else if (a.cough2w) { level = 'test'; codes.push('cough2w'); }
    else if (a.contact) { level = 'test'; codes.push('contact'); }
    else if (other >= 2 || (other >= 1 && (risks >= 1 || a.cough))) { level = 'test'; codes.push('multi'); }
    else if (other >= 1 || a.cough || risks >= 1) { level = 'watch'; codes.push('watch'); }
    if (a.hiv && level !== 'low') codes.push('hivlink');
    return { level, codes };
  }

  // ---- Health-worker presumptive TB screen ------------------------------
  // group: 'adult' | 'child' | 'plhiv'; s: booleans
  function assessWorker(group, s) {
    s = s || {};
    const codes = [];
    let presumptive = false;
    if (group === 'plhiv') {
      // WHO W4SS: any of current cough, fever, weight loss, night sweats
      if (s.cough || s.cough2w || s.fever || s.weightloss || s.sweats || s.blood) presumptive = true;
    } else if (group === 'child') {
      if (s.cough2w || s.fever || s.weightloss || s.noPlay || s.blood) presumptive = true; // persistent (>=2 wks) symptoms assumed on the form
    } else {
      const n = ['fever', 'sweats', 'weightloss'].filter(k => s[k]).length;
      if (s.cough2w || s.blood) presumptive = true;
      else if (n >= 2 || (s.contact && (s.cough || n >= 1))) presumptive = true;
    }
    if (presumptive) codes.push('test_xpert', 'hiv_test', 'infection_control');
    if (s.blood) codes.push('urgent_blood');
    if (!presumptive && s.contact) {
      codes.push(group === 'child' && s.under5 ? 'tpt_eval' : 'contact_followup');
    }
    if (!presumptive && !s.contact) codes.push('no_signs');
    return { presumptive, codes };
  }

  // ---- CSV ---------------------------------------------------------------
  function parseCSV(text) {
    const rows = []; let row = [], cur = '', q = false;
    text = String(text || '').replace(/^﻿/, '');
    for (let i = 0; i < text.length; i++) {
      const c = text[i];
      if (q) {
        if (c === '"') { if (text[i + 1] === '"') { cur += '"'; i++; } else q = false; }
        else cur += c;
      } else if (c === '"') q = true;
      else if (c === ',') { row.push(cur); cur = ''; }
      else if (c === '\n' || c === '\r') {
        if (c === '\r' && text[i + 1] === '\n') i++;
        row.push(cur); cur = '';
        if (row.some(x => x.trim() !== '')) rows.push(row);
        row = [];
      } else cur += c;
    }
    row.push(cur); if (row.some(x => x.trim() !== '')) rows.push(row);
    if (!rows.length) return [];
    const head = rows[0].map(h => h.trim().toLowerCase());
    return rows.slice(1).map(r => { const o = {}; head.forEach((h, i) => o[h] = (r[i] || '').trim()); return o; });
  }

  const FIELDS = ['code', 'age', 'sex', 'state', 'date', 'stage', 'hiv', 'contacts_screened'];
  function csvCell(v) {
    v = String(v == null ? '' : v);
    // neutralise spreadsheet formula injection
    if (/^[=+\-@\t\r]/.test(v)) v = "'" + v;
    return /[",\n\r]/.test(v) ? '"' + v.replace(/"/g, '""') + '"' : v;
  }
  function toCSV(records) {
    return [FIELDS.join(',')].concat(records.map(r => FIELDS.map(f => csvCell(r[f])).join(','))).join('\n');
  }

  // ---- Cascade -----------------------------------------------------------
  const STAGES = ['presumptive', 'tested', 'diagnosed', 'on_treatment', 'completed'];
  // 'lost' = started treatment, then lost to follow-up
  function stageIndex(s) {
    s = String(s || '').toLowerCase();
    if (s === 'lost') return 3;
    return STAGES.indexOf(s);
  }
  function cascade(records) {
    const counts = STAGES.map(() => 0); let lost = 0, invalid = 0;
    records.forEach(r => {
      const i = stageIndex(r.stage);
      if (i < 0) { invalid++; return; }
      for (let k = 0; k <= i; k++) counts[k]++;
      if (String(r.stage).toLowerCase() === 'lost') lost++;
    });
    return { counts, lost, invalid, total: records.length - invalid };
  }
  const pct = (a, b) => b ? Math.round((a / b) * 1000) / 10 : null;

  function summarise(records) {
    const c = cascade(records);
    const valid = records.filter(r => stageIndex(r.stage) >= 0);
    const children = valid.filter(r => Number(r.age) < 15).length;
    const hivUnknown = valid.filter(r => !/^(pos|neg)/i.test(r.hiv || '')).length;
    return {
      cascade: c,
      rates: {
        tested: pct(c.counts[1], c.counts[0]),
        diagnosed: pct(c.counts[2], c.counts[1]),
        started: pct(c.counts[3], c.counts[2]),
        completed: pct(c.counts[4], c.counts[3]),
        lost: pct(c.lost, c.counts[3])
      },
      childShare: pct(children, valid.length),
      hivUnknownShare: pct(hivUnknown, valid.length)
    };
  }

  function byState(records) {
    const m = {};
    records.forEach(r => { const k = r.state || 'Unknown'; (m[k] = m[k] || []).push(r); });
    return Object.keys(m).sort().map(k => ({ state: k, ...summarise(m[k]) }));
  }

  // ---- Reminders (.ics) ---------------------------------------------------
  function makeICS(startISO, timeHHMM, days) {
    const d = String(startISO).replace(/-/g, '');
    const t = String(timeHHMM || '08:00').replace(':', '') + '00';
    const n = Math.max(1, Math.min(Number(days) || 180, 730));
    return ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//TB Free//EN', 'BEGIN:VEVENT',
      'UID:tbfree-' + d + '-' + t + '@local', 'DTSTAMP:' + d + 'T' + t,
      'DTSTART:' + d + 'T' + t, 'RRULE:FREQ=DAILY;COUNT=' + n,
      'SUMMARY:Take my medicine', 'BEGIN:VALARM', 'TRIGGER:PT0M', 'ACTION:DISPLAY',
      'DESCRIPTION:Take my medicine', 'END:VALARM', 'END:VEVENT', 'END:VCALENDAR'].join('\r\n');
  }

  // ---- Synthetic sample (clearly labelled in UI) ---------------------------
  function sampleData() {
    let seed = 42; const rnd = () => (seed = (seed * 1664525 + 1013904223) % 4294967296) / 4294967296;
    const states = [['Kano', .9, .7], ['Lagos', .95, .85], ['Benue', .7, .6], ['Rivers', .85, .75], ['Borno', .6, .55], ['Oyo', .9, .8]];
    const out = []; let n = 0;
    states.forEach(([st, testP, txP]) => {
      for (let i = 0; i < 100; i++) {
        let stage = 'presumptive';
        if (rnd() < testP) { stage = 'tested';
          if (rnd() < .22) { stage = 'diagnosed';
            if (rnd() < txP) { stage = 'on_treatment';
              const x = rnd(); stage = x < .6 ? 'completed' : x < .75 ? 'lost' : 'on_treatment'; } } }
        out.push({ code: 'S' + String(++n).padStart(4, '0'), age: String(Math.floor(rnd() * 70) + 1), sex: rnd() < .55 ? 'M' : 'F',
          state: st, date: '2026-0' + (1 + Math.floor(rnd() * 6)) + '-15', stage,
          hiv: rnd() < .4 ? 'unknown' : rnd() < .85 ? 'neg' : 'pos', contacts_screened: String(Math.floor(rnd() * 5)) });
      }
    });
    return out;
  }

  const api = { assessPublic, assessWorker, parseCSV, toCSV, FIELDS, STAGES, cascade, summarise, byState, makeICS, sampleData, stageIndex };
  if (typeof module !== 'undefined' && module.exports) module.exports = api; else root.TBLogic = api;
})(typeof window !== 'undefined' ? window : globalThis);
