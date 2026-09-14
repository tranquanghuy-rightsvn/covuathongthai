import { chromium } from 'playwright';
import fs from 'fs';

const urls = JSON.parse(fs.readFileSync('urls.json','utf8'));
const only = process.argv.slice(2);
const entries = Object.entries(urls).filter(([k]) => !only.length || only.includes(k));

const EXTRACT = () => {
  const PROPS = ["color","fontSize","fontWeight","fontFamily","lineHeight","letterSpacing","textTransform","textAlign","fontStyle",
    "backgroundColor","backgroundImage","backgroundSize","backgroundPosition","backgroundRepeat",
    "display","flexDirection","justifyContent","alignItems","gap","flexWrap","gridTemplateColumns",
    "width","maxWidth","height","minHeight","padding","margin","borderRadius","border","borderBottom","boxShadow",
    "position","zIndex","objectFit","overflow","opacity"];
  const SKIP = new Set(['SCRIPT','STYLE','NOSCRIPT','LINK','META','BR']);
  const clean = s => (s||'').replace(/\s+/g,' ').trim();
  function st(n){
    const c = getComputedStyle(n), o = {};
    for (const p of PROPS){
      let v = c[p];
      if(!v||v==='none'||v==='normal'||v==='auto'||v==='0px'||v==='rgba(0, 0, 0, 0)'||v==='static'||v==='visible'||v==='nowrap'||v==='start'||v==='0px none rgb(0, 0, 0)') continue;
      if(p==='opacity'&&v==='1') continue;
      if(p==='zIndex'&&v==='auto') continue;
      o[p]=v;
    }
    return o;
  }
  const out = [];
  function walk(n, d){
    if (n.nodeType!==1 || SKIP.has(n.tagName)) return;
    const r = n.getBoundingClientRect();
    const cs = getComputedStyle(n);
    if (cs.display==='none') return;
    const kids0 = n.children.length;
    if (r.width===0 && r.height===0 && n.tagName!=='IMG' && kids0===0) return;
    const kids = [...n.children];
    const ownText = clean([...n.childNodes].filter(x=>x.nodeType===3).map(x=>x.textContent).join(' '));
    const isLeafish = kids.length===0 || (ownText.length>0);
    const rec = {
      d, tag:n.tagName.toLowerCase(),
      cls: clean(n.className && n.className.toString ? n.className.toString() : '').split(' ').filter(c=>c&&!/^elementor-(element|widget-container|inner|column-wrap|invisible)/.test(c)).slice(0,6).join(' '),
      box:[Math.round(r.x),Math.round(r.y+scrollY),Math.round(r.width),Math.round(r.height)],
    };
    if (ownText) rec.text = ownText.slice(0,1500);
    if (n.tagName==='IMG') rec.img = {src:n.currentSrc||n.src, alt:n.alt, nw:n.naturalWidth, nh:n.naturalHeight};
    if (n.tagName==='A') rec.href = n.getAttribute('href');
    if (n.tagName==='IFRAME') rec.iframe = n.src;
    if (n.tagName==='VIDEO') rec.video = n.src || (n.querySelector('source')||{}).src;
    const s = st(n);
    if (Object.keys(s).length) rec.s = s;
    out.push(rec);
    for (const k of kids) walk(k, d+1);
  }
  const root = document.querySelector('#main-content') || document.querySelector('.site-content') || document.querySelector('#content') || document.body;
  walk(root, 0);
  return { title: document.title, h1: clean((document.querySelector('h1')||{}).textContent), nodes: out };
};

const browser = await chromium.launch();
for (const [key, url] of entries) {
  const ctx = await browser.newContext({ viewport:{width:1440,height:1000}, deviceScaleFactor:1,
    userAgent:'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36' });
  const page = await ctx.newPage();
  try {
    await page.goto(url, { waitUntil:'load', timeout:90000 });
    await page.waitForTimeout(3500);
    await page.evaluate(async () => {
      // lazy-load everything
      await new Promise(res => { let y=0; const t=setInterval(()=>{ y+=800; scrollTo(0,y); if(y>document.body.scrollHeight){clearInterval(t);scrollTo(0,0);res();} },60); });
    });
    await page.addStyleTag({ content: '*{animation:none!important;transition:none!important;visibility:visible!important} .thim-animated,[data-animation],.wow{opacity:1!important;transform:none!important}' });
    await page.waitForTimeout(2500);
    // strip chrome for cleaner shots
    const data = await page.evaluate(EXTRACT);
    fs.writeFileSync(`dump-${key}.json`, JSON.stringify(data));
    const html = await page.content();
    fs.writeFileSync(`raw-${key}.html`, html);
    await page.screenshot({ path:`shot-${key}-1440.png`, fullPage:true });
    await page.setViewportSize({width:390,height:844});
    await page.waitForTimeout(1200);
    await page.screenshot({ path:`shot-${key}-390.png`, fullPage:true });
    console.log('OK', key, data.nodes.length, 'nodes', Math.round(html.length/1024)+'KB');
  } catch (e) {
    console.log('FAIL', key, e.message.slice(0,120));
  }
  await ctx.close();
}
await browser.close();
