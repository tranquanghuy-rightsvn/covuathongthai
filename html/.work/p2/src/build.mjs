import fs from 'fs';
import path from 'path';
import { header, mnav } from './nav.mjs';

const OUT = path.resolve('../../');           // html/
const SRC = path.resolve('src');
const FOOTER = fs.readFileSync(`${SRC}/_footer.html`, 'utf8');
const FLOAT  = fs.readFileSync(`${SRC}/_float.html`, 'utf8');

export function emit({ file, title, active = '', css = [], body, js = [] }) {
  const sheets = ['css/main.css', ...css].map(c => `<link rel="stylesheet" href="${c}">`).join('\n');
  const scripts = ['js/main.js', 'js/cart.js', ...js].map(s => `<script src="${s}" defer></script>`).join('\n');
  const html = `<!DOCTYPE html>
<html lang="vi">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${title}</title>
<link rel="preload" href="fonts/montserrat-vietnamese.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="fonts/montserrat-latin.woff2" as="font" type="font/woff2" crossorigin>
${sheets}
</head>
<body>

${header(active)}

${mnav()}

<div class="header-spacer"></div>

${body.trim()}

${FOOTER}

${FLOAT}

${scripts}
</body>
</html>
`;
  fs.writeFileSync(path.join(OUT, file), html);
  return html.length;
}

export const esc = s => String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');

/** red page-title band used by inner pages */
export function band(text, mod = 'band--lg') {
  return `  <div class="band ${mod}"><h1>${text}</h1></div>`;
}

/** breadcrumb strip */
export function crumbs(items) {
  const li = items.map((it, i) =>
    i === items.length - 1
      ? `<li aria-current="page">${it.label}</li>`
      : `<li><a href="${it.href}">${it.label}</a></li>`
  ).join('');
  return `  <nav class="crumbs" aria-label="Đường dẫn"><div class="wrap"><ul>${li}</ul></div></nav>`;
}
