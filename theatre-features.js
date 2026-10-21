/* Само #kak в Theatre. Активната карта зарежда и пуска своя чист видео рендер. */
(function(){
 'use strict';
 const section=document.querySelector('#kak.tf-section');if(!section)return;
 const rail=section.querySelector('.tf-rail'),cards=[...rail.querySelectorAll('.tf-card')],dots=[...section.querySelectorAll('.tf-dots button')];
 const previous=section.querySelector('.tf-prev'),next=section.querySelector('.tf-next'),pause=section.querySelector('.tf-pause');
 const reduce=matchMedia('(prefers-reduced-motion: reduce)');let current=0,visible=false,paused=reduce.matches,scrollTimer;
 function fit(){cards.forEach(c=>{c.style.setProperty('--tf-scale',c.clientWidth/1260);const v=c.querySelector('video'),src=innerWidth<=734?v.dataset.mobileSrc:v.dataset.src;v.poster=src.replace('.mp4','.jpg');if(v.getAttribute('src')&&v.getAttribute('src')!==src){v.src=src;media();}});}
 function media(){cards.forEach((c,i)=>{const v=c.querySelector('video');if(i===current&&visible&&!paused&&!document.hidden){if(!v.getAttribute('src'))v.src=innerWidth<=734?v.dataset.mobileSrc:v.dataset.src;const playing=v.play();if(playing)playing.catch(()=>{});}else v.pause();});}
 function controls(){previous.disabled=current===0;next.disabled=current===cards.length-1;dots.forEach((d,i)=>d.setAttribute('aria-current',String(i===current)));pause.setAttribute('aria-pressed',String(paused));pause.setAttribute('aria-label',paused?'Пусни видеото':'Пауза на видеото');pause.innerHTML=paused?'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 5 10 7-10 7Z"/></svg>':'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14M16 5v14"/></svg>';}
 function select(i){if(i===current&&cards[i].classList.contains('on'))return;current=i;cards.forEach((c,k)=>c.classList.toggle('on',k===i));const v=cards[i].querySelector('video');if(v.readyState)v.currentTime=0;controls();media();}
 function go(i){i=Math.max(0,Math.min(cards.length-1,i));rail.scrollTo({left:cards[i].offsetLeft-cards[0].offsetLeft,behavior:reduce.matches?'instant':'smooth'});}
 function nearest(){const step=cards[1].offsetLeft-cards[0].offsetLeft;return Math.max(0,Math.min(cards.length-1,Math.round(rail.scrollLeft/step)));}
 rail.addEventListener('scroll',()=>{clearTimeout(scrollTimer);scrollTimer=setTimeout(()=>select(nearest()),100)},{passive:true});
 rail.addEventListener('keydown',e=>{if(e.key==='ArrowRight'||e.key==='ArrowLeft'){e.preventDefault();go(current+(e.key==='ArrowRight'?1:-1));}if(e.key==='Home'||e.key==='End'){e.preventDefault();go(e.key==='Home'?0:cards.length-1);}});
 previous.addEventListener('click',()=>go(current-1));next.addEventListener('click',()=>go(current+1));dots.forEach((d,i)=>d.addEventListener('click',()=>go(i)));
 pause.addEventListener('click',()=>{paused=!paused;controls();media();});
 cards.forEach((c,i)=>{const v=c.querySelector('video');v.addEventListener('timeupdate',()=>dots[i].style.setProperty('--tf-progress',v.duration?v.currentTime/v.duration:0));v.addEventListener('ended',()=>{if(i!==current||!visible||paused)return;if(current<cards.length-1)go(current+1);else{paused=true;controls();}});});
 new IntersectionObserver(entries=>{visible=entries[0].isIntersecting&&entries[0].intersectionRatio>=.35;if(visible)select(nearest());media();},{threshold:.35}).observe(rail);
 document.addEventListener('visibilitychange',media);reduce.addEventListener('change',e=>{paused=e.matches;controls();media();});new ResizeObserver(fit).observe(rail);fit();controls();
})();
