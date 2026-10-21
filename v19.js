/* v19: смениш ли картата на модула горе, редовете под нея показват неговото съдържание (Arena = мачове, Newsroom = новини...).
   Натиснеш ли заглавие, тръгва кратък преглед (като във v10), после „Хареса ти? Продължи да гледаш.“ */
(function(){
 function init(){
  var root=document.getElementById('mods'),el=document.getElementById('ag-data'),box=document.getElementById('agRows');if(!root||!el||!box)return;
  var data=JSON.parse(el.textContent),S=data.slides,B=data.byWorld,cur=0,t1=0;
  var nowT=document.getElementById('agNowT'),nowS=document.getElementById('agNowS'),more=document.getElementById('agMore'),dots=[].slice.call(root.querySelectorAll('.agd'));
  var hint=root.querySelector('.ag-hint');if(hint)hint.textContent=matchMedia('(max-width:734px)').matches?'← Плъзни картата →':'Избери модул: редовете долу се сменят';
  function esc(t){return String(t).replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
  function strip(r,k,hid){return '<div class="ag-strip" style="--ag-count:'+r.length+'"'+(hid?' aria-hidden="true"':'')+'>'+r.map(function(x,i){return '<a class="ag-tile" style="--ag-i:'+i+'" href="'+x[2]+'" data-r="'+k+'" data-i="'+i+'"'+(hid?' tabindex="-1"':'')+'>'+(!x[0]?'<span class="ag-tt ag-tt0" data-w="'+(x[4]||'')+'"></span>':x[0].indexOf('lg:')===0?'<span class="ag-tt"><img src="'+x[0].slice(3)+'" alt="" loading="lazy"></span>':'<img src="'+x[0]+'" alt="" loading="lazy">')+(x[3]?'<video muted loop playsinline preload="none" data-src="'+x[3]+'"></video>':'')+'<span class="ag-tile-label">'+esc(x[1])+'</span>'+(x[5]?'<span class="ag-pm">Premium</span>':'')+'</a>'}).join('')+'</div>'}
  function rows(w){var fl=root.querySelectorAll('.ag-flow');return B[w].map(function(r,k){var ms=fl[k]?fl[k].style.getPropertyValue('--ag-marquee-ms'):'';return '<div class="ag-row"><div class="ag-flow"'+(ms?' style="--ag-marquee-ms:'+ms+'"':'')+'>'+strip(r,k)+strip(r,k,true)+'</div></div>'}).join('')}
  /* 13.10: плочките стоят на картинката; видеото върви само при посочване с мишката (при натискане се отваря прегледът с видео) */
  var tio={disconnect:function(){}},hov=matchMedia('(hover:hover) and (pointer:fine)');
  /* редовете забавят плавно до пълно спиране, докато мишката е върху плочка */
  var rt=0,rc=1,rz=0;function rate(to){cancelAnimationFrame(rt);var from=rc,t0=performance.now();(function st(n){var k=Math.min(1,(n-t0)/450),e=1-Math.pow(1-k,3);rc=from+(to-from)*e;[].forEach.call(root.querySelectorAll('.ag-flow'),function(f){(f.getAnimations?f.getAnimations():[]).forEach(function(x){x.playbackRate=rc})});if(k<1)rt=requestAnimationFrame(st)})(t0)}
  function watch(){[].forEach.call(box.querySelectorAll('.ag-tile'),function(t){var v=t.querySelector('video');if(!v)return;
   v.addEventListener('playing',function(){if(t.matches(':hover'))v.classList.add('pl')});
   t.addEventListener('mouseenter',function(){if(!hov.matches)return;clearTimeout(rz);clearTimeout(t._o);rate(0);if(!v.src)v.src=v.dataset.src;if(!v.paused&&v.readyState>2)v.classList.add('pl');var p=v.play();if(p&&p.catch)p.catch(function(){})});
   t.addEventListener('mouseleave',function(){if(!hov.matches)return;v.classList.remove('pl');t._o=setTimeout(function(){if(!t.matches(':hover')){v.pause();try{v.currentTime=0}catch(e){}}},520);clearTimeout(rz);rz=setTimeout(function(){rate(1)},160)})})}
  box.innerHTML=rows(S[0].world);watch();
  function set(i){
   if(i===cur)return;cur=i;var s=S[i];
   dots.forEach(function(d,k){d.classList.toggle('on',k===i);d.setAttribute('aria-pressed',k===i)});
   root.classList.add('used','swap');clearTimeout(t1);
   t1=setTimeout(function(){
    tio.disconnect();box.innerHTML=rows(s.world);watch();if(nowT){nowT.textContent=s.now;nowS.textContent=s.nsub;}
    if(more){more.innerHTML=esc(s.more)+' <span aria-hidden="true">→</span>';more.setAttribute('href',s.page);
    if(s.page==='#ceni')more.setAttribute('data-su','');else more.removeAttribute('data-su');}
    requestAnimationFrame(function(){root.classList.remove('swap')});
   },200);
  }
  root.addEventListener('agchange',function(e){set(e.detail)});
  dots.forEach(function(d,k){d.setAttribute('aria-pressed',k===0);d.addEventListener('click',function(){window.agGo&&window.agGo(k)})});

  /* ===== прегледът ===== */
  var NM={theatre:'Theatre',showtime:'Showtime',arena:'Arena',newsroom:'Newsroom'};
  var SUB={theatre:'Целият епизод те чака.',showtime:'Целият епизод и най-силните моменти.',arena:'Целият мач, със статистиката до него.',newsroom:'Новините на деня, за 60 секунди.'};
  /* по желание на страницата (Arena): свои светове и текстове за прегледа */
  if(window.AG_NM)for(var nk in window.AG_NM)NM[nk]=window.AG_NM[nk];if(window.AG_SUB)for(var sk in window.AG_SUB)SUB[sk]=window.AG_SUB[sk];
  var w=document.createElement('div');w.className='pvw';w.id='pvw';w.setAttribute('role','dialog');w.setAttribute('aria-modal','true');w.setAttribute('aria-label','Преглед');w.setAttribute('aria-hidden','true');
  w.innerHTML='<div class="pvbox"><video muted playsinline loop preload="none"></video><div class="kbi" hidden></div><span class="flash"></span>'+
   '<div class="ptopbar"><span class="chip pmeta"></span><button type="button" class="px" aria-label="Затвори">×</button></div>'+
   '<div class="pfoot"><div class="ptitle"></div><div class="pbar"><i></i></div><div class="ptimes"><span class="ptm">0:00</span><span>Преглед</span></div></div>'+
   '<div class="tgate"><div class="gbox"><p class="gk">Хареса ти?</p><h3>Продължи да гледаш.</h3><p class="gs"></p><div class="gbtns"><a class="btn btn-p" href="#" data-su>Пробвай NOISY</a><button type="button" class="btn btn-s gother">Друго заглавие</button></div><p class="gf">Без карта.</p></div></div></div>';
  document.body.appendChild(w);
  var pv=w.querySelector('video'),kb=w.querySelector('.kbi'),gate=w.querySelector('.tgate'),bar=w.querySelector('.pbar i'),pt=w.querySelector(".ptm"),pbox=w.querySelector('.pvbox'),DUR=4000,t0=0,raf=0,last=null,timer=0;
  function loop(now){var e=Math.min(1,(now-t0)/DUR);bar.style.width=(e*100)+'%';pt.textContent='0:0'+Math.floor(e*4);if(e<1)raf=requestAnimationFrame(loop);else gate.classList.add('on')}
  function open(tile){
   var x=B[S[cur].world][+tile.dataset.r][+tile.dataset.i];if(!x)return;last=tile;
   var kind=x[4]||S[cur].world;
   w.querySelector('.ptitle').textContent=x[1];w.querySelector('.pmeta').textContent=NM[kind]||'NOISY';w.querySelector('.gs').textContent=SUB[kind]||SUB.theatre;
   gate.classList.remove('on');bar.style.width='0';pt.textContent='0:00';
   if(x[3]){kb.hidden=true;kb.classList.remove('go');pv.hidden=false;pv.poster=x[0];pv.src=x[3];pv.currentTime=0;var pr=pv.play();if(pr&&pr.catch)pr.catch(function(){})}
   else{pv.pause();pv.removeAttribute('src');pv.hidden=true;kb.hidden=false;kb.style.backgroundImage='url("'+x[0]+'")';kb.classList.remove('go');void kb.offsetWidth;kb.classList.add('go')}
   root.classList.add('pv-open');document.documentElement.style.overflow='hidden';
   /* кадърът излита от плочката към прегледа */
   var r=tile.getBoundingClientRect(),reduce=matchMedia('(prefers-reduced-motion:reduce)').matches;
   w.classList.add('on');w.setAttribute('aria-hidden','false');pbox.style.visibility='hidden';
   var R=pbox.getBoundingClientRect(),f=document.createElement('div');f.className='pflip';f.style.backgroundImage='url("'+x[0]+'")';
   f.style.left=r.left+'px';f.style.top=r.top+'px';f.style.width=r.width+'px';f.style.height=r.height+'px';document.body.appendChild(f);
   if(!reduce)f.animate([{left:r.left+'px',top:r.top+'px',width:r.width+'px',height:r.height+'px'},{left:R.left+'px',top:R.top+'px',width:R.width+'px',height:R.height+'px'}],{duration:560,easing:'cubic-bezier(.2,.7,.2,1)',fill:'forwards'});
   clearTimeout(timer);timer=setTimeout(function(){pbox.style.visibility='';var fl=w.querySelector('.flash');fl.style.animation='none';void fl.offsetWidth;fl.style.animation='';
    cancelAnimationFrame(raf);t0=performance.now();raf=requestAnimationFrame(loop);setTimeout(function(){f.remove()},250);w.querySelector('.px').focus({preventScroll:true})},reduce?0:540);
  }
  function close(){clearTimeout(timer);cancelAnimationFrame(raf);pv.pause();w.classList.remove('on');w.setAttribute('aria-hidden','true');gate.classList.remove('on');root.classList.remove('pv-open');document.documentElement.style.overflow='';
   document.querySelectorAll('.pflip').forEach(function(f){f.remove()});pbox.style.visibility='';if(last)last.focus({preventScroll:true})}
  box.addEventListener('click',function(e){var t=e.target.closest('.ag-tile');if(!t)return;e.preventDefault();open(t)});
  w.querySelector('.px').addEventListener('click',close);w.querySelector('.gother').addEventListener('click',close);
  w.querySelector('[data-su]').addEventListener('click',function(){close()});
  w.addEventListener('click',function(e){if(e.target===w)close()});
  document.addEventListener('keydown',function(e){if(e.key==='Escape'&&w.classList.contains('on'))close()});

  /* кадрите на всички модули се зареждат предварително, щом галерията наближи, за да няма празни плочки при смяна */
  var done=false;new IntersectionObserver(function(es,o){if(done||!es.some(function(x){return x.isIntersecting}))return;done=true;o.disconnect();
   Object.keys(B).forEach(function(k){B[k].forEach(function(r){r.forEach(function(x){var im=new Image();im.src=x[0]})})})},{rootMargin:'600px'}).observe(root);
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
/* „Повече от гледане“ на по-нисък екран (13" лаптоп): картата е колкото позволява екранът, съдържанието се смалява пропорционално, стрелки отстрани */
(function(){
 function init(){
  var hl=document.getElementById('hl'),rail=document.getElementById('hlrail'),ctl=hl&&hl.querySelector('.hlctl');if(!hl||!rail||!ctl)return;
  var mq=matchMedia('(min-width:1024px)'),cards=[].slice.call(rail.querySelectorAll('.hcard'));
  function arr(i){return ctl.querySelectorAll('.hlarr')[i]}
  function side(cls,txt,lab,i){var b=document.createElement('button');b.type='button';b.className='hlside '+cls;b.innerHTML=txt;b.setAttribute('aria-label',lab);b.addEventListener('click',function(){var a=arr(i);if(a)a.click()});hl.appendChild(b);return b}
  var L=side('l','‹','Предишна карта',0),R=side('r','›','Следваща карта',1);
  function sync(){var a=arr(0),b=arr(1);L.disabled=!!(a&&a.disabled);R.disabled=!!(b&&b.disabled)}
  new MutationObserver(sync).observe(ctl,{subtree:true,attributes:true,attributeFilter:['disabled','class']});
  function fit(){
   if(!mq.matches){hl.style.removeProperty('--hlh');cards.forEach(function(c){[].forEach.call(c.children,function(e){e.style.zoom=''})});return}
   var hdr=(document.getElementById('hdr')||{offsetHeight:88}).offsetHeight;
   var H=Math.min(620,innerHeight-hdr-190);if(innerWidth>=1800)H=Math.max(H,Math.min(700,innerHeight-hdr-280));H=Math.round(Math.max(420,H));
   hl.style.setProperty('--hlh',H+'px');
   cards.forEach(function(c){var vis=[].filter.call(c.children,function(e){return !e.matches('.tag,.cap,video,.mask')})[0];if(!vis)return;vis.style.zoom=1;var nh=vis.getBoundingClientRect().height;if(nh>0)vis.style.zoom=Math.min(1,(H-56)/nh).toFixed(3)});
   hl.style.setProperty('--railtop',rail.offsetTop+'px');sync();
  }
  addEventListener('resize',fit);addEventListener('load',fit);setTimeout(fit,600);fit();
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();

/* 13.10 (Лили): на телефон и таблет при скрол логото се свива само до символа N */
(function(){var h=document.querySelector(".hdr");if(!h)return;var mq={matches:true},on=false; /* 15.10 (Коста): на всички размери */
 function up(){var m=mq.matches&&scrollY>40;if(m!==on){on=m;h.classList.toggle("mini",m)}}
 addEventListener("scroll",up,{passive:true});addEventListener("resize",up);up();})();
/* 13.10: празното между редовете плочки и „Повече от гледане“ - най-много clamp(96px,10vw,160px) (беше 300-400px от празния долен край на закачената галерия) */
(function(){
 function fix(){var hl=document.getElementById('hl'),sc=document.querySelector('.ag-scene'),st=document.querySelector('.ag-stick'),h2=hl&&hl.querySelector('h2');if(!hl||!sc||!st||!h2)return;
  var tiles=[].slice.call(st.querySelectorAll('.ag-tile,.agdaily'));if(!tiles.length)return;
  (hl.closest('.hlscene')||hl).style.marginTop='';var sR=st.getBoundingClientRect(),sh=st.querySelector('.ag-shelves'),ty=0;if(sh){var mt=getComputedStyle(sh).transform;if(mt&&mt!=='none'){var mm=new DOMMatrixReadOnly(mt);ty=mm.m42}}var rb=Math.max.apply(null,tiles.map(function(t){return t.getBoundingClientRect().bottom}))-sR.top-ty-(document.getElementById('mods').classList.contains('kpre')?36:0);
  var rowsEnd=sc.getBoundingClientRect().bottom+scrollY-sR.height+rb,gap=h2.getBoundingClientRect().top+scrollY-rowsEnd;var hs=hl;while(hs&&hs!==document.body){var ht=getComputedStyle(hs).transform;if(ht&&ht!=='none')gap-=new DOMMatrixReadOnly(ht).m42;hs=hs.parentElement}
  var want=Math.max(96,Math.min(160,innerWidth*.1));if(hl.closest('.hlscene'))want+=70;if(Math.abs(gap-want)>4)(hl.closest('.hlscene')||hl).style.marginTop=(-(gap-want)).toFixed(0)+'px'}
 addEventListener('load',fix);addEventListener('resize',function(){clearTimeout(fix.t);fix.t=setTimeout(fix,150)});setTimeout(fix,800);
})();
