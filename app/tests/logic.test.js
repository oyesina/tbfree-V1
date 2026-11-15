const test = require('node:test');
const assert = require('node:assert');
const L = require('../logic.js');

test('public: blood is urgent, 2-week cough is test, nothing is low', () => {
  assert.equal(L.assessPublic({ blood: true }).level, 'urgent');
  assert.equal(L.assessPublic({ cough2w: true }).level, 'test');
  assert.equal(L.assessPublic({}).level, 'low');
});
test('public: contact alone triggers screening; 2 symptoms trigger test; 1 alone watch', () => {
  assert.equal(L.assessPublic({ contact: true }).level, 'test');
  assert.equal(L.assessPublic({ fever: true, sweats: true }).level, 'test');
  assert.equal(L.assessPublic({ fever: true }).level, 'watch');
});
test('public: HIV adds the HIV link message only when not low', () => {
  assert.ok(L.assessPublic({ hiv: true, cough2w: true }).codes.includes('hivlink'));
  assert.equal(L.assessPublic({ hiv: true }).level, 'watch'); // HIV alone is a risk, not low
  assert.ok(!L.assessPublic({}).codes.includes('hivlink'));
});
test('worker: PLHIV any symptom is presumptive; adult needs cough>=2w or 2 symptoms', () => {
  assert.ok(L.assessWorker('plhiv', { fever: true }).presumptive);
  assert.ok(!L.assessWorker('adult', { fever: true }).presumptive);
  assert.ok(L.assessWorker('adult', { cough2w: true }).presumptive);
  assert.ok(L.assessWorker('adult', { fever: true, sweats: true }).presumptive);
});
test('worker: asymptomatic child contact under 5 gets TPT evaluation', () => {
  const r = L.assessWorker('child', { contact: true, under5: true });
  assert.ok(!r.presumptive); assert.ok(r.codes.includes('tpt_eval'));
});
test('csv round trip and formula-injection guard', () => {
  const recs = [{ code: '=1+1', age: '5', sex: 'F', state: 'Kano, N', date: '2026-01-01', stage: 'tested', hiv: 'neg', contacts_screened: '1' }];
  const csv = L.toCSV(recs);
  assert.ok(csv.includes("'=1+1"));
  const back = L.parseCSV(csv);
  assert.equal(back[0].state, 'Kano, N');
});
test('csv handles BOM, CRLF, quotes', () => {
  const r = L.parseCSV('﻿code,state\r\n"a""b","x,y"\r\n');
  assert.equal(r[0].code, 'a"b'); assert.equal(r[0].state, 'x,y');
});
test('cascade counts monotonic; lost counted as started', () => {
  const c = L.cascade([{ stage: 'presumptive' }, { stage: 'tested' }, { stage: 'diagnosed' }, { stage: 'lost' }, { stage: 'completed' }, { stage: 'bogus' }]);
  assert.deepEqual(c.counts, [5, 4, 3, 2, 1]); assert.equal(c.lost, 1); assert.equal(c.invalid, 1);
  for (let i = 1; i < 5; i++) assert.ok(c.counts[i] <= c.counts[i - 1]);
});
test('summarise handles empty data without NaN', () => {
  const s = L.summarise([]);
  assert.equal(s.rates.tested, null); assert.equal(s.childShare, null);
});
test('ics has daily recurrence and neutral title', () => {
  const ics = L.makeICS('2026-11-13', '08:00', 120);
  assert.ok(ics.includes('RRULE:FREQ=DAILY;COUNT=120')); assert.ok(ics.includes('SUMMARY:Take my medicine'));
  assert.ok(!/tb|tubercul/i.test(ics.replace('tbfree', '').replace('TB Free', '')));
});
test('sample data is deterministic and valid', () => {
  const a = L.sampleData(), b = L.sampleData();
  assert.equal(a.length, 600); assert.deepEqual(a[10], b[10]);
  assert.equal(L.cascade(a).invalid, 0);
});
