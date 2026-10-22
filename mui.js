/* „Четири модула“ с екраните на приложението: телефоните вляво и списъкът вдясно се сменят заедно.
   Натискане вдясно, натискане на страничен телефон, точките, стрелките и плъзгане на телефон. Само сменя, сам не се върти. */
(function(){
  [].forEach.call(document.querySelectorAll('[data-mui]'),function(sec){
    var st=sec.querySelector('.mui-st'),ph=[].slice.call(st.querySelectorAll('.mui-ph')),it=[].slice.call(sec.querySelectorAll('.mui-i')),
        dt=[].slice.call(st.querySelectorAll('.mui-nv button')),n=ph.length,cur=0,vis=false;
    function pos(i){var d=((i-cur)%n+n)%n;return d===0?0:d===1?1:d===n-1?-1:2}
    function play(p){var v=p.querySelector('video');if(!v)return;if(!v.src)v.src=v.dataset.tv;var r=v.play();if(r&&r.then)r.then(function(){p.classList.add('pl')}).catch(function(){})}
    function stop(p){var v=p.querySelector('video');if(!v)return;v.pause();p.classList.remove('pl')}
    function go(i){
      cur=(i+n)%n;
      ph.forEach(function(p,j){var q=pos(j);p.dataset.p=q;p.setAttribute('aria-pressed',q===0);p.tabIndex=q===2?-1:0;if(q===0&&vis)play(p);else stop(p)});
      it.forEach(function(b,j){b.classList.toggle('on',j===cur);b.setAttribute('aria-expanded',j===cur)});
      dt.forEach(function(b,j){b.classList.toggle('on',j===cur)});
    }
    ph.forEach(function(p,j){p.addEventListener('click',function(){if(sw){sw=false;return}if(j!==cur)go(j)})});
    it.forEach(function(b,j){b.addEventListener('click',function(e){if(e.target.closest('a'))return;go(j)})});
    dt.forEach(function(b,j){b.addEventListener('click',function(){go(j)})});
    st.addEventListener('keydown',function(e){if(e.key==='ArrowRight'){go(cur+1);e.preventDefault()}else if(e.key==='ArrowLeft'){go(cur-1);e.preventDefault()}});
    var sx=null,sw=false;
    st.addEventListener('pointerdown',function(e){sx=e.clientX});
    st.addEventListener('pointerup',function(e){if(sx===null)return;var d=e.clientX-sx;sx=null;sw=Math.abs(d)>40;if(sw){go(cur+(d<0?1:-1));setTimeout(function(){sw=false},50)}});
    if('IntersectionObserver' in window)new IntersectionObserver(function(es){vis=es[0].isIntersecting;var p=ph[cur];if(vis)play(p);else stop(p)},{threshold:.3}).observe(st);
    else vis=true;
    go(0);
  });
})();
