import json, time
from playwright.sync_api import sync_playwright
W="/Users/nals_macbook_116/Desktop/clone-web/ichess/ichess-edu-vn-clone/.work"
with sync_playwright() as p:
    b=p.chromium.launch(); ctx=b.new_context(viewport={"width":1920,"height":1080},device_scale_factor=1)
    pg=ctx.new_page(); pg.goto("https://ichess.edu.vn/",wait_until="networkidle",timeout=90000); time.sleep(2)
    h=pg.evaluate("document.body.scrollHeight"); y=0
    while y<h:
        pg.evaluate(f"window.scrollTo(0,{y})"); time.sleep(0.3); y+=700; h=pg.evaluate("document.body.scrollHeight")
    pg.evaluate("window.scrollTo(0,0)"); time.sleep(1)
    out=pg.evaluate("""()=>{
      const pick=(sel)=>[...document.querySelectorAll(sel)].map(e=>{const r=e.getBoundingClientRect();return{
        tag:e.tagName.toLowerCase(),id:e.id,cls:(e.className||'').toString().slice(0,200),
        top:Math.round(r.top+scrollY),h:Math.round(r.height),w:Math.round(r.width),
        txt:(e.innerText||'').trim().replace(/\\s+/g,' ').slice(0,120)}});
      return {wrapper: pick('#wrapper-container > *'),
              elsections: pick('.elementor-section.elementor-top-section, section.elementor-top-section'),
              header: pick('#masthead, header, .site-header, #thim-header-wrapper')};
    }""")
    open(f"{W}/sections.json","w").write(json.dumps(out,indent=1,ensure_ascii=False))
    b.close()
