(function(){
  var v=document.getElementById('v13v'),b=document.getElementById('v13pp');if(!v)return;
  var loaded=false,manual=false;
  function load(){if(loaded)return;loaded=true;v.src=v.dataset.v13Src;}
  function sync(){b.textContent=v.paused?'▶':'❚❚';b.setAttribute('aria-label',v.paused?'Пусни видеото':'Спри видеото');}
  var reduced=matchMedia('(prefers-reduced-motion:reduce)').matches;
  if('IntersectionObserver' in window){new IntersectionObserver(function(es){es.forEach(function(e){
    if(e.isIntersecting){load();if(!manual&&!reduced)v.play().catch(function(){});}else{v.pause();}
    sync();});},{threshold:.4}).observe(v);}else load();
  b.addEventListener('click',function(){manual=true;load();if(v.paused)v.play().catch(function(){});else v.pause();sync();});
  v.addEventListener('play',sync);v.addEventListener('pause',sync);sync();
})();
/* „Повече от гледане": видеата се зареждат предварително, преди секцията да е на екрана, за да тръгват веднага */
(function(){var hl=document.getElementById('hl');if(!hl||!('IntersectionObserver' in window))return;
 var done=false;function warm(){if(done)return;done=true;var vs=[].slice.call(hl.querySelectorAll('video[data-src]'));
  vs.forEach(function(v,i){setTimeout(function(){if(!v.src){v.preload='auto';v.src=v.dataset.src;v.load&&v.load();}},i*250)})}
 new IntersectionObserver(function(es){if(es[0].isIntersecting)warm()},{rootMargin:'1800px 0px'}).observe(hl);})();
/* лентата под „Повече от гледане" показва реалния напредък на видеото (или на времето за картата), винаги и без закъснение */
(function(){var rail=document.getElementById('hlrail'),dots=document.getElementById('hldots');if(!rail||!dots)return;
 var lastIdx=-1,t0=0,pausedAt=0,raf;
 function tick(){raf=requestAnimationFrame(tick);
  var ds=dots.querySelectorAll('.d'),idx=-1;ds.forEach(function(d,i){if(d.classList.contains('on'))idx=i});if(idx<0)return;
  var card=rail.children[idx];if(idx!==lastIdx){lastIdx=idx;t0=performance.now()}
  var ms=+((innerWidth<1024&&card.dataset.msM)||card.dataset.ms||6500),paused=rail.classList.contains('paused');
  if(paused){if(!pausedAt)pausedAt=performance.now();return}
  if(pausedAt){t0+=performance.now()-pausedAt;pausedAt=0}
  var p=(performance.now()-t0)/ms,v=null;
  [].forEach.call(card.querySelectorAll('video'),function(x){if(x.offsetParent!==null&&x.id!=='jvv'&&x.readyState>1&&!x.paused&&isFinite(x.duration))v=x});
  if(v)p=v.currentTime/Math.min(v.duration,ms/1000);
  p=Math.max(0,Math.min(1,p));ds[idx].style.setProperty('--p',p.toFixed(4));
  ds.forEach(function(d,i){if(i!==idx)d.style.removeProperty('--p')})}
 tick();})();
