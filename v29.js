/* v29 (21.10.2026): видео в картите на модулите и превключвател за прозрачния фон на хирото (?fon=0 = плътният от v27) */
(function(){
  var q=new URLSearchParams(location.search);
  if(q.get('fon')==='0')document.documentElement.classList.add('fon0');
  var f=parseFloat(q.get('fon'));if(f>0&&f<=1)document.documentElement.style.setProperty('--fon29',f);

  /* етикетите (-10%/-15%) вътре в калкулатора на цените: избраният е бял с черен текст и градиентна рамка */
  var host=document.getElementById('pzx');
  if(host&&host.shadowRoot){var st=document.createElement('style');st.textContent='.seg button[aria-checked="true"] .badge{background:linear-gradient(#fff,#fff) padding-box,var(--grad) border-box!important;color:#0E0E0E!important;border:1px solid transparent!important}';host.shadowRoot.appendChild(st)}
  var cards=[].slice.call(document.querySelectorAll('.m29-c'));
  function play(c){var v=c.querySelector('video');if(!v)return;if(!v.src)v.src=v.dataset.tv;var p=v.play();if(p&&p.then)p.then(function(){c.classList.add('pl')}).catch(function(){});else c.classList.add('pl')}
  function stop(c){var v=c.querySelector('video');if(!v)return;v.pause();c.classList.remove('pl')}
  if(matchMedia('(hover:hover)').matches){
    cards.forEach(function(c){c.addEventListener('mouseenter',function(){play(c)});c.addEventListener('mouseleave',function(){stop(c)});c.addEventListener('focus',function(){play(c)});c.addEventListener('blur',function(){stop(c)})});
  }else if('IntersectionObserver' in window&&!matchMedia('(prefers-reduced-motion:reduce)').matches){
    var io=new IntersectionObserver(function(es){es.forEach(function(e){e.isIntersecting?play(e.target):stop(e.target)})},{rootMargin:'-35% 0px -35% 0px'});
    cards.forEach(function(c){io.observe(c)});
  }
})();
