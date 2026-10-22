/* v29: картите с плановете се обръщат като в Apple One („Виж разбивката“) */
(function(){
  [].forEach.call(document.querySelectorAll('.a1t'),function(t){
    var f=t.querySelector('.a1t-f'),b=t.querySelector('.a1t-b'),o=t.querySelector('[data-a1-open]'),c=t.querySelector('[data-a1-close]');
    function set(on){t.classList.toggle('flip',on);b.setAttribute('aria-hidden',!on);f.setAttribute('aria-hidden',on);(on?c:o).focus({preventScroll:true})}
    if(o)o.addEventListener('click',function(){set(true)});
    if(c)c.addEventListener('click',function(){set(false)});
    t.addEventListener('keydown',function(e){if(e.key==='Escape'&&t.classList.contains('flip'))set(false)});
  });

  /* кадрите в модулите: видео при посочване (на телефон при влизане в екрана) */
  var hover=matchMedia('(hover:hover)').matches;
  function vid(a,on){var v=a.querySelector('video');if(!v)return;if(on){if(!v.src)v.src=v.dataset.tv;var p=v.play();if(p&&p.then)p.then(function(){a.classList.add('pl')}).catch(function(){})}else{v.pause();a.classList.remove('pl')}}
  [].forEach.call(document.querySelectorAll('.a1r-c'),function(c){var a=c.querySelector('.a1r-im');if(!a)return;
    if(hover){c.addEventListener('mouseenter',function(){vid(a,true)});c.addEventListener('mouseleave',function(){vid(a,false)})}
    else new IntersectionObserver(function(es){es.forEach(function(e){vid(a,e.isIntersecting)})},{rootMargin:'-35% 0px -35% 0px'}).observe(a)});
  /* „Четири модула“ (Figma): лентата вляво върви бавно сама; списъкът вдясно се сменя само при посочване/натискане */
  [].forEach.call(document.querySelectorAll('[data-mz]'),function(st){
    var sec=st.closest('.mz-in'),tr=[].slice.call(st.querySelectorAll('.mz-tr')),it=[].slice.call(sec.querySelectorAll('.mz-i')),cur=0,x=0,last=0,vis=false,hov=false;
    var rm=matchMedia('(prefers-reduced-motion:reduce)').matches,SPEED=22;
    function vids(i,on){[].forEach.call(tr[i].querySelectorAll('video'),function(v){if(on){if(!v.src)v.src=v.dataset.tv;v.play().catch(function(){})}else v.pause()})}
    function set(i){if(i===cur)return;vids(cur,false);cur=i;x=0;tr.forEach(function(t,k){t.classList.toggle('on',k===i)});it.forEach(function(b,k){b.classList.toggle('on',k===i);b.setAttribute('aria-expanded',k===i)});if(vis)vids(i,true)}
    it.forEach(function(b,k){b.addEventListener('click',function(e){if(e.target.closest('a'))return;set(k)});if(hover)b.addEventListener('mouseenter',function(){set(k)})});
    st.addEventListener('mouseenter',function(){hov=true});st.addEventListener('mouseleave',function(){hov=false});
    function tick(t){var dt=last?Math.min(64,t-last):0;last=t;if(vis&&!hov&&!rm){var rl=tr[cur].querySelector('.mz-rl'),half=rl.scrollWidth/2;x-=SPEED*dt/1000;if(-x>=half)x+=half;rl.style.transform='translateX('+x+'px)'}requestAnimationFrame(tick)}
    new IntersectionObserver(function(es){es.forEach(function(e){vis=e.isIntersecting;vids(cur,vis)})},{threshold:.2}).observe(st);
    requestAnimationFrame(tick);
  });
})();