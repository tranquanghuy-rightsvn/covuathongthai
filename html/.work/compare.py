import json,sys,subprocess,os
from PIL import Image
ROOT=os.path.abspath(os.path.join(os.path.dirname(__file__),'..'))
SK=os.path.expanduser('~/.claude/skills/clone-web/scripts/pixel-diff.mjs')
W=int(sys.argv[1]); only=sys.argv[2:] 
O=json.load(open(f'{ROOT}/.work/shots/orig-{W}.json')); C=json.load(open(f'{ROOT}/.work/shots/clone-{W}.json'))
oim=Image.open(f'{ROOT}/.work/shots/orig-{W}.png').convert('RGB'); cim=Image.open(f'{ROOT}/.work/shots/clone-{W}.png').convert('RGB')
os_={i:(t,h) for i,t,h in O['secs']}
cs=C['secs']
# thứ tự section clone (main > * , footer)
names=['hero','band-gioi-thieu','intro','band-dich-vu','services','photo','quote-red','program','benefit','values','explore','team','band-edu','edu','band-lop-hoc','gallery-lop-hoc','band-phu-huynh','testimonials','band-giai-dau','gallery-giai-dau','quote-gray','band-tin-tuc','news','band-co-so','map','partners','footer']
omap=[0,3,4,5,6,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,'footer']
if W<=1024: omap[0]=1; omap[4]=7
out=[]
rep=f'{ROOT}/reports/ichess.edu.vn'; os.makedirs(rep,exist_ok=True)
def crop(im,y,h): 
    return im.crop((0,y,W,min(y+h,im.size[1])))
# header
secs=[('header',0,O['header'][1],0)]
tops=[(O['footer'][0] if oi=='footer' else os_[oi][0]) for oi in omap]
if W<=1024: tops[0]=O['header'][1]
for k,(n,oi,(ccls,ct,ch)) in enumerate(zip(names,omap,cs)):
    ot=tops[k]; nxt=tops[k+1] if k+1<len(tops) else O['H']
    oh=max(nxt-ot, 1) if W<=1024 else (O['H']-ot if oi=='footer' else os_[oi][1])
    if n=='hero': ot=O['header'][1]
    if n=='footer': ct-=30
    secs.append((n,ot,oh,ct))
res=[]
for n,ot,oh,ct in secs:
    if only and n not in only: continue
    h=oh
    a=crop(oim,ot,h); b=crop(cim,ct,h)
    if b.size!=a.size:
        nb=Image.new('RGB',a.size,'white'); nb.paste(b,(0,0)); b=nb
    pa=f'{rep}/original-{n}-{W}.png'; pb=f'{rep}/clone-{n}-{W}.png'; pd=f'{rep}/diff-{n}-{W}.png'
    a.save(pa); b.save(pb)
    r=subprocess.run(['node',SK,pa,pb,pd],capture_output=True,text=True)
    txt=(r.stdout+r.stderr).strip().replace('\n',' ')
    import re
    m=re.search(r'([\d.]+)\s*%',txt)
    pct=float(m.group(1)) if m else None
    res.append((n,ot,ct,oh,pct,txt))
    print(f'{n:<20} orig@{ot:<6} clone@{ct:<6} h={oh:<5} -> {txt[:90]}')
json.dump(res,open(f'{ROOT}/.work/shots/result-{W}.json','w'),ensure_ascii=False)
