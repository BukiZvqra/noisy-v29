/* NOISY v21 · Цени: прототипът „Абонамент“ 1:1 (Solo / Together) само стъпка 1 + пакетите за информация, без чекаут, в shadow DOM. Генерира се от _tools/build_pz21.py. */
(() => {
  const HOST = document.getElementById('pzx'); if (!HOST) return;
  const SR = HOST.attachShadow({ mode: 'open' });
  SR.innerHTML = "<style>\n:host{\n  --bg:#181818; --surface:#212121; --surface-2:#323232; --text:#FBFBFB; --text-2:#CCCCCC;\n  --muted:#999999; --subtle:#666666; --line:rgba(71,71,71,.5); --pink:#CE13A8; --pink-light:#DF34BD;\n  --purple:#8C18BE; --btn:#F1F1F1; --ink:#1E1E1E; --danger:#FF4D5E;\n  --grad:linear-gradient(90deg,#B61DFF 0%,#CE13A8 33%,#FF0000 100%);\n  --grad-dim:linear-gradient(90deg,rgba(182,29,255,.15) 0%,rgba(206,19,168,.15) 33%,rgba(255,0,0,.15) 100%);\n  --sel:linear-gradient(90deg,rgba(140,24,190,.15) 0%,rgba(160,16,118,.15) 33%,rgba(194,4,6,.15) 100%);\n  --stroke:linear-gradient(90deg,#8C18BE 0%,#A01076 33%,#C20406 100%);\n  --panel:linear-gradient(-8deg,#2D2D2D 7.5%,#131313 73%,#131313 111%);\n  --ease:cubic-bezier(.22,.8,.2,1); --spring:cubic-bezier(.3,1.3,.5,1);\n  --sans:\"Manrope\",system-ui,-apple-system,\"Segoe UI\",Roboto,sans-serif;\n  --display:\"Unbounded\",\"Manrope\",system-ui,sans-serif;\n  color-scheme:dark;\n  box-sizing:border-box;\n  display:block;\n}\n*,*::before,*::after{box-sizing:inherit}\nbutton{font:inherit;color:inherit;cursor:pointer;-webkit-appearance:none;appearance:none}\nbutton:disabled{cursor:default}\n:focus-visible{outline:2px solid var(--pink-light);outline-offset:2px}\nh1,h2,h3,p{margin:0}\n.sr{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}\n\n/* ---------- shell ---------- */\n.app{position:relative;height:100%;max-width:560px;margin:0 auto;display:flex;flex-direction:column;overflow:hidden}\n.d-only{display:none !important}\n\n/* mobile app bar */\n.m-bar{flex-shrink:0;background:var(--bg);position:relative;z-index:5}\n.m-row{position:relative;height:64px;display:flex;align-items:center;justify-content:space-between;padding:8px 10px;overflow:hidden}\n.m-row::before{content:\"\";position:absolute;left:-30px;top:-34px;width:120px;height:110px;background:radial-gradient(closest-side,rgba(206,19,168,.35),rgba(194,4,6,.12) 60%,transparent);pointer-events:none}\n.m-title{position:relative;font:700 16px/24px var(--sans);letter-spacing:.15px}\n.icon-btn{position:relative;width:48px;height:48px;border:0;background:none;border-radius:100px;display:grid;place-items:center;transition:opacity .25s,background .2s}\n.icon-btn:active{background:rgba(255,255,255,.06)}\n.icon-btn[aria-disabled=\"true\"]{opacity:.35}\n.steps{display:flex;gap:2px;padding:24px 16px 8px}\n.step{flex:1;display:flex;flex-direction:column;align-items:center;gap:8px;border:0;background:none;padding:0;color:#474747;font:400 12px/16px var(--sans);letter-spacing:.5px;transition:color .35s}\n.step.is-current{color:#fff}\n.step:disabled{cursor:default}\n.bar{width:100%;height:2px;border-radius:8px;background:#474747;overflow:hidden}\n.bar i{--n:1;--k:0;display:block;height:100%;transform:scaleX(0);transform-origin:left;transition:transform .6s var(--ease);\n  /* each segment shows its own slice of one gradient that spans the full line (segments + 2px gaps) */\n  background:var(--stroke);background-size:calc(var(--n) * 100% + (var(--n) - 1) * 2px) 100%;\n  background-position:calc(var(--k) / max(var(--n) - 1, 1) * 100%) 0}\n.step.is-done .bar i,.step.is-current .bar i{transform:scaleX(1)}\n\n/* stage + panels (mobile: sliding steps) */\n.stage{position:relative;flex:1;min-height:0;overflow:hidden;overflow:clip}\n.left-bg{display:none}\n.panel{position:absolute;inset:0;overflow-x:hidden;overflow-y:auto;overscroll-behavior:contain;-webkit-overflow-scrolling:touch;\n  padding:24px 16px 290px;display:flex;flex-direction:column;align-items:center;gap:32px;\n  transform:translateX(104%);opacity:0;pointer-events:none;\n  transition:transform .55s var(--ease),opacity .45s ease}\n.panel.is-active{transform:none;opacity:1;pointer-events:auto}\n.panel.is-past{transform:translateX(-26%);opacity:0}\n#p3{padding-bottom:230px}\n.wrap{width:100%;display:flex;flex-direction:column;gap:32px;align-items:center}\n.h2{font:700 22px var(--sans);text-align:center}\n/* Bulgarian typesetting: hyphenate running copy only, never headings, labels, prices or buttons */\n.benefits p,.desc,.r-sub,.note,.hint,.shared-price,.promo-msg{-webkit-hyphens:auto;hyphens:auto;hyphenate-limit-chars:7 3 3;-webkit-hyphenate-limit-before:3;-webkit-hyphenate-limit-after:3}\n.headline,.r-title,.h2,.h3,.plan-name,.addon h3,.row-title,.btn,.seg button,.method,.p-pp{-webkit-hyphens:manual;hyphens:manual}\n.headline,.r-title,.p-pp,.desc{text-wrap:balance}\n.benefits p,.r-sub{text-wrap:pretty}\n.h3{font:700 16px var(--sans);letter-spacing:.15px}\n\n/* ---------- switch ---------- */\n.switch{position:relative;display:grid;grid-template-columns:1fr 1fr;width:100%;height:36px;padding:2px;border-radius:1000px;background:var(--surface)}\n.switch-thumb{position:absolute;top:2px;bottom:2px;left:2px;width:calc(50% - 2px);border-radius:1000px;background:#fff;transition:transform .5s var(--spring)}\n.switch[data-v=\"ff\"] .switch-thumb{transform:translateX(100%)}\n.switch button{position:relative;z-index:1;border:0;background:none;border-radius:1000px;display:flex;align-items:center;justify-content:center;gap:4px;font:500 12px/13px var(--sans);color:#fff;white-space:nowrap;transition:color .3s}\n.switch button[aria-checked=\"true\"]{color:var(--ink)}\n.switch .tick{width:15px;height:15px;color:var(--pink);transform:scale(0);opacity:0;transition:transform .35s var(--spring),opacity .2s;margin-right:-19px}\n.switch button[aria-checked=\"true\"] .tick{transform:scale(1);opacity:1;margin-right:0}\n\n/* ---------- plan card ---------- */\n.plan-card{position:relative;width:100%;display:flex;flex-direction:column;gap:32px;padding:24px 16px;border:1px solid transparent;border-radius:14px;overflow:hidden;\n  background:radial-gradient(60% 60% at 100% 0%,rgba(206,19,168,.5) 0%,rgba(155,14,126,.375) 25%,rgba(103,10,84,.25) 50%,rgba(0,0,0,0) 100%) padding-box,\n             radial-gradient(68% 68% at 1% 2%,rgba(140,24,190,.5) 0%,rgba(70,12,95,.25) 50%,rgba(0,0,0,0) 100%) padding-box,\n             linear-gradient(180deg,#1A1A1B 0%,#101011 49.5%,#0B0B0C 90%) padding-box,\n             var(--stroke) border-box}\n/* plan switch: quick clean crossfade (no blur), card height glides, tiny stagger on the way in */\n.swap{transition:opacity .26s cubic-bezier(.2,.7,.2,1),transform .32s cubic-bezier(.2,.7,.2,1)}\n.plan-name.swap{transition-delay:0s}\n.headline.swap{transition-delay:.02s}\n.price-col.swap{transition-delay:.04s}\n.benefits.swap{transition-delay:.06s}\n.plan-card.is-swapping .swap{opacity:0;transform:translateY(4px);transition-duration:.12s;transition-timing-function:ease-out;transition-delay:0s}\n.people .av-2,.people .av-4{transition-delay:.02s}\n.people .av-1,.people .av-5{transition-delay:.04s}\n.plan-name{font:400 16px/23px var(--display);color:var(--pink-light)}\n.plan-grid{display:grid;grid-template-columns:1fr auto;column-gap:9px;grid-template-areas:\"people price\" \"headline price\" \"benefits benefits\";margin-top:-16px}\n.people{grid-area:people;position:relative;width:190px;height:61px;margin-bottom:9px;transition:width .45s var(--ease)}\n.people .av{position:absolute;transition:transform .45s var(--spring),opacity .3s,left .45s var(--ease)}\n.people .av svg{display:block;width:100%;height:100%}\n.people .av .sil,.people .av .plus{transform-box:view-box;transform-origin:30px 30px;transition:opacity .25s ease,transform .4s var(--spring)}\n.people .av .plus{opacity:0;transform:scale(.4) rotate(-90deg)}\n.people .av.is-empty{opacity:.4}\n.people .av.is-empty .sil{opacity:0;transform:scale(.6)}\n.people .av.is-empty .plus{opacity:1;transform:none}\n.people.solo{width:60px}\n.people.solo .av:not(.av-c){transform:scale(.2);opacity:0}\n.people.solo .av-c{left:0 !important}\n.headline{grid-area:headline;min-width:0;font:700 20px/25px var(--display);color:#F7F7FA;padding-top:6px;max-width:220px}\n.price-col{grid-area:price;align-self:end;display:flex;flex-direction:column;align-items:flex-end;gap:2px;text-align:right}\n.price-main{display:flex;flex-direction:column;align-items:flex-end;gap:2px}\n.p-old{font:500 18px var(--display);color:var(--subtle);text-decoration:line-through;transition:opacity .3s}\n.p-old.is-hidden{opacity:0}\n.p-new{font:700 28px var(--display);color:var(--text);white-space:nowrap;font-variant-numeric:tabular-nums}\n.p-pp{max-width:150px;font:400 13px/14px var(--sans);letter-spacing:.4px;color:var(--text-2);transition:opacity .3s}\n.p-pp.is-hidden{display:none}\n.benefits{grid-area:benefits;display:flex;flex-direction:column;gap:4px;margin-top:32px}\n.benefits p{font:400 14px/1.35 var(--sans);letter-spacing:.25px;color:var(--text-2);max-width:42ch}\n\n\n/* segmented control */\n.seg{--n:3;--i:0;position:relative;display:grid;grid-auto-flow:column;grid-auto-columns:1fr;border-radius:8px;background:var(--surface);margin-top:12px;width:100%}\n.seg-thumb{position:absolute;top:0;bottom:0;left:0;width:calc(100% / var(--n));background:#FBFBFB;transform:translateX(calc(var(--i) * 100%));border-radius:var(--r,8px);transition:transform .5s var(--spring),border-radius .3s}\n.seg button{position:relative;z-index:1;border:0;background:none;min-height:56px;padding:8px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2px;color:var(--muted);font:400 14px var(--sans);transition:color .3s}\n.seg button small{font-size:12px;letter-spacing:.4px}\n.seg button[aria-checked=\"true\"]{color:var(--ink)}\n.seg button:disabled{opacity:.35}\n.seg.billing button{min-height:46px}\n.badge{position:absolute;top:-11px;left:50%;transform:translateX(-50%);height:16px;padding:0 4px;border-radius:4px;border:.5px solid transparent;background:var(--grad-dim) padding-box,linear-gradient(#212121,#212121) padding-box,var(--grad) border-box;font:400 10px/15px var(--sans);letter-spacing:.5px;color:#fff;white-space:nowrap;transition:background .3s}\n.seg button[aria-checked=\"true\"] .badge{background:var(--grad) padding-box,var(--grad) border-box;font-weight:700}\n\n/* collapsible */\n.collapse{display:grid;grid-template-rows:1fr;width:100%;transition:grid-template-rows .5s var(--ease),opacity .35s,margin-top .5s var(--ease)}\n.collapse>div{min-height:0;overflow:hidden}\n.collapse.is-closed{grid-template-rows:0fr;opacity:0}\n.panel>.collapse.is-closed,.wrap>.collapse.is-closed{margin-top:-32px}\n\n/* household */\n.household{display:flex;flex-direction:column;gap:8px;width:100%;padding:24px 16px;border-radius:16px;background:#0B0B0C}\n.hh-label{font:400 14px var(--sans);color:var(--muted)}\n.hh-row{display:flex;flex-direction:column;gap:32px}\n.counts{display:flex;gap:14px}\n.count{width:48px;height:48px;border-radius:1000px;border:1px solid #45454B;background:linear-gradient(180deg,#28282A,#111113);color:#F7F7FA;font:400 16px Roboto,var(--sans);transition:border-color .3s,background .3s,transform .18s}\n.count:active{transform:scale(.9)}\n.count[aria-checked=\"true\"]{border-color:transparent;background:var(--sel) padding-box,linear-gradient(#212121,#212121) padding-box,var(--stroke) border-box}\n.shared{display:flex;flex-direction:column;gap:4px}\n.shared-price{font:400 16px var(--sans);letter-spacing:.25px;color:var(--text);font-variant-numeric:tabular-nums}\n.note{display:flex;align-items:center;gap:8px;font:500 12px var(--sans);letter-spacing:.1px;color:var(--subtle)}\n\n/* ---------- add-ons ---------- */\n.addons{display:flex;flex-direction:column;gap:32px;width:100%}\n.addon{position:relative;border-radius:8px;overflow:hidden;background:#090909}\n.addon::after{content:\"\";position:absolute;inset:0;z-index:3;border-radius:inherit;border:1px solid transparent;pointer-events:none;transition:border-color .35s}\n.addon.is-on::after{border-color:#fff}\n.addon-top{position:relative;isolation:isolate;display:flex;flex-direction:column;gap:16px;padding:16px;min-height:232px}\n.art{position:absolute;inset:0;z-index:-1;overflow:hidden}\n.art img{position:absolute;max-width:none;object-fit:cover;opacity:.9}\n.art::after{content:\"\";position:absolute;inset:0;background:var(--veil)}\n.art-sport{--veil:linear-gradient(86deg,#0B1313 1.7%,rgba(11,19,19,.8) 49%,rgba(11,19,19,0) 73%);background:#090909}\n.art-sport img{left:-22.49%;top:-4.06%;width:157.05%;height:108.33%}\n.art-films{--veil:linear-gradient(86deg,#00101F 1.7%,rgba(0,14,23,.8) 49%,rgba(0,0,0,0) 73%);background:#090909}\n.art-films img{left:12.07%;top:0;width:109.91%;height:100%}\n.tag{display:block;align-self:flex-start;width:auto;height:30px}\n.addon-text{display:flex;flex-direction:column;gap:2px;min-width:0;width:min(220px,62%)}\n.addon h3{font:700 16px var(--display);letter-spacing:.15px}\n.group{display:flex;align-items:center;gap:4px;font:500 12px var(--sans);letter-spacing:.5px;color:var(--pink)}\n.desc{font:400 12px/1.35 var(--sans);letter-spacing:.4px;color:var(--muted)}\n.toggle{position:absolute;top:16px;right:16px;height:31px;min-width:31px;padding:0 8px;border:0;border-radius:8px;display:flex;align-items:center;justify-content:center;gap:2px;font:500 12px/13px var(--sans);color:#fff;\n  background:linear-gradient(90deg,rgba(140,24,190,.5),rgba(160,16,118,.5) 33%,rgba(194,4,6,.5)),#2B2B2B;transition:background .3s,transform .18s}\n.toggle:active{transform:scale(.94)}\n.toggle .on{display:none;color:var(--pink)}\n.addon.is-on .toggle{background:#F1F1F1}\n.addon.is-on .toggle .off{display:none}\n.addon.is-on .toggle .on{display:block;animation:popIn .4s var(--spring)}\n@keyframes popIn{from{transform:scale(0) rotate(-30deg)}to{transform:none}}\n.a-price{display:flex;flex-direction:column;gap:2px}\n.a-old{font:700 16px var(--sans);letter-spacing:.15px;color:var(--subtle);text-decoration:line-through}\n.a-row{display:flex;align-items:center;gap:8px}\n.a-new{font:700 22px var(--display);color:var(--text);font-variant-numeric:tabular-nums}\n.a-per{font:500 12px var(--sans);letter-spacing:.5px;color:var(--subtle)}\n.a-pp{font:500 12px var(--sans);letter-spacing:.5px;color:var(--text-2);transition:opacity .3s}\n.a-pp.is-hidden{opacity:0}\n.addon-bottom{padding:16px;display:flex;flex-direction:column}\n.incl{min-height:26px;display:flex;align-items:center}\n.incl img{display:block;max-width:100%;height:auto}\n.addon[data-addon=\"sport\"] .incl{margin:-7px 0 -6px -4px}\n.billing-wrap{padding-top:4px}\n\n/* ---------- payment ---------- */\n.block{width:100%;display:flex;flex-direction:column;gap:16px}\n.methods{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}\n.method{height:56px;border-radius:8px;border:1px solid transparent;background:var(--surface);display:flex;align-items:center;justify-content:center;gap:8px;font:700 15px var(--sans);color:#fff;transition:border-color .25s,background .25s,transform .15s}\n.method:active{transform:scale(.97)}\n.method[aria-checked=\"true\"]{border-color:transparent;background:var(--sel) padding-box,linear-gradient(#212121,#212121) padding-box,var(--stroke) border-box}\n.method img{display:block;pointer-events:none}\n.method-card{position:relative;grid-column:1/-1;justify-content:center;padding:0 48px;gap:12px;height:58px;font-size:16px;letter-spacing:.15px}\n.method-card .chev{position:absolute;right:16px;top:50%;margin-top:-8px;transition:transform .35s var(--ease)}\n.method-card[aria-checked=\"true\"] .chev{transform:rotate(180deg)}\n.card-form{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:12px;padding:4px 0 2px}\n.field{display:flex;flex-direction:column;gap:6px;min-width:0}\n.field.full{grid-column:1/-1}\n.field label{font:500 12px var(--sans);letter-spacing:.3px;color:var(--muted)}\n.field input{width:100%;min-width:0;height:48px;border-radius:8px;border:1px solid #333;background:#181818;color:#fff;font:400 16px var(--sans);padding:0 14px;outline:none;transition:border-color .2s}\n.field input:focus{border-color:var(--pink)}\n.field input.invalid{border-color:var(--danger)}\n.hint{grid-column:1/-1;font:400 12px var(--sans);color:var(--subtle)}\n\n/* ---------- summary ---------- */\n.summary{display:flex;flex-direction:column;gap:24px;padding:16px 16px 24px;border-radius:8px;background:var(--surface)}\n.rows{display:flex;flex-direction:column;gap:24px}\n.r-label{font:400 10px var(--sans);letter-spacing:.5px;color:var(--subtle);margin-bottom:8px}\n.row{display:flex;align-items:center;justify-content:space-between;gap:12px}\n.row-l{display:flex;flex-direction:column;gap:2px;min-width:0}\n.row-title{font:400 14px var(--sans);color:var(--text);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}\n.row-sub{font:400 10px var(--sans);letter-spacing:.5px;color:var(--subtle);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}\n.row-r{display:flex;flex-direction:column;align-items:flex-end;gap:2px;flex-shrink:0}\n.row-prices{display:flex;align-items:center;gap:8px}\n.row-old{font:500 11px var(--sans);letter-spacing:.5px;color:var(--subtle);text-decoration:line-through}\n.row-new{font:400 14px var(--sans);color:var(--text);font-variant-numeric:tabular-nums}\n.row-disc{font:400 10px/10px var(--sans);letter-spacing:.5px;color:var(--pink)}\n.addon-rows{display:flex;flex-direction:column}\n.addon-rows .collapse>div>.row{padding-top:16px}\n.addon-rows .collapse:first-of-type>div>.row{padding-top:0}\n.hr{height:1px;background:var(--line);border-radius:100px}\n.total{display:flex;align-items:center;justify-content:space-between}\n.total-l{font:700 16px var(--sans);letter-spacing:.15px}\n.total-r{display:flex;align-items:center;gap:8px}\n.total-old{font:500 12px var(--sans);letter-spacing:.5px;color:var(--subtle);text-decoration:line-through}\n.total-new{font:700 16px var(--sans);letter-spacing:.15px;font-variant-numeric:tabular-nums}\n.promo-btn{align-self:flex-start;border:0;background:none;padding:0;display:flex;align-items:center;gap:4px;font:400 14px var(--sans);letter-spacing:.25px;color:var(--pink)}\n.promo-btn[hidden],.promo-added[hidden]{display:none}\n.promo-head{display:flex;align-items:flex-end;justify-content:space-between;margin-bottom:16px;font:400 12px/1 var(--sans);letter-spacing:.4px;color:var(--text)}\n.promo-x,.promo-del{width:18px;height:18px;padding:0;border:0;background:none;display:grid;place-items:center;border-radius:4px}\n.promo-form{display:flex;gap:16px;align-items:stretch}\n.promo-field{flex:1;min-width:0;height:52px;display:flex;align-items:center;gap:2px;padding:0 16px;border-radius:10px;border:1px solid #2D3034;background:#181818;cursor:text;transition:border-color .2s}\n.promo-field svg{flex-shrink:0}\n.promo-field:focus-within{border-color:#4A4F55}\n.promo-field.has-value{border-color:var(--pink)}\n.promo-field.invalid{border-color:var(--danger)}\n.promo-field input{flex:1;min-width:0;height:100%;border:0;background:none;outline:none;padding:0 0 0 4px;color:#F5F5F5;caret-color:#CE13A8;font:400 12px var(--sans);letter-spacing:.4px;text-transform:uppercase}\n.promo-field input::placeholder{color:#6C7278;text-transform:none}\n@media (pointer:coarse){.promo-field input{font-size:16px}}  /* avoid iOS zoom-on-focus */\n.promo-add{width:97px;flex-shrink:0;border:0;border-radius:8px;background:var(--surface-2);color:#F5F5F5;font:400 16px var(--sans)}\n.promo-added{display:flex;align-items:center;gap:8px}\n.promo-code{display:flex;align-items:center;gap:4px;font:400 14px var(--sans);letter-spacing:.25px;color:var(--pink)}\n.promo-msg{font:400 12px var(--sans);color:var(--danger);padding-top:6px;min-height:0}\n.promo-row .row-new{color:var(--pink)}\n\n.pay-area{display:flex;flex-direction:column;align-items:center;gap:16px;width:100%}\n.btn{position:relative;height:51px;width:100%;border:0;border-radius:8px;display:flex;align-items:center;justify-content:center;font:400 16px var(--sans);transition:transform .15s,background .2s,opacity .2s}\n.btn:active{transform:scale(.98)}\n.btn-primary{background:var(--btn);color:var(--ink)}\n.btn-secondary{background:var(--surface-2);color:#F5F5F5}\n.btn-ghost{background:none;color:#F5F5F5}\n.btn .lbl{transition:opacity .2s,transform .25s var(--ease)}\n.btn .spin{position:absolute;width:20px;height:20px;border-radius:50%;border:2px solid rgba(30,30,30,.2);border-top-color:var(--ink);opacity:0;animation:spin .8s linear infinite;transition:opacity .2s}\n.btn.is-loading .lbl{opacity:0;transform:translateY(6px)}\n.btn.is-loading .spin{opacity:1}\n@keyframes spin{to{transform:rotate(360deg)}}\n.secure{display:flex;align-items:center;justify-content:center;gap:4px;font:400 14px var(--sans);color:var(--subtle)}\n\n/* ---------- bottom sheet (mobile) ---------- */\n.sheet{position:fixed;left:50%;bottom:0;transform:translateX(-50%);width:100%;max-width:560px;z-index:20;display:flex;flex-direction:column;gap:24px;\n  padding:16px 24px calc(40px + env(safe-area-inset-bottom,0px));border-top:1px solid #2D3034;border-radius:16px 16px 0 0;box-shadow:10px 4px 50px rgba(0,0,0,.5);\n  background:linear-gradient(162deg,#2D2D2D .9%,#131313 64.7%,#131313 94.7%)}\n.handle{display:block;width:51px;height:5px;border-radius:10000px;background:#424242;margin:0 auto;transition:background .2s,width .3s var(--ease)}\n.sheet input{user-select:text;-webkit-user-select:text;touch-action:manipulation}\n.sheet{touch-action:none;user-select:none;-webkit-user-select:none;-webkit-user-drag:none}\n.sheet *{-webkit-user-drag:none}\n.handle-btn{display:block;align-self:center;border:0;background:none;padding:10px 48px 12px;margin:-10px 0 -12px;cursor:grab}\n.handle-btn:active .handle,.sheet.is-dragging .handle{background:#6a6a6a;width:60px}\n.sd{height:0;overflow:hidden;margin-top:-24px;transition:height .45s var(--ease)}\n.sd.dragging{transition:none}\n.sd-inner{display:flex;flex-direction:column;gap:24px;padding:16px 0 24px}\n.sd-group{display:flex;flex-direction:column;gap:16px}\n.sd-group .r-label{margin-bottom:-8px}\n.scrim{position:fixed;inset:0;z-index:19;background:rgba(0,0,0,.55);opacity:0;visibility:hidden;transition:opacity .45s ease,visibility .45s}\n.scrim.is-on{visibility:visible}\n.scrim.dragging{transition:none}\n.sheet-info{display:flex;flex-direction:column;gap:16px;margin-top:-8px}\n\n/* ---------- web header ---------- */\n.web-nav{align-items:center;justify-content:space-between;padding:24px clamp(24px,5vw,96px) 16px}\n.logo{position:relative;display:block;width:199px;height:48px;flex-shrink:0}\n/* frosted pill behind the logo (the logo's Figma background blur) so scrolled content blurs instead of clashing */\n.logo::before{content:\"\";position:absolute;left:-27px;top:-12px;width:253px;height:72px;border-radius:36px;-webkit-backdrop-filter:blur(40px);backdrop-filter:blur(40px);pointer-events:none}\n.logo img{position:relative;z-index:1;display:block;width:333px;height:152px;max-width:none;margin:-52px 0 0 -67px;pointer-events:none}\n.nav-pill{display:flex;align-items:center;gap:32px;padding:16px 32px;border-radius:16px;background:rgba(0,0,0,.5);-webkit-backdrop-filter:blur(40px);backdrop-filter:blur(40px)}\n.nav-links{display:flex;gap:clamp(24px,3.2vw,60px);padding-right:16px}\n.nav-links a{font:400 16px var(--sans);letter-spacing:.25px;color:#fff;opacity:.5;text-decoration:none;transition:opacity .2s}\n.nav-links a[aria-current=\"page\"],.nav-links a:hover{opacity:1}\n.avatar{width:44px;height:44px;border-radius:50%;display:grid;place-items:center;font:700 18px var(--sans);color:#fff;background:linear-gradient(135deg,#E0168F,#9A0F80)}\n.nav-icons{display:flex;align-items:center;gap:16px;color:#fff}\n.nav-icons .dim{opacity:.6}\n.sep{width:1px;height:16px;background:rgba(255,255,255,.3)}\n.web-steps{width:100%;max-width:736px;display:flex;gap:2px;padding:0 16px}\n\n/* ---------- result ---------- */\n.result{position:fixed;inset:0;z-index:50;display:flex;flex-direction:column;align-items:center;background:var(--bg);\n  padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px);opacity:0;visibility:hidden;transition:opacity .35s,visibility .35s}\n.result.is-open{opacity:1;visibility:visible}\n.result-head{width:100%;max-width:560px;display:flex;align-items:center;justify-content:space-between;padding:16px 16px 0}\n.mini-pill{display:flex;align-items:center;gap:12px;padding:12px 24px;border-radius:12px;background:rgba(0,0,0,.5)}\n.mini-pill .avatar{width:33px;height:33px;font-size:13.5px}\n.result-body{flex:1;width:100%;display:flex;align-items:center;justify-content:center;padding:24px 16px 64px}\n.result-card{position:relative;overflow:hidden;width:min(361px,100%);display:flex;flex-direction:column;align-items:center;gap:32px;padding:64px 32px 32px;border-radius:16px;\n  background:linear-gradient(140deg,#2D2D2D .9%,#131313 64.7%,#131313 94.7%);transform:translateY(28px) scale(.98);transition:transform .6s var(--ease)}\n.result.is-open .result-card{transform:none}\n.glow{position:absolute;left:50%;top:-37px;width:400px;height:400px;margin-left:-200px;pointer-events:none;border-radius:50%;\n  background:radial-gradient(closest-side,rgba(206,19,168,.55),rgba(140,24,190,.22) 55%,transparent);animation:glow 3.2s ease-in-out infinite alternate}\n.result[data-kind=\"fail\"] .glow{background:radial-gradient(closest-side,rgba(194,4,6,.5),rgba(160,16,118,.2) 55%,transparent)}\n@keyframes glow{from{transform:scale(.92);opacity:.75}to{transform:scale(1.06);opacity:1}}\n.coin{position:relative;width:158px;height:158px}\n.coin svg,.coin img{width:100%;height:100%;display:block}\n.result.is-open .coin{animation:pop .85s var(--spring) .12s both}\n.result.is-open[data-kind=\"fail\"] .coin{animation:pop .7s var(--spring) .12s both,shake .5s ease .85s}\n@keyframes pop{0%{transform:scale(.3) rotate(-28deg);opacity:0}60%{opacity:1}100%{transform:none;opacity:1}}\n@keyframes shake{0%,100%{translate:0}20%{translate:-9px}40%{translate:9px}60%{translate:-5px}80%{translate:5px}}\n.r-title{position:relative;font:700 22px/30px var(--sans);text-align:center}\n.r-sub{position:relative;font:400 14px/20px var(--sans);letter-spacing:.25px;color:var(--muted);text-align:center;max-width:34ch;margin:8px auto 0}\n.r-actions{position:relative;display:flex;flex-direction:column;gap:16px;width:100%;max-width:297px}\n.rise{opacity:0;transform:translateY(10px);transition:opacity .45s ease,transform .55s var(--ease);transition-delay:var(--d,0s)}\n.result.is-open .rise{opacity:1;transform:none}\n\n/* ---------- toast + prototype panel ---------- */\n.toast{position:fixed;left:50%;top:calc(env(safe-area-inset-top,0px) + 14px);z-index:70;max-width:calc(100% - 32px);transform:translate(-50%,-160%);\n  padding:12px 16px;border-radius:12px;background:#2A2A2A;border:1px solid #3a3a3a;box-shadow:0 12px 40px rgba(0,0,0,.45);font:500 14px var(--sans);transition:transform .45s var(--spring)}\n.toast.is-show{transform:translate(-50%,0)}\n.proto-pill{position:fixed;left:20px;bottom:calc(20px + env(safe-area-inset-bottom,0px));z-index:40;display:none;align-items:center;gap:8px;height:40px;padding:0 16px;border-radius:1000px;border:1px solid #3a3a3a;background:#232323;font:500 13px var(--sans);box-shadow:0 8px 30px rgba(0,0,0,.4)}\n.proto-pill i{width:8px;height:8px;border-radius:50%;background:#3BD16F;transition:background .3s}\n.proto-pill i.fail{background:var(--danger)}\n.proto{position:fixed;z-index:45;right:12px;top:calc(env(safe-area-inset-top,0px) + 64px);width:min(300px,calc(100% - 24px));padding:16px;border-radius:14px;background:#232323;border:1px solid #363636;box-shadow:0 20px 60px rgba(0,0,0,.55);\n  display:flex;flex-direction:column;gap:14px;opacity:0;visibility:hidden;transform:translateY(-8px) scale(.98);transform-origin:top right;transition:opacity .25s,visibility .25s,transform .35s var(--ease)}\n.proto.is-open{opacity:1;visibility:visible;transform:none}\n.proto h2{font:700 15px var(--sans)}\n.proto p{font:400 13px/1.45 var(--sans);color:var(--muted)}\n.proto code{font:700 13px var(--sans);color:var(--pink-light)}\n.proto .seg{margin-top:0}\n.proto .seg button{min-height:40px;font-size:13px}\n\n.shake{animation:shake .45s ease}\n\n/* ---------- desktop: one-step checkout ---------- */\n@media (min-width:1024px){\n  .app{height:auto;max-width:none;overflow:visible;padding-bottom:64px}\n  .m-only{display:none !important}\n  .d-only{display:flex !important}\n  .stage{display:grid;grid-template-columns:minmax(0,864px) minmax(400px,608px);grid-template-rows:auto auto auto;column-gap:16px;justify-content:center;align-items:start;padding:72px 32px 0;overflow:visible}\n  .left-bg{display:block;grid-column:1;grid-row:1 / 4;align-self:stretch;border-radius:16px;background:var(--panel)}\n  .panel,.panel.is-past{position:relative;inset:auto;transform:none;opacity:1;pointer-events:auto;overflow:visible;transition:none}\n  #p1{grid-column:1;grid-row:2;padding:32px 64px 64px;gap:32px}\n  #p2{grid-column:1;grid-row:3;padding:64px}\n  #p2::before{content:\"\";position:absolute;top:0;left:64px;right:64px;height:1px;background:var(--line)}\n  #p3{grid-column:2;grid-row:1 / 4;align-self:start;position:sticky;top:calc(var(--hdr,108px) + 16px);padding:64px;gap:64px;border-radius:16px;background:var(--panel)}\n  .web-nav{position:sticky;top:0;z-index:30;background:transparent;-webkit-backdrop-filter:blur(28px);backdrop-filter:blur(28px)}  /* no colour, just softens what scrolls beneath */\n  .wsteps-bar{grid-column:1;grid-row:1;position:sticky;top:var(--hdr,108px);z-index:10;justify-content:center;\n    padding:32px 64px 20px;border-radius:16px 16px 0 0;background:#151515;transition:box-shadow .3s,border-radius .3s}\n  .wsteps-bar.is-stuck{border-radius:0 0 12px 12px;box-shadow:0 12px 24px rgba(0,0,0,.45)}\n  .wrap{max-width:744px}\n  .switch{width:300px}\n  .plan-card{padding:24px 24px 32px}\n  .plan-grid{grid-template-columns:318px 1fr;grid-template-areas:\"headline people\" \"benefits people\" \"benefits price\";row-gap:16px;margin-top:0}\n  .people{justify-self:end;align-self:start;margin-bottom:0}\n  .headline{font-size:24px;line-height:30px;max-width:none;padding-top:0}\n  .benefits{margin-top:0}\n  .benefits p{font-size:16px}\n  .price-main{flex-direction:row;align-items:center;gap:16px}\n  .p-old{font-size:20px}\n  .p-new{font-size:32px}\n  .p-pp{font-size:16px;letter-spacing:.25px}\n  .household{padding:24px 32px 32px;gap:16px}\n  .hh-row{flex-direction:row;align-items:center;gap:64px}\n  .addons{flex-direction:row;justify-content:center;align-items:flex-start;gap:24px}\n  .addon{flex:0 1 360px}\n  .methods .method{font-size:16px}\n  .block{gap:32px}\n  .block .h3,.sum-title{font-size:22px;letter-spacing:0}\n  .summary{padding:0;background:none;gap:32px}\n  .r-label{font-size:14px;letter-spacing:0}\n  .row-title{font-size:18px;letter-spacing:.5px}\n  .row-sub{font-size:14px;letter-spacing:0}\n  .row-old{font-size:14px;letter-spacing:0;font-weight:400}\n  .row-new{font-size:18px;letter-spacing:.5px}\n  .row-disc{font-size:14px;line-height:16px;letter-spacing:0}\n  .total-l,.total-new{font-size:22px;letter-spacing:0}\n  .btn-pay{height:64px;max-width:400px;font-weight:700;background:var(--text);color:#000;border-radius:8px}\n  .sheet{display:none}\n  .proto-pill{display:flex}\n  .proto{right:auto;left:20px;top:auto;bottom:calc(72px + env(safe-area-inset-bottom,0px));transform-origin:bottom left}\n  .result{background:rgba(10,10,10,.72);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px)}\n  .result-head{display:none}\n  .result-body{padding:24px}\n  .result-card{width:420px}\n}\n@media (min-width:1024px) and (max-width:1240px){ .nav-links a:not([aria-current]){display:none} }\n/* small phones (iPhone SE / 320–359px): scale the plan card type so headline + price share the row */\n@media (max-width:359px){\n  .headline{font-size:17px;line-height:22px}\n  .p-new{font-size:23px}\n  .p-old{font-size:15px}\n  .p-pp{font-size:12px;max-width:120px}\n  .plan-grid{grid-template-areas:\"people people\" \"headline price\" \"benefits benefits\"}  /* avatar row no longer forces the headline column to 190px */\n  .methods{gap:10px}\n  .method{font-size:13px}\n}\n/* ---------- hover (desktop pointers only) ---------- */\n.addon{transition:background-color .3s ease}\n.art img{transition:filter .3s ease}\n/* group-sharing details only make sense for Friends & Family */\n.app[data-plan=\"ind\"] .addon .group,.app[data-plan=\"ind\"] .addon .a-pp{display:none}\n/* without those lines: let the card hug its content and keep the title/description rhythm */\n.app[data-plan=\"ind\"] .addon-top{min-height:0}\n.app[data-plan=\"ind\"] .addon-text{gap:6px}\n@media (hover:hover) and (pointer:fine){\n  .nav-icons svg{transition:opacity .2s}\n  .nav-icons svg:hover{opacity:1}\n  .avatar{transition:box-shadow .25s}\n  .nav-pill .avatar:hover{box-shadow:0 0 0 3px rgba(223,52,189,.35)}\n  .step:not(.is-current):hover{color:#8a8a8a}\n  .switch button[aria-checked=\"false\"]:hover{color:#fff;background:rgba(255,255,255,.06)}\n  .seg button{transition:color .3s,background .25s}\n  .seg button[aria-checked=\"false\"]:not(:disabled):hover{color:#e6e6e6;background:rgba(255,255,255,.05)}\n  .count[aria-checked=\"false\"]:hover{border-color:#6b6b72;transform:translateY(-2px)}\n  .addon:hover{background-color:#151515}\n  .addon:hover .art img{filter:brightness(1.15)}   /* photo only; the dark fade behind the text stays put */\n  .toggle:hover{background:linear-gradient(90deg,rgba(140,24,190,.8),rgba(160,16,118,.8) 33%,rgba(194,4,6,.8)),#2B2B2B}\n  .addon.is-on .toggle:hover{background:#fff}\n  .method:hover{background:#2a2a2a}\n  .method[aria-checked=\"true\"]:hover{background:var(--sel) padding-box,linear-gradient(#262626,#262626) padding-box,var(--stroke) border-box}\n  .promo-btn{transition:color .2s}\n  .promo-btn:hover{color:var(--pink-light)}\n  .btn-primary:hover,.btn-pay:hover{background:#fff}\n  .btn-secondary:hover{background:#3d3d3d}\n  .btn-ghost:hover{background:rgba(255,255,255,.06)}\n  .promo-add{transition:background .2s}\n  .promo-add:hover{background:#3d3d3d}\n  .promo-x:hover,.promo-del:hover{background:rgba(255,255,255,.08)}\n  .proto-pill{transition:background .2s,border-color .2s}\n  .proto-pill:hover{background:#2c2c2c;border-color:#4a4a4a}\n}\n@media (prefers-reduced-motion:reduce){\n  *,*::before,*::after{animation-duration:.01ms !important;animation-iteration-count:1 !important;transition-duration:.01ms !important}\n}\n\n/* ===== NOISY v20: вграждане в секция „Цени“ ===== */\n:host{--hdr:0px;--bg:#0A090D}\n.app{background:transparent;color:var(--text);font-family:var(--sans);overflow-wrap:break-word;-webkit-font-smoothing:antialiased;-webkit-tap-highlight-color:transparent}\n.scrim{z-index:58}.sheet{z-index:59}.result{z-index:95}.toast{z-index:96}\n@media (max-width:1023px){\n  .app{height:auto;overflow:visible}\n  .m-bar{position:sticky;top:var(--hdr);z-index:6}\n  .stage{display:grid;overflow:visible;overflow-x:clip}\n  .panel{position:relative;inset:auto;grid-area:1/1;overflow:visible;overscroll-behavior:auto}\n  .panel:not(.is-active){position:absolute;top:0;left:0;right:0}\n  .sheet{position:sticky;bottom:0;left:auto;transform:none;margin:0 auto}\n  .panel,#p3{padding-bottom:40px}\n}\n@media (min-width:1024px){\n  .app{padding-bottom:0}\n  /* оригиналът се чупи под ~1500px (цената излиза от картата, на 1024 картата е 208px): гъвкави колони */\n  .stage{padding-top:40px;grid-template-columns:minmax(0,864px)}\n  .plan-grid{grid-template-columns:minmax(0,1fr) auto}\n  .price-main{flex-wrap:wrap;justify-content:flex-end;row-gap:0}\n  .headline{min-width:0}\n}\n@media (min-width:1024px) and (max-width:1365px){\n  #p1{padding:32px 32px 48px}\n  #p2{padding:48px 32px}\n  #p2::before{left:32px;right:32px}\n  .wsteps-bar{padding:28px 32px 18px}\n  #p3{padding:40px 32px;gap:48px}\n  .plan-grid{grid-template-areas:\"people price\" \"headline price\" \"benefits benefits\";row-gap:0}\n  .people{justify-self:start;margin-bottom:9px}\n  .headline{padding-top:6px}\n  .benefits{margin-top:32px}\n  .price-main{flex-direction:column;align-items:flex-end;gap:2px}\n  .addon-text{width:min(220px,70%)}\n}\n/* ===== v21: пакетите се виждат още в стъпка 1, без цена (цената е в стъпка 2) ===== */\n.tz{width:100%;display:flex;flex-direction:column;gap:16px;padding:24px 16px;border-radius:16px;background:#0B0B0C}\n.tz .hh-label{margin:0}\n.tz-row{display:grid;grid-template-columns:1fr;gap:12px}\n.tz-a{position:relative;isolation:isolate;overflow:hidden;display:flex;flex-direction:column;align-items:flex-start;gap:12px;min-height:152px;padding:16px;border-radius:8px;background:#090909;color:var(--text)}\n.tz-a::after{content:\"\";position:absolute;inset:0;border-radius:inherit;border:1px solid rgba(255,255,255,.08);pointer-events:none;transition:border-color .3s}\n.tz-a .art img{inset:0;width:100%;height:100%;object-position:right center}\n.tz-a .tag{height:24px}\n.tz-t{display:flex;flex-direction:column;gap:4px;width:min(250px,64%)}\n.tz-t b{font:700 16px var(--display);letter-spacing:.15px}\n.tz-t span{font:400 13px/1.4 var(--sans);color:var(--text-2)}\n.tz-logos{display:block;width:auto;max-width:100%;height:24px;margin-top:auto}\n.tz-a[data-tz=\"sport\"] .tz-logos{margin-left:-3px}\n.tz .note{display:flex;align-items:center;gap:6px;margin:0;font:400 13px var(--sans);color:var(--muted)}\n.tz .note svg{flex:none}\n@media (min-width:1024px){.tz{padding:24px 32px 32px}.tz-row{grid-template-columns:1fr 1fr;gap:16px}}\n/* без чекаута: само стъпка 1 */\n.m-bar,#wStepsBar,#p2,#p3,.scrim,.sheet,.result,#promoHome{display:none!important}\n.cta21{width:100%;display:flex;flex-direction:column;align-items:center;gap:12px;text-align:center}\n.cta21-go{width:min(100%,400px);min-height:56px;border-radius:8px;font:600 16px var(--sans)}\n.cta21 .note{margin:0;max-width:44ch;font:400 13px/1.45 var(--sans);color:var(--muted)}\n@media (max-width:1023px){.panel,#p1{padding-bottom:8px}}\n/* ===== v22 (Коста, 14.10): по-малки отстояния в цените ===== */\n.wrap{gap:20px}\n.household{padding:18px 16px 20px;gap:10px}\n.hh-row{gap:20px}\n.tz{padding:18px 16px 20px;gap:12px}\n.cta21{margin-top:4px}\n@media (min-width:1024px){\n  #p1{padding:32px 48px 40px}\n  .wrap{gap:24px}\n  .plan-card{gap:24px}\n  .household{padding:20px 28px 24px;gap:10px}\n  .hh-row{gap:40px}\n  .tz{padding:20px 28px 24px}\n}\n/* ===== варианти за избор (?pz=B / ?pz=C на главната) ===== */\n/* B: по-голямо, с изравнени отстояния и по-големи карти за пакетите */\n:host([data-v=\"B\"]) .wrap{gap:40px}\n:host([data-v=\"B\"]) .tz{gap:20px;padding:28px 20px}\n:host([data-v=\"B\"]) .tz .hh-label{font-size:15px;color:var(--text-2)}\n:host([data-v=\"B\"]) .tz-row{gap:16px}\n:host([data-v=\"B\"]) .tz-a{min-height:190px;padding:20px;gap:14px}\n:host([data-v=\"B\"]) .tz-t{width:min(300px,66%)}\n:host([data-v=\"B\"]) .tz-t b{font-size:20px}\n:host([data-v=\"B\"]) .tz-t span{font-size:14px}\n:host([data-v=\"B\"]) .tz-logos{height:28px}\n:host([data-v=\"B\"]) .cta21-go{min-height:60px;font-size:17px}\n@media (min-width:1024px){\n  :host([data-v=\"B\"]) .stage{grid-template-columns:minmax(0,1040px)}\n  :host([data-v=\"B\"]) #p1 .wrap{zoom:1.1}\n  :host([data-v=\"B\"]) #p1{padding:48px 64px 64px}\n  :host([data-v=\"B\"]) .tz{padding:32px 40px 40px}\n}\n/* C: пакетите като тънка лента с логата, без снимки */\n:host([data-v=\"C\"]) .tz{background:transparent;padding:0;gap:12px}\n:host([data-v=\"C\"]) .tz .hh-label{text-align:center}\n:host([data-v=\"C\"]) .tz-row{gap:10px}\n:host([data-v=\"C\"]) .tz-a{min-height:0;flex-direction:row;flex-wrap:wrap;align-items:center;gap:10px 14px;padding:14px 16px;background:#0B0B0C}\n:host([data-v=\"C\"]) .tz-a .art,:host([data-v=\"C\"]) .tz-t span{display:none}\n:host([data-v=\"C\"]) .tz-t{width:auto}\n:host([data-v=\"C\"]) .tz-t b{font-size:15px}\n:host([data-v=\"C\"]) .tz-logos{margin:0 0 0 auto;height:22px}\n:host([data-v=\"C\"]) .tz .note{justify-content:center}\n/* D: пакетите без снимки, логата едри, в две колони */\n:host([data-v=\"D\"]) .tz-a{min-height:0;align-items:center;text-align:center;padding:24px 16px;background:linear-gradient(180deg,#121214,#0B0B0C)}\n:host([data-v=\"D\"]) .tz-a .art{display:none}\n:host([data-v=\"D\"]) .tz-a .tag{height:22px}\n:host([data-v=\"D\"]) .tz-t{width:auto;align-items:center}\n:host([data-v=\"D\"]) .tz-t b{font-size:18px}\n:host([data-v=\"D\"]) .tz-t span{display:none}\n:host([data-v=\"D\"]) .tz-logos{height:32px;margin:6px auto 0}\n:host([data-v=\"D\"]) .tz .hh-label,:host([data-v=\"D\"]) .tz .note{text-align:center;justify-content:center}\n/* E: всичко по-тясно и подредено в една колона с равни отстояния */\n:host([data-v=\"E\"]) .wrap{gap:24px}\n@media (min-width:1024px){:host([data-v=\"E\"]) .stage{grid-template-columns:minmax(0,720px)}:host([data-v=\"E\"]) #p1{padding:40px 40px 48px}}\n:host([data-v=\"E\"]) .tz{padding:20px 16px;gap:14px}\n:host([data-v=\"E\"]) .tz-row{grid-template-columns:1fr!important;gap:10px}\n:host([data-v=\"E\"]) .tz-a{min-height:112px;flex-direction:row;align-items:center;flex-wrap:wrap;gap:6px 12px}\n:host([data-v=\"E\"]) .tz-t{width:100%;order:2}\n:host([data-v=\"E\"]) .tz-t span{display:none}\n:host([data-v=\"E\"]) .tz-logos{order:3;margin-top:0}\n</style>\n<div class=\"app\" id=\"app\">\n\n  <!-- Mobile app bar + stepper -->\n  <header class=\"m-bar m-only\">\n    <div class=\"m-row\">\n      <button class=\"icon-btn\" id=\"back\" aria-label=\"Назад\">\n        <svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"#fff\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M20 12H5M11 5l-7 7 7 7\"/></svg>\n      </button>\n      <h1 class=\"m-title\">Абонамент</h1>\n      <span class=\"icon-btn\" aria-hidden=\"true\"></span>\n    </div>\n    <nav class=\"steps\" id=\"mSteps\" aria-label=\"Стъпки\">\n      <button class=\"step\" data-go=\"1\"><span>1. План</span><span class=\"bar\"><i></i></span></button>\n      <button class=\"step\" data-go=\"2\"><span>2. Пакети</span><span class=\"bar\"><i></i></span></button>\n      <button class=\"step\" data-go=\"3\"><span>3. Плащане</span><span class=\"bar\"><i></i></span></button>\n    </nav>\n  </header>\n\n  <main class=\"stage\" id=\"stage\">\n    <div class=\"left-bg\" aria-hidden=\"true\"></div>\n    <div class=\"wsteps-bar d-only\" id=\"wStepsBar\">\n        <nav class=\"web-steps\" id=\"wSteps\" aria-label=\"Секции\">\n            <button class=\"step is-current\" data-scroll=\"p1\"><span>1. План</span><span class=\"bar\"><i></i></span></button>\n            <button class=\"step\" data-scroll=\"p2\"><span>2. Пакети</span><span class=\"bar\"><i></i></span></button>\n          </nav>\n    </div>\n\n    <!-- STEP 1: plan -->\n    <section class=\"panel\" id=\"p1\" aria-labelledby=\"t-plan\">\n      <div class=\"wrap\">\n        <h2 class=\"h2 d-only\" id=\"t-plan\" style=\"justify-content:center\">Избери абонаментен план</h2>\n        <div class=\"switch\" id=\"planSwitch\" role=\"radiogroup\" aria-label=\"Вид план\" data-v=\"ff\">\n          <span class=\"switch-thumb\" aria-hidden=\"true\"></span>\n          <button role=\"radio\" data-plan=\"ind\" aria-checked=\"false\">Solo<svg class=\"tick\" viewBox=\"0 0 16 16\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"m3.5 8.5 3 3 6-7\"/></svg></button>\n          <button role=\"radio\" data-plan=\"ff\" aria-checked=\"true\">Together<svg class=\"tick\" viewBox=\"0 0 16 16\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"m3.5 8.5 3 3 6-7\"/></svg></button>\n        </div>\n\n        <article class=\"plan-card\" id=\"planCard\">\n          <p class=\"plan-name swap\" id=\"planName\">Together</p>\n          <div class=\"plan-grid\">\n            <div class=\"people\" id=\"people\" aria-hidden=\"true\"></div>\n            <p class=\"headline swap\" id=\"planHead\">Noisy е по-добре с приятели.</p>\n            <div class=\"price-col swap\">\n              <div class=\"price-main\">\n                <span class=\"p-old\" id=\"planOld\">74,70 €</span>\n                <span class=\"p-new\" id=\"planNew\">67,23 €</span>\n              </div>\n              <span class=\"p-pp\" id=\"planPP\">по 7,47 € на човек на месец</span>\n            </div>\n            <div class=\"benefits swap\">\n              <p id=\"planB1\">Споделяте абонамента. Не профила.</p>\n              <p id=\"planB2\">До 5 души със собствен профил, история и препоръки.</p>\n            </div>\n          </div>\n          <div class=\"seg\" id=\"periodSeg\" role=\"radiogroup\" aria-label=\"Период\" style=\"--n:3\">\n            <span class=\"seg-thumb\" aria-hidden=\"true\"></span>\n            <button role=\"radio\" data-period=\"1\">1 месец<small data-pm=\"1\">24,90 €</small></button>\n            <button role=\"radio\" data-period=\"3\">3 месеца<small data-pm=\"3\">22,41 €</small><span class=\"badge\">-10%</span></button>\n            <button role=\"radio\" data-period=\"12\">12 месеца<small data-pm=\"12\">21,16 €</small><span class=\"badge\">-15%</span></button>\n          </div>\n        </article>\n\n        <div class=\"collapse\" id=\"hhWrap\"><div>\n          <div class=\"household\">\n            <p class=\"hh-label\">Изчисли цена на човек според броя</p>\n            <div class=\"hh-row\">\n              <div class=\"counts\" id=\"counts\" role=\"radiogroup\" aria-label=\"Брой хора\">\n                <button class=\"count\" role=\"radio\" data-n=\"2\">2</button>\n                <button class=\"count\" role=\"radio\" data-n=\"3\">3</button>\n                <button class=\"count\" role=\"radio\" data-n=\"4\">4</button>\n                <button class=\"count\" role=\"radio\" data-n=\"5\">5</button>\n              </div>\n              <div class=\"shared\">\n                <p class=\"shared-price\" id=\"shared\">За 3 души: ≈ 7,47 € / човек на месец</p>\n                <p class=\"note\"><svg width=\"27\" height=\"27\" viewBox=\"0 0 27 27\" fill=\"none\" stroke=\"#666\" stroke-width=\"1.4\" stroke-linecap=\"round\" aria-hidden=\"true\"><circle cx=\"11\" cy=\"10\" r=\"3.5\"/><path d=\"M4.5 21c.8-3.6 3.4-5.5 6.5-5.5s5.7 1.9 6.5 5.5M19 9v5M16.5 11.5h5\"/></svg>Поканите ще изпратиш след плащането.</p>\n              </div>\n            </div>\n          </div>\n        </div></div>\n        <div class=\"tz\" id=\"tz\">\n          <p class=\"hh-label\">Към плана можеш да добавиш</p>\n          <div class=\"tz-row\">\n            <div class=\"tz-a\" data-tz=\"sport\"><span class=\"art art-sport\" aria-hidden=\"true\"><img src=\"img/pz/cd14c85c21.jpg\" alt=\"\"></span><img class=\"tag\" src=\"img/pz/ae4ee16780.svg\" width=\"78\" height=\"24\" alt=\"Arena\"><span class=\"tz-t\"><b>Premium Sport</b><span>Най-големите спортни първенства на живо и запис.</span></span><img class=\"tz-logos\" src=\"img/pz/940021db3c.svg\" width=\"159\" height=\"24\" alt=\"Включени спортни първенства\"></div>\n            <div class=\"tz-a\" data-tz=\"films\"><span class=\"art art-films\" aria-hidden=\"true\"><img src=\"img/pz/55b4ca4a1f.jpg\" alt=\"\"></span><img class=\"tag\" src=\"img/pz/b40b155257.svg\" width=\"78\" height=\"24\" alt=\"Theatre\"><span class=\"tz-t\"><b>Premium Films</b><span>Хитовите филми и сериали на HBO, Warner Bros. и DC.</span></span><img class=\"tz-logos\" src=\"img/pz/2173dc7e36.svg\" width=\"158\" height=\"24\" alt=\"Включени студиа и марки\"></div>\n          </div>\n          <p class=\"note\"><svg width=\"18\" height=\"18\" viewBox=\"0 0 18 18\" fill=\"none\" stroke=\"#666\" stroke-width=\"1.4\" stroke-linecap=\"round\" aria-hidden=\"true\"><circle cx=\"9\" cy=\"9\" r=\"7\"/><path d=\"M9 8v4.5M9 5.6v.1\"/></svg>Добавяш ги към плана, когато завършиш абонамента.</p>\n        </div>\n        <div class=\"cta21\">\n          <button type=\"button\" class=\"btn btn-primary cta21-go\" id=\"ctaGo\">Избери Together</button>\n        </div>\n      </div>\n    </section>\n\n    <!-- STEP 2: add-ons -->\n    <section class=\"panel\" id=\"p2\" aria-labelledby=\"t-add\">\n      <div class=\"wrap\">\n        <h2 class=\"h2 d-only\" id=\"t-add\" style=\"justify-content:center\">Добави пакети</h2>\n        <div class=\"addons\" id=\"addons\"></div>\n      </div>\n    </section>\n\n    <!-- STEP 3: payment + summary -->\n    <section class=\"panel\" id=\"p3\" aria-labelledby=\"t-pay\">\n      <div class=\"block\" id=\"payBlock\">\n        <h2 class=\"h3\" id=\"t-pay\"><span class=\"m-only\">Метод на плащане</span><span class=\"d-only\">Избери метод на плащане</span></h2>\n        <div class=\"methods\" id=\"methods\" role=\"radiogroup\" aria-label=\"Метод на плащане\">\n          <button class=\"method\" role=\"radio\" data-m=\"apple\" aria-label=\"Apple Pay\"><img src=\"img/pz/a6f1a892b1.svg\" width=\"50\" height=\"20\" alt=\"\"></button>\n          <button class=\"method\" role=\"radio\" data-m=\"google\" aria-label=\"Google Pay\"><img src=\"img/pz/85382a840c.svg\" width=\"55\" height=\"24\" alt=\"\"></button>\n          <button class=\"method\" role=\"radio\" data-m=\"revolut\" aria-label=\"Revolut Pay\"><img src=\"img/pz/501c1e8c08.svg\" width=\"61\" height=\"24\" alt=\"\"></button>\n          <button class=\"method method-card\" role=\"radio\" data-m=\"card\">\n            <svg width=\"18\" height=\"18\" viewBox=\"0 0 18 18\" fill=\"none\" stroke=\"#fff\" stroke-width=\"1.5\" aria-hidden=\"true\"><rect x=\"1.5\" y=\"3.5\" width=\"15\" height=\"11\" rx=\"2\"/><path d=\"M1.5 7.5h15\"/></svg>\n            Card\n            <svg class=\"chev\" width=\"16\" height=\"16\" viewBox=\"0 0 16 16\" fill=\"none\" stroke=\"#999\" stroke-width=\"1.6\" stroke-linecap=\"round\" aria-hidden=\"true\"><path d=\"m4 6 4 4 4-4\"/></svg>\n          </button>\n        </div>\n        <div class=\"collapse is-closed\" id=\"cardWrap\" style=\"margin-top:-16px\"><div>\n          <div class=\"card-form\">\n            <div class=\"field full\"><label for=\"ccNum\">Номер на карта</label><input id=\"ccNum\" inputmode=\"numeric\" autocomplete=\"off\" placeholder=\"0000 0000 0000 0000\"></div>\n            <div class=\"field\"><label for=\"ccExp\">Валидна до</label><input id=\"ccExp\" inputmode=\"numeric\" autocomplete=\"off\" placeholder=\"ММ/ГГ\"></div>\n            <div class=\"field\"><label for=\"ccCvc\">CVC</label><input id=\"ccCvc\" inputmode=\"numeric\" autocomplete=\"off\" placeholder=\"123\"></div>\n            <p class=\"hint\">Прототип: въведи произволни цифри, не реална карта.</p>\n          </div>\n        </div></div>\n      </div>\n\n      <div class=\"block\">\n        <h2 class=\"h3 sum-title\">Избрани услуги</h2>\n        <div class=\"summary\">\n          <div class=\"rows\">\n            <div>\n              <p class=\"r-label\">План</p>\n              <div class=\"row\">\n                <div class=\"row-l\"><span class=\"row-title\" id=\"sPlan\">Together</span><span class=\"row-sub\" id=\"sPlanSub\"></span></div>\n                <div class=\"row-r\"><div class=\"row-prices\"><span class=\"row-old\" id=\"sPlanOld\"></span><span class=\"row-new\" id=\"sPlanNew\"></span></div><span class=\"row-disc\" id=\"sPlanDisc\"></span></div>\n              </div>\n            </div>\n            <div class=\"collapse\" id=\"sAddWrap\"><div>\n              <p class=\"r-label\">Пакети</p>\n              <div class=\"addon-rows\" id=\"sAddons\"></div>\n            </div></div>\n            <div class=\"collapse is-closed\" id=\"sPromoWrap\"><div>\n              <div class=\"row promo-row\"><div class=\"row-l\"><span class=\"row-title\">Промокод</span><span class=\"row-sub\" id=\"sPromoCode\">NOISY10</span></div><div class=\"row-r\"><span class=\"row-new\" id=\"sPromo\">−0,00 €</span></div></div>\n            </div></div>\n          </div>\n          <div class=\"hr\"></div>\n          <div class=\"total\"><span class=\"total-l\">Общо:</span><span class=\"total-r\"><span class=\"total-old\" id=\"tOld\"></span><span class=\"total-new\" id=\"tNew\"></span></span></div>\n          <div id=\"promoHome\" hidden></div>\n          <div class=\"promo\" id=\"promo\" data-state=\"add\">\n            <button class=\"promo-btn\" id=\"promoBtn\" aria-expanded=\"false\" aria-controls=\"promoWrap\">\n              <svg width=\"18\" height=\"18\" viewBox=\"0 0 18 18\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.4\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M2 9.6V3a1 1 0 0 1 1-1h6.6L16 8.4 9.4 15z\"/><circle cx=\"5.8\" cy=\"5.8\" r=\"1.1\"/></svg>\n              <span>Добави промокод</span>\n            </button>\n            <div class=\"collapse is-closed\" id=\"promoWrap\"><div>\n              <div class=\"promo-open\">\n                <div class=\"promo-head\">\n                  <span>Добави промокод</span>\n                  <button type=\"button\" class=\"promo-x\" id=\"promoClose\" aria-label=\"Затвори полето за промокод\"><svg width=\"18\" height=\"18\" viewBox=\"0 0 18 18\" fill=\"none\" stroke=\"#FBFBFB\" stroke-width=\"1.4\" stroke-linecap=\"round\" aria-hidden=\"true\"><path d=\"M4.5 13.5h9\"/></svg></button>\n                </div>\n                <form class=\"promo-form\" id=\"promoForm\" autocomplete=\"off\" novalidate>\n                  <label class=\"promo-field\" id=\"promoField\">\n                    <span class=\"sr\">Промокод</span>\n                    <svg width=\"18\" height=\"18\" viewBox=\"0 0 18 18\" fill=\"none\" stroke=\"#CE13A8\" stroke-width=\"1.4\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M2 9.6V3a1 1 0 0 1 1-1h6.6L16 8.4 9.4 15z\"/><circle cx=\"5.8\" cy=\"5.8\" r=\"1.1\"/></svg>\n                    <input id=\"promoIn\" placeholder=\"Въведи кода\" autocapitalize=\"characters\" spellcheck=\"false\">\n                  </label>\n                  <button type=\"submit\" class=\"promo-add\">Добави</button>\n                </form>\n                <p class=\"promo-msg\" id=\"promoMsg\" aria-live=\"polite\"></p>\n              </div>\n            </div></div>\n            <div class=\"promo-added\" id=\"promoAdded\" hidden>\n              <span class=\"promo-code\"><svg width=\"18\" height=\"18\" viewBox=\"0 0 18 18\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.4\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M2 9.6V3a1 1 0 0 1 1-1h6.6L16 8.4 9.4 15z\"/><circle cx=\"5.8\" cy=\"5.8\" r=\"1.1\"/></svg><span id=\"promoAddedCode\">NOISY10</span></span>\n              <button type=\"button\" class=\"promo-del\" id=\"promoDel\" aria-label=\"Премахни промокода\"><svg width=\"12\" height=\"12\" viewBox=\"0 0 12 12\" fill=\"none\" stroke=\"#FBFBFB\" stroke-width=\"1.6\" stroke-linecap=\"round\" aria-hidden=\"true\"><path d=\"M2.5 2.5l7 7M9.5 2.5l-7 7\"/></svg></button>\n            </div>\n          </div>\n        </div>\n      </div>\n\n      <div class=\"pay-area d-only\">\n        <button class=\"btn btn-pay\" id=\"payDesk\"><span class=\"lbl\">Плащане</span><span class=\"spin\" aria-hidden=\"true\"></span></button>\n        <p class=\"secure\"><svg width=\"20\" height=\"20\" viewBox=\"0 0 20 20\" fill=\"none\" stroke=\"#666\" stroke-width=\"1.4\" aria-hidden=\"true\"><rect x=\"4.5\" y=\"8.5\" width=\"11\" height=\"8\" rx=\"1.5\"/><path d=\"M7 8.5V6.5a3 3 0 0 1 6 0v2\"/></svg>Сигурно плащане. Без договори.</p>\n      </div>\n    </section>\n  </main>\n\n  <!-- Mobile bottom sheet -->\n  <div class=\"scrim m-only\" id=\"scrim\" aria-hidden=\"true\"></div>\n  <div class=\"sheet m-only\" id=\"sheet\">\n    <button class=\"handle-btn\" id=\"handleBtn\" aria-expanded=\"false\" aria-controls=\"sd\" aria-label=\"Покажи детайлите на поръчката\"><span class=\"handle\"></span></button>\n    <div class=\"sd\" id=\"sd\"><div class=\"sd-inner\" id=\"sdIn\"></div></div>\n    <div class=\"sheet-info\">\n      <div class=\"total\"><span class=\"total-l\">Общо:</span><span class=\"total-r\"><span class=\"total-old\" id=\"shOld\"></span><span class=\"total-new\" id=\"shNew\"></span></span></div>\n      <div class=\"collapse\" id=\"shPromoWrap\"><div><div id=\"shPromoSlot\"></div></div></div>\n    </div>\n    <button class=\"btn btn-primary\" id=\"sheetBtn\"><span class=\"lbl\" id=\"sheetLbl\">Продължи</span><span class=\"spin\" aria-hidden=\"true\"></span></button>\n  </div>\n</div>\n\n<!-- Result: success / fail -->\n<div class=\"result\" id=\"result\" role=\"dialog\" aria-modal=\"true\" aria-labelledby=\"rTitle\" data-kind=\"success\">\n  <div class=\"result-head\">\n    <svg width=\"40\" height=\"40\" viewBox=\"0 0 34 34\" aria-hidden=\"true\"><defs><linearGradient id=\"lg2\" x1=\"0\" y1=\"34\" x2=\"34\" y2=\"0\"><stop offset=\"0\" stop-color=\"#B61DFF\"/><stop offset=\".5\" stop-color=\"#CE13A8\"/><stop offset=\"1\" stop-color=\"#FF2A2A\"/></linearGradient></defs><path d=\"M3 31 7 3l11 14 4-14h9l-6 28-11-14-3 14z\" fill=\"url(#lg2)\"/></svg>\n    <div class=\"mini-pill\"><span class=\"avatar\">SI</span><span class=\"sep\" style=\"height:12px\"></span><svg width=\"20\" height=\"20\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"#fff\" stroke-opacity=\".6\" stroke-width=\"1.6\" aria-hidden=\"true\"><circle cx=\"11\" cy=\"11\" r=\"7\"/><path d=\"m20 20-4-4\"/></svg></div>\n  </div>\n  <div class=\"result-body\">\n    <div class=\"result-card\">\n      <div class=\"glow\" aria-hidden=\"true\"></div>\n      <div class=\"coin\" id=\"coin\" aria-hidden=\"true\"></div>\n      <div class=\"rise\" style=\"--d:.35s\">\n        <h2 class=\"r-title\" id=\"rTitle\"></h2>\n        <p class=\"r-sub\" id=\"rSub\"></p>\n      </div>\n      <div class=\"r-actions\">\n        <button class=\"btn btn-primary rise\" style=\"--d:.45s\" id=\"rA\"></button>\n        <button class=\"btn btn-secondary rise\" style=\"--d:.52s\" id=\"rB\"></button>\n        <button class=\"btn btn-ghost rise\" style=\"--d:.59s\" id=\"rC\"></button>\n      </div>\n    </div>\n  </div>\n</div>\n\n<div class=\"toast\" id=\"toast\" role=\"status\" aria-live=\"polite\"></div>\n\n";

  /* ===== v23+ · добавките по Figma на Лили (без снимки, две колони с черта) + черните блокове слети в един ===== */
  {
    const tz = SR.getElementById('tz');
    const col = (k, tag, tagAlt, name, sub, logo, lw, lh, lalt) => `
      <div class="tz-c" data-tz="${k}">
        <div class="tz-hd"><img class="tz-tag" src="${tag}" width="93" height="28" alt="${tagAlt}"><b>${name}</b></div>
        <p class="tz-sub">${sub}</p>
        <img class="tz-lg" src="${logo}" width="${lw}" height="${lh}" alt="${lalt}">
      </div>`;
    tz.innerHTML = `
      <p class="tz-h">Към плана можеш да добавиш:</p>
      <div class="tz-cols">
        ${col('sport', 'img/pz/ae4ee16780.svg', 'Arena', 'Premium Sport', 'Най-големите спортни първенства', 'img/pz/940021db3c.svg', 159, 24, 'Premier League, Champions League, LaLiga, FIFA')}
        <span class="tz-dv" aria-hidden="true"></span>
        ${col('films', 'img/pz/b40b155257.svg', 'Theater', 'Premium Films', 'Хитови филми и сериали', 'img/pz/2173dc7e36.svg', 158, 24, 'Warner Bros., HBO, DC, Max')}
      </div>
      <p class="note"><svg width="16" height="16" viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" aria-hidden="true"><circle cx="9" cy="9" r="7"/><path d="M9 8v4.5M9 5.6v.1"/></svg>Добавяш ги към плана, когато завършиш абонамента.</p>`;
    const st = document.createElement('style');
    st.textContent = `
      /* една колона: картата с плана + броят хора + добавките, без сивите ивици между тях */
      #planCard{border-bottom-left-radius:0;border-bottom-right-radius:0}
      #hhWrap{margin-top:-24px}
      #hhWrap.is-closed{margin-top:-24px}
      .household{border-radius:0}
      #hhWrap + .tz{margin-top:-24px;border-radius:0 0 14px 14px}
      #hhWrap:not(.is-closed) + .tz::before{content:"";position:absolute;top:0;left:16px;right:16px;height:1px;background:rgba(255,255,255,.08)}
      .tz{position:relative;gap:20px;padding:24px 16px 20px;background:#0B0B0C}
      .tz-h{margin:0;font:400 16px/1.3 var(--sans);letter-spacing:.1px;color:var(--text)}
      .tz-cols{display:grid;grid-template-columns:1fr;gap:20px}
      .tz-c{display:flex;flex-direction:column;align-items:flex-start;gap:10px;min-width:0}
      .tz-hd{display:flex;align-items:center;gap:10px;flex-wrap:wrap}
      .tz-tag{display:block;width:auto;height:26px}
      .tz-hd b{font:700 18px/1.1 var(--display);letter-spacing:.2px;color:#fff;white-space:nowrap}
      .tz-sub{margin:0;font:400 14px/1.4 var(--sans);color:var(--muted)}
      .tz-lg{display:block;width:auto;max-width:100%;height:22px;margin-top:2px}
      .tz-c[data-tz="sport"] .tz-lg{margin-left:-2px}
      .tz-dv{display:block;height:1px;background:rgba(255,255,255,.1)}
      .tz .note{margin:0;gap:6px;font:400 12px/1.4 var(--sans);color:var(--subtle)}
      .tz .note svg{flex:none;color:var(--subtle)}
      @media (min-width:640px){
        .tz-cols{grid-template-columns:1fr 1px 1fr;gap:0 32px;align-items:center}
        .tz-dv{width:1px;height:72px;align-self:center}
      }
      @media (min-width:1024px){
        .tz{gap:24px;padding:28px 28px 22px}
        #hhWrap:not(.is-closed) + .tz::before{left:28px;right:28px}
        .tz-h{font-size:17px}
        .tz-hd b{font-size:20px}
        .tz-tag{height:28px}
        .tz-lg{height:24px}
      }`;
    SR.appendChild(st);
  }

  const $ = (s, r = SR) => r.querySelector(s);
  const $$ = (s, r = SR) => [...r.querySelectorAll(s)];
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const desk = () => matchMedia('(min-width:1024px)').matches;

  const PLANS = {
    ind: { name: 'Solo', base: 14.90, head: '<span style="white-space:nowrap">Изцяло за теб</span>',
           b: ['Един профил, само твой.', 'История на гледанията, любими предавания и препоръки според това, което гледаш.'] },
    ff:  { name: 'Together', base: 24.90, head: 'Noisy е по‑добре<br>с приятели.',
           b: ['Споделяте абонамента. Не профила.', 'До 5 души със собствен профил, история и препоръки.'] }
  };
  const DISC = { 1: 0, 3: 0.10, 12: 0.15 };
  const ADDONS = {
    sport: { name: 'Premium Sport', base: 14.60, art: 'sport', desc: 'Най‑големите спортни първенства на живо и запис.', incl: 'Футбол, тенис и Формула 1 на живо' },
    films: { name: 'Premium Films', base: 7.60, art: 'films', desc: 'Хиляди хитови филми, сериали и ексклузивно съдържание', incl: 'Премиери от големите студиа всяка седмица' }
  };
  const DEFAULTS = () => ({ plan: 'ind', period: 1, people: 3, addons: { sport: { on: false, billing: 'month' }, films: { on: false, billing: 'month' } }, method: null, promo: false, step: 1, outcome: S ? S.outcome : 'success' });
  let S = null; S = DEFAULTS();

  const floor2 = x => Math.floor(x * 100 + 1e-6) / 100;
  const r2 = x => Math.round(x * 100) / 100;
  const eur = n => n.toFixed(2).replace('.', ',') + '\u00A0€';
  const periodLbl = m => m === 1 ? '1 месец' : m + ' месеца';
  const start = new Date();
  const d2 = d => String(d.getDate()).padStart(2, '0') + '.' + String(d.getMonth() + 1).padStart(2, '0') + '.' + String(d.getFullYear()).slice(2);
  const range = m => { const e = new Date(start); e.setMonth(e.getMonth() + m); return d2(start) + ' - ' + d2(e); };

  function calc() {
    const m = S.period, p = PLANS[S.plan], d = DISC[m];
    const monthly = floor2(p.base * (1 - d));
    const plan = { old: r2(p.base * m), now: r2(monthly * m), monthly, disc: d };
    const adds = {};
    let sumOld = plan.old, sumNow = plan.now;
    for (const k in ADDONS) {
      const a = ADDONS[k], st = S.addons[k];
      const period = st.billing === 'period' && m > 1;
      const months = period ? m : 1, dd = period ? 0.15 : 0.10;
      const perMonth = r2(a.base * (1 - dd));
      adds[k] = { months, disc: dd, perMonth, old: r2(a.base * months), now: r2(perMonth * months) };
      if (st.on) { sumOld += adds[k].old; sumNow += adds[k].now; }
    }
    const promo = S.promo ? r2(sumNow * 0.10) : 0;
    return { plan, adds, promo, totalOld: r2(sumOld), totalNow: r2(sumNow - promo) };
  }

  /* Bulgarian typography: never leave a 1–2 letter word (е, с, и, в, на, за, до…) or a number at line end */
  const NB = '\u00A0';
  const typo = t => t.replace(/(^|[\s(>])([A-Za-zА-Яа-яЁё0-9≈—–]{1,2})[ \t]+(?=\S)/g, '$1$2' + NB)
                     .replace(/(^|[\s(>])([A-Za-zА-Яа-яЁё0-9≈—–]{1,2})[ \t]+(?=\S)/g, '$1$2' + NB);
  function typoTree(root) {
    const tw = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, { acceptNode: n => n.parentElement && n.parentElement.closest('script,style,svg,input,code') ? 2 : 1 });
    for (let n; (n = tw.nextNode());) { const t = typo(n.nodeValue); if (t !== n.nodeValue) n.nodeValue = t; }
  }

  /* animated numbers */
  function tween(el, to, fmt = eur) {
    if (!el) return;
    const from = el._v ?? to; el._v = to;
    cancelAnimationFrame(el._raf);
    if (reduced || from === to) { el.textContent = fmt(to); return; }
    // Subtle count: jump most of the way at once, then settle in a few short steps
    // (e.g. 2 → 6 → 7 → 8 instead of ticking through every value).
    const STEPS = [[0, 0.65], [60, 0.85], [120, 0.95], [180, 1]];
    const t0 = performance.now();
    let k = 0;
    const tick = t => {
      while (k < STEPS.length && t - t0 >= STEPS[k][0]) { el.textContent = fmt(from + (to - from) * STEPS[k][1]); k++; }
      if (k < STEPS.length) el._raf = requestAnimationFrame(tick);
    };
    el._raf = requestAnimationFrame(tick);
  }

  // Progress bars: tell each segment its index and the total so the gradient lines up across the whole bar.
  $$('.steps, .web-steps').forEach(nav => {
    const bars = $$('.bar i', nav);
    bars.forEach((b, k) => { b.style.setProperty('--n', bars.length); b.style.setProperty('--k', k); });
  });

  /* avatars */
  let uid = 0;
  function avatar(size, ring, a, b) {
    const id = 'c' + (++uid), g = 'g' + uid;
    return `<svg viewBox="0 0 60 60"><defs><clipPath id="${id}"><circle cx="30" cy="30" r="26"/></clipPath><linearGradient id="${g}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient></defs>
      <circle cx="30" cy="30" r="30" fill="${ring}"/><circle cx="30" cy="30" r="26" fill="url(#${g})"/>
      <g class="sil" clip-path="url(#${id})" fill="#141414"><circle cx="30" cy="25" r="9.5"/><path d="M12 56c1.5-11 9-16.5 18-16.5S46.5 45 48 56z"/></g><g class="plus" stroke="#141414" stroke-width="3.4" stroke-linecap="round"><path d="M30 20v20M20 30h20"/></g></svg>`;
  }
  const AV = [
    { c: 'av-1', s: 40, l: 0, t: 9, z: 1, svg: avatar(40, '#E8603C', '#F7A06A', '#D9502E') },
    { c: 'av-5', s: 40, l: 149, t: 9, z: 1, svg: avatar(40, '#19C6E6', '#7EE6F7', '#1A8FB8') },
    { c: 'av-2', s: 46, l: 26, t: 6, z: 2, svg: avatar(46, '#2F6BFF', '#76B4FF', '#2552D9') },
    { c: 'av-4', s: 46, l: 111, t: 6, z: 2, svg: avatar(46, '#B7F34A', '#E2FF8F', '#8FD12B') },
    { c: 'av-c', s: 60, l: 60, t: 0, z: 3, svg: avatar(60, '#CE13A8', '#B8209A', '#5B0C4A') }
  ];
  $('#people').innerHTML = AV.map(a => `<span class="av ${a.c}" style="width:${a.s}px;height:${a.s}px;left:${a.l}px;top:${a.t}px;z-index:${a.z}">${a.svg}</span>`).join('');

  /* add-on cards */
  const people = `<svg width="27" height="27" viewBox="0 0 27 27" fill="none" stroke="#fff" stroke-width="1.4" stroke-linecap="round" aria-hidden="true"><circle cx="11" cy="10" r="3.5"/><path d="M4.5 21c.8-3.6 3.4-5.5 6.5-5.5s5.7 1.9 6.5 5.5M17 7.5a3 3 0 0 1 0 5.6M19.5 16c1.5.7 2.6 2.4 3 5"/></svg>`;
  const TAGS = { sport: 'img/pz/ae4ee16780.svg', films: 'img/pz/b40b155257.svg' };
  const LOGOS = {
    sport: { src: 'img/pz/940021db3c.svg', w: 258, h: 39, alt: 'Включени спортни първенства' },
    films: { src: 'img/pz/2173dc7e36.svg', w: 178, h: 27, alt: 'Включени студиа и марки' }
  };
  const ART = { sport: 'img/pz/cd14c85c21.jpg', films: 'img/pz/55b4ca4a1f.jpg' };
  $('#addons').innerHTML = Object.entries(ADDONS).map(([k, a]) => `
    <article class="addon" data-addon="${k}">
      <div class="addon-top">
        <div class="art art-${a.art}"><img src="${ART[k]}" alt=""></div>
        <img class="tag" src="${TAGS[k]}" width="98" height="30" alt="${k === 'sport' ? 'Arena' : 'Theater'}">
        <div class="addon-text">
          <h3>${a.name}</h3>
          <p class="group">${people}за цялата група</p>
          <p class="desc">${a.desc}</p>
        </div>
        <button class="toggle" aria-pressed="false" aria-label="${a.name}">
          <span class="off">+ Активирай</span>
          <svg class="on" width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m3.5 8.5 3 3 6-7"/></svg>
        </button>
        <div class="a-price">
          <span class="a-old">${eur(a.base)}</span>
          <div class="a-row"><span class="a-new">${eur(a.base)}</span><span class="a-per">/ на месеца</span></div>
          <span class="a-pp"></span>
        </div>
      </div>
      <div class="addon-bottom">
        <div class="incl"><img src="${LOGOS[k].src}" width="${LOGOS[k].w}" height="${LOGOS[k].h}" alt="${LOGOS[k].alt}"></div>
        <div class="collapse is-closed billing-col"><div><div class="billing-wrap">
          <div class="seg billing" role="radiogroup" aria-label="Плащане за ${a.name}" style="--n:2">
            <span class="seg-thumb" aria-hidden="true"></span>
            <button role="radio" data-bill="month">на месец</button>
            <button role="radio" data-bill="period">периода на плана<span class="badge">-15%</span></button>
          </div>
        </div></div></div>
      </div>
    </article>`).join('');

  $('#sAddons').innerHTML = Object.entries(ADDONS).map(([k, a]) => `
    <div class="collapse" data-srow="${k}"><div><div class="row">
      <div class="row-l"><span class="row-title">${a.name}</span><span class="row-sub"></span></div>
      <div class="row-r"><div class="row-prices"><span class="row-old"></span><span class="row-new"></span></div><span class="row-disc"></span></div>
    </div></div></div>`).join('');

  function setSeg(seg, i, n) {
    seg.style.setProperty('--i', i);
    seg.style.setProperty('--r', i === 0 ? '8px 0 0 8px' : i === n - 1 ? '0 8px 8px 0' : '0');
  }
  const check = (els, fn) => els.forEach(b => b.setAttribute('aria-checked', String(fn(b))));
  const closeC = (el, closed) => el.classList.toggle('is-closed', closed);

  /* ---------- render ---------- */
  function render() {
    const c = calc(), ff = S.plan === 'ff';

    // switch
    $('#app').dataset.plan = S.plan;
    $('#planSwitch').dataset.v = S.plan;
    check($$('#planSwitch button'), b => b.dataset.plan === S.plan);

    // plan card
    $('#planName').textContent = PLANS[S.plan].name;
    $('#planHead').innerHTML = PLANS[S.plan].head;
    $('#planB1').textContent = PLANS[S.plan].b[0];
    $('#planB2').textContent = PLANS[S.plan].b[1];
    tween($('#planOld'), c.plan.old); tween($('#planNew'), c.plan.now);
    $('#planOld').classList.toggle('is-hidden', S.period === 1);
    $('#planPP').textContent = 'по ' + eur(floor2(c.plan.monthly / S.people)) + ' на човек на месец';
    $('#planPP').classList.toggle('is-hidden', !ff);
    $('#people').classList.toggle('solo', !ff);
    // seats fill centre-out: you, then left, right, far left, far right
    ['av-c', 'av-2', 'av-4', 'av-1', 'av-5'].forEach((c, i) => {
      const av = $('#people .' + c), empty = ff && i >= S.people;
      if (av.classList.contains('is-empty') && !empty && !reduced) av.animate([{ transform: 'scale(1)' }, { transform: 'scale(1.14)' }, { transform: 'scale(1)' }], { duration: 380, easing: 'cubic-bezier(.3,1.4,.5,1)' });
      av.classList.toggle('is-empty', empty);
      av.setAttribute('aria-hidden', 'true');
    });
    const pBtns = $$('#periodSeg button');
    check(pBtns, b => +b.dataset.period === S.period);
    setSeg($('#periodSeg'), [1, 3, 12].indexOf(S.period), 3);
    $$('#periodSeg small').forEach(s => s.textContent = eur(floor2(PLANS[S.plan].base * (1 - DISC[+s.dataset.pm]))));

    // household
    closeC($('#hhWrap'), !ff);
    check($$('#counts .count'), b => +b.dataset.n === S.people);
    $('#shared').textContent = `За ${S.people} души: ≈ ${eur(floor2(c.plan.monthly / S.people))} / човек на месец`;

    // add-ons
    $$('.addon').forEach(card => {
      const k = card.dataset.addon, st = S.addons[k], a = c.adds[k];
      card.classList.toggle('is-on', st.on);
      $('.toggle', card).setAttribute('aria-pressed', String(st.on));
      tween($('.a-new', card), a.perMonth);
      const pp = $('.a-pp', card);
      pp.textContent = 'по ' + eur(floor2(a.perMonth / S.people)) + ' на човек';
      pp.classList.toggle('is-hidden', !ff);
      // billing toggle only matters for multi-month plans: hide it for 1 month
      closeC($('.billing-col', card), !st.on || S.period === 1);
      const bb = $$('.billing button', card);
      if (S.period === 1 && st.billing === 'period') st.billing = 'month';
      bb[1].disabled = S.period === 1;
      check(bb, b => b.dataset.bill === st.billing);
      setSeg($('.billing', card), st.billing === 'period' ? 1 : 0, 2);
    });

    // summary
    $('#sPlan').textContent = PLANS[S.plan].name;
    $('#sPlanSub').textContent = periodLbl(S.period) + ' · ' + range(S.period);
    $('#sPlanOld').textContent = S.period > 1 ? eur(c.plan.old) : '';
    tween($('#sPlanNew'), c.plan.now);
    $('#sPlanDisc').textContent = c.plan.disc ? Math.round(c.plan.disc * 100) + '% отстъпка' : '';
    const anyOn = Object.values(S.addons).some(a => a.on);
    closeC($('#sAddWrap'), !anyOn);
    for (const k in ADDONS) {
      const row = $(`[data-srow="${k}"]`), a = c.adds[k];
      closeC(row, !S.addons[k].on);
      $('.row-sub', row).textContent = periodLbl(a.months) + ' · ' + range(a.months);
      $('.row-old', row).textContent = eur(a.old);
      tween($('.row-new', row), a.now);
      $('.row-disc', row).textContent = Math.round(a.disc * 100) + '% отстъпка';
    }
    closeC($('#sPromoWrap'), !S.promo);
    $('#sPromo').textContent = '−' + eur(c.promo);
    syncPromo();

    $('#sdIn').innerHTML = sheetRows(c);
    if (drawerOpen) $('#sd').style.height = $('#sdIn').scrollHeight + 'px';
    for (const [o, n] of [['#tOld', '#tNew'], ['#shOld', '#shNew']]) { $(o).textContent = eur(c.totalOld); tween($(n), c.totalNow); }

    // payment
    check($$('#methods .method'), b => b.dataset.m === S.method);
    closeC($('#cardWrap'), S.method !== 'card');
    $('#cardWrap').style.marginTop = S.method === 'card' ? '0' : '-16px';

    renderStep(false);
    typoTree($('#app'));
  }

  /* ---------- steps (mobile) ---------- */
  const panels = [$('#p1'), $('#p2'), $('#p3')];
  function renderStep(scroll = true) {
    panels.forEach((p, i) => { p.classList.toggle('is-active', i + 1 === S.step); p.classList.toggle('is-past', i + 1 < S.step); p.inert = !desk() && i + 1 !== S.step; });
    $$('#mSteps .step').forEach((b, i) => { b.classList.toggle('is-current', i + 1 === S.step); b.classList.toggle('is-done', i + 1 < S.step); b.disabled = false; b.setAttribute('aria-current', i + 1 === S.step ? 'step' : 'false'); });
    $('#back').setAttribute('aria-disabled', String(S.step === 1));
    const lbl = S.step < 3 ? 'Продължи' : 'Плати ' + eur(calc().totalNow);
    const l = $('#sheetLbl');
    if (l.textContent !== lbl) {
      if (l.textContent.startsWith('Плати') && lbl.startsWith('Плати')) l.textContent = lbl;
      else { l.style.opacity = 0; l.style.transform = 'translateY(6px)'; setTimeout(() => { l.textContent = lbl; l.style.opacity = ''; l.style.transform = ''; }, 160); }
    }
    placePromo();
    closeC($('#shPromoWrap'), S.step === 3);
    $('#handleBtn').style.visibility = S.step === 3 ? 'hidden' : '';
    if (S.step === 3 && drawerOpen) setDrawer(false);
    if (scroll && !desk()) { const top = $('#app').getBoundingClientRect().top + scrollY - hdrH; if (scrollY > top + 1) scrollTo({ top, behavior: reduced ? 'auto' : 'smooth' }); }
  }
  function goStep(n) { S.step = Math.max(1, Math.min(3, n)); if (drawerOpen) setDrawer(false); renderStep(true); }

  /* ---------- interactions ---------- */
  function setPlan(v) {
    if (S.plan === v) return;
    const card = $('#planCard');
    $('#planSwitch').dataset.v = v;
    check($$('#planSwitch button'), b => b.dataset.plan === v);
    card.classList.add('is-swapping');
    if (reduced) { S.plan = v; render(); card.classList.remove('is-swapping'); return; }
    const h0 = card.offsetHeight;
    setTimeout(() => {
      S.plan = v; render();
      // glide the card between its old and new height instead of jumping
      const h1 = card.offsetHeight;
      card.style.height = h0 + 'px'; void card.offsetHeight;
      card.style.transition = 'height .36s cubic-bezier(.2,.7,.2,1)';
      card.style.height = h1 + 'px';
      requestAnimationFrame(() => card.classList.remove('is-swapping'));
      clearTimeout(card._ht);
      card._ht = setTimeout(() => { card.style.height = ''; card.style.transition = ''; }, 380);
    }, 120);
  }
  $$('#planSwitch button').forEach(b => b.addEventListener('click', () => setPlan(b.dataset.plan)));
  $$('#periodSeg button').forEach(b => b.addEventListener('click', () => { S.period = +b.dataset.period; render(); }));
  $$('#counts .count').forEach(b => b.addEventListener('click', () => { S.people = +b.dataset.n; render(); }));
  $$('.addon').forEach(card => {
    const k = card.dataset.addon;
    $('.toggle', card).addEventListener('click', () => { S.addons[k].on = !S.addons[k].on; render(); if (S.addons[k].on) toast(ADDONS[k].name + ' е добавен'); });
    $$('.billing button', card).forEach(b => b.addEventListener('click', () => { S.addons[k].billing = b.dataset.bill; render(); }));
  });
  $$('#methods .method').forEach(b => b.addEventListener('click', () => {
    // tapping Card again collapses it and clears the choice
    S.method = S.method === b.dataset.m ? null : b.dataset.m; render();   // tap the chosen method again to clear it
    if (S.method === 'card') setTimeout(() => $('#ccNum').focus({ preventScroll: true }), 350);
  }));

  // card masks
  const digits = v => v.replace(/\D/g, '');
  $('#ccNum').addEventListener('input', e => { e.target.value = digits(e.target.value).slice(0, 16).replace(/(.{4})/g, '$1 ').trim(); e.target.classList.remove('invalid'); });
  $('#ccExp').addEventListener('input', e => { const d = digits(e.target.value).slice(0, 4); e.target.value = d.length > 2 ? d.slice(0, 2) + '/' + d.slice(2) : d; e.target.classList.remove('invalid'); });
  $('#ccCvc').addEventListener('input', e => { e.target.value = digits(e.target.value).slice(0, 3); e.target.classList.remove('invalid'); });
  function cardValid() {
    const n = digits($('#ccNum').value).length === 16;
    const ex = digits($('#ccExp').value), mm = +ex.slice(0, 2), e = ex.length === 4 && mm >= 1 && mm <= 12;
    const c = digits($('#ccCvc').value).length === 3;
    [[ '#ccNum', n ], [ '#ccExp', e ], [ '#ccCvc', c ]].forEach(([s, ok]) => { $(s).classList.toggle('invalid', !ok); if (!ok) attention($(s)); });
    return n && e && c;
  }

  // promo — states from the Figma component: Add Code → Fill Code → Code Filled → Code Added
  let promoOpen = false;
  function syncPromo() {
    const st = S.promo ? 'added' : promoOpen ? 'fill' : 'add';
    $('#promo').dataset.state = st;
    $('#promoBtn').hidden = st !== 'add';
    $('#promoAdded').hidden = st !== 'added';
    closeC($('#promoWrap'), st !== 'fill');
    $('#promoBtn').setAttribute('aria-expanded', String(st === 'fill'));
    $('#promoField').classList.toggle('has-value', !!$('#promoIn').value.trim());
  }
  function openPromo(open) {
    promoOpen = open;
    if (!open) { $('#promoMsg').textContent = ''; $('#promoField').classList.remove('invalid'); }
    syncPromo();
    if (open) setTimeout(() => $('#promoIn').focus({ preventScroll: true }), 300);
  }
  $('#promoBtn').addEventListener('click', () => { openPromo(true); if ($('#promo').closest('#sheet') && !drawerOpen) setDrawer(true); });
  $('#promoClose').addEventListener('click', () => { openPromo(false); $('#promoBtn').focus({ preventScroll: true }); });
  $('#promoDel').addEventListener('click', () => { S.promo = false; render(); toast('Промокодът е премахнат'); $('#promoBtn').focus({ preventScroll: true }); });
  $('#promoIn').addEventListener('input', () => { $('#promoField').classList.remove('invalid'); $('#promoMsg').textContent = ''; syncPromo(); });
  $('#promoForm').addEventListener('submit', e => {
    e.preventDefault();
    const v = $('#promoIn').value.trim().toUpperCase();
    if (v === 'NOISY10') { S.promo = true; $('#promoIn').value = ''; promoOpen = false; $('#promoMsg').textContent = ''; render(); toast('Промокодът е приложен: −10%'); }
    else { $('#promoMsg').textContent = v ? 'Невалиден промокод. Провери го и опитай отново.' : 'Въведи промокод.'; $('#promoField').classList.add('invalid'); attention($('#promoField')); }
  });
  // On mobile steps 1–2 the promo component sits in the bottom sheet; on step 3 and desktop it sits in the summary.
  function placePromo() {
    const promo = $('#promo'), inSheet = !desk() && S.step < 3;
    if (inSheet && promo.parentElement !== $('#shPromoSlot')) $('#shPromoSlot').appendChild(promo);
    if (!inSheet && promo.previousElementSibling !== $('#promoHome')) $('#promoHome').after(promo);
  }

  // navigation
  $('#back').addEventListener('click', () => { if (S.step > 1) goStep(S.step - 1); else toast('Това е първата стъпка'); });
  $$('#mSteps .step').forEach(b => b.addEventListener('click', () => goStep(+b.dataset.go)));
  $('#sheetBtn').addEventListener('click', () => { if (S.step < 3) goStep(S.step + 1); else pay(); });
  $('#payDesk').addEventListener('click', pay);
  $$('#wSteps .step').forEach(b => b.addEventListener('click', () => $('#' + b.dataset.scroll).scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' })));
  let hoverSec = null;
  function webStep() {
    if (!desk()) return;
    const [s1, s2] = $$('#wSteps .step');
    // scrolled: the add-ons section has moved into the upper half of the window
    const scrolled = $('#p2').getBoundingClientRect().top < innerHeight * 0.5;
    const two = hoverSec ? hoverSec === 'p2' : scrolled;
    s2.classList.toggle('is-current', two); s1.classList.toggle('is-done', two); s1.classList.toggle('is-current', !two);
  }
  ['p1', 'p2'].forEach(id => {
    const el = $('#' + id);
    el.addEventListener('mouseenter', () => { hoverSec = id; webStep(); });
    el.addEventListener('mouseleave', () => { hoverSec = null; webStep(); });
  });
  addEventListener('scroll', webStep, { passive: true });

  /* ---------- pay ---------- */
  let busy = false;
  function attention(el) { el.classList.remove('shake'); void el.offsetWidth; el.classList.add('shake'); }
  function loading(on) { [$('#sheetBtn'), $('#payDesk')].forEach(b => { b.classList.toggle('is-loading', on); b.disabled = on; }); }
  function pay() {
    if (busy) return;
    if (!S.method) {
      if (!desk() && S.step !== 3) goStep(3);
      setTimeout(() => attention($('#methods')), desk() ? 0 : 400);
      if (desk()) $('#payBlock').scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'center' });
      toast('Избери метод на плащане'); return;
    }
    if (S.method === 'card' && !cardValid()) { toast('Провери данните на картата'); return; }
    busy = true; loading(true);
    const names = { apple: 'Apple Pay', google: 'Google Pay', revolut: 'Revolut', card: 'картата' };
    toast('Потвърждаваме плащането с ' + names[S.method] + '…');
    setTimeout(() => { busy = false; loading(false); openResult(S.outcome); }, reduced ? 300 : 1800);
  }

  /* ---------- result ---------- */
  const SUCCESS_IMG = 'img/pz/0d50c0bb09.png';
  const COIN = (kind) => {
    if (kind === 'success') return `<img src="${SUCCESS_IMG}" width="158" height="158" alt="" style="width:100%;height:100%;object-fit:cover">`;
    const ok = kind === 'success';
    const rim = ok ? ['#B61DFF', '#CE13A8', '#FF3D6E'] : ['#B61DFF', '#E0156A', '#FF2A2A'];
    const face = ok ? ['#FFEAF8', '#E7A6EC', '#A93FCB'] : ['#FFE3EC', '#F2A0B9', '#C2365E'];
    const mark = ok ? '<path d="M55 80l16 16 33-35" stroke="#5B1470" stroke-width="11" fill="none" stroke-linecap="round" stroke-linejoin="round"/>'
                    : '<path d="M62 62l36 36M98 62L62 98" stroke="#7A0F3F" stroke-width="11" fill="none" stroke-linecap="round"/>';
    return `<svg viewBox="0 0 160 160"><defs><linearGradient id="rim${kind}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${rim[0]}"/><stop offset=".5" stop-color="${rim[1]}"/><stop offset="1" stop-color="${rim[2]}"/></linearGradient>
      <radialGradient id="face${kind}" cx=".35" cy=".3" r=".9"><stop offset="0" stop-color="${face[0]}"/><stop offset=".55" stop-color="${face[1]}"/><stop offset="1" stop-color="${face[2]}"/></radialGradient></defs>
      <g transform="rotate(-18 80 80)"><ellipse cx="86" cy="88" rx="62" ry="54" fill="${ok ? '#5E0C55' : '#5A0618'}"/><ellipse cx="80" cy="80" rx="62" ry="54" fill="url(#rim${kind})"/><ellipse cx="80" cy="80" rx="52" ry="45" fill="url(#face${kind})"/>${mark}</g></svg>`;
  };
  const R = {
    success: () => ({
      title: 'Твоят абонамент<br>е активиран', sub: '',
      a: ['Гледай сега', () => toast('Отваряме Noisy Theater. Приятно гледане!')],
      b: S.plan === 'ind'
        ? ['Добави Together', () => { closeResult(); reset({ plan: 'ff' }); toast('Избери Together и колко души сте'); }]
        : ['Изпрати покани', () => toast('Изпратихме ти линк за покана по имейл')],
      c: ['Върни се обратно', () => { closeResult(); reset(); }]
    }),
    fail: () => ({
      title: 'Плащането<br>не беше успешно', sub: 'Не сме те таксували. Опитай отново или избери друг метод на плащане.',
      a: ['Опитай отново', () => { closeResult(); setTimeout(pay, 380); }],
      b: ['Смени метода на плащане', () => { closeResult(); S.method = null; render(); if (!desk()) goStep(3); else $('#payBlock').scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'center' }); setTimeout(() => attention($('#methods')), 500); }],
      c: ['Върни се обратно', () => closeResult()]
    })
  };
  let lastFocus = null;
  function openResult(kind) {
    const r = R[kind](), el = $('#result');
    el.dataset.kind = kind;
    $('#coin').innerHTML = COIN(kind);
    $('#rTitle').innerHTML = r.title;
    $('#rSub').textContent = r.sub; $('#rSub').style.display = r.sub ? '' : 'none';
    [['#rA', r.a], ['#rB', r.b], ['#rC', r.c]].forEach(([s, [t, fn]]) => { const b = $(s); b.textContent = t; b.onclick = fn; });
    typoTree(el);
    el.classList.remove('is-open'); void el.offsetWidth; el.classList.add('is-open');
    lastFocus = SR.activeElement || document.activeElement; $('#app').inert = true;
    setTimeout(() => $('#rA').focus({ preventScroll: true }), 500);
  }
  function closeResult() { $('#result').classList.remove('is-open'); $('#app').inert = false; lastFocus && lastFocus.focus && lastFocus.focus({ preventScroll: true }); }

  function reset(over = {}) {
    S = Object.assign(DEFAULTS(), over);
    ['#ccNum', '#ccExp', '#ccCvc', '#promoIn'].forEach(s => { $(s).value = ''; $(s).classList.remove('invalid'); });
    promoOpen = false; $('#promoMsg').textContent = ''; $('#promoField').classList.remove('invalid');
    render(); goStep(1);
    scrollTo({ top: HOST.getBoundingClientRect().top + scrollY - hdrH - 16, behavior: reduced ? 'auto' : 'smooth' });
  }

  /* ---------- toast + prototype panel ---------- */
  let tt;
  function toast(msg) { const t = $('#toast'); t.textContent = msg; t.classList.add('is-show'); clearTimeout(tt); tt = setTimeout(() => t.classList.remove('is-show'), 2400); }
  document.addEventListener('keydown', e => { if (e.key === 'Escape') { if ($('#result').classList.contains('is-open') && $('#result').dataset.kind === 'fail') closeResult(); } });

  /* ---------- bottom drawer (mobile): swipe up for the order breakdown ---------- */
  function sheetRows(c) {
    const row = (t, sub, o, n, d) => `<div class="row"><div class="row-l"><span class="row-title">${t}</span><span class="row-sub">${sub}</span></div>
      <div class="row-r"><div class="row-prices">${o ? `<span class="row-old">${o}</span>` : ''}<span class="row-new">${n}</span></div>${d ? `<span class="row-disc">${d}</span>` : ''}</div></div>`;
    const pct = d => d ? Math.round(d * 100) + '% отстъпка' : '';
    let h = `<div><p class="r-label">План</p>${row(PLANS[S.plan].name, periodLbl(S.period) + ' · ' + range(S.period), S.period > 1 ? eur(c.plan.old) : '', eur(c.plan.now), pct(c.plan.disc))}</div>`;
    const on = Object.keys(ADDONS).filter(k => S.addons[k].on);
    if (on.length) h += `<div class="sd-group"><p class="r-label">Пакети</p>${on.map(k => { const a = c.adds[k]; return row(ADDONS[k].name, periodLbl(a.months) + ' · ' + range(a.months), eur(a.old), eur(a.now), pct(a.disc)); }).join('')}</div>`;
    if (S.promo) h += row('Промокод', 'NOISY10', '', '−' + eur(c.promo), '');
    return h + '<div class="hr"></div>';
  }
  const sheet = $('#sheet'), sd = $('#sd'), sdIn = $('#sdIn'), scrim = $('#scrim'), hBtn = $('#handleBtn');
  let drawerOpen = false, drag = null, justDragged = false;
  function setDrawer(open, animate = true) {
    if (S.step === 3) open = false;
    drawerOpen = open;
    // closing the sheet also folds the promo field back to "Добави промокод" (and clears what was typed)
    if (!open && promoOpen && $('#promo').closest('#sheet')) { $('#promoIn').value = ''; openPromo(false); $('#promoIn').blur(); }
    [sd, scrim].forEach(el => el.classList.toggle('dragging', !animate));
    sd.style.height = (open ? sdIn.scrollHeight : 0) + 'px';
    scrim.style.opacity = open ? 1 : 0;
    scrim.classList.toggle('is-on', open);
    hBtn.setAttribute('aria-expanded', String(open));
    hBtn.setAttribute('aria-label', open ? 'Скрий детайлите на поръчката' : 'Покажи детайлите на поръчката');
  }
  sheet.addEventListener('pointerdown', e => {
    if (desk() || S.step === 3 || e.button > 0 || e.target.closest('input')) return;   // typing a code isn't a drag
    const H = sdIn.scrollHeight;
    drag = { y: e.clientY, id: e.pointerId, h0: drawerOpen ? H : 0, H, moved: false, pts: [{ y: e.clientY, t: e.timeStamp }] };
  });
  addEventListener('pointermove', e => {
    if (!drag || e.pointerId !== drag.id) return;
    const dy = e.clientY - drag.y;
    if (!drag.moved) {
      if (Math.abs(dy) < 6) return;
      drag.moved = true; sheet.setPointerCapture(drag.id); sheet.classList.add('is-dragging');
      [sd, scrim].forEach(el => el.classList.add('dragging')); scrim.classList.add('is-on');
    }
    let h = drag.h0 - dy;                                   // dragging up grows the drawer
    if (h > drag.H) h = drag.H + (h - drag.H) * 0.25;       // soft resistance past fully open
    h = Math.max(0, h);
    sd.style.height = h + 'px';
    scrim.style.opacity = Math.min(1, h / drag.H);
    drag.pts.push({ y: e.clientY, t: e.timeStamp }); if (drag.pts.length > 5) drag.pts.shift();
  });
  const endDrag = () => {
    if (!drag) return;
    const d = drag; drag = null;
    if (!d.moved) return;
    sheet.classList.remove('is-dragging');
    const a = d.pts[0], b = d.pts[d.pts.length - 1], v = (b.y - a.y) / Math.max(1, b.t - a.t);
    const h = parseFloat(sd.style.height) || 0;
    setDrawer(v < -0.35 ? true : v > 0.35 ? false : h > d.H / 2);   // flick wins, otherwise nearest
    justDragged = true; setTimeout(() => { justDragged = false; }, 250);
  };
  sheet.addEventListener('dragstart', e => e.preventDefault());   // keep the browser's native drag from stealing the swipe
  addEventListener('pointerup', endDrag);
  addEventListener('pointercancel', endDrag);
  sheet.addEventListener('click', e => { if (justDragged) { e.stopPropagation(); e.preventDefault(); } }, true); // a swipe isn't a tap
  hBtn.addEventListener('click', () => setDrawer(!drawerOpen));
  scrim.addEventListener('click', () => setDrawer(false));
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && drawerOpen) setDrawer(false); });
  setDrawer(false, false);

  matchMedia('(min-width:1024px)').addEventListener('change', () => { renderStep(false); placePromo(); measureChrome(); if (desk()) setDrawer(false, false); });
  const wBar = $('#wStepsBar'), HDR = document.getElementById('hdr');
  let hdrH = 0;
  function measureChrome() {
    const fx = HDR && /fixed|sticky/.test(getComputedStyle(HDR).position);
    hdrH = fx ? Math.max(0, Math.round(HDR.getBoundingClientRect().bottom)) : 0;
    HOST.style.setProperty('--hdr', hdrH + 'px');
  }
  // телефон: долната лента с общата сума се показва само докато си в цените
  let inSec = null;
  function onScroll() {
    measureChrome();
    if (desk()) wBar.classList.toggle('is-stuck', wBar.getBoundingClientRect().top <= hdrH + 0.5 && $('.left-bg').getBoundingClientRect().top < hdrH);
    const r = $('#app').getBoundingClientRect(), on = r.top < innerHeight - 160 && r.bottom > 120;
    if (on !== inSec) { inSec = on; $('#app').classList.toggle('pz-in', on); document.documentElement.classList.toggle('pz-in', on); if (!on && drawerOpen) setDrawer(false); }
  }
  addEventListener('scroll', onScroll, { passive: true });
  addEventListener('resize', onScroll);
  measureChrome(); onScroll(); webStep();
  // v21: без чекаут. „Избери“ отваря регистрацията с избрания план (window.openSignup от главната)
  const ctaGo = $('#ctaGo');
  function syncCta() { ctaGo.textContent = 'Избери ' + PLANS[S.plan].name; }
  const _render = render; render = function () { _render.apply(this, arguments); syncCta(); };
  syncCta();
  ctaGo.addEventListener('click', () => {
    const c = calc(), lbl = PLANS[S.plan].name + ' · ' + periodLbl(S.period) + (S.plan === 'ff' ? ' · до 5 души' : '') + ' · ' + eur(c.plan.now);
    if (window.openSignup) window.openSignup(lbl, ctaGo);
  });
  render(); goStep(1);
})();
