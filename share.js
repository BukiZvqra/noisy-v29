/* Цени: аватарите изскачат един по един (1 → 5) и редът „на човек“ се сменя: 24,90 € ÷ брой. Тръгва при влизане в екрана; натиснати аватари = пак. */
(function(){
  var c=document.querySelector('[data-shr]');if(!c)return;
  var rm=matchMedia('(prefers-reduced-motion:reduce)').matches;
  var av=c.querySelector('.shr-av'),S=[].slice.call(av.querySelectorAll('.s')),out=c.querySelector('[data-pp]'),who=c.querySelector('[data-who]');
  var P=['24,90','12,45','8,30','6,22','4,98'],COL=['#B61DFF','#CE13A8','#FF0000','#C9B6FF','#FFC2D4','#FFD9A8','#B7E3DA'],T=[];
  function txt(k){who.textContent=k===1?'1 човек':k+' души';out.textContent=P[k-1]+' €'}
  function splash(s,k){var r=s.getBoundingClientRect(),a=av.getBoundingClientRect(),cx=r.left-a.left+r.width/2,cy=r.top-a.top+r.height/2;
    for(var i=0;i<10;i++){var p=document.createElement('i');p.className='sp';p.style.left=cx+'px';p.style.top=cy+'px';
      p.style.setProperty('--r',(36*i+Math.random()*14)+'deg');p.style.setProperty('--d',(52+Math.random()*26)+'px');
      p.style.setProperty('--c',COL[(i+k)%COL.length]);p.style.setProperty('--s',(i%3===0?9+Math.random()*6:4+Math.random()*4)+'px');
      av.appendChild(p);void p.offsetWidth;p.classList.add('go');setTimeout(function(x){return function(){x.remove()}}(p),800)}}
  function play(){T.forEach(clearTimeout);T=[];
    if(rm){txt(5);return}
    c.classList.remove('pre');S.forEach(function(s){s.style.transform='scale(0)';s.style.opacity='0'});
    S.forEach(function(s,i){T.push(setTimeout(function(){s.style.transform='';s.style.opacity='';splash(s,i);txt(i+1)},250+i*420))})}
  av.addEventListener('click',play);
  if(rm||!('IntersectionObserver' in window)){c.classList.remove('pre');txt(5);return}
  var io=new IntersectionObserver(function(e){if(e[0].isIntersecting){io.disconnect();play()}},{threshold:.45});io.observe(c);
})();
