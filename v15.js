/* N е екранът: едно-единствено видео. N расте, докато видеото изпълни екрана, после се свива в картата на галерията. */
(function(){var root=document.getElementById('mods'),stick=root&&root.querySelector('.ag-stick'),scene=root&&root.querySelector('.ag-scene'),vid=document.getElementById('agvid');if(!root||!vid)return;
 var rm=matchMedia('(prefers-reduced-motion:reduce)').matches,ticking=0,free=false;
 var ASP=1.0452,D={w:.4497,h:.2814,fx:.5013,fy:.6394},P={w:.289,h:.623,fx:.4209,fy:.6827};
 function ease(t){return t<.5?2*t*t:1-Math.pow(-2*t+2,2)/2}
 function lerp(a,b,t){return a+(b-a)*t}
 function upd(){ticking=0;
  var vw=innerWidth,vh=innerHeight,mob=vw<761,nlen=Math.round(vh*1.15);
  if(rm){root.classList.add('nfree');root.style.setProperty('--np','1');return}
  var r=scene.getBoundingClientRect(),np=Math.max(0,Math.min(1,-r.top/nlen)),e=ease(Math.min(1,np/.9));
  var nb=mob?Math.max(200,Math.min(vw*.88,440,(vh-410)*.958)):Math.max(240,Math.min(vw*.78,560,(vh-500)*.958));
  var y0=mob?(vh-360)/2+48:(vh-330)/2+70,k=(vw/vh<.9)?P:D;
  /* v21 (Коста, 14.10): на лаптоп и по-голям екран N е по-голямо - заема цялото място между менюто и заглавието; телефонът е без промяна */
  if(vw>=1024){var nt=root.querySelector('.ntext'),hd=document.getElementById('hdr'),top=Math.max(80,hd?hd.getBoundingClientRect().height:88)+12,bot=(nt?nt.offsetTop:vh*.64)-28,av=Math.max(220,bot-top);
   nb=Math.max(240,Math.min(vw*.5,720,av/ASP));y0=top+av/2}
  root.style.setProperty('--ny',y0.toFixed(1)+'px');root.style.setProperty('--nb',nb.toFixed(1)+'px');
  var need=Math.max(vw/k.w,vh/(k.h*ASP))*1.3,ms=nb*Math.pow(need/nb,e);
  var X=lerp(vw/2,vw/2,e),Y=lerp(y0,vh/2,e),fx=lerp(.5,k.fx,e),fy=lerp(.5,k.fy,e);
  root.style.setProperty('--nms',ms.toFixed(1)+'px');root.style.setProperty('--nml',(X-fx*ms).toFixed(1)+'px');root.style.setProperty('--nmt',(Y-fy*ms*ASP).toFixed(1)+'px');
  root.style.setProperty('--np',np.toFixed(4));
  var f=np>=.93;if(f!==free){free=f;root.classList.toggle('nfree',f)}}
 addEventListener('scroll',function(){if(!ticking){ticking=1;requestAnimationFrame(upd)}},{passive:true});addEventListener('resize',upd);upd();
 function sync(){var r=root.getBoundingClientRect(),near=r.top<innerHeight*1.2&&r.bottom>0,p=parseFloat(getComputedStyle(root).getPropertyValue('--ag-p'))||0;
  if(near&&p<1){if(vid.paused&&!document.hidden){var pr=vid.play();if(pr&&pr.catch)pr.catch(function(){})}}else if(!vid.paused&&(!near||p>=1)){vid.pause()}}
 addEventListener('scroll',sync,{passive:true});document.addEventListener('visibilitychange',sync);setInterval(sync,400);sync();
})();
(function(){var ctl=document.querySelector('.hlctl'),dots=document.getElementById('hldots');if(!ctl||!dots)return;
 var pill=ctl.querySelector('.pill'),prev=document.createElement('button'),next=document.createElement('button');
 prev.type=next.type='button';prev.className=next.className='hlarr';prev.textContent='‹';next.textContent='›';prev.setAttribute('aria-label','Предишна карта');next.setAttribute('aria-label','Следваща карта');
 ctl.insertBefore(prev,pill);pill.after(next);
 function idx(){var ds=[].slice.call(dots.querySelectorAll('.d'));for(var i=0;i<ds.length;i++)if(ds[i].classList.contains('on'))return i;return 0}
 function go(k){var ds=dots.querySelectorAll('.d');if(ds[k])ds[k].click()}
 function sync(){var i=idx(),n=dots.querySelectorAll('.d').length;prev.disabled=i<=0;next.disabled=i>=n-1}
 prev.addEventListener('click',function(){go(idx()-1)});next.addEventListener('click',function(){go(idx()+1)});
 new MutationObserver(sync).observe(dots,{subtree:true,attributes:true,attributeFilter:['class']});sync()})();

(function(){var f=document.querySelector('.faqf');if(!f)return;var ds=[].slice.call(document.querySelectorAll('.faq2 details'));
 f.addEventListener('click',function(e){var b=e.target.closest('button');if(!b)return;[].forEach.call(f.children,function(x){x.setAttribute('aria-selected',x===b)});var c=b.dataset.c;ds.forEach(function(d){var show=c==='all'||d.dataset.c===c;d.hidden=!show;if(!show)d.open=false})});
 /* едновременно е отворен само един отговор */
 ds.forEach(function(d){d.addEventListener('toggle',function(){if(d.open)ds.forEach(function(o){if(o!==d)o.open=false})})})})();
