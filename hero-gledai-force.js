/* A material surface built around the real NOISY silhouette. No media assets. */
(function(){
 'use strict';
 var hero=document.querySelector('[data-force]');if(!hero)return;
 var back=hero.querySelector('.na-backdrop'),mark=hero.querySelector('.n-aperture');if(!back||!mark)return;
 var kind=hero.dataset.force,variant={pressure:0,rupture:1,threshold:2}[kind];
 if(kind==='rupture'){
  var plates=document.createElement('div');plates.className='nf-plates';plates.setAttribute('aria-hidden','true');
  for(var k=0;k<3;k++){var piece=document.createElement('div');piece.className='nf-piece nf-piece-'+k;piece.innerHTML='<i class="nf-skin"></i>';plates.appendChild(piece)}
  mark.appendChild(plates);
 }
 var canvas=document.createElement('canvas');canvas.className='nf-canvas';canvas.setAttribute('aria-hidden','true');back.appendChild(canvas);
 var gl=canvas.getContext('webgl',{alpha:false,antialias:false,depth:false,powerPreference:'low-power'});if(!gl){canvas.remove();return}
 var vs='attribute vec2 a;void main(){gl_Position=vec4(a,0.,1.);}';
 var fs=`precision highp float;
 uniform vec2 res,mouse;uniform vec4 mark;uniform float time,variant;
 uniform sampler2D field;
 float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
 float noise(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(hash(i),hash(i+vec2(1.,0.)),f.x),mix(hash(i+vec2(0.,1.)),hash(i+1.),f.x),f.y);}
 float shape(vec2 p){
  vec2 uv=vec2((p.x-mark.x)/mark.z+.5,.5-(p.y-mark.y)/mark.w);
  vec2 outside=max(-uv,uv-1.);float o=max(outside.x,outside.y);
  return (dot(texture2D(field,clamp(uv,0.,1.)).rg,vec2(256.,1.))/257.-.5)*1.6*mark.z/res.y+max(o,0.)*mark.z/res.y;
 }
 float surface(vec2 p){
  float d=shape(p);float wave=sin(d*102.-time*.9)*exp(-abs(d)*15.);
  float bump=(1.-smoothstep(-.045,.015,d))*.073;
  if(variant>.5&&variant<1.5)bump=0.;
  if(variant>1.5)bump=-.09*(1.-smoothstep(-.035,.035,d));
  float warp=noise(p/res.y*3.+vec2(time*.022,-time*.017))-.5;
  return bump+wave*.005+(warp*.015+sin(p.x/res.x*7.+p.y/res.y*2.)*.012)*exp(-max(d,0.)*3.);
 }
 void main(){
  vec2 p=gl_FragCoord.xy;float t=time;
  vec2 uv=p/res,rel=(p-mark.xy)/res.y;float d=shape(p),scale=mark.z/res.y;
  float e=1.25;float dx=(surface(p+vec2(e,0.))-surface(p-vec2(e,0.)))*res.y/(2.*e);
  float dy=(surface(p+vec2(0.,e))-surface(p-vec2(0.,e)))*res.y/(2.*e);
  vec3 n=normalize(vec3(-dx,-dy,1.));
  vec2 mp=(mouse-vec2(.5))*vec2(1.5,1.);
  vec3 l=normalize(vec3(-.7+mp.x,.8+mp.y,.62));
  float diffuse=max(dot(n,l),0.);float spec=pow(max(dot(reflect(-l,n),vec3(0.,0.,1.)),0.),26.);
  float fall=exp(-max(d,0.)*2.2);
  vec3 col=vec3(.025,.023,.032)+vec3(.027,.024,.031)*diffuse*fall;
  col+=vec3(.13,.115,.135)*spec*fall;
  float seam=exp(-abs(d)*res.y*.31);
  float glow=exp(-abs(d)*res.y*.026);
  float sweep=.55+.45*sin(atan(rel.y,rel.x)*2.-t*.35);
  vec3 pink=mix(vec3(.48,.045,.19),vec3(.84,.3,.43),sweep);
  if(variant<.5){
   col+=pink*(seam*.2+glow*.045);
   col+=vec3(.105,.094,.108)*diffuse*fall;
   col+=vec3(.24,.215,.24)*spec*fall;
   col*=.7+.3*exp(-length(rel)*1.4);
   col+=vec3(.04,.015,.025)*exp(-length(rel-vec2(.2,-.18))*4.);
   // Grazing reflections describe the stretched material across the backdrop.
   float ridge=pow(max(0.,sin(uv.x*4.+uv.y*5.+surface(p)*28.)),18.);
   col+=vec3(.032,.026,.036)*ridge*fall;
  }else if(variant<1.5){
   float inside=1.-smoothstep(-.004,.003,d);
   float core=.45+.2*sin(t*.85)+.12*sin(t*1.8);
   col=mix(col,vec3(.63,.075,.22)*(core+.15*noise(rel*9.+t*.06)),inside);
   col+=pink*(seam*.8+glow*.25);
   // Light radiates from the broken seal into the same dark room.
   float angle=atan(rel.y,rel.x);
   float ray=pow(max(0.,sin(angle*19.+noise(vec2(sin(angle),cos(angle))*3.+t*.025)*2.)),18.);
   col+=vec3(.13,.015,.047)*ray*exp(-length(rel)*2.)*smoothstep(.015,.13,d);
  }else{
   // A current in the surrounding space converges on the aperture.
   float r=length(rel),angle=atan(rel.y,rel.x);
   float flow=sin(r*52.+angle*2.+t*.7+noise(rel*3.)*3.);
   float stream=pow(max(0.,flow),20.)*exp(-r*3.)*smoothstep(.005,.09,d);
   col+=vec3(.17,.035,.075)*stream;
   col+=pink*(seam*1.1+glow*.19);
   col*=mix(.18,1.,smoothstep(-.035,.002,d));
   col+=vec3(.13,.025,.065)*exp(-r*r*2.5)*smoothstep(.02,.15,d);
   vec2 grid=rel*170.;vec2 cell=floor(grid);float seed=hash(cell);
   float dust=exp(-length(fract(grid)-.5)*20.)*step(.994,seed);
   col+=vec3(.75,.33,.48)*dust*(.45+.3*sin(t+seed*35.))*smoothstep(.0,.04,d);
  }
  // Material grain, not a separate drifting overlay.
  float grain=(hash(p)-.5)*.009;col+=grain;
  float vignette=1.-.25*pow(length((uv-.5)*vec2(1.,.7)),1.2);col*=vignette;
  gl_FragColor=vec4(max(col,vec3(0.)),1.);
 }`;
 function compile(type,source){var s=gl.createShader(type);gl.shaderSource(s,source);gl.compileShader(s);if(!gl.getShaderParameter(s,gl.COMPILE_STATUS))throw Error(gl.getShaderInfoLog(s));return s}
 var program;
 try{program=gl.createProgram();gl.attachShader(program,compile(gl.VERTEX_SHADER,vs));gl.attachShader(program,compile(gl.FRAGMENT_SHADER,fs));gl.linkProgram(program);if(!gl.getProgramParameter(program,gl.LINK_STATUS))throw Error('N material link');gl.useProgram(program)}catch(e){canvas.remove();return}
 var buffer=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,buffer);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),gl.STATIC_DRAW);var attr=gl.getAttribLocation(program,'a');gl.enableVertexAttribArray(attr);gl.vertexAttribPointer(attr,2,gl.FLOAT,false,0,0);
 // Signed distance texture of the official vector. Generated once, no fetch.
 var points=[[99.63,8.61],[61.24,13.87],[79.21,57.62],[4.93,0],[27.54,57.62],[0,43.54],[24.34,104],[56.48,104],[56.48,80.47],[96.64,86.51],[83.36,63.78],[96.64,71.14]];
 var size=512,data=new Uint8Array(size*size*4);
 for(var y=0;y<size;y++)for(var x=0;x<size;x++){
  var px=(x/(size-1)-.12)/.76*99.63,py=(y/(size-1)-.12)/.76*104,inside=false,dist=1e9;
  for(var i=0,j=points.length-1;i<points.length;j=i++){
   var a=points[j],b=points[i],vx=b[0]-a[0],vy=b[1]-a[1],q=Math.max(0,Math.min(1,((px-a[0])*vx+(py-a[1])*vy)/(vx*vx+vy*vy)));
   dist=Math.min(dist,Math.hypot(px-a[0]-q*vx,py-a[1]-q*vy));if((a[1]>py)!==(b[1]>py)&&px<(b[0]-a[0])*(py-a[1])/(b[1]-a[1])+a[0])inside=!inside;
  }
  var value=Math.max(0,Math.min(65535,Math.round((.5+(inside?-dist:dist)/99.63*.76/1.6)*65535))),at=(y*size+x)*4;
  data[at]=value>>8;data[at+1]=value&255;data[at+2]=0;data[at+3]=255;
 }
 var texture=gl.createTexture();gl.bindTexture(gl.TEXTURE_2D,texture);gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,size,size,0,gl.RGBA,gl.UNSIGNED_BYTE,data);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.LINEAR);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE);
 var loc={};['res','mark','time','mouse','variant'].forEach(function(k){loc[k]=gl.getUniformLocation(program,k)});gl.uniform1f(loc.variant,variant);
 var motion=matchMedia('(prefers-reduced-motion:reduce)'),fine=matchMedia('(hover:hover) and (pointer:fine)'),visible=true,lost=false,raf=0,last=0,elapsed=0,mx=.7,my=.7,tx=.7,ty=.7;
 function measure(){
  var r=hero.getBoundingClientRect(),b=mark.getBoundingClientRect(),dpr=Math.min(devicePixelRatio||1,innerWidth<761?1:1.25);
  canvas.width=Math.round(r.width*dpr);canvas.height=Math.round(r.height*dpr);gl.viewport(0,0,canvas.width,canvas.height);
  // The field includes a 12% pad on each edge; the visible N matches the SVG.
  gl.uniform2f(loc.res,canvas.width,canvas.height);gl.uniform4f(loc.mark,(b.left-r.left+b.width/2)*dpr,(r.height-(b.top-r.top+b.height/2))*dpr,b.width/.76*dpr,b.height/.76*dpr);
 }
 function draw(){if(lost)return;gl.uniform1f(loc.time,motion.matches?4:elapsed);gl.uniform2f(loc.mouse,mx,my);gl.drawArrays(gl.TRIANGLES,0,6)}
 function frame(now){raf=0;if(!visible||document.hidden||motion.matches||lost)return;if(!last)last=now;var delta=Math.min((now-last)/1000,.07);if(delta>=(fine.matches?1/45:1/30)){elapsed+=delta;last=now;mx+=(tx-mx)*.08;my+=(ty-my)*.08;draw()}raf=requestAnimationFrame(frame)}
 function sync(){if(raf)cancelAnimationFrame(raf);raf=0;last=0;if(!lost&&visible&&!document.hidden){if(motion.matches)draw();else raf=requestAnimationFrame(frame)}}
 var interaction=hero.closest('.ag-root')||hero.parentElement;
 interaction.addEventListener('pointermove',function(e){if(!visible||!fine.matches||motion.matches||e.pointerType!=='mouse')return;var r=hero.getBoundingClientRect();if(e.clientY<r.top||e.clientY>r.bottom)return;tx=(e.clientX-r.left)/r.width;ty=1-(e.clientY-r.top)/r.height},{passive:true});
 interaction.addEventListener('pointerleave',function(){tx=.7;ty=.7});
 new IntersectionObserver(function(es){visible=es[0].isIntersecting;sync()}).observe(hero);
 document.addEventListener('visibilitychange',sync);motion.addEventListener('change',function(){requestAnimationFrame(function(){measure();draw();sync()})});
 var resize=0;addEventListener('resize',function(){cancelAnimationFrame(resize);resize=requestAnimationFrame(function(){measure();draw()})});
 canvas.addEventListener('webglcontextlost',function(e){e.preventDefault();lost=true;hero.classList.remove('nf-ready');sync()});
 // Keep the CSS mark as the stable fallback if GPU rendering is unavailable.
 measure();draw();hero.classList.add('nf-ready');sync();
})();
