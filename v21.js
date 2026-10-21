/* NOISY v21 (Коста, 14.10.2026)
   1) Около N: паралакс ефекти до логото, на всички екрани (?fx=A..F, 0 = без; по подразбиране A). Без чужди заглавия до него (Коста, 14.10).
   2) Редовете под картите: на стъпки, в противоположни посоки, като на noisy.net, но по-бързо (?rows=A..F, 0 = както във v20; по подразбиране A).
   3) „Всеки ден ново съдържание.“ под редовете.
   4) Въпросите като на noisy.net: отворен е най-много един. */
(function(){
 var Q=new URLSearchParams(location.search),H=document.documentElement;
 var FX=(Q.get('fx')||'A').toUpperCase(),RW=(Q.get('rows')||'A').toUpperCase();
 H.dataset.fx=FX;H.dataset.rows=RW;
 /* варианти на цените за страницата за избор */
 var PZV=(Q.get('pz')||'').toUpperCase(),PZH=document.getElementById('pzx');if(PZV&&PZH)PZH.setAttribute('data-v',PZV);
 var root=document.getElementById('mods'),stick=root&&root.querySelector('.ag-stick'),vid=document.getElementById('agvid');
 var RM=matchMedia('(prefers-reduced-motion:reduce)').matches,DESK=matchMedia('(min-width:1024px)');
 function np(){return root?parseFloat(root.style.getPropertyValue('--np'))||0:1}

 /* ================= 1 · около N ================= */
 if(root&&stick&&FX!=='0'&&!RM){
  var lay=document.createElement('div');lay.className='hfx hfx-'+FX;lay.setAttribute('aria-hidden','true');stick.insertBefore(lay,stick.firstChild);
  var items=[],geo={},mx=0,my=0,lastMouse=-1e9,tx=0,ty=0,run=0,amb=null,actx=null,lastAmb=0;
  function geom(){var vw=innerWidth,vh=innerHeight,nb=parseFloat(root.style.getPropertyValue('--nb'))||Math.min(560,vw*.4),ny=parseFloat(root.style.getPropertyValue('--ny'))||vh*.42;
   var h1=root.querySelector('.ntext h1'),tt=vh*.66,tw=760;if(h1){var r=document.createRange();r.selectNodeContents(h1);var b=r.getBoundingClientRect();if(b.width){tw=b.width;tt=b.top+(parseFloat(getComputedStyle(root).getPropertyValue('--np'))||0)*26}}
   geo={vw:vw,vh:vh,nb:nb,ny:ny,ntop:ny-nb*.52,tt:tt,side:Math.max(120,(vw-nb)/2-36),low:Math.max(90,(vw-tw)/2-40)}}
  /* място на картата: страна (-1 ляво, 1 дясно), u = 0 външният ръб ... 1 до N, v = височина 0..1, зона up (до N) или low (до заглавието) */
  function place(el,o){var g=geo,sw=o.z==='low'?g.low:g.side,w=Math.min(o.w,sw*.92);el.style.width=w+'px';
   var cx=o.s<0?16+o.u*(sw-w)+w/2:g.vw-16-o.u*(sw-w)-w/2,y0=o.z==='low'?g.tt:118,y1=o.z==='low'?g.vh-24:g.tt-24,cy=y0+o.v*(y1-y0);
   el._x=cx-w/2;el._y=cy-(o.h||w*.56)*(w/o.w)/2}
  /* A · Слоеве на N: копия на N зад него на различна дълбочина */
  function buildA(){[[.55,.5,0],[1.1,.28,5],[1.8,.15,12]].forEach(function(l,i){var el=document.createElement('div');el.className='fxl';el.style.opacity=l[1];el.style.filter=l[2]?'blur('+l[2]+'px)':'';el.innerHTML='<img src="assets/symbol.svg" alt="">';lay.appendChild(el);items.push({el:el,d:l[0],layer:i+1})})}
  /* F · Частици около логото */
  var cv=null,cx2=null,P=[];
  function buildP(){cv=document.createElement('canvas');cv.className='fxp';lay.appendChild(cv);cx2=cv.getContext('2d');var seed=11;function rnd(){seed=(seed*16807)%2147483647;return (seed-1)/2147483646}
   var C=['#B61DFF','#CE13A8','#FF3B6B','#FFFFFF','#8C18BE'];for(var i=0;i<90;i++)P.push({a:rnd()*6.283,r:.5+rnd()*.95,s:.6+rnd()*1.9,d:.3+rnd()*1.1,c:C[i%C.length],ph:rnd()*6.283,w:(rnd()-.5)*.0012});items.push({el:cv,fx:'p'})}
  function buildB(){amb=document.createElement('canvas');amb.className='fxamb';amb.width=48;amb.height=27;lay.appendChild(amb);actx=amb.getContext('2d');items.push({el:amb,d:.25,fix:1})}
  function buildC(){[[-1,'14%','28%','40vw','#8024B6',26,'60% 40%',.5],[-1,'20%','78%','30vw','#CE13A8',20,'35% 60%',.8],[1,'86%','30%','36vw','#B2261B',24,'40% 55%',.6],[1,'78%','80%','30vw','#A21CC4',18,'60% 35%',.9]].forEach(function(b){
    var el=document.createElement('div');el.className='fxg';el.style.cssText='--x:'+b[1]+';--y:'+b[2]+';--s:max('+b[3]+',300px);--c:'+b[4]+';--t:'+b[5]+'s;--o:'+b[6];el.innerHTML='<i></i>';lay.appendChild(el);items.push({el:el,d:b[7],fix:1})})}
  function buildE(){[[1.2,.42,0],[1.44,.18,-3]].forEach(function(e,i){var el=document.createElement('div');el.className='fxe2';el.style.opacity=e[1];el.innerHTML='<img src="assets/symbol-outline.svg" alt="" style="--fd:'+e[2]+'s">';lay.appendChild(el);items.push({el:el,k:e[0],d:.35+i*.3,echo:1})})}
  function buildF(){/* светлинни лъчи под ъгъла на чертите на N */[[-1,'6%','-10%',260,'#8024B6',.55,22,0],[-1,'20%','30%',180,'#CE13A8',.8,17,-6],[-1,'2%','55%',140,'#B2261B',.35,26,-11],[1,'94%','-6%',240,'#CE13A8',.6,20,-3],[1,'80%','36%',170,'#8024B6',.85,16,-9],[1,'98%','60%',150,'#B2261B',.4,24,-14]].forEach(function(b){
    var el=document.createElement('div');el.className='fxb';el.style.cssText='--x:'+b[1]+';--y:'+b[2]+';--w:'+b[3]+'px;--c:'+b[4]+';--t:'+b[6]+'s;--fd:'+b[7]+'s';el.innerHTML='<i></i>';lay.appendChild(el);items.push({el:el,d:b[5],fix:1})})}
  /* v22: вариантите 1-8 от страницата за избор, върху слоевете на N (като на главната) */
  var NP='M99.63,8.61l-38.39,5.26,17.97,43.75L4.93,0l22.61,57.62L0,43.54l24.34,60.46h32.14v-23.53l40.16,6.04-13.28-22.73,13.28,7.36,2.99-62.53Z';
  function el(cls,html){var e=document.createElement('div');e.className=cls;if(html)e.innerHTML=html;lay.appendChild(e);return e}
  function cen(e,c){items.push({el:e,c:c})}
  var tiltOn=false,rf=null,rfc=null,rfx=null,lastRf=0;
  function buildN(k){
   if(k==='1')cen(el('fxh'),{k:1.7,sq:1,d:.2});
   if(k==='2')cen(el('fxau'),{k:1.35,sq:1,d:.3});
   if(k==='3')cen(el('fxct','<img src="assets/symbol-outline.svg" alt=""><div class="sw"><img src="assets/symbol-outline.svg" alt=""></div>'),{k:1.14,d:.12});
   if(k==='4'){tiltOn=true;cen(el('fxsh'),{k:1,d:-.6,blur:1})}
   if(k==='5'){rf=el('fxrf','<canvas></canvas>');rfc=rf.querySelector('canvas');rfx=rfc.getContext('2d');
    var m='url("data:image/svg+xml,'+encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 99.63 104" preserveAspectRatio="none"><path transform="translate(0 104) scale(1 -1)" d="'+NP+'"/></svg>')+'")';
    rfc.style.webkitMaskImage=rfc.style.maskImage=m;items.push({el:rf,refl:1})}
   if(k==='6')cen(el('fxsd'),{k:1,d:.15,sx:.38,sy:.3});
   if(k==='7'){[[-.95,-.35,.34,'#8024B6',.6],[.9,-.45,.26,'#CE13A8',.9],[-.75,.45,.2,'#B2261B',.4],[1.05,.35,.38,'#A21CC4',.7],[-.35,-.75,.16,'#FF3B6B',1.1],[.4,.75,.22,'#8024B6',.5],[-1.25,.05,.14,'#CE13A8',1.3],[1.3,-.05,.18,'#B2261B',.8],[.15,-.9,.12,'#FFFFFF',1.4],[-.2,.95,.15,'#CE13A8',.9]].forEach(function(b,i){
    var e=el('fxbk','<i style="--c:'+b[3]+';--t:'+(18+i*2.4)+'s;--dx:'+((i%2?-1:1)*(16+i*3))+'px;--dy:'+((i%3?1:-1)*(12+i*2))+'px"></i>');cen(e,{k:b[2],sq:1,ox:b[0],oy:b[1],d:b[4],sx:b[0]*1.2,sy:b[1]*1.2})})}
   if(k==='8')cen(el('fxbig'),{k:2.7,d:-.9,sy:-.6});
  }
  if(/^[1-8]$/.test(FX)){buildA();buildN(FX)}
  else ({A:buildA,B:buildB,C:buildC,D:buildE,E:buildF,F:buildP}[FX]||buildA)();
  function layout(){geom();items.forEach(function(it){if(it.o)place(it.el,it.o);if(it.wall){it.el.style.setProperty('--ww',Math.min(geo.side*.95,420)+'px')}})}
  function frame(t){run=0;var p=np(),g=geo;
   /* без мишка (телефон или докато не я мръднеш): бавно полюшване, за да се усеща паралаксът */
   if(t-lastMouse>2500){mx=Math.sin(t/2600)*.55;my=Math.cos(t/3300)*.4}
   var op=Math.max(0,1-p*2.6);lay.style.setProperty('--fxo',op.toFixed(3));if(op<=0)return;
   tx+=(mx-tx)*.07;ty+=(my-ty)*.07;
   items.forEach(function(it){var d=it.d,x,y;
    if(it.c){var c=it.c,w=g.nb*c.k,h=c.sq?w:w*1.0439;it.el.style.width=w+'px';it.el.style.height=h+'px';
     x=g.vw/2+(c.ox||0)*g.nb-w/2+tx*c.d*-30+(c.sx||0)*p*g.nb*1.6;y=g.ny+(c.oy||0)*g.nb-h/2+ty*c.d*-22+(c.sy||0)*p*g.nb*1.6;
     it.el.style.transform='translate3d('+x.toFixed(1)+'px,'+y.toFixed(1)+'px,0)';return}
    if(it.refl){var W=g.nb,Hn=W*1.0439,top=g.ny+Hn/2+8;it.el.style.width=W+'px';it.el.style.height=(Hn*.7)+'px';it.el.style.transform='translate3d('+(g.vw/2-W/2).toFixed(1)+'px,'+top.toFixed(1)+'px,0)';
     var dpr=Math.min(1.5,devicePixelRatio||1);if(rfc.width!==Math.round(W*dpr)){rfc.width=Math.round(W*dpr);rfc.height=Math.round(Hn*dpr);rfc.style.width=W+'px';rfc.style.height=Hn+'px'}
     if(vid&&vid.readyState>1&&t-lastRf>40){lastRf=t;var vW=vid.videoWidth,vH=vid.videoHeight,sc=Math.max(g.vw/vW,g.vh/vH),ox=(g.vw-vW*sc)/2,oy=(g.vh-vH*sc)/2,x0=g.vw/2-W/2,y0=g.ny-Hn/2;
      try{rfx.save();rfx.clearRect(0,0,rfc.width,rfc.height);rfx.translate(0,rfc.height);rfx.scale(1,-1);rfx.drawImage(vid,(x0-ox)/sc,(y0-oy)/sc,W/sc,Hn/sc,0,0,rfc.width,rfc.height);rfx.restore()}catch(e){}}
     return}
    if(it.layer){var w=g.nb,k=it.layer,id=Math.sin(t/1700+k)*k*3;it.el.style.width=w+'px';x=g.vw/2-w/2+tx*d*-34+k*7+id+(k%2?-1:1)*p*k*g.vw*.12;y=g.ny-w*1.0439/2+ty*d*-24+k*6+Math.cos(t/2100+k)*k*2.5-p*k*g.vh*.08;it.el.style.transform='translate3d('+x.toFixed(1)+'px,'+y.toFixed(1)+'px,0) scale('+(1+k*.035+p*k*.4).toFixed(3)+')';return}
    if(it.fx==='p'){var dpr=Math.min(1.5,devicePixelRatio||1),W=g.vw,Hh=g.vh;if(cv.width!==Math.round(W*dpr)){cv.width=Math.round(W*dpr);cv.height=Math.round(Hh*dpr);cv.style.width=W+'px';cv.style.height=Hh+'px'}
     cx2.setTransform(dpr,0,0,dpr,0,0);cx2.clearRect(0,0,W,Hh);var R=g.nb*(1+p*3.2);
     P.forEach(function(q){q.a+=q.w;var px=W/2+Math.cos(q.a)*q.r*R+tx*q.d*-38,py=g.ny+Math.sin(q.a)*q.r*R*.92+ty*q.d*-26,al=(.25+.45*(.5+.5*Math.sin(t/900+q.ph)))*Math.min(1,q.d);
      cx2.globalAlpha=al;cx2.fillStyle=q.c;cx2.beginPath();cx2.arc(px,py,q.s*(.7+q.d*.4),0,6.283);cx2.fill()});cx2.globalAlpha=1;return}
    if(it.echo){var w=g.nb*it.k;it.el.style.width=w+'px';x=g.vw/2-w/2+tx*d*-26;y=g.ny-w*1.0439/2+ty*d*-18-p*g.vh*.3;it.el.style.transform='translate3d('+x.toFixed(1)+'px,'+y.toFixed(1)+'px,0) scale('+(1+p*it.k*.6).toFixed(3)+')';return}
    if(it.wall){it.el.style.transform='perspective(900px) translate3d('+(tx*-14+it.wall*p*g.vw*.25).toFixed(1)+'px,'+(ty*-10).toFixed(1)+'px,0) rotateY('+(-it.wall*34)+'deg)';return}
    if(it.fix){it.el.style.transform='translate3d('+(tx*d*-40).toFixed(1)+'px,'+(ty*d*-30).toFixed(1)+'px,0)';return}
    x=it.el._x+tx*d*-42+it.o.s*p*d*g.vw*.55;y=it.el._y+ty*d*-30-p*d*g.vh*.45;
    it.el.style.transform='translate3d('+x.toFixed(1)+'px,'+y.toFixed(1)+'px,0)'});
   if(tiltOn&&vid){var f=Math.max(0,1-p*3),tr='perspective(1100px) rotateX('+(-ty*8*f).toFixed(2)+'deg) rotateY('+(tx*11*f).toFixed(2)+'deg)',org=(g.vw/2)+'px '+g.ny+'px';vid.style.transformOrigin=org;vid.style.transform=f?tr:'';lay.style.transformOrigin=org;lay.style.transform=f?tr:''}
   if(actx&&vid&&t-lastAmb>90&&vid.readyState>1){lastAmb=t;try{actx.drawImage(vid,0,0,48,27)}catch(e){}}
   kick()}
  function kick(){if(!run)run=requestAnimationFrame(frame)}
  addEventListener('pointermove',function(e){if(e.pointerType!=='mouse')return;lastMouse=performance.now();mx=e.clientX/innerWidth*2-1;my=e.clientY/innerHeight*2-1;kick()},{passive:true});
  addEventListener('scroll',kick,{passive:true});
  addEventListener('resize',function(){layout();kick()});
  document.addEventListener('visibilitychange',kick);
  /* v15.js смята --nb/--ny при първия скрол/resize; изчакваме шрифтовете, за да е вярна позицията на заглавието */
  function go(){layout();kick()}
  if(document.fonts&&document.fonts.ready)document.fonts.ready.then(function(){requestAnimationFrame(go)});go();addEventListener('load',go);
 }

 /* ================= 2 · редовете на стъпки ================= */
 var box=document.getElementById('agRows');
 if(box){
  var p=document.createElement('p');p.className='agdaily';p.innerHTML=window.AG_DAILY||'Ново съдържание <span>всеки ден</span>';box.after(p);
 }
 var CFG={A:{iv:1600,dur:900,ease:'cubic-bezier(.22,1,.36,1)',n:1,alt:0},B:{iv:1000,dur:560,ease:'cubic-bezier(.25,1,.5,1)',n:1,alt:1},C:{iv:1400,dur:820,ease:'cubic-bezier(.34,1.45,.64,1)',n:1,alt:0,skew:1},D:{iv:1700,dur:900,ease:'cubic-bezier(.22,1,.36,1)',n:1,alt:1,focus:1},E:{iv:1600,dur:900,ease:'cubic-bezier(.22,1,.36,1)',n:1,alt:0}}[RW];
 if(box&&root&&CFG&&!RM){
  var R=[],tick=0,hover=false,timer=0,fvid=null;
  function setup(){var prev=R.slice();R=[].slice.call(box.querySelectorAll('.ag-flow')).map(function(f,k){
    var st=f.querySelector('.ag-strip');if(!st)return null;var S=st.getBoundingClientRect().width,n=+(st.style.getPropertyValue('--ag-count'))||7,step=S/n;
    // достатъчно копия, за да няма празно при движение надясно и на широк екран
    var hid=f.querySelectorAll('.ag-strip')[1];while(hid&&f.scrollWidth<S*2+innerWidth+step){f.appendChild(hid.cloneNode(true))}
    var dir=k%2?1:-1,o=dir<0?0:-S;var pk=null;for(var pi=0;pi<prev.length;pi++)if(prev[pi]&&prev[pi].f===f){pk=prev[pi];break}if(!pk&&prev[k]&&prev[k].dragged)pk=prev[k];if(pk&&(pk.f===f||pk.dragged)&&Math.abs(pk.o)<=S)o=pk.o; /* v28: запазва позицията след влачене */f.classList.remove('stp');f.style.transform='translate3d('+o+'px,0,0)';f.style.setProperty('--sd',CFG.dur+'ms');f.style.setProperty('--se',CFG.ease);
    return {f:f,row:f.parentElement,S:S,step:step,dir:dir,o:o}}).filter(Boolean)}
  function move(r){r.o+=r.dir*r.step*CFG.n;r.f.classList.add('stp');r.f.style.transform='translate3d('+r.o.toFixed(1)+'px,0,0)';
   if(CFG.skew){r.row.classList.add('mv');r.row.style.setProperty('--sk',(r.dir*-5)+'deg');setTimeout(function(){r.row.style.setProperty('--sk','0deg')},180);setTimeout(function(){r.row.classList.remove('mv')},700)}
   clearTimeout(r.t);r.t=setTimeout(function(){var w=r.dir<0?(r.o<=-r.S):(r.o>=0);if(w){r.o+=r.dir<0?r.S:-r.S;r.f.classList.remove('stp');r.f.style.transform='translate3d('+r.o.toFixed(1)+'px,0,0)';void r.f.offsetWidth}
    if(CFG.focus)focus(r)},CFG.dur+20)}
  function focus(r){[].forEach.call(box.querySelectorAll('.ag-tile.fo'),function(t){t.classList.remove('fo');var v=t.querySelector('video');if(v){v.pause()}});
   var c=innerWidth/2,best=null,bd=1e9;[].forEach.call(r.f.querySelectorAll('.ag-tile'),function(t){var b=t.getBoundingClientRect(),d=Math.abs(b.left+b.width/2-c);if(d<bd){bd=d;best=t}});
   if(!best)return;best.classList.add('fo');box.classList.add('fz');var v=best.querySelector('video');if(v){if(!v.src&&v.dataset.src)v.src=v.dataset.src;v.currentTime=0;var pr=v.play();if(pr&&pr.catch)pr.catch(function(){})}}
  function live(){var sh=box.closest('.ag-shelves')||box,cs=getComputedStyle(sh);return cs.visibility!=='hidden'&&!root.classList.contains('is-paused')&&!root.classList.contains('pv-open')&&!hover&&!document.hidden&&box.getBoundingClientRect().top<innerHeight&&box.getBoundingClientRect().bottom>0}
  function beat(){if(live()&&R.length){if(CFG.alt){var r=R[tick%R.length];if(r)move(r)}else R.forEach(move);tick++}timer=setTimeout(beat,CFG.alt?CFG.iv/2:CFG.iv)}
  box.addEventListener('mouseover',function(e){if(e.target.closest('.ag-tile'))hover=true});box.addEventListener('mouseout',function(e){if(!e.relatedTarget||!box.contains(e.relatedTarget)||!e.relatedTarget.closest('.ag-tile'))hover=false});
  new MutationObserver(function(){requestAnimationFrame(setup)}).observe(box,{childList:true});
  addEventListener('resize',function(){clearTimeout(setup.t);setup.t=setTimeout(setup,200)});
  /* v28: редовете се влачат с пръст/мишка и се местят с хоризонтален скрол на тъчпада (работи директно върху реда под показалеца) */
  (function(){var d=null;
   function info(el){var f=el.closest&&el.closest('.ag-flow');if(!f){var row=el.closest&&el.closest('.ag-row');f=row&&row.querySelector('.ag-flow')}if(!f)return null;var sts=[].slice.call(f.querySelectorAll('.ag-strip'));if(!sts.length)return null;var st=sts[0],S=Math.max.apply(null,sts.map(function(x){return x.getBoundingClientRect().width})),n=+(st.style.getPropertyValue('--ag-count'))||7;for(var q=0;q<R.length;q++)if(R[q]&&R[q].f===f&&R[q].S>S)S=R[q].S;
    var m=/translate3d\((-?[\d.]+)px/.exec(f.style.transform||'');return {f:f,S:S,step:S/n,o:m?parseFloat(m[1]):0}}
   function sync(r){for(var i=0;i<R.length;i++)if(R[i]&&R[i].f===r.f){R[i].o=r.o;R[i].dragged=true}}
   function wrap(r){if(!(r.S>400))return;while(r.o<=-r.S)r.o+=r.S;while(r.o>0)r.o-=r.S}
   function put(r,anim){if(anim)r.f.classList.add('stp');else r.f.classList.remove('stp');r.f.style.transform='translate3d('+r.o.toFixed(1)+'px,0,0)';sync(r)}
   box.style.touchAction='pan-y';
   box.addEventListener('pointerdown',function(e){if(e.button>0)return;var r=info(e.target);if(!r)return;d={r:r,x:e.clientX,y:e.clientY,o:r.o,lock:0,moved:false};hover=true},true);
   addEventListener('pointermove',function(e){if(!d)return;var x=e.clientX-d.x,y=e.clientY-d.y;if(!d.lock){if(Math.abs(x)>8&&Math.abs(x)>Math.abs(y))d.lock=1;else if(Math.abs(y)>8){d=null;hover=false;return}}if(d.lock){d.moved=Math.abs(x)>6;d.r.o=d.o+x;put(d.r,false)}},{passive:true});
   function end(){if(!d)return;var r=d.r;wrap(r);r.o=Math.round(r.o/r.step)*r.step;wrap(r);put(r,true);var m=d.moved;d=null;setTimeout(function(){hover=false},1500);if(m){box.addEventListener('click',function k(ev){ev.preventDefault();ev.stopPropagation();box.removeEventListener('click',k,true)},true)}}
   addEventListener('pointerup',end);addEventListener('pointercancel',end);
   box.addEventListener('wheel',function(e){if(Math.abs(e.deltaX)<=Math.abs(e.deltaY))return;var r=info(e.target);if(!r)return;e.preventDefault();hover=true;r.o-=e.deltaX;wrap(r);put(r,false);clearTimeout(box.wt);box.wt=setTimeout(function(){hover=false},1200)},{passive:false});
   box.addEventListener('dragstart',function(e){e.preventDefault()});
  })();
  setup();if(document.fonts&&document.fonts.ready)document.fonts.ready.then(setup);addEventListener('load',setup);timer=setTimeout(beat,CFG.iv);
 }

 /* ================= 4 · въпросите ================= */
 var qs=[].slice.call(document.querySelectorAll('.nfaq .nq'));
 qs.forEach(function(q){var b=q.querySelector('.nq-b');b.addEventListener('click',function(){var on=!q.classList.contains('open');
  qs.forEach(function(o){o.classList.remove('open');o.querySelector('.nq-b').setAttribute('aria-expanded','false')});
  if(on){q.classList.add('open');b.setAttribute('aria-expanded','true')}})});
})();
