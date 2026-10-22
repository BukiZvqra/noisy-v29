/* Цени v2: спокоен цикъл без паузи и без изгасване. На всеки 1,7 сек. влиза още един човек (2 → 5),
   „Сподели“ стои, сменя се само втората дума, а „на човек“ се сменя меко. След петима страничните
   меко се прибират и цикълът продължава от двама (7,6 сек. на кръг). Цените са по Pricing Policy. */
(function(){
  var c=document.querySelector('[data-shr]');if(!c)return;
  var rm=matchMedia('(prefers-reduced-motion:reduce)').matches;
  var av=c.querySelector('.shr-av'),S=[].slice.call(av.querySelectorAll('.s')),ph=c.querySelector('[data-ph]'),pt=c.querySelector('[data-pt]');
  var SLOT=[0,1,-1,2,-2],STEP=1700,T=[],on=false;
  var W={2:'мача.',3:'сериала.',4:'вечерта.',5:'сметката.'};
  var PP={2:12.45,3:8.30,4:6.23,5:4.98},pp=c.querySelector('[data-pp]'),cur=12.45,raf=0;
  var eur=function(v){return v.toFixed(2).replace('.',',')+' €'};
  /* цената на човек се отброява меко: 1,3 сек., easeInOutCubic, с лек blur в средата на движението */
  function count(to){var from=cur,t0=performance.now(),d=1300;cur=to;cancelAnimationFrame(raf);
    (function f(t){var q=Math.min(1,(t-t0)/d),e=q<.5?4*q*q*q:1-Math.pow(-2*q+2,3)/2;pp.textContent=eur(from+(to-from)*e);
      pp.style.filter='blur('+(Math.sin(Math.PI*q)*1.2).toFixed(2)+'px)';if(q<1)raf=requestAnimationFrame(f);else pp.style.filter=''})(t0)}
  function sp(){return parseFloat(getComputedStyle(av).getPropertyValue('--sp'))||.72}
  function x(i){return SLOT[i]*S[1].offsetWidth*sp()}
  function show(i){var s=S[i],k=SLOT[i],from=k?x(i)-Math.sign(k)*S[1].offsetWidth*.45:0;
    s.classList.remove('out');s.style.transition='none';s.style.opacity='0';s.style.filter='blur(8px)';
    s.style.transform='translateX('+from+'px) scale('+(k?.88:.84)+')';void s.offsetWidth;s.style.transition='';
    s.style.opacity='1';s.style.filter='blur(0)';s.style.transform='translateX('+x(i)+'px) scale(1)'}
  function hide(i){var s=S[i],k=SLOT[i];s.classList.add('out');s.style.opacity='0';s.style.filter='blur(8px)';
    s.style.transform='translateX('+(x(i)-Math.sign(k)*S[1].offsetWidth*.45)+'px) scale(.88)'}
  function word(t){var old=ph.querySelectorAll('.shw:not(.go)');[].forEach.call(old,function(o){o.classList.remove('in');o.classList.add('go');setTimeout(function(){o.remove()},900)});
    var w=document.createElement('span');w.className='shw';w.textContent=t;ph.appendChild(w);
    /* ширината на думата се анимира, затова фразата остава в средата, а „Сподели“ се плъзга меко */
    ph.style.width=w.getBoundingClientRect().width+'px';
    requestAnimationFrame(function(){requestAnimationFrame(function(){w.classList.add('in')})})}
  function per(k){if(c.getAttribute('data-p')==='s')return;count(PP[k]);pt.classList.add('fd');T.push(setTimeout(function(){pt.textContent='24,90 € за '+k+' души';pt.classList.remove('fd')},450))}
  function at(ms,fn){T.push(setTimeout(fn,ms))}
  function step(k){word(W[k]);per(k)}
  function cycle(first){
    if(first){show(0);at(200,function(){show(1)})}
    step(2);
    at(STEP,function(){show(2);step(3)});
    at(STEP*2,function(){show(3);step(4)});
    at(STEP*3,function(){show(4);step(5)});
    at(STEP*3+2500,function(){hide(4);hide(3);at(120,function(){hide(2)})});
    at(STEP*3+2500+900,function(){cycle(false)})}
  function start(){if(on)return;on=true;S.forEach(function(s){s.style.transition='none';s.style.opacity='0'});ph.innerHTML='';cycle(true)}
  function stop(){on=false;T.forEach(clearTimeout);T=[]}
  function finalState(){S.forEach(function(s,i){s.style.transition='none';s.style.opacity='1';s.style.transform='translateX('+x(i)+'px)'});pt.textContent='24,90 € за 5 души';pp.textContent=eur(4.98)}
  /* превключватели за прегледа: горе A/B/C, долу 1/2/3 */
  var bd=[].slice.call(c.querySelectorAll('.shv [data-d]')),bs=[].slice.call(c.querySelectorAll('.shv [data-s]'));
  function set(d,s,save){if(d)c.setAttribute('data-d',d);if(s)c.setAttribute('data-s',s);
    bd.forEach(function(b){b.setAttribute('aria-pressed',b.getAttribute('data-d')===c.getAttribute('data-d'))});
    bs.forEach(function(b){b.setAttribute('aria-pressed',b.getAttribute('data-s')===c.getAttribute('data-s'))});
    S.forEach(function(s,i){if(s.style.opacity==='1'){s.style.transition='none';s.style.transform='translateX('+x(i)+'px)';void s.offsetWidth;s.style.transition=''}});
    if(save)try{history.replaceState(null,'','#'+c.getAttribute('data-d')+c.getAttribute('data-s')+(c.getAttribute('data-p')==='m'?'m':''))}catch(e){}}
  bd.forEach(function(b){b.addEventListener('click',function(){set(b.getAttribute('data-d'),null,1)})});
  var bp=[].slice.call(c.querySelectorAll('.shv [data-p]'));
  function setP(v){c.setAttribute('data-p',v);bp.forEach(function(b){b.setAttribute('aria-pressed',b.getAttribute('data-p')===v)});
    if(v==='s'){cancelAnimationFrame(raf);pp.style.filter='';pp.textContent=eur(4.98);cur=4.98;pt.textContent='24,90 € на месец за до 5 души'}}
  bp.forEach(function(b){b.addEventListener('click',function(){setP(b.getAttribute('data-p'))})});
  bs.forEach(function(b){b.addEventListener('click',function(){set(null,b.getAttribute('data-s'),1)})});
  /* добавките: балонче с добавяне (сумите в сепаратора се отброяват плавно) или само информация */
  var ba=[].slice.call(c.querySelectorAll('.shv [data-a]')),adds=[].slice.call(c.querySelectorAll('.sha-1 .sha-c')),
      tots=[].slice.call(c.querySelectorAll('[data-tot]')),p5=c.querySelector('[data-pp5]');
  function tween(el,from,to,d){var t0=performance.now();(function f(t){var q=Math.min(1,(t-t0)/d),e=q<.5?4*q*q*q:1-Math.pow(-2*q+2,3)/2;
    el.textContent=eur(from+(to-from)*e);if(q<1)requestAnimationFrame(f)})(t0)}
  function addSum(){return adds.reduce(function(a,b){return a+(b.getAttribute('aria-pressed')==='true'?parseFloat(b.getAttribute('data-add')):0)},0)}
  function totals(){var s=c.getAttribute('data-a')==='1'?addSum():0;
    tots.forEach(function(el){var base=parseFloat(el.getAttribute('data-tot')),from=parseFloat(el.getAttribute('data-cur')||base),to=Math.round((base+s)*100)/100;
      el.setAttribute('data-cur',to);if(Math.abs(from-to)>.001)tween(el,from,to,900)});
    var f5=parseFloat(p5.getAttribute('data-cur')||4.98),t5=Math.round((24.90+s)/5*100)/100;p5.setAttribute('data-cur',t5);if(Math.abs(f5-t5)>.001)tween(p5,f5,t5,900)}
  adds.forEach(function(b){b.addEventListener('click',function(){b.setAttribute('aria-pressed',b.getAttribute('aria-pressed')!=='true');totals()})});
  function setA(v){c.setAttribute('data-a',v);ba.forEach(function(b){b.setAttribute('aria-pressed',b.getAttribute('data-a')===v)});totals()}
  ba.forEach(function(b){b.addEventListener('click',function(){setA(b.getAttribute('data-a'))})});
  setA(c.getAttribute('data-a')||'1');
  var m=/^#([abcd])([1-6])(m?)$/.exec(location.hash);set(m?m[1]:'a',m?m[2]:'1');setP(m&&m[3]?'m':'s');
  if(rm||!('IntersectionObserver' in window)){finalState();return}
  new IntersectionObserver(function(e){e[0].isIntersecting?start():stop()},{threshold:.3}).observe(av);
  addEventListener('resize',function(){S.forEach(function(s,i){if(s.style.opacity==='1')s.style.transform='translateX('+x(i)+'px)'})});
})();
