/* Three explorations grounded in the original NOISY pricing component. */
window.PZ_VCSS = `
:host{--bg:#000;--surface:#000;--surface-2:#000;--panel:linear-gradient(#000,#000);--line:rgba(255,255,255,.16)}
.toast{display:none!important}
:host .app,:host .stage,:host #p1,:host .left-bg{background:none;box-shadow:none}
:host .stage{padding-top:0;grid-template-columns:minmax(0,864px)}
:host #p1{padding:16px 32px 24px;gap:24px}
:host .wrap{max-width:744px;gap:24px;min-width:0}
:host #t-plan{display:none!important}
:host .switch{height:44px;width:300px;max-width:100%;padding:0;background:#000;border:0}
:host .switch-thumb{top:0;bottom:0;left:0;width:50%}
:host .switch button{min-height:44px;font-size:14px}
:host .plan-card{padding:24px 24px 32px;gap:24px;border-radius:14px 14px 0 0;background:radial-gradient(60% 60% at 100% 0%,rgba(206,19,168,.36),rgba(206,19,168,.12) 50%,transparent 100%) padding-box,radial-gradient(68% 68% at 1% 2%,rgba(140,24,190,.4),rgba(70,12,95,.18) 50%,transparent 100%) padding-box,linear-gradient(#000,#000) padding-box,var(--stroke) border-box}
:host #planCard{border-bottom-left-radius:0;border-bottom-right-radius:0}
:host .plan-name{font-size:16px}
:host .plan-grid{min-width:0;grid-template-columns:minmax(0,1fr) auto;grid-template-areas:"people price" "headline price" "benefits benefits";gap:16px 24px;margin-top:0}
:host .people{width:190px;justify-self:start;margin:0;max-width:100%}
:host .headline{font-size:24px;line-height:1.3;max-width:100%;padding:0;min-width:0}
:host .headline span{white-space:normal!important}
:host .benefits{margin:8px 0 0;gap:4px}
:host .benefits p{font-size:16px;line-height:1.5}
:host .price-col{align-self:end;min-width:0;gap:4px}
:host .price-main{flex-direction:column;align-items:flex-end;gap:4px}
:host .p-new{font-size:36px;line-height:1.2;white-space:nowrap;letter-spacing:-.025em}
:host .p-old{font-size:16px;color:#999}
:host .p-pp{font-size:14px;line-height:1.5;max-width:230px;letter-spacing:0}
:host .billing-caption{font:400 13px/1.5 var(--sans);color:var(--text-2);text-align:right;max-width:230px;margin:2px 0 0}
:host .seg{background:#000;border:0;margin:0;border-radius:8px}
:host .seg button{min-height:64px;font-size:15px}
:host .seg button small{font-size:13px}
:host .seg-thumb{background:#fff}
:host .badge{background:var(--grad-dim) padding-box,linear-gradient(#000,#000) padding-box,var(--grad) border-box}
:host .seg button[aria-checked="false"]:hover{background:rgba(206,19,168,.1)}
:host #hhWrap,:host #hhWrap.is-closed{margin-top:-24px}
:host .household{background:#000;border-radius:0;padding:24px;gap:16px}
:host .hh-label{font-size:15px}
:host .hh-row{gap:24px;justify-content:space-between}
:host .count{width:44px;height:44px;background:#000;border:1px solid rgba(255,255,255,.25);font-family:var(--sans)}
:host .count[aria-checked="true"]{background:#fff;color:#000;border-color:#fff}
:host .count[aria-checked="false"]:hover{border-color:var(--pink-light)}
:host .shared-price{font-size:16px;line-height:1.5}
:host .tz{background:#000;padding:24px;gap:20px}
:host #hhWrap + .tz{margin-top:-24px;border-radius:0 0 14px 14px}
:host #hhWrap:not(.is-closed) + .tz::before{left:24px;right:24px;background:rgba(255,255,255,.12)}
:host .tz-h{font-size:16px;color:var(--text)}
:host .tz-hd b{font-size:18px}
:host .tz-sub{font-size:14px;color:var(--text-2)}
:host .tz-dv{background:rgba(255,255,255,.12)}
:host .note{font-size:13px;line-height:1.5}
:host .cta21-go{width:100%;max-width:400px;min-height:52px;border-radius:8px;font-size:16px;background:#fff;color:#000;box-shadow:none}
:host .cta21-go:hover{background:#fff;color:#000;filter:brightness(.94)}
:host button:focus-visible{outline:2px solid #DF34BD;outline-offset:4px}

/* B: the content sits on the page; colour belongs to the people and type. */
:host([data-v="vb"]) .wrap{max-width:864px}
:host([data-v="vb"]) .plan-card{border:0;border-radius:0;padding:24px 0 32px;background:none}
:host([data-v="vb"]) .plan-name{color:#DF34BD}
:host([data-v="vb"]) .plan-grid{grid-template-columns:minmax(0,1fr) minmax(0,1fr);grid-template-areas:"people price" "headline price" "benefits price";gap:24px 32px}
:host([data-v="vb"]) .price-col{align-self:center}
:host([data-v="vb"]) .p-new{font-size:48px}
:host([data-v="vb"]) .headline{font-size:28px}
:host([data-v="vb"]) .benefits{margin:0}
:host([data-v="vb"]) .seg{margin-top:8px;border-radius:0;border-block:1px solid rgba(255,255,255,.16)}
:host([data-v="vb"]) .seg-thumb{background:var(--sel);border-bottom:2px solid #DF34BD;border-radius:0}
:host([data-v="vb"]) .seg button[aria-checked="true"],:host([data-v="vb"]) .seg button[aria-checked="true"] small{color:#fff}
:host([data-v="vb"]) .household,:host([data-v="vb"]) .tz{padding:24px 0;background:none}
:host([data-v="vb"]) #hhWrap:not(.is-closed) + .tz::before{left:0;right:0}
:host([data-v="vb"]) .cta21-go{background:var(--stroke);color:#fff;border:0}
:host([data-v="vb"]) .cta21-go:hover{background:var(--stroke);color:#fff}

/* C: compare the periods first, then read the exact total below them. */
:host([data-v="vc"]) .plan-card{gap:24px}
:host([data-v="vc"]) .plan-grid{grid-template-columns:minmax(0,1fr);grid-template-areas:"people" "headline" "benefits";gap:16px}
:host([data-v="vc"]) .benefits{margin:0}
:host([data-v="vc"]) .period-intro{font:500 15px/1.4 var(--sans);margin:8px 0 -8px;color:var(--text-2)}
:host([data-v="vc"]) .seg{gap:12px;background:none;overflow:visible;isolation:isolate}
:host([data-v="vc"]) .seg-thumb{display:none}
:host([data-v="vc"]) .seg button{min-height:96px;border:1px solid rgba(255,255,255,.25);border-radius:8px;gap:8px;background:#000}
:host([data-v="vc"]) .seg button small{font:700 24px/1.3 var(--display)}
:host([data-v="vc"]) .seg button small::after{content:" / месец";font:400 12px/1.5 var(--sans)}
:host([data-v="vc"]) .seg button[aria-checked="true"]{background:#fff;border-color:#fff;color:#000}
:host([data-v="vc"]) .seg button[aria-checked="true"] small{color:#000}
:host([data-v="vc"]) .price-col{width:100%;align-items:flex-start;text-align:left;border-top:1px solid rgba(255,255,255,.16);padding-top:24px}
:host([data-v="vc"]) .price-main{flex-direction:row;align-items:baseline;gap:12px}
:host([data-v="vc"]) .p-new{font-size:28px}
:host([data-v="vc"]) .billing-caption{text-align:left;max-width:100%}
:host([data-v="vc"]) .p-pp{text-align:left;max-width:100%;color:#DF34BD}

@media(max-width:1023px){
:host #p1{padding:8px 16px 24px}
:host .plan-card{padding:24px 20px}
:host .plan-grid{gap:16px;grid-template-columns:minmax(0,1fr);grid-template-areas:"people" "headline" "price" "benefits"}
:host .headline{font-size:24px}
:host .price-col{justify-self:stretch;align-items:flex-start;text-align:left}
:host .price-main{align-items:flex-start}
:host .p-new{font-size:32px}
:host .p-pp,:host .billing-caption{text-align:left;max-width:100%}
:host .household,:host .tz{padding:24px 20px}
:host .hh-row{flex-direction:column;align-items:flex-start;gap:12px}
:host .tz-cols{grid-template-columns:minmax(0,1fr);gap:20px}
:host .tz-dv{width:100%;height:1px}
:host([data-v="vb"]) .plan-card{padding:24px 4px}
:host([data-v="vb"]) .plan-grid{grid-template-columns:minmax(0,1fr);grid-template-areas:"people" "headline" "benefits" "price";gap:24px}
:host([data-v="vb"]) .headline{font-size:28px}
:host([data-v="vb"]) .p-new{font-size:40px}
:host([data-v="vb"]) .household,:host([data-v="vb"]) .tz{padding:24px 4px}
:host([data-v="vc"]) .seg{gap:8px}
:host([data-v="vc"]) .seg button{font-size:14px;min-height:88px}
:host([data-v="vc"]) .seg button small{font-size:16px}
:host([data-v="vc"]) .seg button small::after{display:block;font-size:12px}
:host .panel,:host .stage,:host .plan-grid{min-width:0}
}
`;
