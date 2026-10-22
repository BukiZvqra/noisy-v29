/* Цени v2: спокоен цикъл без паузи и без изгасване. На всеки 1,7 сек. влиза още един човек (2 → 5),
   „Сподели“ стои, сменя се само втората дума, а „на човек“ се сменя меко. След петима страничните
   меко се прибират и цикълът продължава от двама (7,6 сек. на кръг). Цените са по Pricing Policy. */
(function(){
  var c=document.querySelector('[data-shr]');if(!c)return;
  var rm=matchMedia('(prefers-reduced-motion:reduce)').matches;
  var av=c.querySelector('.shr-av'),S=[].slice.call(av.querySelectorAll('.s')),ph=c.querySelector('[data-ph]'),pt=c.querySelector('[data-pt]');
  var SLOT=[0,1,-1,2,-2],STEP=1700,T=[],on=false;
  var W={2:'мача.',3:'сериала.',4:'вечерта.',5:'сметката.'};
  var PP={2:'12,45 € на човек при двама',3:'8,30 € на човек при трима',4:'6,23 € на човек при четирима',5:'4,98 € на човек при петима'};
  function sp(){return parseFloat(getComputedStyle(av).getPropertyValue('--sp'))||.72}
  function x(i){return SLOT[i]*S[1].offsetWidth*sp()}
  function show(i){var s=S[i],k=SLOT[i],from=k?x(i)-Math.sign(k)*S[1].offsetWidth*.45:0;
    s.classList.remove('out');s.style.transition='none';s.style.opacity='0';s.style.filter='blur(8px)';
    s.style.transform='translateX('+from+'px) scale('+(k?.88:.84)+')';void s.offsetWidth;s.style.transition='';
    s.style.opacity='1';s.style.filter='blur(0)';s.style.transform='translateX('+x(i)+'px) scale(1)'}
  function hide(i){var s=S[i],k=SLOT[i];s.classList.add('out');s.style.opacity='0';s.style.filter='blur(8px)';
    s.style.transform='translateX('+(x(i)-Math.sign(k)*S[1].offsetWidth*.45)+'px) scale(.88)'}
  function word(t){var old=ph.querySelectorAll('.shw:not(.go)');[].forEach.call(old,function(o){o.classList.remove('in');o.classList.add('go');setTimeout(function(){o.remove()},900)});
    var w=document.createElement('span');w.className='shw';w.textContent=t;ph.appendChild(w);requestAnimationFrame(function(){requestAnimationFrame(function(){w.classList.add('in')})})}
  function per(k){pt.classList.add('fd');T.push(setTimeout(function(){pt.textContent=PP[k];pt.classList.remove('fd')},500))}
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
  function finalState(){S.forEach(function(s,i){s.style.transition='none';s.style.opacity='1';s.style.transform='translateX('+x(i)+'px)'});pt.textContent=PP[5]}
  /* превключватели за прегледа: горе A/B/C, долу 1/2/3 */
  var bd=[].slice.call(c.querySelectorAll('.shv [data-d]')),bs=[].slice.call(c.querySelectorAll('.shv [data-s]'));
  function set(d,s,save){if(d)c.setAttribute('data-d',d);if(s)c.setAttribute('data-s',s);
    bd.forEach(function(b){b.setAttribute('aria-pressed',b.getAttribute('data-d')===c.getAttribute('data-d'))});
    bs.forEach(function(b){b.setAttribute('aria-pressed',b.getAttribute('data-s')===c.getAttribute('data-s'))});
    S.forEach(function(s,i){if(s.style.opacity==='1'){s.style.transition='none';s.style.transform='translateX('+x(i)+'px)';void s.offsetWidth;s.style.transition=''}});
    if(save)try{history.replaceState(null,'','#'+c.getAttribute('data-d')+c.getAttribute('data-s'))}catch(e){}}
  bd.forEach(function(b){b.addEventListener('click',function(){set(b.getAttribute('data-d'),null,1)})});
  bs.forEach(function(b){b.addEventListener('click',function(){set(null,b.getAttribute('data-s'),1)})});
  var m=/^#([abc])([123])$/.exec(location.hash);set(m?m[1]:'a',m?m[2]:'1');
  if(rm||!('IntersectionObserver' in window)){finalState();return}
  new IntersectionObserver(function(e){e[0].isIntersecting?start():stop()},{threshold:.3}).observe(av);
  addEventListener('resize',function(){S.forEach(function(s,i){if(s.style.opacity==='1')s.style.transform='translateX('+x(i)+'px)'})});
})();
