/**
 * QA visual y responsive (demo MESA BRAVA).
 *
 * Uso:  npm run dev   (en otra terminal)  y después  node scripts/qa.mjs
 *
 * Qué revisa, en 3 viewports (móvil, tablet, desktop):
 *  - captura de pantalla de cada página
 *  - que no haya scroll horizontal
 *  - errores de consola / de red / imágenes rotas
 *  - menú móvil (toggle) y cajón del pedido
 *
 * Sale con código != 0 si algo falla, para poder usarlo en CI.
 */
import { chromium } from 'playwright';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';

const BASE = process.env.QA_BASE ?? 'http://localhost:4321';
const OUT = process.env.QA_OUT ?? path.join(process.cwd(), 'qa-output');
const PAGES = [
  { path: '/', name: 'inicio' },
  { path: '/carta', name: 'carta' },
  { path: '/nosotros', name: 'nosotros' },
  { path: '/reservas', name: 'reservas' },
];
const VIEWPORTS = [
  { name: 'mobile-390', width: 390, height: 844, mobile: true },
  { name: 'tablet-768', width: 768, height: 1024, mobile: false },
  { name: 'desktop-1440', width: 1440, height: 900, mobile: false },
];

const failures = [];
const fail = (msg) => failures.push(msg);

await mkdir(OUT, { recursive: true });

const browser = await chromium.launch();

for (const vp of VIEWPORTS) {
  const context = await browser.newContext({
    viewport: { width: vp.width, height: vp.height },
    deviceScaleFactor: 1,
    isMobile: vp.mobile,
    hasTouch: vp.mobile,
    locale: 'es-AR',
  });

  for (const page of PAGES) {
    const page_ = await context.newPage();
    const errors = [];
    page_.on('console', (msg) => {
      if (msg.type() === 'error') errors.push(`console: ${msg.text()}`);
    });
    page_.on('pageerror', (err) => errors.push(`pageerror: ${err.message}`));
    page_.on('requestfailed', (req) =>
      errors.push(`requestfailed: ${req.url()} (${req.failure()?.errorText})`),
    );

    const res = await page_.goto(BASE + page.path, { waitUntil: 'networkidle' });
    if (!res || res.status() !== 200) fail(`${page.path} @${vp.name}: status ${res?.status()}`);

    // scroll completo (por pasos) para disparar las imágenes lazy y volver arriba
    await page_.evaluate(async () => {
      const html = document.documentElement;
      const prev = html.style.scrollBehavior;
      html.style.scrollBehavior = 'auto'; // el sitio usa scroll suave: lo anulamos
      const pass = async () => {
        const step = Math.max(300, Math.floor(window.innerHeight * 0.8));
        for (let y = 0; y <= html.scrollHeight; y += step) {
          window.scrollTo(0, y);
          await new Promise((r) => requestAnimationFrame(r));
        }
      };
      await pass();
      await pass();
      window.scrollTo(0, 0);
      html.style.scrollBehavior = prev;
    });
    await page_.waitForLoadState('networkidle');
    // las imágenes lazy pueden quedarse pendientes tras el scroll: esperamos
    // a que todas terminen para que la captura no muestre huecos
    await page_
      .waitForFunction(() => [...document.images].every((i) => i.complete), null, { timeout: 15000 })
      .catch(() => {});

    const info = await page_.evaluate(() => ({
      scrollW: document.documentElement.scrollWidth,
      innerW: window.innerWidth,
      broken: [...document.images]
        .filter((i) => i.complete && i.naturalWidth === 0)
        .map((i) => i.currentSrc || i.src),
      pending: [...document.images].filter((i) => !i.complete).length,
      title: document.title,
      h1: document.querySelectorAll('h1').length,
    }));

    if (info.scrollW > info.innerW + 1) {
      fail(`${page.path} @${vp.name}: overflow horizontal ${info.scrollW}>${info.innerW}`);
    }
    if (info.broken.length) fail(`${page.path} @${vp.name}: imágenes rotas ${info.broken.join(', ')}`);
    if (info.pending) fail(`${page.path} @${vp.name}: ${info.pending} imágenes sin cargar`);
    if (info.h1 !== 1) fail(`${page.path} @${vp.name}: ${info.h1} h1`);

    await page_.screenshot({
      path: path.join(OUT, `${vp.name}-${page.name}.png`),
      fullPage: true,
    });

    if (errors.length) fail(`${page.path} @${vp.name}: ${errors.join(' | ')}`);
    await page_.close();
  }

  // --- menú móvil ---
  if (vp.mobile) {
    const p = await context.newPage();
    await p.goto(BASE + '/', { waitUntil: 'networkidle' });
    const toggle = p.locator('[data-nav-toggle]');
    if ((await toggle.count()) === 0) {
      fail(`menú móvil @${vp.name}: no se encontró [data-nav-toggle]`);
    } else {
      const nav = p.locator('[data-nav-panel]').first();
      await toggle.click();
      await p.waitForTimeout(350);
      const expanded = await toggle.getAttribute('aria-expanded');
      if (expanded !== 'true') fail(`menú móvil @${vp.name}: aria-expanded=${expanded}`);
      await p.screenshot({ path: path.join(OUT, `${vp.name}-menu-abierto.png`) });
      const visible = await nav.isVisible().catch(() => false);
      if (!visible) fail(`menú móvil @${vp.name}: el panel no quedó visible`);
      await toggle.click();
      await p.waitForTimeout(350);
      if ((await toggle.getAttribute('aria-expanded')) !== 'false') {
        fail(`menú móvil @${vp.name}: el segundo click no cerró el panel`);
      }
    }
    await p.close();
  }

  // --- carrito (drawer) ---
  {
    const p = await context.newPage();
    await p.goto(BASE + '/carta', { waitUntil: 'networkidle' });
    const add = p.locator('[data-cart-add]').first();
    await add.click();
    await p.locator('[data-cart-open]').first().click();
    await p.waitForTimeout(350);
    const drawer = p.locator('[data-cart-drawer]');
    if (!(await drawer.isVisible())) fail(`carrito @${vp.name}: el cajón no abrió`);
    const subtotal = await p.locator('[data-cart-subtotal]').textContent();
    if (!subtotal || !subtotal.includes('$')) fail(`carrito @${vp.name}: subtotal inválido "${subtotal}"`);
    await p.screenshot({ path: path.join(OUT, `${vp.name}-carrito.png`) });
    await p.close();
  }

  await context.close();
}

await browser.close();

if (failures.length) {
  console.error('QA: FALLAS');
  for (const f of failures) console.error(' - ' + f);
  process.exit(1);
}
console.log(`QA: OK — capturas en ${OUT}`);
