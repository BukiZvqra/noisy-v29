/* „Четири модула“: на телефон (без посочване) плочката в средата на екрана показва снимката. */
(function(){
  if(matchMedia('(hover:hover)').matches||!('IntersectionObserver' in window))return;
  var io=new IntersectionObserver(function(es){es.forEach(function(e){e.target.classList.toggle('on',e.isIntersecting)})},{rootMargin:'-42% 0px -42% 0px'});
  [].forEach.call(document.querySelectorAll('.mq-c'),function(c){io.observe(c)});
})();
