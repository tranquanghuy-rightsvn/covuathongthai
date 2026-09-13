import json, sys, time
from playwright.sync_api import sync_playwright

URL = "https://ichess.edu.vn/"
W = "/Users/nals_macbook_116/Desktop/clone-web/ichess/ichess-edu-vn-clone/.work"

with sync_playwright() as p:
    b = p.chromium.launch()
    ctx = b.new_context(viewport={"width":1920,"height":1080}, device_scale_factor=1,
                        user_agent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36")
    pg = ctx.new_page()
    pg.goto(URL, wait_until="networkidle", timeout=90000)
    time.sleep(2)
    # scroll sweep
    h = pg.evaluate("document.body.scrollHeight")
    y = 0
    while y < h:
        pg.evaluate(f"window.scrollTo(0,{y})")
        time.sleep(0.35)
        y += 600
        h = pg.evaluate("document.body.scrollHeight")
    pg.evaluate("window.scrollTo(0, document.body.scrollHeight)")
    time.sleep(2)
    pg.evaluate("window.scrollTo(0,0)")
    time.sleep(1.5)

    info = pg.evaluate("""() => ({
        title: document.title,
        scrollH: document.body.scrollHeight,
        bodyClass: document.body.className,
        generator: (document.querySelector('meta[name=generator]')||{}).content||'',
        sections: [...document.querySelectorAll('body > *, main > *, #main > *, .site-content > *')].slice(0,80).map(e=>({
            tag:e.tagName.toLowerCase(), id:e.id, cls:(e.className||'').toString().slice(0,160),
            top: Math.round(e.getBoundingClientRect().top + scrollY), h: Math.round(e.getBoundingClientRect().height)
        }))
    })""")
    open(f"{W}/page-info.json","w").write(json.dumps(info, indent=1, ensure_ascii=False))
    open(f"{W}/rendered.html","w").write(pg.content())
    pg.screenshot(path=f"{W}/shots/orig-full-1920.png", full_page=True)
    print(json.dumps({"title":info["title"],"scrollH":info["scrollH"],"gen":info["generator"]}, ensure_ascii=False))
    b.close()
