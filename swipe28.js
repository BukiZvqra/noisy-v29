/* v28: модулите (големите карти горе) се влачат с пръст/мишка: картата следва движението и при пускане плавно отива на следващата или се връща.
   21.10 (Коста: „по-смуут“): преди се сменяше чак при пускане и без анимация (kar20.css оставяше само прехода на прозрачността). */
(function(){var root=document.getElementById('mods'),fr=document.getElementById('frame');if(!root||!fr)return;
 var css=document.createElement('style');css.textContent='.k20:not(.is-shrinking) .ag-slide{transition:opacity .5s,transform .55s cubic-bezier(.22,.8,.3,1),translate .55s cubic-bezier(.22,.8,.3,1)!important}.k20 #frame.sw-drag .ag-slide{transition:opacity .5s!important}#frame.sw-drag{cursor:grabbing}.k20:not(.is-shrinking) #frame{cursor:grab}';document.head.appendChild(css);
 function slides(){return [].slice.call(fr.querySelectorAll('.ag-slide'))}
 function cur(){var s=slides();return {i:s.findIndex(function(x){return x.classList.contains('is-current')}),n:s.length}}
 function ready(){return root.classList.contains('nfree')&&!root.classList.contains('is-shrinking')&&window.agGo}
 function cardW(){var c=fr.querySelector('.ag-slide.is-current');return c?c.getBoundingClientRect().width:innerWidth*.6}
 function shift(dx){slides().forEach(function(s){s.style.translate=dx?dx+'px 0':''})}
 var d=null,cool=0;
 root.addEventListener('pointerdown',function(e){if(e.button>0||!ready()||!e.target.closest('#frame'))return;d={x:e.clientX,y:e.clientY,id:e.pointerId,lock:0,dx:0,t:Date.now()}},true);
 addEventListener('pointermove',function(e){if(!d||e.pointerId!==d.id)return;var x=e.clientX-d.x,y=e.clientY-d.y;
  if(!d.lock){if(Math.abs(x)<6&&Math.abs(y)<6)return;d.lock=Math.abs(x)>Math.abs(y)?1:2;if(d.lock===1)fr.classList.add('sw-drag')}
  if(d.lock!==1)return;e.preventDefault();d.dx=x;shift(x)},{passive:false});
 function end(e){if(!d||(e&&e.pointerId!==d.id))return;var o=d;d=null;if(o.lock!==1)return;fr.classList.remove('sw-drag');
  var w=cardW(),v=Math.abs(o.dx)/Math.max(1,Date.now()-o.t),go=Math.abs(o.dx)>w*.22||(v>.45&&Math.abs(o.dx)>30);
  shift(0);if(go){var c=cur();if(c.i>=0)window.agGo((c.i+(o.dx<0?1:-1)+c.n)%c.n)}
  root.addEventListener('click',function k(ev){ev.preventDefault();ev.stopPropagation();root.removeEventListener('click',k,true)},true);setTimeout(function(){},0)}
 root.addEventListener('pointerup',function(e){if(d&&d.lock===1)e.stopPropagation();end(e)},true);
 addEventListener('pointerup',end);addEventListener('pointercancel',function(e){if(d&&d.lock===1){fr.classList.remove('sw-drag');shift(0)}d=null});
 /* тъчпад: хоризонтален скрол мести картата, после тя се закача на най-близката */
 var acc=0,t=0;
 fr.addEventListener('wheel',function(e){if(!ready()||Math.abs(e.deltaX)<=Math.abs(e.deltaY))return;e.preventDefault();if(Date.now()<cool)return;
  acc-=e.deltaX;fr.classList.add('sw-drag');shift(Math.max(-cardW(),Math.min(cardW(),acc)));clearTimeout(t);
  var fin=function(){fr.classList.remove('sw-drag');var a=acc;acc=0;shift(0);if(Math.abs(a)>cardW()*.18){var c=cur();window.agGo((c.i+(a<0?1:-1)+c.n)%c.n);cool=Date.now()+500}};
  if(Math.abs(acc)>cardW()*.5)fin();else t=setTimeout(fin,140)},{passive:false});
 fr.addEventListener('dragstart',function(e){e.preventDefault()});
})();
