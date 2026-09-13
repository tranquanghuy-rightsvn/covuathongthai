import json,sys
def pr(n,d=0,maxd=99):
    if d>maxd: return
    b=n['box']; s=n.get('s',{})
    keys=['display','width','maxWidth','height','padding','margin','backgroundColor','color','fontSize','fontWeight','fontFamily','textTransform','lineHeight','textAlign','justifyContent','alignItems','gap','borderRadius','position','backgroundImage','gridTemplateColumns','flexDirection','border','boxShadow','objectFit','letterSpacing']
    ss=' '.join(f"{k}:{s[k]}" for k in keys if k in s)
    txt=(' 📝"'+n['txt'][:70]+'"') if n.get('txt') else ''
    src=(' IMG='+n['src'].split('/')[-1][:50]) if n.get('src') else ''
    href=(' →'+str(n.get('href'))[:40]) if n.get('href') else ''
    print('  '*d + f"{n['t']}{('#'+n['id']) if n.get('id') else ''}.{n.get('c','')[:60]} [{b[0]},{b[1]} {b[2]}x{b[3]}]{txt}{src}{href}")
    if ss: print('  '*d+'   ⟨'+ss+'⟩')
    for k in n.get('k',[]): pr(k,d+1,maxd)
d=json.load(open(sys.argv[1]))
pr(d,0,int(sys.argv[2]) if len(sys.argv)>2 else 99)
