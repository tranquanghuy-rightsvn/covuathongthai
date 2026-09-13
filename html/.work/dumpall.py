import json,time,os
from playwright.sync_api import sync_playwright
W=os.getcwd(); JS=open("walker.js").read()
with sync_playwright() as p:
    b=p.chromium.launch(); ctx=b.new_context(viewport={"width":1920,"height":1080},device_scale_factor=1)
    pg=ctx.new_page(); pg.goto("https://ichess.edu.vn/",wait_until="networkidle",timeout=90000); time.sleep(2)
    h=pg.evaluate("document.body.scrollHeight"); y=0
    while y<h:
        pg.evaluate(f"window.scrollTo(0,{y})"); time.sleep(0.25); y+=800; h=pg.evaluate("document.body.scrollHeight")
    pg.evaluate("window.scrollTo(0,0)"); time.sleep(1.5)
    os.makedirs("sec",exist_ok=True)
    for i in range(29):
        sel=f".elementor-17019 > *:nth-child({i+1})"
        pg.evaluate(f"window.__SEL__={json.dumps(sel)}")
        r=pg.evaluate(JS)
        open(f"sec/s{i:02d}.json","w").write(r)
    # footer + copyright
    for nm,sel in [("footer","#colophon, footer.site-footer, .site-footer"),("copyright",".copyright, #copyright, .site-copyright")]:
        pg.evaluate(f"window.__SEL__={json.dumps(sel)}")
        open(f"sec/{nm}.json","w").write(pg.evaluate(JS))
    print("done", sum(os.path.getsize(f"sec/{f}") for f in os.listdir("sec")))
    b.close()
