/* NOISY v23 */
(function(){
 var RM=matchMedia('(prefers-reduced-motion:reduce)').matches,ext=document.documentElement.classList.contains('nomp4')?'.webm':'.mp4';
 try{var cv=document.createElement('video');if(!cv.canPlayType('video/mp4; codecs="avc1.42E01E"'))ext='.webm'}catch(e){}

 /* ===== 2 · айфон мокъпи ===== */
 [].forEach.call(document.querySelectorAll('.hcard .phone'),function(ph){
  var scr=ph.querySelector('.scr');if(!scr)return;var isl=ph.querySelector('.island');if(isl)isl.remove();
  var d=document.createElement('div');d.className='device device-iphone-14-pro device-black';
  d.innerHTML='<div class="device-frame"><div class="device-screen"></div><i class="glare"></i></div><div class="device-stripe"></div><div class="device-header"></div><div class="device-sensors"></div><div class="device-btns"></div><div class="device-power"></div>';
  d.querySelector('.device-screen').appendChild(scr);ph.appendChild(d);ph.classList.add('dvc');
  function fit(){var w=ph.clientWidth||parseFloat(getComputedStyle(ph).width)||280,iw=Math.max(150,w-16);
   if(w<120)return;ph.style.setProperty('--pw',w+'px');ph.style.setProperty('--ds',(w/433).toFixed(4))}
  fit();if(window.ResizeObserver)new ResizeObserver(fit).observe(ph.parentElement);addEventListener('resize',fit)});

 /* ===== айпад ===== */
 [].forEach.call(document.querySelectorAll('.ipadw'),function(w){
  var host=w.closest('.hcard');function fit(){var card=host.getBoundingClientRect(),mob=innerWidth<1024,maxw=mob?Math.min(card.width-32,520):Math.min(card.width*.5,620),maxh=host.clientHeight*(mob?.52:.78),wd=Math.min(maxw,maxh*560/778);
   w.style.setProperty('--iw2',wd+'px');w.style.setProperty('--ids',(wd/560).toFixed(4))}
  fit();if(window.ResizeObserver)new ResizeObserver(fit).observe(host);addEventListener('resize',fit);
  var rm=[].slice.call(w.querySelectorAll('.rm')),vs=rm.map(function(r){return r.querySelector('video')}),on=1,iv=0;
  function show(){rm.forEach(function(r,k){r.classList.toggle('on',k===on)});vs.forEach(function(v,k){if(k===on){if(!v.src)v.src=v.dataset.vsrc+ext;v.onplaying=function(){v.classList.add('pl')};var p=v.play();if(p&&p.catch)p.catch(function(){})}else{v.pause();v.classList.remove('pl')}})}
  function sync(){var r=host.getBoundingClientRect(),vis=host.classList.contains('vis')&&r.bottom>0&&r.top<innerHeight;if(vis){show();if(!iv)iv=setInterval(function(){if(host.classList.contains('vis')&&!document.hidden){on=(on+1)%rm.length;show()}},2800)}else{clearInterval(iv);iv=0;vs.forEach(function(v){v.pause()})}}
  new MutationObserver(sync).observe(host,{attributes:true,attributeFilter:['class']});addEventListener('scroll',sync,{passive:true});sync()});

 /* ===== 1 · сцена с лек стоп ===== */
 var scene=document.getElementById('hlscene'),hl=document.getElementById('hl'),rail=document.getElementById('hlrail');
 if(scene&&hl&&rail){
  function cl(x){return x<0?0:x>1?1:x}function ease(t){return t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2}
  var topPx=64,stop=0,played=false,cards=[].slice.call(rail.querySelectorAll('.hcard'));
  function size(){if(RM){scene.style.removeProperty('--scn-h');return}
   var hdr=document.getElementById('hdr'),hh=hdr?hdr.getBoundingClientRect().height:64;topPx=Math.round(Math.max(56,hh*.8));
   scene.style.setProperty('--scn-top',topPx+'px');stop=Math.round(innerHeight*.22);
   scene.style.setProperty('--scn-h',(hl.offsetHeight+stop)+'px');scene.classList.add('on')}
  var hIn=false,cIn=false,tm=0;
  function upd(){if(RM){return}
   var r=scene.getBoundingClientRect(),dist=scene.offsetHeight-hl.offsetHeight,p=(topPx-r.top)/Math.max(1,dist);
   var want=r.top<innerHeight*.55&&p<1.02;
   /* заглавието излиза като „Избери как гледаш.“, след 0,5 сек - каруселът (по същия скрол) */
   if(want&&!hIn){hIn=true;scene.classList.add('h-in');clearTimeout(tm);tm=setTimeout(function(){cIn=true;scene.classList.add('c-in');if(window.hlFirstPlay)setTimeout(window.hlFirstPlay,500)},500)}
   if(!want&&hIn&&r.top>innerHeight*.92){hIn=false;cIn=false;clearTimeout(tm);scene.classList.remove('h-in','c-in')}
   var vi=cards.findIndex(function(c){return c.classList.contains('vis')});if(vi<0)vi=0;
   cards.forEach(function(c,i){var d=i-vi;c.style.setProperty('--sd',Math.max(-2,Math.min(2,d)))})}
  size();upd();var tk=0;
  addEventListener('scroll',function(){if(!tk){tk=1;requestAnimationFrame(function(){tk=0;upd()})}},{passive:true});
  addEventListener('resize',function(){size();upd()});addEventListener('load',function(){size();upd()});
  if(window.ResizeObserver)new ResizeObserver(function(){size();upd()}).observe(hl);
 }

 /* ===== хиро: плаващи кадри ===== */
 if(/[?&]hero=fan/.test(location.search))document.documentElement.classList.add('hero-fan');
 var hm_=(location.search.match(/[?&]h=([1-6])/)||[])[1];if(hm_)document.documentElement.classList.add('hv'+hm_);
 if(/[?&]bg=2/.test(location.search))document.documentElement.classList.add('bg2');
 var nhh=document.querySelector('.nhero');
 if(false&&nhh&&!/[?&]hero=fan/.test(location.search)){ /* v27: хиро от v20 (N), без плаващите кадри */
  var PH='img/',L=[ // [файл, x%, y%, ширина (vw-пропорция), дълбочина 0.2..1, ротация, портрет]
   ['levski-goal',3,8,13,.9,-5],['the-last-of-us-poster',17,5,6,.5,4,1],['igri-1',27,11,8,.3,-3],['dune-2-poster',40,4,5,.45,-4,1],['nr-1',56,9,7,.35,3],['euphoria-poster',68,3,6,.8,5,1],['ar-f1-monaco',79,10,9.5,.6,-3],['the-penguin-poster',91,6,6.5,.9,6,1],
   ['the-batman-poster',10,30,5,.3,-5,1],['fermata-1',86,32,8,.45,-4],['white-lotus-poster',94,40,5.5,.85,5,1],
   ['igri-2',2,58,9,.8,-4],['house-of-the-dragon-poster',13,66,6,1,5,1],['ar-eurobasket',20,82,8,.55,-3],
   ['barbie-poster',89,61,5.5,.4,-5,1],['fermata-1',29,15,9,.95,-3],['nn/brazil_norway',50,12,10,.7,3],['euphoria-poster',61,14,5.5,1,4,1],['igri-1',68,24,7,.5,-2],['ar/s-tennis',79,72,10,.9,4],['house-of-the-dragon-back',92,82,7,.5,-3],['euphoria-back',70,86,7,.3,3]];
 var DROP=[2,15,17,18,20,21];L=L.filter(function(_,i){return DROP.indexOf(i)<0}); /* v27: по-малко кадри в хирото (22 → 16), без повторенията */
 if(window.HFI_FILES){L=L.map(function(a,i){return [window.HFI_FILES[i%window.HFI_FILES.length]].concat(a.slice(1,6))})} // по желание на страницата (Arena): свои картинки около заглавието

  var box=document.createElement('div');box.className='hfl';box.setAttribute('aria-hidden','true');
  box.innerHTML=L.map(function(a,i){var d=a[4],w=a[3],por=a[6],blur=d<.4?7:d<.6?5:d<.8?2.4:0,br=d<.4?.45:d<.6?.62:d<.8?.85:1;
   return '<figure class="hfi" data-d="'+d+'" style="--x:'+a[1]+'%;--y:'+a[2]+'%;--w:'+(w*(innerWidth<760?2.1:1.02)*(1.0+d*.35)).toFixed(2)+'vw;--ar:'+(por?'2/3':'16/10')+';--r:'+a[5]+'deg;--b:'+blur+'px;--br:'+br+';--o:'+(d<.4?.8:1)+';--t:'+(7+i%5*1.6)+'s;--db:-'+(i*.7).toFixed(1)+'s;--dl:'+(.15+i*.06).toFixed(2)+'s"><i><img src="'+PH+a[0]+'.jpg" alt="" decoding="async"'+(i>12?' loading="lazy"':'')+'></i></figure>'}).join('');
  var bg=document.createElement('div');bg.className='hbg';bg.setAttribute('aria-hidden','true');bg.innerHTML='<i class="g"></i><i class="n a"></i><i class="n b"></i>';nhh.insertBefore(bg,nhh.firstChild);
  [].forEach.call(box.children,function(f){if(+f.dataset.d>=.7)f.classList.add('big')});
  nhh.insertBefore(box,nhh.firstChild);
  var fls=[].slice.call(box.children),mx=0,my=0,tx=0,ty=0,run=0;
  function fr(){run=0;var np=parseFloat(document.getElementById('mods').style.getPropertyValue('--np'))||0;tx+=(mx-tx)*.07;ty+=(my-ty)*.07;
   fls.forEach(function(f){var d=+f.dataset.d;f.style.transform='translate3d('+(tx*d*-46).toFixed(1)+'px,'+((ty*d*-34)-np*d*innerHeight*.5).toFixed(1)+'px,0)'});
   if(Math.abs(mx-tx)>.002||Math.abs(my-ty)>.002)kick()}
  function kick(){if(!run)run=requestAnimationFrame(fr)}
  addEventListener('pointermove',function(e){if(e.pointerType!=='mouse')return;mx=e.clientX/innerWidth*2-1;my=e.clientY/innerHeight*2-1;kick()},{passive:true});
  addEventListener('scroll',kick,{passive:true});kick();
 }
 /* ===== хиро: височини на текста, за да не се застъпва с рийловете ===== */
 var nh=document.querySelector('.nhero'),nt=nh&&nh.querySelector('.ntext');
 function hm(){if(!nt)return;var hdr=document.getElementById('hdr');nh.style.setProperty('--hdr-h',((hdr?hdr.getBoundingClientRect().height:88))+'px');nh.style.setProperty('--ntext-h',(nt.offsetHeight+Math.max(24,innerHeight*.04))+'px')}
 hm();addEventListener('resize',hm);addEventListener('load',hm);if(document.fonts&&document.fonts.ready)document.fonts.ready.then(hm);
 /* ===== 3 · рийловете ===== */
 var st=document.getElementById('rlxst');
 if(st){var vs=[].slice.call(st.querySelectorAll('video'));
  function load(v){if(!v.src)v.src=v.dataset.src+ext}
  new IntersectionObserver(function(es){es.forEach(function(e){vs.forEach(function(v){if(e.isIntersecting){load(v);var p=v.play();if(p&&p.catch)p.catch(function(){})}else v.pause()})})},{threshold:.2}).observe(st);
  /* среден рийл: леко наклонен към мишката */
  var c0=st.querySelector('.c0'),fine=matchMedia('(hover:hover) and (pointer:fine)').matches;
  if(fine&&!RM)st.addEventListener('pointermove',function(e){var r=st.getBoundingClientRect(),x=(e.clientX-r.left)/r.width*2-1;st.style.setProperty('--tx',x.toFixed(3));[].forEach.call(st.children,function(c,i){})},{passive:true})}
})();
/* „Питай NOISY“ се показва, след като хирото е отминало (в v23 хирото е закачено и IntersectionObserver не помага) */
(function(){var f=document.getElementById('fab');if(!f)return;function u(){f.classList.toggle('on',scrollY>innerHeight*1.1)}addEventListener('scroll',u,{passive:true});addEventListener('resize',u);u();setInterval(u,500)})();
