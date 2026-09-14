import fs from 'fs';
const key = process.argv[2];
const maxd = +(process.argv[3]||99);
const d = JSON.parse(fs.readFileSync(`dump-${key}.json`,'utf8'));
console.log('TITLE:', d.title, '\nH1:', d.h1, '\nNODES:', d.nodes.length, '\n');
for (const n of d.nodes) {
  if (n.d > maxd) continue;
  const keep = n.text || n.img || n.iframe || n.video || (n.s && (n.s.backgroundImage||n.s.backgroundColor));
  if (!keep && n.d > 6) continue;
  let line = '  '.repeat(Math.min(n.d,12)) + n.tag + (n.cls?'.'+n.cls.split(' ').join('.'):'') + ` [${n.box[0]},${n.box[1]} ${n.box[2]}x${n.box[3]}]`;
  if (n.href) line += ` href=${n.href}`;
  if (n.img) line += ` IMG(${n.img.src.split('/').pop()} ${n.img.nw}x${n.img.nh} alt="${n.img.alt}")`;
  if (n.iframe) line += ` IFRAME(${n.iframe})`;
  if (n.text) line += `  «${n.text}»`;
  if (n.s && process.env.S) line += '  ' + JSON.stringify(n.s);
  console.log(line);
}
