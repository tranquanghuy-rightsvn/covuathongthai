import json,time
from playwright.sync_api import sync_playwright
with sync_playwright() as p:
    b=p.chromium.launch(); ctx=b.new_context(viewport={"width":1920,"height":1080},device_scale_factor=1)
    pg=ctx.new_page(); pg.goto("https://ichess.edu.vn/",wait_until="networkidle",timeout=90000); time.sleep(2)
    h=pg.evaluate("document.body.scrollHeight"); y=0
    while y<h:
        pg.evaluate(f"window.scrollTo(0,{y})"); time.sleep(0.25); y+=800; h=pg.evaluate("document.body.scrollHeight")
    pg.evaluate("window.scrollTo(0,0)"); time.sleep(1.5)
    r=pg.evaluate(r"""()=>{
      const S=(e,ps)=>{const c=getComputedStyle(e);const o={};ps.split(' ').forEach(p=>o[p]=c[p]);return o};
      const sec=i=>document.querySelector('.elementor-17019 > *:nth-child('+(i+1)+')');
      const R=e=>{const r=e.getBoundingClientRect();return [Math.round(r.left),Math.round(r.top+scrollY),Math.round(r.width),Math.round(r.height)]};
      const out={};
      // testimonials: unique slides
      const t=sec(20);
      out.testi=[...t.querySelectorAll('.swiper-slide:not(.swiper-slide-duplicate)')].map(s=>({
        name:s.querySelector('.elementor-testimonial__name')?.innerText, title:s.querySelector('.elementor-testimonial__title')?.innerText,
        img:s.querySelector('img')?.src.split('/').pop(), html:s.querySelector('.elementor-testimonial__text')?.innerHTML.trim()}));
      const txt=t.querySelector('.elementor-testimonial__text'); out.testiText=S(txt,'fontSize lineHeight color fontFamily padding textAlign');
      const act=t.querySelector('.swiper-slide-active'); out.testiActive=R(act);
      out.testiNav=[...t.querySelectorAll('.elementor-swiper-button, .swiper-pagination')].map(e=>({c:e.className,r:R(e),s:S(e,'color fontSize')}));
      out.testiStar=S(t.querySelector('.elementor-star-full'),'color fontSize');
      out.testiWrap=R(t.querySelector('.swiper, .swiper-container'));
      // carousel s18 nav
      const c=sec(18); out.carWrap=R(c.querySelector('.swiper, .swiper-container')); out.carNav=[...c.querySelectorAll('.elementor-swiper-button, .swiper-pagination, .swiper-pagination-bullet')].slice(0,4).map(e=>({c:e.className,r:R(e),s:S(e,'color fontSize backgroundColor opacity width height')}));
      out.carSlides=[...c.querySelectorAll('.swiper-slide:not(.swiper-slide-duplicate) img')].map(i=>i.src.split('/').pop());
      out.carLogo=[...c.querySelectorAll('img')].filter(i=>!i.classList.contains('swiper-slide-image')).map(i=>i.src);
      // s08 slides
      out.s08=[...sec(8).querySelectorAll('.swiper-slide:not(.swiper-slide-duplicate) .swiper-slide-bg')].map(e=>getComputedStyle(e).backgroundImage);
      // s10 shape
      const s10=sec(10); out.s10shape=[...s10.querySelectorAll('.elementor-shape')].map(e=>({c:e.className,html:e.innerHTML.slice(0,1500),r:R(e),svg:S(e.querySelector('svg')||e,'height width fill')}));
      out.s10p=S(s10.querySelector('p span')||s10.querySelector('p'),'fontSize lineHeight color fontFamily textAlign fontWeight');
      out.s10h2p=S(s10.querySelector('h2 p')||s10.querySelector('h2'),'fontSize lineHeight color fontFamily');
      out.s10bg=S(s10,'backgroundImage backgroundColor paddingTop paddingBottom');
      out.s10inner=R(s10.firstElementChild);
      // s11
      const s11=sec(11); out.s11=[...s11.querySelectorAll('h2,p')].map(e=>({t:e.tagName,txt:e.innerText.slice(0,40),s:S(e,'fontSize lineHeight color fontFamily textAlign fontWeight margin')}));
      // s12 dividers
      out.s12boxes=[...sec(12).querySelectorAll('.elementor-widget')].map(e=>({c:e.className.slice(0,80),r:R(e),s:S(e,'borderBottom paddingBottom marginBottom')}));
      out.s12div=[...sec(12).querySelectorAll('.elementor-divider-separator, .elementor-divider')].map(e=>({r:R(e),s:S(e,'borderTop width')}));
      out.s12p=S(sec(12).querySelector('p'),'lineHeight');
      // s14 team
      const s14=sec(14); out.teamDesc=S(s14.querySelector('.thim-ekit-team__member-description'),'fontSize lineHeight color fontFamily fontWeight');
      out.teamH=S(s14.querySelector('p'),'fontSize lineHeight color fontFamily fontWeight');
      out.teamNav=[...s14.querySelectorAll('.thim-slider-nav, .swiper-button-prev, .swiper-button-next, .swiper-pagination')].map(e=>({c:e.className,r:R(e)}));
      out.teamWrap=R(s14.querySelector('.swiper, .swiper-container')||s14);
      // s16 dividers
      out.s16div=[...sec(16).querySelectorAll('.elementor-divider-separator')].map(e=>({r:R(e),s:S(e,'borderTopWidth borderTopColor borderTopStyle width')}));
      out.s12div2=[...sec(12).querySelectorAll('.elementor-divider-separator')].map(e=>({r:R(e),s:S(e,'borderTopWidth borderTopColor borderTopStyle width')}));
      // news s25
      const s25=sec(25); out.news=[...s25.querySelectorAll('article, .thim-ekits-post__article, .elementor-post')].map(a=>({
         r:R(a), img:a.querySelector('img')?.src.split('/').pop(), imgR:a.querySelector('img')?R(a.querySelector('img')):null,
         imgS:a.querySelector('img')?S(a.querySelector('img'),'borderRadius objectFit'):null,
         title:a.querySelector('h3,h4,.title,.elementor-post__title')?.innerText, tS:S(a.querySelector('h3,h4,.title,.elementor-post__title')||a,'fontSize lineHeight color fontFamily fontWeight'),
         more:a.querySelector('.elementor-post__read-more, .read-more, a[class*=more]')?.innerText, mS:a.querySelector('.elementor-post__read-more, .read-more, a[class*=more]')?S(a.querySelector('.elementor-post__read-more, .read-more, a[class*=more]'),'fontSize color fontWeight fontFamily'):null,
         thumbR:a.querySelector('.elementor-post__thumbnail, .thim-ekits-post__thumbnail')?R(a.querySelector('.elementor-post__thumbnail, .thim-ekits-post__thumbnail')):null}));
      const btn=[...s25.querySelectorAll('a,button')].find(e=>/Tải xem thêm/.test(e.innerText)); out.newsBtn=btn?{r:R(btn),s:S(btn,'fontSize color backgroundColor borderRadius padding fontWeight fontFamily lineHeight'),html:btn.innerHTML}:null;
      // map s27
      out.map=[...sec(27).querySelectorAll('iframe')].map(f=>({src:f.src,r:R(f)}));
      // partners s28
      const s28=sec(28); out.partnerH=S(s28.querySelector('h2,h3,.elementor-heading-title'),'fontSize lineHeight color fontFamily fontWeight');
      out.partnerHR=R(s28.querySelector('h2,h3,.elementor-heading-title'));
      out.partners=[...s28.querySelectorAll('.swiper-slide:not(.swiper-slide-duplicate) img')].map(i=>({src:i.src.split('/').pop(),r:R(i)}));
      out.partnerNav=[...s28.querySelectorAll('.elementor-swiper-button, .swiper-pagination')].map(e=>({c:e.className,r:R(e)}));
      // floating buttons
      out.float=[...document.querySelectorAll('#button-contact-vr img, #back-to-top')].map(e=>({t:e.tagName,src:e.src,r:R(e)}));
      out.fcss=S(document.querySelector('#button-contact-vr'),'position bottom right left top zIndex');
      out.popLogin=S(document.querySelector('#thim-popup-login'),'display');
      return JSON.stringify(out);
    }""")
    open("detail.json","w").write(r)
    b.close()
