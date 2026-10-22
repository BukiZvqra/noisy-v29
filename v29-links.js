/* varianti.html: бутоните за абонамент отварят демо чекаута с избрания план (вместо да презареждат началната) */
(function(){
  function plan(t){return /solo/i.test(t)?'solo':'tog'}
  function addon(t){return /Arena Premium/.test(t)?'sport':/Premium Films/.test(t)?'films':''}
  /* лентата с референциите: отваря секцията на точния вариант */
  document.addEventListener('click',function(e){var g=e.target.closest('[data-go]');if(!g)return;e.preventDefault();var p=g.dataset.go.split(':'),sec=document.getElementById(p[0]);if(!sec)return;
    var b=sec.querySelector('.vtabs button[data-v="'+p[1]+'"]');if(b)b.click();sec.scrollIntoView({behavior:'smooth'})});
  document.addEventListener('click',function(e){
    var a=e.target.closest('a,button');if(!a||!window.noisyCO)return;
    var h=a.getAttribute('href')||'',t=a.textContent||'';
    var isCta=(h==='index.html'||h==='#'||a.hasAttribute('data-su'))&&/Пробвай|Избери|Абонирай|Добави|Започни/.test(t);
    if(!isCta)return;
    e.preventDefault();window.noisyCO(plan(t),a,addon(t));
  },true);
})();
