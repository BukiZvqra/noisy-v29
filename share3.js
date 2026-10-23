/* Цени v3 (ceni-share3.html): като v2 плюс избор на човечетата (профили, пет екрана, кастинг), нови добавки с превключвател
   и нови варианти долу (7 два плана, 8 таблица). Цени v2: спокоен цикъл без паузи и без изгасване. На всеки 1,7 сек. влиза още един човек (2 → 5),
   „Сподели“ стои, сменя се само втората дума, а „на човек“ се сменя меко. След петима страничните
   меко се прибират и цикълът продължава от двама (7,6 сек. на кръг). Цените са по Pricing Policy. */
(function(){
  var c=document.querySelector('[data-shr]');if(!c)return;
  var rm=matchMedia('(prefers-reduced-motion:reduce)').matches;
  var av=c.querySelector('.shr-av'),S=[].slice.call(av.querySelectorAll('.s')),ph=c.querySelector('[data-ph]'),pt=c.querySelector('[data-pt]');
  var SLOT=[0,1,-1,2,-2],STEP=1700,T=[],on=false;
  var W={2:'мача.',3:'сериала.',4:'вечерта.',5:'сметката.'};
  var PP={2:12.45,3:8.30,4:6.23,5:4.98},pp=c.querySelector('[data-pp]'),cur=12.45,raf=0;
  var eur=function(v){return v.toFixed(2).replace('.',',')+' €'};
  /* цената на човек се отброява меко: 1,3 сек., easeInOutCubic, с лек blur в средата на движението */
  function count(to){var from=cur,t0=performance.now(),d=1300;cur=to;cancelAnimationFrame(raf);
    (function f(t){var q=Math.min(1,(t-t0)/d),e=q<.5?4*q*q*q:1-Math.pow(-2*q+2,3)/2;pp.textContent=eur(from+(to-from)*e);
      pp.style.filter='blur('+(Math.sin(Math.PI*q)*1.2).toFixed(2)+'px)';if(q<1)raf=requestAnimationFrame(f);else pp.style.filter=''})(t0)}
  function sp(){return parseFloat(getComputedStyle(av).getPropertyValue('--sp'))||.72}
  function x(i){return SLOT[i]*S[1].offsetWidth*sp()}
  /* кастинг 4-8: рамката стои на мястото си, ефектът е вътре (класът .on) */
  function fxm(){return +c.getAttribute('data-h')>=4}
  function show(i){var s=S[i],k=SLOT[i],from=k?x(i)-Math.sign(k)*S[1].offsetWidth*.45:0;
    if(fxm()){s.classList.remove('out','on');s.style.transition='none';s.style.filter='none';s.style.opacity='1';s.style.transform='translateX('+x(i)+'px)';
      void s.offsetWidth;s.style.transition='';requestAnimationFrame(function(){requestAnimationFrame(function(){s.classList.add('on')})});return}
    s.classList.add('on');
    s.classList.remove('out');s.style.transition='none';s.style.opacity='0';s.style.filter='blur(8px)';
    s.style.transform='translateX('+from+'px) scale('+(k?.88:.84)+')';void s.offsetWidth;s.style.transition='';
    s.style.opacity='1';s.style.filter='blur(0)';s.style.transform='translateX('+x(i)+'px) scale(1)'}
  function hide(i){var s=S[i],k=SLOT[i];s.classList.remove('on');if(fxm()){T.push(setTimeout(function(){s.style.opacity='0'},650));return}s.classList.add('out');s.style.opacity='0';s.style.filter='blur(8px)';
    s.style.transform='translateX('+(x(i)-Math.sign(k)*S[1].offsetWidth*.45)+'px) scale(.88)'}
  var mw=0;function maxW(){if(mw)return mw;Object.keys(W).forEach(function(k){var t=document.createElement('span');t.className='shw in';t.style.cssText='position:absolute;visibility:hidden;white-space:nowrap';
    t.textContent=W[k];ph.appendChild(t);mw=Math.max(mw,t.getBoundingClientRect().width);t.remove()});return mw}
  addEventListener('resize',function(){mw=0});
  function word(t){var old=ph.querySelectorAll('.shw:not(.go)');[].forEach.call(old,function(o){o.classList.remove('in');o.classList.add('go');setTimeout(function(){o.remove()},900)});
    var w=document.createElement('span');w.className='shw';w.textContent=t;ph.appendChild(w);
    /* ширината на думата се анимира, затова фразата остава в средата, а „Сподели“ се плъзга меко */
    ph.style.width=(c.getAttribute('data-t')==='2'?maxW():w.getBoundingClientRect().width)+'px';
    requestAnimationFrame(function(){requestAnimationFrame(function(){w.classList.add('in')})})}
  function per(k){return;count(PP[k]);pt.classList.add('fd');T.push(setTimeout(function(){pt.textContent='24,90 € за '+k+' души';pt.classList.remove('fd')},450))}
  function at(ms,fn){T.push(setTimeout(fn,ms))}
  /* ритъм: 1 един по един (2-3-4-5), 2 по двама (2-4-5), 3 симетрично по двама (3-5); keep = кои остават между кръговете */
  var RH={1:{g:[[0,1],[2],[3],[4]],keep:[0,1]},2:{g:[[0,1],[2,3],[4]],keep:[0,1]},3:{g:[[0,1,2],[3,4]],keep:[0]}};
  function rh(){return RH[c.getAttribute('data-r')]||RH[1]}
  /* цената: ефектът се изиграва ВЕДНЪЖ, когато влезе петият, после цената стои; 3 = точките следват хората, цената стои */
  var prx=[c.querySelector('.shd-pr'),c.querySelector('.shd-t')],pdone=false,dots=[].slice.call(c.querySelectorAll('.shd-dots i'));
  function pIn(){prx.forEach(function(e,i){setTimeout(function(){e.classList.add('pin')},i*180)})}
  function pReset(){pdone=false;prx.forEach(function(e){e.classList.remove('pin')})}
  function dotsTo(n){dots.forEach(function(d,i){d.classList.toggle('on',i<n)})}
  var scl=[].slice.call(c.querySelectorAll('.shd-sc [data-n]')),pcur=5;
  function chipTxt(n){return '24,90 € ÷ '+n+(n===1?' човек':' души')}
  function odo(v){var s=v.toFixed(2).replace('.',''),d=(s.length<4?' ':'')+s;
    if(!pp.querySelector('.sho')){pp.innerHTML='';[0,1,'c',2,3,'e'].forEach(function(k){var e=document.createElement('span');
      if(k==='c'){e.className='sho-s';e.textContent=','}else if(k==='e'){e.className='sho-s';e.textContent='\u00a0€'}
      else{e.className='sho';var st=document.createElement('span');st.className='sho-st';st.textContent=' 0123456789'.split('').join('\n');e.appendChild(st)}pp.appendChild(e)})}
    [].forEach.call(pp.querySelectorAll('.sho-st'),function(st,i){var ch=d[i],k=ch===' '?0:+ch+1;st.style.transform='translateY('+(-k*1.1)+'em)'})}
  function setPer(n,now){if(n<2)return;pcur=n;var C=c.getAttribute('data-c'),v=PP[n];
    scl.forEach(function(e){e.classList.toggle('on',+e.getAttribute('data-n')===n)});
    if(C==='6'){odo(v);swap(pt,chipTxt(n),now);return}
    if(C==='5'){swap(pp,eur(v),now);swap(pt,chipTxt(n),now)}}
  function swap(el,t,now){if(el.textContent===t)return;if(now){el.textContent=t;return}el.classList.add('sw');
    setTimeout(function(){el.textContent=t;el.classList.remove('sw')},220)}
  function perReset(){var C=c.getAttribute('data-c');if(C!=='6'&&pp.querySelector('.sho'))pp.textContent=eur(4.98);
    if(C!=='5'&&C!=='6'){pp.textContent=eur(4.98);pt.textContent='24,90 € на месец за до 5 души'}scl.forEach(function(e){e.classList.toggle('on',e.getAttribute('data-n')==='5')})}
  function priceAt(n){dotsTo(n);setPer(n);if(n===5&&!pdone){pdone=true;pIn()}}
  function step(k){word(W[k]);per(k);priceAt(k)}
  function cycle(first){var R=rh(),G=R.g,n=0;
    G.forEach(function(g,gi){n+=g.length;var k=n;at(gi*STEP,function(){
      g.forEach(function(i,j){if(gi===0&&!first&&R.keep.indexOf(i)>-1)return;at(first&&gi===0?j*200:0,function(){show(i)})});step(k)})});
    var end=(G.length-1)*STEP+2500,out=[0,1,2,3,4].filter(function(i){return R.keep.indexOf(i)<0}).reverse();
    at(end,function(){out.forEach(function(i,j){at(j*120,function(){hide(i)})});at(650,function(){dotsTo(R.keep.length);setPer(R.keep.length)})});
    at(end+900,function(){cycle(false)})}
  var vis=false;
  function still(){S.forEach(function(s,i){s.classList.remove('out');s.classList.add('on');s.style.transition='none';s.style.filter='none';s.style.opacity='1';s.style.transform='translateX('+x(i)+'px)'});
    ph.innerHTML='';var w=document.createElement('span');w.className='shw in';w.textContent=W[5];ph.appendChild(w);ph.style.width=(c.getAttribute('data-t')==='2'?maxW():w.getBoundingClientRect().width)+'px';
    dotsTo(5);setPer(5,1);if(!pdone){pdone=true;pIn()}}
  function start(){if(on)return;on=true;if(c.getAttribute('data-h')==='9'){still();return}S.forEach(function(s){s.style.transition='none';s.style.opacity='0'});ph.innerHTML='';cycle(true)}
  function stop(){on=false;T.forEach(clearTimeout);T=[]}
  function restart(){stop();S.forEach(function(s){s.classList.remove('on','out')});start()}
  function finalState(){still()}
  /* превключватели за прегледа: горе A/B/C, долу 1/2/3 */
  var bd=[].slice.call(c.querySelectorAll('.shv [data-d]')),bs=[].slice.call(c.querySelectorAll('.shv [data-s]'));
  function set(d,s,save){if(d)c.setAttribute('data-d',d);if(s)c.setAttribute('data-s',s);
    bd.forEach(function(b){b.setAttribute('aria-pressed',b.getAttribute('data-d')===c.getAttribute('data-d'))});
    bs.forEach(function(b){b.setAttribute('aria-pressed',b.getAttribute('data-s')===c.getAttribute('data-s'))});
    S.forEach(function(s,i){if(s.style.opacity==='1'){s.style.transition='none';s.style.transform='translateX('+x(i)+'px)';void s.offsetWidth;s.style.transition=''}});
    if(save)try{history.replaceState(null,'','#'+c.getAttribute('data-d')+c.getAttribute('data-s')+(c.getAttribute('data-p')==='m'?'m':'')+'h'+c.getAttribute('data-h')+'f'+c.getAttribute('data-f')+'r'+c.getAttribute('data-r')+'c'+c.getAttribute('data-c')+'t'+c.getAttribute('data-t')+'+'+c.getAttribute('data-a'))}catch(e){}}
  bd.forEach(function(b){b.addEventListener('click',function(){set(b.getAttribute('data-d'),null,1)})});
  var bp=[].slice.call(c.querySelectorAll('.shv [data-p]'));
  function setP(v){c.setAttribute('data-p',v);bp.forEach(function(b){b.setAttribute('aria-pressed',b.getAttribute('data-p')===v)});
    if(v==='s'){cancelAnimationFrame(raf);pp.style.filter='';pp.textContent=eur(4.98);cur=4.98;pt.textContent='24,90 € на месец за до 5 души'}}
  bp.forEach(function(b){b.addEventListener('click',function(){setP(b.getAttribute('data-p'))})});
  bs.forEach(function(b){b.addEventListener('click',function(){set(null,b.getAttribute('data-s'),1)})});
  /* добавките: балонче с добавяне (сумите в сепаратора се отброяват плавно) или само информация */
  var ba=[].slice.call(c.querySelectorAll('.shv [data-a]')),adds=[].slice.call(c.querySelectorAll('.sha-1 .sha-c')),
      tots=[].slice.call(c.querySelectorAll('[data-tot]')),p5s=[].slice.call(c.querySelectorAll('[data-pp5]')),p5=p5s[0],sw=[].slice.call(c.querySelectorAll('.shn input'));
  /* цените не се движат: новата сума се показва веднага */
  function tween(el,from,to){el.textContent=eur(to)}
  function addSum(){return adds.reduce(function(a,b){return a+(b.getAttribute('aria-pressed')==='true'?parseFloat(b.getAttribute('data-add')):0)},0)}
  function swSum(){return sw.reduce(function(a,b){return a+(b.checked?parseFloat(b.getAttribute('data-add')):0)},0)}
  function totals(){var A=c.getAttribute('data-a'),s=A==='1'?addSum():A==='3'?swSum():0;
    tots.forEach(function(el){var base=parseFloat(el.getAttribute('data-tot')),from=parseFloat(el.getAttribute('data-cur')||base),to=Math.round((base+s)*100)/100;
      el.setAttribute('data-cur',to);if(Math.abs(from-to)>.001)tween(el,from,to,900)});
    var f5=parseFloat(p5.getAttribute('data-cur')||4.98),t5=Math.round((24.90+s)/5*100)/100;p5s.forEach(function(el){el.setAttribute('data-cur',t5);if(Math.abs(f5-t5)>.001)tween(el,f5,t5,900)})}
  sw.forEach(function(b){b.addEventListener('change',totals)});
  [].forEach.call(c.querySelectorAll('.v10-o input'),function(r){r.addEventListener('change',function(){c.setAttribute('data-v10',r.value)})});c.setAttribute('data-v10','t');
  adds.forEach(function(b){b.addEventListener('click',function(){b.setAttribute('aria-pressed',b.getAttribute('aria-pressed')!=='true');totals()})});
  function setA(v){c.setAttribute('data-a',v);ba.forEach(function(b){b.setAttribute('aria-pressed',b.getAttribute('data-a')===v)});totals()}
  ba.forEach(function(b){b.addEventListener('click',function(){setA(b.getAttribute('data-a'))})});
  setA(c.getAttribute('data-a')||'0');
  var bh=[].slice.call(c.querySelectorAll('.shv [data-h]'));
  function save(){try{history.replaceState(null,'','#'+c.getAttribute('data-d')+c.getAttribute('data-s')+(c.getAttribute('data-p')==='m'?'m':'')+'h'+c.getAttribute('data-h')+'f'+c.getAttribute('data-f')+'r'+c.getAttribute('data-r')+'c'+c.getAttribute('data-c')+'t'+c.getAttribute('data-t')+'+'+c.getAttribute('data-a'))}catch(e){}}
  function setH(v){c.setAttribute('data-h',v);c.classList.toggle('cast',+v>=3);c.classList.toggle('still',v==='9');S.forEach(function(s){if(s.style.opacity==='1'){s.style.filter='none';s.classList.add('on')}});bh.forEach(function(b){b.setAttribute('aria-pressed',b.getAttribute('data-h')===v)});
    S.forEach(function(s,i){if(s.style.opacity==='1'){s.style.transition='none';s.style.transform='translateX('+x(i)+'px)';void s.offsetWidth;s.style.transition=''}})}
  bh.forEach(function(b){b.addEventListener('click',function(){var was=c.getAttribute('data-h');setH(b.getAttribute('data-h'));if((was==='9')!==(b.getAttribute('data-h')==='9')&&vis)restart();if(c.getAttribute('data-c')==='2'){pReset();setTimeout(function(){pdone=true;pIn()},350)}save()})});
  var bf=[].slice.call(c.querySelectorAll('.shv [data-f]'));
  function setF(v){c.setAttribute('data-f',v);bf.forEach(function(b){b.setAttribute('aria-pressed',b.getAttribute('data-f')===v)})}
  bf.forEach(function(b){b.addEventListener('click',function(){setF(b.getAttribute('data-f'));save()})});
  var br=[].slice.call(c.querySelectorAll('.shv [data-r]')),bc=[].slice.call(c.querySelectorAll('.shv [data-c]'));
  function setR(v,go){c.setAttribute('data-r',v);br.forEach(function(b){b.setAttribute('aria-pressed',b.getAttribute('data-r')===v)});if(go&&on)restart()}
  function setC(v,go){c.setAttribute('data-c',v);bc.forEach(function(b){b.setAttribute('aria-pressed',b.getAttribute('data-c')===v)});
    perReset();setPer(pcur,1);if(go){pReset();if(v!=='3')setTimeout(function(){pdone=true;pIn()},350)}}
  br.forEach(function(b){b.addEventListener('click',function(){setR(b.getAttribute('data-r'),1);save()})});
  var bt=[].slice.call(c.querySelectorAll('.shv [data-t]'));
  function setT(v){c.setAttribute('data-t',v);bt.forEach(function(b){b.setAttribute('aria-pressed',b.getAttribute('data-t')===v)});
    var w=ph.querySelector('.shw:not(.go)');if(w)ph.style.width=(v==='2'?maxW():w.getBoundingClientRect().width)+'px'}
  bt.forEach(function(b){b.addEventListener('click',function(){setT(b.getAttribute('data-t'));save()})});
  bc.forEach(function(b){b.addEventListener('click',function(){setC(b.getAttribute('data-c'),1);save()})});
  ba.forEach(function(b){b.addEventListener('click',save)});bp.forEach(function(b){b.addEventListener('click',save)});
  /* адрес: #a7h5f1r2c2+3 = горе A, долу 7, човечета 5, нови лица, ритъм 2, цена 2, добавки 3; по-старите адреси също работят */
  var m=/^#([abcd])([1-9]|1[0-3])(m?)(?:h([0-9]))?(?:f([01]))?(?:r([1-3]))?(?:c([0-7]))?(?:t([1-6]))?(?:\+([0-3]))?$/.exec(location.hash);
  set(m?m[1]:c.getAttribute('data-d'),m?m[2]:c.getAttribute('data-s'));setP('s');
  setH(m&&m[4]?m[4]:c.getAttribute('data-h'));setF(m&&m[5]?m[5]:c.getAttribute('data-f'));setR(m&&m[6]?m[6]:c.getAttribute('data-r'));setC(m&&m[7]?m[7]:c.getAttribute('data-c'));setT(m&&m[8]?m[8]:c.getAttribute('data-t'));if(m&&m[9])setA(m[9]);
  /* панелът с вариантите: бутон „Варианти“ отваря/затваря; на компютър е отворен по подразбиране */
  (function(){var pv=c.querySelector('.shv');if(!pv)return;pv.id='shv';var tg=document.createElement('button');tg.type='button';tg.className='shv-tg';tg.setAttribute('aria-controls','shv');
    document.body.appendChild(tg);var de=document.documentElement;
    function op(o){de.classList.toggle('shv-open',o);tg.setAttribute('aria-expanded',o);
      tg.innerHTML='<svg viewBox="0 0 24 24" aria-hidden="true">'+(o?'<path d="M6 6l12 12M18 6 6 18"/>':'<path d="M4 7h16M4 12h16M4 17h10"/>')+'</svg>'+(o?'Скрий вариантите':'Варианти')}
    tg.addEventListener('click',function(){op(!de.classList.contains('shv-open'))});
    addEventListener('keydown',function(e){if(e.key==='Escape'&&de.classList.contains('shv-open')&&innerWidth<1100)op(false)});
    op(matchMedia('(min-width:1100px)').matches)})();
  if(rm||!('IntersectionObserver' in window)){finalState();return}
  new IntersectionObserver(function(e){vis=e[0].isIntersecting;vis?start():stop()},{threshold:.3}).observe(av);
  addEventListener('resize',function(){S.forEach(function(s,i){if(s.style.opacity==='1')s.style.transform='translateX('+x(i)+'px)'})});
})();
