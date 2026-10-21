/* v28: модулите (големите карти горе) се сменят със суайп/влачене настрани и с хоризонтален скрол на тъчпада */
(function(){var root=document.getElementById('mods'),fr=document.getElementById('frame');if(!root||!fr||!window.agGo&&false)return;
 var stick=root.querySelector('.ag-stick');if(!stick)return;
 function cur(){var s=[].slice.call(fr.querySelectorAll('.ag-slide'));return {i:s.findIndex(function(x){return x.classList.contains('is-current')}),n:s.length}}
 function ready(){return root.classList.contains('nfree')&&!root.classList.contains('is-shrinking')&&window.agGo}
 function step(dir){var c=cur();if(c.i<0||!c.n)return;window.agGo((c.i+dir+c.n)%c.n)}
 var d=null,cool=0;
 root.addEventListener('pointerdown',function(e){if(e.button>0||!ready())return;if(!e.target.closest('#frame'))return;d={x:e.clientX,y:e.clientY}},true);
 root.addEventListener('pointerup',function(e){if(!d)return;var x=e.clientX-d.x,y=e.clientY-d.y;d=null;if(Math.abs(x)>45&&Math.abs(x)>Math.abs(y)*1.2){e.stopPropagation();step(x<0?1:-1);root.addEventListener('click',function k(ev){ev.preventDefault();ev.stopPropagation();root.removeEventListener('click',k,true)},true)}},true);
 root.addEventListener('pointercancel',function(){d=null},true);
 var acc=0,t=0;
 fr.addEventListener('wheel',function(e){if(!ready()||Math.abs(e.deltaX)<=Math.abs(e.deltaY))return;e.preventDefault();if(Date.now()<cool)return;acc+=e.deltaX;clearTimeout(t);t=setTimeout(function(){acc=0},200);if(Math.abs(acc)>60){step(acc>0?1:-1);acc=0;cool=Date.now()+650}},{passive:false});
 fr.addEventListener('dragstart',function(e){e.preventDefault()});
})();
