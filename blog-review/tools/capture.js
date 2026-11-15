const puppeteer = require('puppeteer-core');
const fs = require('fs');
const OUT = process.argv[2];
const BASE = 'http://localhost:8765/';
const sleep = ms => new Promise(r => setTimeout(r, ms));
const DEV = { web: { width: 1280, height: 800, deviceScaleFactor: 1, isMobile: false, hasTouch: false },
              m: { width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true } };
const MUA = 'Mozilla/5.0 (Linux; Android 13; Tecno Spark) AppleWebKit/537.36 Chrome/120 Mobile Safari/537.36';

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const browser = await puppeteer.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: 'new' });
  const manifest = [];
  async function shot(page, dev, name, { full = true, clip } = {}) {
    await sleep(250);
    if (full) {
      const h = await page.evaluate(() => Math.min(document.documentElement.scrollHeight, 4000));
      await page.setViewport({ ...DEV[dev], height: Math.max(DEV[dev].height, h) });
      await sleep(150);
    }
    const file = `${dev}-${name}.png`;
    await page.screenshot({ path: `${OUT}/${file}` });
    await page.setViewport(DEV[dev]);
    manifest.push(file); console.log('shot', file);
  }
  const go = async (page, hash) => { await page.goto(BASE + '#/' + hash, { waitUntil: 'networkidle0' }); await page.reload({ waitUntil: 'networkidle0' }); await page.evaluate(() => window.scrollTo(0, 0)); await sleep(200); };
  const seed = async page => page.evaluate(() => {
    const d = new Date(); const iso = x => new Date(x.getTime() - x.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
    const start = new Date(d); start.setDate(d.getDate() - 24); const taken = {};
    for (let i = 0; i < 24; i++) { const x = new Date(start); x.setDate(start.getDate() + i); if (![5, 6, 13, 19].includes(i)) taken[iso(x)] = true; }
    localStorage.setItem('tbf.tx', JSON.stringify({ start: iso(start), days: 180, taken, time: '08:00' }));
    localStorage.setItem('tbf.log', JSON.stringify([
      { code: 'KN-0012', age: '34', sex: 'M', state: 'Kano', date: iso(d), stage: 'diagnosed', hiv: 'neg', contacts_screened: '4' },
      { code: 'KN-0013', age: '6', sex: 'F', state: 'Kano', date: iso(d), stage: 'presumptive', hiv: 'unknown', contacts_screened: '0' },
      { code: 'OY-0044', age: '41', sex: 'F', state: 'Oyo', date: iso(d), stage: 'on_treatment', hiv: 'pos', contacts_screened: '3' }]));
  });
  const ticks = (page, names) => page.evaluate(n => n.forEach(k => { const i = document.querySelector(`input[name=${k}]`); if (i && !i.checked) i.click(); }), names);
  const setLang = async (page, l) => { await page.evaluate(l => { localStorage.setItem('tbf.lang', JSON.stringify(l)); }, l); await page.reload({ waitUntil: 'networkidle0' }); await sleep(200); };

  for (const dev of ['web', 'm']) {
    const ctx = await browser.createBrowserContext();
    const page = await ctx.newPage();
    if (dev === 'm') await page.setUserAgent(MUA);
    await page.setViewport(DEV[dev]);
    await page.emulateMediaFeatures([{ name: 'prefers-color-scheme', value: 'light' }]);
    await page.goto(BASE, { waitUntil: 'networkidle0' });
    await page.evaluate(() => localStorage.clear());

    await go(page, 'home'); await shot(page, dev, '01-home');
    await go(page, 'learn'); await shot(page, dev, '02-learn');
    await page.evaluate(() => document.querySelectorAll('details').forEach((d, i) => { if (i < 2) d.open = true; }));
    await shot(page, dev, '02b-learn-myths-open');

    await go(page, 'check'); await shot(page, dev, '03-check-empty', { full: false });
    await ticks(page, ['cough2w', 'sweats', 'hiv']); await shot(page, dev, '04-check-result-test');
    await go(page, 'check'); await ticks(page, ['blood']); await shot(page, dev, '05-check-result-urgent');
    await go(page, 'check'); await ticks(page, ['fever']); await shot(page, dev, '06-check-result-watch');

    await go(page, 'patient'); await shot(page, dev, '07-patient-setup', { full: false });
    await seed(page); await go(page, 'patient'); await shot(page, dev, '08-patient-tracker');
    await page.evaluate(() => document.querySelectorAll('details').forEach(d => d.open = true));
    await shot(page, dev, '09-patient-sideeffects-open');

    await go(page, 'worker'); await shot(page, dev, '10-worker-top', { full: false });
    await ticks(page, ['cough2w']); await shot(page, dev, '11-worker-adult-presumptive');
    await go(page, 'worker'); await page.select('#grp', 'child'); await ticks(page, ['contact', 'under5']); await shot(page, dev, '12-worker-child-contact-tpt');
    await go(page, 'worker'); await page.select('#grp', 'plhiv'); await ticks(page, ['sweats']); await shot(page, dev, '13-worker-plhiv');
    await go(page, 'worker'); await page.type('#r_to', 'General Hospital Dala'); await page.select('#r_case', '1'); await page.click('#r_make'); await sleep(200);
    await page.evaluate(() => document.querySelector('#r_txt').scrollIntoView()); await shot(page, dev, '14-worker-log-and-referral');

    await go(page, 'policy'); await shot(page, dev, '15-policy-empty', { full: false });
    await page.click('#psample'); await sleep(300); await shot(page, dev, '16-policy-dashboard');

    await go(page, 'about'); await shot(page, dev, '17-about');

    // Languages
    for (const l of ['en', 'pcm', 'ha', 'yo', 'ig']) {
      await go(page, 'home'); await setLang(page, l); await shot(page, dev, `lang-${l}-home`, { full: false });
      await go(page, 'check'); await ticks(page, ['cough2w', 'hiv']); await shot(page, dev, `lang-${l}-check-result`);
      await go(page, 'patient'); await shot(page, dev, `lang-${l}-patient`, { full: false });
    }
    await setLang(page, 'en');

    // Dark mode
    await page.emulateMediaFeatures([{ name: 'prefers-color-scheme', value: 'dark' }]);
    await go(page, 'home'); await shot(page, dev, 'dark-home', { full: false });
    await go(page, 'policy'); await page.click('#psample'); await sleep(300); await shot(page, dev, 'dark-policy');
    await ctx.close();
  }
  fs.writeFileSync(OUT + '/manifest.json', JSON.stringify(manifest, null, 1));
  await browser.close();
})().catch(e => { console.error(e); process.exit(1); });
