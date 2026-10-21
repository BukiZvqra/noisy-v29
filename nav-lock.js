/* 16.10 (фийдбек): каруселите сменят само по една карта.
   1) Докато преходът тече, ново натискане се игнорира (случайно двойно натискане).
   2) Натиснеш ли карта или точка, която е по-далеч, каруселът мърда само с една позиция към нея (без прескачане).
   Дизайнът не се променя. */
(function(){
 var SEL='.ag-prev,.ag-next,.agd,.ag-slide,.hlarr,#hldots .d,#akctl button,#akdots button,.akd,.ar-nav,.dc-nav,.ar-dn,#pv,#nx,.dots i,.ar-dots2 i';
 var MS=700,last=0;
 function step(list,cur,target){var n=list.length,d=(target-cur+n)%n;if(d===0)return cur;return d<=n/2?(cur+1)%n:(cur-1+n)%n}
 document.addEventListener('click',function(e){
  var t=e.target.closest&&e.target.closest(SEL);if(!t)return;
  if(t.classList.contains('ag-slide')&&t.classList.contains('is-current'))return;
  var now=Date.now();
  if(now-last<MS){e.preventDefault();e.stopImmediatePropagation();return}
  /* Discover (главната и Arena): карта или точка -> една стъпка */
  if((t.classList.contains('ag-slide')||t.classList.contains('agd'))&&window.agGo){
   var sl=[].slice.call(document.querySelectorAll('#mods .ag-slide')),cur=sl.findIndex(function(s){return s.classList.contains('is-current')});
   var tg=t.classList.contains('agd')?+t.dataset.i:sl.indexOf(t);
   if(cur>=0&&tg>=0){var nx=step(sl,cur,tg);if(nx!==tg){e.preventDefault();e.stopImmediatePropagation();last=now;window.agGo(nx);return}}
  }
  last=now;
 },true);
})();
