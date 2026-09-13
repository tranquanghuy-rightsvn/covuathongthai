import time,threading,functools,http.server,socketserver,os
from playwright.sync_api import sync_playwright
from PIL import Image
ROOT=os.path.abspath('..'); PORT=8768
class Q(http.server.SimpleHTTPRequestHandler):
    def log_message(self,*a): pass
socketserver.TCPServer.allow_reuse_address=True
srv=socketserver.ThreadingTCPServer(("127.0.0.1",PORT),functools.partial(Q,directory=ROOT)); threading.Thread(target=srv.serve_forever,daemon=True).start()
URL=f"http://127.0.0.1:{PORT}/index.html"
with sync_playwright() as p:
    b=p.chromium.launch()
    pg=b.new_page(viewport={"width":1440,"height":420}); pg.goto(URL); time.sleep(1)
    pg.hover(".menu>li.has-sub>a"); time.sleep(0.5); pg.screenshot(path="shots/st-dropdown.png")
    pg.mouse.move(5,400); pg.evaluate("scrollTo(0,2600)"); time.sleep(0.5); pg.evaluate("scrollTo(0,2500)"); time.sleep(0.6); pg.screenshot(path="shots/st-sticky.png")
    m=b.new_page(viewport={"width":375,"height":700}); m.goto(URL); time.sleep(1); m.click(".nav-toggle"); time.sleep(0.2); m.click("summary"); time.sleep(0.5); m.screenshot(path="shots/st-mnav.png")
    b.close()
srv.shutdown()
a=Image.open("shots/st-dropdown.png"); s=Image.open("shots/st-sticky.png"); mm=Image.open("shots/st-mnav.png")
o=Image.new("RGB",(1440+375+10, max(840,700)),"white"); o.paste(a,(0,0)); o.paste(s,(0,420)); o.paste(mm,(1450,0)); o=o.resize((o.size[0]*6//10,o.size[1]*6//10)); o.save("shots/states.png")
