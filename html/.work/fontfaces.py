import json,time
from playwright.sync_api import sync_playwright
with sync_playwright() as p:
    b=p.chromium.launch(); ctx=b.new_context(viewport={"width":1920,"height":1080})
    pg=ctx.new_page(); pg.goto("https://ichess.edu.vn/",wait_until="networkidle",timeout=90000); time.sleep(2)
    r=pg.evaluate("""()=>{const o=[];
      [...document.styleSheets].forEach(s=>{let rs;try{rs=s.cssRules}catch(e){return}
        for(const rule of rs||[]){ if(rule.constructor.name==='CSSFontFaceRule'){
          const st=rule.style; const src=st.getPropertyValue('src');
          if(src.startsWith('data:')||src.includes('data:'))continue;
          o.push({fam:st.getPropertyValue('font-family'),w:st.getPropertyValue('font-weight'),style:st.getPropertyValue('font-style'),
                  ur:st.getPropertyValue('unicode-range'),disp:st.getPropertyValue('font-display'),src});}}});
      return JSON.stringify(o);}""")
    open("fontfaces.json","w").write(r); b.close()
