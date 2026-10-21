/* One shared effect for all eight hero studies. No splash, timers or scroll lock. */
(function(){
  'use strict';
  var hero=document.querySelector('.nhero'),root=document.getElementById('mods');
  if(!hero||!root)return;
  var motion=matchMedia('(prefers-reduced-motion:reduce)'),frame=0,animation=0;
  var side=!!hero.querySelector('.ha,.hcc'),dock=!!hero.querySelector('.hx3');
  hero.dataset.aperture=side?'side':dock?'dock':'center';
  hero.classList.add('n-aperture-hero');
  document.body.classList.add('aperture-study');
  // Keep the stacked background scenes in one layer, separate from the controls.
  var dockScene=hero.querySelector('.hx3');
  if(dockScene){
    var sceneLayer=document.createElement('div');sceneLayer.className='hx3-backdrop';
    dockScene.querySelectorAll('.bk,.tint').forEach(function(el){sceneLayer.appendChild(el)});
    dockScene.prepend(sceneLayer);
  }
  var backdrop=document.createElement('div');backdrop.className='na-backdrop';backdrop.setAttribute('aria-hidden','true');
  var originalBackground=hero.querySelector('.hbg');if(originalBackground)backdrop.appendChild(originalBackground);
  hero.prepend(backdrop);
  var aperture=document.createElement('div');
  aperture.className='n-aperture';aperture.setAttribute('aria-hidden','true');
  aperture.dataset.layout=hero.dataset.aperture;
  aperture.innerHTML='<i class="na-well"></i><i class="na-rim"></i><i class="na-cavity"></i><i class="na-solid"><i class="na-edge" style="--d:7"></i><i class="na-edge" style="--d:5"></i><i class="na-edge" style="--d:3"></i><i class="na-edge" style="--d:1"></i><i class="na-face"></i></i>';
  hero.appendChild(aperture);
  var study=hero.dataset.study;
  if(study==='v20'){
    aperture.querySelector('.na-face').innerHTML='<img class="ns-film" src="img/house-of-the-dragon-back.jpg" alt=""><img class="ns-film" src="img/levski-goal.jpg" alt="">';
  }
  function settle(){aperture.style.setProperty('--lift','1');hero.style.setProperty('--arrive','0')}
  var width=0,x=0,y=0;
  function measure(){
    var box=aperture.getBoundingClientRect(),hr=hero.getBoundingClientRect();
    width=box.width;x=box.left-hr.left+box.width/2;y=box.top-hr.top+box.height/2;
    update();
  }
  function update(){
    frame=0;
    var p=parseFloat(root.style.getPropertyValue('--np'))||0;
    // Use a pixel position for the mask: percentage mask positions move the
    // edge rather than the centre when the aperture grows beyond the viewport.
    var t=Math.max(0,Math.min(1,(p-.06)/.8));
    var size=width*Math.pow(Math.max(innerWidth,innerHeight)*9/width,t*t);
    var cx=x+(innerWidth/2-x)*t,cy=y+(innerHeight/2-y)*t;
    hero.style.setProperty('--hole-size',size.toFixed(2)+'px');
    hero.style.setProperty('--hole-x',(cx-size/2).toFixed(2)+'px');
    hero.style.setProperty('--hole-y',(cy-size*104/99.63/2).toFixed(2)+'px');
    hero.classList.toggle('na-opening',!motion.matches&&p>.06);
    if(p>.02&&animation){cancelAnimationFrame(animation);animation=0;settle()}
    // Preserve the existing video-to-carousel sequence after the opening.
    var vid=root.querySelector('.ag-vid');
    if(vid){vid.style.setProperty('mask-image',p<.93?'none':'');vid.style.setProperty('-webkit-mask-image',p<.93?'none':'')}
  }
  function schedule(){if(!frame)frame=requestAnimationFrame(update)}
  function emerge(){
    if(motion.matches)return;
    var start=performance.now();aperture.style.setProperty('--lift','0');hero.style.setProperty('--arrive','1');
    function tick(now){
      var t=Math.min(1,(now-start)/1600),e=1-Math.pow(1-t,4);
      aperture.style.setProperty('--lift',e.toFixed(4));
      hero.style.setProperty('--arrive',(1-e).toFixed(4));
      animation=t<1?requestAnimationFrame(tick):0;
    }
    animation=requestAnimationFrame(tick);
  }
  root.addEventListener('pointermove',function(e){
    if(motion.matches||e.pointerType!=='mouse'||(parseFloat(root.style.getPropertyValue('--np'))||0)>.2)return;
    aperture.style.setProperty('--px',((e.clientX/innerWidth-.5)*8).toFixed(2)+'px');
    aperture.style.setProperty('--py',((e.clientY/innerHeight-.5)*6).toFixed(2)+'px');
    hero.style.setProperty('--drift-x',((e.clientX/innerWidth-.5)*-12).toFixed(2)+'px');
    hero.style.setProperty('--drift-y',((e.clientY/innerHeight-.5)*-8).toFixed(2)+'px');
  },{passive:true});
  root.addEventListener('pointerleave',function(){aperture.style.setProperty('--px','0px');aperture.style.setProperty('--py','0px');hero.style.setProperty('--drift-x','0px');hero.style.setProperty('--drift-y','0px')});
  addEventListener('scroll',schedule,{passive:true});addEventListener('resize',measure);
  function staticMode(){
    if(motion.matches){root.before(hero);hero.classList.add('n-aperture-static')}
    else{root.querySelector('.ag-stick').prepend(hero);hero.classList.remove('n-aperture-static')}
  }
  motion.addEventListener('change',function(){if(animation)cancelAnimationFrame(animation);animation=0;settle();staticMode();measure()});
  document.addEventListener('visibilitychange',function(){if(document.hidden&&animation){cancelAnimationFrame(animation);animation=0;settle()}});
  staticMode();measure();emerge();
})();
