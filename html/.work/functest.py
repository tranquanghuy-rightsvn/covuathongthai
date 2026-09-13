import time,threading,functools,http.server,socketserver,os,json
from playwright.sync_api import sync_playwright
ROOT=os.path.abspath('..'); PORT=8767
class Q(http.server.SimpleHTTPRequestHandler):
    def log_message(self,*a): pass
socketserver.TCPServer.allow_reuse_address=True
srv=socketserver.ThreadingTCPServer(("127.0.0.1",PORT),functools.partial(Q,directory=ROOT)); threading.Thread(target=srv.serve_forever,daemon=True).start()
URL=f"http://127.0.0.1:{PORT}/index.html"
OVER="""()=>{const W=innerWidth;const bad=[];document.querySelectorAll('main *, header *, footer *').forEach(e=>{if(e.closest('.carousel__track,.mnav,.sub-menu'))return;const r=e.getBoundingClientRect();if(r.width>0&&(r.right>W+1||r.left<-1))bad.push((e.className||e.tagName).toString().slice(0,40)+' '+Math.round(r.left)+'-'+Math.round(r.right))});return {sw:document.documentElement.scrollWidth,W,bad:bad.slice(0,8)}}"""
with sync_playwright() as p:
    b=p.chromium.launch()
    ext=set(); errs=[]; broken=[]
    for W in [1920,1600,1440,1366,1200,1024,991,768,600,480,375,320]:
        pg=b.new_page(viewport={"width":W,"height":900})
        pg.on("request", lambda r: ext.add(r.url.split('?')[0][:80]) if not r.url.startswith(URL.rsplit('/',1)[0]) and not r.url.startswith('data:') else None)
        pg.on("console", lambda m: errs.append(m.text) if m.type=='error' else None)
        pg.on("pageerror", lambda e: errs.append(str(e)))
        pg.goto(URL,wait_until="load"); time.sleep(0.4)
        for y in range(0,12000,900): pg.evaluate(f"scrollTo(0,{y})"); time.sleep(0.05)
        time.sleep(0.5)
        r=pg.evaluate(OVER)
        imgs=pg.evaluate("[...document.images].filter(i=>i.complete&&i.naturalWidth===0).map(i=>i.src)")
        broken+=imgs
        print(W,'scrollW',r['sw'],'overflow:',r['bad'])
        pg.close()
    # functional
    pg=b.new_page(viewport={"width":375,"height":800}); pg.goto(URL,wait_until="load"); time.sleep(0.5)
    pg.click(".nav-toggle"); time.sleep(0.4)
    op=pg.evaluate("document.querySelector('.mnav').classList.contains('open') && getComputedStyle(document.querySelector('.mnav__panel')).transform")
    pg.click("summary"); time.sleep(0.2); det=pg.evaluate("document.querySelector('.mnav details').open")
    pg.click(".mnav__close"); time.sleep(0.4); cl=pg.evaluate("document.querySelector('.mnav').classList.contains('open')")
    print("mobile menu open:",op,"submenu:",det,"closed-after:",not cl)
    pg.close()
    pg=b.new_page(viewport={"width":1920,"height":900}); pg.goto(URL,wait_until="load"); time.sleep(0.5)
    pg.hover(".menu>li.has-sub>a"); time.sleep(0.4)
    print("dropdown visible:",pg.evaluate("getComputedStyle(document.querySelector('.sub-menu')).visibility"))
    g=pg.locator(".gallery .carousel").first; g.scroll_into_view_if_needed(); time.sleep(0.3)
    t0=pg.evaluate("getComputedStyle(document.querySelector('.gallery .carousel__track')).transform")
    pg.locator(".gallery .carousel__btn--next").first.click(); time.sleep(0.8)
    t1=pg.evaluate("getComputedStyle(document.querySelector('.gallery .carousel__track')).transform")
    for _ in range(9): pg.locator(".gallery .carousel__btn--next").first.click(); time.sleep(0.7)
    t2=pg.evaluate("[getComputedStyle(document.querySelector('.gallery .carousel__track')).transform, [...document.querySelectorAll('.gallery .carousel__dots')[0].children].findIndex(d=>d.classList.contains('active'))]")
    pg.locator(".gallery .carousel__btn--prev").first.click(); time.sleep(0.8)
    t3=pg.evaluate("[...document.querySelectorAll('.gallery .carousel__dots')[0].children].findIndex(d=>d.classList.contains('active'))")
    print("carousel:",t0,'->',t1,'| after 10 next:',t2,'| prev ->dot',t3)
    print("sticky:",pg.evaluate("document.querySelector('.site-header').classList.contains('is-sticky')"), "backtop:",pg.evaluate("document.querySelector('.back-top').classList.contains('show')"))
    pg.evaluate("scrollTo(0,0)"); time.sleep(0.3); print("top sticky:",pg.evaluate("document.querySelector('.site-header').classList.contains('is-sticky')"))
    print("autoplay test:"); pg2=b.new_page(viewport={"width":1920,"height":900}); pg2.goto(URL,wait_until="load"); a=pg2.evaluate("getComputedStyle(document.querySelector('.team .carousel__track')).transform"); time.sleep(4.8); c=pg2.evaluate("getComputedStyle(document.querySelector('.team .carousel__track')).transform"); print(' team',a,'->',c)
    b.close()
print("EXTERNAL:",sorted(ext)); print("ERRORS:",errs[:5]); print("BROKEN IMG:",broken)
srv.shutdown()
