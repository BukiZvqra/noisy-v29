import * as THREE from './vendor/fx/three.module.js';

// A continuous textured depth surface: the same creature passes from the
// phone's coordinate system into the foreground. No duplicate/crossfade.
const card=document.querySelector('.fx-dragon'),mount=card.querySelector('.fx-world');
const replay=card.querySelector('.fx-replay'),reduced=matchMedia('(prefers-reduced-motion:reduce)');
const gsap=window.gsap;
async function initScene(){
let renderer;
try{renderer=new THREE.WebGLRenderer({alpha:true,antialias:true,powerPreference:'high-performance'})}catch{replay.hidden=true;return}
renderer.setPixelRatio(Math.min(devicePixelRatio,1.75));
renderer.setClearColor(0,0);renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.1;
mount.append(renderer.domElement);renderer.domElement.setAttribute('aria-hidden','true');
const scene=new THREE.Scene(),camera=new THREE.PerspectiveCamera(32,1,.1,40);
camera.position.set(-.22,.1,13.4);camera.lookAt(-.22,0,0);
scene.add(new THREE.HemisphereLight(0xd3def6,0x16181c,2.1));
function light(color,intensity,x,y,z){const l=new THREE.DirectionalLight(color,intensity);l.position.set(x,y,z);scene.add(l);return l}
light(0xf0f3ff,4,-3,5,5);light(0x7a9ac4,2,4,3,-2);
const world=new THREE.Group();scene.add(world);
const phone=new THREE.Group();world.add(phone);
function rounded(w,h,r){const s=new THREE.Shape(),x=-w/2,y=-h/2;s.moveTo(x+r,y);s.lineTo(x+w-r,y);s.quadraticCurveTo(x+w,y,x+w,y+r);s.lineTo(x+w,y+h-r);s.quadraticCurveTo(x+w,y+h,x+w-r,y+h);s.lineTo(x+r,y+h);s.quadraticCurveTo(x,y+h,x,y+h-r);s.lineTo(x,y+r);s.quadraticCurveTo(x,y,x+r,y);return s}
const body=new THREE.Mesh(new THREE.ExtrudeGeometry(rounded(2.08,4.28,.28),{depth:.105,bevelEnabled:true,bevelSegments:4,steps:1,bevelSize:.035,bevelThickness:.035}),new THREE.MeshStandardMaterial({color:0x86888c,metalness:.6,roughness:.32}));
body.position.z=-.11;phone.add(body);
const rimPoints=rounded(2.04,4.24,.26).getPoints(120).map(p=>new THREE.Vector3(p.x,p.y,.046));const rim=new THREE.LineLoop(new THREE.BufferGeometry().setFromPoints(rimPoints),new THREE.LineBasicMaterial({color:0xd7d9de,transparent:true,opacity:.85}));phone.add(rim);
const glass=new THREE.Mesh(new THREE.ShapeGeometry(rounded(1.99,4.19,.25)),new THREE.MeshPhysicalMaterial({color:0x090b0e,metalness:.2,roughness:.19,clearcoat:1,clearcoatRoughness:.09}));glass.position.z=.04;phone.add(glass);
const plate=document.createElement('video');plate.muted=true;plate.defaultMuted=true;plate.playsInline=true;plate.setAttribute('playsinline','');plate.preload='auto';plate.src='vid/lili/dragon-plate.mp4?v=9';plate.load();
const plateTex=new THREE.VideoTexture(plate);plateTex.colorSpace=THREE.SRGBColorSpace;plateTex.minFilter=plateTex.magFilter=THREE.LinearFilter;plateTex.generateMipmaps=false;
const screen=new THREE.Mesh(new THREE.ShapeGeometry(rounded(1.91,4.09,.22)),new THREE.ShaderMaterial({transparent:false,uniforms:{tex:{value:plateTex},heat:{value:0},ready:{value:0}},vertexShader:`varying vec2 v;void main(){v=vec2((position.x+.955)/1.91,(position.y+2.045)/4.09);gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}`,fragmentShader:`varying vec2 v;uniform sampler2D tex;uniform float heat,ready;void main(){vec3 base=vec3(.018,.023,.032);vec3 film=pow(texture2D(tex,v).rgb,vec3(2.2));float vig=1.-.5*pow(length((v-.5)*vec2(1.,.62)),2.);vec3 col=mix(base,film*vig*1.45,ready);gl_FragColor=vec4(col,1.);
#include <colorspace_fragment>
}`}));screen.position.z=.055;phone.add(screen);
const island=new THREE.Mesh(new THREE.ShapeGeometry(rounded(.57,.125,.062)),new THREE.MeshBasicMaterial({color:0x030405}));island.position.set(0,1.85,.08);phone.add(island);
const cameraLens=new THREE.Mesh(new THREE.CircleGeometry(.025,20),new THREE.MeshStandardMaterial({color:0x203246,roughness:.1,metalness:.8}));cameraLens.position.set(.2,1.85,.085);phone.add(cameraLens);
const bar=new THREE.Mesh(new THREE.ShapeGeometry(rounded(.55,.018,.009)),new THREE.MeshBasicMaterial({color:0xc3c6cb,transparent:true,opacity:.45}));bar.position.set(0,-1.91,.08);phone.add(bar);
for(const y of [.75,1.15]){const key=new THREE.Mesh(new THREE.BoxGeometry(.045,.27,.05),new THREE.MeshStandardMaterial({color:0x74777d,metalness:.8,roughness:.2}));key.position.set(-1.08,y,-.04);phone.add(key)}
const uniforms={map:{value:null},progress:{value:0},time:{value:0},phoneMatrix:{value:new THREE.Matrix4()},phoneInverse:{value:new THREE.Matrix4()},heat:{value:0}};
const surface=new THREE.Mesh(new THREE.PlaneGeometry(6.8,4.533,100,72),new THREE.ShaderMaterial({transparent:true,depthWrite:false,uniforms,vertexShader:`
 uniform float progress,time;uniform mat4 phoneMatrix;varying vec2 vUv;varying vec3 vWorld;
 void main(){vUv=uv;vec3 p=position;
  vec3 start=(phoneMatrix*vec4(p.xy*.8+vec2(1.2,0.),.075,1.)).xyz;
  float head=(1.-smoothstep(.20,.66,uv.x))*smoothstep(.16,.40,uv.y);
  float wing=smoothstep(.45,.76,uv.x)*smoothstep(.46,.70,uv.y);
  vec3 end=p+vec3(-.35,.32,1.05);
  end.z+=head*.85+sin(uv.x*3.14159)*.13;
  end.y+=sin(time*1.25)*.025*head;
  end.z+=sin(time*1.35+.6)*.13*wing;end.x+=sin(time*1.35+.6)*.035*wing;
  float anchor=smoothstep(.63,.99,uv.x)*(1.-smoothstep(.08,.38,uv.y));
  vec3 root=(phoneMatrix*vec4(clamp(p.xy*.8+vec2(1.2,0.),vec2(-.8,-1.7),vec2(.8,1.7)),.075,1.)).xyz;
  end=mix(end,root,anchor*.96);
  vec3 point=mix(start,end,progress);vWorld=point;
  gl_Position=projectionMatrix*modelViewMatrix*vec4(point,1.);
 }`,fragmentShader:`
 uniform sampler2D map;uniform float progress,heat;uniform mat4 phoneInverse;varying vec2 vUv;varying vec3 vWorld;
 void main(){vec4 tex=texture2D(map,vUv);if(tex.a<.006)discard;
  vec3 local=(phoneInverse*vec4(vWorld,1.)).xyz;
  float edge=max(abs(local.x)/.945,abs(local.y)/2.03);
  float aperture=1.-smoothstep(.99,1.01,edge);
  tex.a*=mix(aperture,1.,smoothstep(.12,.42,local.z));
  tex.rgb*=mix(.64,1.06,progress);
  
  tex.a*=smoothstep(.015,.12,vUv.y);
  gl_FragColor=tex;
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
 }`}));surface.renderOrder=2;world.add(surface);
// Restrained contact glow and particles share the 3D scene, not a screen overlay.
const shadow=new THREE.Mesh(new THREE.PlaneGeometry(6,1.4),new THREE.ShaderMaterial({transparent:true,depthWrite:false,uniforms:{strength:{value:.35}},vertexShader:`varying vec2 v;void main(){v=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}`,fragmentShader:`varying vec2 v;uniform float strength;void main(){float a=pow(max(0.,1.-length((v-.5)*vec2(1.,2.))*2.),2.)*strength;gl_FragColor=vec4(0.,0.,0.,a);}`}));shadow.position.set(.2,-2.55,0);world.add(shadow);
const platePlay=()=>{if(!reduced.matches&&active&&visible&&!motionPaused&&!document.hidden&&!plate.ended)plate.play().catch(()=>{})};
let timeline,loaded=false,visible=true,active=false,raf=0,last=0,clock=0,motionPaused=false;
const pointer={x:0,y:0},motion={p:0,heat:0,recoil:0};
function phonePose(){phone.position.set(1.65+motion.recoil*.045,-.18-motion.recoil*.07,-.65);phone.rotation.set(.04+motion.p*.06,-.12-motion.p*.15,-.02-motion.p*.10+motion.recoil*.015);phone.updateMatrixWorld(true);uniforms.phoneMatrix.value.copy(phone.matrix);uniforms.phoneInverse.value.copy(phone.matrix).invert()}
function render(now){raf=0;if(motionPaused||!active||!visible||document.hidden||!loaded)return;const dt=Math.min((now-last)/1000,.04);last=now;if(!reduced.matches)clock+=dt;
 world.rotation.y+=(pointer.x*.035-world.rotation.y)*.05;world.rotation.x+=(-pointer.y*.025-world.rotation.x)*.05;
 phonePose();uniforms.progress.value=motion.p;uniforms.time.value=clock;uniforms.heat.value=motion.heat;screen.material.uniforms.heat.value=motion.heat;
 
 screen.material.uniforms.ready.value=plate.readyState>=2?1:0;
 renderer.render(scene,camera);if(!reduced.matches||timeline?.isActive())raf=requestAnimationFrame(render);
}
function startRendering(){if(!raf){last=performance.now();raf=requestAnimationFrame(render)}}
function entrance(){if(!loaded)return;timeline?.kill();clock=0;motion.p=0;motion.heat=0;motion.recoil=0;plate.pause();try{plate.currentTime=0}catch{}
 card.dataset.phase='screen';
 if(reduced.matches){motion.p=1;card.dataset.phase='settled';try{plate.currentTime=1.2}catch{}startRendering();return}
 timeline=gsap.timeline({defaults:{ease:'power2.inOut'},onComplete:()=>{card.dataset.phase='settled'}})
  .addLabel('inScreen',0).to(motion,{heat:.6,duration:.8},'inScreen')
  .addLabel('breach',.8).call(()=>{card.dataset.phase='breach'},null,'breach')
  .to(motion,{p:.23,duration:1.1,ease:'power2.in'},'breach')
  .to(motion,{heat:1,duration:.8},'breach+=.4')
  .addLabel('emerge',1.9).call(()=>{card.dataset.phase='emerge'},null,'emerge')
  .to(motion,{p:1,duration:2.2,ease:'power3.out'},'emerge')
  .to(motion,{recoil:1,duration:.25,ease:'power2.out'},'emerge')
  .to(motion,{recoil:0,duration:1.3,ease:'power2.out'},'emerge+=.25')
  .to(motion,{heat:.25,duration:2},'emerge+=.7');if(motionPaused)timeline.pause();startRendering();platePlay();
}
function sync(){const next=card.classList.contains('on');if(next&&!active){active=true;entrance()}else if(!next&&active){active=false;timeline?.pause();plate.pause();if(raf)cancelAnimationFrame(raf);raf=0}}
replay.disabled=true;replay.addEventListener('click',()=>{card.classList.add('replaying');entrance();requestAnimationFrame(()=>card.classList.remove('replaying'))});
new MutationObserver(sync).observe(card,{attributes:true,attributeFilter:['class']});
new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;if(visible){if(active&&!motionPaused)timeline?.resume();platePlay();startRendering()}else{timeline?.pause();plate.pause()}},{threshold:.05}).observe(card);
window.addEventListener('lili:pause',e=>{motionPaused=e.detail.paused;if(motionPaused){timeline?.pause();plate.pause();if(raf)cancelAnimationFrame(raf);raf=0}else if(active&&visible&&!document.hidden){timeline?.resume();platePlay();startRendering()}});
document.addEventListener('visibilitychange',()=>{if(document.hidden){timeline?.pause();plate.pause()}else{if(active&&visible&&!motionPaused)timeline?.resume();platePlay();startRendering()}});
card.addEventListener('pointermove',e=>{if(reduced.matches||!matchMedia('(pointer:fine)').matches)return;const r=card.getBoundingClientRect();pointer.x=(e.clientX-r.left)/r.width-.5;pointer.y=(e.clientY-r.top)/r.height-.5});card.addEventListener('pointerleave',()=>{pointer.x=pointer.y=0});
new ResizeObserver(()=>{const w=mount.clientWidth,h=mount.clientHeight;renderer.setSize(w,h,false);camera.aspect=w/h;camera.updateProjectionMatrix();startRendering()}).observe(mount);
reduced.addEventListener('change',()=>{timeline?.kill();motion.p=1;motion.heat=.25;startRendering()});
new THREE.TextureLoader().load('img/fx/dragon-v1.webp',texture=>{texture.colorSpace=THREE.SRGBColorSpace;texture.anisotropy=renderer.capabilities.getMaxAnisotropy();uniforms.map.value=texture;loaded=true;replay.disabled=false;mount.classList.add('ready');sync();if(active)entrance()},undefined,()=>{replay.hidden=true});
// Deterministic review hooks: actual intermediate frames, not just end screenshots.
window.liliFX={seek(time){timeline?.pause(time);startRendering()},get state(){return {loaded,active,visible,progress:motion.p,phase:card.dataset.phase,rendering:!!raf}}};

}
initScene().catch(()=>{replay.hidden=true;mount.classList.remove("ready")});
