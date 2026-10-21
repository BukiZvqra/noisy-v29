/* Six small scene timelines. Native images/videos remain the source material. */
(()=>{
 const gsap=window.gsap;if(!gsap)return;
 const cards=[...document.querySelectorAll('.card')],reduced=matchMedia('(prefers-reduced-motion:reduce)');
 const mobile=matchMedia('(max-width:734px)'),scenes=new Map();
 let visible=window.liliCarousel.visible;
 const add=(parent,className,html='')=>{const el=document.createElement('div');el.className=className;el.innerHTML=html;parent.append(el);return el};
 function setup(card){
  card.classList.add('fx-managed');const stage=card.querySelector('.st'),device=card.querySelector('.dv');
  let motion;if(device){motion=add(stage,'fx-device-motion');motion.append(device)}
  const layer=add(stage,'fx-scene-art');layer.setAttribute('aria-hidden','true');
  const timeline=gsap.timeline({paused:true,defaults:{duration:.8,ease:'power3.out'}});
  const text=card.querySelector('.tx');
  timeline.set(text,{opacity:0},0);
  timeline.fromTo(text,{y:22,opacity:0},{y:0,opacity:1,duration:.85,immediateRender:false},.12);
  return {card,stage,device,motion,layer,timeline};
 }
 function share(scene){
  const {layer,timeline:tl,motion}=scene;
  const glow=add(layer,'fx-share-glow');
  tl.set(glow,{opacity:0},0);
  tl.fromTo(motion,{y:70,rotationY:-16,opacity:0},{y:0,rotationY:0,opacity:1,duration:1.2,immediateRender:false},0)
   .fromTo(glow,{scale:.55,opacity:0},{scale:1,opacity:1,duration:1.8,ease:'power2.out',immediateRender:false},.15);
 }
 function arenaPhone(scene){
  const phone=add(scene.stage,'fx-arena-phone',`<img src="img/lili/phone-p.png" alt="" aria-hidden="true"><div class="fx-arena-screen"><video muted loop playsinline preload="none" poster="vid/lili/arena-portrait-v2.jpg" aria-label="Arena: мач, гол и статистика"></video></div><i class="fx-arena-island" aria-hidden="true"></i>`);
  scene.extra=phone;
  const video=phone.querySelector('video');video.dataset.src=video.canPlayType('video/mp4; codecs="avc1.42E01E"')?'vid/lili/arena-portrait-v2.mp4':'vid/lili/arena-portrait-v2.webm';
  scene.timeline.fromTo(phone,{y:36,opacity:0},{y:0,opacity:1,duration:1.1,immediateRender:false},.15);
 }
 function arena(scene){
  if(mobile.matches&&document.body.classList.contains('fx-gradients'))return arenaPhone(scene);
  const {layer,timeline:tl,motion}=scene;
  add(layer,'fx-arena-field','<i class="fx-arena-circle"></i><i class="fx-arena-box left"></i><i class="fx-arena-box right"></i>');
  const lights=add(layer,'fx-arena-lights','<i></i><i></i>');
  const ribbon=add(layer,'fx-arena-ribbon','<span><i></i> Arena</span><b>Играта. От всеки ъгъл.</b>');
  const pulse=add(layer,'fx-arena-pulse');
  tl.set([motion,ribbon,pulse],{opacity:0},0);
  tl.addLabel('lights',0).fromTo(lights,{opacity:0,scaleX:.4},{opacity:.75,scaleX:1,duration:1.15,immediateRender:false},'lights')
   .fromTo(layer.querySelector('.fx-arena-field'),{rotationX:80,y:90,opacity:0},{rotationX:58,y:0,opacity:.5,duration:1.6,immediateRender:false},'lights')
   .fromTo(motion,{y:110,rotationX:24,scale:.82,opacity:0},{y:0,rotationX:0,scale:1,opacity:1,duration:1.4,immediateRender:false},.3)
   .addLabel('impact',1.25).fromTo(pulse,{scale:.3,opacity:.75},{scale:1.4,opacity:0,duration:1.3,immediateRender:false},'impact')
   .fromTo(ribbon,{x:60,opacity:0},{x:0,opacity:1,duration:.8,immediateRender:false},'impact+=.1');
 }
 function week(scene){
  const {layer,timeline:tl,device}=scene;device.hidden=true;
  const board=add(layer,'fx-week-board');
  const days=[['19','ПЕТ','Елиминации','Елиминационен дуел','Битка за спасение'],['18','ЧЕТ','Племенен съвет','Племенен вот'],['17','СРЯ','Номинации и Блатото','Номинационни битки','Ново племе отива в Блатото'],['16','ВТО','Капитански ден','Битка за спасение','Капитанска битка'],['15','ПОН','Териториална битка','Битка за територия','Награди']];
  const tiles=days.map((day,i)=>{
   const tile=add(board,'fx-week-tile',`<video muted loop playsinline preload="none" data-src="vid/lili/week-${i+1}.mp4" poster="vid/lili/week-${i+1}.jpg"></video><div class="fx-week-heading"><strong>${day[0]}</strong><span>${day[1]}<small>СЕПТ.</small></span>${i===0?'<em>Днес</em>':''}</div><b class="fx-week-title">${day[2]}</b><div class="fx-week-events">${day.slice(3).map(t=>`<span>${t}</span>`).join('')}</div>`);
   tile.dataset.day=i;tile.classList.toggle('selected',i===0);tl.set(tile,{opacity:0},0);
   tl.fromTo(tile,{y:65,rotationY:-12,opacity:0},{y:0,rotationY:0,opacity:1,duration:1.05,immediateRender:false},.25+i*.1);return tile;
  });
  const tabs=add(scene.stage,'fx-week-tabs',days.map((d,i)=>`<button type="button" aria-label="${d[0]} септември: ${d[2]}" aria-pressed="${i===0}">${d[0]}<span>${d[1]}</span></button>`).join(''));
  tabs.setAttribute('role','group');tabs.setAttribute('aria-label','Дните от седмицата');scene.extra=tabs;
  [...tabs.children].forEach((b,i)=>b.addEventListener('click',()=>{tiles.forEach((t,j)=>t.classList.toggle('selected',i===j));[...tabs.children].forEach((t,j)=>t.setAttribute('aria-pressed',String(i===j)));window.liliCarousel.refreshPlayback()}));
  const line=add(layer,'fx-week-line','<span>Цялата седмица.</span><b>Един поглед.</b>');
  tl.set(line,{opacity:0},0).fromTo(line,{y:18,opacity:0},{y:0,opacity:1,duration:.8,immediateRender:false},1.1);
 }
 function cast(scene){
  const {timeline:tl,motion}=scene;
  tl.set(motion,{opacity:0},0).fromTo(motion,{y:65,rotationY:-12,opacity:0},{y:0,rotationY:0,opacity:1,duration:1.25,immediateRender:false},.2);
 }
 function moments(scene){
  const {layer,timeline:tl,motion}=scene;
  const track=add(scene.stage,'fx-moment-track','<div class="fx-moment-wire"><b></b></div><div class="fx-moment-nodes"><button type="button"><span aria-hidden="true">😢</span></button><button type="button"><span aria-hidden="true">🌹</span></button><button type="button"><span aria-hidden="true">🔥</span></button><button type="button"><span aria-hidden="true">💃</span></button></div><div class="fx-moment-caption" aria-hidden="true"><b>Признанието</b><span>12:40</span></div>');
  scene.track=track;track.setAttribute('role','group');track.setAttribute('aria-label','Избери момент');
  const nodes=[...track.querySelectorAll('.fx-moment-nodes button')],rows=[...scene.card.querySelectorAll('.jr')];
  nodes.forEach((node,i)=>{node.setAttribute('aria-label',rows[i].textContent.trim());node.addEventListener('click',()=>window.liliCarousel.selectMoment(i))});
  tl.set(track,{opacity:0},0);
  tl.fromTo(motion,{y:95,rotation:-5,opacity:0},{y:0,rotation:0,opacity:1,duration:1.25,immediateRender:false},0)
   .fromTo(track,{y:24,opacity:0},{y:0,opacity:1,duration:.85,immediateRender:false},.65)
   .fromTo(track.querySelector('.fx-moment-wire b'),{scaleX:0},{scaleX:1,duration:1.6,ease:'power2.inOut',immediateRender:false},.8)
   .fromTo(nodes,{y:18,opacity:0},{y:0,opacity:1,stagger:.16,duration:.65,immediateRender:false},.9);
  scene.moment=detail=>{
   nodes.forEach((n,i)=>{n.classList.toggle('selected',i===detail.index);n.setAttribute('aria-pressed',String(i===detail.index))});
   track.querySelector('.fx-moment-caption b').textContent=detail.name;track.querySelector('.fx-moment-caption span').textContent=detail.label;
   scene.feedback?.kill();gsap.set(nodes.map(n=>n.firstElementChild),{scale:1});if(!reduced.matches&&scene.card.classList.contains('on'))scene.feedback=gsap.fromTo(nodes[detail.index].firstElementChild,{scale:.7},{scale:1,duration:.5,ease:'back.out(1.8)'});
  };
  const current=window.liliCarousel.moment;scene.moment({index:current,name:rows[current].querySelector('.n').textContent,label:rows[current].querySelector('.m').textContent});
 }
 function news(scene){
  const {layer,timeline:tl,card}=scene;
  const shutters=add(layer,'fx-news-shutters','<i></i><i></i><i></i><i></i><i></i>');
  const signal=add(layer,'fx-news-signal','<i></i><i></i><i></i><i></i><i></i><span>Твоят поглед към деня.</span>');
  const video=card.querySelector('.full');
  tl.set(shutters.children,{scaleY:1},0).set(signal,{opacity:0},0);
  tl.fromTo(video,{scale:1.12},{scale:1,duration:3,ease:'power2.out',immediateRender:false},0)
   .fromTo(shutters.children,{scaleY:1},{scaleY:0,stagger:.1,duration:1.1,ease:'power3.inOut',immediateRender:false},.1)
   .fromTo(signal,{y:18,opacity:0},{y:0,opacity:1,duration:.8,immediateRender:false},1.35)
   .fromTo(signal.querySelectorAll('i'),{scaleY:.2},{scaleY:1,stagger:.09,duration:.65,immediateRender:false},1.4);
 }
 const builders=[share,arena,week,cast,moments,news];
 function build(){
  for(const scene of scenes.values()){scene.timeline.kill();scene.feedback?.kill();scene.layer.querySelectorAll('video').forEach(v=>v.pause());scene.layer.remove();scene.track?.remove();scene.extra?.querySelectorAll('video').forEach(v=>v.pause());scene.extra?.remove();if(scene.motion){scene.stage.append(scene.device);scene.motion.remove()}}
  scenes.clear();
  cards.forEach((card,i)=>{const scene=setup(card);builders[Number(card.dataset.i)](scene);scenes.set(i,scene);scene.timeline.progress(1).pause()});
  sync(true);window.liliCarousel.refreshPlayback();window.dispatchEvent(new Event('lili:layout'));
 }
 /* Cards that are not current wait in their pre-effect state, so nothing is visible before the entrance plays. */
 function rest(scene){
  scene.timeline.pause();
  if(reduced.matches){scene.timeline.progress(1,true);return}
  if(!scene.primed||scene.timeline.progress()>0){scene.timeline.progress(1,true).progress(0,true);scene.primed=true}
 }
 function sync(restart=false){
  const active=window.liliCarousel.index;
  scenes.forEach((scene,index)=>{
   if(index!==active){scene.feedback?.pause();rest(scene);return}
   if(reduced.matches){scene.timeline.progress(1).pause();return}
   if(!visible||document.hidden){scene.timeline.pause();scene.feedback?.pause();return}
   if(restart)scene.timeline.restart();else scene.timeline.resume();
  });
 }
 window.addEventListener('lili:change',()=>sync(true));
 window.addEventListener('lili:replay',()=>sync(true));
 window.addEventListener('lili:visibility',e=>{visible=e.detail.visible;sync()});
 window.addEventListener('lili:moment',e=>scenes.get(cards.findIndex(card=>card.dataset.i==='4'))?.moment?.(e.detail));
 reduced.addEventListener('change',()=>sync(false));mobile.addEventListener('change',build);
 build();
 window.liliCarousel.refreshPlayback();
 window.liliScenes={seek(index,time){const s=scenes.get(index);if(s)s.timeline.pause(time)},get states(){return [...scenes].map(([index,s])=>({index,progress:s.timeline.progress(),playing:s.timeline.isActive(),duration:s.timeline.duration()}))}};
})();
