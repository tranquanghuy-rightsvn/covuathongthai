import json,time,os
from playwright.sync_api import sync_playwright
JS=open("walker.js").read()
with sync_playwright() as p:
    b=p.chromium.launch(); ctx=b.new_context(viewport={"width":1920,"height":1080},device_scale_factor=1)
    pg=ctx.new_page(); pg.goto("https://ichess.edu.vn/",wait_until="networkidle",timeout=90000); time.sleep(2)
    h=pg.evaluate("document.body.scrollHeight"); y=0
    while y<h:
        pg.evaluate(f"window.scrollTo(0,{y})"); time.sleep(0.25); y+=800; h=pg.evaluate("document.body.scrollHeight")
    pg.evaluate("window.scrollTo(0,0)"); time.sleep(1.5)
    print(pg.evaluate("""()=>{
      const el=document.querySelector('.elementor-17019');
      let n=el.nextElementSibling, o=[];
      while(n){const r=n.getBoundingClientRect();o.push(n.tagName+'#'+n.id+'.'+(n.className||'').toString().slice(0,80)+' ['+Math.round(r.top+scrollY)+' h'+Math.round(r.height)+']');n=n.nextElementSibling}
      let p=el.parentElement; o.push('--parent--'+p.tagName+'#'+p.id);
      n=p.nextElementSibling; while(n){const r=n.getBoundingClientRect();o.push('SIB '+n.tagName+'#'+n.id+'.'+(n.className||'').toString().slice(0,80)+' ['+Math.round(r.top+scrollY)+' h'+Math.round(r.height)+']');n=n.nextElementSibling}
      return o.join('\\n');}"""))
    for nm,sel in [("footer2","#colophon"),("footer3",".site-footer"),("footer4","footer")]:
        pg.evaluate(f"window.__SEL__={json.dumps(sel)}")
        r=pg.evaluate(JS); open(f"sec/{nm}.json","w").write(r); print(nm,len(r))
    b.close()
