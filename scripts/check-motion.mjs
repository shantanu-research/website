// Run against `astro dev --background` with Playwright available.
// PLAYWRIGHT_MODULE can point to an existing Playwright installation.
// BROWSER_CHANNEL defaults to Edge on Windows, bundled Chromium elsewhere.
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
const playwrightModule = await import(process.env.PLAYWRIGHT_MODULE || 'playwright');
const { chromium } = playwrightModule.chromium ? playwrightModule : playwrightModule.default;
const base = process.env.MOTION_TEST_URL || 'http://localhost:4321/website/';
const channel = process.env.BROWSER_CHANNEL || (process.platform === 'win32' ? 'msedge' : undefined);
const browser = await chromium.launch({ channel, headless: true });
const projects = JSON.parse(await readFile(new URL('../data/projects.json', import.meta.url), 'utf8'));
const routes = ['viot', 'methods', 'data', ...projects.filter(p => p.published && p.detail).map(p => `projects/${p.id}`)];
const errors = [];
const watch = page => page.on('pageerror', e => errors.push(e.message));
const wait = page => page.waitForTimeout(250);
async function deployment(page) {
  await page.evaluate(() => {
    const grid = document.querySelector('.portfolio-grid');
    scrollTo({top: grid.getBoundingClientRect().top + scrollY + grid.offsetHeight * .6, behavior: 'instant'});
  });
  await wait(page);
  const result = await page.evaluate(() => {
    const box = document.querySelector('.payload').getBoundingClientRect();
    const overlap = [...document.querySelectorAll('.portfolio-card, .portfolio-head')].some(el => {
      const other = el.getBoundingClientRect();
      return box.left < other.right && box.right > other.left && box.top < other.bottom && box.bottom > other.top;
    });
    return {
      inside: box.left >= 0 && box.top >= 0 && box.right <= innerWidth && box.bottom <= innerHeight,
      transparent: getComputedStyle(document.querySelector('.portfolio')).backgroundColor === 'rgba(0, 0, 0, 0)',
      overlap, phase: document.querySelector('#phase').textContent,
      unfolded: document.querySelector('.solar-tip-left').getAttribute('transform'),
      overflow: document.documentElement.scrollWidth > innerWidth + 1,
    };
  });
  assert.equal(result.transparent, true, 'Project background obscures the flight');
  assert.equal(result.overflow, false);
  assert.match(result.phase, /Payload deployed/);
  assert.match(result.unfolded, /scale\(1 1\)/);
}
async function projectGridMotion(page) {
  const states = await page.evaluate(async () => {
    const grid = document.querySelector('.portfolio-grid');
    const top = grid.getBoundingClientRect().top + scrollY;
    const sample = async y => {
      scrollTo({top: y, behavior: 'instant'});
      await new Promise(resolve => setTimeout(resolve, 160));
      const rocket = document.querySelector('.rocket-wrap').getBoundingClientRect();
      const payload = document.querySelector('.payload').getBoundingClientRect();
      return {
        flight: document.documentElement.dataset.flight,
        rocketX: Math.round(rocket.x),
        rocketY: Math.round(rocket.y),
        payloadX: Math.round(payload.x),
        payloadY: Math.round(payload.y),
        upperStage: getComputedStyle(document.querySelector('.upper-stage')).opacity,
      };
    };
    return [
      await sample(top + grid.offsetHeight * .15),
      await sample(top + grid.offsetHeight * .85 - innerHeight * .1),
    ];
  });
  assert.notDeepEqual(states[0], states[1], `Flight freezes through project tiles: ${JSON.stringify(states)}`);
}
async function touchdown(page) {
  await page.evaluate(() => scrollTo({top: document.documentElement.scrollHeight, behavior: 'instant'}));
  await wait(page);
  const result = await page.evaluate(() => ({
    phase: document.querySelector('#phase').textContent,
    flight: document.documentElement.dataset.flight,
    landingDistance: document.documentElement.scrollHeight - innerHeight - document.querySelector('#contact').offsetTop,
    viewportHeight: innerHeight,
    legs: [document.querySelector('.leg-left'), document.querySelector('.leg-right')].map(el => el.getAttribute('transform')),
  }));
  assert.match(result.phase, /Touchdown/);
  assert.equal(result.flight, 'landed');
  assert.ok(result.landingDistance >= result.viewportHeight * .9, `Landing needs more scroll distance: ${JSON.stringify(result)}`);
  assert.deepEqual(result.legs, ['rotate(0 116 452)', 'rotate(0 184 452)']);
}
try {
  for (const [width, height] of [[320,720],[390,844],[768,1024],[1024,768],[1440,900]]) {
    const page = await browser.newPage({viewport: {width,height}});
    watch(page);
    await page.goto(base);
    await wait(page);
    await deployment(page);
    await projectGridMotion(page);
    // A longer portfolio must not move the deployment to another chapter.
    await page.evaluate(() => {
      const grid = document.querySelector('.portfolio-grid');
      grid.append(...[...grid.children].map(card => card.cloneNode(true)));
      dispatchEvent(new Event('resize'));
    });
    await page.waitForTimeout(400);
    await deployment(page);
    await touchdown(page);
    await page.evaluate(() => scrollTo({top:0,behavior:'instant'}));
    await wait(page);
    assert.equal(await page.locator('.payload').evaluate(el => getComputedStyle(el).visibility), 'hidden', 'Reverse scroll must stow the payload');
    await page.close();
    console.log(`PASS flight visibility, deployment timing, touchdown, reverse scroll: ${width}×${height}`);
  }
  for (const width of [390,1440]) {
    const page = await browser.newPage({viewport:{width,height:900}});
    watch(page);
    for (const route of routes) {
      const response = await page.goto(`${base}${route}/`);
      assert.equal(response.status(),200,route);
      assert.equal(await page.locator('[data-research-scene]').count(),1,route);
      await page.locator('.scene-visual').scrollIntoViewIfNeeded();
      await wait(page);
      const traveler = page.locator('[data-traveler]').first();
      const transform = () => traveler.evaluate(el => getComputedStyle(el).transform);
      const before = await transform();
      await wait(page);
      assert.notEqual(await transform(),before,`${route}: scene is not moving`);
      await page.locator('[data-scene-toggle]').click();
      const paused = await transform();
      await wait(page);
      assert.equal(await transform(),paused,`${route}: pause did not stop motion`);
      await page.locator('[data-scene-toggle]').click();
      await wait(page);
      assert.notEqual(await transform(),paused,`${route}: resume did not restart motion`);
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1),false,`${route}: horizontal overflow`);
      await page.emulateMedia({reducedMotion:'reduce'});
      await page.waitForFunction(() => document.querySelector('[data-scene-toggle]').getAttribute('aria-pressed') === 'true');
      const reduced = await transform();
      await wait(page);
      assert.equal(await transform(),reduced,`${route}: reduced-motion preference ignored`);
      assert.equal(await page.locator('[data-scene-toggle]').getAttribute('aria-pressed'),'true');
      await page.emulateMedia({reducedMotion:'no-preference'});
      await page.evaluate(()=>scrollTo({top:document.documentElement.scrollHeight,behavior:'instant'}));
      await wait(page);
      const offscreen = await transform();
      await wait(page);
      assert.equal(await transform(),offscreen,`${route}: offscreen scene still running`);
      console.log(`PASS scene, pause/resume, reduced motion, offscreen suspension: ${width}px ${route}`);
    }
    await page.close();
  }
  assert.deepEqual(errors,[],`Browser errors: ${errors.join(', ')}`);
  console.log('All motion checks passed; no browser errors.');
} finally { await browser.close(); }
