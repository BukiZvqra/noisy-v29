/* „Четири модула“: на устройства без посочване, докато секцията е на екрана, плочките светват една по една (снимката излиза). */
(function(){
  if(matchMedia('(hover:hover)').matches||matchMedia('(prefers-reduced-motion:reduce)').matches||!('IntersectionObserver' in window))return;
  var cards=[].slice.call(document.querySelectorAll('.mq-c')),sec=document.getElementById('moduli'),i=-1,t=null;
  if(!sec||!cards.length)return;
  function step(){if(i>=0)cards[i].classList.remove('on');i=(i+1)%cards.length;cards[i].classList.add('on')}
  new IntersectionObserver(function(es){
    if(es[0].isIntersecting){if(!t){step();t=setInterval(step,2800)}}
    else{clearInterval(t);t=null;cards.forEach(function(c){c.classList.remove('on')});i=-1}
  },{threshold:.6}).observe(sec);
})();
