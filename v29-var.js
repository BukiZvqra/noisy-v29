/* v29 варианти: табове A/B/C (линк с вариант: varianti.html#ceni-b), хармоника, списък с кадър, превключвател на цените, видео в картите */
(function(){
  var hover=matchMedia('(hover:hover)').matches,rm=matchMedia('(prefers-reduced-motion:reduce)').matches;
  function play(box){var v=box.querySelector('video');if(!v)return;if(!v.src)v.src=v.dataset.tv;var p=v.play();if(p&&p.then)p.then(function(){box.classList.add('pl')}).catch(function(){});else box.classList.add('pl')}
  function stop(box){var v=box.querySelector('video');if(!v)return;v.pause();box.classList.remove('pl')}

  /* табове A/B/C */
  function pick(sec,c,push){
    [].forEach.call(sec.querySelectorAll('.vtabs button'),function(b){b.classList.toggle('on',b.dataset.v===c)});
    [].forEach.call(sec.querySelectorAll('.vnote'),function(n){n.hidden=n.dataset.v!==c});
    [].forEach.call(sec.querySelectorAll('.vv'),function(v){v.classList.toggle('on',v.dataset.v===c)});
    if(push)history.replaceState(null,'','#'+sec.id+'-'+c.toLowerCase());
  }
  [].forEach.call(document.querySelectorAll('.vsec'),function(sec){
    sec.querySelector('.vtabs').addEventListener('click',function(e){var b=e.target.closest('button');if(b)pick(sec,b.dataset.v,true)});
  });
  var m=location.hash.match(/^#(\w+)-([abc])$/i);
  if(m){var s=document.getElementById(m[1]);if(s){pick(s,m[2].toUpperCase());setTimeout(function(){s.scrollIntoView()},50)}}

  /* картите A (същото като v29.js) */
  [].forEach.call(document.querySelectorAll('.m29-c'),function(c){
    if(hover){c.addEventListener('mouseenter',function(){play(c)});c.addEventListener('mouseleave',function(){stop(c)})}
  });

  /* B: хармоника - на компютър при посочване, на телефон при докосване (първото докосване отваря, второто води към модула) */
  [].forEach.call(document.querySelectorAll('.mb'),function(g){
    var ps=[].slice.call(g.querySelectorAll('.mb-p'));
    function open(p){ps.forEach(function(x){var on=x===p;x.classList.toggle('on',on);on?play(x):stop(x)})}
    ps.forEach(function(p){
      if(hover)p.addEventListener('mouseenter',function(){open(p)});
      p.addEventListener('focus',function(){open(p)});
      p.addEventListener('click',function(e){if(!p.classList.contains('on')){e.preventDefault();open(p)}});
    });
    if(hover)open(ps[0]);
  });

  /* C: списък + кадър, сменя се сам на 6 сек., спира при посочване */
  [].forEach.call(document.querySelectorAll('.mc'),function(g){
    var it=[].slice.call(g.querySelectorAll('.mc-i')),fg=[].slice.call(g.querySelectorAll('.mc-r figure')),cur=0,t=0,hov=false;
    function go(i){cur=i;it.forEach(function(x,k){x.classList.remove('on');void x.offsetWidth;x.classList.toggle('on',k===i)});fg.forEach(function(f,k){var on=k===i;f.classList.toggle('on',on);on?play(f):stop(f)});arm()}
    function arm(){clearTimeout(t);if(rm||hov)return;t=setTimeout(function(){go((cur+1)%it.length)},6000)}
    it.forEach(function(x,k){x.addEventListener('click',function(e){if(e.target.closest('a'))return;go(k)})});
    g.addEventListener('mouseenter',function(){hov=true;clearTimeout(t);it[cur].style.setProperty('--mc-t','999s')});
    g.addEventListener('mouseleave',function(){hov=false;it[cur].style.removeProperty('--mc-t');go(cur)});
    var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){go(cur)}else{clearTimeout(t)}})},{threshold:.3});io.observe(g);
  });

  /* цени B: превключвател */
  [].forEach.call(document.querySelectorAll('.pb'),function(c){
    var bs=[].slice.call(c.querySelectorAll('.pb-sw button')),vs=[].slice.call(c.querySelectorAll('.pb-v'));
    bs.forEach(function(b,i){b.addEventListener('click',function(){bs.forEach(function(x,k){x.classList.toggle('on',k===i)});vs.forEach(function(v,k){v.classList.toggle('on',k===i)})})});
  });
})();
