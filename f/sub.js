/* NOISY · подстраници: общо поведение за всички варианти */
(function(){
 var RM=matchMedia('(prefers-reduced-motion:reduce)').matches;
 function $(s,r){return (r||document).querySelector(s)}function $$(s,r){return [].slice.call((r||document).querySelectorAll(s))}
 function screen(ph,i){$$('.scr',ph).forEach(function(s,k){var on=k===i;s.classList.toggle('on',on);$$('video',s).forEach(function(v){if(on){if(!v.src&&v.dataset.src)v.src=v.dataset.src;var p=v.play();if(p&&p.catch)p.catch(function(){})}else v.pause()})})}
 window.nsScreen=screen;

 /* видеата вървят само докато се виждат */
 var vio=new IntersectionObserver(function(es){es.forEach(function(e){var v=e.target;if(e.isIntersecting){if(!v.src&&v.dataset.src)v.src=v.dataset.src;if(!RM){var p=v.play();if(p&&p.catch)p.catch(function(){})}}else v.pause()})},{threshold:.15});
 $$('video[data-auto]').forEach(function(v){vio.observe(v)});

 /* A: табове под телефона, сами се сменят, докато не натиснеш */
 $$('[data-tabs]').forEach(function(box){var ph=$('#'+box.dataset.tabs),bs=$$('button',box),cap=$('#'+box.dataset.cap),i=0,t=0,user=false,ms=4500;box.style.setProperty('--tab-ms',ms+'ms');
  function go(k){i=k;bs.forEach(function(b,j){b.setAttribute('aria-selected',j===k);var x=b.querySelector('i');if(x){x.style.animation='none';void x.offsetWidth;x.style.animation=''}});screen(ph,k);if(cap)cap.innerHTML='<b>'+bs[k].dataset.t+'</b>'+bs[k].dataset.d;clearTimeout(t);if(!user&&!RM)t=setTimeout(function(){go((i+1)%bs.length)},ms)}
  bs.forEach(function(b,k){b.addEventListener('click',function(){user=true;box.classList.add('user');go(k)})});
  new IntersectionObserver(function(es){if(es[0].isIntersecting&&!box.dataset.st){box.dataset.st=1;go(0)}},{threshold:.3}).observe(box)});

 /* B: при скрол главата в центъра сменя екрана */
 $$('[data-sty]').forEach(function(w){var ph=$('.ph',w),st=$$('.stp',w),cur=-1;
  function upd(){var mid=innerHeight*(innerWidth<960?.72:.5),best=0,bd=1e9;st.forEach(function(s,k){var r=s.getBoundingClientRect(),d=Math.abs(r.top+Math.min(r.height,innerHeight*.5)/2-mid);if(d<bd){bd=d;best=k}});if(best!==cur){cur=best;st.forEach(function(s,k){s.classList.toggle('on',k===best)});screen(ph,best)}}
  addEventListener('scroll',function(){requestAnimationFrame(upd)},{passive:true});addEventListener('resize',upd);upd()});

 /* D: интерактивният телефон */
 $$('[data-demo]').forEach(function(w){var ph=$('.ph',w),bs=$$('.d-app button',w),li=$$('.d-steps li'),tip=$('.d-tip',w),done=$('.d-done',w),seen={},need=Math.min(3,bs.length);
  function hint(){var nx=bs.find(function(b){return !seen[b.dataset.i]});bs.forEach(function(b){b.classList.toggle('hint',b===nx)})}
  function go(k,user){bs.forEach(function(b,j){b.classList.toggle('on',j===k)});screen(ph,k);var b=bs[k];if(tip)tip.innerHTML='<b>'+b.dataset.t+'</b>'+b.dataset.d;
   if(user){seen[k]=1;b.classList.add('seen');var n=Object.keys(seen).length;li.forEach(function(l,j){l.classList.toggle('done',j<n)});if(n>=need)setTimeout(function(){done.classList.add('on')},700)}hint()}
  bs.forEach(function(b,k){b.addEventListener('click',function(){go(k,true)})});
  var x=$('.d-done .x2',w);if(x)x.addEventListener('click',function(){done.classList.remove('on')});
  go(0,false)});

 /* лентата „Пробвай“ отдолу: след първия екран, скрива се при финалния призив */
 var bar=$('.sbar'),hero=$('[data-hero]'),end=$('.end'),past=false,atEnd=false;
 function sb(){if(bar)bar.classList.toggle('on',past&&!atEnd)}
 if(bar&&hero)new IntersectionObserver(function(es){past=!es[0].isIntersecting;sb()},{rootMargin:'-120px 0px 0px 0px'}).observe(hero);
 if(bar&&end)new IntersectionObserver(function(es){atEnd=es[0].isIntersecting;sb()},{threshold:.25}).observe(end);

 /* регистрация (демо) */
 var su=$('#su'),last=null;
 function openSu(t){last=t;su.classList.remove('done');su.classList.add('on');su.setAttribute('aria-hidden','false');document.documentElement.style.overflow='hidden';setTimeout(function(){var e=$('.em',su);e&&e.focus({preventScroll:true})},60)}
 function closeSu(){su.classList.remove('on');su.setAttribute('aria-hidden','true');document.documentElement.style.overflow='';last&&last.focus&&last.focus({preventScroll:true})}
 window.nsOpenSignup=openSu;
 document.addEventListener('click',function(e){var a=e.target.closest('[data-su]');if(!a)return;e.preventDefault();closePv();openSu(a)});
 if(su){$$('[data-x]',su).forEach(function(x){x.addEventListener('click',closeSu)});su.addEventListener('click',function(e){if(e.target===su)closeSu()});
  $('form',su).addEventListener('submit',function(e){e.preventDefault();su.classList.add('done')})}

 /* преглед на заглавие: кадърът излита, тече няколко секунди, после „Хареса ти?“ */
 var pw=$('#pvw');var pv,kb,gate,pbar,pt,pbox,t0=0,raf=0,tm=0,lastT=null,DUR=4000;
 var SUB={theatre:'Целият епизод те чака.',showtime:'Целият епизод и най-силните моменти.',arena:'Целият мач, със статистиката до него.',newsroom:'Новините на деня, за 60 секунди.'};
 if(pw){pv=$('video',pw);kb=$('.kbi',pw);gate=$('.tgate',pw);pbar=$('.pbar i',pw);pt=$('.ptm',pw);pbox=$('.pvbox',pw)}
 function loop(now){var e=Math.min(1,(now-t0)/DUR);pbar.style.width=(e*100)+'%';pt.textContent='0:0'+Math.floor(e*4);if(e<1)raf=requestAnimationFrame(loop);else gate.classList.add('on')}
 function openPv(tile){lastT=tile;var d=tile.dataset;$('.ptitle',pw).textContent=d.t;$('.pmeta',pw).textContent=d.n;$('.gs',pw).textContent=SUB[d.k]||SUB.theatre;
  gate.classList.remove('on');pbar.style.width='0';pt.textContent='0:00';
  if(d.v){kb.hidden=true;pv.hidden=false;pv.poster=d.img;pv.src=d.v;pv.currentTime=0;var p=pv.play();if(p&&p.catch)p.catch(function(){})}
  else{pv.pause();pv.removeAttribute('src');pv.hidden=true;kb.hidden=false;kb.style.backgroundImage='url("'+d.img+'")';kb.classList.remove('go');void kb.offsetWidth;kb.classList.add('go')}
  document.documentElement.style.overflow='hidden';pw.classList.add('on');pw.setAttribute('aria-hidden','false');pbox.style.visibility='hidden';
  var r=tile.getBoundingClientRect(),R=pbox.getBoundingClientRect(),f=document.createElement('div');f.className='pflip';f.style.backgroundImage='url("'+d.img+'")';
  f.style.cssText+=';left:'+r.left+'px;top:'+r.top+'px;width:'+r.width+'px;height:'+r.height+'px';document.body.appendChild(f);
  if(!RM)f.animate([{left:r.left+'px',top:r.top+'px',width:r.width+'px',height:r.height+'px'},{left:R.left+'px',top:R.top+'px',width:R.width+'px',height:R.height+'px'}],{duration:540,easing:'cubic-bezier(.2,.7,.2,1)',fill:'forwards'});
  clearTimeout(tm);tm=setTimeout(function(){pbox.style.visibility='';cancelAnimationFrame(raf);t0=performance.now();raf=requestAnimationFrame(loop);setTimeout(function(){f.remove()},200);$('.px',pw).focus({preventScroll:true})},RM?0:520)}
 function closePv(){if(!pw||!pw.classList.contains('on'))return;clearTimeout(tm);cancelAnimationFrame(raf);pv.pause();pw.classList.remove('on');pw.setAttribute('aria-hidden','true');gate.classList.remove('on');document.documentElement.style.overflow='';$$('.pflip').forEach(function(f){f.remove()});pbox.style.visibility='';lastT&&lastT.focus({preventScroll:true})}
 if(pw){document.addEventListener('click',function(e){var t=e.target.closest('.tile,[data-pv]');if(t){e.preventDefault();openPv(t)}});
  $('.px',pw).addEventListener('click',closePv);$('.gother',pw).addEventListener('click',closePv);pw.addEventListener('click',function(e){if(e.target===pw)closePv()})}
 document.addEventListener('keydown',function(e){if(e.key==='Escape'){closePv();if(su&&su.classList.contains('on'))closeSu()}});


 /* F: „Повече от гледане“ като на главната: картата стои, докато видеото ѝ свърши, точката се пълни, после следващата */
 $$('[data-hl]').forEach(function(w){var rail=$('.hlr',w),cards=$$('.hc',w),dots=$('.hld',w),pv=$('.ar.p',w),nx=$('.ar.n',w),pp=$('.ar.pp',w),cur=-1,seen=false,playing=!RM,tm=0,t0=0,dur=0,raf=0,el=0;
  dots.innerHTML=cards.map(function(c,i){return '<button type="button" aria-label="Карта '+(i+1)+'"><i></i></button>'}).join('');var ds=$$('button',dots);
  cards.forEach(function(c){$$('.hv video',c).forEach(function(v){v.loop=false;v.preload='auto';if(!v.src&&v.dataset.src)v.src=v.dataset.src})});
  function vid(c){return $('.hv video',c)}
  var dkT=0;function deck(c,on){clearInterval(dkT);var it=$$('.dki',c);if(!it.length)return;var i=0;function ap(){it.forEach(function(e,j){e.dataset.d=(j-i+it.length)%it.length})}ap();if(on&&!RM)dkT=setInterval(function(){i=(i+1)%it.length;ap()},2200)}
  var scT=[];function clr(){scT.forEach(clearTimeout);scT.forEach(clearInterval);scT=[]}
  function mv(c,on){$$('video:not(.pbg)',c).forEach(function(v){if(v.closest('.hv')||v.closest('.jv'))return;if(on){if(!v.src&&v.dataset.src)v.src=v.dataset.src;v.loop=true;var p=v.play();if(p&&p.catch)p.catch(function(){})}else v.pause()})}
  function scene(c,on){clr();mv(c,on);
   var ms=$$('.msg',c);if(ms.length){ms.forEach(function(m){m.classList.remove('on')});if(on)[400,1300,2400,5600].forEach(function(t,j){scT.push(setTimeout(function(){if(ms[j])ms[j].classList.add('on')},RM?0:t))})}
   var jv=$('.jv video',c);if(jv){var mk=$$('.jm',c),rs=$$('.jr',c),jb=$('.jb',c);function at(j){var t=+mk[j].dataset.t;if(!jv.src)jv.src=jv.dataset.src;try{jv.currentTime=t}catch(e){}var p=jv.play();if(p&&p.catch)p.catch(function(){});mk.forEach(function(m,x){m.classList.toggle('on',x===j)});rs.forEach(function(r,x){r.classList.toggle('on',x===j)});jb.style.setProperty('--jp',(t/103*100)+'%')}
    if(on){var j=0;at(0);scT.push(setInterval(function(){j=(j+1)%mk.length;at(j)},2200))}else jv.pause()}
   var si=$$('.sti',c),sg=$$('.sg i',c);if(si.length&&sg.length){var k2=0;function sh(x){k2=x;si.forEach(function(e,y){e.classList.toggle('on',y===x)});sg.forEach(function(e,y){e.classList.toggle('f',y<x);e.classList.remove('cur');if(y===x){void e.offsetWidth;e.classList.add('cur')}})}
    if(on){sh(0);scT.push(setInterval(function(){sh((k2+1)%si.length)},2200))}}
   var tb=$$('.tb span',c);if(tb.length&&!si.length&&!ms.length){var on0=tb.map(function(e){return e.classList.contains('on')});if(on){tb.forEach(function(e){e.classList.remove('on')});tb.forEach(function(e,y){if(on0[y]||y===2)scT.push(setTimeout(function(){e.classList.add('on')},500+y*650))})}else tb.forEach(function(e,y){e.classList.toggle('on',on0[y])})}
   var n6=$('.n60 .ar',c);if(n6){n6.style.animation='none';void n6.offsetWidth;n6.style.animation=''}
  }
  function bg(c,on){$$('video.pbg',c).forEach(function(v){if(on){if(!v.src&&v.dataset.src)v.src=v.dataset.src;var p=v.play();if(p&&p.catch)p.catch(function(){})}else v.pause()})}
  function fill(p){ds.forEach(function(d,k){$('i',d).style.setProperty('--p',(k===cur?p*100:0)+'%')})}
  function tick(){if(!playing||!seen)return;var v=vid(cards[cur]),p;if(v&&v.duration){p=v.currentTime/v.duration}else{p=Math.min(1,(el+(performance.now()-t0))/dur)}fill(p);if(!v&&p>=1){next();return}raf=requestAnimationFrame(tick)}
  function start(){cancelAnimationFrame(raf);var c=cards[cur],v=vid(c);if(!seen||!playing){if(v)v.pause();return}
   if(v){var pr=v.play();if(pr&&pr.catch)pr.catch(function(){})}else{t0=performance.now()}bg(c,true);deck(c,true);scene(c,true);raf=requestAnimationFrame(tick)}
  function next(){go(cur+1>=cards.length?0:cur+1)}
  function set(i,restart){if(i===cur&&!restart)return;cards.forEach(function(c,k){var v=vid(c);if(v&&k!==i)v.pause();if(k!==i){bg(c,false);if(c.classList.contains('on'))scene(c,false)}});cur=i;el=0;dur=+(cards[i].dataset.ms||6000);
   cards.forEach(function(c,k){c.classList.toggle('on',k===i)});ds.forEach(function(d,k){d.classList.toggle('on',k===i)});
   var v=vid(cards[i]);if(v){try{v.currentTime=0}catch(e){}}fill(0);start()}
  function go(i){i=Math.max(0,Math.min(cards.length-1,i));var c=cards[i];set(i,true);rail.scrollTo({left:c.offsetLeft-(rail.clientWidth-c.clientWidth)/2,behavior:RM?'auto':'smooth'})}
  cards.forEach(function(c,k){var v=vid(c);if(v)v.addEventListener('ended',function(){if(k===cur&&playing)next()})});
  var st=0;rail.addEventListener('scroll',function(){clearTimeout(st);st=setTimeout(function(){var mid=rail.scrollLeft+rail.clientWidth/2,best=0,bd=1e9;cards.forEach(function(c,k){var d=Math.abs(c.offsetLeft+c.clientWidth/2-mid);if(d<bd){bd=d;best=k}});if(best!==cur)set(best,true)},120)},{passive:true});
  [].forEach.call(w.querySelectorAll('.hside'),function(b){b.addEventListener('click',function(){go(b.classList.contains('l')?cur-1:cur+1)})});
  ds.forEach(function(d,k){d.addEventListener('click',function(){go(k)})});pv.addEventListener('click',function(){go(cur-1)});nx.addEventListener('click',function(){go(cur+1)});
  pp.addEventListener('click',function(){playing=!playing;pp.textContent=playing?'❚❚':'▶';pp.setAttribute('aria-label',playing?'Пауза':'Пусни');w.classList.toggle('paused',!playing);
   if(!playing){var v=vid(cards[cur]);if(v)v.pause();else el+=performance.now()-t0;cancelAnimationFrame(raf);clearInterval(dkT);bg(cards[cur],false);clr();mv(cards[cur],false)}else start()});
  if(!playing){pp.textContent='▶';pp.setAttribute('aria-label','Пусни')}
  cards.forEach(function(c,k){c.addEventListener('click',function(){if(k!==cur)go(k)})});
  new IntersectionObserver(function(es){seen=es[0].isIntersecting;if(seen)start();else{var v=vid(cards[cur]);if(v)v.pause();cancelAnimationFrame(raf);clearInterval(dkT);bg(cards[cur],false);clr();mv(cards[cur],false)}},{threshold:.45}).observe(rail);
  set(0,true)});
 /* F: редовете спират, докато тече прегледът */
 var fr=$('.f-rows');if(fr&&pw)new MutationObserver(function(){fr.classList.toggle('pv-open',pw.classList.contains('on'))}).observe(pw,{attributes:true,attributeFilter:['class']});
 /* 13.10: плочките стоят на картинката; клипът върви само при посочване с мишката (при натискане се отваря прегледът с видео); редовете спират плавно, докато мишката е върху плочка */
 var hov=matchMedia('(hover:hover) and (pointer:fine)'),rt=0,rc=1,rz=0;
 function rate(to){cancelAnimationFrame(rt);var from=rc,t0=performance.now();(function st(n){var k=Math.min(1,(n-t0)/450),e=1-Math.pow(1-k,3);rc=from+(to-from)*e;$$('.f-rows .mqt').forEach(function(f){(f.getAnimations?f.getAnimations():[]).forEach(function(x){x.playbackRate=rc})});if(k<1)rt=requestAnimationFrame(st)})(t0)}
 $$('video[data-tv]').forEach(function(v){var t=v.parentElement;
  v.addEventListener('playing',function(){if(t.matches(':hover'))v.classList.add('pl')});
  t.addEventListener('mouseenter',function(){if(!hov.matches)return;clearTimeout(rz);clearTimeout(t._o);rate(0);if(!v.src)v.src=v.dataset.tv;if(!v.paused&&v.readyState>2)v.classList.add('pl');var pr=v.play();if(pr&&pr.catch)pr.catch(function(){})});
  t.addEventListener('mouseleave',function(){if(!hov.matches)return;v.classList.remove('pl');t._o=setTimeout(function(){if(!t.matches(':hover')){v.pause();try{v.currentTime=0}catch(e){}}},520);clearTimeout(rz);rz=setTimeout(function(){rate(1)},160)})});
 /* въпроси: отворен е само един */
 var ds=$$('.fq details');ds.forEach(function(d){d.addEventListener('toggle',function(){if(d.open)ds.forEach(function(o){if(o!==d)o.open=false})})});
})();

/* 13.10 (Лили): на телефон и таблет при скрол логото се свива само до символа N */
(function(){var h=document.querySelector(".hdr");if(!h)return;var mq=matchMedia("(max-width:1023px)"),on=false;
 function up(){var m=mq.matches&&scrollY>40;if(m!==on){on=m;h.classList.toggle("mini",m)}}
 addEventListener("scroll",up,{passive:true});addEventListener("resize",up);up();})();
/* 13.10 телефон: статичните телефони в „Повече от …“ се мащабират цели, за да се събере картата */
(function(){var mq=matchMedia("(max-width:1023px)");
 function fit(){[].forEach.call(document.querySelectorAll(".hc .ph"),function(e){e.style.zoom="";if(!mq.matches)return;var h=e.getBoundingClientRect().height,t=Math.max(300,innerHeight-470);if(h>t)e.style.zoom=(t/h).toFixed(3)})}
 addEventListener("resize",fit);addEventListener("load",fit);fit();})();
