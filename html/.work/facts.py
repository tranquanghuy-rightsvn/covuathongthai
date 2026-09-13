import json,time
from playwright.sync_api import sync_playwright
Q=r"""()=>{
 const S=(e,ps)=>{if(!e)return null;const c=getComputedStyle(e);const o={};ps.split(' ').forEach(p=>o[p]=c[p]);return o};
 const R=e=>{if(!e)return null;const r=e.getBoundingClientRect();return [Math.round(r.left),Math.round(r.top+scrollY),Math.round(r.width),Math.round(r.height)]};
 const sec=i=>document.querySelector('.elementor-17019 > *:nth-child('+(i+1)+')');
 const o={};
 o.bands=[3,5,15,17,19,21,24,26].map(i=>{const t=[...sec(i).querySelectorAll('*')].find(e=>e.children.length===0&&e.textContent.trim());return {i,tag:t.tagName,r:R(t),s:S(t,'fontFamily fontSize lineHeight fontWeight textTransform'),box:R(sec(i))}});
 o.s09=S(sec(9).querySelector('h2'),'fontFamily textTransform');
 o.s23=S(sec(23).querySelector('h2'),'fontFamily');
 o.s23outer=[R(sec(23)),S(sec(23),'paddingTop paddingLeft backgroundColor')];
 o.float=document.querySelector('#button-contact-vr').outerHTML.slice(0,1500);
 o.floatCss=[...document.querySelectorAll('#button-contact-vr *')].map(e=>({t:e.tagName,c:e.className&&e.className.toString(),r:R(e),s:S(e,'backgroundColor borderRadius width height animationName position boxShadow')})).slice(0,14);
 const p=sec(28); o.pNav=[...p.querySelectorAll('[class*=swiper-button],[class*=arrow],[class*=nav],[class*=pagination]')].map(e=>({c:e.className.toString(),r:R(e),s:S(e,'color fontSize backgroundColor')}));
 o.pBul=[...p.querySelectorAll('.swiper-pagination-bullet')].map(e=>({r:R(e),s:S(e,'backgroundColor opacity')}));
 o.tBul=[...sec(20).querySelectorAll('.swiper-pagination-bullet')].slice(0,2).map(e=>({c:e.className,r:R(e),s:S(e,'backgroundColor opacity')}));
 o.cBul=[...sec(18).querySelectorAll('.swiper-pagination-bullet')].slice(0,4).map(e=>({c:e.className,r:R(e),s:S(e,'backgroundColor opacity')}));
 o.pSlide=R(p.querySelector('.swiper-slide')); o.pSwiper=R(p.querySelector('.swiper'));
 o.carArrow=sec(18).querySelector('.elementor-swiper-button').innerHTML.slice(0,600);
 o.teamPag=[...sec(14).querySelectorAll('*')].filter(e=>/pagination|nav|arrow|button/.test(e.className)).map(e=>({c:e.className.toString(),r:R(e)}));
 o.s14box=[R(sec(14).querySelector('h2')),R(sec(14).querySelector('.swiper, .swiper-container, .thim-ekits-sliders'))];
 o.s04=[R(sec(4).firstElementChild),S(sec(4).querySelector('p'),'fontFamily')];
 o.s11p=[...sec(11).querySelectorAll('p')].map(e=>({r:R(e),s:S(e,'fontFamily fontSize fontWeight color lineHeight textTransform')}));
 o.s12img=[...sec(12).querySelectorAll('img')].map(R);
 o.testiHeadFont=S(sec(20).querySelector('.elementor-testimonial__name'),'fontFamily fontWeight');
 o.newsTitleR=[...sec(25).querySelectorAll('article')].map(a=>[...a.querySelectorAll('*')].filter(e=>e.children.length===0&&e.textContent.trim()).map(e=>({t:e.tagName,c:e.className.toString().slice(0,40),r:R(e),txt:e.textContent.trim().slice(0,20)})))[0];
 o.toolbarLinks=[...document.querySelectorAll('#toolbar a')].map(a=>({r:R(a),h:a.outerHTML.slice(0,200)}));
 o.caret=[...document.querySelectorAll('#masthead .menu-item-has-children > *')].slice(0,4).map(e=>({t:e.tagName,c:e.className.toString(),r:R(e),h:e.outerHTML.slice(0,160)}));
 o.caretAfter=S(document.querySelector('#masthead .menu-item-has-children > a'),'paddingRight');
 const ca=document.querySelector('#masthead .menu-item-has-children > a'); o.caretPseudo=[getComputedStyle(ca,'::after').content,getComputedStyle(ca,'::after').fontFamily,getComputedStyle(ca.parentElement,'::after').content, getComputedStyle(ca.parentElement,'::before').content];
 o.subLi=[...document.querySelectorAll('#masthead .sub-menu a')].slice(0,2).map(a=>({r:R(a),s:S(a,'padding textAlign fontFamily fontWeight lineHeight fontSize')}));
 o.subUl=S(document.querySelector('#masthead .sub-menu'),'paddingLeft textAlign left top');
 o.backtop=[R(document.querySelector('#back-to-top')),document.querySelector('#back-to-top').outerHTML.slice(0,500)];
 return JSON.stringify(o);
}"""
with sync_playwright() as p:
    b=p.chromium.launch(); ctx=b.new_context(viewport={"width":1920,"height":1080})
    pg=ctx.new_page(); pg.goto("https://ichess.edu.vn/",wait_until="networkidle",timeout=90000); time.sleep(2)
    h=pg.evaluate("document.body.scrollHeight"); y=0
    while y<h:
        pg.evaluate(f"window.scrollTo(0,{y})"); time.sleep(0.2); y+=800; h=pg.evaluate("document.body.scrollHeight")
    pg.evaluate("window.scrollTo(0,0)"); time.sleep(1)
    r=json.loads(pg.evaluate(Q)); json.dump(r,open("facts.json","w"),ensure_ascii=False,indent=1)
    for k,v in r.items(): print("##",k,json.dumps(v,ensure_ascii=False)[:1300])
    b.close()
