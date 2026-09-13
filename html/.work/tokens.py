import json, time
from playwright.sync_api import sync_playwright
W="/Users/nals_macbook_116/Desktop/clone-web/ichess/ichess-edu-vn-clone/.work"
with sync_playwright() as p:
    b=p.chromium.launch(); ctx=b.new_context(viewport={"width":1920,"height":1080},device_scale_factor=1)
    pg=ctx.new_page(); pg.goto("https://ichess.edu.vn/",wait_until="networkidle",timeout=90000); time.sleep(2)
    h=pg.evaluate("document.body.scrollHeight"); y=0
    while y<h:
        pg.evaluate(f"window.scrollTo(0,{y})"); time.sleep(0.25); y+=800; h=pg.evaluate("document.body.scrollHeight")
    pg.evaluate("window.scrollTo(0,0)"); time.sleep(1)
    out=pg.evaluate("""()=>{
      const bp=new Set();
      for(const s of document.styleSheets){let r;try{r=s.cssRules}catch(e){continue}
        for(const rule of r||[]){ if(rule.media){const m=rule.media.mediaText.match(/(\\d+)px/g); if(m)m.forEach(v=>bp.add(v));}}}
      const vars={}; const cs=getComputedStyle(document.documentElement);
      for(const n of cs){ if(n.startsWith('--')) vars[n]=cs.getPropertyValue(n).trim(); }
      const bodycs=getComputedStyle(document.body);
      const conts=[...document.querySelectorAll('.elementor-container, .container, .elementor-widget-wrap')].slice(0,40)
        .map(e=>({cls:(e.className||'').toString().slice(0,80),w:Math.round(e.getBoundingClientRect().width)}));
      const fonts=new Set(); document.querySelectorAll('h1,h2,h3,h4,h5,p,a,span,div,li').forEach(e=>{const c=getComputedStyle(e);fonts.add(c.fontFamily)});
      return {breakpoints:[...bp].sort((a,b)=>parseInt(a)-parseInt(b)), rootVars:vars,
        body:{font:bodycs.fontFamily,size:bodycs.fontSize,lh:bodycs.lineHeight,color:bodycs.color,bg:bodycs.backgroundColor},
        containers:conts, fontFamilies:[...fonts].slice(0,25)};
    }""")
    open(f"{W}/tokens.json","w").write(json.dumps(out,indent=1,ensure_ascii=False))
    b.close()
