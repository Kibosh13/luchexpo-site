import fs from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

import { config, FILL } from '../content/config.mjs';
import { ui, numbers, advantages, steps, faq, standCats, artCats, services, priceList, reviews, clients } from '../content/content.mjs';
import { pages, discount } from '../content/pages.mjs';
import { posts } from '../content/blog.mjs';
import { privacyBody } from './privacy.mjs';
import { icon } from './icons.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DIST = path.join(ROOT, 'dist');
const PHOTOS = path.join(ROOT, 'content', 'photos');
const CACHE = path.join(ROOT, '.cache', 'img');
const STATIC = path.join(ROOT, 'static');
const LANGS = ['ru', 'en'];
const IMG_RE = /\.(jpe?g|png|webp|avif|tiff?)$/i;
const WIDTHS = [480, 960, 1600];
const BUILD_DATE = new Date().toISOString().slice(0, 10);
const warnings = [];

// Превью-сборка (GitHub Pages): PREVIEW=1 SITE_URL=https://user.github.io/repo SITE_BASE=/repo
const PREVIEW = process.env.PREVIEW === '1';
const BASE = (process.env.SITE_BASE || '').replace(/\/$/, '');
if (process.env.SITE_URL) config.baseUrl = process.env.SITE_URL.replace(/\/$/, '');
const withBase = (html) => !BASE ? html : html
  .replace(/(href|src|action)="\/(?!\/)/g, `$1="${BASE}/`)
  .replace(/([\s,["])\/(img|css|js|fonts)\//g, `$1${BASE}/$2/`);

/* ---------- helpers ---------- */
const esc = (s = '') => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const abs = (p) => config.baseUrl + p;
const isFill = (v) => !v || String(v).includes(FILL);
const TR = { а: 'a', б: 'b', в: 'v', г: 'g', д: 'd', е: 'e', ё: 'e', ж: 'zh', з: 'z', и: 'i', й: 'y', к: 'k', л: 'l', м: 'm', н: 'n', о: 'o', п: 'p', р: 'r', с: 's', т: 't', у: 'u', ф: 'f', х: 'h', ц: 'c', ч: 'ch', ш: 'sh', щ: 'sch', ъ: '', ы: 'y', ь: '', э: 'e', ю: 'yu', я: 'ya' };
const slugify = (s) => s.toLowerCase().split('').map((c) => TR[c] ?? c).join('').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const cleanName = (s) => s.replace(/^\d+[\s._-]+/, '').trim();
const price = (n, lang) => lang === 'ru' ? `от ${n.toLocaleString('ru-RU').replace(/\s/g, '\u00a0')}\u00a0₽` : `from ${n.toLocaleString('en-US')} RUB`;
const fmtDate = (d, lang) => new Date(d).toLocaleDateString(lang === 'ru' ? 'ru-RU' : 'en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
const json = (o) => `<script type="application/ld+json">${JSON.stringify(o).replace(/</g, '\\u003c')}</script>`;

async function write(rel, content) {
  const file = path.join(DIST, rel);
  await fs.mkdir(path.dirname(file), { recursive: true });
  await fs.writeFile(file, rel.endsWith('.html') ? withBase(content) : content);
}
const hashOf = (buf) => crypto.createHash('md5').update(buf).digest('hex').slice(0, 8);

/* ---------- images ---------- */
const usedImages = new Set();

async function processImage(file) {
  const rel = path.relative(PHOTOS, file);
  const st = await fs.stat(file);
  const h = hashOf(`${rel}|${st.size}|${st.mtimeMs}`);
  const base = `${slugify(rel.replace(IMG_RE, '')).slice(0, 80)}-${h}`;
  const meta = await sharp(file).metadata();
  const ow = meta.autoOrient?.width ?? meta.width;
  const oh = meta.autoOrient?.height ?? meta.height;
  const widths = WIDTHS.filter((w) => w < ow);
  if (!widths.includes(Math.min(ow, 1600))) widths.push(Math.min(ow, 1600));
  const out = [];
  for (const w of [...new Set(widths)].sort((a, b) => a - b)) {
    const name = `${base}-${w}.webp`;
    const dest = path.join(CACHE, name);
    if (!existsSync(dest)) await sharp(file).rotate().resize({ width: w }).webp({ quality: 78, effort: 5 }).toFile(dest);
    out.push({ w, h: Math.round((oh * w) / ow), url: `/img/p/${name}`, name });
  }
  return { file, base, srcs: out, w: ow, h: oh };
}

async function ogImage(img) {
  const name = `${img.base}-og.jpg`;
  const dest = path.join(CACHE, name);
  if (!existsSync(dest)) await sharp(img.file).rotate().resize(1200, 630, { fit: 'cover' }).jpeg({ quality: 82, mozjpeg: true }).toFile(dest);
  usedImages.add(name);
  return `/img/p/${name}`;
}

function pic(img, alt, { sizes = '(max-width:520px) 100vw, (max-width:860px) 50vw, 33vw', eager = false } = {}) {
  img.srcs.forEach((s) => usedImages.add(s.name));
  const mid = img.srcs.find((s) => s.w >= 960) || img.srcs.at(-1);
  const srcset = img.srcs.map((s) => `${s.url} ${s.w}w`).join(', ');
  return `<img src="${mid.url}" srcset="${srcset}" sizes="${sizes}" width="${mid.w}" height="${mid.h}" alt="${esc(alt)}"${eager ? ' fetchpriority="high"' : ' loading="lazy"'} decoding="async">`;
}
const full = (img) => { const s = img.srcs.at(-1); usedImages.add(s.name); return s.url; };

/* ---------- photos → projects ---------- */
const photoIndex = new Map();

async function scanCategory(cat) {
  const dir = path.join(PHOTOS, cat.dir);
  if (!existsSync(dir)) return [];
  let en = {};
  if (existsSync(path.join(dir, 'en.json'))) en = JSON.parse(await fs.readFile(path.join(dir, 'en.json'), 'utf8'));
  const sort = (a, b) => a.name.localeCompare(b.name, 'ru', { numeric: true });
  const entries = (await fs.readdir(dir, { withFileTypes: true })).filter((e) => !e.name.startsWith('.')).sort(sort);
  const projects = [];
  for (const e of entries) {
    let files, rawName;
    if (e.isFile() && IMG_RE.test(e.name)) {
      files = [path.join(dir, e.name)];
      rawName = e.name.replace(IMG_RE, '');
    } else if (e.isDirectory()) {
      const inner = (await fs.readdir(path.join(dir, e.name), { withFileTypes: true }))
        .filter((f) => f.isFile() && IMG_RE.test(f.name)).sort(sort).map((f) => f.name);
      if (!inner.length) continue;
      const cover = inner.find((n) => /^(обложка|cover)/i.test(n)) || inner[0];
      files = [cover, ...inner.filter((n) => n !== cover)].map((n) => path.join(dir, e.name, n));
      rawName = e.name;
    } else continue;
    const title = cleanName(rawName);
    const images = [];
    for (const f of files) images.push(await processImage(f));
    const project = { key: `${cat.dir}/${rawName}`, cat, title: { ru: title, en: en[title] || en[rawName] || cat.name.en }, images };
    photoIndex.set(project.key, project);
    projects.push(project);
  }
  return projects;
}

/* ---------- urls ---------- */
const P = (id, lang) => pages[id].path[lang];
const standUrl = (c, lang) => `${P('stands', lang)}${c.slug[lang]}/`;
const artUrl = (c, lang) => `${P('art', lang)}${c.slug[lang]}/`;
const catUrl = (c, lang) => (standCats.includes(c) ? standUrl : artUrl)(c, lang);
const serviceUrl = (s, lang) => `${P('services', lang)}${s.slug[lang]}/`;
const postUrl = (p, lang) => `${P('blog', lang)}${p.slug[lang]}/`;
const both = (fn) => ({ ru: fn('ru'), en: fn('en') });

/* ---------- shared blocks ---------- */
let assetV = '';
const mainPhone = config.phones[0];

function logo(lang) {
  return `<a class="logo" href="${P('home', lang)}" aria-label="${esc(config.brand[lang])}"><img src="/img/logo-mark.svg" width="42" height="42" alt=""><span><b>RAY<span>EXPO</span></b><small>${lang === 'ru' ? 'ЛучЭкспо · стенды и декор' : 'Exhibition stands & decor'}</small></span></a>`;
}

function navItems(lang) {
  const t = ui[lang];
  return [
    { name: lang === 'ru' ? 'Стенды' : 'Stands', href: P('stands', lang), sub: [...standCats.map((c) => ({ name: c.name[lang], href: standUrl(c, lang) }))] },
    { name: t.art, href: P('art', lang), sub: artCats.map((c) => ({ name: c.name[lang], href: artUrl(c, lang) })) },
    { name: t.services, href: P('services', lang), sub: services.map((s) => ({ name: s.name[lang], href: serviceUrl(s, lang) })) },
    { name: t.portfolio, href: P('portfolio', lang) },
    { name: t.prices, href: P('prices', lang) },
    { name: t.about, href: P('about', lang), sub: [
      { name: t.about, href: P('about', lang) }, { name: t.reviews, href: P('reviews', lang) },
      { name: t.faq, href: P('faq', lang) }, { name: t.blog, href: P('blog', lang) }] },
    { name: t.contacts, href: P('contacts', lang) },
  ];
}

function header(lang, current, altPath) {
  const t = ui[lang];
  const items = navItems(lang);
  const isCur = (it) => current === it.href || (it.href !== P('home', lang) && current.startsWith(it.href)) || it.sub?.some((s) => current.startsWith(s.href));
  const desk = items.map((it) => `<li${it.sub ? ' class="has-sub"' : ''}><a href="${it.href}"${isCur(it) ? ' aria-current="page"' : ''}>${esc(it.name)}</a>${it.sub ? `<ul class="sub">${it.sub.map((s) => `<li><a href="${s.href}">${esc(s.name)}</a></li>`).join('')}</ul>` : ''}</li>`).join('');
  const mob = items.map((it) => it.sub
    ? `<li><details><summary>${esc(it.name)}</summary><ul><li><a href="${it.href}">${esc(it.name)}</a></li>${it.sub.filter((s) => s.href !== it.href).map((s) => `<li><a href="${s.href}">${esc(s.name)}</a></li>`).join('')}</ul></details></li>`
    : `<li><a href="${it.href}">${esc(it.name)}</a></li>`).join('');
  const phones = config.phones.map((p) => `<a href="tel:${p.href}">${p.display}</a>`).join('');
  const langLink = `<a class="lang" href="${altPath}" hreflang="${t.other}" lang="${t.other}" title="${t.otherName}">${t.otherLabel}</a>`;
  const mail = isFill(config.email) ? `${icon.mail}<span>${FILL}</span>` : `${icon.mail}<a href="mailto:${config.email}">${config.email}</a>`;
  return `<div class="topbar"><div class="wrap">
<span>${icon.pin}${esc(config.address[lang])}</span><span>${icon.clock}${esc(config.hours[lang])}</span><span>${mail}</span>
<span class="topbar-phones">${icon.phone}${phones}</span>${langLink}
</div></div>
<header class="header"><div class="wrap">
${logo(lang)}
<nav class="nav" aria-label="${lang === 'ru' ? 'Основное меню' : 'Main menu'}"><ul>${desk}</ul></nav>
<div class="header-contacts">
<span class="lang-m">${langLink}</span>
<button class="btn btn-red btn-head" type="button" data-open-form="header">${t.request}</button>
<a class="header-call" href="tel:${mainPhone.href}" aria-label="${t.call}">${icon.phone}</a>
<button class="burger" type="button" aria-label="${t.menu}" aria-expanded="false" aria-controls="mnav"><span></span><span></span><span></span></button>
</div></div></header>
<nav class="mnav" id="mnav" aria-label="${t.menu}"><ul>${mob}</ul>
<div class="mphones">${phones}</div>
<p><button class="btn btn-red" type="button" data-open-form="mobile-menu" style="width:100%;margin-top:18px">${t.request}</button></p>
</nav>`;
}

function footer(lang) {
  const t = ui[lang];
  const col = (title, links) => `<div><h2>${esc(title)}</h2><ul>${links.map(([n, h]) => `<li><a href="${h}">${esc(n)}</a></li>`).join('')}</ul></div>`;
  const c = config.company;
  return `<footer class="footer"><div class="wrap">
<div class="footer-grid">
<div>${logo(lang)}
<div class="footer-phones">${config.phones.map((p) => `<a href="tel:${p.href}">${p.display}</a>`).join('')}</div>
<p style="margin-top:12px">${esc(config.address[lang])}<br>${t.email}: ${isFill(config.email) ? FILL : `<a href="mailto:${config.email}">${config.email}</a>`}<br>${t.hours}: ${esc(config.hours[lang])}</p>
</div>
${col(t.stands, [[t.stands, P('stands', lang)], ...standCats.map((x) => [x.name[lang], standUrl(x, lang)])])}
${col(t.art, artCats.map((x) => [x.name[lang], artUrl(x, lang)]))}
${col(t.services, services.map((x) => [x.name[lang], serviceUrl(x, lang)]))}
${col(lang === 'ru' ? 'Компания' : 'Company', [[t.about, P('about', lang)], [t.portfolio, P('portfolio', lang)], [t.prices, P('prices', lang)], [t.reviews, P('reviews', lang)], [t.faq, P('faq', lang)], [t.blog, P('blog', lang)], [t.contacts, P('contacts', lang)]])}
</div>
<div class="footer-bottom">
<span>© ${new Date().getFullYear()} ${esc(config.brand[lang])} · ${esc(lang === 'ru' ? c.legalName : c.legalNameEn)}, ${lang === 'ru' ? 'ИНН' : 'TIN'} ${c.inn}, ${lang === 'ru' ? 'ОГРН' : 'PSRN'} ${c.ogrn}. ${t.offerNote}</span>
<a href="${P('privacy', lang)}">${t.privacy}</a>
</div></div></footer>`;
}

function form(lang, source, { title = '', lead = '' } = {}) {
  const t = ui[lang];
  return `<form class="form" action="/send.php" method="post" novalidate data-ok="${esc(t.fOk)}" data-err="${esc(t.fErr)}" data-required="${esc(t.fRequired)}" data-sending="${esc(t.fSending)}" data-tel="${mainPhone.href}" data-tel-display="${mainPhone.display}">
<div class="fields" style="display:grid;gap:14px">
${title}${lead ? `<p style="margin:0;color:var(--gray)">${esc(lead)}</p>` : ''}
<input type="hidden" name="source" value="${esc(source)}"><input type="hidden" name="lang" value="${lang}"><input type="hidden" name="ts" value="">
<label class="hp" aria-hidden="true">Website<input type="text" name="website" tabindex="-1" autocomplete="off"></label>
<div class="row"><label><span>${t.fName} <i>*</i></span><input type="text" name="name" required autocomplete="name" maxlength="100"></label>
<label><span>${t.fPhone} <i>*</i></span><input type="tel" name="phone" required autocomplete="tel" inputmode="tel" placeholder="+7 (___) ___-__-__" maxlength="40"></label></div>
<label>${t.fEmail}<input type="email" name="email" autocomplete="email" maxlength="120"></label>
<label>${t.fComment}<textarea name="comment" rows="3" maxlength="3000" placeholder="${esc(t.fCommentPh)}"></textarea></label>
<label class="consent"><input type="checkbox" name="consent" value="1" required><span>${t.fConsent.replace('{privacy}', P('privacy', lang))}</span></label>
<button class="btn btn-red" type="submit">${t.fSubmit}</button>
</div>
<p class="form-msg" role="status" aria-live="polite"></p>
</form>`;
}

function contactList(lang) {
  const t = ui[lang];
  return `<ul class="contact-list">
<li>${icon.phone}<div><small>${t.phone}</small>${config.phones.map((p) => `<a href="tel:${p.href}">${p.display}</a>`).join('<br>')}</div></li>
<li>${icon.mail}<div><small>${t.email}</small>${isFill(config.email) ? FILL : `<a href="mailto:${config.email}">${config.email}</a>`}</div></li>
<li>${icon.pin}<div><small>${t.address}</small>${esc(config.address[lang])}</div></li>
<li>${icon.clock}<div><small>${t.hours}</small>${esc(config.hours[lang])}</div></li>
</ul>`;
}

function formSection(lang, source) {
  const t = ui[lang];
  return `<section class="section section-dark" id="request"><div class="wrap form-box">
<div><span class="kicker">${lang === 'ru' ? 'Расчёт стоимости' : 'Get a quote'}</span><h2>${t.formTitle}</h2><p style="color:#d4d4d8;font-size:18px">${t.formLead}</p>${contactList(lang)}</div>
${form(lang, source)}
</div></section>`;
}

function cta(lang, source) {
  const t = ui[lang];
  return `<div class="cta"><div><h2>${lang === 'ru' ? 'Рассчитаем ваш проект' : 'Let’s estimate your project'}</h2><p>${lang === 'ru' ? 'Дизайн и расчёт — за 2–3 дня. Скидка 5% на первый проект.' : 'Design and estimate in 2–3 days. 5% off your first project.'}</p></div>
<div class="cta-actions"><button class="btn btn-dark" type="button" data-open-form="${source}">${t.request}</button><a class="btn btn-line" href="tel:${mainPhone.href}">${icon.phone}${mainPhone.display}</a></div></div>`;
}

const numbersBlock = (lang) => `<div class="numbers">${numbers.map((n) => `<div><b>${n.value}</b><span>${esc(n[lang])}</span></div>`).join('')}</div>`;

const advantagesBlock = (lang, list = advantages) => `<div class="grid grid-3">${list.map((a) => `<div class="adv">${icon[a.icon]}<h3>${esc(a[lang][0])}</h3><p>${esc(a[lang][1])}</p></div>`).join('')}</div>`;

const stepsBlock = (lang) => `<ol class="steps">${steps.map((s) => `<li><h3>${esc(s[lang][0])}</h3><p>${esc(s[lang][1])}</p></li>`).join('')}</ol>`;

function loyaltyBlock(lang) {
  const d = discount[lang];
  return `<div class="loyal">${d.items.map(([v, txt]) => `<div><b>${v === 'gift' ? icon.gift : v}</b><span>${esc(txt)}</span></div>`).join('')}</div>`
    + `<p style="margin-top:18px;color:#a1a1aa;font-size:14px">${lang === 'ru' ? 'Номинал и условия сертификата' : 'Certificate value and terms'}: ${esc(config.giftCertificate[lang])}</p>`;
}

function clientsBlock(lang) {
  const t = ui[lang];
  const cells = clients.length
    ? clients.map((c) => `<div><img src="/img/clients/${c.file}" alt="${esc(c.name)}" loading="lazy" width="160" height="56"></div>`).join('')
    : Array.from({ length: 6 }, () => `<div>${FILL}: ${t.clientLogo.toLowerCase()}</div>`).join('');
  return `<div class="clients">${cells}</div>`;
}

const reviewsBlock = () => `<div class="grid grid-3">${reviews.map((r) => `<article class="review"><div class="stars" aria-hidden="true">★★★★★</div><blockquote>${esc(r.text)}</blockquote><footer><b>${esc(r.name)}</b><span>${esc(r.company)}</span></footer></article>`).join('')}</div>`;

const faqBlock = (lang, items = faq) => `<div class="faq">${items.map((f) => `<details><summary><h3>${esc(f[lang][0])}</h3></summary><p>${esc(f[lang][1])}</p></details>`).join('')}</div>`;
const faqSchema = (lang, items = faq) => ({ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: items.map((f) => ({ '@type': 'Question', name: f[lang][0], acceptedAnswer: { '@type': 'Answer', text: f[lang][1] } })) });

function catsGrid(lang, cats, projects, { cols = 'grid-3' } = {}) {
  const t = ui[lang];
  return `<div class="grid ${cols}">${cats.map((c) => {
    const p = projects.find((x) => x.cat === c);
    const img = p ? pic(p.images[0], c.name[lang]) : `<div class="ph"><img src="/img/logo-mark.svg" alt="" width="56" height="56"></div>`;
    const pr = c.price ?? 30000;
    return `<a class="cat" href="${catUrl(c, lang)}"><div class="cat-img">${img}</div><div class="cat-body"><h3>${esc(c.name[lang])}</h3><span class="cat-price">${price(pr, lang)}</span><span class="link-arrow">${t.more} ${icon.arrow}</span></div></a>`;
  }).join('')}</div>`;
}

function projectsGrid(lang, list) {
  if (!list.length) return `<p class="empty">${ui[lang].emptyCategory}</p>`;
  return `<div class="projects">${list.map((p) => {
    const imgs = p.images.map(full);
    return `<button type="button" class="project" data-cat="${p.cat.dir}" data-cat-name="${esc(p.cat.name[lang])}" data-title="${esc(p.title[lang])}" data-images='${JSON.stringify(imgs)}'>${pic(p.images[0], p.title[lang])}${p.images.length > 1 ? `<span class="count">${p.images.length} ${ui[lang].photo.toLowerCase()}</span>` : ''}<span class="cap"><small>${esc(p.cat.name[lang])}</small>${esc(p.title[lang])}</span></button>`;
  }).join('')}</div>`;
}

function crumbsHtml(lang, crumbs) {
  const all = [{ name: ui[lang].home, path: P('home', lang) }, ...crumbs];
  return `<nav class="crumbs" aria-label="${lang === 'ru' ? 'Хлебные крошки' : 'Breadcrumbs'}"><ol>${all.map((c, i) => `<li>${i < all.length - 1 ? `<a href="${c.path}">${esc(c.name)}</a>` : `<span aria-current="page">${esc(c.name)}</span>`}</li>`).join('')}</ol></nav>`;
}
const crumbsSchema = (lang, crumbs) => ({ '@context': 'https://schema.org', '@type': 'BreadcrumbList',
  itemListElement: [{ name: ui[lang].home, path: P('home', lang) }, ...crumbs].map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: c.name, item: abs(c.path) })) });

function pageHead(lang, crumbs, h1, lead = '', extra = '') {
  return `<section class="page-head"><div class="wrap">${crumbsHtml(lang, crumbs)}<h1>${esc(h1)}</h1>${lead ? `<p class="lead">${esc(lead)}</p>` : ''}${extra}</div></section>`;
}

function orgSchema(lang, ogDefault) {
  const o = {
    '@context': 'https://schema.org', '@type': 'LocalBusiness', '@id': `${config.baseUrl}/#org`,
    name: config.brand[lang], alternateName: config.brand[lang === 'ru' ? 'en' : 'ru'],
    legalName: config.company.legalName, taxID: config.company.inn,
    url: abs(P('home', lang)), logo: abs('/img/logo-512.png'), image: abs(ogDefault),
    telephone: config.phones.map((p) => p.href),
    address: { '@type': 'PostalAddress', streetAddress: config.address.street, addressLocality: config.address.city, addressRegion: config.address.region, addressCountry: 'RU' },
    areaServed: ['Москва', 'Московская область', 'Россия'],
    priceRange: lang === 'ru' ? 'от 10 000 ₽' : 'from 10,000 RUB',
    description: pages.home.desc[lang],
  };
  if (!isFill(config.email)) o.email = config.email;
  if (!isFill(config.hours.ru)) o.openingHours = config.hours.ru;
  if (config.address.postalCode) o.address.postalCode = config.address.postalCode;
  return o;
}

