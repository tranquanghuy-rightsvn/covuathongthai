import json,time,sys,os,subprocess,threading,http.server,socketserver,functools
from playwright.sync_api import sync_playwright
ROOT=os.path.abspath(os.path.join(os.path.dirname(__file__),'..'))
PORT=8765
Handler=functools.partial(http.server.SimpleHTTPRequestHandler, directory=ROOT)
class Q(http.server.SimpleHTTPRequestHandler):
    def log_message(self,*a): pass
socketserver.TCPServer.allow_reuse_address=True
srv=socketserver.ThreadingTCPServer(("127.0.0.1",PORT),functools.partial(Q,directory=ROOT))
threading.Thread(target=srv.serve_forever,daemon=True).start()
FREEZE="()=>{const st=document.createElement('style');st.textContent='*,*::before,*::after{animation:none!important;transition:none!important}';document.head.appendChild(st);}"
widths=[int(x) for x in sys.argv[1:]] or [1920,1366,768,375]
with sync_playwright() as p:
    b=p.chromium.launch()
    for W in widths:
        ctx=b.new_context(viewport={"width":W,"height":900},device_scale_factor=1)
        pg=ctx.new_page(); pg.add_init_script("window.setInterval=function(){return 0}"); pg.goto(f"http://127.0.0.1:{PORT}/index.html",wait_until="load"); time.sleep(0.5)
        # lazy images: scroll through
        h=pg.evaluate("document.body.scrollHeight"); y=0
        while y<h:
            pg.evaluate(f"window.scrollTo(0,{y})"); time.sleep(0.1); y+=800
        pg.evaluate("window.scrollTo(0,0)"); time.sleep(2.5)
        pg.evaluate(FREEZE)
        pg.evaluate("document.querySelectorAll('.carousel').forEach(c=>{c.dispatchEvent(new Event('mouseenter'))})")
        pg.screenshot(path=f"{ROOT}/.work/shots/clone-{W}.png", full_page=True)
        info=pg.evaluate("({H:document.documentElement.scrollHeight, sw:document.documentElement.scrollWidth, secs:[...document.querySelectorAll('main > *, footer')].map(e=>{const r=e.getBoundingClientRect();return [e.className, Math.round(r.top+scrollY), Math.round(r.height)]}), header:document.querySelector('.site-header').getBoundingClientRect().height})")
        json.dump(info,open(f"{ROOT}/.work/shots/clone-{W}.json","w"))
        info={"H":info["H"],"sw":info["sw"]}
        print(W, info)
        ctx.close()
    b.close()
srv.shutdown()
