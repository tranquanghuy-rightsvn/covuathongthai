import time
from playwright.sync_api import sync_playwright
exec(open('cap_orig.py').read().split('widths=')[0].split('FREEZE = ')[0])
FREEZE=open('cap_orig.py').read().split('FREEZE = r"""')[1].split('"""')[0]
with sync_playwright() as p:
    b=p.chromium.launch(); ctx=b.new_context(viewport={"width":1920,"height":900})
    pg=ctx.new_page(); pg.goto("https://ichess.edu.vn/",wait_until="networkidle",timeout=90000); time.sleep(2)
    h=pg.evaluate("document.body.scrollHeight"); y=0
    while y<h:
        pg.evaluate(f"window.scrollTo(0,{y})"); time.sleep(0.2); y+=700
    pg.evaluate("window.scrollTo(0,0)"); time.sleep(1); pg.evaluate(FREEZE); time.sleep(1)
    print(pg.evaluate(r"""()=>{
      const sec=i=>document.querySelector('.elementor-17019 > *:nth-child('+(i+1)+')');
      const vis=(root)=>[...root.querySelectorAll('img')].map(i=>{const r=i.getBoundingClientRect();return [Math.round(r.left),i.src.split('/').pop()]}).filter(x=>x[0]>=-5&&x[0]<1920).sort((a,b)=>a[0]-b[0]);
      return JSON.stringify({g2:vis(sec(22)),g1:vis(sec(18)),p:vis(sec(28)),t:[...sec(20).querySelectorAll('.elementor-testimonial__name')].map(e=>[Math.round(e.getBoundingClientRect().left),e.textContent]).filter(x=>x[0]>0&&x[0]<1920)});
    }"""))
    b.close()
