/* „Повече от …“: изречението влиза дума по дума, меко (размазване + избледняване), след като е във видимото поле */
(function(){var hs=[].slice.call(document.querySelectorAll('h2')).filter(function(h){return /^Повече от/.test(h.textContent.trim())});
 if(!hs.length)return;var rm=matchMedia('(prefers-reduced-motion:reduce)').matches;
 hs.forEach(function(h){var t=h.textContent.trim().split(/\s+/);h.classList.add('k26w');h.setAttribute('aria-label',t.join(' '));
  h.innerHTML=t.map(function(w,i){return '<span class="w" aria-hidden="true" style="--i:'+i+'">'+w+'</span>'}).join('');
  if(rm){h.classList.add('go');return}
  var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){h.classList.add('go');io.disconnect()}})},{threshold:.6,rootMargin:'0px 0px -10% 0px'});io.observe(h)})})();
