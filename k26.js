/* v26: табове към карусела + Livescore с гледане на мач (демо) */
(function(){
  var root=document.getElementById('mods');
  /* размерът на голямата карта като реални пиксели (v19.js чете --ag-w като число) */
  if(root&&root.classList.contains('k26')){
    var size=function(){var w=Math.round(innerWidth<735?innerWidth*.74:Math.min(innerWidth*.28,520));root.style.setProperty('--ag-w',w+'px');root.style.setProperty('--ag-h',Math.round(w*9/16)+'px')};
    size();var rt=0;addEventListener('resize',function(){size()});
    requestAnimationFrame(function(){dispatchEvent(new Event('resize'))});
  }
  /* ---------- табове ---------- */
  if(root&&root.classList.contains('k26')){
    var stick=root.querySelector('.ag-stick'),dataEl=document.getElementById('ag-data'),slides=[];
    try{slides=JSON.parse(dataEl.textContent).slides}catch(e){}
    if(stick&&slides.length){
      var bar=document.createElement('div');bar.className='k26-tabs';bar.setAttribute('role','tablist');
      bar.innerHTML=slides.map(function(s,i){return '<button type="button" role="tab" data-i="'+i+'"'+(i?'':' class="on" aria-selected="true"')+'>'+(i?s.title:(/arena/.test(location.pathname)?'Всички спортове':'Всичко'))+'</button>'}).join('');
      stick.appendChild(bar);
      var btns=[].slice.call(bar.children);
      bar.addEventListener('click',function(e){var b=e.target.closest('button');if(!b)return;if(window.agGo)window.agGo(+b.dataset.i);else{var d=root.querySelector('.agd[data-i="'+b.dataset.i+'"]');if(d)d.click()}});
      var frame=document.getElementById('frame');
      var sync=function(){var cur=frame.querySelector('.ag-slide.is-current'),i=cur?[].indexOf.call(frame.querySelectorAll('.ag-slide'),cur):0;btns.forEach(function(b,k){b.classList.toggle('on',k===i);b.setAttribute('aria-selected',k===i)})}
      /* големите карти (важен мач / филм) за избрания таб */
      var ar=/arena/.test(location.pathname),I='img/',A='img/ar/';
      var SET=ar?{
       noisy:[[A+'s-bra-nor.jpg','Бразилия - Норвегия'],[ 'vid/mu-city.jpg','Висша лига: Ман Юнайтед - Ман Сити',1],[A+'s-eurobasket.jpg','Евробаскет'],[A+'s-f1-monaco.jpg','Формула 1: Гран при на Монако'],[A+'s-tennis.jpg','АТР Финали'],['vid/c/wc-final.jpg','Испания - Аржентина: финалът']],
       football:[[A+'s-bra-nor.jpg','Бразилия - Норвегия'],['vid/mu-city.jpg','Висша лига: Ман Юнайтед - Ман Сити',1],[A+'s-usa-bel.jpg','САЩ - Белгия'],[A+'s-mex-eng.jpg','Мексико - Англия'],['vid/c/wc-final.jpg','Испания - Аржентина: финалът']],
       basketball:[[A+'s-eurobasket.jpg','Евробаскет'],[A+'s-basket-2.jpg','Евролига'],['vid/ar/sp-basket.jpg','Най-добрите моменти']],
       f1:[[A+'s-f1-monaco.jpg','Гран при на Монако'],[A+'s-f1-norris.jpg','Норис: обиколката'],[A+'s-f1-onboard.jpg','От болида'],[A+'s-f1-start.jpg','Стартът']],
       tennis:[[A+'s-tennis.jpg','АТР Финали'],[A+'s-tennis-2.jpg','Четвъртфинал'],[A+'s-tennis-3.jpg','Полуфинал'],[A+'s-tennis-4.jpg','Финалът']]
      }:{
       noisy:[[I+'dune-2-back.jpg','Дюн: Част втора',1],[I+'house-of-the-dragon-back.jpg','Домът на дракона',1],[I+'the-batman-back.jpg','Батман',1],[I+'white-lotus-back.jpg','Белият лотос',1],[I+'the-last-of-us-back.jpg','The Last of Us',1]],
       scifi:[[I+'dune-2-back.jpg','Дюн: Част втора',1],[I+'the-last-of-us-back.jpg','The Last of Us',1],[I+'th/genesis-poster.jpg','Генезис']],
       fantasy:[[I+'house-of-the-dragon-back.jpg','Домът на дракона',1],[I+'barbie-back.jpg','Барби',1]],
       crime:[[I+'the-batman-back.jpg','Батман',1],[I+'the-penguin-back.jpg','Пингвинът',1],[I+'th/mamnik-poster.jpg','Мамник']],
       drama:[[I+'white-lotus-back.jpg','Белият лотос',1],[I+'euphoria-back.jpg','Еуфория',1]]
      };
      var VID={"s-bra-nor.jpg": "vid/ar/sp-foot.mp4", "mu-city.jpg": "vid/s/mu-city.mp4", "s-usa-bel.jpg": "vid/s/lecce.mp4", "s-mex-eng.jpg": "vid/s/sa-mex.mp4", "wc-final.jpg": "vid/c/wc-final.mp4", "s-eurobasket.jpg": "vid/ar/sp-basket.mp4", "s-basket-2.jpg": "vid/ar/sp-basket.mp4", "sp-basket.jpg": "vid/ar/sp-basket.mp4", "s-f1-monaco.jpg": "vid/ar/sp-f1.mp4", "s-f1-norris.jpg": "vid/ar/sp-f1.mp4", "s-f1-onboard.jpg": "vid/ar/sp-f1.mp4", "s-f1-start.jpg": "vid/ar/sp-f1.mp4", "s-tennis.jpg": "vid/ar/sp-tennis.mp4", "s-tennis-2.jpg": "vid/ar/sp-tennis.mp4", "s-tennis-3.jpg": "vid/ar/sp-tennis.mp4", "s-tennis-4.jpg": "vid/ar/sp-tennis.mp4", "dune-2-back.jpg": "vid/s/dune.mp4", "house-of-the-dragon-back.jpg": "vid/s/hotd.mp4", "the-batman-back.jpg": "vid/s/batman.mp4", "white-lotus-back.jpg": "vid/s/lotus.mp4", "the-last-of-us-back.jpg": "vid/s/tlou.mp4", "euphoria-back.jpg": "vid/s/euphoria.mp4", "the-penguin-back.jpg": "vid/s/penguin.mp4", "barbie-back.jpg": "vid/s/barbie.mp4", "genesis-poster.jpg": "vid/s/genesis.mp4", "mamnik-poster.jpg": "vid/s/mamnik.mp4"};
      var big=document.createElement('div');big.className='k26-big';
      big.innerHTML='<div class="k26-tr"></div><button type="button" class="k26-ar l" aria-label="Предишна">‹</button><button type="button" class="k26-ar r" aria-label="Следваща">›</button>';
      stick.appendChild(big);
      var tr=big.querySelector('.k26-tr'),cards=[],ci=0,curId=slides[0].id;
      var PAD=2,N=0,snapT=0;
      function mark(){cards.forEach(function(c,k){var on=k===ci+PAD;c.classList.toggle('on',on);var v=c.querySelector('video');if(!v)return;if(on){if(!v.src)v.src=v.dataset.src;try{v.currentTime=0}catch(e){}var pr=v.play();if(pr&&pr.then)pr.then(function(){if(c.classList.contains('on'))v.classList.add('pl')}).catch(function(){});else v.classList.add('pl')}else{v.pause();v.classList.remove('pl')}})}
      function place(){tr.style.setProperty('--i',ci+PAD)}
      function snap(){clearTimeout(snapT);if(!N||(ci>=0&&ci<N))return;ci=((ci%N)+N)%N;tr.style.transition='none';place();mark();void tr.offsetWidth;tr.style.transition=''}
      function go(i){if(!N)return;if(i>N+PAD-1||i<-PAD)snap();ci=i;place();mark();clearTimeout(snapT);snapT=setTimeout(snap,760)}
      function fill(id){curId=id;var L=SET[id]||SET.noisy;N=L.length;var pre=[],post=[];for(var k=0;k<PAD;k++){pre.push(L[((N-PAD+k)%N+N)%N]);post.push(L[k%N])}var all=pre.concat(L,post);tr.innerHTML=all.map(function(x){var vf=VID[x[0].split('/').pop()];return '<div class="k26-cd"><img src="'+x[0].replace(/^lg:/,'')+'" alt="" loading="lazy">'+(vf?'<video muted loop playsinline preload="none" data-src="'+vf+'"></video>':'')+(x[2]?'<em>PREMIUM</em>':'')+'<span>'+x[1]+'</span></div>'}).join('');cards=[].slice.call(tr.children);cards.forEach(function(c,k){c.addEventListener('click',function(){if(k-PAD!==ci)go(k-PAD)})});clearTimeout(snapT);tr.style.transition='none';ci=0;place();mark();void tr.offsetWidth;tr.style.transition=''}
      big.querySelector('.l').addEventListener('click',function(){go(ci-1)});big.querySelector('.r').addEventListener('click',function(){go(ci+1)});
      /* v28: суайп/влачене настрани (телефон, мишка) и хоризонтален скрол с тъчпада */
      (function(){var sx=0,sy=0,dx=0,on=false,lock=0,moved=false,cw=function(){var c=cards[0];return c?c.getBoundingClientRect().width+16:300};
       big.style.touchAction='pan-y';
       function setDx(v){tr.style.setProperty('--dx',v+'px')}
       big.addEventListener('pointerdown',function(e){if(e.button>0||e.target.closest('.k26-ar'))return;on=true;moved=false;sx=e.clientX;sy=e.clientY;dx=0;lock=0;tr.style.transition='none'});
       addEventListener('pointermove',function(e){if(!on)return;var x=e.clientX-sx,y=e.clientY-sy;if(!lock){if(Math.abs(x)>8&&Math.abs(x)>Math.abs(y))lock=1;else if(Math.abs(y)>8){on=false;tr.style.transition='';return}}if(lock===1){dx=x;moved=Math.abs(x)>6;setDx(x)}},{passive:true});
       function end(){if(!on)return;on=false;tr.style.transition='';var w=cw(),n=Math.round(-dx/w);if(!n&&Math.abs(dx)>50)n=dx<0?1:-1;setDx(0);if(n)go(ci+n)}
       addEventListener('pointerup',end);addEventListener('pointercancel',end);
       big.addEventListener('click',function(e){if(moved){e.preventDefault();e.stopPropagation();moved=false}},true);
       var acc=0,wt=0,cool=0;big.addEventListener('wheel',function(e){if(Math.abs(e.deltaX)<=Math.abs(e.deltaY))return;e.preventDefault();if(Date.now()<cool)return;acc+=e.deltaX;clearTimeout(wt);wt=setTimeout(function(){acc=0},180);if(Math.abs(acc)>60){go(ci+(acc>0?1:-1));acc=0;cool=Date.now()+450}},{passive:false});
      })();
      /* без самосменяне на категориите: пауза на въртележката (смяна само с клик на таб или стрелка) */
      var pz=root.querySelector('.ag-pause');if(pz&&pz.getAttribute('aria-pressed')!=='true')pz.click();
      fill(slides[0].id);
      var syncOld=sync;sync=function(){syncOld();var cur=frame.querySelector('.ag-slide.is-current');var id=cur?cur.dataset.w:slides[0].id;if(id!==curId)fill(id)};
      new MutationObserver(function(){sync()}).observe(frame,{subtree:true,attributes:true,attributeFilter:['class']});sync();
      /* самосменяне: карта по карта, след последната - следващата категория; пауза при мишка и 9 сек след ръчна смяна */
      var hov=false,lastUser=0,zone=root.querySelector('.ag-stick'),slideIdx=function(){var c=frame.querySelector('.ag-slide.is-current');return c?[].indexOf.call(frame.querySelectorAll('.ag-slide'),c):0};
      zone.addEventListener('mouseenter',function(){hov=true});zone.addEventListener('mouseleave',function(){hov=false;lastUser=Date.now()-5000});
      ['click','pointerdown','keydown','touchstart'].forEach(function(ev){zone.addEventListener(ev,function(){lastUser=Date.now()},true)});
      var tick=Date.now();
      setInterval(function(){
        var r=zone.getBoundingClientRect(),vis=r.bottom>innerHeight*.3&&r.top<innerHeight*.7;
        if(!vis||hov||document.hidden||root.classList.contains('is-shrinking')||!root.classList.contains('nfree')||document.querySelector('#su.on,.pvw.on,.lsw.on')){tick=Date.now();return}
        if(Date.now()-lastUser<9000){tick=Date.now();return}
        if(Date.now()-tick<4500)return;
        tick=Date.now();
        if(ci<N-1)go(ci+1);else if(window.agGo)window.agGo((slideIdx()+1)%slides.length);
      },300);
    }
  }
  /* ---------- Livescore ---------- */
  var ls=document.getElementById('livescore');if(!ls||ls.hasAttribute('data-v23'))return; /* v28: Livescore е от v23 (arena23.js) */
  var V=['vid/s/mu-city.mp4','vid/s/esp-fra.mp4','vid/s/lev-goal.mp4','vid/s/sa-mex.mp4','vid/s/lecce.mp4','vid/c/wc-final.mp4'];
  var LG={
   wc:{n:'FIFA World Cup 2026',l:'img/ar/livescore-crest.png',p:0},
   pl:{n:'Premier League',l:'img/ar/lg-premier.jpg',p:1},
   cl:{n:'UEFA Champions League',l:'img/ar/lg-ucl.jpg',p:1},
   la:{n:'LaLiga',l:'img/ar/lg-laliga.jpg',p:1},
   eb:{n:'EuroBasket',l:'img/ar/lg-eurobasket.svg',p:0}
  };
  var fl=function(c){return 'fl:'+c};
  var DAYS=[
   {l:'Sun, 25 Jan',g:[['wc',[['Germany',fl('de'),3,0,'FT','Curaçao',fl('cw')],['Netherlands',fl('nl'),1,1,'FT','Japan',fl('jp')]]],['pl',[['Arsenal','ARS',2,1,'FT','Liverpool','LIV']]]]},
   {l:'Mon, 26 Jan',g:[['wc',[['Mexico',fl('mx'),0,0,"3′",'South Africa',fl('za')],['South Korea',fl('kr'),0,1,"5′",'Czechia',fl('cz')],['Canada',fl('ca'),1,0,"10′",'Bosnia and Herzegovina',fl('ba')],['USA',fl('us'),0,0,"13′",'Paraguay',fl('py')]]],['pl',[['Man United','MUN',1,1,"61′",'Man City','MCI'],['Chelsea','CHE',0,0,'21:00','Tottenham','TOT']]],['cl',[['Real Madrid','RMA',2,0,"34′",'Bayern','BAY']]],['eb',[['Bulgaria',fl('bg'),71,68,'FT','Serbia',fl('rs')]]]]},
   {l:'Tue, 27 Jan',g:[['wc',[['Brazil',fl('br'),0,0,'01:00','Morocco',fl('ma')],['Spain',fl('es'),0,0,'04:00','Argentina',fl('ar')]]],['la',[['Barcelona','BAR',0,0,'22:00','Atletico','ATM']]]]}
  ];
  var col=function(s){var h=0;for(var i=0;i<s.length;i++)h=(h*31+s.charCodeAt(i))%360;return 'hsl('+h+',45%,34%)'};
  var crest=function(c){return c.indexOf('fl:')===0?'<img src="img/fl/'+c.slice(3)+'.svg" alt="">':'<em style="background:'+col(c)+'">'+c+'</em>'};
  var di=1;
  ls.innerHTML='<div class="ar-lsh"><h2 id="arLs">Livescore</h2><p>Your daily dose of sports activity</p><small>Stay updated with the latest results and the schedule of all interesting games.</small></div><div class="ar-datebar"><div class="ar-days" role="group" aria-label="Day"></div></div><div class="l-wrap" aria-live="polite"></div><p class="ar-note">Резултатите и програмата са примерни. Лигите с PREMIUM са в добавката Arena Premium.</p>';
  ls.classList.add('k26-ls');
  var days=ls.querySelector('.ar-days'),grid=ls.querySelector('.l-wrap');
  function render(){
    days.innerHTML=DAYS.map(function(d,i){return '<button type="button" class="'+(i===di?'on':'')+'" data-d="'+i+'">'+d.l+'</button>'}).join('');
    grid.innerHTML=DAYS[di].g.map(function(x,gi){var L=LG[x[0]];
     return '<div class="ar-tbl l-lg"><div class="ar-tt l-lh"><img src="'+L.l+'" alt=""><b>'+L.n+'</b>'+(L.p?'<span class="l-pr">PREMIUM</span>':'')+'</div>'+
      x[1].map(function(m,mi){var live=/′/.test(m[4]);
       return '<button type="button" class="ar-row l-m" data-g="'+gi+'" data-m="'+mi+'"><span class="a">'+m[0]+crest(m[1])+'</span><span class="ar-sc2"><b>'+m[2]+' : '+m[3]+'</b><small class="lv'+(live?' on':'')+'">'+m[4]+'</small></span><span class="b">'+crest(m[6])+m[5]+'</span><span class="l-go" aria-hidden="true">▶ Гледай</span></button>'}).join('')+'</div>'}).join('');
  }
  days.addEventListener('click',function(e){var b=e.target.closest('button');if(b){di=+b.dataset.d;render()}});
  render();
  /* плеър */
  var w=document.createElement('div');w.className='lsw';w.setAttribute('role','dialog');w.setAttribute('aria-modal','true');w.setAttribute('aria-label','Мач');
  w.innerHTML='<div class="b"><video muted playsinline loop preload="none"></video><div class="top"><span class="c"></span><b></b><button type="button" class="x" aria-label="Затвори">×</button></div><div class="bar"><i></i></div><div class="gate"><div><p class="gk">Хареса ти?</p><h3>Продължи да гледаш.</h3><p class="gs"></p><div class="gb"><a class="btn btn-p" href="#" data-su>Пробвай NOISY</a><button type="button" class="btn btn-s lsx">Друг мач</button></div><p class="gf">Без карта.</p></div></div></div>';
  document.body.appendChild(w);
  var vid=w.querySelector('video'),gate=w.querySelector('.gate'),fill=w.querySelector('.bar i'),chip=w.querySelector('.c'),ttl=w.querySelector('.top b'),gs=w.querySelector('.gs'),raf=0,t0=0,DUR=5000,last=null;
  function loop(n){var e=Math.min(1,(n-t0)/DUR);fill.style.width=(e*100)+'%';if(e<1)raf=requestAnimationFrame(loop);else gate.classList.add('on')}
  function open(btn){
    var x=DAYS[di].g[+btn.dataset.g],m=x[1][+btn.dataset.m],L=LG[x[0]];last=btn;
    chip.textContent=L.n+(L.p?' · PREMIUM':'');chip.className='c'+(L.p?' p':'');ttl.textContent=m[0]+' - '+m[5];
    gs.textContent=L.p?L.n+' е в добавката Arena Premium. Вземи я, за да гледаш целия мач.':'Целият мач, със статистиката до него.';
    gate.classList.remove('on');fill.style.width='0';
    vid.src=V[Math.floor(Math.random()*V.length)];vid.currentTime=0;var p=vid.play();if(p&&p.catch)p.catch(function(){});
    w.classList.add('on');document.documentElement.style.overflow='hidden';cancelAnimationFrame(raf);t0=performance.now();raf=requestAnimationFrame(loop);
    w.querySelector('.x').focus({preventScroll:true});
  }
  function close(){cancelAnimationFrame(raf);vid.pause();w.classList.remove('on');gate.classList.remove('on');document.documentElement.style.overflow='';if(last)last.focus({preventScroll:true})}
  grid.addEventListener('click',function(e){var b=e.target.closest('.l-m');if(b)open(b)});
  w.querySelector('.x').addEventListener('click',close);w.querySelector('.lsx').addEventListener('click',close);
  w.querySelector('[data-su]').addEventListener('click',close);
  w.addEventListener('click',function(e){if(e.target===w)close()});
  document.addEventListener('keydown',function(e){if(e.key==='Escape'&&w.classList.contains('on'))close()});
})();

/* Другите модули: клипът тръгва при мишка */
(function(){if(!matchMedia('(hover:hover)').matches)return;document.querySelectorAll('.k26-om .omc').forEach(function(a){var v=a.querySelector('.omv');if(!v)return;a.addEventListener('mouseenter',function(){if(!v.src)v.src=v.dataset.tv;var p=v.play();if(p&&p.catch)p.catch(function(){})});a.addEventListener('mouseleave',function(){v.pause()})})})();
/* върху свиващата се карта: същото като върху първата голяма карта (PREMIUM и заглавие) */
(function(){var s=document.querySelector('#mods .ag-slide[data-w=noisy] .ag-surface');if(!s)return;var ar=/arena/.test(location.pathname);
 var d=document.createElement('div');d.className='k26-ph';d.innerHTML=(ar?'':'<em>PREMIUM</em>')+'<span>'+(ar?'Бразилия - Норвегия':'Дюн: Част втора')+'</span>';s.appendChild(d)})();
