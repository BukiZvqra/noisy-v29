/* NOISY · moduli-3.html: H Всичко на картата, I Таблица, J Чекмедже, K Речник.
   Данните са взети от страниците на модулите (theatre, arena, f-showtime, f-newsroom). */
(function(){
  var CK='<svg class="ck" viewBox="0 0 16 16" aria-hidden="true"><path d="M3.5 8.5l3 3 6-7"/></svg>';
  var AR='<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4"/></svg>';
  var M=[
    {k:'theatre',n:'Theatre',what:'Филми и сериали',how:'Цели филми и епизоди',
     line:'Тук гледаш хитовите филми и сериали от началото до края, с актьорите и всичко около тях.',
     img:'img/dune-2-back.jpg',v:'vid/m/theatre-sm',feat:'vid/feat/theatre-continue',href:'theatre.html',
     f:['Продължаваш оттам, където спря.','Виждаш кой играе и още заглавия с него.','Избираш по Rotten Tomatoes и мнението на публиката.','Пращаш сцена на приятелите си.'],
     best:'Продължи оттам, където спря',share:'Сцена от филма'},
    {k:'arena',n:'Arena',what:'Спорт на живо',how:'На живо и на запис',
     line:'Футбол, баскетбол, тенис и Формула 1. Мачът е на живо, а резултатът и статистиката са върху него.',
     img:'img/ar/s-f1-monaco.jpg',v:'vid/m/arena-mix-sm',feat:'vid/feat/arena-match',href:'arena.html',
     f:['Резултатът, съставите и статистиката върху мача.','Всеки гол излиза в минутата, в която падне.','Групите, схемата и пътят до финала.','Изрязваш гола и го качваш в историята си.'],
     best:'Статистиката върху мача',share:'Гола'},
    {k:'showtime',n:'Showtime',what:'Реалити',how:'На моменти',
     line:'Всеки епизод е нарязан на най-силните моменти. Гледаш точно тях, без целия епизод.',
     img:'img/fermata-2.jpg',v:'',feat:'vid/feat/showtime-lastnight',href:'f/f-showtime.html',
     f:['Прескачаш направо до момента.','Избираш деня и виждаш какво стана снощи.','Най-силното от всеки участник.','Режеш 15 секунди и ги пращаш в групата.'],
     best:'Какво стана снощи, по дни',share:'15 секунди от епизода'},
    {k:'newsroom',n:'Newsroom',what:'Новини',how:'Кратки клипове, едно след друго',
     line:'Важното от деня в кратки клипове, като истории. Около минута и си в час.',
     img:'vid/newsroom.jpg',v:'vid/m/newsroom-sm',feat:'vid/feat/newsroom-60',href:'f/f-newsroom.html',
     f:['Около минута за основното от деня.','Твоите теми: България, свят, спорт, времето.','Студиото е на живо при голямо събитие.','Пращаш новината на семейството.'],
     best:'Твоите теми',share:'Новината'}
  ];
  function vid(m,cls){if(!m.v)return '<img class="'+cls+'" src="'+m.img+'" alt="" loading="lazy">';return '<video class="'+cls+'" muted loop playsinline preload="none" poster="'+m.img+'" data-src="'+m.v+'" aria-hidden="true"></video>';}
  function bd(m,h){return '<img class="bd" src="assets/'+m.n+'-w.svg" alt="'+m.n+'" height="'+(h||26)+'">';}
  function list(m){return '<ul class="fl">'+m.f.map(function(x){return '<li>'+CK+'<span>'+x+'</span></li>';}).join('')+'</ul>';}
  function go(m){return '<a class="go" href="'+m.href+'">Разгледай '+m.n+AR+'</a>';}

  /* H · всичко на картата */
  var h=document.getElementById('hGrid');
  if(h)h.innerHTML=M.map(function(m){return '<article class="h-c">'+
    '<div class="h-m">'+vid(m,'pv')+bd(m)+'</div>'+
    '<div class="h-t"><p class="eq"><b>'+m.n+'</b> = '+m.what.toLowerCase()+'</p>'+
    '<p class="ln">'+m.line+'</p><p class="how"><span>Как гледаш</span>'+m.how+'</p>'+list(m)+go(m)+'</div></article>';}).join('');

  /* I · таблица */
  var rows=[['Какво има','what'],['Как гледаш','how'],['Най-полезното','best'],['Какво пращаш','share']];
  var it=document.getElementById('iTab');
  if(it){
    var head='<div class="i-row i-hd"><div class="i-lb"></div>'+M.map(function(m,i){return '<button class="i-col i-th" role="tab" aria-selected="'+(i?'false':'true')+'" data-i="'+i+'"><span class="i-pic">'+vid(m,'pv')+'</span>'+bd(m,22)+'</button>';}).join('')+'</div>';
    var body=rows.map(function(r){return '<div class="i-row"><div class="i-lb">'+r[0]+'</div>'+M.map(function(m,i){return '<div class="i-col'+(i?'':' on')+'" data-i="'+i+'">'+m[r[1]]+'</div>';}).join('')+'</div>';}).join('');
    var all='<div class="i-row i-all"><div class="i-lb">Реклами</div><div class="i-span">Няма. Нито в един модул.</div></div>'+
      '<div class="i-row i-all"><div class="i-lb">В плана</div><div class="i-span">'+CK+'И четирите са в един абонамент.</div></div>';
    var foot='<div class="i-row i-ft"><div class="i-lb"></div>'+M.map(function(m,i){return '<div class="i-col'+(i?'':' on')+'" data-i="'+i+'">'+go(m)+'</div>';}).join('')+'</div>';
    it.innerHTML=head+body+all+foot;
    it.addEventListener('click',function(e){var b=e.target.closest('.i-th');if(!b)return;var i=b.dataset.i;
      it.querySelectorAll('.i-th').forEach(function(x){x.setAttribute('aria-selected',x.dataset.i===i?'true':'false');});
      it.querySelectorAll('.i-col:not(.i-th)').forEach(function(x){x.classList.toggle('on',x.dataset.i===i);});
      play(it);});
  }

  /* J · чекмедже: картите като сега, под тях се отваря какво има вътре */
  var jr=document.getElementById('jRow'),jp=document.getElementById('jPanel'),ji=0;
  function jSet(i){ji=i;var m=M[i];
    jr.querySelectorAll('.j-c').forEach(function(c,k){c.classList.toggle('on',k===i);c.setAttribute('aria-expanded',k===i?'true':'false');});
    jp.innerHTML='<div class="j-ph"><video muted loop playsinline autoplay preload="metadata" poster="'+m.feat+'.jpg"><source src="'+m.feat+'.webm" type="video/webm"><source src="'+m.feat+'.mp4" type="video/mp4"></video></div>'+
      '<div class="j-t">'+bd(m,28)+'<h3>'+m.what+'. '+m.how+'.</h3><p class="ln">'+m.line+'</p>'+list(m)+go(m)+'</div>';
    jp.style.setProperty('--x',(i*25+12.5)+'%');
    var v=jp.querySelector('video');v.muted=true;var p=v.play();if(p&&p.catch)p.catch(function(){});}
  if(jr){
    jr.innerHTML=M.map(function(m,i){return '<button class="j-c" aria-controls="jPanel" aria-expanded="false" data-i="'+i+'">'+vid(m,'pv')+
      '<span class="j-in">'+bd(m,24)+'<b>'+m.what+'</b><span class="j-more">Какво има вътре'+AR+'</span></span></button>';}).join('');
    jr.addEventListener('click',function(e){var b=e.target.closest('.j-c');if(b)jSet(+b.dataset.i);});
    jSet(0);
  }

  /* K · речник */
  var kl=document.getElementById('kList');
  if(kl)kl.innerHTML=M.map(function(m,i){return '<article class="k-r"><span class="k-no">0'+(i+1)+'</span>'+
    '<div class="k-h">'+bd(m,28)+'<h3>'+m.what+'</h3><p class="how"><span>Как гледаш</span>'+m.how+'</p></div>'+
    '<div class="k-b"><p class="ln">'+m.line+'</p>'+list(m)+go(m)+'</div>'+
    '<div class="k-m">'+vid(m,'pv')+'</div></article>';}).join('');

  /* видео: пускаме само видимите, сваляме ги чак когато трябват */
  function load(v){if(v.dataset.on)return;v.dataset.on=1;
    v.innerHTML='<source src="'+v.dataset.src+'.webm" type="video/webm"><source src="'+v.dataset.src+'.mp4" type="video/mp4">';v.load();}
  function play(root){root.querySelectorAll('video.pv').forEach(function(v){if(v.offsetParent===null)return;load(v);var p=v.play();if(p&&p.catch)p.catch(function(){});});}
  var reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(!reduce&&'IntersectionObserver' in window){
    var io=new IntersectionObserver(function(es){es.forEach(function(e){
      e.target.querySelectorAll('video').forEach(function(v){
        if(e.isIntersecting){if(v.classList.contains('pv')){if(v.offsetParent===null)return;load(v);}var p=v.play();if(p&&p.catch)p.catch(function(){});}else v.pause();});});},{threshold:.25});
    document.querySelectorAll('.v').forEach(function(s){io.observe(s);});
  }
})();
