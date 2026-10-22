/* v29 варианти, трета партида: графика на цените, сметката, телевизорът, историята при скрол, „Следва“ */
(function(){
  var rm=matchMedia('(prefers-reduced-motion:reduce)').matches,hover=matchMedia('(hover:hover)').matches;
  var eur=function(x){return x.toFixed(2).replace('.',',')+' €'};
  function vid(box,on){var v=box.querySelector('video');if(!v)return;if(on){if(!v.src&&v.dataset.tv)v.src=v.dataset.tv;var p=v.play();if(p&&p.then)p.then(function(){box.classList.add('pl')}).catch(function(){})}else{v.pause();box.classList.remove('pl')}}

  /* ЦЕНИ I: стълбовете растат при влизане в екрана; посочване = подсказка, натискане = избор */
  [].forEach.call(document.querySelectorAll('[data-pi]'),function(c){
    var cols=[].slice.call(c.querySelectorAll('.pi-col')),tip=c.querySelector('.pi-tip'),ch=c.querySelector('.pi-ch'),
        L=c.querySelector('[data-l]'),R=c.querySelector('[data-r]'),Sv=c.querySelector('[data-s]');
    var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){c.classList.add('in');io.disconnect()}})},{threshold:.35});io.observe(c);
    if(rm)c.classList.add('in');
    function lbl(n){return n===1?'Сам в Solo':'Together с '+n+' души'}
    function show(col){var n=+col.dataset.n,v=+col.dataset.v,s=+col.dataset.s;
      tip.querySelector('b').textContent=eur(v)+' на човек';
      tip.querySelector('span').textContent=n===1?'Solo, 1 човек':(n+' души в Together · '+s+'% по-малко от Solo');
      var r=col.getBoundingClientRect(),b=ch.getBoundingClientRect(),bar=col.querySelector('.pi-bar').getBoundingClientRect();
      tip.style.left=(r.left-b.left+r.width/2)+'px';tip.style.top=(bar.top-b.top-34)+'px';tip.classList.add('on')}
    function pick(col){cols.forEach(function(x){x.classList.toggle('on',x===col)});var n=+col.dataset.n,s=+col.dataset.s;
      L.textContent=lbl(n);R.textContent=eur(+col.dataset.v);Sv.textContent=n===1?'един профил, само твой':(s+'% по-малко от Solo');}
    cols.forEach(function(col){
      col.addEventListener('pointerenter',function(){show(col)});col.addEventListener('focus',function(){show(col)});
      col.addEventListener('pointerleave',function(){tip.classList.remove('on')});col.addEventListener('blur',function(){tip.classList.remove('on')});
      col.addEventListener('click',function(){pick(col);if(!hover)show(col)});
    });
  });

  /* ЦЕНИ J: сметката се дели на 2-5 */
  [].forEach.call(document.querySelectorAll('[data-pj]'),function(c){
    var bs=[].slice.call(c.querySelectorAll('.pf-n button')),seg=[].slice.call(c.querySelectorAll('.pj-row:not(.pj-solo) .pj-seg')),
        L=c.querySelector('[data-pj-l]'),R=c.querySelector('[data-pj-r]');
    function set(n){var v=Math.floor(21.16/n*100+1e-6)/100;bs.forEach(function(b){b.classList.toggle('on',+b.dataset.n===n)});
      seg.forEach(function(s,k){s.classList.toggle('off',k>=n);s.querySelector('b').textContent=eur(v)});
      L.textContent=n+' души, по '+eur(v);R.textContent=eur(v)+' на месец'}
    bs.forEach(function(b){b.addEventListener('click',function(){set(+b.dataset.n)})});
  });

  /* МОДУЛИ G: телевизор - канал 101-104, шум при смяна, сам сменя на 7 сек. */
  [].forEach.call(document.querySelectorAll('[data-mg]'),function(g){
    var D=JSON.parse((g.querySelector('[data-mg-d]')||g.parentElement.querySelector('[data-mg-d]')).textContent),bs=[].slice.call(g.querySelectorAll('.mg-ch button')),scr=g.querySelector('.mg-scr'),
        v=scr.querySelector('video'),img=scr.querySelector('img'),cv=scr.querySelector('canvas'),cx=cv.getContext('2d'),osd=scr.querySelector('.mg-osd'),
        cap=scr.querySelector('.mg-cap p'),go=scr.querySelector('.mg-cap a'),cur=0,t=0,hov=false;
    function noise(ms){var end=performance.now()+ms,id=cx.createImageData(160,90);(function f(){var d=id.data;for(var i=0;i<d.length;i+=4){var x=Math.random()*255|0;d[i]=d[i+1]=d[i+2]=x;d[i+3]=255}cx.putImageData(id,0,0);if(performance.now()<end)requestAnimationFrame(f)})()}
    function set(i){if(i===cur&&v.src)return;cur=i;var d=D[i];bs.forEach(function(b,k){b.classList.toggle('on',k===i)});
      if(!rm){scr.classList.add('zap');noise(380)}
      setTimeout(function(){img.src=d.img;v.src=d.v;v.play().catch(function(){});osd.querySelector('kbd').textContent=d.c;var oi=osd.querySelector('img');oi.src='assets/'+d.n+'-w.svg';oi.alt=d.n;cap.textContent=d.p;go.href=d.h;scr.classList.remove('zap')},rm?0:380);arm()}
    function arm(){clearTimeout(t);if(rm||hov)return;t=setTimeout(function(){set((cur+1)%D.length)},7000)}
    bs.forEach(function(b,k){b.addEventListener('click',function(){set(k)})});
    g.addEventListener('mouseenter',function(){hov=true;clearTimeout(t)});g.addEventListener('mouseleave',function(){hov=false;arm()});
    new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){v.play().catch(function(){});arm()}else{clearTimeout(t);v.pause()}})},{threshold:.3}).observe(g);
  });

  /* МОДУЛИ H: история при скрол */
  [].forEach.call(document.querySelectorAll('[data-mh]'),function(g){
    var fs=[].slice.call(g.querySelectorAll('.mh-m figure')),ts=[].slice.call(g.querySelectorAll('.mh-t>div')),ds=[].slice.call(g.querySelectorAll('.mh-dots i'));
    var io=new IntersectionObserver(function(es){es.forEach(function(e){var i=+e.target.dataset.i;if(e.isIntersecting){
      fs.forEach(function(f,k){f.classList.toggle('on',k===i);vid(f,k===i)});ts.forEach(function(x,k){x.classList.toggle('on',k===i)});ds.forEach(function(x,k){x.classList.toggle('on',k===i)})}})},{rootMargin:'-45% 0px -45% 0px'});
    fs.forEach(function(f){io.observe(f)});
  });

  /* КРАЙ G: „Следва“ - брояч 8 сек., после следващият модул от опашката (без автоматично преминаване към друга страница) */
  [].forEach.call(document.querySelectorAll('[data-eg]'),function(g){
    var D=JSON.parse(g.querySelector('[data-eg-d]').textContent),nx=g.querySelector('.eg-next'),qs=[].slice.call(g.querySelectorAll('.eg-q button')),
        n=g.querySelector('[data-eg-n]'),bd=nx.querySelector('.m29-bd'),h=nx.querySelector('h3'),p=nx.querySelector('p'),a=nx.querySelector('[data-eg-go]'),al=nx.querySelector('[data-eg-gl]'),
        im=nx.querySelector(':scope>img'),v=nx.querySelector('video'),cur=0,left=8,t=0,vis=false;
    function set(i){cur=i;var d=D[i];qs.forEach(function(b,k){b.classList.toggle('on',k===i)});im.src=d.img;v.removeAttribute('src');v.dataset.tv=d.v;nx.classList.remove('pl');
      bd.src='assets/'+d.n+'-w.svg';bd.alt=d.n;h.textContent=d.t;p.textContent=d.p;a.href=d.h;al.textContent='Разгледай '+d.n;if(vis)vid(nx,true);restart()}
    function restart(){nx.classList.remove('run');void nx.offsetWidth;left=8;n.textContent=left;if(!rm&&vis)nx.classList.add('run')}
    clearInterval(t);t=setInterval(function(){if(!vis||rm)return;left--;if(left<=0){set((cur+1)%D.length)}else n.textContent=left},1000);
    qs.forEach(function(b,k){b.addEventListener('click',function(){set(k)})});
    g.querySelector('[data-eg-skip]').addEventListener('click',function(){set((cur+1)%D.length)});
    new IntersectionObserver(function(es){es.forEach(function(e){vis=e.isIntersecting;if(vis){vid(nx,true);restart()}else{vid(nx,false);nx.classList.remove('run')}})},{threshold:.4}).observe(g);
  });
})();
