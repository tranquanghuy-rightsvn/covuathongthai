import json,sys
KEYS=['display','width','height','padding','margin','backgroundColor','backgroundImage','color','fontSize','fontWeight','fontFamily','lineHeight','textAlign','textTransform','gap','borderRadius','border','borderBottom','boxShadow','gridTemplateColumns','objectFit','fontStyle','letterSpacing']
def interesting(n):
    s=n['s']
    return n.get('txt') or n.get('src') or n['t'] in ('img','a','iframe','h1','h2','h3','h4','p','ul','li','button') or 'backgroundImage' in s or s.get('backgroundColor') or s.get('border') and 'none' not in s.get('border','none') or s.get('borderRadius') or s.get('boxShadow')
def pr(n,d=0,parentfont=None):
    s=n['s']
    font=(s.get('fontSize'),s.get('fontWeight'),s.get('color'),s.get('fontFamily'))
    if interesting(n):
        ks=[k for k in KEYS if k in s]
        if font==parentfont: ks=[k for k in ks if k not in('fontSize','fontWeight','color','fontFamily','lineHeight','textAlign')]
        ks=[k for k in ks if not(k=='border' and 'none' in s[k])]
        print('  '*d+f"{n['t']}.{n.get('c','')[:35]} {n['box']}"+(f' 📝{n["txt"][:70]!r}' if n.get('txt') else '')+(f" IMG={n['src'].split('/')[-1][:45]} nat={n.get('nat')}" if n.get('src') else '')+(f" →{n['href'][:40]}" if n.get('href') else ''))
        print('  '*d+'  ⟨'+' '.join(f"{k}:{s[k]}" for k in ks)+'⟩')
        d+=1
    for k in n.get('k',[]): pr(k,d,font)
pr(json.load(open(sys.argv[1])))
