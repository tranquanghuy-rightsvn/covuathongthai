import json,time,sys
from playwright.sync_api import sync_playwright
with sync_playwright() as p:
    b=p.chromium.launch(); ctx=b.new_context(viewport={"width":1920,"height":1080},device_scale_factor=1)
    pg=ctx.new_page(); pg.goto("https://ichess.edu.vn/",wait_until="networkidle",timeout=90000); time.sleep(2)
    h=pg.evaluate("document.body.scrollHeight"); y=0
    while y<h:
        pg.evaluate(f"window.scrollTo(0,{y})"); time.sleep(0.25); y+=800; h=pg.evaluate("document.body.scrollHeight")
    pg.evaluate("window.scrollTo(0,0)"); time.sleep(1.5)
    r=pg.evaluate("""()=>{
      const root=document.querySelector('.elementor-section-wrap')||document.querySelector('[data-elementor-type=wp-page] > .elementor-section-wrap')||document.querySelector('.elementor-inner');
      const out=[];
      const kids = root? [...root.children] : [...document.querySelectorAll('.elementor-top-section')];
      kids.forEach((e,i)=>{const r=e.getBoundingClientRect();out.push({i,id:e.id,cls:(e.className||'').toString().replace(/elementor-(element|widget)[\\w-]*/g,'').replace(/\\s+/g,' ').slice(0,120),
        top:Math.round(r.top+scrollY),h:Math.round(r.height),bg:getComputedStyle(e).backgroundColor,bgi:getComputedStyle(e).backgroundImage.slice(0,90),
        txt:(e.innerText||'').trim().replace(/\\s+/g,' ').slice(0,110)})});
      return JSON.stringify({rootCls:root?root.className:'NONE', n:kids.length, out});
    }""")
    open("toplist.json","w").write(r); print(r[:200])
    b.close()
