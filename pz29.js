/* 21.10 (Коста): секцията с цените пооправена: добавките с цена и избор с едно натискане, обща карта с цената и бутона, какво е включено и какво не.
   Не пипа прототипа pz22.js: чете състоянието от него и смята по същата формула като calc() (добавките за целия период, когато е повече от 1 месец). */
(function(){var h=document.getElementById('pzx');if(!h)return;var tries=0;
 (function t(){var r=h.shadowRoot;if(!r||!r.querySelector('.tz-c')||!r.querySelector('.addon')||!r.getElementById('app')||!r.querySelector('.cta21')){if(tries++<100)return setTimeout(t,100);return}
  if(r.getElementById('p29'))return;
  var $=function(s,p){return(p||r).querySelector(s)},$$=function(s,p){return[].slice.call((p||r).querySelectorAll(s))};
  var BASE={ind:14.90,ff:24.90},AB={sport:14.60,films:7.60},DISC={1:0,3:.10,12:.15},NAME={sport:'Premium Sports',films:'Premium Films'};
  var f2=function(x){return Math.floor(x*100+1e-6)/100},r2=function(x){return Math.round(x*100)/100};
  var eur=function(n){return n.toFixed(2).replace('.',',')+' €'};
  var per=function(m){return m===1?'1 месец':m+' месеца'};
  function state(){var ff=$('#app').dataset.plan==='ff',pb=$('#periodSeg button[aria-checked="true"]'),cb=$('#counts .count[aria-checked="true"]');
   return{ff:ff,m:pb?+pb.dataset.period:1,n:ff&&cb?+cb.dataset.n:1,on:{sport:$('.addon[data-addon=sport]').classList.contains('is-on'),films:$('.addon[data-addon=films]').classList.contains('is-on')}}}
  function calc(s){var d=DISC[s.m],mo=f2(BASE[s.ff?'ff':'ind']*(1-d));var plan={old:r2(BASE[s.ff?'ff':'ind']*s.m),now:r2(mo*s.m),mo:mo};
   var add={},tot=plan.now;
   for(var k in AB){var months=s.m>1?s.m:1,dd=s.m>1?.15:.10,pm=r2(AB[k]*(1-dd));add[k]={pm:pm,old:r2(AB[k]*months),now:r2(pm*months),base:AB[k],months:months};if(s.on[k])tot+=add[k].now}
   return{plan:plan,add:add,total:r2(tot),perMonth:r2(tot/s.m)}}
  var st=document.createElement('style');st.id='p29';
  st.textContent=`
.tz-h{font:700 18px/1.3 Unbounded,Manrope,sans-serif!important;color:#fff!important;margin:0 0 14px!important}
.tz>.note{display:none!important}
.tz-c{cursor:pointer;text-align:left;transition:border-color .25s,transform .25s}
.tz-c:focus-visible{outline:2px solid #fff;outline-offset:2px}
.tz-c[aria-pressed=true]{border-color:#fff!important}
.p29-pr{position:relative;z-index:1;display:flex;flex-wrap:wrap;align-items:flex-end;justify-content:space-between;gap:10px 12px;margin-top:6px}
.p29-pr .v{display:grid;gap:2px}
.p29-pr .l1{display:flex;flex-wrap:wrap;align-items:baseline;gap:2px 8px}
.p29-pr b{font:700 22px/1.1 Unbounded,Manrope,sans-serif;color:#fff}
.p29-pr .u{font-size:15px;color:#c8c8d0}
.p29-pr s{font-size:15px;color:#9a9aa3}
.p29-pr .pp{font-size:15px;color:#c8c8d0}
.p29-btn{flex:none;display:inline-flex;align-items:center;justify-content:center;gap:8px;min-height:44px;padding:0 16px;border-radius:980px;border:1.5px solid rgba(255,255,255,.55);background:rgba(10,9,13,.35);color:#fff;font:800 15px Manrope,sans-serif;white-space:nowrap}
.tz-c[aria-pressed=true] .p29-btn{background:#fff;color:#16131a;border-color:#fff}
#p29-inc{margin-top:12px;border-radius:16px;border:1px solid rgba(255,255,255,.10);background:#0f0e12;padding:18px}
#p29-inc h4{margin:0 0 12px;font:700 15px Manrope,sans-serif;letter-spacing:.06em;text-transform:uppercase;color:#b4aebd}
.p29-cols{display:grid;grid-template-columns:1fr;gap:18px}
@media(min-width:768px){.p29-cols{grid-template-columns:1fr 1fr}}
#p29-inc ul{list-style:none;margin:0;padding:0;display:grid;gap:8px}
#p29-inc li{position:relative;padding-left:28px;font-size:16px;color:#fff}
#p29-inc li::before{content:"";position:absolute;left:3px;top:6px;width:12px;height:7px;border-left:2px solid #5fe0b0;border-bottom:2px solid #5fe0b0;transform:rotate(-45deg)}
#p29-inc .no li{color:#b4aebd}
#p29-inc .no li::before{border:0;transform:none;left:3px;top:12px;width:12px;height:2px;background:#8a8494}
#p29-inc .no li b{color:#fff}
#p29-sum{width:100%;box-sizing:border-box;margin-top:12px;padding:22px 20px 20px;border-radius:16px;border:1px solid rgba(255,255,255,.16);background:radial-gradient(80% 130% at 100% 0%,rgba(92,20,56,.6) 0%,rgba(92,20,56,0) 62%),radial-gradient(60% 110% at 0% 100%,rgba(20,40,70,.55) 0%,rgba(20,40,70,0) 65%),#0e0d11}
.p29-rows{margin-bottom:6px}
.p29-r{display:flex;justify-content:space-between;align-items:baseline;gap:12px;padding:10px 0;border-bottom:1px solid rgba(255,255,255,.10);font-size:16px}
.p29-r small{display:block;font-size:15px;color:#b4aebd}
.p29-r span:last-child{font-weight:800;white-space:nowrap;text-align:right}
.p29-r s{font-weight:500;color:#9a9aa3;margin-right:6px}
.p29-tot{display:grid;gap:6px;justify-items:start}
.p29-tot .lab{font:700 15px Manrope,sans-serif;letter-spacing:.06em;text-transform:uppercase;color:#b4aebd}
.p29-tot .what{font:700 clamp(18px,2.4vw,22px)/1.25 Unbounded,Manrope,sans-serif;color:#fff}
.p29-tot .pr{display:flex;flex-wrap:wrap;align-items:center;gap:6px 16px;margin-top:6px}
.p29-tot .big{font:700 clamp(40px,8vw,56px)/1 Unbounded,Manrope,sans-serif;color:#fff;white-space:nowrap}
.p29-tot .side{display:grid;gap:6px;justify-items:start}
.p29-tot .u{font-size:16px;color:#d6d2dd}
.p29-tot .pp{display:inline-block;padding:6px 12px;border-radius:980px;background:rgba(255,255,255,.1);font:700 15px Manrope,sans-serif;color:#fff}
.p29-tot .sub{font-size:16px;color:#d6d2dd}
#p29-sum .cta21{margin:18px 0 0!important;padding:0!important;width:100%!important;max-width:none!important}
#p29-sum .cta21 .btn,#p29-sum .cta21 button{width:100%!important;max-width:none!important;min-height:56px!important}
:host([data-p29="1"]) #p29-inc,:host([data-p29="1"]) .p29-rows{display:none}
:host([data-p29="2"]) #p29-inc{display:none}
/* 4: лента, която остава видима отдолу, докато избираш */
:host([data-p29="4"]) #p29-inc,:host([data-p29="4"]) .p29-rows{display:none}
:host([data-p29="4"]) #p29-sum{width:100%;box-sizing:border-box;position:sticky;bottom:12px;z-index:30;display:flex;flex-wrap:wrap;align-items:center;gap:12px 20px;padding:14px 18px;box-shadow:0 14px 44px rgba(0,0,0,.65);border-color:rgba(255,255,255,.22)}
:host([data-p29="4"]) .p29-tot{flex:1 1 300px;padding-top:0;gap:2px}
:host([data-p29="4"]) .p29-tot .lab,:host([data-p29="4"]) .p29-tot .what{display:none}
:host([data-p29="4"]) .p29-tot .pr{margin:0}
:host([data-p29="4"]) .p29-tot .big{font-size:clamp(30px,5vw,40px)}
:host([data-p29="4"]) .p29-tot .sub{font-size:15px}
:host([data-p29="4"]) #p29-sum .cta21{flex:0 0 240px;margin:0!important;width:auto!important}
@media(max-width:560px){:host([data-p29="4"]) #p29-sum .cta21{flex:1 1 100%}}
/* 5: две колони: отляво избираш, отдясно сметката те следва */
@media(min-width:1024px){
:host([data-p29="5"]) .stage{grid-template-columns:minmax(0,1100px)!important}
:host([data-p29="5"]) #p1{padding-left:32px!important;padding-right:32px!important}
:host([data-p29="5"]) #p1 .wrap{zoom:1!important;max-width:1040px!important;display:grid!important;grid-template-columns:minmax(0,1.45fr) minmax(340px,1fr);column-gap:28px;row-gap:20px;align-items:start;justify-items:stretch}
:host([data-p29="5"]) #p1 .wrap>*{grid-column:1}
:host([data-p29="5"]) #p1 .wrap>#p29-sum{grid-column:2;grid-row:1 / span 6;position:sticky;top:96px;margin-top:0}
:host([data-p29="5"]) #p1 .wrap>#t-plan{text-align:left}
:host([data-p29="5"]) #p1 .wrap>#planSwitch{justify-self:start}
:host([data-p29="5"]) #p29-inc{display:none}
}
/* 6: всичко в една карта */
:host([data-p29="6"]) #p29-inc{display:none}
:host([data-p29="6"]) .plan-card #tz{background:transparent!important;padding:0!important;margin:0!important;border:0!important}
:host([data-p29="6"]) .plan-card #p29-sum{margin-top:0;background:rgba(6,5,8,.55);border-color:rgba(255,255,255,.14)}
:host([data-p29="6"]) .plan-card .tz-h{margin-top:0!important}
`;
  r.appendChild(st);
  var tz=$('#tz');
  $('.tz-h',tz).textContent='Не е включено в плана. Добави, ако искаш:';
  var inc=document.createElement('div');inc.id='p29-inc';
  var sum=document.createElement('div');sum.id='p29-sum';
  sum.innerHTML='<div class="p29-rows"></div><div class="p29-tot"></div>';
  tz.after(sum);tz.after(inc);
  sum.appendChild($('.cta21'));
  $$('.tz-c',tz).forEach(function(c){var k=c.dataset.tz;c.setAttribute('role','button');c.setAttribute('tabindex','0');c.setAttribute('aria-pressed','false');c.setAttribute('aria-label',NAME[k]);
   var pr=document.createElement('div');pr.className='p29-pr';pr.innerHTML='<span class="v"></span><span class="p29-btn"></span>';c.appendChild(pr);
   var go=function(e){if(e.type==='keydown'&&e.key!==' '&&e.key!=='Enter')return;e.preventDefault();$('.addon[data-addon='+k+'] .toggle').click()};
   c.addEventListener('click',go);c.addEventListener('keydown',go)});
  function sync(){var s=state(),c=calc(s);
   /* добавките се плащат за целия период, една цена за всичко */
   if(s.m>1)['sport','films'].forEach(function(k){if(s.on[k]){var b=$('.addon[data-addon='+k+'] .billing button[data-bill=period]');if(b&&b.getAttribute('aria-checked')!=='true'&&!b.disabled){b.click()}}});
   ['sport','films'].forEach(function(k){var tile=$('.tz-c[data-tz='+k+']'),a=c.add[k];tile.setAttribute('aria-pressed',String(s.on[k]));
    $('.v',tile).innerHTML='<span class="l1"><b>+'+eur(a.pm)+'</b><span class="u">/ мес.</span><s>'+eur(a.base)+'</s></span>'+(s.ff&&s.n>1?'<span class="pp">'+eur(f2(a.pm/s.n))+' на човек</span>':'');
    $('.p29-btn',tile).textContent=s.on[k]?'✓ Добавено':'+ Добави'});
   var who=s.ff?'Together за '+s.n+' души':'Solo';
   var rows='<div class="p29-r"><span>'+who+'<small>'+per(s.m)+'</small></span><span>'+(c.plan.old!==c.plan.now?'<s>'+eur(c.plan.old)+'</s>':'')+eur(c.plan.now)+'</span></div>';
   var names=[(s.ff?'Together':'Solo')+(s.ff?' · '+s.n+' души':'')];
   ['sport','films'].forEach(function(k){if(s.on[k]){var a=c.add[k];rows+='<div class="p29-r"><span>'+NAME[k]+'<small>'+per(a.months)+'</small></span><span><s>'+eur(a.old)+'</s>'+eur(a.now)+'</span></div>';names.push(NAME[k])}});
   $('.p29-rows',sum).innerHTML=rows;
   $('.p29-tot',sum).innerHTML='<span class="lab">Твоят абонамент</span><span class="what">'+names.join(' + ')+'</span><div class="pr"><span class="big">'+eur(c.perMonth)+'</span><span class="side"><span class="u">на месец</span>'+(s.ff?'<span class="pp">'+eur(f2(c.perMonth/s.n))+' на човек</span>':'')+'</span></div><span class="sub">Плащаш '+eur(c.total)+' за '+per(s.m)+'</span>';
   var yes=['Arena, Theatre, Showtime и Newsroom','Без реклами','Телефон, браузър и телевизор','14 дни връщане на парите',s.ff?'До 5 профила, плаща един':'Един профил, само твой'],no=[];
   ['films','sport'].forEach(function(k){var a=c.add[k];if(s.on[k])yes.push('<b>'+NAME[k]+'</b> (добавено)');else no.push('<b>'+NAME[k]+'</b>: +'+eur(a.pm)+' на месец')});
   if(!s.ff)no.push('Втори профил. Има го в <b>Together</b>');
   inc.innerHTML='<div class="p29-cols"><div><h4>Какво получаваш</h4><ul>'+yes.map(function(x){return'<li>'+x+'</li>'}).join('')+'</ul></div><div><h4>Какво не получаваш</h4><ul class="no">'+(no.length?no.map(function(x){return'<li>'+x+'</li>'}).join(''):'<li>Нищо не липсва</li>')+'</ul></div></div>'}
  r.addEventListener('click',function(){setTimeout(sync,40)},true);r.addEventListener('keydown',function(){setTimeout(sync,40)},true);
  function apply(){var v=h.dataset.p29,card=$('#planCard'),hh=$('#hhWrap');
   if(v==='6'){if(tz.parentNode!==card){card.appendChild(hh);card.appendChild(tz);card.appendChild(sum)}}
   else if(tz.parentNode===card){card.after(hh);hh.after(tz);tz.after(inc);inc.after(sum)}}
  new MutationObserver(apply).observe(h,{attributes:true,attributeFilter:['data-p29']});
  apply();sync();window.__p29sync=sync;
 })();
})();
