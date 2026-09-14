import { chromium } from 'playwright';
const [name, orig, clone, w, y, h] = process.argv.slice(2);
const b = await chromium.launch();
for (const [tag, url] of [['goc', orig], ['clone', clone]]) {
  const p = await (await b.newContext({ viewport:{width:+w,height:1000},
    userAgent:'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131 Safari/537.36' })).newPage();
  await p.goto(url, { waitUntil:'load', timeout:90000 });
  await p.waitForTimeout(3000);
  await p.screenshot({ path:`crop-${name}-${w}-${tag}.png`, fullPage:true, clip:{x:0,y:+y,width:+w,height:+h} });
  await p.close();
}
await b.close();
