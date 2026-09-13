import sys,time
from playwright.sync_api import sync_playwright
W=int(sys.argv[1]); js=sys.argv[2]
with sync_playwright() as p:
    b=p.chromium.launch(); pg=b.new_page(viewport={"width":W,"height":900})
    pg.goto("https://ichess.edu.vn/",wait_until="networkidle",timeout=90000); time.sleep(1)
    h=pg.evaluate("document.body.scrollHeight"); y=0
    while y<h:
        pg.evaluate(f"window.scrollTo(0,{y})"); time.sleep(0.15); y+=800
    pg.evaluate("window.scrollTo(0,0)"); time.sleep(1)
    print(pg.evaluate(js)); b.close()
