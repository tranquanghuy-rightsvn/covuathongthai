import json,time
from playwright.sync_api import sync_playwright
Q=r"""()=>{
 const S=(e,ps)=>{if(!e)return null;const c=getComputedStyle(e);return ps.split(' ').map(p=>c[p]).join(' | ')};
 const R=e=>{if(!e)return null;const r=e.getBoundingClientRect();return [Math.round(r.left),Math.round(r.top+scrollY),Math.round(r.width),Math.round(r.height)]};
 const sec=i=>document.querySelector('.elementor-17019 > *:nth-child('+(i+1)+')');
 const o={};
 o.hero0=R(sec(0)); o.hero1=R(sec(1)); o.hero1img=R(sec(1)&&sec(1).querySelector('img')); o.hero1src=sec(1)&&sec(1).querySelector('img')?.src.split('/').pop();
 o.band3=[R(sec(3)), S(sec(3).querySelector('p'),'fontSize lineHeight')];
 o.intro=[R(sec(4).querySelector('p')), S(sec(4).querySelector('p'),'fontSize lineHeight'), R(sec(4).querySelector('iframe'))];
 o.svc=R(sec(6).querySelector('img')); o.photo=R(sec(8).querySelector('.swiper-slide-bg')||sec(8));
 o.quote=[R(sec(9)),S(sec(9).querySelector('h2'),'fontSize lineHeight'),R(sec(9).querySelector('h2'))];
 o.s10=[R(sec(10)),S(sec(10).querySelector('h2'),'fontSize lineHeight'),S(sec(10).querySelector('p span')||sec(10).querySelector('p'),'fontSize lineHeight'),R(sec(10).querySelector('.elementor-shape'))];
 o.s11=[R(sec(11)),S(sec(11).querySelector('h2'),'fontSize lineHeight'),S(sec(11).querySelectorAll('p')[0],'fontSize'),S(sec(11).querySelectorAll('p')[1],'fontSize lineHeight'),R(sec(11).querySelectorAll('p')[1])];
 o.s12=[R(sec(12)),S(sec(12).querySelector('h3'),'fontSize lineHeight'),S(sec(12).querySelector('p'),'fontSize lineHeight'),[...sec(12).querySelectorAll('h3')].map(R)];
 o.btn=[R(sec(13).querySelector('a')),S(sec(13).querySelector('a'),'fontSize padding')];
 o.team=[R(sec(14)),S(sec(14).querySelector('h2'),'fontSize lineHeight'),S(sec(14).querySelector('p'),'fontSize'),R(sec(14).querySelector('.thim-ekit-team__article')),R(sec(14).querySelector('.thim-ekit-team__thumbnail'))];
 o.band15=[R(sec(15)),S(sec(15).querySelector('p,h2'),'fontSize lineHeight')];
 o.s16=[R(sec(16)),[...sec(16).querySelectorAll('h3')].slice(0,2).map(R)];
 o.car=[R(sec(18)),R(sec(18).querySelector('.swiper-slide-active')),R(sec(18).querySelector('.swiper'))];
 o.band19=[R(sec(19)),S(sec(19).querySelector('p,h2'),'fontSize lineHeight')];
 o.testi=[R(sec(20)),R(sec(20).querySelector('.swiper-slide-active')),R(sec(20).querySelector('.swiper'))];
 o.band21=[R(sec(21)),S(sec(21).querySelector('p,h2'),'fontSize lineHeight')];
 o.q23=[R(sec(23)),S(sec(23).querySelector('h2'),'fontSize lineHeight')];
 o.band24=[R(sec(24)),S(sec(24).querySelector('p,h2'),'fontSize lineHeight')];
 o.news=[R(sec(25)),[...sec(25).querySelectorAll('article')].map(R)];
 o.map=[R(sec(27)),R(sec(27).querySelector('iframe'))];
 o.partners=[R(sec(28)),S(sec(28).querySelector('h2'),'fontSize lineHeight'),R(sec(28).querySelector('.swiper-slide-active img')||sec(28).querySelector('img'))];
 o.footer=[R(document.querySelector('.footer-bottom-above')),[...document.querySelectorAll('.footer-bottom-above .elementor-top-column')].map(R)];
 o.header=[R(document.querySelector('#masthead')),R(document.querySelector('.thim-logo img')),R(document.querySelector('.menu-mobile-effect, .navbar-toggle, .mobile-menu-button')),S(document.querySelector('.navbar-toggle, .menu-mobile-effect'),'color')];
 o.docW=document.documentElement.scrollWidth;
 return JSON.stringify(o);
}"""
with sync_playwright() as p:
    b=p.chromium.launch()
    for W in [1366,768,375]:
        ctx=b.new_context(viewport={"width":W,"height":900})
        pg=ctx.new_page(); pg.goto("https://ichess.edu.vn/",wait_until="networkidle",timeout=90000); time.sleep(2)
        h=pg.evaluate("document.body.scrollHeight"); y=0
        while y<h:
            pg.evaluate(f"window.scrollTo(0,{y})"); time.sleep(0.2); y+=700; h=pg.evaluate("document.body.scrollHeight")
        pg.evaluate("window.scrollTo(0,0)"); time.sleep(1)
        r=json.loads(pg.evaluate(Q)); json.dump(r,open(f"resp-{W}.json","w"))
        print("=====",W)
        for k,v in r.items(): print(" ",k,json.dumps(v,ensure_ascii=False)[:260])
        ctx.close()
    b.close()
