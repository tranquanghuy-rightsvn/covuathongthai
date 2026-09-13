import json,time
from playwright.sync_api import sync_playwright
JS=open("walker.js").read()
with sync_playwright() as p:
    b=p.chromium.launch(); ctx=b.new_context(viewport={"width":1920,"height":1080},device_scale_factor=1)
    pg=ctx.new_page(); pg.goto("https://ichess.edu.vn/",wait_until="networkidle",timeout=90000); time.sleep(2)
    h=pg.evaluate("document.body.scrollHeight"); y=0
    while y<h:
        pg.evaluate(f"window.scrollTo(0,{y})"); time.sleep(0.25); y+=800; h=pg.evaluate("document.body.scrollHeight")
    pg.evaluate("window.scrollTo(0,0)"); time.sleep(1.5)
    for nm,sel in [("footmain",".footer-bottom-above"),("copy","#colophon")]:
        pg.evaluate(f"window.__SEL__={json.dumps(sel)}")
        open(f"sec/{nm}.json","w").write(pg.evaluate(JS))
    b.close()
