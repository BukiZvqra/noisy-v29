/* v29 варианти, четвърта партида: табло, плъзгач, бележка, обръщащи се карти, финален кадър с N */
(function(){
  var rm=matchMedia('(prefers-reduced-motion:reduce)').matches;
  var eur=function(x){return (Math.floor(x*100+1e-6)/100).toFixed(2).replace('.',',')+' €'};
  var TOG=21.16,SOLO=12.66;

  /* МОДУЛИ J: табло с прелистващи се букви, сменя реда на 6 сек. */
  [].forEach.call(document.querySelectorAll('[data-mj]'),function(b){
    var rows=[].slice.call(b.querySelectorAll('[data-mj-l]')),tm=b.querySelector('[data-mj-t]'),A='АБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЮЯ0123456789',idx=rows.map(function(){return 0});
    function clock(){var d=new Date();tm.textContent=('0'+d.getHours()).slice(-2)+':'+('0'+d.getMinutes()).slice(-2)}
    function show(r,txt,anim){r.setAttribute('aria-label',txt);r.innerHTML='';var ch=txt.toUpperCase().split('');
      var w=document.createElement('span');w.className='w';r.appendChild(w);
      ch.forEach(function(c,i){if(c===' '){w=document.createElement('span');w.className='w';r.appendChild(w);return}var s=document.createElement('span');s.textContent=anim&&!rm?A[Math.random()*A.length|0]:c;w.appendChild(s);
        if(anim&&!rm){var n=4+(i%5)+Math.random()*4|0,k=0;var t=setInterval(function(){k++;s.classList.remove('fl');void s.offsetWidth;s.classList.add('fl');s.textContent=k>=n?c:A[Math.random()*A.length|0];if(k>=n)clearInterval(t)},70)}})}
    var started=false;
    function start(){if(started)return;started=true;rows.forEach(function(r,i){setTimeout(function(){show(r,JSON.parse(r.dataset.mjL)[0],true)},i*180)});
      if(!rm)setInterval(function(){var i=Math.random()*rows.length|0,L=JSON.parse(rows[i].dataset.mjL);idx[i]=(idx[i]+1)%L.length;show(rows[i],L[idx[i]],true)},6000)}
    rows.forEach(function(r){show(r,JSON.parse(r.dataset.mjL)[0],false)});clock();setInterval(clock,30000);
    new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting)start()})},{threshold:.3}).observe(b);
  });

  /* ЦЕНИ K: плъзгач 1-5 */
  [].forEach.call(document.querySelectorAll('[data-pk]'),function(c){
    var inp=c.querySelector('[data-pk-in]'),R=c.querySelector('[data-pk-r]'),U=c.querySelector('[data-pk-u]'),P=c.querySelector('[data-pk-p]'),Sv=c.querySelector('[data-pk-s]'),
        av=[].slice.call(c.querySelectorAll('.ava i')),tk=[].slice.call(c.querySelectorAll('.pk-tk span'));
    function set(n){inp.style.setProperty('--p',((n-1)/4*100)+'%');av.forEach(function(a,k){a.classList.toggle('off',k>=n)});tk.forEach(function(t){t.classList.toggle('on',+t.dataset.n===n)});
      if(n===1){R.textContent=eur(SOLO);U.textContent='/ месец';P.innerHTML='<b>Solo</b>, един профил, само твой';Sv.classList.add('off');Sv.innerHTML='Добави още хора и всеки плаща по-малко'}
      else{var v=Math.floor(TOG/n*100+1e-6)/100,y=Math.round((SOLO-v)*12*100)/100;R.textContent=eur(v);U.textContent='на човек / месец';
        P.innerHTML='<b>Together</b> за '+n+' души, '+eur(TOG)+' на месец за целия абонамент';Sv.classList.remove('off');Sv.innerHTML='Всеки спестява <b>'+y.toFixed(2).replace('.',',')+' € на година</b> спрямо Solo'}}
    inp.addEventListener('input',function(){set(+inp.value)});tk.forEach(function(t){t.style.cursor='pointer';t.addEventListener('click',function(){inp.value=t.dataset.n;set(+t.dataset.n)})});set(5);
  });

  /* ЦЕНИ L: бележката се „отпечатва“ наново при смяна */
  [].forEach.call(document.querySelectorAll('[data-pl]'),function(c){
    var bs=[].slice.call(c.querySelectorAll('.pb-sw button')),rc=c.querySelector('.rc'),L=c.querySelector('[data-rc-l]'),T=c.querySelector('[data-rc-t]'),D=c.querySelector('[data-rc-d]'),F=c.querySelector('[data-rc-f]');
    var row=function(a,b,m){return '<li'+(m?' class="mut"':'')+'><span>'+a+'</span><span>'+b+'</span></li>'};
    function set(i){bs.forEach(function(b,k){b.classList.toggle('on',k===i)});var tog=i===1;
      D.textContent='Бележка · план '+(tog?'Together':'Solo');
      L.innerHTML=row('Theatre','✓')+row('Arena','✓')+row('Showtime','✓')+row('Newsroom','✓')+row('Профили',tog?'до 5':'1')+row('Реклами','0')+row('Premium Sports / Films','по желание',1);
      T.textContent=eur(tog?TOG:SOLO);F.textContent=tog?'При 5 души: по 4,23 € на човек. При плащане за 12 месеца.':'Един профил, само твой. При плащане за 12 месеца.';
      rc.classList.remove('pr');void rc.offsetWidth;if(!rm)rc.classList.add('pr')}
    bs.forEach(function(b,k){b.addEventListener('click',function(){set(k)})});set(1);
  });

  /* КРАЙ I: обръщане с докосване/клавиш на телефон */
  [].forEach.call(document.querySelectorAll('[data-ei] .ei-c'),function(c){
    c.addEventListener('click',function(e){if(e.target.closest('a'))return;c.classList.toggle('fl')});
    c.addEventListener('keydown',function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();c.classList.toggle('fl')}});
  });

  /* КРАЙ J: в N се сменят кадрите на модулите на 5 сек. */
  [].forEach.call(document.querySelectorAll('[data-ej]'),function(g){
    var vs=[].slice.call(g.querySelectorAll('.ej-n video')),i=0,t=0;
    function go(k){vs.forEach(function(v,j){if(j===k){if(!v.src)v.src=v.dataset.tv;v.play().catch(function(){});v.classList.add('on')}else{v.classList.remove('on');setTimeout(function(){v.pause()},900)}})}
    new IntersectionObserver(function(es){es.forEach(function(e){clearInterval(t);if(e.isIntersecting){go(i);if(!rm)t=setInterval(function(){i=(i+1)%vs.length;go(i)},5000)}else vs.forEach(function(v){v.pause()})})},{threshold:.3}).observe(g);
  });
})();
