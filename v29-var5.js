/* v29 варианти, пета партида: мини графиката (O), сметката като пример (P), тестето карти (K) */
(function(){
  var rm=matchMedia('(prefers-reduced-motion:reduce)').matches;
  var eur=function(x){return (Math.floor(x*100+1e-6)/100).toFixed(2).replace('.',',')+' €'};

  /* O: стълбовете растат при влизане в екрана */
  [].forEach.call(document.querySelectorAll('[data-po]'),function(c){
    if(rm){c.classList.add('in');return}
    var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){c.classList.add('in');io.disconnect()}})},{threshold:.35});io.observe(c);
  });

  /* P: 24,90 € ÷ n души */
  [].forEach.call(document.querySelectorAll('[data-pp]'),function(c){
    var bs=[].slice.call(c.querySelectorAll('.pp-n button')),av=[].slice.call(c.querySelectorAll('[data-pp-a] .ava i')),R=c.querySelector('[data-pp-r]');
    function set(n){bs.forEach(function(b){b.classList.toggle('on',+b.dataset.n===n)});av.forEach(function(a,k){a.style.display=k<n?'':'none'});R.textContent=eur(24.90/n)}
    bs.forEach(function(b){b.addEventListener('click',function(){set(+b.dataset.n)})});
  });

  /* K: тесте карти - влачене настрани или стрелки */
  [].forEach.call(document.querySelectorAll('[data-mk]'),function(g){
    var D=JSON.parse(g.querySelector('[data-mk-d]').textContent),cs=[].slice.call(g.querySelectorAll('.mk-c')),N=cs.length,top=0,
        H=g.querySelector('[data-mk-h]'),P=g.querySelector('[data-mk-p]'),A=g.querySelector('[data-mk-a]'),C=g.querySelector('[data-mk-c]');
    function lay(){cs.forEach(function(c,i){var k=(i-top+N)%N;c.style.setProperty('--k',k);c.style.removeProperty('transform');c.classList.remove('gone');c.style.zIndex=10-k});
      var d=D[top];H.textContent=d.t;P.textContent=d.p;A.href=d.h;A.firstChild.textContent='Разгледай '+d.n;C.textContent=(top+1)+' / '+N+' · плъзни картата настрани'}
    function next(dir){var c=cs[top];if(!rm){c.style.transform='translate('+(dir*120)+'%,-6%) rotate('+(dir*18)+'deg)';c.classList.add('gone')}
      setTimeout(function(){top=(top+1)%N;lay()},rm?0:260)}
    g.querySelector('[data-mk-next]').addEventListener('click',function(){next(1)});
    g.querySelector('[data-mk-prev]').addEventListener('click',function(){top=(top+N-1)%N;lay()});
    var sx=0,dx=0,on=false,moved=false;
    cs.forEach(function(c){
      c.addEventListener('pointerdown',function(e){if(+c.style.getPropertyValue('--k')!==0)return;on=true;moved=false;sx=e.clientX;dx=0;c.classList.add('drag');c.setPointerCapture(e.pointerId)});
      c.addEventListener('pointermove',function(e){if(!on)return;dx=e.clientX-sx;if(Math.abs(dx)>6)moved=true;c.style.transform='translate('+dx+'px,0) rotate('+(dx/20)+'deg)'});
      function end(){if(!on)return;on=false;c.classList.remove('drag');if(Math.abs(dx)>90)next(dx>0?1:-1);else c.style.removeProperty('transform')}
      c.addEventListener('pointerup',end);c.addEventListener('pointercancel',end);
      c.addEventListener('click',function(e){if(moved){e.preventDefault();moved=false}});
    });
    lay();
  });
})();
