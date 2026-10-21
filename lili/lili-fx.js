/* One owner for selection, playback and accessible navigation. */
(()=>{
 const rail=document.getElementById('rail'),cards=[...rail.querySelectorAll('.card')];
 const reduced=matchMedia('(prefers-reduced-motion:reduce)'),dots=document.getElementById('dots');
 const cardLabels=['Изрежи и сподели','Arena','Седмицата','Актьорите','Моментите','Newsroom'];
 const names=cards.map(card=>cardLabels[Number(card.dataset.i)]);
 const replay=document.getElementById('fx-run');
 function replayState(){replay.disabled=false}
 let current=-1,visible=true,scrollTimer,motionPaused=false;
 const pauseButton=document.getElementById('fx-pause');
 function setPaused(value){motionPaused=value;pauseButton.setAttribute('aria-pressed',String(value));pauseButton.setAttribute('aria-label',value?'Продължи движението':'Спри движението');pauseButton.textContent=value?'Продължи':'Пауза';window.dispatchEvent(new CustomEvent('lili:pause',{detail:{paused:value}}));playback()}
 pauseButton.addEventListener('click',()=>setPaused(!motionPaused));
 for(const [index,file] of [[0,'phone-p.png'],[1,'phone-l.png']]){
  const device=cards[index].querySelector('.dv'),img=document.createElement('img');
  img.src='img/lili/'+file;img.alt='';img.setAttribute('aria-hidden','true');
  img.style.cssText='position:absolute;inset:0;width:100%;height:100%';device.prepend(img);
 }
 const buttons=cards.map((c,i)=>{
  const button=document.createElement('button');button.type='button';button.setAttribute('aria-label',names[i]);
  button.addEventListener('click',()=>go(i));dots.append(button);
  c.setAttribute('aria-roledescription','слайд');c.setAttribute('aria-label',`${i+1} от ${cards.length}: ${names[i]}`);
  return button;
 });
 function fitRail(){
  if(!document.body.classList.contains('fx-gradients'))return;
  rail.style.height=matchMedia('(max-width:734px)').matches?(cards[Math.max(0,current)].getBoundingClientRect().height+24)+'px':'';
 }
 function fit(){const scale=cards[0].getBoundingClientRect().width/1260;cards.forEach(c=>c.querySelector('.st').style.setProperty('--k',scale));fitRail()}
 function playback(){
  const playing=visible&&!document.hidden&&!motionPaused;
  cards.forEach((c,i)=>c.querySelectorAll('video').forEach(v=>{
   if(i===current&&playing&&v.getClientRects().length>0&&(!reduced.matches)&&(!v.closest('.fx-week-tile')||!matchMedia('(max-width:734px)').matches||v.closest('.fx-week-tile').classList.contains('selected'))){if(!v.getAttribute('src'))v.src=v.dataset.src;v.play().catch(()=>{})}else v.pause();
  }));
  window.dispatchEvent(new CustomEvent('lili:visibility',{detail:{visible:playing}}));
 }
 function select(index){
  if(index===current)return;current=index;
  cards.forEach((c,i)=>{const active=i===index;c.classList.toggle('on',active);c.inert=!active;c.setAttribute('aria-hidden',String(!active));buttons[i].classList.toggle('on',active);if(active)buttons[i].setAttribute('aria-current','true');else buttons[i].removeAttribute('aria-current')});
  document.getElementById('pv').disabled=index===0;document.getElementById('nx').disabled=index===cards.length-1;
  document.getElementById('fx-current').textContent=`${String(index+1).padStart(2,'0')} / ${String(cards.length).padStart(2,'0')} · ${names[index]}`;
  replayState();fitRail();playback();window.dispatchEvent(new CustomEvent('lili:change',{detail:{index}}));
 }
 function closest(){const step=cards[1].offsetLeft-cards[0].offsetLeft;return Math.max(0,Math.min(cards.length-1,Math.round(rail.scrollLeft/step)))}
 function go(index){rail.scrollTo({left:cards[index].offsetLeft-cards[0].offsetLeft,behavior:reduced.matches?'instant':'smooth'})}
 rail.addEventListener('scroll',()=>{clearTimeout(scrollTimer);scrollTimer=setTimeout(()=>select(closest()),90)},{passive:true});
 rail.addEventListener('scrollend',()=>select(closest()));
 document.getElementById('pv').addEventListener('click',()=>go(Math.max(0,current-1)));
 document.getElementById('nx').addEventListener('click',()=>go(Math.min(cards.length-1,current+1)));
 rail.addEventListener('keydown',e=>{
  if(e.target!==rail||!['ArrowLeft','ArrowRight','Home','End'].includes(e.key))return;e.preventDefault();
  go(e.key==='Home'?0:e.key==='End'?cards.length-1:Math.max(0,Math.min(cards.length-1,current+(e.key==='ArrowRight'?1:-1))));
 });
 replay.addEventListener('click',()=>{
  if(motionPaused)setPaused(false);
  {cards[current].querySelectorAll('video').forEach(v=>{if(v.readyState)v.currentTime=0});window.dispatchEvent(new CustomEvent('lili:replay',{detail:{index:current}}));playback()}
 });
 new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;playback()},{threshold:.1}).observe(rail);
 document.addEventListener('visibilitychange',playback);reduced.addEventListener('change',playback);addEventListener('resize',()=>{fit();playback()});fit();select(0);document.fonts.ready.then(fitRail);
 window.addEventListener('lili:layout',fitRail);
 const video=document.getElementById('jvv'),momentCard=video.closest('.card');
 const markers=[...momentCard.querySelectorAll('.jm')],rows=[...momentCard.querySelectorAll('.jr')];
 const hint=document.getElementById('jtm'),fill=momentCard.querySelector('.jfill');
 const labels=['12:40','27:15','31:05','48:20'];let moment=0,userTime=0;
 function seek(index,byUser){
  moment=index;if(!video.getAttribute('src'))video.src=video.dataset.src;
  const jump=()=>{video.currentTime=Number(markers[index].dataset.t);if(!motionPaused&&!reduced.matches&&visible&&!document.hidden&&momentCard.classList.contains('on'))video.play().catch(()=>{})};
  if(video.readyState<1)video.addEventListener('loadedmetadata',jump,{once:true});else jump();
  markers.forEach((m,i)=>{m.classList.toggle('on',i===index);m.setAttribute('aria-pressed',String(i===index))});
  rows.forEach((r,i)=>{r.classList.toggle('on',i===index);r.setAttribute('aria-pressed',String(i===index))});
  hint.style.left=markers[index].style.left;hint.textContent=labels[index];if(byUser)userTime=Date.now();
  window.dispatchEvent(new CustomEvent('lili:moment',{detail:{index,label:labels[index],name:rows[index].querySelector('.n').textContent}}));
 }
 markers.forEach((m,i)=>m.addEventListener('click',()=>seek(i,true)));rows.forEach((r,i)=>r.addEventListener('click',()=>seek(i,true)));
 video.addEventListener('timeupdate',()=>{fill.style.width=video.currentTime/(video.duration||103.72)*100+'%'});
 setInterval(()=>{if(!motionPaused&&!reduced.matches&&momentCard.classList.contains('on')&&visible&&!document.hidden&&Date.now()-userTime>=8000)seek((moment+1)%markers.length,false)},4200);
 window.addEventListener('lili:change',()=>{if(momentCard.classList.contains('on'))seek(moment,false)});
 hint.style.left=markers[0].style.left;
 const compact=matchMedia('(max-width:1023px)');
 // Compact screens use the separate full-size moment controls; phone rows are a visual preview.
 function momentAccess(){
  momentCard.querySelector('.jmarkers').inert=compact.matches;momentCard.querySelector('.jl').inert=compact.matches;
  rows.filter(row=>row.tagName!=='BUTTON').forEach(row=>{if(compact.matches){row.removeAttribute('role');row.removeAttribute('tabindex')}else{row.setAttribute('role','button');row.tabIndex=0}});
 }
 rows.filter(row=>row.tagName!=='BUTTON').forEach(row=>row.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();row.click()}}));
 compact.addEventListener('change',momentAccess);momentAccess();
 window.liliCarousel={go,refreshPlayback:playback,selectMoment(index){seek(index,true)},get index(){return current},get visible(){return visible&&!document.hidden&&!motionPaused},get paused(){return motionPaused},get moment(){return moment}};
})();
