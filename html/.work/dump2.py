import json, time, sys
from playwright.sync_api import sync_playwright
W="/Users/nals_macbook_116/Desktop/clone-web/ichess/ichess-edu-vn-clone/.work"
JS=open(f"{W}/walker.js").read()
noscroll = "--noscroll" in sys.argv
sels=[a for a in sys.argv[1:] if not a.startswith("--")]
with sync_playwright() as p:
    b=p.chromium.launch(); ctx=b.new_context(viewport={"width":1920,"height":1080},device_scale_factor=1)
    pg=ctx.new_page(); pg.goto("https://ichess.edu.vn/",wait_until="networkidle",timeout=90000); time.sleep(2)
    if not noscroll:
        h=pg.evaluate("document.body.scrollHeight"); y=0
        while y<h:
            pg.evaluate(f"window.scrollTo(0,{y})"); time.sleep(0.25); y+=800; h=pg.evaluate("document.body.scrollHeight")
        pg.evaluate("window.scrollTo(0,0)"); time.sleep(1.5)
    for i,s in enumerate(sels):
        pg.evaluate(f"window.__SEL__ = {json.dumps(s)}")
        r=pg.evaluate(JS)
        name=s.replace('#','').replace('.','_').replace(' ','_').replace('>','-').replace(',','')[:40]
        open(f"{W}/dump-{name}.json","w").write(r)
        print(f"dump-{name}.json", len(r))
    b.close()
