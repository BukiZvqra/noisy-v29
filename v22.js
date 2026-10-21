/* NOISY v22 (Коста, 14.10): картите с модулите като 3D въртележка - съседните са наклонени назад. */
(function(){
 var root=document.getElementById('mods');if(!root)return;
 var sl=[].slice.call(root.querySelectorAll('.ag-slide'));if(!sl.length)return;
 function upd(){var cs=getComputedStyle(root),w=parseFloat(cs.getPropertyValue('--ag-w'))||900,g=parseFloat(cs.getPropertyValue('--ag-gap'))||20;
  sl.forEach(function(s){var x=parseFloat(s.style.getPropertyValue('--ag-x'))||0,d=Math.round(x/(w+g));if(s._d===d)return;s._d=d;
   s.style.setProperty('--ag-d',d);s.style.setProperty('--ag-a',Math.abs(d));s.style.setProperty('--ag-s',d>0?1:d<0?-1:0)})}
 var mo=new MutationObserver(upd);sl.forEach(function(s){mo.observe(s,{attributes:true,attributeFilter:['style']})});upd();

 /* сменя се сама на 4,2 сек (като въртележката от страницата за избор); спира при мишка върху картите или редовете, пауза, преглед, регистрация */
 var hov=false,t0=Date.now(),cur=0;root.addEventListener('agchange',function(e){cur=e.detail;t0=Date.now()});
 var zone=root.querySelector('.ag-stick');zone.addEventListener('mouseenter',function(){hov=true});zone.addEventListener('mouseleave',function(){hov=false;t0=Date.now()});
 setInterval(function(){var r=zone.getBoundingClientRect(),vis=r.bottom>innerHeight*.3&&r.top<innerHeight*.7;
  if(!vis||hov||document.hidden||root.classList.contains('is-shrinking')||root.classList.contains('is-paused')||root.classList.contains('pv-open')||document.querySelector('#su.on,.pvw.on')){t0=Date.now();return}
  if(Date.now()-t0>4200&&window.agGo){t0=Date.now();window.agGo(cur+1)}},250);
})();
/* 15.10: появяване на секциите при скрол (Лиляна: „като apple.com/iphone“) */
(function(){var els=[].slice.call(document.querySelectorAll('.ap'));if(!els.length)return;
 if(!('IntersectionObserver' in window)||matchMedia('(prefers-reduced-motion:reduce)').matches){els.forEach(function(e){e.classList.add('in')});return}
 var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.12,rootMargin:'0px 0px -8% 0px'});
 els.forEach(function(e){io.observe(e)});
 /* връзките към магазините и социалните мрежи: тук се слагат истинските адреси */
 var LINKS={apple:'',google:'',instagram:'',facebook:'',tiktok:'',youtube:''};
 [].forEach.call(document.querySelectorAll('[data-store],[data-social]'),function(a){var k=a.dataset.store||a.dataset.social;if(LINKS[k])a.href=LINKS[k];else{a.removeAttribute('target');a.addEventListener('click',function(e){e.preventDefault()})}});
})();
/* 15.10: появяване на картите в каруселите (един път) */
(function(){if(matchMedia('(prefers-reduced-motion:reduce)').matches)return;
 var root=document.getElementById('mods'),rows=document.getElementById('agRows');
 if(root&&rows){root.classList.add('kpre');var done=false;
  function go(){if(done||!root.classList.contains('nfree')||root.classList.contains('is-shrinking'))return;done=true;
   [].forEach.call(rows.querySelectorAll('.ag-row'),function(r,ri){var ts=[].slice.call(r.querySelectorAll('.ag-tile')).filter(function(t){var b=t.getBoundingClientRect();return b.right>0&&b.left<innerWidth}).sort(function(a,b){return a.getBoundingClientRect().left-b.getBoundingClientRect().left});
    ts.forEach(function(t,i){t.style.setProperty('--kd',(120+ri*110+i*70)+'ms')})});
   var d=document.querySelector('.agdaily');if(d)d.style.setProperty('--kd','700ms');
   [].forEach.call(root.querySelectorAll('.ag-slide:not(.is-current) .ag-surface'),function(x){x.style.setProperty('--kd','80ms')});
   requestAnimationFrame(function(){root.classList.add('kin');root.classList.remove('kpre');
    setTimeout(function(){[].forEach.call(root.querySelectorAll('[style*="--kd"]'),function(x){x.style.removeProperty('--kd')})},2200)})}
  new MutationObserver(go).observe(root,{attributes:true,attributeFilter:['class']});go()}
 /* „Повече от гледане“: съдържанието на всяка нова карта влиза меко - етикет, заглавие с текст, после устройството */
 var rail=document.getElementById('hlrail');
 if(rail&&rail.animate){var seen=false,cards=[].slice.call(rail.querySelectorAll('.hcard'));
  function play(c){if(!c)return;var dev=[].filter.call(c.children,function(x){return !x.matches('.tag,.cap,video,.mask')});
   var els=[c.querySelector('.tag'),c.querySelector('.cap')].filter(Boolean);
   els.forEach(function(e,k){e.animate([{opacity:0,translate:'0 44px',filter:'blur(8px)'},{opacity:1,translate:'0 0',filter:'blur(0)'}],{duration:1000,delay:120+k*160,easing:'cubic-bezier(.2,.8,.2,1)',fill:'backwards'})});
   dev.forEach(function(e){e.animate([{opacity:0,translate:'0 90px',scale:'.92'},{opacity:1,translate:'0 0',scale:'1'}],{duration:1300,delay:380,easing:'cubic-bezier(.2,.8,.2,1)',fill:'backwards'})})}
  function inView(){var r=rail.getBoundingClientRect();return r.top<innerHeight*.85&&r.bottom>innerHeight*.15}
  cards.forEach(function(c){c._v=c.classList.contains('vis');new MutationObserver(function(){var v=c.classList.contains('vis');if(v&&!c._v&&seen&&inView())play(c);c._v=v}).observe(c,{attributes:true,attributeFilter:['class']})});
  window.hlFirstPlay=function(){if(seen)return;seen=true;play(rail.querySelector('.hcard.vis')||cards[0])}}
})();
