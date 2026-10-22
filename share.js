/* Цени: заглавието, човечетата и цената на човек вървят в цикъл 1:1 по таймингите на NYT family header
   (header-desktop.json: 60 fps, 613 кадъра = 10,2 сек.). Човечетата влизат отляво, отзад; цената се сменя с всяко ново. */
(function(){
  var c=document.querySelector('[data-shr]');if(!c)return;
  var rm=matchMedia('(prefers-reduced-motion:reduce)').matches;
  var av=c.querySelector('.shr-av'),S=[].slice.call(av.querySelectorAll('.s')),ph=c.querySelector('[data-ph]'),
      was=c.querySelector('[data-was]'),now=c.querySelector('[data-now]'),nt=c.querySelector('[data-nt]');
  var F=1000/60,T=[],on=false;
  var PH=[['Сподели','мача.'],['Сподели','сериала.'],['Сподели','сметката.']],FIN=['NOISY','за петима.'];
  var PR=[[null,'14,90 €','/мес.','Сам? Solo е 14,90 € на месец.'],
          ['14,90 €','12,45 €','/човек','2 души: 24,90 € общо вместо 29,80 €.'],
          ['14,90 €','8,30 €','/човек','3 души: 24,90 € общо вместо 44,70 €.'],
          ['14,90 €','6,22 €','/човек','4 души: 24,90 € общо вместо 59,60 €.'],
          ['14,90 €','4,98 €','/човек','5 души: 24,90 € общо вместо 74,50 €.']];
  function at(f,fn){T.push(setTimeout(fn,Math.round(f*F)))}
  function d(){return S[0].offsetWidth}
  function place(k,entering){var st=d()*.68,sh=d()*24/90;
    S.forEach(function(s,i){if(i>=k)return;var x=((k-1)/2-i)*st;
      if(i===entering){s.style.transition='none';s.style.opacity='0';
        s.style.transform='translateX('+(x+(i?sh:0))+'px) scale('+(i?1:.8)+')';void s.offsetWidth;s.style.transition=''}
      s.style.opacity='1';s.style.transform='translateX('+x+'px) scale(1)'})}
  function word(t,cls){var w=document.createElement('span');w.className='shw'+(cls?' '+cls:'');w.textContent=t;return w}
  function rise(el){el.classList.remove('in');void el.offsetWidth;el.classList.add('in')}
  function phrase(i){ph.innerHTML='';var a=word(PH[i][0]),b=word(PH[i][1]);ph.appendChild(a);ph.appendChild(document.createTextNode(' '));ph.appendChild(b);
    at(0,function(){rise(a)});at(17,function(){rise(b)})}
  function out(fast){ph.querySelectorAll('.shw').forEach(function(w){w.classList.add(fast?'out':'out2')})}
  function price(k){var p=PR[k-1];var box=c.querySelector('.shr-pr');
    was.textContent=p[0]||'';was.hidden=!p[0];now.innerHTML=p[1]+'<small>'+p[2]+'</small>';nt.textContent=p[3];rise(box);rise(nt)}
  function show(k){place(k,k-1);price(k)}
  function fin(cls){ph.innerHTML='';var a=word(FIN[0],cls),b=word(FIN[1],cls);ph.appendChild(a);ph.appendChild(document.createTextNode(' '));ph.appendChild(b);return [a,b]}
  function finalState(){S.forEach(function(s){s.style.transition='none'});place(5,-1);fin('fin in');price(5)}
  function loop(){T.forEach(clearTimeout);T=[];
    S.forEach(function(s){s.style.transition='none';s.style.opacity='0'});c.classList.remove('fade');ph.innerHTML='';
    at(0,function(){show(1)});
    at(39,function(){show(2)});at(41,function(){phrase(0)});
    at(124,function(){out(true)});at(128,function(){show(3)});at(129,function(){phrase(1)});
    at(213,function(){out(true)});at(218,function(){show(4)});at(219,function(){phrase(2)});
    at(307,function(){out(false);show(5)});
    at(335,function(){fin('fin').forEach(rise)});
    at(600,function(){c.classList.add('fade')});
    at(614,loop)}
  function start(){if(on)return;on=true;loop()}
  function stop(){on=false;T.forEach(clearTimeout);T=[]}
  c.classList.remove('pre');
  if(rm||!('IntersectionObserver' in window)){finalState();return}
  new IntersectionObserver(function(e){e[0].isIntersecting?start():stop()},{threshold:.3}).observe(c);
  addEventListener('resize',function(){if(!on)return;var k=S.filter(function(s){return s.style.opacity==='1'}).length;if(k)place(k,-1)});
})();