let OG_DEFAULT = '/img/og.jpg';
const sitemap = [];

function layout({ lang, paths, title, desc, body, schema = [], og = OG_DEFAULT, type = 'website', noindex = false }) {
  const t = ui[lang];
  const self = paths[lang];
  const alt = paths[t.other];
  if (title.length > 70) warnings.push(`title > 70 (${title.length}): ${self} — ${title}`);
  if (desc.length > 160) warnings.push(`description > 160 (${desc.length}): ${self}`);
  if (!noindex) sitemap.push({ paths, self });
  const ym = /^\d+$/.test(config.metrikaId) ? config.metrikaId : '';
  return `<!doctype html>
<html lang="${lang}"${ym ? ` data-ym="${ym}"` : ''}${PREVIEW ? ' data-demo="1"' : ''}>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
${PREVIEW ? '<meta name="robots" content="noindex, nofollow">\n' : ''}${noindex ? '<meta name="robots" content="noindex, follow">' : `<link rel="canonical" href="${abs(self)}">
<link rel="alternate" hreflang="ru" href="${abs(paths.ru)}">
<link rel="alternate" hreflang="en" href="${abs(paths.en)}">
<link rel="alternate" hreflang="x-default" href="${abs(paths.ru)}">`}
<meta property="og:type" content="${type}">
<meta property="og:site_name" content="${esc(config.brand[lang])}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:url" content="${abs(self)}">
<meta property="og:image" content="${abs(og)}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:locale" content="${t.locale}">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="#0E0E10">
${config.yandexVerification ? `<meta name="yandex-verification" content="${esc(config.yandexVerification)}">` : '<!-- [заполнить] meta yandex-verification -->'}
<link rel="icon" href="/favicon.ico" sizes="32x32">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">
<link rel="preload" href="/fonts/montserrat-${lang === 'ru' ? 'cyrillic' : 'latin'}.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="/css/style.css?v=${assetV}">
${json(orgSchema(lang, OG_DEFAULT))}
${schema.map(json).join('\n')}
${ym ? metrika(ym) : '<!-- Яндекс Метрика: укажите metrikaId в content/config.mjs -->'}
</head>
<body>
<a class="skip" href="#main">${lang === 'ru' ? 'К содержимому' : 'Skip to content'}</a>
${header(lang, self, alt)}
<main id="main">
${body}
</main>
${footer(lang)}
<div class="mbar"><a class="btn btn-line" style="color:#fff" href="tel:${mainPhone.href}">${icon.phone}${t.call}</a><button class="btn btn-red" type="button" data-open-form="mobile-bar">${t.request}</button></div>
<dialog class="modal" id="modal" aria-label="${t.formTitle}">${form(lang, 'modal', { title: `<p class="h2" style="font-size:24px;font-weight:800;text-transform:uppercase;margin:0;line-height:1.15">${t.formTitle}</p>`, lead: t.formLead }).replace('<div class="fields"', `<button class="x" type="button" data-close aria-label="${t.close}">×</button><div class="fields"`)}</dialog>
<dialog class="lightbox" id="lightbox" aria-label="${t.portfolio}"><div class="lb-stage"><img alt=""></div><p class="lb-cap"></p><button class="lb-btn lb-prev" type="button" aria-label="${t.prev}">‹</button><button class="lb-btn lb-next" type="button" aria-label="${t.next}">›</button><button class="x" type="button" data-close aria-label="${t.close}">×</button></dialog>
<div class="cookie" id="cookie" hidden><p>${t.cookie.replace('{privacy}', P('privacy', lang))}</p><button class="btn btn-red" type="button">${t.cookieOk}</button></div>
<script src="/js/main.js?v=${assetV}" defer></script>
</body>
</html>`;
}

