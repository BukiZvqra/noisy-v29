(function(){
 var root=document.documentElement,qs=new URLSearchParams(location.search);
 root.setAttribute('data-nfx',qs.get('fx')||'resolve');root.setAttribute('data-amp',qs.get('amp')||'.5');root.setAttribute('data-scope',qs.get('scope')||'headvid');
 function tag(){document.querySelectorAll('.rv,.rvk>*').forEach(function(e){if(e.dataset.sg)return;var t=e.matches('h1,h2,h3,.h2')||!!e.querySelector('h1,h2,.h2');var v=!!e.closest('.vf')||e.classList.contains('vf')||!!e.querySelector('.vf');e.dataset.sg=t?'t':v?'v':'o'})}tag();addEventListener('load',tag);
 var lab=document.getElementById('nlab');if(!lab)return;if(!qs.get('lab'))return;lab.hidden=false;
 var D={resolve:'Сигнал: разцепва се във виолетово и червено (цветовете на NOISY) и щраква на място.',static:'Статика: премигва като загубен сигнал и се изчиства.',slice:'Резен: излиза на хоризонтални ивици.',soft:'Меко: плавно издигане, като във версия 12.'};
 var sb=[].slice.call(lab.querySelectorAll('[data-scope]'));var S={head:'Прилага се само на заглавията (хирото и заглавията на секциите), останалото влиза спокойно.',headvid:'Прилага се на заглавията и на видеото, останалото влиза спокойно.',all:'Прилага се навсякъде: заглавия, видео, карти и бутони.'};var fxb=[].slice.call(lab.querySelectorAll('[data-nfx]')),ab=[].slice.call(lab.querySelectorAll('[data-amp]')),desc=document.getElementById('ndesc');
 function mark(){var f=root.getAttribute('data-nfx'),a=root.getAttribute('data-amp');fxb.forEach(function(b){b.setAttribute('aria-pressed',b.dataset.nfx===f)});sb.forEach(function(b){b.setAttribute('aria-pressed',b.dataset.scope===root.getAttribute('data-scope'))});ab.forEach(function(b){b.setAttribute('aria-pressed',b.dataset.amp===a)});desc.textContent=(D[f]||'')+' '+(S[root.getAttribute('data-scope')]||'');lab.classList.toggle('noamp',f==='soft')}
 function replay(){var els=[].slice.call(document.querySelectorAll('.rv.in,.rvk.in,.rvk.in>*'));
  var soft=root.getAttribute('data-nfx')==='soft',vis=els.filter(function(e){var r=e.getBoundingClientRect();return r.bottom>0&&r.top<innerHeight});
  if(soft){var tops=vis.filter(function(e){return e.classList.contains('rv')||e.classList.contains('rvk')});tops.forEach(function(e){e.style.setProperty('transition','none','important');e.classList.remove('in')});void document.body.offsetWidth;tops.forEach(function(e){e.style.removeProperty('transition')});setTimeout(function(){tops.forEach(function(e){e.classList.add('in')})},60);return}
  vis.forEach(function(e){e.style.animation='none';e.style.opacity='0'});void document.body.offsetWidth;
  requestAnimationFrame(function(){vis.forEach(function(e){e.style.animation='';e.style.opacity=''})})}
 fxb.forEach(function(b){b.addEventListener('click',function(){root.setAttribute('data-nfx',b.dataset.nfx);mark();replay()})});
 sb.forEach(function(b){b.addEventListener('click',function(){root.setAttribute('data-scope',b.dataset.scope);mark();replay()})});
 ab.forEach(function(b){b.addEventListener('click',function(){root.setAttribute('data-amp',b.dataset.amp);mark();replay()})});
 var t=document.getElementById('nlt'),body=document.getElementById('nlb');
 function setOpen(o){body.hidden=!o;t.setAttribute('aria-expanded',o);t.querySelector('i').textContent=o?'−':'+'}
 t.addEventListener('click',function(){setOpen(body.hidden)});setOpen(innerWidth>760);
 var rp=document.getElementById('replay');if(rp)rp.addEventListener('click',function(){window.replayIntro&&window.replayIntro()});
 mark();
})();
