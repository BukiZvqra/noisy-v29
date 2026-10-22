/* v29 финал: модулите (списък + кадър), мини графиката в цените, видео в плочките на модулите */
(function(){
  var rm=matchMedia('(prefers-reduced-motion:reduce)').matches,hover=matchMedia('(hover:hover)').matches;
  function vid(box,on){var v=box.querySelector('video');if(!v)return;if(on){if(!v.src)v.src=v.dataset.tv;var p=v.play();if(p&&p.then)p.then(function(){box.classList.add('pl')}).catch(function(){})}else{v.pause();box.classList.remove('pl')}}

  [].forEach.call(document.querySelectorAll('[data-fm]'),function(g){
    var it=[].slice.call(g.querySelectorAll('.fm-i')),fg=[].slice.call(g.querySelectorAll('.fm-fr figure')),cur=0,t=0,vis=false;
    function go(i){cur=i;it.forEach(function(x,k){x.classList.remove('on');void x.offsetWidth;var on=k===i;x.classList.toggle('on',on);x.setAttribute('aria-expanded',on)});
      fg.forEach(function(f,k){f.classList.toggle('on',k===i);vid(f,k===i&&vis)});arm()}
    function arm(){clearTimeout(t);if(rm||!vis||g.classList.contains('hold'))return;t=setTimeout(function(){go((cur+1)%it.length)},7000)}
    it.forEach(function(x,k){x.addEventListener('click',function(e){if(e.target.closest('a'))return;g.classList.add('hold');go(k)})});
    g.addEventListener('mouseenter',function(){g.classList.add('hold');clearTimeout(t)});
    g.addEventListener('mouseleave',function(){g.classList.remove('hold');go(cur)});
    new IntersectionObserver(function(es){es.forEach(function(e){vis=e.isIntersecting;if(vis)go(cur);else{clearTimeout(t);fg.forEach(function(f){vid(f,false)})}})},{threshold:.35}).observe(g);
  });

  [].forEach.call(document.querySelectorAll('[data-fp]'),function(c){
    if(rm){c.classList.add('in');return}
    var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){c.classList.add('in');io.disconnect()}})},{threshold:.3});io.observe(c);
  });

  [].forEach.call(document.querySelectorAll('.fe-m a'),function(a){
    if(hover){a.addEventListener('mouseenter',function(){vid(a,true)});a.addEventListener('mouseleave',function(){vid(a,false)})}
  });
})();
