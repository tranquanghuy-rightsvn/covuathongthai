
() => {
  const PROPS=["color","fontSize","fontWeight","fontFamily","lineHeight","letterSpacing","textTransform","textAlign","fontStyle",
   "backgroundColor","backgroundImage","backgroundSize","backgroundPosition","backgroundRepeat",
   "display","flexDirection","justifyContent","alignItems","gap","flexWrap","gridTemplateColumns",
   "width","maxWidth","height","minHeight","padding","margin","borderRadius","border","borderBottom","borderTop","boxShadow",
   "position","zIndex","transform","objectFit","overflow","opacity"];
  const SKIP=new Set(['SCRIPT','STYLE','NOSCRIPT','LINK','META','svg']);
  function st(n){const c=getComputedStyle(n);const o={};
    for(const p of PROPS){let v=c[p];
      if(!v||v==='none'||v==='normal'||v==='auto'||v==='0px'||v==='rgba(0, 0, 0, 0)'||v==='static'||v==='1'||v==='visible'||v==='0px none rgb(0, 0, 0)') continue;
      if(p==='margin'&&v==='0px')continue; o[p]=v;}
    return o;}
  function walk(n,d){
    if(SKIP.has(n.tagName))return null;
    const r=n.getBoundingClientRect();
    if(r.width===0&&r.height===0&&n.tagName!=='IMG')return null;
    const kids=[...n.children].map(c=>walk(c,d+1)).filter(Boolean);
    const own=[...n.childNodes].filter(x=>x.nodeType===3&&x.textContent.trim()).map(x=>x.textContent.trim()).join(' ');
    const o={t:n.tagName.toLowerCase(),c:(n.className||'').toString().replace(/elementor-(element|widget|invisible|animation)[\w-]*/g,'').replace(/\s+/g,' ').trim().slice(0,140),
      box:[Math.round(r.left),Math.round(r.top+scrollY),Math.round(r.width),Math.round(r.height)],s:st(n)};
    if(n.id)o.id=n.id;
    if(own)o.txt=own.slice(0,400);
    if(n.tagName==='IMG')o.src=n.currentSrc||n.src,o.alt=n.alt,o.nat=[n.naturalWidth,n.naturalHeight];
    if(n.tagName==='A')o.href=n.getAttribute('href');
    if(n.tagName==='IFRAME')o.src=n.src;
    if(kids.length)o.k=kids;
    return o;}

  const el=document.querySelector(window.__SEL__);
  return el?JSON.stringify(walk(el,0)):JSON.stringify({error:'not found '+window.__SEL__});
}
