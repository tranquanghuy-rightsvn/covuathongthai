import json, time, sys
from playwright.sync_api import sync_playwright
W="/Users/nals_macbook_116/Desktop/clone-web/ichess/ichess-edu-vn-clone/.work"
JS = r"""
() => {
  const PROPS=["color","fontSize","fontWeight","fontFamily","lineHeight","letterSpacing","textTransform","textAlign","fontStyle",
   "backgroundColor","backgroundImage","backgroundSize","backgroundPosition","backgroundRepeat",
   "display","flexDirection","justifyContent","alignItems","gap","flexWrap","gridTemplateColumns",
   "width","maxWidth","height","minHeight","padding","margin","borderRadius","border","borderBottom","borderTop","boxShadow",
   "position","zIndex","transform","objectFit","overflow","opacity"];
  const SKIP=new Set(['SCRIPT','STYLE','NOSCRIPT','LINK','META','svg']);
  function st(n){const c=getComputedStyle(n);const o={};
    for(const p of PROPS){let v=c[p];
      if(!v||v==='none'||v==='normal'||v==='auto'||v==='0px'||v==='rgba(0, 0, 0, 0)'||v==='static'||v==='1'||v==='visible'||v==='0px none rgb(0, 0, 0)') continue;
      if(p==='margin'&&v==='0px')continue; o[p]=v;}
    return o;}
  function walk(n,d){
    if(SKIP.has(n.tagName))return null;
    const r=n.getBoundingClientRect();
    if(r.width===0&&r.height===0&&n.tagName!=='IMG')return null;
    const kids=[...n.children].map(c=>walk(c,d+1)).filter(Boolean);
    const own=[...n.childNodes].filter(x=>x.nodeType===3&&x.textContent.trim()).map(x=>x.textContent.trim()).join(' ');
    const o={t:n.tagName.toLowerCase(),c:(n.className||'').toString().replace(/elementor-(element|widget|invisible|animation)[\w-]*/g,'').replace(/\s+/g,' ').trim().slice(0,140),
      box:[Math.round(r.left),Math.round(r.top+scrollY),Math.round(r.width),Math.round(r.height)],s:st(n)};
    if(n.id)o.id=n.id;
    if(own)o.txt=own.slice(0,400);
    if(n.tagName==='IMG')o.src=n.currentSrc||n.src,o.alt=n.alt,o.nat=[n.naturalWidth,n.naturalHeight];
    if(n.tagName==='A')o.href=n.getAttribute('href');
    if(n.tagName==='IFRAME')o.src=n.src;
    if(kids.length)o.k=kids;
    return o;}

  const el=document.querySelector(window.__SEL__);
  return el?JSON.stringify(walk(el,0)):JSON.stringify({error:'not found '+window.__SEL__});
}
"""
sels = sys.argv[1:]
with sync_playwright() as p:
    b=p.chromium.launch(); ctx=b.new_context(viewport={"width":1920,"height":1080},device_scale_factor=1)
    pg=ctx.new_page(); pg.goto("https://ichess.edu.vn/",wait_until="networkidle",timeout=90000); time.sleep(2)
    h=pg.evaluate("document.body.scrollHeight"); y=0
    while y<h:
        pg.evaluate(f"window.scrollTo(0,{y})"); time.sleep(0.25); y+=800; h=pg.evaluate("document.body.scrollHeight")
    pg.evaluate("window.scrollTo(0,0)"); time.sleep(1.5)
    for i,s in enumerate(sels):
        pg.evaluate(f"window.__SEL__ = {json.dumps(s)}")
        r=pg.evaluate(JS)
        name=s.replace('#','').replace('.','_').replace(' ','_').replace('>','-')[:40]
        open(f"{W}/dump-{i}-{name}.json","w").write(r)
        print(f"dump-{i}-{name}.json", len(r))
    b.close()
