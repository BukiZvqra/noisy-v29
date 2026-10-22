/* Цени Together: анимацията тръгва сама при влизане в екрана: 1 → 5 души, после пак от 1. Натиснато число я спира за 8 сек. */
(function(){
  var root=document.querySelector('[data-tgp]');if(!root)return;
  var rm=matchMedia('(prefers-reduced-motion:reduce)').matches;
  var P=[14.90,12.45,8.30,6.22,4.98],SAV=[0,16,44,58,67],COL=['#B61DFF','#CE13A8','#FF0000','#C9B6FF','#FFC2D4','#FFD9A8','#B7E3DA'];
  var slots=[].slice.call(root.querySelectorAll('.tgp-av .s')),av=root.querySelector('.tgp-av'),big=root.querySelector('[data-big]'),
      unit=root.querySelector('[data-unit]'),pl=root.querySelector('[data-pl]'),who=root.querySelector('[data-who]'),sv=root.querySelector('[data-sv]'),
      bar=root.querySelector('.tgp-bar'),segs=[].slice.call(bar.children),bl=root.querySelector('[data-bl]'),bs=[].slice.call(root.querySelectorAll('.tgp-n button'));
  var n=0,shown=0,t=0,hold=0,vis=false,raf=0;
  var eur=function(x){return x.toFixed(2).replace('.',',')+' €'};
  function count(from,to){cancelAnimationFrame(raf);if(rm){big.textContent=eur(to);return}var t0=performance.now(),d=650;
    (function f(t){var k=Math.min(1,(t-t0)/d),e=1-Math.pow(1-k,3);big.textContent=eur(from+(to-from)*e);if(k<1)raf=requestAnimationFrame(f)})(t0)}
  function splash(s){if(rm)return;var r=s.getBoundingClientRect(),a=av.getBoundingClientRect(),cx=r.left-a.left+r.width/2,cy=r.top-a.top+r.height/2;
    for(var k=0;k<12;k++){var p=document.createElement('i');p.className='sp'+(k%3===0?' l':'');p.style.left=cx+'px';p.style.top=cy+'px';
      p.style.setProperty('--r',(30*k+Math.random()*14)+'deg');p.style.setProperty('--d',(60+Math.random()*30)+'px');p.style.setProperty('--c',COL[(k+shown)%COL.length]);
      p.style.setProperty('--s',(k%3===0?10+Math.random()*8:4+Math.random()*5)+'px');av.appendChild(p);void p.offsetWidth;p.classList.add('go');setTimeout(function(x){return function(){x.remove()}}(p),900)}}
  function set(k){var prev=n?P[n-1]:P[0];n=k;
    slots.forEach(function(s,i){var on=i<k;if(on&&!s.classList.contains('on')){s.classList.remove('off');void s.offsetWidth;s.classList.add('on');splash(s)}else if(!on&&s.classList.contains('on')){s.classList.remove('on');s.classList.add('off')}});
    shown=k;count(prev,P[k-1]);
    unit.textContent=k===1?'на месец':'на човек на месец';
    pl.textContent=k===1?'Solo':'Together';
    who.textContent=k===1?'1 човек':k+' души';
    sv.textContent=k===1?'Добави хора и всеки плаща по-малко':'С '+SAV[k-1]+'% по-малко от Solo';
    bar.classList.toggle('solo',k===1);segs.forEach(function(s,i){s.classList.toggle('x',i>=k)});
    bl.innerHTML=k===1?'<span>Solo</span><b>14,90&nbsp;€ на месец</b>':'<span>Together: 24,90&nbsp;€ на месец, разделени на '+k+'</span><b>по '+eur(P[k-1])+'</b>';
    bs.forEach(function(b){b.classList.toggle('on',+b.dataset.n===k);b.setAttribute('aria-pressed',+b.dataset.n===k)})}
  function loop(){clearTimeout(t);if(!vis||rm)return;var wait=n===5?3600:2000;
    t=setTimeout(function(){if(Date.now()<hold){loop();return}set(n===5?1:n+1);loop()},wait)}
  bs.forEach(function(b){b.addEventListener('click',function(){hold=Date.now()+8000;set(+b.dataset.n);loop()})});
  new IntersectionObserver(function(es){es.forEach(function(e){vis=e.isIntersecting;if(vis){if(!n)set(rm?5:1);loop()}else clearTimeout(t)})},{threshold:.4}).observe(root.querySelector('.tgp-st'));
})();