function metrika(id) {
  return `<script>(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};m[i].l=1*new Date();for(var j=0;j<document.scripts.length;j++){if(document.scripts[j].src===r){return;}}k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})(window,document,"script","https://mc.yandex.ru/metrika/tag.js","ym");ym(${id},"init",{clickmap:true,trackLinks:true,accurateTrackBounce:true,webvisor:true});</script>
<noscript><div><img src="https://mc.yandex.ru/watch/${id}" style="position:absolute;left:-9999px" alt=""></div></noscript>`;
}

/* ---------- pages ---------- */
async function out(paths, lang, html) {
  const p = paths[lang];
  await write(p.endsWith('/') ? `${p}index.html` : p, html);
}

async function buildLang(lang, data) {
  const t = ui[lang];
  const { projects, standProjects, artProjects, heroImg } = data;
  const sec = (inner, cls = '') => `<section class="section ${cls}"><div class="wrap">${inner}</div></section>`;
  const head2 = (kicker, h2, p = '', link = '') => `<div class="section-head"><div>${kicker ? `<span class="kicker">${esc(kicker)}</span>` : ''}<h2>${esc(h2)}</h2></div>${p ? `<p>${esc(p)}</p>` : ''}${link}</div>`;

  /* home */
  {
    const pg = pages.home;
    const latest = [...standProjects.slice(0), ...artProjects].filter((_, i) => i % 2 === 0).slice(0, 6);
    const body = `
<section class="hero"><div class="hero-bg">${pic(heroImg, '', { sizes: '100vw', eager: true })}</div><div class="wrap">
<h1>${lang === 'ru' ? 'Выставочные стенды <em>под ключ</em> по России' : 'Turnkey <em>exhibition stands</em> across Russia'}</h1>
<p class="hero-lead">${esc(pg.lead[lang])}</p>
<ul class="hero-list">${pg.bullets[lang].map((b) => `<li>${icon.check}${esc(b)}</li>`).join('')}</ul>
<div class="hero-actions"><button class="btn btn-red" type="button" data-open-form="hero">${t.request}</button><a class="btn btn-line" href="tel:${mainPhone.href}">${icon.phone}${mainPhone.display}</a></div>
</div></section>
<section class="section section-dark numbers-band"><div class="wrap">${numbersBlock(lang)}</div></section>
${sec(head2(lang === 'ru' ? 'Что мы строим' : 'What we build', t.stands, lang === 'ru' ? 'Любые форматы — от углового стенда до двухэтажного. Дизайн, производство, монтаж и демонтаж.' : 'Any format — from a corner stand to a double-deck one. Design, production, installation and dismantling.', `<a class="link-arrow" href="${P('stands', lang)}">${t.more} ${icon.arrow}</a>`) + catsGrid(lang, standCats, projects))}
${sec(head2('', t.art, lang === 'ru' ? 'Объёмные фигуры, декорации, архитектурные формы, новогоднее оформление и оформление ТЦ.' : '3D figures, sets, architectural forms, New Year and mall decor.', `<a class="link-arrow" href="${P('art', lang)}">${t.more} ${icon.arrow}</a>`) + catsGrid(lang, artCats, projects), 'section-light')}
${sec(head2(lang === 'ru' ? 'Почему ЛучЭкспо' : 'Why RayExpo', lang === 'ru' ? 'Почему выбирают нас' : 'Why clients choose us') + advantagesBlock(lang))}
${sec(head2(t.portfolio, lang === 'ru' ? 'Наши работы' : 'Our work', '', `<a class="link-arrow" href="${P('portfolio', lang)}">${t.allProjects} ${icon.arrow}</a>`) + projectsGrid(lang, latest), 'section-light')}
${sec(head2(lang === 'ru' ? 'Порядок работы' : 'How we work', lang === 'ru' ? 'От заявки до демонтажа' : 'From request to dismantling') + stepsBlock(lang))}
${sec(head2(lang === 'ru' ? 'Выгоднее с каждым проектом' : 'Better value with every project', discount[lang].title, lang === 'ru' ? 'Чем дольше мы работаем вместе, тем больше вы экономите.' : 'The longer we work together, the more you save.', `<a class="link-arrow" href="${P('prices', lang)}">${t.prices} ${icon.arrow}</a>`) + loyaltyBlock(lang), 'section-dark')}
${sec(head2('', t.clientsTitle) + clientsBlock(lang))}
${sec(head2('', t.reviews, '', `<a class="link-arrow" href="${P('reviews', lang)}">${t.more} ${icon.arrow}</a>`) + reviewsBlock(), 'section-light')}
${sec(head2('', t.faq, '', `<a class="link-arrow" href="${P('faq', lang)}">${t.more} ${icon.arrow}</a>`) + faqBlock(lang, faq.slice(0, 5)))}
${formSection(lang, 'home')}`;
    await out(pg.path, lang, layout({ lang, paths: pg.path, title: pg.title[lang], desc: pg.desc[lang], body, schema: [faqSchema(lang, faq.slice(0, 5))] }));
  }

  /* hubs: stands & art */
  for (const [id, cats, list] of [['stands', standCats, standProjects], ['art', artCats, artProjects]]) {
    const pg = pages[id];
    const crumbs = [{ name: pg.h1[lang], path: pg.path[lang] }];
    const seo = pg.seo ? sec(`<div class="prose">${pg.seo[lang].map(([h, p]) => `<h2>${esc(h)}</h2><p>${esc(p)}</p>`).join('')}</div>`) : '';
    const body = `${pageHead(lang, crumbs, pg.h1[lang], pg.lead[lang])}
${sec(catsGrid(lang, cats, list))}
${sec(head2(t.portfolio, lang === 'ru' ? 'Примеры работ' : 'Examples') + projectsGrid(lang, list), 'section-light')}
${seo}
${sec(head2('', lang === 'ru' ? 'Как мы работаем' : 'How we work') + stepsBlock(lang), seo ? 'section-light' : '')}
${formSection(lang, id)}`;
    await out(pg.path, lang, layout({ lang, paths: pg.path, title: pg.title[lang], desc: pg.desc[lang], body, schema: [crumbsSchema(lang, crumbs)] }));
  }

  /* categories */
  for (const cat of [...standCats, ...artCats]) {
    const isStand = standCats.includes(cat);
    const hub = pages[isStand ? 'stands' : 'art'];
    const paths = both((l) => catUrl(cat, l));
    const crumbs = [{ name: hub.h1[lang], path: hub.path[lang] }, { name: cat.h1[lang], path: paths[lang] }];
    const list = projects.filter((p) => p.cat === cat);
    const siblings = (isStand ? standCats : artCats).filter((c) => c !== cat);
    const pr = price(cat.price ?? 30000, lang);
    const body = `${pageHead(lang, crumbs, cat.h1[lang], cat.intro[lang], `<div class="price-tag">${t.priceFrom}: <b>${pr}</b></div>`)}
${sec(head2(t.portfolio, lang === 'ru' ? 'Наши проекты' : 'Our projects', list.length ? (lang === 'ru' ? 'Нажмите на фото, чтобы открыть галерею.' : 'Click a photo to open the gallery.') : '') + projectsGrid(lang, list))}
${sec(`<div class="split"><div><h2>${lang === 'ru' ? 'Что мы делаем' : 'What we offer'}</h2><ul class="checks">${cat.features[lang].map((f) => `<li>${icon.check}${esc(f)}</li>`).join('')}</ul></div>
<div><h2>${lang === 'ru' ? 'Под ключ' : 'Turnkey'}</h2><ul class="checks">${steps.map((s) => `<li>${icon.check}<span><b>${esc(s[lang][0])}.</b> ${esc(s[lang][1])}</span></li>`).join('')}</ul></div></div>`, 'section-light')}
${sec(cta(lang, `cat-${cat.id}`))}
${sec(head2('', lang === 'ru' ? (isStand ? 'Другие виды стендов' : 'Другие направления') : (isStand ? 'Other stand types' : 'Other categories')) + catsGrid(lang, siblings, projects, { cols: siblings.length > 4 ? 'grid-3' : 'grid-4' }), 'section-light')}
${formSection(lang, `cat-${cat.id}`)}`;
    const cover = list[0] ? await ogImage(list[0].images[0]) : OG_DEFAULT;
    await out(paths, lang, layout({ lang, paths, title: cat.title[lang], desc: cat.desc[lang], body, og: cover,
      schema: [crumbsSchema(lang, crumbs), { '@context': 'https://schema.org', '@type': 'Service', name: cat.h1[lang], description: cat.desc[lang], provider: { '@id': `${config.baseUrl}/#org` }, areaServed: 'RU',
        offers: { '@type': 'Offer', priceCurrency: 'RUB', price: cat.price ?? 30000, priceSpecification: { '@type': 'PriceSpecification', minPrice: cat.price ?? 30000, priceCurrency: 'RUB' } } }] }));
  }

  /* services */
  const serviceImg = { dizajn: 0, izgotovlenie: 3, montazh: 1, dekoracii: standProjects.length };
  const svcCover = (s) => projects[Math.min(serviceImg[s.id] ?? 0, projects.length - 1)];
  {
    const pg = pages.services;
    const crumbs = [{ name: pg.h1[lang], path: pg.path[lang] }];
    const cards = `<div class="grid grid-4">${services.map((s) => `<a class="cat" href="${serviceUrl(s, lang)}"><div class="cat-img">${pic(svcCover(s).images[0], s.name[lang])}</div><div class="cat-body"><h3>${esc(s.name[lang])}</h3><p>${esc(s.short[lang])}</p><span class="link-arrow">${t.more} ${icon.arrow}</span></div></a>`).join('')}</div>`;
    const body = `${pageHead(lang, crumbs, pg.h1[lang], pg.lead[lang])}
${sec(cards)}
${sec(head2('', lang === 'ru' ? 'Как мы работаем' : 'How we work') + stepsBlock(lang), 'section-light')}
${sec(head2('', lang === 'ru' ? 'Почему выбирают нас' : 'Why clients choose us') + advantagesBlock(lang))}
${formSection(lang, 'services')}`;
    await out(pg.path, lang, layout({ lang, paths: pg.path, title: pg.title[lang], desc: pg.desc[lang], body, schema: [crumbsSchema(lang, crumbs)] }));
  }
  for (const s of services) {
    const paths = both((l) => serviceUrl(s, l));
    const crumbs = [{ name: pages.services.h1[lang], path: P('services', lang) }, { name: s.name[lang], path: paths[lang] }];
    const cover = svcCover(s);
    const others = services.filter((x) => x !== s);
    const body = `${pageHead(lang, crumbs, s.name[lang], s.short[lang])}
${sec(`<div class="split"><div class="prose"><p style="font-size:18px">${esc(s.intro[lang])}</p><h2>${lang === 'ru' ? 'Что входит' : 'What’s included'}</h2><ul class="checks">${s.includes[lang].map((f) => `<li>${icon.check}${esc(f)}</li>`).join('')}</ul>
<p><button class="btn btn-red" type="button" data-open-form="service-${s.id}">${t.request}</button></p></div>
<div class="media-rounded">${pic(cover.images[0], cover.title[lang], { sizes: '(max-width:900px) 100vw, 45vw' })}</div></div>`)}
${sec(head2('', lang === 'ru' ? 'Этапы работы' : 'Work stages') + stepsBlock(lang), 'section-light')}
${sec(head2(t.portfolio, lang === 'ru' ? 'Примеры работ' : 'Examples', '', `<a class="link-arrow" href="${P('portfolio', lang)}">${t.allProjects} ${icon.arrow}</a>`) + projectsGrid(lang, (s.id === 'dekoracii' ? artProjects : standProjects).slice(0, 6)))}
${sec(head2('', lang === 'ru' ? 'Другие услуги' : 'Other services') + `<div class="grid grid-3">${others.map((o) => `<a class="cat" href="${serviceUrl(o, lang)}"><div class="cat-body"><h3>${esc(o.name[lang])}</h3><p>${esc(o.short[lang])}</p><span class="link-arrow">${t.more} ${icon.arrow}</span></div></a>`).join('')}</div>`, 'section-light')}
${formSection(lang, `service-${s.id}`)}`;
    await out(paths, lang, layout({ lang, paths, title: s.title[lang], desc: s.desc[lang], body, og: await ogImage(cover.images[0]),
      schema: [crumbsSchema(lang, crumbs), { '@context': 'https://schema.org', '@type': 'Service', name: s.name[lang], description: s.desc[lang], provider: { '@id': `${config.baseUrl}/#org` }, areaServed: 'RU' }] }));
  }

  /* portfolio */
  {
    const pg = pages.portfolio;
    const crumbs = [{ name: pg.h1[lang], path: pg.path[lang] }];
    const cats = [...standCats, ...artCats].filter((c) => projects.some((p) => p.cat === c));
    const btn = (f, name, n, pressed = false) => `<button type="button" data-filter="${f}" aria-pressed="${pressed}">${esc(name)}<span>${n}</span></button>`;
    const filters = `<div class="filters" role="group" aria-label="${lang === 'ru' ? 'Фильтр' : 'Filter'}">${btn('all', t.filterAll, projects.length, true)}${btn('stendy', t.stands, standProjects.length)}${btn('art', t.art, artProjects.length)}${cats.map((c) => btn(c.dir, c.name[lang], projects.filter((p) => p.cat === c).length)).join('')}</div>`;
    const body = `${pageHead(lang, crumbs, pg.h1[lang], pg.lead[lang])}
${sec(filters + projectsGrid(lang, projects))}
${sec(cta(lang, 'portfolio'), 'section-light')}
${formSection(lang, 'portfolio')}`;
    await out(pg.path, lang, layout({ lang, paths: pg.path, title: pg.title[lang], desc: pg.desc[lang], body, schema: [crumbsSchema(lang, crumbs)] }));
  }

  /* prices */
  {
    const pg = pages.prices;
    const crumbs = [{ name: pg.h1[lang], path: pg.path[lang] }];
    const linkFor = (row) => row.link === 'stands' ? P('stands', lang) : artUrl(artCats.find((c) => c.id === row.link), lang);
    const table = `<table class="price-table"><thead><tr><th>${lang === 'ru' ? 'Направление' : 'Category'}</th><th>${lang === 'ru' ? 'Стоимость' : 'Price'}</th></tr></thead><tbody>${priceList.map((r) => `<tr><td><a href="${linkFor(r)}">${esc(r[lang])}</a></td><td>${price(r.from, lang)}</td></tr>`).join('')}</tbody></table>`;
    const body = `${pageHead(lang, crumbs, pg.h1[lang], pg.lead[lang])}
${sec(`<div class="split"><div>${table}</div><div class="prose"><h2>${lang === 'ru' ? 'Что влияет на цену' : 'What affects the price'}</h2><ul class="checks">${(lang === 'ru' ? ['Площадь и формат стенда', 'Конструкция и материалы', 'Свет, LED-экраны, мультимедиа', 'Мебель, печать, оборудование', 'Сроки подготовки', 'Монтаж, демонтаж, логистика'] : ['Stand area and format', 'Structure and materials', 'Lighting, LED screens, multimedia', 'Furniture, print, equipment', 'Preparation time', 'Installation, dismantling, logistics']).map((x) => `<li>${icon.check}${x}</li>`).join('')}</ul>
<p>${lang === 'ru' ? 'Делаем под бюджет клиента: назовите сумму — предложим лучшее решение в её рамках.' : 'We work to the client’s budget: tell us the amount and we’ll offer the best solution within it.'}</p></div></div>`)}
${sec(`<div class="section-head"><div><span class="kicker">${lang === 'ru' ? 'Скидки' : 'Discounts'}</span><h2>${discount[lang].title}</h2></div></div>` + loyaltyBlock(lang), 'section-dark')}
${sec(cta(lang, 'prices'))}
${formSection(lang, 'prices')}`;
    await out(pg.path, lang, layout({ lang, paths: pg.path, title: pg.title[lang], desc: pg.desc[lang], body, schema: [crumbsSchema(lang, crumbs)] }));
  }

  /* about */
  {
    const pg = pages.about;
    const crumbs = [{ name: pg.h1[lang], path: pg.path[lang] }];
    const body = `${pageHead(lang, crumbs, pg.h1[lang], pg.lead[lang])}
${sec(`<div class="split"><div class="prose">${pg.text[lang].map((p) => `<p>${esc(p)}</p>`).join('')}<p><button class="btn btn-red" type="button" data-open-form="about">${t.request}</button></p></div><div class="media-rounded">${pic(heroImg, config.brand[lang], { sizes: '(max-width:900px) 100vw, 45vw' })}</div></div>`)}
${sec(numbersBlock(lang), 'section-dark')}
${sec(`<div class="section-head"><h2>${lang === 'ru' ? 'Наши преимущества' : 'Our advantages'}</h2></div>` + advantagesBlock(lang), 'section-light')}
${sec(`<div class="section-head"><h2>${lang === 'ru' ? 'Порядок работы' : 'How we work'}</h2></div>` + stepsBlock(lang))}
${sec(`<div class="section-head"><h2>${t.clientsTitle}</h2></div>` + clientsBlock(lang), 'section-light')}
${sec(`<div class="section-head"><h2>${t.reviews}</h2><a class="link-arrow" href="${P('reviews', lang)}">${t.more} ${icon.arrow}</a></div>` + reviewsBlock())}
${formSection(lang, 'about')}`;
    await out(pg.path, lang, layout({ lang, paths: pg.path, title: pg.title[lang], desc: pg.desc[lang], body, schema: [crumbsSchema(lang, crumbs)] }));
  }

  /* reviews */
  {
    const pg = pages.reviews;
    const crumbs = [{ name: pg.h1[lang], path: pg.path[lang] }];
    const body = `${pageHead(lang, crumbs, pg.h1[lang], pg.lead[lang])}
${sec(reviewsBlock())}
${sec(`<div class="section-head"><h2>${t.clientsTitle}</h2></div>` + clientsBlock(lang), 'section-light')}
${formSection(lang, 'reviews')}`;
    await out(pg.path, lang, layout({ lang, paths: pg.path, title: pg.title[lang], desc: pg.desc[lang], body, schema: [crumbsSchema(lang, crumbs)] }));
  }

  /* faq */
  {
    const pg = pages.faq;
    const crumbs = [{ name: pg.h1[lang], path: pg.path[lang] }];
    const body = `${pageHead(lang, crumbs, pg.h1[lang], pg.lead[lang])}
${sec(faqBlock(lang))}
${sec(cta(lang, 'faq'), 'section-light')}
${formSection(lang, 'faq')}`;
    await out(pg.path, lang, layout({ lang, paths: pg.path, title: pg.title[lang], desc: pg.desc[lang], body, schema: [crumbsSchema(lang, crumbs), faqSchema(lang)] }));
  }

  /* blog */
  const postCover = (p) => photoIndex.get(p.cover) || projects[0];
  const postCard = (p) => { const c = postCover(p); return `<a class="post-card" href="${postUrl(p, lang)}"><div class="cat-img">${pic(c.images[0], p.title[lang])}</div><div class="cat-body"><span class="post-meta">${fmtDate(p.date, lang)} · ${p.minutes} ${t.minRead}</span><h3>${esc(p.title[lang])}</h3><p>${esc(p.desc[lang])}</p><span class="link-arrow">${t.readMore} ${icon.arrow}</span></div></a>`; };
  {
    const pg = pages.blog;
    const crumbs = [{ name: pg.h1[lang], path: pg.path[lang] }];
    const body = `${pageHead(lang, crumbs, pg.h1[lang], pg.lead[lang])}
${sec(`<div class="grid grid-3">${posts.map(postCard).join('')}</div>`)}
${formSection(lang, 'blog')}`;
    await out(pg.path, lang, layout({ lang, paths: pg.path, title: pg.title[lang], desc: pg.desc[lang], body, schema: [crumbsSchema(lang, crumbs)] }));
  }
  for (const p of posts) {
    const paths = both((l) => postUrl(p, l));
    const crumbs = [{ name: pages.blog.h1[lang], path: P('blog', lang) }, { name: p.title[lang], path: paths[lang] }];
    const c = postCover(p);
    const og = await ogImage(c.images[0]);
    const others = posts.filter((x) => x !== p);
    const body = `${pageHead(lang, crumbs, p.title[lang], '', `<p class="post-meta" style="margin:0"><time datetime="${p.date}">${fmtDate(p.date, lang)}</time> · ${p.minutes} ${t.minRead}</p>`)}
<section class="section"><div class="wrap"><article class="prose"><div class="article-cover">${pic(c.images[0], p.title[lang], { sizes: '(max-width:860px) 100vw, 820px' })}</div>${p.body[lang]}</article></div></section>
${sec(cta(lang, `blog-${p.id}`))}
${sec(`<div class="section-head"><h2>${lang === 'ru' ? 'Читайте также' : 'Read also'}</h2></div><div class="grid grid-2">${others.map(postCard).join('')}</div>`, 'section-light')}
${formSection(lang, `blog-${p.id}`)}`;
    await out(paths, lang, layout({ lang, paths, title: p.seoTitle[lang], desc: p.desc[lang], body, og, type: 'article',
      schema: [crumbsSchema(lang, crumbs), { '@context': 'https://schema.org', '@type': 'BlogPosting', headline: p.title[lang], description: p.desc[lang], datePublished: p.date, dateModified: p.date, image: abs(og), inLanguage: lang, mainEntityOfPage: abs(paths[lang]), author: { '@id': `${config.baseUrl}/#org` }, publisher: { '@id': `${config.baseUrl}/#org` } }] }));
  }

  /* contacts */
  {
    const pg = pages.contacts;
    const crumbs = [{ name: pg.h1[lang], path: pg.path[lang] }];
    const c = config.company;
    const map = `https://yandex.ru/map-widget/v1/?text=${encodeURIComponent(config.address.mapQuery)}&z=16&lang=${lang === 'ru' ? 'ru_RU' : 'en_US'}`;
    const body = `${pageHead(lang, crumbs, pg.h1[lang], lang === 'ru' ? 'Позвоните или оставьте заявку — ответим, уточним задачу и подготовим предложение за 2–3 дня.' : 'Call us or send a request — we will reply, clarify the brief and prepare a proposal in 2–3 days.')}
${sec(`<div class="contact-cards">
<div>${icon.phone}<h2>${t.phone}</h2>${config.phones.map((p) => `<a href="tel:${p.href}">${p.display}</a>`).join('')}</div>
<div>${icon.mail}<h2>${t.email}</h2>${isFill(config.email) ? `<p>${FILL}</p>` : `<a href="mailto:${config.email}">${config.email}</a>`}</div>
<div>${icon.pin}<h2>${t.address}</h2><p>${esc(config.address[lang])}</p></div>
<div>${icon.clock}<h2>${t.hours}</h2><p>${esc(config.hours[lang])}</p></div>
</div>
<div class="map" style="margin-top:22px"><iframe src="${map}" title="${lang === 'ru' ? 'Карта: как нас найти' : 'Map: how to find us'}" loading="lazy" allowfullscreen></iframe></div>`)}
${sec(`<div class="split"><div><h2>${t.requisites}</h2><p class="req">${esc(lang === 'ru' ? c.legalNameFull : c.legalNameEn)}<br>${lang === 'ru' ? 'ИНН' : 'TIN'} ${c.inn} · ${lang === 'ru' ? 'КПП' : 'KPP'} ${c.kpp}<br>${lang === 'ru' ? 'ОГРН' : 'PSRN'} ${c.ogrn}<br>${lang === 'ru' ? 'Юридический адрес' : 'Legal address'}: ${esc(c.legalAddress)}</p></div>
<div><h2>${lang === 'ru' ? 'География' : 'Coverage'}</h2><p>${lang === 'ru' ? 'Москва и Московская область. Выставочные стенды под ключ — по всей России.' : 'Moscow and the Moscow region. Turnkey exhibition stands across Russia.'}</p></div></div>`, 'section-light')}
${formSection(lang, 'contacts')}`;
    await out(pg.path, lang, layout({ lang, paths: pg.path, title: pg.title[lang], desc: pg.desc[lang], body, schema: [crumbsSchema(lang, crumbs)] }));
  }

  /* privacy */
  {
    const pg = pages.privacy;
    const crumbs = [{ name: pg.h1[lang], path: pg.path[lang] }];
    const body = `${pageHead(lang, crumbs, pg.h1[lang])}${sec(`<div class="prose">${privacyBody(lang, config)}</div>`)}`;
    await out(pg.path, lang, layout({ lang, paths: pg.path, title: pg.title[lang], desc: pg.desc[lang], body, schema: [crumbsSchema(lang, crumbs)] }));
  }
}

