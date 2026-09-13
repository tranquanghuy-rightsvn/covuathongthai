import json,time
from playwright.sync_api import sync_playwright
with sync_playwright() as p:
    b=p.chromium.launch(); ctx=b.new_context(viewport={"width":1920,"height":1080},device_scale_factor=1)
    pg=ctx.new_page(); pg.goto("https://ichess.edu.vn/",wait_until="networkidle",timeout=90000); time.sleep(2)
    h=pg.evaluate("document.body.scrollHeight"); y=0
    while y<h:
        pg.evaluate(f"window.scrollTo(0,{y})"); time.sleep(0.25); y+=800; h=pg.evaluate("document.body.scrollHeight")
    pg.evaluate("window.scrollTo(0,0)"); time.sleep(1.5)
    r=pg.evaluate("""()=>{
      const el=document.querySelector('[data-elementor-type]');
      const path=[]; let n=el; while(n&&n.tagName!=='BODY'){path.unshift(n.tagName.toLowerCase()+(n.id?'#'+n.id:'')+'.'+(n.className||'').toString().replace(/\\s+/g,'.').slice(0,90)); n=n.parentElement;}
      const kids=[...el.children].map((e,i)=>{const r=e.getBoundingClientRect();const c=getComputedStyle(e);return{i,id:e.id,
        cls:(e.className||'').toString().replace(/elementor-(element|widget)[\\w-]*/g,'').replace(/\\s+/g,' ').trim().slice(0,110),
        top:Math.round(r.top+scrollY),h:Math.round(r.height),w:Math.round(r.width),bg:c.backgroundColor,bgi:c.backgroundImage.slice(0,120),pad:c.padding,
        txt:(e.innerText||'').trim().replace(/\\s+/g,' ').slice(0,100)}});
      return JSON.stringify({path, root:el.tagName+'.'+el.className, n:kids.length, kids});
    }""")
    open("toplist2.json","w").write(r)
    b.close()
