/* NOISY · модулите, нови варианти: E Сцена, F Разгъване, G Списък.
   Съдържанието е от секция 1 на v29 (същите заглавия и кадри), без нови. */
(function(){
'use strict';
var RM=matchMedia('(prefers-reduced-motion: reduce)').matches;
var MOB=matchMedia('(max-width: 900px)');
var ARROW='<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4"/></svg>';

var M={
  theatre:{name:'Theatre',badge:'assets/Theatre-w.svg',lead:'Филми и сериали',h:'Филми и сериали.',p:'Хитовите заглавия, с актьорите и всичко около тях.',href:'theatre.html'},
  arena:{name:'Arena',badge:'assets/Arena-w.svg',lead:'Спорт на живо',h:'Спорт на живо.',p:'Футбол, баскетбол, тенис и Формула 1. На живо и на запис.',href:'arena.html'},
  showtime:{name:'Showtime',badge:'assets/Showtime-w.svg',lead:'Реалитата на моменти',h:'Реалитата. На моменти.',p:'Всеки епизод, нарязан на най-силните моменти.',href:'f/f-showtime.html'},
  newsroom:{name:'Newsroom',badge:'assets/Newsroom-w.svg',lead:'Новините за минута',h:'Новините. За една минута.',p:'Важното от деня в кратки клипове, едно след друго.',href:'f/f-newsroom.html'}
};
var ORDER=['theatre','arena','showtime','newsroom'];

/* [кадър, заглавие, горен ред, знак, видео]; знак: p = PREMIUM, l = НА ЖИВО, d = 1 МИН */
var C={
  theatre:[
    ['img/house-of-the-dragon-back.jpg','Домът на дракона','Сериал','p','vid/m2/hotd.mp4'],
    ['img/white-lotus-back.jpg','Белият лотос','Сериал','p','vid/lotus.mp4'],
    ['img/m2/mamnik.jpg','Мамник','Сериал','','vid/m2/mamnik.mp4'],
    ['img/dune-2-back.jpg','Дюн: Част втора','Филм','p',''],
    ['img/the-penguin-back.jpg','Пингвинът','Сериал','p','']
  ],
  arena:[
    ['img/m2/lev.jpg','Кайрат - Левски','Футбол','l','vid/m2/lev.mp4'],
    ['img/m2/wc.jpg','Испания - Аржентина','Футбол','','vid/m2/wc.mp4'],
    ['img/ar-f1-monaco.jpg','Гран при на Монако','Формула 1','',''],
    ['img/ar-eurobasket.jpg','Евробаскет','Баскетбол','','']
  ],
  showtime:[
    ['img/m2/igric.jpg','Капитанска битка','Игри на волята','','vid/igri-c.mp4'],
    ['img/m2/igria.jpg','Номинационна битка','Игри на волята','','vid/igri-a.mp4'],
    ['img/ergenat-1.jpg','Първата среща','Ергенът','',''],
    ['img/fermata-1.jpg','Нов епизод тази вечер','Фермата','',''],
    ['img/m2/igrib.jpg','Битка за спасение','Игри на волята','','vid/igri-b.mp4']
  ],
  newsroom:[
    ['img/m2/news.jpg','Темата на деня','Newsroom','d','vid/newsroom.mp4'],
    ['img/m2/sutrin.jpg','Сутрешните новини','Newsroom','d','vid/m2/sutrin.mp4'],
    ['img/m2/studio.jpg','Новините за 60 секунди','Newsroom','d','vid/m2/studio.mp4'],
    ['img/m2/vecher.jpg','Вечерната емисия','Newsroom','d','vid/m2/vecher.mp4']
  ]
};

function esc(s){return String(s).replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
function chip(t){return t==='p'?'<span class="chip">Premium</span>':t==='l'?'<span class="chip live"><i></i>На живо</span>':t==='d'?'<span class="chip">1 мин</span>':''}
function media(it,eager){
  return '<div class="media"><img src="'+it[0]+'" alt=""'+(eager?'':' loading="lazy"')+'>'+
    (it[4]?'<video muted loop playsinline preload="none" data-src="'+it[4]+'" aria-hidden="true"></video>':'')+'</div>';
}
/* видеото тръгва само когато кадърът е активен и се вижда */
function play(root){
  if(RM||!root)return;
  var v=root.querySelector('video');if(!v)return;
  if(!v.src)v.src=v.dataset.src;
  var p=v.play();if(p&&p.then)p.then(function(){v.classList.add('on')}).catch(function(){});
}
function stop(root){
  if(!root)return;
  root.querySelectorAll('video').forEach(function(v){v.pause();v.classList.remove('on')});
}
function vis(el,cb){
  var io=new IntersectionObserver(function(es){es.forEach(function(e){cb(e.isIntersecting)})},{threshold:.35});
  io.observe(el);
}

/* ================= E · СЦЕНА ================= */
(function(){
  var tabs=document.getElementById('eTabs'),host=document.getElementById('ePanels');
  var cur=0,item={},inView=false,t0=0,raf=0,paused=false,DUR=8000;
  ORDER.forEach(function(k,i){
    var m=M[k];
    tabs.insertAdjacentHTML('beforeend','<button type="button" class="e-tab" role="tab" id="et-'+k+'" aria-controls="ep-'+k+'" aria-selected="'+(i===0)+'" tabindex="'+(i===0?0:-1)+'"><img src="'+m.badge+'" alt="'+m.name+'" width="92" height="24"><span>'+m.lead+'</span><i></i></button>');
    var rail=C[k].map(function(it,j){
      return '<button type="button" class="e-it" aria-pressed="'+(j===0)+'" data-j="'+j+'"><div class="th"><img src="'+it[0]+'" alt="" loading="lazy"></div><b>'+esc(it[1])+'</b></button>';
    }).join('');
    host.insertAdjacentHTML('beforeend','<div class="e-panel" role="tabpanel" id="ep-'+k+'" aria-labelledby="et-'+k+'"'+(i===0?'':' hidden')+'>'+
      '<div class="e-stage" data-k="'+k+'"><div class="e-slot">'+media(C[k][0],i===0)+'</div>'+
      '<div class="e-now">'+(chip(C[k][0][3])||'<span class="chip">Сега</span>')+'<span>'+esc(C[k][0][1])+'</span></div>'+
      '<div class="e-copy"><h3>'+m.h+'</h3><p>'+m.p+'</p><a class="go" href="'+m.href+'">Разгледай '+m.name+ARROW+'</a></div></div>'+
      '<div class="e-rail" role="group" aria-label="Заглавия в '+m.name+'">'+rail+'</div></div>');
    item[k]=0;
  });
  var tabEls=[].slice.call(tabs.children),panels=[].slice.call(host.children);

  function stageOf(i){return panels[i].querySelector('.e-stage')}
  function setItem(i,j){
    var k=ORDER[i],it=C[k][j],st=stageOf(i);item[k]=j;
    stop(st);
    st.querySelector('.e-slot').innerHTML=media(it,true);
    st.querySelector('.e-now').innerHTML=(chip(it[3])||'<span class="chip">Сега</span>')+'<span>'+esc(it[1])+'</span>';
    panels[i].querySelectorAll('.e-it').forEach(function(b,n){b.setAttribute('aria-pressed',String(n===j))});
    if(inView)play(st.querySelector('.e-slot'));
  }
  function setTab(i,focus){
    stop(stageOf(cur));
    tabEls.forEach(function(b,n){var on=n===i;b.setAttribute('aria-selected',String(on));b.tabIndex=on?0:-1;b.style.removeProperty('--p')});
    panels.forEach(function(p,n){p.hidden=n!==i});
    cur=i;t0=performance.now();
    if(focus)tabEls[i].focus();
    if(inView)play(stageOf(i).querySelector('.e-slot'));
  }
  tabEls.forEach(function(b,i){
    b.addEventListener('click',function(){paused=true;setTab(i)});
    b.addEventListener('keydown',function(e){
      var d=e.key==='ArrowRight'?1:e.key==='ArrowLeft'?-1:0;if(!d)return;
      e.preventDefault();paused=true;setTab((cur+d+4)%4,true);
    });
  });
  panels.forEach(function(p,i){
    p.querySelectorAll('.e-it').forEach(function(b){
      b.addEventListener('click',function(){paused=true;setItem(i,+b.dataset.j)});
    });
  });
  /* табовете сменят модула сами, докато човек не посегне */
  function tick(now){
    raf=requestAnimationFrame(tick);
    if(!inView||paused||RM){tabEls[cur].style.setProperty('--p',1);return}
    var p=Math.min(1,(now-t0)/DUR);tabEls[cur].style.setProperty('--p',p.toFixed(3));
    if(p>=1)setTab((cur+1)%4);
  }
  var sec=document.querySelector('.ve');
  sec.addEventListener('pointerenter',function(){if(!MOB.matches)paused=true});
  vis(host,function(on){
    inView=on;
    if(on){t0=performance.now();play(stageOf(cur).querySelector('.e-slot'));if(!raf)raf=requestAnimationFrame(tick)}
    else stop(stageOf(cur));
  });
})();

/* ================= F · РАЗГЪВАНЕ ================= */
(function(){
  var acc=document.getElementById('fAcc'),cur=0,inView=false;
  ORDER.forEach(function(k,i){
    var m=M[k],it=C[k][0];
    var tt=C[k].slice(0,3).map(function(x){return '<li>'+esc(x[1])+'</li>'}).join('');
    acc.insertAdjacentHTML('beforeend','<article class="f-p'+(i===0?' on':'')+'" data-k="'+k+'">'+media(it,i===0)+
      '<button type="button" class="f-hit" aria-expanded="'+(i===0)+'" aria-controls="fb-'+k+'" aria-label="Отвори '+m.name+': '+m.lead+'"></button>'+
      '<div class="f-cap" aria-hidden="true"><img class="bd" src="'+m.badge+'" alt="" width="92" height="24"><span>'+m.lead+'</span></div>'+
      '<div class="f-body" id="fb-'+k+'"><img class="bd" src="'+m.badge+'" alt="'+m.name+'" width="92" height="24"><h3>'+m.h+'</h3><p>'+m.p+'</p><ul class="f-tt" aria-label="Например">'+tt+'</ul><a class="go" href="'+m.href+'">Разгледай '+m.name+ARROW+'</a></div></article>');
  });
  var ps=[].slice.call(acc.children),hov=0;
  function open(i){
    if(i===cur)return;
    stop(ps[cur]);
    ps.forEach(function(p,n){var on=n===i;p.classList.toggle('on',on);p.querySelector('.f-hit').setAttribute('aria-expanded',String(on))});
    cur=i;
    if(inView)setTimeout(function(){play(ps[i])},250);
  }
  ps.forEach(function(p,i){
    p.querySelector('.f-hit').addEventListener('click',function(){open(i)});
    /* на компютър се отваря и при задържане на мишката, с малко забавяне срещу случайни минавания */
    p.addEventListener('pointerenter',function(e){if(e.pointerType!=='mouse')return;clearTimeout(hov);hov=setTimeout(function(){open(i)},160)});
    p.addEventListener('pointerleave',function(){clearTimeout(hov)});
  });
  vis(acc,function(on){inView=on;if(on)play(ps[cur]);else stop(ps[cur])});
})();

/* ================= G · СПИСЪК ================= */
(function(){
  var list=document.getElementById('gList'),right=document.getElementById('gRight'),track=document.getElementById('gTrack');
  var sec=document.querySelector('.vg'),cur=-1,inView=false;
  var cards='',dots='';
  ORDER.forEach(function(k,i){
    var m=M[k];
    list.insertAdjacentHTML('beforeend','<li class="g-it"><button type="button" data-i="'+i+'"><b>'+m.name+'</b><span>'+m.h+'</span></button></li>');
    cards+=media(C[k][0],i===0).replace('class="media"','class="media" data-i="'+i+'"');
    dots+='<i></i>';
  });
  right.innerHTML='<div class="g-card">'+cards+'<div class="g-tag" id="gTag"></div></div>'+
    '<div class="g-meta"><p id="gP"></p><a class="go" id="gGo" href="#">Разгледай'+ARROW+'</a></div><div class="g-dots" aria-hidden="true">'+dots+'</div>';
  var lis=[].slice.call(list.children),ms=[].slice.call(right.querySelectorAll('.media')),ds=[].slice.call(right.querySelectorAll('.g-dots i'));
  function set(i){
    if(i===cur)return;
    if(cur>=0)stop(ms[cur]);
    cur=i;var k=ORDER[i],m=M[k],it=C[k][0];
    lis.forEach(function(l,n){l.classList.toggle('on',n===i)});
    ms.forEach(function(x,n){x.classList.toggle('on',n===i)});
    ds.forEach(function(x,n){x.classList.toggle('on',n===i)});
    document.getElementById('gTag').innerHTML=(chip(it[3])||'<span class="chip">Сега</span>')+'<span>'+esc(it[1])+'</span><em>'+esc(it[2])+'</em>';
    document.getElementById('gP').textContent=m.p;
    var go=document.getElementById('gGo');go.href=m.href;go.firstChild.textContent='Разгледай '+m.name;
    if(inView)play(ms[i]);
  }
  set(0);
  /* скролът в закачената зона избира модула */
  function onScroll(){
    if(sec.hidden||MOB.matches)return;
    var r=track.getBoundingClientRect(),span=r.height-innerHeight;
    var p=Math.min(.999,Math.max(0,-r.top/span));
    set(Math.floor(p*4));
  }
  addEventListener('scroll',onScroll,{passive:true});
  list.addEventListener('click',function(e){
    var b=e.target.closest('button');if(!b)return;
    var i=+b.dataset.i,r=track.getBoundingClientRect(),span=r.height-innerHeight;
    scrollTo({top:scrollY+r.top+span*(i+.5)/4,behavior:RM?'auto':'smooth'});
  });
  vis(right,function(on){inView=on;if(on&&cur>=0)play(ms[cur]);else if(cur>=0)stop(ms[cur])});

  /* телефон: модулите един под друг, без закачане */
  var mob='<div class="g-mob"><div class="w"><div class="sh"><h2>Четири модула. Един план.</h2><p>Всеки модул е отделен свят със собствен ритъм. Влизаш в този, който ти трябва в момента.</p></div>';
  ORDER.forEach(function(k){
    var m=M[k],it=C[k][0];
    mob+='<div class="g-m"><h3>'+m.name+'</h3><div class="lead">'+m.h+'</div><div class="g-card">'+media(it,false)+
      '<div class="g-tag">'+(chip(it[3])||'<span class="chip">Сега</span>')+'<span>'+esc(it[1])+'</span></div></div><p class="d">'+m.p+'</p><a class="go" href="'+m.href+'">Разгледай '+m.name+ARROW+'</a></div>';
  });
  sec.insertAdjacentHTML('beforeend',mob+'</div></div>');
  /* на телефон всеки кадър пуска видеото си, когато влезе в екрана */
  sec.querySelectorAll('.g-mob .g-card').forEach(function(c){vis(c,function(on){if(!MOB.matches||sec.hidden)return;on?play(c):stop(c)})});
})();

/* ================= превключвател ================= */
(function(){
  var bs=[].slice.call(document.querySelectorAll('.vs button')),secs=[].slice.call(document.querySelectorAll('.v'));
  function show(v,push){
    if(!/^[efg]$/.test(v))v='e';
    secs.forEach(function(s){s.hidden=s.dataset.v!==v;if(s.hidden)s.querySelectorAll('video').forEach(function(x){x.pause()})});
    bs.forEach(function(b){b.setAttribute('aria-pressed',String(b.dataset.go===v))});
    if(push)history.replaceState(null,'','#'+v);
    dispatchEvent(new Event('scroll'));
  }
  bs.forEach(function(b){b.addEventListener('click',function(){show(b.dataset.go,true);document.getElementById('moduli').scrollIntoView({behavior:RM?'auto':'smooth'})})});
  show(location.hash.slice(1),false);
})();
})();
