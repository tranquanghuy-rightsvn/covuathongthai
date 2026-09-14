import { chromium } from 'playwright';
const jobs = JSON.parse(process.argv[2]);
const widths = JSON.parse(process.argv[3] || '[1440,390]');
const b = await chromium.launch();
for (const [name, orig, clone] of jobs) {
  for (const w of widths) {
    for (const [tag, url] of [['goc', orig], ['clone', clone]]) {
      const p = await (await b.newContext({ viewport:{width:w,height:1000},
        userAgent:'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131 Safari/537.36' })).newPage();
      await p.goto(url, { waitUntil:'load', timeout:90000 });
      await p.evaluate(async () => { await new Promise(r => { let y=0; const t=setInterval(()=>{y+=900;scrollTo(0,y);if(y>document.body.scrollHeight){clearInterval(t);scrollTo(0,0);r();}},40); }); });
      await p.waitForTimeout(2500);
      await p.screenshot({ path:`sbs-${name}-${w}-${tag}.png`, fullPage:true });
      await p.close();
    }
    console.log('xong', name, w);
  }
}
await b.close();
