/* 20.10 (Коста): фонът на картите е статичен градиент 1:1 по Figma (без видео); цветове от Figma: тюркоаз #0d3434 -> #090a0a, тъмносиньо #03203b -> #090b0d */
/* 19.10 (Коста): добавките по Figma „Add-ons Test“ (node 29600:37204): градиентна карта, таг + заглавие, лога на първенствата/студиата; без снимка */
(function(){var h=document.getElementById('pzx');if(!h)return;var n=0;
 (function t(){var r=h.shadowRoot;if(!r||!r.querySelector('.addon')||!r.querySelector('.tz-c')){if(n++<80)return setTimeout(t,100);return}
  if(r.getElementById('pzaddon'))return;var s=document.createElement('style');s.id='pzaddon';
  s.textContent=`.addon{border-radius:16px!important;border:1px solid rgba(255,255,255,.10)!important;overflow:hidden;background:linear-gradient(90deg,#0d3434 0%,#090a0a 100%)!important}
.addon[data-addon=films]{background:linear-gradient(90deg,#03203b 0%,#090b0d 100%)!important}
.addon .art{display:none!important}
.addon-top{position:relative!important;display:grid!important;grid-template-columns:auto 1fr auto;grid-template-areas:"tag name tog" "price price price";align-items:center;gap:12px 16px;padding:16px 16px 6px!important;min-height:0!important;height:auto!important;background:none!important}
.addon-top::before,.addon-top::after{display:none!important}
.addon-top .tag{grid-area:tag;position:static!important;margin:0!important;width:98px;height:30px}
.addon-text{grid-area:name;position:static!important;display:block!important;padding:0!important;margin:0!important}
.addon-text h3{margin:0!important;font:700 clamp(18px,1.6vw,22px)/1.1 Unbounded,Manrope,sans-serif!important;color:#fff}
.addon-text .group,.addon-text .desc{display:none!important}
.addon .toggle{grid-area:tog;position:static!important;margin:0!important}
.addon .a-price{grid-area:price;position:static!important;margin:0!important;display:flex!important;align-items:baseline;gap:10px}
.addon .a-old{font-size:13px!important}
.addon .a-new{font-size:20px!important}
.addon-bottom{background:none!important;padding:6px 16px 16px!important;border:0!important}
.addon .incl{padding:0!important}
.addon-text{width:auto!important;max-width:none!important;min-width:0!important;flex:none!important}
.addon-text h3{white-space:nowrap!important;width:auto!important}
.addon-top{grid-template-columns:auto minmax(0,1fr) auto!important}
.addon .toggle{align-self:center}
.addon .a-price{flex-wrap:wrap}
.addon-top{grid-template-columns:auto minmax(0,1fr)!important;grid-template-areas:"tag name" "price tog"!important;gap:14px 12px!important}
.addon-text h3{font-size:clamp(17px,1.35vw,20px)!important}
.addon .toggle{justify-self:end}
.addon .a-price{align-items:center!important;gap:2px 10px!important}
.addon .a-old{order:2}
.addon-text,.addon-text h3{margin-left:0!important;padding-left:0!important;text-align:left!important;inset:auto!important;transform:none!important;justify-self:start}
.addon .a-price{justify-content:flex-start!important;text-align:left!important}
.addon .a-old{order:0!important;margin:0!important}
.addon .a-row{margin:0!important}
.addon-top{grid-template-columns:auto minmax(0,1fr)!important;grid-template-areas:"tag name" "price price"!important}
.addon .toggle{position:absolute!important;right:16px;bottom:8px;margin:0!important}
.addon .a-price{padding-right:110px}
.addon .a-price{flex-direction:row!important;width:auto!important;padding:0!important;align-items:baseline!important;justify-content:flex-start!important;margin-left:0!important}
.addon .a-old{font-size:13px!important}
.addon .toggle{height:40px!important;min-height:40px!important;padding:0 14px!important;bottom:10px!important;font-size:14px!important}
.addon .a-new{font-size:19px!important}
.addon-top{grid-template-columns:auto minmax(0,1fr) auto!important;grid-template-areas:"tag name name" "price price tog"!important}
.addon .toggle{position:static!important;align-self:center!important;justify-self:end!important;height:38px!important;min-height:0!important;padding:0 14px!important;margin:0!important;width:auto!important}
`;r.appendChild(s);
  var ts=document.createElement('style');ts.textContent=`.tz-cols{display:grid!important;grid-template-columns:1fr 1fr!important;gap:12px!important;align-items:stretch!important}
@media(max-width:767px){.tz-cols{grid-template-columns:1fr!important}}
.tz-dv{display:none!important}
.tz-c{position:relative!important;overflow:hidden!important;gap:14px!important;padding:16px!important;border-radius:16px!important;border:1px solid rgba(255,255,255,.10)!important;background:linear-gradient(90deg,#0d3434 0%,#090a0a 100%)!important}
.tz-c[data-tz=films]{background:linear-gradient(90deg,#03203b 0%,#090b0d 100%)!important}
.tz-c .tz-sub{display:none!important}
.tz-c .tz-hd{flex-wrap:nowrap!important;gap:10px!important}.tz-c .tz-tag{height:24px!important}.tz-c .tz-hd b{font:700 clamp(15px,1.15vw,18px)/1.1 Unbounded,Manrope,sans-serif!important;white-space:nowrap!important}
.tz-c .tz-lg{margin:0!important;height:24px!important}
.tz-c>.tzv{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;z-index:0;opacity:.5;pointer-events:none}
.tz-c::after{content:"";position:absolute;inset:0;z-index:0;pointer-events:none;background:linear-gradient(90deg,rgba(4,8,8,.86) 0%,rgba(4,8,8,.55) 55%,rgba(4,8,8,.25) 100%)}
.tz-c>.tz-hd,.tz-c>.tz-sub,.tz-c>.tz-lg{position:relative;z-index:1}
`;r.appendChild(ts);var st=document.createElement('style');st.textContent='.addv,.tzv{display:none!important}.addon::after,.tz-c::after{display:none!important}';r.appendChild(st);
  var vs=document.createElement('style');vs.textContent='.addon{position:relative}.addon>.addv{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;z-index:0;opacity:.55;pointer-events:none}.addon::after{content:"";position:absolute;inset:0;z-index:0;pointer-events:none;background:linear-gradient(90deg,rgba(4,8,8,.86) 0%,rgba(4,8,8,.55) 55%,rgba(4,8,8,.25) 100%)}.addon>.addon-top,.addon>.addon-bottom{position:relative;z-index:1}';r.appendChild(vs);
  var VID={sport:'vid/m/arena-sm.mp4',films:'vid/m/theatre-sm.mp4'};
  function vids(){return;r.querySelectorAll('.addon').forEach(function(a){if(a.querySelector('.addv'))return;var k=a.getAttribute('data-addon');if(!VID[k])return;var v=document.createElement('video');v.className='addv';v.src=VID[k];v.muted=true;v.loop=true;v.autoplay=true;v.playsInline=true;v.setAttribute('playsinline','');v.setAttribute('aria-hidden','true');a.insertBefore(v,a.firstChild);var pr=v.play();if(pr&&pr.catch)pr.catch(function(){})})}
  function tzv(){return;r.querySelectorAll('.tz-c').forEach(function(a){if(a.querySelector('.tzv'))return;var k=a.getAttribute('data-tz');var src=k==='sport'?'vid/m/arena-sm.mp4':'vid/m/theatre-sm.mp4';var v=document.createElement('video');v.className='tzv';v.src=src;v.muted=true;v.loop=true;v.autoplay=true;v.playsInline=true;v.setAttribute('playsinline','');v.setAttribute('aria-hidden','true');a.insertBefore(v,a.firstChild);var pr=v.play();if(pr&&pr.catch)pr.catch(function(){})});r.querySelectorAll('.tz-c .tz-hd b').forEach(function(e){if(e.textContent.trim()==='Premium Sport')e.textContent='Premium Sports'})}
  function fix(){vids();tzv();r.querySelectorAll('.tz-c .tz-hd b').forEach(function(e){if(e.textContent.trim()==='Premium Sport')e.textContent='Premium Sports'});r.querySelectorAll('.addon h3').forEach(function(e){if(e.textContent.trim()==='Premium Sport')e.textContent='Premium Sports'})}
  fix();new MutationObserver(fix).observe(r.querySelector('#addons'),{childList:true,subtree:true,characterData:true})})();
})();
