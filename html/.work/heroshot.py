import time,threading,functools,http.server,socketserver,os,json
from playwright.sync_api import sync_playwright
from PIL import Image
ROOT=os.path.abspath('..'); PORT=8770
class Q(http.server.SimpleHTTPRequestHandler):
    def log_message(self,*a): pass
socketserver.TCPServer.allow_reuse_address=True
srv=socketserver.ThreadingTCPServer(("127.0.0.1",PORT),functools.partial(Q,directory=ROOT)); threading.Thread(target=srv.serve_forever,daemon=True).start()
U=f"http://127.0.0.1:{PORT}/index.html"; shots=[]
with sync_playwright() as p:
    b=p.chromium.launch()
    for W in [1920,1366,768,375]:
        pg=b.new_page(viewport={"width":W,"height":900}); pg.add_init_script("window.setInterval=function(){return 0}"); pg.goto(U); time.sleep(1.2)
        info=pg.evaluate("(()=>{const i=document.querySelector('.hero img');const r=i.getBoundingClientRect();const band=document.querySelector('.hero+.band').getBoundingClientRect();return {src:i.currentSrc.split('/').pop(),box:[r.left,r.top,r.width,Math.round(r.height)],band:Math.round(band.top),sw:document.documentElement.scrollWidth,nat:[i.naturalWidth,i.naturalHeight]}})()")
        print(W,json.dumps(info))
        h=int(info['band'])+60
        pg.screenshot(path=f"shots/hero-{W}.png",full_page=True,clip={"x":0,"y":0,"width":W,"height":h}); shots.append(f"shots/hero-{W}.png")
        pg.close()
    b.close()
srv.shutdown()
ims=[Image.open(f) for f in shots]
# desktop-ish scaled to 700 wide, mobile to 260
sc=[im.resize((700,int(im.size[1]*700/im.size[0]))) if im.size[0]>400 else im.resize((260,int(im.size[1]*260/im.size[0]))) for im in ims]
W=700+10+700; H=max(sc[0].size[1]+sc[1].size[1]+10, sc[2].size[1]+sc[3].size[1]+10)
o=Image.new("RGB",(700+10+700+10+260,max(sc[0].size[1]+10+sc[1].size[1], sc[2].size[1], sc[3].size[1])),"#3060ff")
o.paste(sc[0],(0,0)); o.paste(sc[1],(0,sc[0].size[1]+10)); o.paste(sc[2],(710,0)); o.paste(sc[3],(1420,0)); o.save("shots/hero-all.png"); print(o.size)
