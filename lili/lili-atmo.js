/* Атмосфера за всяка карта: лъчове, мъгла, прах и детайли по темата. Чист CSS слой, без влияние върху сцените. */
(()=>{
 const cards=[...document.querySelectorAll('.card')];
 if(!cards.length)return;
 const mobile=matchMedia('(max-width:734px)');
 let seed=7;const rnd=()=>{seed=(seed*16807)%2147483647;return(seed-1)/2147483646};
 const r=(a,b)=>a+rnd()*(b-a);
 const f=n=>Math.round(n*100)/100;

 /* прах: n частици в зоната [x0..x1]% × [y0..y1]%, летят нагоре (или надолу при dir=-1) */
 function dust(n,{x=[0,100],y=[30,100],c='#ffffffcc',dir=1,rise=[80,200],size=[1.5,3.2]}={}){
  let h='';
  for(let i=0;i<n;i++){
   const s=r(size[0],size[1]);
   h+=`<i style="--x:${f(r(x[0],x[1]))}%;--y:${f(r(y[0],y[1]))}%;--s:${f(s)}px;--c:${c};--b:${s<2?0:.6}px;--o:${f(r(.35,.85))};--d:${f(r(9,18))}s;--dl:-${f(r(0,18))}s;--dx:${f(r(-26,26))}px;--dy:${f(-dir*r(rise[0],rise[1]))}px"></i>`;
  }
  return `<div class="atmo-dust">${h}</div>`;
 }
 function bokeh(n,{x=[0,100],y=[0,100],c='#ffffff',size=[26,70],o=[.2,.5]}={}){
  let h='';
  for(let i=0;i<n;i++){
   h+=`<i style="--x:${f(r(x[0],x[1]))}%;--y:${f(r(y[0],y[1]))}%;--s:${f(r(size[0],size[1]))}px;--c:${c};--b:${f(r(2,6))}px;--o:${f(r(o[0],o[1]))};--d:${f(r(6,13))}s;--dl:-${f(r(0,10))}s;--dx:${f(r(-12,12))}px;--dy:${f(r(-22,-6))}px"></i>`;
  }
  return `<div class="atmo-bokeh">${h}</div>`;
 }
 const beam=(x,rot,c,w,t,dl)=>`<i class="atmo-beam" style="--x:${x}%;--r:${rot}deg;--c:${c};${w?`--w:${w}%;`:''}--t:${t}s;--dl:-${dl}s"></i>`;
 const haze=(hx,hc)=>`<div class="atmo-haze" style="--hx:${hx}%;--hc:${hc}"></div>`;
 const vig='<div class="atmo-vig"></div>';
 const n=()=>mobile.matches?.55:1;
 const cnt=k=>Math.round(k*n());

 /* 0 · Изрежи и сподели: розова светлина, рамки за изрязване, лента на времето */
 const share=()=>
  haze(70,'#ce13a81c')+
  beam(80,-14,'#ff5fc41f',46,10,0)+beam(60,10,'#ce13a81a',38,13,4)+
  `<i class="atmo-crop" style="--x:56%;--y:18%;--w:24%;--h:50%;--dl:0s"></i><i class="atmo-crop" style="--x:70%;--y:34%;--w:17%;--h:38%;--l:#ffffff55;--dl:-3s"></i>`+
  `<i class="atmo-ticks" style="--by:12%"></i>`+
  dust(cnt(30),{x:[48,96],y:[35,100],c:'#ff9bdcd9'})+bokeh(cnt(7),{x:[45,95],y:[10,80],c:'#ff5fc4',o:[.18,.4]})+vig;

 /* 1 · Arena: светлини на стадиона над съществуващия терен */
 const arena=()=>
  haze(62,'#8ad6c116')+
  `<div class="atmo-flood"><i style="--x:50%;--s:30px"></i><i style="--x:58%;--s:22px;--dl:-2s"></i><i style="--x:66%;--s:34px;--dl:-4s"></i><i style="--x:76%;--s:24px;--dl:-1s"></i><i style="--x:86%;--s:30px;--dl:-5s"></i></div>`+
  dust(cnt(26),{x:[44,98],y:[10,90],c:'#c8f2f8c4',rise:[40,120]})+vig;

 /* 2 · Showtime (седмицата): топла студийна светлина, LED плочки */
 const week=()=>
  haze(50,'#ffd9a014')+
  beam(18,-9,'#ffd9a03a',38,11,0)+beam(50,0,'#fff1d430',34,14,3)+beam(82,9,'#ffd9a03a',38,12,6)+
  `<i class="atmo-slats"></i>`+
  dust(cnt(30),{x:[0,100],y:[8,100],c:'#ffe7bcd0',rise:[60,160]})+bokeh(cnt(7),{x:[4,96],y:[2,30],c:'#ffd9a0',o:[.15,.36]})+vig;

 /* 3 · Theatre: сцена със завеси и топъл прожектор върху телефона */
 const theatre=()=>
  haze(72,'#ffb86b14')+
  `<i class="atmo-curtain l"></i><i class="atmo-curtain r"></i>`+
  beam(72,-4,'#ffcf9438',48,12,0)+beam(60,12,'#ff9a6a1a',36,15,5)+
  `<i class="atmo-foot"></i>`+
  dust(cnt(32),{x:[52,92],y:[10,100],c:'#ffd7a6dd',rise:[50,150]})+vig;

 /* 4 · Моменти: лилав здрач, плейхед и орбити като маркерите на лентата */
 const moments=()=>
  haze(26,'#b46bff14')+
  beam(30,-10,'#c58bff30',40,11,0)+beam(8,8,'#ff5fc42a',34,14,5)+
  `<i class="atmo-ticks" style="--by:10%"></i><i class="atmo-playhead"></i>`+
  bokeh(cnt(10),{x:[0,60],y:[8,90],c:'#d78bff',o:[.16,.4],size:[24,64]})+
  dust(cnt(26),{x:[0,64],y:[25,100],c:'#e7c4ffcc'})+vig;

 /* 5 · Newsroom: студен син растер, светлинна лента, сканиране */
 const news=()=>
  `<i class="atmo-grid"></i>`+
  haze(34,'#9fd0ff14')+
  beam(12,-8,'#9fd0ff22',40,10,0)+beam(40,6,'#cfe8ff18',34,13,4)+
  `<i class="atmo-sweep"></i><i class="atmo-scan"></i>`+
  dust(cnt(22),{x:[0,100],y:[0,60],c:'#bfe1ffcc',dir:-1,rise:[60,160],size:[1.2,2.4]})+vig;

 const builders=[share,arena,week,theatre,moments,news];
 function build(){
  seed=7;
  cards.forEach((card,i)=>{
   card.querySelector(':scope > .atmo')?.remove();
   const el=document.createElement('div');el.className='atmo';el.setAttribute('aria-hidden','true');
   el.innerHTML=builders[i]();
   const st=card.querySelector(':scope > .st');
   card.insertBefore(el,st);
  });
 }
 build();
 mobile.addEventListener('change',build);
 window.addEventListener('lili:pause',e=>document.documentElement.classList.toggle('fx-paused',!!e.detail.paused));
})();
