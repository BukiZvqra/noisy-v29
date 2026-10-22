/* Цени: заглавието и човечетата в картата Together вървят в цикъл по таймингите на NYT family header
   (header-desktop.json: 60 fps, 613 кадъра = 10,2 сек.). Средното човече излиза първо и не мърда,
   другите излизат от него встрани: +1, -1, +2, -2 (от 2 до 5 души). Цената на човек се сменя с броя: 24,90 € / 2..5. */
(function(){
  var c=document.querySelector('[data-shr]');if(!c)return;
  var rm=matchMedia('(prefers-reduced-motion:reduce)').matches;
  var av=c.querySelector('.shr-av'),S=[].slice.call(av.querySelectorAll('.s')),ph=c.querySelector('[data-ph]'),pp=c.querySelector('[data-pp]'),pt=c.querySelector('[data-pt]');
  var PP={2:'12,45',3:'8,30',4:'6,22',5:'4,98'};
  function price(k){pp.textContent=PP[k]+' €';pt.textContent='24,90 € за '+k+' души';rise(pp)}
  var F=1000/60,T=[],on=false,SLOT=[0,1,-1,2,-2];
  var PH=[['Сподели','мача.'],['Сподели','сериала.'],['Сподели','сметката.']],FIN=['NOISY','за петима.'];
  function at(f,fn){T.push(setTimeout(fn,Math.round(f*F)))}
  function x(i){return SLOT[i]*S[1].offsetWidth*.7}
  function enter(i){var s=S[i],k=SLOT[i],from=k?x(i)-Math.sign(k)*S[1].offsetWidth*24/90:0;
    s.style.transition='none';s.style.opacity='0';s.style.transform='translateX('+from+'px) scale('+(k?1:.8)+')';void s.offsetWidth;
    s.style.transition='';s.style.opacity='1';s.style.transform='translateX('+x(i)+'px) scale(1)'}
  function word(t,cls){var w=document.createElement('span');w.className='shw'+(cls?' '+cls:'');w.textContent=t;return w}
  function rise(el){el.classList.remove('in');void el.offsetWidth;el.classList.add('in')}
  function pair(a,b,cls){ph.innerHTML='';var p=word(a,cls),q=word(b,cls);ph.appendChild(p);ph.appendChild(document.createTextNode(' '));ph.appendChild(q);return [p,q]}
  function phrase(i){var w=pair(PH[i][0],PH[i][1]);at(0,function(){rise(w[0])});at(17,function(){rise(w[1])})}
  function out(fast){ph.querySelectorAll('.shw').forEach(function(w){w.classList.add(fast?'out':'out2')})}
  function finalState(){S.forEach(function(s,i){s.style.transition='none';s.style.opacity='1';s.style.transform='translateX('+x(i)+'px)'});pair(FIN[0],FIN[1],'fin in');price(5)}
  function loop(){T.forEach(clearTimeout);T=[];
    S.forEach(function(s){s.style.transition='none';s.style.opacity='0'});c.classList.remove('fade');ph.innerHTML='';
    at(0,function(){enter(0)});at(10,function(){enter(1);price(2)});
    at(41,function(){phrase(0)});
    at(124,function(){out(true)});at(128,function(){enter(2);price(3)});at(129,function(){phrase(1)});
    at(213,function(){out(true)});at(218,function(){enter(3);price(4)});at(219,function(){phrase(2)});
    at(307,function(){out(false);enter(4);price(5)});
    at(335,function(){pair(FIN[0],FIN[1],'fin').forEach(rise)});
    at(600,function(){c.classList.add('fade')});
    at(614,loop)}
  function start(){if(on)return;on=true;loop()}
  function stop(){on=false;T.forEach(clearTimeout);T=[]}
  var tb=[].slice.call(c.querySelectorAll('.shv [data-t]'));
  function pick(v,save){c.setAttribute('data-v',v);tb.forEach(function(b){b.setAttribute('aria-selected',b.getAttribute('data-t')===v)});if(save)try{history.replaceState(null,'','#v'+v)}catch(e){}}
  tb.forEach(function(b){b.addEventListener('click',function(){pick(b.getAttribute('data-t'),1)})});
  pick((/^#v([1-3])$/.exec(location.hash)||[0,'1'])[1]);
  if(rm||!('IntersectionObserver' in window)){finalState();return}
  new IntersectionObserver(function(e){e[0].isIntersecting?start():stop()},{threshold:.3}).observe(av);
  addEventListener('resize',function(){S.forEach(function(s,i){if(s.style.opacity==='1')s.style.transform='translateX('+x(i)+'px)'})});
})();
