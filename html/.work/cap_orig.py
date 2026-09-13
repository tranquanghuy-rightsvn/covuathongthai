import json,time,sys,os
from playwright.sync_api import sync_playwright
FREEZE = r"""()=>{
  try{if(window.jQuery){jQuery('.owl-carousel').each(function(){var o=jQuery(this).data('owlCarousel');if(o){o.stop();o.goTo(0);}else{jQuery(this).trigger('stop.owl.autoplay').trigger('to.owl.carousel',[0,0]);}});}}catch(e){}
  document.querySelectorAll('.swiper, .swiper-container').forEach(s=>{const w=s.swiper; if(!w)return; try{w.autoplay&&w.autoplay.stop(); w.params.loop? w.slideToLoop(0,0,false): w.slideTo(0,0,false);}catch(e){}});
  const st=document.createElement('style'); st.textContent='*,*::before,*::after{animation:none!important;transition:none!important} .elementor-ken-burns{transform:none!important} #fb-root,.fb_dialog,iframe[title*="chat"]{display:none!important}';
  document.head.appendChild(st);
}"""
widths=[int(x) for x in sys.argv[1:]] or [1920,1366,768,375]
os.makedirs("shots",exist_ok=True)
with sync_playwright() as p:
    b=p.chromium.launch()
    for W in widths:
        ctx=b.new_context(viewport={"width":W,"height":900},device_scale_factor=1)
        pg=ctx.new_page(); pg.goto("https://ichess.edu.vn/",wait_until="networkidle",timeout=90000); time.sleep(2)
        h=pg.evaluate("document.body.scrollHeight"); y=0
        while y<h:
            pg.evaluate(f"window.scrollTo(0,{y})"); time.sleep(0.25); y+=600; h=pg.evaluate("document.body.scrollHeight")
        pg.evaluate("window.scrollTo(0,0)"); time.sleep(1.5)
        pg.evaluate(FREEZE); time.sleep(1)
        pg.screenshot(path=f"shots/orig-{W}.png", full_page=True)
        info=pg.evaluate("""()=>{const r=[];document.querySelectorAll('.elementor-17019 > *').forEach((e,i)=>{const b=e.getBoundingClientRect();r.push([i,Math.round(b.top+scrollY),Math.round(b.height)])});
          const f=document.querySelector('.footer-bottom-above').getBoundingClientRect(); const c=document.querySelector('#colophon').getBoundingClientRect();
          const hd=document.querySelector('#masthead').getBoundingClientRect();
          return {secs:r,footer:[Math.round(f.top+scrollY),Math.round(f.height)],colophon:[Math.round(c.top+scrollY),Math.round(c.height)],header:[Math.round(hd.top),Math.round(hd.height)],H:document.documentElement.scrollHeight,sw:document.documentElement.scrollWidth}}""")
        json.dump(info,open(f"shots/orig-{W}.json","w"))
        print(W, info['H'], info['header'], 'sw',info['sw'])
        ctx.close()
    b.close()
