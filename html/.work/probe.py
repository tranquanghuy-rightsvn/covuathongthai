import sys,time,threading,functools,http.server,socketserver,os,json
from playwright.sync_api import sync_playwright
ROOT=os.path.abspath('..'); PORT=8766
class Q(http.server.SimpleHTTPRequestHandler):
    def log_message(self,*a): pass
socketserver.TCPServer.allow_reuse_address=True
srv=socketserver.ThreadingTCPServer(("127.0.0.1",PORT),functools.partial(Q,directory=ROOT)); threading.Thread(target=srv.serve_forever,daemon=True).start()
W=int(sys.argv[1]); js=sys.argv[2]
with sync_playwright() as p:
    b=p.chromium.launch(); pg=b.new_page(viewport={"width":W,"height":900})
    pg.add_init_script("window.setInterval=function(){return 0}")
    pg.goto(f"http://127.0.0.1:{PORT}/index.html",wait_until="load"); time.sleep(1.5)
    print(pg.evaluate(js))
    b.close()
srv.shutdown()