async function build404() {
  const lang = 'ru';
  const body = `<section class="notfound"><div class="wrap"><b>404</b><h1 style="font-size:clamp(24px,3vw,36px)">Страница не найдена</h1><p>Возможно, она была перемещена или вы ошиблись в адресе. / Page not found.</p>
<p style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap"><a class="btn btn-red" href="/">На главную</a><a class="btn btn-dark" href="/portfolio/">Портфолио</a><a class="btn btn-dark" href="/en/">English</a></p></div></section>`;
  await write('404.html', layout({ lang, paths: { ru: '/404.html', en: '/en/' }, title: 'Страница не найдена — ЛучЭкспо', desc: 'Страница не найдена.', body, noindex: true }));
}

async function buildSitemap() {
  const seen = new Set();
  const urls = sitemap.filter((s) => !seen.has(s.self) && seen.add(s.self)).map((s) => `<url><loc>${abs(s.self)}</loc><lastmod>${BUILD_DATE}</lastmod>
<xhtml:link rel="alternate" hreflang="ru" href="${abs(s.paths.ru)}"/><xhtml:link rel="alternate" hreflang="en" href="${abs(s.paths.en)}"/></url>`);
  await write('sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls.join('\n')}\n</urlset>\n`);
  if (PREVIEW) return write('robots.txt', 'User-agent: *\nDisallow: /\n');
  await write('robots.txt', `User-agent: *\nDisallow: /send.php\nDisallow: /mail-config.php\nClean-param: utm_source&utm_medium&utm_campaign&utm_content&utm_term&yclid&ysclid&gclid&v\n\nSitemap: ${config.baseUrl}/sitemap.xml\n`);
}

async function buildIcons() {
  const svg = await fs.readFile(path.join(STATIC, 'favicon.svg'));
  await sharp(svg).resize(180, 180).png().toFile(path.join(DIST, 'apple-touch-icon.png'));
  await sharp(svg).resize(512, 512).png().toFile(path.join(DIST, 'img', 'logo-512.png'));
  await sharp(svg).resize(192, 192).png().toFile(path.join(DIST, 'img', 'icon-192.png'));
  await sharp(svg).resize(120, 120).png().toFile(path.join(DIST, 'favicon-120.png'));
  const png = await sharp(svg).resize(32, 32).png().toBuffer();
  const ico = Buffer.alloc(22);
  ico.writeUInt16LE(0, 0); ico.writeUInt16LE(1, 2); ico.writeUInt16LE(1, 4);
  ico.writeUInt8(32, 6); ico.writeUInt8(32, 7); ico.writeUInt16LE(1, 10); ico.writeUInt16LE(32, 12);
  ico.writeUInt32LE(png.length, 14); ico.writeUInt32LE(22, 18);
  await fs.writeFile(path.join(DIST, 'favicon.ico'), Buffer.concat([ico, png]));
  await write('site.webmanifest', JSON.stringify({ name: 'ЛучЭкспо — RayExpo', short_name: 'RayExpo', icons: [{ src: 'img/icon-192.png', sizes: '192x192', type: 'image/png' }, { src: 'img/logo-512.png', sizes: '512x512', type: 'image/png' }], theme_color: '#0E0E10', background_color: '#0E0E10', display: 'browser' }));
}

/* ---------- main ---------- */
async function main() {
  await fs.rm(DIST, { recursive: true, force: true });
  await fs.mkdir(path.join(DIST, 'img', 'p'), { recursive: true });
  await fs.mkdir(CACHE, { recursive: true });
  await fs.cp(STATIC, DIST, { recursive: true });
  await fs.mkdir(path.join(DIST, 'fonts'), { recursive: true });
  const fontDir = path.join(ROOT, 'node_modules', '@fontsource-variable', 'montserrat', 'files');
  await fs.copyFile(path.join(fontDir, 'montserrat-cyrillic-wght-normal.woff2'), path.join(DIST, 'fonts', 'montserrat-cyrillic.woff2'));
  await fs.copyFile(path.join(fontDir, 'montserrat-latin-wght-normal.woff2'), path.join(DIST, 'fonts', 'montserrat-latin.woff2'));
  assetV = hashOf(Buffer.concat([await fs.readFile(path.join(STATIC, 'css', 'style.css')), await fs.readFile(path.join(STATIC, 'js', 'main.js'))]));

  const standProjects = [], artProjects = [];
  for (const c of standCats) standProjects.push(...await scanCategory(c));
  for (const c of artCats) artProjects.push(...await scanCategory(c));
  const projects = [...standProjects, ...artProjects];
  if (!projects.length) throw new Error('Нет ни одной фотографии в content/photos');
  const heroImg = (photoIndex.get('stendy/s-ekranom/03 Стенд с LED-экраном и деревянным подвесом') || projects[0]).images[0];
  await sharp(heroImg.file).rotate().resize(1200, 630, { fit: 'cover' }).jpeg({ quality: 82, mozjpeg: true }).toFile(path.join(DIST, 'img', 'og.jpg'));

  for (const lang of LANGS) await buildLang(lang, { projects, standProjects, artProjects, heroImg });
  await build404();
  await buildSitemap();
  await buildIcons();
  for (const name of usedImages) await fs.copyFile(path.join(CACHE, name), path.join(DIST, 'img', 'p', name));

  console.log(`Готово: ${sitemap.length} страниц, ${projects.length} проектов, ${usedImages.size} изображений → dist/`);
  warnings.forEach((w) => console.warn('⚠', w));
}

main().catch((e) => { console.error(e); process.exit(1); });
