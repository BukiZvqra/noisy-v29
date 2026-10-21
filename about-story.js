/* Manual world selection; the page keeps the common v23 signup/menu/assistant. */
(function(){
 'use strict';
 var tabs=Array.from(document.querySelectorAll('.za-worldtabs [role="tab"]'));
 var panels=Array.from(document.querySelectorAll('.za-panel'));
 var reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
 function selectWorld(name,focus){
  var selected=tabs.find(function(t){return t.dataset.world===name});
  if(!selected)return;
  tabs.forEach(function(tab){var on=tab===selected;tab.setAttribute('aria-selected',String(on));tab.tabIndex=on?0:-1});
  panels.forEach(function(panel){
   var on=panel.id==='world-'+name;panel.hidden=!on;
   panel.classList.remove('za-switched');
   if(on&&!reduce){void panel.offsetWidth;panel.classList.add('za-switched')}
  });
  if(focus){selected.focus();selected.scrollIntoView({block:'nearest',inline:'nearest',behavior:'instant'})}
 }
 tabs.forEach(function(tab,index){
  tab.addEventListener('click',function(){selectWorld(tab.dataset.world,false)});
  tab.addEventListener('keydown',function(event){
   var next=index;
   if(event.key==='ArrowRight')next=(index+1)%tabs.length;
   else if(event.key==='ArrowLeft')next=(index+tabs.length-1)%tabs.length;
   else if(event.key==='Home')next=0;
   else if(event.key==='End')next=tabs.length-1;
   else return;
   event.preventDefault();selectWorld(tabs[next].dataset.world,true);
  });
 });
 document.querySelectorAll('.za-shot[data-world]').forEach(function(link){
  link.addEventListener('click',function(event){
   event.preventDefault();selectWorld(link.dataset.world,false);
   document.getElementById('abMod').scrollIntoView({behavior:reduce?'instant':'smooth',block:'start'});
   history.replaceState(null,'','#world-'+link.dataset.world);
  });
 });
 function syncHash(){if(location.hash.indexOf('#world-')===0)selectWorld(location.hash.slice(7),false)}
 syncHash();addEventListener('hashchange',syncHash);
 var hdr=document.getElementById('hdr'),prog=document.getElementById('prog'),queued=false;
 function update(){
  queued=false;var y=scrollY,max=document.documentElement.scrollHeight-innerHeight;
  prog.style.transform='scaleX('+(max>0?y/max:0)+')';prog.classList.toggle('on',y>60);hdr.classList.toggle('solid',y>20);
 }
 addEventListener('scroll',function(){if(!queued){queued=true;requestAnimationFrame(update)}},{passive:true});
 addEventListener('resize',update);update();
 // Same site shell: no hidden text while waiting for a reveal animation.
 document.querySelectorAll('.ap').forEach(function(e){e.classList.add('in')});
 document.querySelectorAll('[data-store],[data-social]').forEach(function(link){
  link.removeAttribute('target');link.addEventListener('click',function(event){event.preventDefault()});
 });
})();
