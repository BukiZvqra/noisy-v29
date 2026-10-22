/* NOISY · модулите в една секция: 4 варианта (A рафтове, B колони, C формати, D един ден).
   Съдържанието е същото като в секция 1 на v29 (k26 / ag-data), без нови заглавия. */
(function(){
'use strict';
var RM=matchMedia('(prefers-reduced-motion: reduce)').matches;
var HOVER=matchMedia('(hover: hover)').matches;
var ARROW='<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4"/></svg>';

var M={
  theatre:{name:'Theatre',badge:'assets/Theatre-w.svg',h:'Филми и сериали.',p:'Хитовите заглавия, с актьорите и всичко около тях.',href:'theatre.html',bg:'vid/m/theatre-sm.mp4',poster:'vid/m/theatre.jpg',ui:'vid/feat/theatre-continue.mp4',uiP:'vid/feat/theatre-continue.jpg',
    feats:['Филми','Сериали','Актьори и създатели','Продължи да гледаш']},
  arena:{name:'Arena',badge:'assets/Arena-w.svg',h:'Спорт на живо.',p:'Футбол, баскетбол, тенис и Формула 1. На живо и на запис.',href:'arena.html',bg:'vid/m/arena-mix-sm.mp4',poster:'vid/m/arena-mix.jpg',ui:'vid/feat/arena-match.mp4',uiP:'vid/feat/arena-match.jpg',
    feats:['На живо','Състави','Статистика','Акценти']},
  showtime:{name:'Showtime',badge:'assets/Showtime-w.svg',h:'Реалитата. На моменти.',p:'Всеки епизод, нарязан на най-силните моменти.',href:'f/f-showtime.html',bg:'vid/m/showtime-sm.mp4',poster:'vid/m/showtime.jpg',ui:'vid/feat/showtime-lastnight.mp4',uiP:'vid/feat/showtime-lastnight.jpg',
    feats:['Моментите от снощи','Сподели клип']},
  newsroom:{name:'Newsroom',badge:'assets/Newsroom-w.svg',h:'Новините. За една минута.',p:'Важното от деня в кратки клипове, едно след друго.',href:'f/f-newsroom.html',bg:'vid/m/newsroom-sm.mp4',poster:'vid/m/newsroom.jpg',ui:'vid/feat/newsroom-60.mp4',uiP:'vid/feat/newsroom-60.jpg',
    feats:['За 60 секунди','Сутрин и вечер']}
};
var ORDER=['theatre','arena','showtime','newsroom'];

/* [картина, заглавие, горен ред, знак, видео] ; знак: p = PREMIUM, l = НА ЖИВО, d = 1 мин */
var C={
  theatre:[
    ['img/house-of-the-dragon-poster.jpg','Домът на дракона','',  'p','vid/s/hotd.mp4'],
    ['img/th/mamnik-poster.jpg','Мамник','','','vid/s/mamnik.mp4'],
    ['img/dune-2-poster.jpg','Дюн: Част втора','','p','vid/s/dune.mp4'],
    ['img/the-penguin-poster.jpg','Пингвинът','','p','vid/s/penguin.mp4'],
    ['img/the-last-of-us-poster.jpg','The Last of Us','','p','vid/s/tlou.mp4'],
    ['img/th/genesis-poster.jpg','Генезис','','','vid/s/genesis.mp4'],
    ['img/white-lotus-poster.jpg','Белият лотос','','p','vid/s/lotus.mp4'],
    ['img/the-batman-poster.jpg','Батман','','p','vid/s/batman.mp4'],
    ['img/euphoria-poster.jpg','Еуфория','','p','vid/s/euphoria.mp4'],
    ['img/barbie-poster.jpg','Барби','','p','vid/s/barbie.mp4']
  ],
  arena:[
    ['img/levski-kairat.jpg','Кайрат - Левски','Футбол','l','vid/s/lev-goal.mp4'],
    ['img/ar/s-f1-monaco.jpg','Гран при на Монако','Формула 1','',''],
    ['vid/mu-city.jpg','Ман Юнайтед - Ман Сити','Висша лига','p','vid/s/mu-city.mp4'],
    ['img/ar/s-eurobasket.jpg','Евробаскет','Баскетбол','',''],
    ['vid/c/wc-final.jpg','Испания - Аржентина: финалът','Футбол','','vid/c/wc-final.mp4'],
    ['img/ar/s-tennis.jpg','АТР Финали','Тенис','',''],
    ['vid/esp-fra.jpg','Испания - Франция','Футбол','','vid/s/esp-fra.mp4'],
    ['img/ar/s-f1-onboard.jpg','От болида','Формула 1','',''],
    ['vid/sa-mex.jpg','ЮАР - Мексико','Футбол','','vid/s/sa-mex.mp4']
  ],
  showtime:[
    ['img/igri-1.jpg','Номинационна битка','Игри на волята','','vid/s/igri-a.mp4'],
    ['vid/c/fm-horo.jpg','Хорото','Фермата','','vid/c/fm-horo.mp4'],
    ['img/ergenat-1.jpg','Първата среща','Ергенът','','vid/s/ergenat.mp4'],
    ['img/igri-3.jpg','Капитанска битка','Игри на волята','','vid/s/igri-c.mp4'],
    ['vid/c/fm-roza.jpg','Розата','Фермата','','vid/c/fm-roza.mp4'],
    ['img/igri-2.jpg','Битка за спасение','Игри на волята','','vid/s/igri-b.mp4'],
    ['vid/c/fm-sedyanka.jpg','Седянката','Фермата','','vid/c/fm-sedyanka.mp4'],
    ['img/fermata-1.jpg','Нов епизод тази вечер','Фермата','','vid/s/fermata.mp4']
  ],
  newsroom:[
    ['vid/newsroom.jpg','Темата на деня','','d','vid/s/newsroom.mp4'],
    ['vid/c/nr-sutrin.jpg','Сутрешните новини','','d','vid/c/nr-sutrin.mp4'],
    ['vid/c/nr-studio.jpg','Новините за 60 секунди','','d','vid/c/nr-studio.mp4'],
    ['vid/c/nr-vecher.jpg','Вечерната емисия','','d','vid/c/nr-vecher.mp4'],
    ['vid/studio.jpg','Студиото на живо','','',  'vid/s/studio.mp4'],
    ['vid/c/nr-zad.jpg','Зад кадър в редакцията','','d','vid/c/nr-zad.mp4']
  ]
};
var SHORT={theatre:'Филми и сериали',arena:'Спорт',showtime:'Реалити',newsroom:'Новини'};
/* първата плочка на всеки ред: най-гледаното, по-голяма и с видео */
var FEAT={
  theatre:['img/house-of-the-dragon-back.jpg','Домът на дракона','Най-гледано днес','p','vid/s/hotd.mp4'],
  arena:['img/levski-kairat.jpg','Кайрат - Левски','Футбол','l','vid/s/lev-goal.mp4'],
  showtime:['vid/igri-b.jpg','Игри на волята: новият сезон','Най-гледано днес','','vid/s/igri-b.mp4'],
  newsroom:['vid/newsroom.jpg','Темата на деня','Най-гледано днес','d','vid/s/newsroom.mp4']
};
var SHAPE={theatre:'po',arena:'wd',showtime:'vt',newsroom:'wd'};

function esc(s){return String(s).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
function badge(k,cls){return '<img class="bd'+(cls?' '+cls:'')+'" src="'+M[k].badge+'" alt="'+M[k].name+'" width="92" height="24">'}
function go(k,txt){return '<a class="go" href="'+M[k].href+'">'+(txt||('Разгледай '+M[k].name))+ARROW+'</a>'}
function mark(f){
  if(f==='p')return '<span class="chip">Premium</span>';
  if(f==='l')return '<span class="chip live"><i></i>На живо</span>';
  return '';
}

/* ---------- A · РАФТОВЕ ---------- */
function tile(k,it,dup){
  var sh=SHAPE[k];
  return '<a class="t t-'+sh+(k==='newsroom'?' t-nw':'')+'" href="'+M[k].href+'"'+(it[4]?' data-v="'+it[4]+'"':'')+(dup?' tabindex="-1" aria-hidden="true"':'')+'>'+
    '<img src="'+it[0]+'" alt="" loading="lazy">'+mark(it[3])+(it[3]==='d'?'<span class="dur">1 мин</span>':'')+
    '<span class="cap">'+(it[2]?'<small>'+esc(it[2])+'</small>':'')+esc(it[1])+'</span></a>';
}
function ftile(k,dup){
  var it=FEAT[k];
  return '<a class="t t-ft t-ft-'+SHAPE[k]+'" href="'+M[k].href+'"'+(dup?' tabindex="-1" aria-hidden="true"':'')+'>'+
    '<img src="'+it[0]+'" alt="" loading="lazy"><video muted loop playsinline preload="none" data-src="'+it[4]+'" aria-hidden="true"></video>'+mark(it[3])+(it[3]==='d'?'<span class="dur">1 мин</span>':'')+
    '<span class="cap"><small>'+esc(it[2])+'</small>'+esc(it[1])+'</span></a>';
}
function buildA(){
  var h='';
  ORDER.forEach(function(k){
    var list=C[k].filter(function(it){return it[4]!==FEAT[k][4]});
    var items=ftile(k)+list.map(function(it){return tile(k,it)}).join('')+ftile(k,1)+list.map(function(it){return tile(k,it,1)}).join('');
    h+='<div class="a-row" data-k="'+k+'"><div class="a-lab">'+badge(k)+'<h3>'+M[k].h+'</h3><p>'+M[k].p+'</p>'+go(k)+'</div>'+
       '<div class="a-rail" tabindex="0" aria-label="'+M[k].name+': заглавия"><div class="a-trk">'+items+'</div></div></div>';
  });
  document.getElementById('aRows').innerHTML=h;
  var speeds={theatre:16,arena:22,showtime:18,newsroom:24};
  [].forEach.call(document.querySelectorAll('.a-rail'),function(r){
    var k=r.parentNode.getAttribute('data-k'),hold=performance.now()+2500,acc=0;
    function stop(){hold=Infinity}
    function later(){hold=performance.now()+3500}
    r.addEventListener('pointerenter',stop);r.addEventListener('pointerleave',later);
    r.addEventListener('touchstart',stop,{passive:true});r.addEventListener('touchend',later);
    r.addEventListener('focusin',stop);r.addEventListener('focusout',later);
    r._tick=function(dt,now){
      if(RM||now<hold)return;
      var half=r.scrollWidth/2;
      acc+=speeds[k]*dt;
      if(acc>=1){var n=Math.floor(acc);acc-=n;r.scrollLeft+=n}
      if(r.scrollLeft>=half)r.scrollLeft-=half;
    };
  });
  previews(document.querySelector('.va'));
}
function previews(root){
  if(!HOVER)return;
  root.addEventListener('pointerover',function(e){
    var t=e.target.closest('[data-v]');if(!t||t._v)return;
    var v=document.createElement('video');v.muted=true;v.loop=true;v.playsInline=true;v.src=t.getAttribute('data-v');
    t.insertBefore(v,t.firstChild.nextSibling);t._v=v;
    v.play().then(function(){t.classList.add('pl')}).catch(function(){});
    t.addEventListener('pointerleave',function out(){t.removeEventListener('pointerleave',out);t.classList.remove('pl');v.pause();setTimeout(function(){v.remove();t._v=null},300)});
  });
}

/* ---------- B · КОЛОНИ ---------- */
function buildB(){
  var h='';
  var dur={theatre:'46s',arena:'38s',showtime:'42s',newsroom:'34s'};
  var bs={theatre:'po',arena:'wd',showtime:'vt',newsroom:'wd'};
  var mw={theatre:'180px',arena:'200px',showtime:'180px',newsroom:'200px'};
  ORDER.forEach(function(k,i){
    var one=C[k].slice(0,C[k].length-C[k].length%2).map(function(it){return '<div class="b-t b-'+bs[k]+'"><img src="'+it[0]+'" alt="" loading="lazy"><span>'+esc(it[1])+'</span></div>'}).join('');
    h+='<div class="b-col'+(i===0?' on':'')+'" data-k="'+k+'" role="button" tabindex="0" aria-pressed="'+(i===0)+'" aria-label="'+M[k].name+': '+M[k].h+'">'+
      '<div class="b-hd">'+badge(k)+'<h3><span class="b-full">'+M[k].h+'</span><span class="b-short">'+SHORT[k]+'</span></h3><p>'+M[k].p+'</p>'+go(k)+'</div>'+
      '<div class="b-vp"><div class="b-trk" style="--d:'+dur[k]+';--mw:'+mw[k]+'">'+one+one+'</div></div>'+
      '<div class="b-rot" aria-hidden="true"><span>'+M[k].name+'</span></div></div>';
  });
  var wall=document.getElementById('bWall');wall.innerHTML=h;
  var cols=[].slice.call(wall.children),cur=0,touched=false;
  function set(i){cur=i;cols.forEach(function(c,j){c.classList.toggle('on',j===i);c.setAttribute('aria-pressed',j===i)})}
  cols.forEach(function(c,i){
    c.addEventListener('click',function(e){if(cur!==i){e.preventDefault();touched=true;set(i)}});
    c.addEventListener('keydown',function(e){if((e.key==='Enter'||e.key===' ')&&e.target===c){e.preventDefault();touched=true;set(i)}});
    if(HOVER)c.addEventListener('pointerenter',function(){touched=true;set(i)});
  });
  B.next=function(){if(!touched&&!RM)set((cur+1)%4)};
}
var B={next:function(){}};

/* ---------- C · ФОРМАТИ ---------- */
function buildC(){
  var t=M.theatre,a=M.arena,s=M.showtime,n=M.newsroom;
  function tx(k,ul){return '<div class="c-tx">'+badge(k)+'<h3>'+M[k].h+'</h3><p>'+M[k].p+'</p>'+(ul?'<ul>'+M[k].feats.map(function(f){return '<li>'+f+'</li>'}).join('')+'</ul>':'')+'</div>'}
  var h=''+
  '<div class="c-gl l">Гледаш дълго</div><div class="c-gl s">Гледаш на моменти</div>'+
  '<a class="c-t c-wide c-th" href="'+t.href+'"><video class="c-bg" muted loop playsinline preload="none" poster="'+t.poster+'" data-src="'+t.bg+'" aria-hidden="true"></video>'+tx('theatre')+
    '<div class="c-ov" aria-hidden="true"><img src="img/house-of-the-dragon-back.jpg" alt=""><div><small>Продължи да гледаш</small><b>Домът на дракона</b><em>Сезон 3 · Епизод 4</em></div><div class="c-bar"><i></i></div></div>'+
    '<span class="go">Разгледай'+ARROW+'</span></a>'+
  '<a class="c-t c-wide c-ar" href="'+a.href+'"><video class="c-bg" muted loop playsinline preload="none" poster="'+a.poster+'" data-src="'+a.bg+'" aria-hidden="true"></video>'+tx('arena')+
    '<div class="c-sc" aria-hidden="true"><div class="c-sc-top"><span>Финал</span><span class="chip live"><i></i>84′</span></div>'+
      '<div class="c-sc-m"><span><img src="img/fl/es.svg" alt="">Испания</span><strong>0:0</strong><span>Аржентина<img src="img/fl/ar.svg" alt=""></span></div>'+
      '<div class="c-ev"><span><i></i>Жълт картон · Аржентина</span><span>61′</span></div>'+
      '<div class="c-ev"><span><i class="sub">⇄</i>Смяна · Испания</span><span>70′</span></div></div>'+
    '<span class="go">Разгледай'+ARROW+'</span></a>'+
  '<a class="c-t c-tall c-sh" href="'+s.href+'">'+tx('showtime',1)+'<div class="c-scr"><video muted loop playsinline preload="none" poster="'+s.uiP+'" data-src="'+s.ui+'" aria-hidden="true"></video></div></a>'+
  '<a class="c-t c-tall c-nw" href="'+n.href+'">'+tx('newsroom',1)+'<div class="c-scr"><video muted loop playsinline preload="none" poster="'+n.uiP+'" data-src="'+n.ui+'" aria-hidden="true"></video></div></a>';
  document.getElementById('cGrid').innerHTML=h;
}

/* ---------- D · ЕДИН ДЕН ---------- */
var DAY=[
  {k:'newsroom',t:'09:00',w:'Сутрин',h:'По пътя: новините за една минута.',v:'vid/c/nr-sutrin.mp4',p:'vid/c/nr-sutrin.jpg',rel:[0,3,5]},
  {k:'showtime',t:'13:00',w:'На обяд',h:'В почивката: моментите от снощи.',v:'vid/s/igri-a.mp4',p:'img/igri-1.jpg',rel:[1,2,3]},
  {k:'arena',t:'21:45',w:'Вечер',h:'Мачът започва. Гледаш го на живо.',v:'vid/s/lev-goal.mp4',p:'img/levski-kairat.jpg',rel:[2,1,5]},
  {k:'theatre',t:'23:30',w:'Преди сън',h:'Още един епизод.',v:'vid/s/hotd.mp4',p:'img/house-of-the-dragon-back.jpg',rel:[3,2,6]}
];
function relImg(k,i){
  if(k==='theatre'){var map={'Пингвинът':'img/the-penguin-back.jpg','Дюн: Част втора':'img/dune-2-back.jpg','Белият лотос':'img/white-lotus-back.jpg','The Last of Us':'img/the-last-of-us-back.jpg'};return map[C.theatre[i][1]]||C.theatre[i][0]}
  return C[k][i][0];
}
function buildD(){
  var st='<div class="d-stage">',ru='<div class="d-ruler"><div class="d-line"></div><div class="d-fill" id="dFill"></div>';
  DAY.forEach(function(d,i){
    var m=M[d.k];
    var rel=d.rel.map(function(r){return '<a href="'+m.href+'"><img src="'+relImg(d.k,r)+'" alt="" loading="lazy"><b>'+esc(C[d.k][r][1])+'</b></a>'}).join('');
    st+='<div class="d-l'+(i===0?' on':'')+'" data-i="'+i+'"><video muted loop playsinline preload="none" poster="'+d.p+'" data-src="'+d.v+'" aria-hidden="true"></video>'+
      '<div class="d-tx"><div class="d-time">'+d.t+'</div>'+badge(d.k)+'<h3>'+d.h+'</h3><p>'+m.p+'</p>'+go(d.k)+'</div>'+
      '<div class="d-rel"><small>Още в '+m.name+'</small>'+rel+'</div></div>';
    ru+='<button type="button" class="d-stop'+(i===0?' on':'')+'" data-i="'+i+'" style="left:'+(12.5+25*i)+'%" aria-label="'+d.t+', '+m.name+'"><i></i><b>'+d.t+'</b><em><span class="dw">'+d.w+' · </span>'+m.name+'</em></button>';
  });
  st+='</div>';ru+='</div>';
  var w=document.getElementById('dWrap');w.innerHTML=st+ru;
  var cur=0,hold=0,t0=performance.now(),STEP=6500;
  var layers=w.querySelectorAll('.d-l'),stops=w.querySelectorAll('.d-stop'),fill=document.getElementById('dFill');
  function set(i,user){
    cur=i;t0=performance.now();if(user)hold=performance.now()+12000;
    [].forEach.call(layers,function(l,j){var on=j===i;l.classList.toggle('on',on);var v=l.querySelector('video');if(on&&D.live)play(v);else if(v)v.pause()});
    [].forEach.call(stops,function(s,j){s.classList.toggle('on',j===i);s.setAttribute('aria-pressed',j===i)});
    fill.style.width=(12.5+25*i)+'%';
  }
  [].forEach.call(stops,function(s,i){s.addEventListener('click',function(){set(i,true)})});
  D.tick=function(now){if(RM||now<hold)return;if(now-t0>STEP)set((cur+1)%4)};
  D.enter=function(){play(layers[cur].querySelector('video'))};
  D.leave=function(){[].forEach.call(w.querySelectorAll('video'),function(v){v.pause()})};
  set(0);
}
var D={tick:function(){},enter:function(){},leave:function(){},live:false};

function play(v){if(!v)return;if(!v.src&&v.dataset.src)v.src=v.dataset.src;var p=v.play();if(p&&p.catch)p.catch(function(){})}

/* ---------- превключване ---------- */
var NOTES={
  a:'Като в самото приложение: един ред за всеки модул, обяснението е в началото на реда.',
  b:'Цялото съдържание на един екран: четири колони, посоченият модул се разтваря.',
  c:'Всеки модул показан в своя формат: дълго гледане вляво, кратки моменти вдясно.',
  d:'Модулите през един ден: кога и защо влизаш във всеки от тях.'
};
var built={},cur='',secs={};
[].forEach.call(document.querySelectorAll('.me'),function(s){secs[s.getAttribute('data-v')]=s});
var btns=document.querySelectorAll('.vs-b button');
function show(v,scroll){
  if(!secs[v])v='a';
  if(cur===v)return;
  if(!built[v]){({a:buildA,b:buildB,c:buildC,d:buildD})[v]();built[v]=1}
  Object.keys(secs).forEach(function(k){secs[k].hidden=k!==v});
  [].forEach.call(btns,function(b){b.setAttribute('aria-selected',b.getAttribute('data-go')===v)});
  document.getElementById('vsNote').textContent=NOTES[v];
  if(cur==='d')D.leave();
  cur=v;
  if(history.replaceState)history.replaceState(null,'','#'+v);
  vis();
  if(scroll)document.getElementById('moduli').scrollIntoView({behavior:RM?'auto':'smooth'});
}
[].forEach.call(btns,function(b){b.addEventListener('click',function(){show(b.getAttribute('data-go'),true)})});

/* видеата вървят само когато секцията се вижда */
var inView=false;
function vis(){
  var s=secs[cur];if(!s)return;
  var vids=s.querySelectorAll('.c-t video, .t-ft video');
  [].forEach.call(vids,function(v){if(inView)play(v);else v.pause()});
  D.live=inView&&cur==='d';
  if(cur==='d'){if(inView)D.enter();else D.leave()}
}
new IntersectionObserver(function(es){es.forEach(function(e){inView=e.isIntersecting});vis()},{threshold:.15}).observe(document.getElementById('moduli'));

var last=performance.now(),bT=0;
function loop(now){
  var dt=Math.min(.05,(now-last)/1000);last=now;
  if(inView){
    if(cur==='a')[].forEach.call(document.querySelectorAll('.a-rail'),function(r){r._tick&&r._tick(dt,now)});
    if(cur==='b'){bT+=dt;if(bT>4.5){bT=0;B.next()}}
    if(cur==='d')D.tick(now);
  }
  requestAnimationFrame(loop);
}
requestAnimationFrame(loop);

function fromHash(){var h=(location.hash||'').slice(1);return /^[abcd]$/.test(h)?h:''}
addEventListener('hashchange',function(){var h=fromHash();if(h)show(h)});
show(fromHash()||'a');
})();
