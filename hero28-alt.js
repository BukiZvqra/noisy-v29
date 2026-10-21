/* v28 хиро: N се разтваря от мястото си при скрол (мащаб около точка вътре в символа), докато видеото изпълни екрана. */
(function(){var s=document.querySelector('.h28');if(!s)return;var st=s.querySelector('.h28-st'),v=s.querySelector('video'),rm=matchMedia('(prefers-reduced-motion:reduce)').matches,t=0;
 var W=45.9721,H=48,AX=19,AY=38;
 function base(){var vw=innerWidth;if(vw<=760)return {sw:1.5*vw,sx:-.28*vw,sy:-.08*vw};var vh=st.clientHeight||innerHeight,k=Math.min(vw/1440,vh/900);return {sw:1040*k,sx:vw/2+(148-720)*k,sy:-272*k} /* 21.10: мащаб и по височина (артбордът е 1440x900), иначе на нисък екран N излизаше много по-висок от екрана и се виждаха само парчета */}
 function upd(){t=0;var hd=document.querySelector('.hdr');document.documentElement.style.setProperty('--hh',(hd?hd.offsetHeight:0)+'px');var b=base(),r=s.getBoundingClientRect(),run=Math.max(1,s.offsetHeight-innerHeight),p=rm?0:Math.max(0,Math.min(1,-r.top/run));
  var e=p*p*(3-2*p),k=1+Math.pow(e,1.6)*38;
  var sh=b.sw*H/W,ax=b.sx+AX/W*b.sw,ay=b.sy+AY/H*sh;
  st.style.setProperty('--sw',(b.sw*k).toFixed(1)+'px');st.style.setProperty('--sx',(ax-(ax-b.sx)*k).toFixed(1)+'px');st.style.setProperty('--sy',(ay-(ay-b.sy)*k).toFixed(1)+'px');st.style.setProperty('--p',p.toFixed(3));var o=rm?1:Math.max(0,Math.min(1,(1-p)/.12));st.style.setProperty('--o',o.toFixed(3));s.classList.toggle('gone',o<.05);handoff(p)}
 addEventListener('scroll',function(){if(!t){t=1;requestAnimationFrame(upd)}},{passive:true});addEventListener('resize',upd);upd();
 /* преливане: когато N е напълно разтворен, видеото на първата карта (същото видео) продължава от същия кадър, без скок */
 var ag=document.getElementById('agvid'),done=false;
 function handoff(p){if(!ag)return;if(p>.8&&!done){done=true;try{ag.currentTime=v.currentTime%(ag.duration||9e9)}catch(e){}var q=ag.play();if(q&&q.catch)q.catch(function(){})}if(p<.6)done=false}
 function pl(){var q=v.play();if(q&&q.catch)q.catch(function(){})}
 if('IntersectionObserver' in window)new IntersectionObserver(function(es){if(es[0].isIntersecting)pl();else v.pause()},{threshold:0}).observe(s);pl();
})();
