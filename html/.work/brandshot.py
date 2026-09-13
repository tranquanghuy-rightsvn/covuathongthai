import time,threading,functools,http.server,socketserver,os
from playwright.sync_api import sync_playwright
from PIL import Image
ROOT=os.path.abspath('..'); PORT=8769
class Q(http.server.SimpleHTTPRequestHandler):
    def log_message(self,*a): pass
socketserver.TCPServer.allow_reuse_address=True
srv=socketserver.ThreadingTCPServer(("127.0.0.1",PORT),functools.partial(Q,directory=ROOT)); threading.Thread(target=srv.serve_forever,daemon=True).start()
U=f"http://127.0.0.1:{PORT}/index.html"
def el(pg,sel,path,i=0):
    e=pg.locator(sel).nth(i); e.scroll_into_view_if_needed(); time.sleep(0.4); e.screenshot(path=path)
with sync_playwright() as p:
    b=p.chromium.launch()
    for W in [1920,375]:
        pg=b.new_page(viewport={"width":W,"height":900}); pg.add_init_script("window.setInterval=function(){return 0}"); pg.goto(U); time.sleep(1)
        pg.screenshot(path=f"shots/b-head-{W}.png",clip={"x":0,"y":0,"width":W,"height":130})
        el(pg,".benefit",f"shots/b-benefit-{W}.png")
        el(pg,".band",f"shots/b-band-{W}.png",7)
        el(pg,".footer-main",f"shots/b-foot-{W}.png")
        pg.evaluate("scrollTo(0,3000)"); time.sleep(0.4); pg.evaluate("scrollTo(0,2900)"); time.sleep(0.6)
        pg.screenshot(path=f"shots/b-sticky-{W}.png",clip={"x":0,"y":0,"width":W,"height":130})
        pg.close()
    b.close()
srv.shutdown()
def stack(files,w,out):
    ims=[Image.open(f) for f in files]; ims=[i.resize((w,int(i.size[1]*w/i.size[0]))) for i in ims]
    o=Image.new("RGB",(w,sum(i.size[1] for i in ims)+8*len(ims)),"#3060ff"); y=0
    for i in ims: o.paste(i,(0,y)); y+=i.size[1]+8
    o.save(out)
stack([f"shots/b-{n}-1920.png" for n in ["head","sticky","benefit","band","foot"]],1100,"shots/brand-1920.png")
stack([f"shots/b-{n}-375.png" for n in ["head","sticky","benefit","band","foot"]],375,"shots/brand-375.png")
