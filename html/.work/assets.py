import json,time
from playwright.sync_api import sync_playwright
with sync_playwright() as p:
    b=p.chromium.launch(); ctx=b.new_context(viewport={"width":1920,"height":1080},device_scale_factor=1)
    pg=ctx.new_page(); pg.goto("https://ichess.edu.vn/",wait_until="networkidle",timeout=90000); time.sleep(2)
    h=pg.evaluate("document.body.scrollHeight"); y=0
    while y<h:
        pg.evaluate(f"window.scrollTo(0,{y})"); time.sleep(0.3); y+=700; h=pg.evaluate("document.body.scrollHeight")
    pg.evaluate("window.scrollTo(0,0)"); time.sleep(1.5)
    r=pg.evaluate("""()=>{
      const A=[];
      document.querySelectorAll('img').forEach(i=>A.push({type:'img',src:i.currentSrc||i.src,alt:i.alt,nat:[i.naturalWidth,i.naturalHeight],cls:(i.className||'').toString().slice(0,60)}));
      document.querySelectorAll('video, video source').forEach(v=>{if(v.src)A.push({type:'video',src:v.src})});
      document.querySelectorAll('*').forEach(e=>{const bg=getComputedStyle(e).backgroundImage;
        if(bg&&bg!=='none')[...bg.matchAll(/url\\(["']?(.*?)["']?\\)/g)].forEach(m=>A.push({type:'bg',src:m[1],owner:e.tagName.toLowerCase()+'.'+(e.className||'').toString().replace(/elementor-(element|widget)[\\w-]*/g,'').replace(/\\s+/g,' ').trim().slice(0,70)}));
        const mi=getComputedStyle(e).maskImage; if(mi&&mi!=='none')[...mi.matchAll(/url\\(["']?(.*?)["']?\\)/g)].forEach(m=>A.push({type:'mask',src:m[1]}));});
      [...document.styleSheets].forEach(s=>{let r;try{r=s.cssRules}catch(e){return}
        for(const rule of r||[]){ if(rule.constructor.name==='CSSFontFaceRule'){
          const fam=rule.style.getPropertyValue('font-family'),w=rule.style.getPropertyValue('font-weight'),st=rule.style.getPropertyValue('font-style');
          [...rule.style.getPropertyValue('src').matchAll(/url\\(["']?(.*?)["']?\\)/g)].forEach(m=>A.push({type:'font',src:m[1],fam,w,st}));}}});
      document.querySelectorAll('iframe').forEach(f=>A.push({type:'iframe',src:f.src}));
      return JSON.stringify(A);
    }""")
    open("assets-raw.json","w").write(r)
    b.close()
