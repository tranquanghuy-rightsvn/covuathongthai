import fs from 'fs';
import path from 'path';

const manifest = JSON.parse(fs.readFileSync('manifest.json', 'utf8'));
const OUT = path.resolve('../../');
const entries = Object.entries(manifest);
let done = 0, skipped = 0, failed = [];

async function grab([url, rel]) {
  const dest = path.join(OUT, rel);
  if (fs.existsSync(dest) && fs.statSync(dest).size > 0) { skipped++; return; }
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const r = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0', 'Referer': 'https://ichess.edu.vn/' } });
      if (!r.ok) throw new Error('HTTP ' + r.status);
      const buf = Buffer.from(await r.arrayBuffer());
      if (!buf.length) throw new Error('empty');
      fs.writeFileSync(dest, buf);
      done++; return;
    } catch (e) {
      if (attempt === 2) failed.push(rel + ' <- ' + url + ' (' + e.message + ')');
      else await new Promise(r => setTimeout(r, 600));
    }
  }
}

for (let i = 0; i < entries.length; i += 6) {
  await Promise.all(entries.slice(i, i + 6).map(grab));
  process.stdout.write(`\r${Math.min(i + 6, entries.length)}/${entries.length}`);
}
console.log(`\ntải mới: ${done}, đã có: ${skipped}, lỗi: ${failed.length}`);
failed.forEach(f => console.log('  LỖI', f));
