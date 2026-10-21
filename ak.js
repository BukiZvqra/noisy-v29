/* NOISY · Apple „Get the highlights“ карусел: движение и поведение.
   Измерено на apple.com: текстът на неактивните карти е изместен на +/-162px и влиза при скрола,
   картите и заглавието излизат с fade + 30px отдолу (стъпка 0,12 сек), активната карта се сменя със snap. */
(function(){
 var RM=matchMedia('(prefers-reduced-motion:reduce)').matches;
 var ext=document.documentElement.classList.contains('nomp4')?'.webm':'.mp4';
 var sec=document.getElementById('ak'),g=document.getElementById('akg'),dotsEl=document.getElementById('akdots'),ctl=document.getElementById('akctl'),pp=document.getElementById('akpp');
 if(!sec||!g)return;
 var cards=[].slice.call(g.querySelectorAll('.hcard')),n=cards.length,cur=-1,paused=false,visible=false,revealed=false,anim=0,timer=0,deadline=0,remaining=0,SHIFT=162;

 /* текстът и етикетът се събират в една група, за да се движат заедно */
 cards.forEach(function(c,i){
  c.style.setProperty('--i',i);
  var tag=c.querySelector('.tag'),cap=c.querySelector('.cap');
  if(tag&&cap){var w=document.createElement('div');w.className='akcap';c.insertBefore(w,tag);w.appendChild(tag);w.appendChild(cap)}
 });

 /* точките */
 cards.forEach(function(c,i){
  var b=document.createElement('button');b.type='button';b.className='akd';b.setAttribute('role','tab');
  b.setAttribute('aria-label',(c.querySelector('.cap')||{textContent:'Карта '+(i+1)}).textContent.split('.')[0]);
  b.innerHTML='<i></i>';b.addEventListener('click',function(){go(i,true)});dotsEl.appendChild(b)});
 var dots=[].slice.call(dotsEl.children);

 function step(){return n>1?cards[1].offsetLeft-cards[0].offsetLeft:g.clientWidth}
 function ms(c){var v=parseFloat(c.getAttribute('data-ms'));return (v>0&&isFinite(v))?v:7000}

 /* плавен скрол със същата крива като на Apple (без да се бори със snap) */
 function scrollTo(x,dur){
  cancelAnimationFrame(anim);anim=0;var x0=g.scrollLeft,t0=0;g.classList.add('anim');
  if(RM||dur<=0){g.scrollLeft=x;g.classList.remove('anim');return}
  function e(t){return t<.5?2*t*t:1-Math.pow(-2*t+2,2)/2}
  function f(ts){if(!t0)t0=ts;var p=Math.min(1,(ts-t0)/dur);g.scrollLeft=x0+(x-x0)*e(p);
   if(p<1)anim=requestAnimationFrame(f);else{g.classList.remove('anim');anim=0}}
  anim=requestAnimationFrame(f)}
 function go(i,user){i=(i+n)%n;scrollTo(i*step(),1050);}

 /* видеата на активната карта */
 function vids(c){return [].slice.call(c.querySelectorAll('video[data-src]'))}
 /* One source of choreography per card. The first four are rendered clips;
    Theatre is a static composition. Newsroom keeps its original full-frame video. */
 var FX=['battery','chip','week','siri','colors','news']; /* 16.10: картата със седмицата е мокъпът на Лили от Figma */ /* 16.10: редът е по Figma Frame 14 */
 var CLIPS={0:{name:'battery',ms:5400},1:{name:'chip',ms:6000},3:{name:'siri',ms:7000,still:true},4:{name:'colors',ms:5000}};
 function vsize(){return innerWidth>=1069?'l':innerWidth>=735?'m':'s'}
 function clipUrl(c,part){var name=c._clip.name+'-'+vsize();return 'clips/'+name+(part==='v'?ext:'-'+part+'.jpg')}
 cards.forEach(function(c,i){
  c.setAttribute('data-fx',FX[i]);c.id='ak-card-'+i;c.setAttribute('role','tabpanel');
  dots[i].id='ak-tab-'+i;dots[i].setAttribute('aria-controls',c.id);c.setAttribute('aria-labelledby',dots[i].id);
  var k=CLIPS[i];if(!k)return;c._clip=k;c.classList.add('hasclip');c.setAttribute('data-ms',k.ms);
  [].slice.call(c.children).forEach(function(ch){if(!ch.classList.contains('akcap'))ch.remove()});
  var m=document.createElement('div');m.className='akm';m.setAttribute('aria-hidden','true');
  m.innerHTML='<img class="st" alt="">'+(k.still?'':'<video muted playsinline preload="none"></video><img class="en" alt="">');c.insertBefore(m,c.firstChild);
  var v=m.querySelector('video');
  if(v){v.addEventListener('playing',function(){c.classList.add('clip-on');c.classList.remove('clip-end')});
   v.addEventListener('ended',function(){c.classList.add('clip-end')});
   v.addEventListener('error',function(){c.classList.remove('clip-on');c.classList.add('clip-end')})}
  c._sz='';
  c._setSrc=function(){var z=vsize();if(c._sz===z)return false;c._sz=z;
   m.querySelector('.st').src=clipUrl(c,k.still?'end':'start');
   if(v){m.querySelector('.en').src=clipUrl(c,'end');v.pause();v.removeAttribute('src');v.load()}
   c.classList.remove('clip-on','clip-end');if(RM&&c._clip&&!c._clip.still)c.classList.add('clip-end');c._pl=0;return true};
  c._setSrc();
 });
 function media(c){return c._clip?[].slice.call(c.querySelectorAll('.akm video')):vids(c)}
 function play(c){
  if(RM||paused||document.hidden)return;
  media(c).forEach(function(v){
   if(!v.getAttribute('src'))v.src=c._clip?clipUrl(c,'v'):v.dataset.src.replace(/\.mp4$/,'')+ext;
   var p=v.play();if(p&&p.catch)p.catch(function(){c._pl=0})
  });
 }
 function stop(c){
  media(c).forEach(function(v){v.pause();try{v.currentTime=0}catch(e){}});
  c.classList.remove('clip-on','clip-end');if(RM&&c._clip&&!c._clip.still)c.classList.add('clip-end');c._pl=0;
 }

 function activate(i){
  if(i===cur)return;var prev=cur;cur=i;
  if(prev>=0){cards[prev].classList.remove('vis');stop(cards[prev])}
  cards[i].classList.add('vis');
  dots.forEach(function(d,k){d.classList.toggle('on',k===i);d.setAttribute('aria-selected',k===i);d.tabIndex=k===i?0:-1});
  restart(i)}

 /* автоматичното превъртане: пълнежът на активната точка е таймерът */
 function restart(i){
  clearTimeout(timer);ctl.classList.remove('done');
  var d=dots[i];if(!d)return;var ii=d.firstElementChild;
  dots.forEach(function(x){x.firstElementChild.style.removeProperty('--ms')});
  d.style.setProperty('--ms',ms(cards[i])+'ms');ii.style.setProperty('--ms',ms(cards[i])+'ms');
  /* рестарт на CSS анимацията */
  d.classList.remove('on');void d.offsetWidth;d.classList.add('on');
  remaining=ms(cards[i]);deadline=performance.now()+remaining;
  if(!paused&&visible&&revealed&&!RM&&!document.hidden)timer=setTimeout(next,remaining)}
 function next(){go(cur+1,false);}

 /* най-близката карта по скрола; текстът следва скрола */
 var tk=0;
 function onScroll(){if(tk)return;tk=requestAnimationFrame(function(){tk=0;
  var st=step(),m=cards[0].offsetLeft,x=g.scrollLeft,i=Math.max(0,Math.min(n-1,Math.round(x/st)));
  cards.forEach(function(c,k){var d=(c.offsetLeft-m-x)/st,w=c.querySelector('.akcap');if(w)w.style.setProperty('--cx',(RM?0:d*SHIFT).toFixed(1)+'px')});
  if(i!==cur)activate(i);
  cards.forEach(function(c,k){
   var settled=Math.abs(x-k*st)<st*.12;
   if(k===cur&&settled&&visible&&revealed&&!paused&&!RM&&!c._pl){c._pl=1;play(c)}
   else if(k!==cur&&c._pl)stop(c);
  });
 })}

 g.addEventListener('scroll',onScroll,{passive:true});addEventListener('resize',function(){cards.forEach(function(c){if(c._setSrc)c._setSrc()});scrollTo(Math.max(0,cur)*step(),0);onScroll()});

 /* клавиатура */
 g.addEventListener('keydown',function(e){if(e.key==='ArrowRight'){e.preventDefault();go(cur+1,true)}else if(e.key==='ArrowLeft'){e.preventDefault();go(cur-1,true)}});

 /* пауза / плей */
 function setPaused(p){
  if(paused===p)return;
  if(p){remaining=Math.max(0,deadline-performance.now());clearTimeout(timer)}
  paused=p;pp.setAttribute('aria-pressed',p?'true':'false');pp.setAttribute('aria-label',p?'Пусни':'Пауза');ctl.classList.toggle('paused',p);
  cards.forEach(function(c){media(c).forEach(function(v){if(p)v.pause()});c._pl=0});
  if(!p){deadline=performance.now()+remaining;if(visible&&revealed&&!document.hidden)timer=setTimeout(next,remaining);onScroll()}
 }
 pp.addEventListener('click',function(){setPaused(!paused)});
 /* Native touch scrolling; pointer dragging on a desktop. */
 var drag=null;
 g.addEventListener('pointerdown',function(e){
  clearTimeout(timer);
  if(e.pointerType==='mouse'&&e.button===0){cancelAnimationFrame(anim);anim=0;drag={x:e.clientX,start:g.scrollLeft,moved:false,id:e.pointerId}}
 });
 g.addEventListener('pointermove',function(e){
  if(!drag)return;var dx=e.clientX-drag.x;
  if(!drag.moved&&Math.abs(dx)>8){drag.moved=true;g.classList.add('drag');g.setPointerCapture(e.pointerId)}
  if(drag.moved){e.preventDefault();g.scrollLeft=drag.start-dx}
 });
 function release(){
  var d=drag;drag=null;g.classList.remove('drag');
  if(d&&d.moved){if(g.hasPointerCapture(d.id))g.releasePointerCapture(d.id);go(Math.round(g.scrollLeft/step()),true)}
  if(!paused&&visible&&revealed)restart(cur);
 }
 g.addEventListener('pointerup',release);g.addEventListener('pointercancel',release);
 g.addEventListener('lostpointercapture',function(){if(drag)release()});
 addEventListener('pointerup',function(){if(drag)release()});
 dotsEl.addEventListener('keydown',function(e){
  if(e.key==='ArrowRight'||e.key==='ArrowLeft'){e.preventDefault();var i=(cur+(e.key==='ArrowRight'?1:-1)+n)%n;go(i,true);dots[i].focus()}
 });

 /* Reveal completes before the first device animation begins. */
 new IntersectionObserver(function(es){es.forEach(function(e){
  var was=visible;visible=e.isIntersecting&&e.intersectionRatio>=.25;
  ctl.classList.toggle('off',!visible||!revealed);
  if(visible&&!sec.classList.contains('in')){
   sec.classList.add('in');setTimeout(function(){revealed=true;ctl.classList.toggle('off',!visible);onScroll();restart(Math.max(0,cur))},1350);
  }
  if(!visible&&was){clearTimeout(timer);cards.forEach(function(c){media(c).forEach(function(v){v.pause()});c._pl=0})}
  if(visible&&!was&&revealed){onScroll();restart(Math.max(0,cur))}
 })},{threshold:[0,.25,.5]}).observe(g);
 document.addEventListener('visibilitychange',function(){
  if(document.hidden){clearTimeout(timer);cards.forEach(function(c){media(c).forEach(function(v){v.pause()});c._pl=0})}
  else if(visible&&revealed){onScroll();restart(Math.max(0,cur))}
 });
 if(RM){paused=true;ctl.classList.add('paused');pp.setAttribute('aria-pressed','true');pp.setAttribute('aria-label','Пусни');cards.forEach(function(c){if(c._clip&&!c._clip.still)c.classList.add('clip-end')})}

 /* поставя картата на началото */
 scrollTo(0,0);activate(0);onScroll();
})();
