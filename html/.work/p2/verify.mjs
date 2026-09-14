import fs from 'fs';
import path from 'path';
const ROOT = path.resolve('.');
const pages = fs.readdirSync(ROOT).filter(f => f.endsWith('.html'));
let problems = [];
const exists = p => fs.existsSync(path.join(ROOT, decodeURIComponent(p)));

for (const f of pages) {
  const h = fs.readFileSync(path.join(ROOT, f), 'utf8');
  // tài nguyên nội bộ
  for (const m of h.matchAll(/(?:src|href)="((?!https?:|mailto:|tel:|#|data:)[^"]+)"/g)) {
    const u = m[1].split('#')[0];
    if (!u) continue;
    if (!exists(u)) problems.push(`${f}: thiếu ${u}`);
  }
  // còn sót link về site gốc
  for (const m of h.matchAll(/(?:src|href)="(https?:\/\/(?:www\.)?ichess\.edu\.vn[^"]*)"/g)) {
    problems.push(`${f}: còn trỏ site gốc ${m[1]}`);
  }
  // chữ iChess còn sót trong nội dung hiển thị
  const visible = h.replace(/<(script|style)[\s\S]*?<\/\1>/g, '').replace(/<[^>]*>/g, ' ');
  const hits = visible.match(/iChess|ICHESS|ichess/g);
  if (hits) problems.push(`${f}: còn ${hits.length} chữ "iChess" hiển thị`);
}
const dead = {};
for (const f of pages) {
  const h = fs.readFileSync(path.join(ROOT, f), 'utf8');
  const n = (h.match(/href="#"/g) || []).length;
  if (n) dead[f] = n;
}
console.log('Số trang:', pages.length);
console.log('Lỗi:', problems.length);
problems.slice(0, 40).forEach(p => console.log('  -', p));
console.log('href="#" theo trang:', JSON.stringify(dead));
